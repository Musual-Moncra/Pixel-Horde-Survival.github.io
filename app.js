/* Pixel Horde Survival — landing page script
 * - i18n VI/EN (không tải lại trang).
 * - Đọc version.json: phiên bản, ngày phát hành, link tải trực tiếp, lịch sử cập nhật.
 * - Hiệu ứng: hạt pixel trôi, reveal khi cuộn, thanh tiến trình, ánh sáng theo con trỏ.
 */
(function () {
  "use strict";

  var RELEASES_LATEST = "https://github.com/Musual-Moncra/Pixel-Horde-Survival.github.io/releases/latest";

  var I18N = {
    vi: {
      nav_play: "Chơi ngay",
      nav_features: "Tính năng",
      nav_screens: "Hình ảnh",
      nav_download: "Tải game",
      nav_changelog: "Cập nhật",
      nav_faq: "Hỏi đáp",
      hero_eyebrow: "Sinh tồn vô tận · Roguelite bắn quái",
      hero_title: "Sống sót trước bầy quái. Mạnh lên sau mỗi đợt.",
      hero_lede: "Một mạng duy nhất, quái mạnh dần theo từng phút và cứ năm phút một thủ lĩnh giáng lâm. Lên cấp, chọn kỹ năng, thu thập trang bị và chạy đua cùng kỷ lục của chính mình.",
      cta_play: "▶ Chơi trên điện thoại",
      cta_download: "Tải cho Windows",
      cta_features: "Xem tính năng",
      release_link: "Trang phát hành",
      hero_meta_os: "Điện thoại (trình duyệt) hoặc Windows 10/11 · Miễn phí",
      features_title: "Cơ chế cốt lõi",
      features_lede: "Mọi thứ cần có ở một game sinh tồn vô tận.",
      f1_title: "Đợt quái vô tận",
      f1_body: "Đợt mới mỗi 60 giây, xung kích giữa đợt và các đội hình bao vây, gọng kìm, tập kích bốn góc.",
      f2_title: "11 chủng quái",
      f2_body: "Sát thủ dịch chuyển, pháp sư bắn quạt, tử thần triệu hồi, người đá kháng đẩy lùi, nhãn ma bắn laser xuyên phá.",
      f3_title: "5 thủ lĩnh",
      f3_body: "Cứ năm phút một thủ lĩnh: Hư Vô, Viêm Ma, Tử Thần, Cự Thần, Huyết Ma. Hạ gục để nhận buff vĩnh viễn.",
      f4_title: "18 kỹ năng",
      f4_body: "Sét, hố đen, hào quang, thiên thạch, ngưng đọng thời gian. Nâng theo cấp độ và kích hoạt chủ động bằng phím E.",
      f5_title: "72 trang bị",
      f5_body: "Sáu ô trang bị, năm phẩm cấp từ Thường đến Thần Thoại, nâng cấp, đột phá không giới hạn sao và quay Gacha bằng vàng.",
      f6_title: "Lưu an toàn",
      f6_body: "Tự động lưu mỗi 30 giây, sao lưu dự phòng và chống mở hai cửa sổ game cùng lúc.",
      screens_title: "Hình ảnh trong game",
      shots_note: "Ảnh chụp trong game sẽ được cập nhật kèm bản phát hành tiếp theo.",
      shot1: "Chiến đấu giữa bầy quái",
      shot2: "Thủ lĩnh và thanh máu",
      shot3: "Chọn nâng cấp khi lên cấp",
      controls_title: "Điều khiển",
      c_move: "di chuyển",
      c_dash: "lướt, bất tử trong lúc lướt",
      c_shoot: "bắn về hướng ngắm",
      c_auto: "bật/tắt tự động bắn",
      c_skill: "kỹ năng chủ động",
      c_switch: "đổi kỹ năng chủ động",
      c_pause: "tạm dừng, trang bị, thoát menu",
      download_title: "Tải bản Windows",
      download_lede: 'Trên PC hãy tải bản Windows bên dưới. Bản chơi trên trình duyệt chỉ dành cho <a class="link" href="#play">điện thoại và máy tính bảng</a>.',
      play_title: "Chơi trên điện thoại (trình duyệt)",
      play_lede: "Bản web dành riêng cho điện thoại và máy tính bảng: bấm là vào trận, không cần tải. Trên PC, hãy tải bản Windows (.exe) để chơi bằng bàn phím và chuột.",
      play_menu_link: "Vào menu chính",
      play_f1_title: "Chỉ dành cho điện thoại",
      play_f1_body: "Bản web tự nhận diện thiết bị: mở trên PC sẽ hiện nút tải bản Windows (.exe) thay vì vào game — không tốn dữ liệu tải engine.",
      play_f2_title: "Không cần tải",
      play_f2_body: "Chạy thẳng trong Chrome hoặc Safari trên điện thoại. Joystick ảo và nút cảm ứng tự hiện; xoay ngang máy để có màn hình rộng nhất.",
      play_f3_title: "Tiến trình được giữ",
      play_f3_body: "Kỷ lục, vàng và trang bị lưu ngay trong trình duyệt — mở lại vẫn còn.",
      play_tip: "Mẹo trên điện thoại: thêm trang này vào màn hình chính để mở như một ứng dụng.",
      download_btn: "Tải bản mới nhất",
      install_title: "Hướng dẫn cài đặt",
      install_1: "Tải file .zip ở trên và giải nén ra một thư mục bất kỳ.",
      install_2: "Chạy <b>Pixel Horde Survival.exe</b>.",
      install_3: "Nếu Windows SmartScreen cảnh báo: bấm <b>More info</b> → <b>Run anyway</b> (game chưa ký số).",
      install_4: "Dữ liệu lưu tại <code>%APPDATA%\\Godot\\app_userdata\\Pixel Horde Survival</code>.",
      req_title: "Cấu hình tối thiểu",
      req_1: "Windows 10/11 64-bit, CPU 2 nhân 2.0 GHz",
      req_2: "RAM 2 GB, GPU hỗ trợ OpenGL 3.3 / Direct3D 12",
      req_3: "Khoảng 120 MB dung lượng trống",
      changelog_title: "Cập nhật",
      loading: "Đang tải…",
      load_error: "Không tải được version.json — xem trực tiếp trang phát hành.",
      faq_title: "Hỏi đáp",
      faq_q1: "Game có mất phí không?",
      faq_a1: "Không. Bản Windows miễn phí hoàn toàn, không quảng cáo và không có giao dịch trong game.",
      faq_q2: "Có bản cho điện thoại hoặc trình duyệt không?",
      faq_a2: "Có. Bấm “Chơi ngay” để chơi trực tiếp trên trình duyệt, cả trên máy tính lẫn điện thoại — không cần tải. Bản cài riêng cho Android đang được hoàn thiện.",
      faq_q3: "Làm sao biết có bản cập nhật mới?",
      faq_a3: "Mở game, vào Cài đặt → Kiểm tra cập nhật, hoặc xem mục Cập nhật trên trang này.",
      faq_q4: "Báo lỗi ở đâu?",
      faq_a4: "Gửi báo lỗi kèm ảnh chụp màn hình qua",
      footer_note: "Trang giới thiệu chính thức. Game phát hành miễn phí."
    },
    en: {
      nav_play: "Play now",
      nav_features: "Features",
      nav_screens: "Screenshots",
      nav_download: "Download",
      nav_changelog: "Updates",
      nav_faq: "FAQ",
      hero_eyebrow: "Endless survival · Horde shooter roguelite",
      hero_title: "Outlast the horde. Grow stronger every wave.",
      hero_lede: "One life, enemies that scale every minute, and a boss every five minutes. Level up, pick skills, collect gear and chase your own record.",
      cta_play: "▶ Play on phone",
      cta_download: "Download for Windows",
      cta_features: "See features",
      release_link: "Release page",
      hero_meta_os: "Phone browser or Windows 10/11 · Free",
      features_title: "Core mechanics",
      features_lede: "Everything an endless survival game needs.",
      f1_title: "Endless waves",
      f1_body: "A new wave every 60 seconds, mid-wave surges and formations: surround, pincer and four-corner ambush.",
      f2_title: "11 enemy types",
      f2_body: "Blinking assassins, fan-shot mages, summoning necromancers, knockback-immune golems and piercing laser eyes.",
      f3_title: "5 bosses",
      f3_body: "A boss every five minutes: Void, Inferno, Reaper, Titan and Blood Sovereign. Defeat them for permanent buffs.",
      f4_title: "18 skills",
      f4_body: "Lightning, void rift, holy aura, meteor, time stasis. Upgraded as you level and cast with the E key.",
      f5_title: "72 gear items",
      f5_body: "Six slots, five rarities from Common to Mythic, upgrades, unlimited-star breakthroughs and a gold gacha.",
      f6_title: "Safe saves",
      f6_body: "Autosaves every 30 seconds with a backup copy, and blocks opening two game windows at once.",
      screens_title: "Screenshots",
      shots_note: "In-game screenshots will be added with the next release.",
      shot1: "Fighting inside the horde",
      shot2: "Boss encounter and health bar",
      shot3: "Level-up upgrade choice",
      controls_title: "Controls",
      c_move: "move",
      c_dash: "dash, invulnerable while dashing",
      c_shoot: "shoot toward the cursor",
      c_auto: "toggle auto-shoot",
      c_skill: "cast active skill",
      c_switch: "switch active skill",
      c_pause: "pause, equipment, back",
      download_title: "Download for Windows",
      download_lede: 'On PC, download the Windows build below. The browser version is only for <a class="link" href="#play">phones and tablets</a>.',
      play_title: "Play on your phone (browser)",
      play_lede: "The browser build is for phones and tablets only: tap and you are in the fight, nothing to download. On PC, grab the Windows build (.exe) to play with keyboard and mouse.",
      play_menu_link: "Main menu",
      play_f1_title: "Phones only",
      play_f1_body: "The web build detects your device: on PC it shows a download button for the Windows build (.exe) instead of starting the game — no engine download wasted.",
      play_f2_title: "Nothing to download",
      play_f2_body: "Runs right in Chrome or Safari on your phone. A virtual joystick and touch buttons appear automatically; rotate to landscape for the widest view.",
      play_f3_title: "Progress is kept",
      play_f3_body: "Records, gold and gear are stored in your browser and are still there when you return.",
      play_tip: "Phone tip: add this page to your home screen to open it like an app.",
      download_btn: "Download latest",
      install_title: "Install steps",
      install_1: "Download the .zip above and extract it anywhere.",
      install_2: "Run <b>Pixel Horde Survival.exe</b>.",
      install_3: "If Windows SmartScreen warns you: click <b>More info</b> → <b>Run anyway</b> (the build is not code-signed).",
      install_4: "Save data lives in <code>%APPDATA%\\Godot\\app_userdata\\Pixel Horde Survival</code>.",
      req_title: "Minimum requirements",
      req_1: "Windows 10/11 64-bit, dual-core 2.0 GHz CPU",
      req_2: "2 GB RAM, GPU with OpenGL 3.3 / Direct3D 12 support",
      req_3: "About 120 MB free disk space",
      changelog_title: "Updates",
      loading: "Loading…",
      load_error: "Could not load version.json — see the releases page directly.",
      faq_title: "FAQ",
      faq_q1: "Is the game free?",
      faq_a1: "Yes. The Windows build is completely free, with no ads and no in-game purchases.",
      faq_q2: "Are there mobile or browser builds?",
      faq_a2: "Yes. Tap \u201cPlay now\u201d to play right in your browser, on desktop or phone — no download. A standalone Android build is still in the works.",
      faq_q3: "How do I know when there is an update?",
      faq_a3: "Open the game and use Settings → Check for updates, or read the Updates section on this page.",
      faq_q4: "Where do I report bugs?",
      faq_a4: "Send a report with a screenshot via",
      footer_note: "Official landing page. The game is released for free."
    }
  };

  var currentLang = "vi";
  var lastData = null;

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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderChangelog(data) {
    var host = document.getElementById("changelog-list");
    if (!host) return;
    if (!data || !data.changelog || !data.changelog.length) {
      host.innerHTML = '<p class="meta">' + escapeHtml(t("load_error")) + "</p>";
      return;
    }
    var html = "";
    for (var i = 0; i < data.changelog.length; i++) {
      var rel = data.changelog[i];
      html += '<article class="release" data-reveal>';
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
    if (window.PHS_FX) window.PHS_FX.scan(host);
  }

  function applyVersion(data) {
    var versionBadge = document.getElementById("version-badge");
    var dateEl = document.getElementById("release-date");
    if (versionBadge && data.version) versionBadge.textContent = data.version;
    if (dateEl && data.release_date) dateEl.textContent = data.release_date;

    // GitHub Pages cache index.html/index.pck theo cùng một URL trong một
    // khoảng thời gian. Gắn phiên bản vào URL /play/ để mỗi release tạo URL
    // mới, buộc trình duyệt tải lại shell thay vì mở nhầm bản đã cache.
    if (data.version) {
      var playLinks = document.querySelectorAll('a[href*="play/"]');
      for (var pi = 0; pi < playLinks.length; pi++) {
        try {
          var playUrl = new URL(playLinks[pi].href, window.location.href);
          playUrl.searchParams.set("v", data.version);
          playLinks[pi].href = playUrl.href;
        } catch (e) { /* giữ href gốc nếu URL không hợp lệ */ }
      }
    }

    var win = (data.download && data.download.windows) || null;
    var url = (win && win.url) ? win.url : RELEASES_LATEST;
    var releasePage = (win && win.release_page) ? win.release_page : RELEASES_LATEST;
    var fileName = (win && win.file_name) ? win.file_name : "";
    var size = (win && win.size) ? win.size : "";
    var sha = (win && win.sha256) ? win.sha256 : "";

    var link = document.getElementById("download-link");
    var topBtn = document.getElementById("download-btn");
    if (link) link.href = url;
    if (topBtn) topBtn.href = url;
    var releaseLink = document.getElementById("release-link");
    if (releaseLink) releaseLink.href = releasePage;

    var fileEl = document.getElementById("download-file");
    if (fileEl) fileEl.textContent = fileName || "GitHub Releases";
    var extraEl = document.getElementById("download-extra");
    if (extraEl) {
      var parts = [];
      if (size) parts.push(size);
      if (sha) parts.push("SHA-256 " + sha);
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

  /* ==========================================================
     Hiệu ứng chuyển động
     ========================================================== */

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  function initProgressBar() {
    if (reduceMotion) return;
    var root = document.documentElement;
    var queued = false;
    function update() {
      queued = false;
      var max = document.body.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--progress", ratio.toFixed(4));
    }
    window.addEventListener("scroll", function () {
      if (!queued) { queued = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initHeaderState() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
      return null;
    }
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-in");
          observer.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    return observer;
  }

  function initGlow() {
    var glow = document.getElementById("glow");
    if (!glow || reduceMotion || !finePointer) return;
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var x = tx, y = ty, running = false;
    function loop() {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      glow.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.4) {
        window.requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY;
      glow.classList.add("is-on");
      if (!running) { running = true; window.requestAnimationFrame(loop); }
    }, { passive: true });
    window.addEventListener("pointerleave", function () { glow.classList.remove("is-on"); });
  }

  function initField() {
    var canvas = document.getElementById("field");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, parts = [];
    var colors = ["#6fd6ff", "#6fd6ff", "#ffd23f", "#ff6b6b", "#ededed"];
    var paused = false;

    function make(initial) {
      var size = 1 + Math.floor(Math.random() * 3);
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 6,
        s: size,
        vy: 0.12 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.14,
        a: 0.08 + Math.random() * 0.3,
        spark: Math.random() < 0.18,
        c: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.4
      };
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round((w * h) / 19000);
      count = Math.max(24, Math.min(w < 700 ? 44 : 96, count));
      parts = [];
      for (var i = 0; i < count; i++) parts.push(make(true));
    }

    var t0 = 0;
    function frame(ts) {
      if (paused) return;
      if (!t0) t0 = ts;
      var time = (ts - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -6 || p.x < -8 || p.x > w + 8) parts[i] = make(false);
        var twinkle = 0.55 + 0.45 * Math.sin(time * p.speed + p.phase);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.a * twinkle));
        ctx.fillStyle = p.c;
        var px = Math.round(p.x);
        var py = Math.round(p.y);
        ctx.fillRect(px, py, p.s, p.s);
        // Thỉnh thoảng lóe thành hình thánh giá nhỏ cho cảm giác "lấp lánh".
        if (p.spark && twinkle > 0.82 && p.s > 1) {
          ctx.fillRect(px - p.s, py, p.s, p.s);
          ctx.fillRect(px + p.s, py, p.s, p.s);
          ctx.fillRect(px, py - p.s, p.s, p.s);
          ctx.fillRect(px, py + p.s, p.s, p.s);
        }
      }
      ctx.globalAlpha = 1;
      window.requestAnimationFrame(frame);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        paused = true;
      } else if (paused) {
        paused = false;
        t0 = 0;
        window.requestAnimationFrame(frame);
      }
    });

    window.addEventListener("resize", resize);
    resize();
    window.requestAnimationFrame(frame);
  }

  /* ==========================================================
     Khởi động
     ========================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    // Ưu tiên số một: đảm bảo nội dung hiện ra kể cả khi phần còn lại gặp lỗi.
    var observer = initReveal();
    window.PHS_FX = {
      scan: function (root) {
        var scope = root || document;
        var items = scope.querySelectorAll("[data-reveal]:not(.is-in)");
        for (var i = 0; i < items.length; i++) {
          var el = items[i];
          var parent = el.parentElement;
          var index = 0;
          if (parent) {
            var sibs = parent.children;
            for (var j = 0; j < sibs.length; j++) {
              if (sibs[j] === el) break;
              if (sibs[j].hasAttribute && sibs[j].hasAttribute("data-reveal")) index++;
            }
          }
          el.style.setProperty("--i", String(Math.min(index, 8)));
          if (observer) observer.observe(el); else el.classList.add("is-in");
        }
      }
    };
    window.PHS_FX.scan(document);

    try {
      initProgressBar();
      initHeaderState();
      initGlow();
      initField();
    } catch (e) { /* hiệu ứng lỗi không được làm hỏng trang */ }

    try {
      var saved = null;
      try { saved = localStorage.getItem("phs_lang"); } catch (e2) { /* ignore */ }
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
    } catch (e3) { /* ignore */ }

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
