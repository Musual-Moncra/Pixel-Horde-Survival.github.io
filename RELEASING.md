# Phát hành bản mới — Pixel Horde Survival

Quy trình 6 bước, dùng cho mỗi bản cập nhật.

## 1. Hoàn thiện & tăng phiên bản trong game

Sửa `scripts/game_info.gd` trong project Godot:

```gdscript
const VERSION: String = "0.1.1"
const BUILD_DATE: String = "2026-09-27"
```

Cập nhật `CHANGELOG.md` của project game (mục mới nhất lên đầu).

## 2. Kiểm tra game trước khi build

```bash
# Bắt lỗi parse/compile toàn project
/Applications/Godot.app/Contents/MacOS/Godot --headless --path /Users/musual/GameVoHan --quit-after 180
```

Chơi thử 1 trận và kiểm tra: menu chính, hướng dẫn, lên cấp, boss 5 phút, lưu/thoát.

## 3. Export bản Windows

```bash
cd /Users/musual/GameVoHan
/Applications/Godot.app/Contents/MacOS/Godot --headless --path . --export-release "Windows Desktop" "builds/windows/PixelHordeSurvival.exe"

mkdir -p builds/release
cd builds/windows
zip -r ../release/PixelHordeSurvival-windows-x86_64.zip . -x "*.pdb"
```

File zip phải chứa `PixelHordeSurvival.exe` ở ngay gốc (không lồng thêm thư mục).

## 4. Cập nhật version.json + changelog

```bash
cd /Users/musual/Pixel-Horde-Survival.github.io
python3 scripts/prepare_release.py \
  --version 0.1.1 \
  --notes "Mô tả ngắn gọn của bản cập nhật." \
  --zip "/Users/musual/GameVoHan/builds/release/PixelHordeSurvival-windows-x86_64.zip" \
  --items "Thay đổi 1|Thay đổi 2|Thay đổi 3"
```

Script sẽ tự: băm SHA-256, ghi dung lượng, cập nhật link tải, thêm mục changelog và sinh `RELEASE_NOTES.md`.

## 5. Tạo GitHub Release + tải file lên

Cách A — dùng token (tự động):

```bash
export GH_TOKEN=ghp_xxx   # token có quyền repo
scripts/publish_release.sh 0.1.1 "/Users/musual/GameVoHan/builds/release/PixelHordeSurvival-windows-x86_64.zip"
```

Cách B — thủ công: vào
<https://github.com/Musual-Moncra/Pixel-Horde-Survival.github.io/releases/new>,
tag `v0.1.1`, dán nội dung `RELEASE_NOTES.md`, kéo thả file zip vào mục *Attach binaries*.

## 6. Đẩy trang web lên

```bash
cd /Users/musual/Pixel-Horde-Survival.github.io
git add -A
git commit -m "Release v0.1.1"
git push
```

GitHub Pages sẽ tự cập nhật sau khoảng 1 phút. Người chơi mở game sẽ thấy thông báo
có bản mới nhờ `version.json` (game đọc file này qua `GameInfo.check_for_updates()`).

---

## Ảnh chụp màn hình

Đặt 3 ảnh vào `assets/`:

- `assets/screenshot-1.png` — chiến đấu giữa bầy quái
- `assets/screenshot-2.png` — trận đánh thủ lĩnh
- `assets/screenshot-3.png` — màn chọn nâng cấp

Tỉ lệ 16:9, tối thiểu 960×540. Nếu thiếu ảnh, trang tự ẩn khung ảnh đó.

## Ghi chú

- Repo game (`/Users/musual/GameVoHan`) hiện chưa có remote GitHub đúng — cần tạo repo riêng
  và thêm remote nếu muốn dùng GitHub Actions để build tự động.
- Workflow export tự động (`export.yml`) đã được chuẩn bị sẵn trong repo game; chỉ chạy được
  sau khi repo game có remote và bật Actions.
