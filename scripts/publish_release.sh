#!/usr/bin/env bash
# Tạo GitHub Release và tải file build lên đó.
#
# Yêu cầu: biến môi trường GH_TOKEN (Personal Access Token có quyền "repo").
#   export GH_TOKEN=ghp_xxx
#
# Cách dùng:
#   scripts/publish_release.sh 0.1.1 "../builds/PixelHordeSurvival-windows-x86_64.zip"
set -euo pipefail

REPO="Musual-Moncra/Pixel-Horde-Survival.github.io"
VERSION="${1:-}"
ZIP_PATH="${2:-}"
ASSET_NAME="${3:-PixelHordeSurvival-windows-x86_64.zip}"

if [[ -z "$VERSION" || -z "$ZIP_PATH" ]]; then
  echo "Cách dùng: scripts/publish_release.sh <version> <đường-dẫn-zip> [tên-asset]"
  exit 1
fi

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "Thiếu GH_TOKEN. Tạo token tại https://github.com/settings/tokens (quyền repo) rồi:"
  echo "  export GH_TOKEN=ghp_xxx"
  exit 1
fi

if [[ ! -f "$ZIP_PATH" ]]; then
  echo "Không tìm thấy file: $ZIP_PATH"
  exit 1
fi

TAG="v${VERSION}"
API="https://api.github.com/repos/${REPO}/releases"
AUTH_HEADER="Authorization: Bearer ${GH_TOKEN}"

echo "==> Tạo release ${TAG}"
RELEASE_JSON=$(curl -sS -X POST "$API" \
  -H "$AUTH_HEADER" \
  -H "Accept: application/vnd.github+json" \
  -d "$(python3 - "$TAG" <<'PY'
import json, sys
print(json.dumps({
    "tag_name": sys.argv[1],
    "name": "Pixel Horde Survival %s" % sys.argv[1],
    "draft": False,
    "prerelease": False,
}, ensure_ascii=False))
PY
)")

UPLOAD_URL=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("upload_url",""))' <<<"$RELEASE_JSON")
RELEASE_HTML=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("html_url",""))' <<<"$RELEASE_JSON")

if [[ -z "$UPLOAD_URL" ]]; then
  echo "Tạo release thất bại:"
  echo "$RELEASE_JSON"
  exit 1
fi

UPLOAD_URL="${UPLOAD_URL%%\{*}?name=${ASSET_NAME}"

echo "==> Tải lên ${ASSET_NAME}"
curl -sS -X POST "$UPLOAD_URL" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/zip" \
  --data-binary "@${ZIP_PATH}" >/dev/null

echo "==> Hoàn tất: ${RELEASE_HTML}"
echo "Nhớ cập nhật version.json: python3 scripts/prepare_release.py --version ${VERSION} ..."
