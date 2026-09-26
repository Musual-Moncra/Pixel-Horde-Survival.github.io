/* Pixel Horde Survival — landing page script
 * - Đọc version.json để hiển thị phiên bản, ngày phát hành, link tải và lịch sử cập nhật.
 * - Chuyển đổi song ngữ VI/EN ngay trên trang (không cần tải lại).
 */
(function () {
  "use strict";

  var RELEASES_LATEST = "https://github.com/Musual-Moncra/Pixel-Horde-Survival.github.io/releases/latest";

  var I18N = {
    vi: {
      nav_features: "Tính năng",
      nav_screens: "Hình ảnh",
      nav_download: "Tải game",
      nav_changelog: "Cập nhật",
      nav_faq: "Hỏi đáp",
      hero_eyebrow: "Sinh tồn vô tận • Roguelite bắn quái",
      hero_title: "Sống sót trước bầy quái. Mạnh lên sau mỗi đợt.",
      hero_lede: "Pixel Horde Survival là game sinh tồn vô tận: bạn chỉ có một mạng, quái mạnh dần theo từng phút, và mỗi 5 phút một thủ lĩnh giáng lâm. Lên cấp, chọn kỹ năng, thu thập trang bị và chạy đua cùng kỷ lục của chính mình.",
      cta_download: "Tải miễn phí cho Windows",
      cta_features: "Xem tính năng",
      hero_meta_os: "Windows 10/11 · 64-bit · Không cần cài đặt",
      features_title: "Cơ chế cốt lõi",
      features_lede: "Mọi thứ bạn cần ở một game sinh tồn vô tận — và một chút nữa.",
      f1_title: "🌊 Đợt quái vô tận",
      f1_body: "Đợt mới mỗi 60 giây, xung kích giữa đợt và các đội hình bao vây, gọng kìm, tập kích 4 góc.",
      f2_title: "👹 11 chủng quái",
      f2_body: "Sát thủ dịch chuyển, pháp sư bắn quạt, tử thần triệu hồi, người đá kháng đẩy lùi, nhãn ma bắn laser xuyên phá.",
      f3_title: "👑 5 thủ lĩnh",
      f3_body: "Cứ 5 phút một thủ lĩnh: Hư Vô, Viêm Ma, Tử Thần, Cự Thần, Huyết Ma. Hạ gục để nhận buff vĩnh viễn.",
      f4_title: "🪄 18 kỹ năng",
      f4_body: "Sét, hố đen, hào quang, thiên thạch, ngưng đọng thời gian… nâng cấp theo cấp độ và kích hoạt chủ động bằng phím E.",
      f5_title: "🎒 72 trang bị",
      f5_body: "6 ô trang bị, 5 phẩm cấp từ Thường đến Huyền Thoại, nâng cấp, đột phá và quay Gacha bằng vàng kiếm được.",
      f6_title: "💾 Lưu an toàn",
      f6_body: "Tự động lưu trận dở dang, hồ sơ kỷ lục và chống mở hai cửa sổ game cùng lúc để bảo vệ dữ liệu.",
      screens_title: "Hình ảnh trong game",
      shots_note: "Ảnh chụp trong game sẽ được cập nhật kèm bản phát hành tiếp theo.",
      shot1: "Chiến đấu giữa bầy quái",
      shot2: "Thủ lĩnh và thanh máu",
      shot3: "Chọn nâng cấp khi lên cấp",
      controls_title: "Điều khiển",
      c_move: "di chuyển",
      c_dash: "lướt (bất tử trong lúc lướt)",
      c_shoot: "bắn về hướng ngắm",
      c_auto: "bật/tắt tự động bắn",
      c_skill: "kỹ năng chủ động",
      c_switch: "đổi kỹ năng chủ động",
      c_pause: "tạm dừng / trang bị / thoát menu",
      download_title: "Tải game",
      download_lede: "Miễn phí. Giải nén và chạy — không cần cài đặt.",
      download_btn: "Tải bản mới nhất",
      install_title: "Hướng dẫn cài đặt",
      install_1: "Tải file .zip ở trên và giải nén ra một thư mục bất kỳ.",
      install_2: "Chạy <b>PixelHordeSurvival.exe</b>.",
      install_3: "Nếu Windows SmartScreen cảnh báo: bấm <b>More info</b> → <b>Run anyway</b> (game chưa ký số).",
      install_4: "Dữ liệu lưu tại <code>%APPDATA%\\Godot\\app_userdata\\Pixel Horde Survival</code>.",
      req_title: "Cấu hình tối thiểu",
      req_1: "Windows 10/11 64-bit, CPU 2 nhân 2.0 GHz",
      req_2: "RAM 2 GB, GPU hỗ trợ OpenGL 3.3 / Direct3D 12",
      req_3: "Khoảng 120 MB dung lượng trống",
      changelog_title: "Lịch sử cập nhật",
      loading: "Đang tải…",
      load_error: "Không tải được version.json — hãy xem trực tiếp trang phát hành.",
      faq_title: "Câu hỏi thường gặp",
      faq_q1: "Game có mất phí không?",
      faq_a1: "Không. Bản Windows hoàn toàn miễn phí, không quảng cáo và không có giao dịch trong game.",
      faq_q2: "Có bản cho điện thoại / web không?",
      faq_a2: "Giao diện cảm ứng đã có sẵn trong game; bản Android và bản chơi trên trình duyệt đang được hoàn thiện.",
      faq_q3: "Làm sao biết có bản cập nhật mới?",
      faq_a3: "Mở game và vào Cài đặt → Kiểm tra cập nhật, hoặc xem mục Lịch sử cập nhật trên trang này.",
      faq_q4: "Báo lỗi ở đâu?",
      faq_a4: "Gửi báo lỗi kèm ảnh chụp màn hình qua",
      footer_note: "Trang giới thiệu chính thức. Game phát hành miễn phí."
    },
    en: {
      nav_features: "Features",
      nav_screens: "Screenshots",
      nav_download: "Download",
      nav_changelog: "Updates",
      nav_faq: "FAQ",
      hero_eyebrow: "Endless survival • Horde shooter roguelite",
      hero_title: "Outlast the horde. Grow stronger every wave.",
      hero_lede: "Pixel Horde Survival is an endless survival game: one life, enemies that scale every minute, and a boss every five minutes. Level up, pick skills, collect gear and chase your own record.",
      cta_download: "Download for Windows — free",
      cta_features: "See features",
      hero_meta_os: "Windows 10/11 · 64-bit · No installer needed",
      features_title: "Core mechanics",
      features_lede: "Everything you expect from an endless survival game — and a bit more.",
      f1_title: "🌊 Endless waves",
      f1_body: "A new wave every 60 seconds, mid-wave surges and formations: surround, pincer and four-corner ambush.",
      f2_title: "👹 11 enemy types",
      f2_body: "Blinking assassins, fan-shot mages, summoning necromancers, knockback-immune golems and piercing laser eyes.",
      f3_title: "👑 5 bosses",
      f3_body: "A boss every 5 minutes: Void, Inferno, Reaper, Titan and Blood Sovereign. Defeat them for permanent buffs.",
      f4_title: "🪄 18 skills",
      f4_body: "Lightning, void rift, holy aura, meteor, time stasis… upgraded as you level and cast with the E key.",
      f5_title: "🎒 72 gear items",
      f5_body: "6 slots, 5 rarities from Common to Mythic, upgrades, breakthroughs and a gold gacha.",
      f6_title: "💾 Safe saves",
      f6_body: "Autosaves your run and records, and blocks opening two game windows at once to protect your data.",
      screens_title: "Screenshots",
      shots_note: "In-game screenshots will be added with the next release.",
      shot1: "Fighting inside the horde",
      shot2: "Boss encounter and health bar",
      shot3: "Level-up upgrade choice",
      controls_title: "Controls",
      c_move: "move",
      c_dash: "dash (invulnerable while dashing)",
      c_shoot: "shoot toward the cursor",
      c_auto: "toggle auto-shoot",
      c_skill: "cast active skill",
      c_switch: "switch active skill",
      c_pause: "pause / equipment / back",
      download_title: "Download",
      download_lede: "Free. Unzip and play — no installer required.",
      download_btn: "Download latest",
      install_title: "Install steps",
      install_1: "Download the .zip above and extract it anywhere.",
      install_2: "Run <b>PixelHordeSurvival.exe</b>.",
      install_3: "If Windows SmartScreen warns you: click <b>More info</b> → <b>Run anyway</b> (the build is not code-signed).",
      install_4: "Save data lives in <code>%APPDATA%\\Godot\\app_userdata\\Pixel Horde Survival</code>.",
      req_title: "Minimum requirements",
      req_1: "Windows 10/11 64-bit, dual-core 2.0 GHz CPU",
      req_2: "2 GB RAM, GPU with OpenGL 3.3 / Direct3D 12 support",
      req_3: "About 120 MB free disk space",
      changelog_title: "Update history",
      loading: "Loading…",
      load_error: "Could not load version.json — see the releases page directly.",
      faq_title: "Frequently asked questions",
      faq_q1: "Is the game free?",
      faq_a1: "Yes. The Windows build is completely free, with no ads and no in-game purchases.",
      faq_q2: "Are there mobile / browser builds?",
      faq_a2: "Touch controls already ship inside the game; Android and browser builds are being finished.",
      faq_q3: "How do I know when there is an update?",
      faq_a3: "Open the game and use Settings → Check for updates, or read the Update history section on this page.",
      faq_q4: "Where do I report bugs?",
      faq_a4: "Send a report with a screenshot via",
      footer_note: "Official landing page. The game is released for free."
    }
  };

  var currentLang = "vi";

  function t(key) {
    var table = I18N[currentLang] || I18N.vi;
    return table[key] !== undefined ? table[key] : (I18N.vi[key] || key);
  }

  function applyLanguage(lang) {
    currentLang = I18N[lang] ? lang : "vi";
    document.documentElement.lang = currentLang;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = t(key);
      if (/<[a-z][\s\S]*>/i.test(value)) {
        nodes[i].innerHTML = value;
      } else {
        nodes[i].textContent = value;
      }
    }
    var toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = currentLang === "vi" ? "EN" : "VI";
    renderChangelog(lastData);
    try { localStorage.setItem("phs_lang", currentLang); } catch (e) { /* ignore */ }
  }

  var lastData = null;

  function renderChangelog(data) {
    var host = document.getElementById("changelog-list");
    if (!host) return;
    if (!data || !data.changelog || !data.changelog.length) {
      host.innerHTML = '<p class="muted">' + t("load_error") + "</p>";
      return;
    }
    var html = "";
    for (var i = 0; i < data.changelog.length; i++) {
      var rel = data.changelog[i];
      html += '<article class="release">';
      html += '<div class="release-head"><span class="release-version">v' + escapeHtml(rel.version || "?") + "</span>";
      if (rel.date) html += '<span class="release-date">' + escapeHtml(rel.date) + "</span>";
      html += "</div>";
      if (rel.items && rel.items.length) {
        html += "<ul>";
        for (var j = 0; j < rel.items.length; j++) {
          html += "<li>" + escapeHtml(rel.items[j]) + "</li>";
        }
        html += "</ul>";
      }
      html += "</article>";
    }
    host.innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyVersion(data) {
    var versionBadge = document.getElementById("version-badge");
    var dateEl = document.getElementById("release-date");
    if (versionBadge && data.version) versionBadge.textContent = data.version;
    if (dateEl && data.release_date) dateEl.textContent = data.release_date;

    var win = (data.download && data.download.windows) || null;
    var url = (win && win.url) ? win.url : RELEASES_LATEST;
    var fileName = (win && win.file_name) ? win.file_name : "";
    var size = (win && win.size) ? win.size : "";
    var sha = (win && win.sha256) ? win.sha256 : "";

    var link = document.getElementById("download-link");
    var topBtn = document.getElementById("download-btn");
    if (link) link.href = url;
    if (topBtn) topBtn.href = url;

    var fileEl = document.getElementById("download-file");
    if (fileEl) fileEl.textContent = fileName || "GitHub Releases";
    var extraEl = document.getElementById("download-extra");
    if (extraEl) {
      var parts = [];
      if (size) parts.push(size);
      if (sha) parts.push("SHA-256: " + sha);
      extraEl.textContent = parts.join(" · ");
    }
  }

  function handleMissingScreenshots() {
    var figures = document.querySelectorAll(".shots figure");
    if (!figures.length) return;
    var shown = 0;
    for (var i = 0; i < figures.length; i++) {
      var fig = figures[i];
      var img = fig.querySelector("img");
      if (!img || (img.complete && img.naturalWidth === 0)) {
        fig.style.display = "none";
        continue;
      }
      shown++;
      img.addEventListener("error", function () { fig.style.display = "none"; });
    }
    var note = document.getElementById("shots-note");
    if (note) note.style.display = shown > 0 ? "none" : "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = null;
    try { saved = localStorage.getItem("phs_lang"); } catch (e) { /* ignore */ }
    var browser = (navigator.language || "vi").toLowerCase().indexOf("vi") === 0 ? "vi" : "en";
    applyLanguage(saved || browser);

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLanguage(currentLang === "vi" ? "en" : "vi");
      });
    }

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    handleMissingScreenshots();

    fetch("version.json", { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        lastData = data;
        if (data) applyVersion(data);
        renderChangelog(data);
      })
      .catch(function () { renderChangelog(null); });
  });
})();
