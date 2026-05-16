import zipfile
import re
import sys

path = sys.argv[1]
with zipfile.ZipFile(path) as z:
    xml = z.read("word/document.xml").decode("utf-8")

text = re.sub(r"</w:p>", "\n", xml)
text = re.sub(r"<[^>]+>", "", text)
for ent, ch in [("&lt;", "<"), ("&gt;", ">"), ("&amp;", "&")]:
    text = text.replace(ent, ch)
lines = [l.strip() for l in text.split("\n") if l.strip()]
print("\n".join(lines))
