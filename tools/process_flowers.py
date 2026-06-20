#!/usr/bin/env python3
"""
Batch-process flower JPGs (flat white background) into transparent PNGs
ready for the canvas drawImage() swap in the flower jar prototype.

What it does to each image:
  1. Keys out near-white pixels -> alpha 0, with soft-edged anti-aliasing
     on the boundary so petal edges don't look hard-cut.
  2. Crops to the tight bounding box of the non-transparent content.
  3. Pads that crop into a square canvas (so every output image is 1:1,
     which matches how the jar code centers art inside a circular body).
  4. Resizes to a consistent output size (default 240x240 - comfortably
     bigger than the ~26-38px on-screen draw size, so it stays crisp).
  5. Saves as PNG with alpha into an output folder.

Usage:
  pip install pillow --break-system-packages
  python3 process_flowers.py /path/to/jpgs /path/to/output
  aka, in Desktop/meetpair: 
  python3 tools/process_flowers.py assets/images/flowers/raw/***DATEFOLDERNAME*** assets/images/flowers/processed

If no paths given, defaults to ./flowers_in -> ./flowers_out
"""

import sys
import os
from PIL import Image

WHITE_THRESHOLD = 235      # pixels with all channels >= this are "background"
SOFT_EDGE_RANGE = 25       # how many levels below threshold to feather alpha over
OUTPUT_SIZE = 240          # final square output size in pixels
PADDING_RATIO = 0.06       # fraction of output size left as breathing room around the crop


def remove_white_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            min_channel = min(r, g, b)

            if min_channel >= WHITE_THRESHOLD:
                pixels[x, y] = (r, g, b, 0)
            elif min_channel >= WHITE_THRESHOLD - SOFT_EDGE_RANGE:
                fade = (WHITE_THRESHOLD - min_channel) / SOFT_EDGE_RANGE
                pixels[x, y] = (r, g, b, int(255 * fade))
            else:
                pixels[x, y] = (r, g, b, 255)

    return img


def crop_to_content(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if bbox:
        return img.crop(bbox)
    return img


def pad_to_square(img: Image.Image, padding_ratio: float) -> Image.Image:
    w, h = img.size
    side = max(w, h)
    side = int(side / (1 - 2 * padding_ratio))

    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset_x = (side - w) // 2
    offset_y = (side - h) // 2
    square.paste(img, (offset_x, offset_y), img)
    return square


def process_one(in_path: str, out_path: str):
    img = Image.open(in_path)
    img = remove_white_background(img)
    img = crop_to_content(img)
    img = pad_to_square(img, PADDING_RATIO)
    img = img.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)
    img.save(out_path, "PNG")


def main():
    in_dir = sys.argv[1] if len(sys.argv) > 1 else "flowers_in"
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "flowers_out"

    if not os.path.isdir(in_dir):
        print(f"Input folder not found: {in_dir}")
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    valid_ext = (".jpg", ".jpeg", ".png")
    files = sorted(f for f in os.listdir(in_dir) if f.lower().endswith(valid_ext))

    if not files:
        print(f"No image files found in {in_dir}")
        sys.exit(1)

    existing = [f for f in os.listdir(out_dir) if f.startswith("flower-") and f.endswith(".png")]
    existing_numbers = []
    for f in existing:
        try:
            existing_numbers.append(int(f.split("-")[1]))
        except (IndexError, ValueError):
            pass
    start_index = max(existing_numbers, default=0) + 1

    for offset, filename in enumerate(files):
        i = start_index + offset
        in_path = os.path.join(in_dir, filename)
        name_no_ext = os.path.splitext(filename)[0]
        out_path = os.path.join(out_dir, f"flower-{i:02d}-{name_no_ext}.png")
        try:
            process_one(in_path, out_path)
            print(f"  {filename} -> {os.path.basename(out_path)}")
        except Exception as e:
            print(f"  FAILED on {filename}: {e}")

    print(f"\nDone. {len(files)} images written to {out_dir}/")


if __name__ == "__main__":
    main()
