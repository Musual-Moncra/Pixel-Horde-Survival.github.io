#!/usr/bin/env python3
"""Chuẩn bị một bản phát hành cho Pixel Horde Survival.

Việc cần làm:
  1. Cập nhật version.json (phiên bản, ngày, ghi chú, link tải, dung lượng, SHA-256).
  2. Thêm mục mới vào đầu danh sách changelog trong version.json.
  3. Sinh RELEASE_NOTES.md để dán vào trang GitHub Release.

Ví dụ:
  python3 scripts/prepare_release.py \
      --version 0.1.1 \
      --notes "Vá lỗi cân bằng và thêm âm thanh nền." \
      --zip "../builds/PixelHordeSurvival-windows-x86_64.zip" \
      --items "Thêm nhạc nền menu|Sửa lỗi Boss đợt 5|Tối ưu khung hình khi đông quái"
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERSION_FILE = os.path.join(ROOT, "version.json")
NOTES_FILE = os.path.join(ROOT, "RELEASE_NOTES.md")
DEFAULT_ASSET = "PixelHordeSurvival-windows-x86_64.zip"
REPO_URL = "https://github.com/Musual-Moncra/Pixel-Horde-Survival.github.io"
DEFAULT_GAME_SCRIPT = os.environ.get(
    "PHS_GAME_SCRIPT", "/Users/musual/GameVoHan/scripts/game_info.gd"
)


def human_size(num_bytes: int) -> str:
    value = float(num_bytes)
    for unit in ("B", "KB", "MB", "GB"):
        if value < 1024 or unit == "GB":
            return ("%d %s" % (value, unit)) if unit == "B" else ("%.1f %s" % (value, unit))
        value /= 1024.0
    return "%.1f GB" % value


def sha256_of(path: str) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_game_version(script_path: str) -> str | None:
    if not script_path or not os.path.exists(script_path):
        return None
    text = open(script_path, encoding="utf-8").read()
    match = re.search(r'const\s+VERSION\s*:\s*String\s*=\s*"([^"]+)"', text)
    return match.group(1) if match else None


def main() -> int:
    parser = argparse.ArgumentParser(description="Chuẩn bị bản phát hành mới.")
    parser.add_argument("--version", required=True, help="Phiên bản mới, ví dụ 0.1.1")
    parser.add_argument("--notes", default="", help="Mô tả ngắn cho bản phát hành")
    parser.add_argument("--zip", dest="zip_path", default="", help="Đường dẫn file .zip build Windows")
    parser.add_argument("--items", default="", help="Các thay đổi, phân tách bằng dấu |")
    parser.add_argument("--date", default="", help="Ngày phát hành (mặc định hôm nay)")
    parser.add_argument("--asset-name", default=DEFAULT_ASSET, help="Tên file trên GitHub Release")
    parser.add_argument("--dry-run", action="store_true", help="Chỉ in kết quả, không ghi file")
    args = parser.parse_args()

    version = args.version.lstrip("vV")
    date = args.date or dt.date.today().isoformat()

    data = json.load(open(VERSION_FILE, encoding="utf-8"))

    previous = str(data.get("version", ""))
    if previous == version:
        print("CẢNH BÁO: version.json đã ở phiên bản %s." % version)

    game_version = read_game_version(DEFAULT_GAME_SCRIPT)
    if game_version and game_version != version:
        print(
            "CẢNH BÁO: VERSION trong game (%s) khác version.json (%s). "
            "Hãy cập nhật scripts/game_info.gd trước khi phát hành."
            % (game_version, version)
        )

    # Link "latest/download" luôn trỏ tới file của bản phát hành mới nhất và trả về
    # content-disposition: attachment nên bấm là tải ngay, không phải mở trang GitHub.
    url = "%s/releases/latest/download/%s" % (REPO_URL, args.asset_name)
    versioned_url = "%s/releases/download/v%s/%s" % (REPO_URL, version, args.asset_name)
    size = ""
    digest = ""
    if args.zip_path:
        if not os.path.exists(args.zip_path):
            print("LỖI: không tìm thấy file zip: %s" % args.zip_path)
            return 1
        size = human_size(os.path.getsize(args.zip_path))
        digest = sha256_of(args.zip_path)
        print("Đã băm %s" % os.path.basename(args.zip_path))

    data["version"] = version
    data["release_date"] = date
    if args.notes:
        data["notes"] = args.notes
    windows = data.setdefault("download", {}).setdefault("windows", {})
    windows["label"] = windows.get("label") or "Windows 10 / 11 (64-bit)"
    windows["url"] = url
    windows["versioned_url"] = versioned_url
    windows["release_page"] = "%s/releases/latest" % REPO_URL
    windows["file_name"] = args.asset_name
    windows["size"] = size
    windows["sha256"] = digest

    items = [item.strip() for item in args.items.split("|") if item.strip()]
    if items:
        changelog = data.setdefault("changelog", [])
        changelog.insert(0, {"version": version, "date": date, "items": items})

    if args.dry_run:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        return 0

    with open(VERSION_FILE, "w", encoding="utf-8") as handle:
        json.dump(data, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    notes_lines = ["# Pixel Horde Survival v%s — %s" % (version, date), ""]
    if args.notes:
        notes_lines += [args.notes, ""]
    if items:
        notes_lines.append("## Thay đổi")
        notes_lines += ["- %s" % item for item in items]
        notes_lines.append("")
    notes_lines += [
        "## Tải về",
        "- Windows: [%s](%s) (%s)" % (args.asset_name, url, size or "đang cập nhật"),
    ]
    if digest:
        notes_lines.append("- SHA-256: `%s`" % digest)
    with open(NOTES_FILE, "w", encoding="utf-8") as handle:
        handle.write("\n".join(notes_lines) + "\n")

    print("Đã cập nhật version.json -> v%s" % version)
    print("Đã ghi RELEASE_NOTES.md")
    print("Link tải: %s" % url)
    return 0


if __name__ == "__main__":
    sys.exit(main())
