# Pixel Horde Survival — Landing Page

Trang giới thiệu và tải game chính thức của **Pixel Horde Survival** (Muno Studio), phát hành qua GitHub Pages.

- Trang: <https://musual-moncra.github.io/Pixel-Horde-Survival.github.io/>
- Bản tải: <https://github.com/Musual-Moncra/Pixel-Horde-Survival.github.io/releases>

## Nội dung repo

| File | Mô tả |
| --- | --- |
| `index.html` | Trang chính: giới thiệu, tính năng, ảnh, tải game, cập nhật, FAQ |
| `styles.css` | Giao diện (dark, pixel, responsive) |
| `app.js` | Đọc `version.json`, chuyển VI/EN, ẩn ảnh thiếu |
| `version.json` | Nguồn dữ liệu phiên bản + changelog + link tải (game cũng đọc file này để báo cập nhật) |
| `scripts/prepare_release.py` | Cập nhật `version.json`, băm SHA-256, sinh `RELEASE_NOTES.md` |
| `scripts/publish_release.sh` | Tạo GitHub Release và tải file build lên (dùng `GH_TOKEN`) |
| `assets/` | Logo, ảnh chụp màn hình |
| `RELEASING.md` | Quy trình phát hành từng bước |

## Phát hành bản mới

Xem [RELEASING.md](RELEASING.md). Tóm tắt:

```bash
python3 scripts/prepare_release.py --version 0.1.1 \
  --notes "Mô tả ngắn" --zip /path/to/PixelHordeSurvival-windows-x86_64.zip \
  --items "Thay đổi 1|Thay đổi 2"

export GH_TOKEN=ghp_xxx
scripts/publish_release.sh 0.1.1 /path/to/PixelHordeSurvival-windows-x86_64.zip

git add -A && git commit -m "Release v0.1.1" && git push
```

## Chạy thử tại máy

```bash
python3 -m http.server 8080
# mở http://localhost:8080
```

`version.json` phải được phục vụ qua HTTP (không mở bằng `file://`) vì trang dùng `fetch`.
