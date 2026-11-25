#!/usr/bin/env python3
"""Vendor the original CC BY-SA Armenian handwriting SVGs from Wikimedia Commons."""
from pathlib import Path
from hashlib import md5
from urllib.request import Request, urlopen
from urllib.parse import quote
import time
import xml.etree.ElementTree as ET

out = Path(__file__).resolve().parent / "images"
out.mkdir(exist_ok=True)
letters = [chr(n) for n in range(0x531, 0x557) if n != 0x552] + ["Ու", "Եւ"]
for letter in letters:
    name = letter + "_handwritten.svg"
    dest = out / name
    if dest.exists():
        continue
    h = md5(name.encode("utf-8")).hexdigest()
    url = f"https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{quote(name)}"
    req = Request(url, headers={"User-Agent": "ScriptAtlas/1.0 (https://github.com/aeirya/learn-writing-systems)"})
    for attempt in range(4):
        try:
            with urlopen(req, timeout=30) as response:
                payload = response.read()
            assert ET.fromstring(payload).tag == "{http://www.w3.org/2000/svg}svg", name
            dest.write_bytes(payload)
            print(name, flush=True)
            break
        except Exception:
            if attempt == 3:
                raise
            time.sleep(3 * (attempt + 1))
    time.sleep(0.5)
assert len(list(out.glob("*_handwritten.svg"))) == 39
