#!/usr/bin/env python3
"""Génère l'EPUB de La Rouille à partir de roman/chapitres/*.md.

Usage :
    python3 scripts/build-epub.py                 # écrit site/la-rouille.epub
    python3 scripts/build-epub.py --author "Nom"  # change le nom d'auteur
    python3 scripts/build-epub.py --cover cover.jpg

Format EPUB 3 avec table NCX (compatibilité Kindle). Aucune dépendance externe.
"""
import argparse, datetime, html, os, re, sys, uuid, zipfile

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "roman", "chapitres")
TITLE = "La Rouille"
SUBTITLE = "Roman"
LANG = "fr"

CSS = """
@charset "utf-8";
html { font-family: serif; }
body { margin: 0 5%; line-height: 1.5; text-align: justify; hyphens: auto; -webkit-hyphens: auto; }
h1 { font-size: 1.7em; text-align: center; margin: 3em 0 1.2em; page-break-before: always; font-weight: normal; letter-spacing: .04em; }
h1 .label { display: block; font-size: .5em; letter-spacing: .25em; text-transform: uppercase; margin-bottom: .9em; color: #7a3a1e; }
h2 { font-size: 1.15em; text-align: center; margin: 2.2em 0 1em; font-weight: normal; color: #7a3a1e; letter-spacing: .08em; }
p { margin: 0; text-indent: 1.4em; orphans: 2; widows: 2; }
p.first, h2 + p, p.sep + p { text-indent: 0; }
p.sep { text-align: center; text-indent: 0; margin: 1.6em 0; letter-spacing: .6em; color: #7a3a1e; }
em { font-style: italic; }
.titlepage { text-align: center; margin-top: 28%; page-break-after: always; }
.titlepage h1 { font-size: 2.6em; letter-spacing: .2em; text-transform: uppercase; page-break-before: avoid; margin: 0 0 .4em; }
.titlepage .sub { font-size: 1.1em; font-style: italic; margin: 0 0 3em; text-indent: 0; }
.titlepage .by { margin-top: 5em; text-indent: 0; letter-spacing: .12em; }
.legal { text-align: center; margin-top: 35%; font-size: .85em; text-indent: 0; }
.legal p { text-indent: 0; margin: .8em 0; }
nav ol { list-style: none; padding: 0; margin: 0; }
nav li { margin: .5em 0; text-indent: 0; }
nav li.extra { font-style: italic; }
nav h1 { page-break-before: avoid; }
.cover { text-align: center; margin: 0; padding: 0; }
.cover img { max-width: 100%; max-height: 100%; }
"""


def esc(s):
    return html.escape(s, quote=False)


def inline(s):
    s = esc(s)
    return re.sub(r"\*([^*]+)\*", r"<em>\1</em>", s)


def parse(path, idx):
    lines = open(path, encoding="utf-8").read().replace("\r", "").split("\n")
    label, title, n = "", os.path.basename(path), None
    blocks, buf = [], []

    def flush():
        nonlocal buf
        if buf:
            blocks.append(("p", " ".join(buf)))
            buf = []

    for line in lines:
        m1 = re.match(r"^#\s+(.+)$", line)
        if m1:
            t = m1.group(1)
            m = re.match(r"^Chapitre\s+(\d+)\s*[—-]\s*(.+)$", t)
            if m:
                n = int(m.group(1)); label = "Chapitre %d" % n; title = m.group(2).strip()
            else:
                parts = re.split(r"\s+—\s+", t)
                label = parts[0].strip(); title = (" — ".join(parts[1:]) or parts[0]).strip()
            continue
        m2 = re.match(r"^##\s+(.+)$", line)
        if m2:
            flush(); blocks.append(("h", m2.group(1).strip())); continue
        if re.match(r"^\*\(.*\)\*\s*$", line.strip()):  # note de suivi
            continue
        if re.match(r"^---+$", line.strip()):
            flush(); blocks.append(("hr", "")); continue
        if not line.strip():
            flush(); continue
        buf.append(line.strip())
    flush()
    return {"id": "ch%03d" % idx, "n": n, "label": label, "title": title, "blocks": blocks}


def chapter_xhtml(c):
    out = []
    first = True
    for kind, text in c["blocks"]:
        if kind == "hr":
            out.append('<p class="sep">· · ·</p>'); first = True
        elif kind == "h":
            out.append("<h2>%s</h2>" % esc(text)); first = True
        else:
            out.append('<p%s>%s</p>' % (' class="first"' if first else "", inline(text))); first = False
    heading = '<h1><span class="label">%s</span>%s</h1>' % (esc(c["label"]), esc(c["title"])) if c["label"] and c["label"] != c["title"] else "<h1>%s</h1>" % esc(c["title"])
    return page(c["label"] + " — " + c["title"] if c["label"] else c["title"], heading + "\n" + "\n".join(out))


def page(title, body, extra_class=""):
    return ('<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n'
            '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="%s" xml:lang="%s">\n'
            '<head><meta charset="utf-8"/><title>%s</title><link rel="stylesheet" type="text/css" href="style.css"/></head>\n'
            '<body%s>\n%s\n</body></html>\n') % (LANG, LANG, esc(title), (' class="%s"' % extra_class) if extra_class else "", body)


def build(author, cover_path, out_path):
    files = sorted(f for f in os.listdir(SRC) if f.endswith(".md"))
    chapters = [parse(os.path.join(SRC, f), i + 1) for i, f in enumerate(files)]
    uid = "urn:uuid:" + str(uuid.uuid5(uuid.NAMESPACE_URL, "la-rouille"))
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    manifest, spine, nav_items, ncx_items = [], [], [], []
    texts = {}  # nom -> contenu

    # Pages liminaires
    texts["title.xhtml"] = page(TITLE, '<div class="titlepage"><h1>%s</h1><p class="sub">%s</p><p class="by">%s</p></div>' % (esc(TITLE), esc(SUBTITLE), esc(author)))
    year = datetime.date.today().year
    texts["legal.xhtml"] = page("Informations", '<div class="legal"><p><em>%s</em></p><p>Texte de fiction. Toute ressemblance avec des personnes réelles serait fortuite.</p><p>© %d %s. Tous droits réservés.</p><p>Édition numérique.</p></div>' % (esc(TITLE), year, esc(author)))

    for c in chapters:
        texts[c["id"] + ".xhtml"] = chapter_xhtml(c)

    # Table des matières (nav EPUB3)
    li = []
    for c in chapters:
        label = (c["label"] + " · " if c["label"] and c["n"] else "") + c["title"] if c["n"] else (c["label"] + " — " + c["title"] if c["label"] != c["title"] else c["title"])
        cls = "" if c["n"] else ' class="extra"'
        li.append('<li%s><a href="%s.xhtml">%s</a></li>' % (cls, c["id"], esc(label)))
        nav_items.append((c["id"] + ".xhtml", label))
    nav_body = ('<nav epub:type="toc" id="toc"><h1>Table des matières</h1><ol>%s</ol></nav>' % "".join(li))
    texts["nav.xhtml"] = page("Table des matières", nav_body)

    # Manifeste / spine
    order = ["title.xhtml", "legal.xhtml", "nav.xhtml"] + [c["id"] + ".xhtml" for c in chapters]
    for name in order:
        manifest.append('<item id="%s" href="%s" media-type="application/xhtml+xml"%s/>' % (name.replace(".", "_"), name, ' properties="nav"' if name == "nav.xhtml" else ""))
        spine.append('<itemref idref="%s"/>' % name.replace(".", "_"))
    manifest.append('<item id="css" href="style.css" media-type="text/css"/>')
    manifest.append('<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>')

    cover_xml = ""
    if cover_path and os.path.exists(cover_path):
        ext = os.path.splitext(cover_path)[1].lower().lstrip(".")
        mt = "image/png" if ext == "png" else "image/jpeg"
        manifest.append('<item id="cover-image" href="cover.%s" media-type="%s" properties="cover-image"/>' % (ext, mt))
        manifest.append('<item id="cover_xhtml" href="cover.xhtml" media-type="application/xhtml+xml"/>')
        spine.insert(0, '<itemref idref="cover_xhtml" linear="no"/>')
        cover_xml = '<meta name="cover" content="cover-image"/>'
        texts["cover.xhtml"] = page("Couverture", '<div class="cover"><img src="cover.%s" alt="Couverture de %s"/></div>' % (ext, esc(TITLE)), "cover")

    opf = ('<?xml version="1.0" encoding="utf-8"?>\n'
           '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="%s">\n'
           '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n'
           '<dc:identifier id="bookid">%s</dc:identifier>\n<dc:title>%s</dc:title>\n<dc:creator>%s</dc:creator>\n<dc:language>%s</dc:language>\n'
           '<dc:subject>Science-fiction</dc:subject>\n<dc:description>En 2137, l\'humanité oublie. Élise Varenne part pour 2026, dans le corps de son arrière-arrière-grand-mère. Elle va découvrir que la Rouille n\'a pas d\'origine. Elle a seulement un cycle.</dc:description>\n'
           '<meta property="dcterms:modified">%s</meta>\n%s\n</metadata>\n<manifest>\n%s\n</manifest>\n<spine toc="ncx">\n%s\n</spine>\n'
           '<guide><reference type="text" title="Début" href="%s"/></guide>\n</package>\n') % (
        LANG, uid, esc(TITLE), esc(author), LANG, now, cover_xml, "\n".join(manifest), "\n".join(spine), "chap" if False else chapters[0]["id"] + ".xhtml")

    ncx_nav = "".join('<navPoint id="n%d" playOrder="%d"><navLabel><text>%s</text></navLabel><content src="%s"/></navPoint>' % (i + 1, i + 1, esc(lbl), href) for i, (href, lbl) in enumerate(nav_items))
    ncx = ('<?xml version="1.0" encoding="utf-8"?>\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n'
           '<head><meta name="dtb:uid" content="%s"/><meta name="dtb:depth" content="1"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head>\n'
           '<docTitle><text>%s</text></docTitle>\n<navMap>%s</navMap>\n</ncx>\n') % (uid, esc(TITLE), ncx_nav)

    container = ('<?xml version="1.0" encoding="utf-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
                 '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>\n')

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with zipfile.ZipFile(out_path, "w") as z:
        z.writestr(zipfile.ZipInfo("mimetype"), "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml", container, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/content.opf", opf, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/toc.ncx", ncx, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/style.css", CSS, compress_type=zipfile.ZIP_DEFLATED)
        for name, content in texts.items():
            z.writestr("OEBPS/" + name, content, compress_type=zipfile.ZIP_DEFLATED)
        if cover_xml:
            z.write(cover_path, "OEBPS/cover." + os.path.splitext(cover_path)[1].lower().lstrip("."), compress_type=zipfile.ZIP_STORED)

    words = sum(len(t.split()) for c in chapters for k, t in c["blocks"] if k != "hr")
    print("EPUB : %s — %d sections, ~%d mots, %.0f Ko" % (os.path.relpath(out_path, ROOT), len(chapters), words, os.path.getsize(out_path) / 1024))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--author", default=os.environ.get("ROUILLE_AUTHOR", "L'auteur"))
    ap.add_argument("--cover", default=os.path.join(ROOT, "site", "cover.jpg"))
    ap.add_argument("--out", default=os.path.join(ROOT, "site", "la-rouille.epub"))
    a = ap.parse_args()
    build(a.author, a.cover, a.out)
