(() => {
  const labels = ["作品集", "关于我", "联系方式"];
  const workNames = [
    "淘气堡蹦蹦床",
    "淘气堡双人自行车",
    "王者枪神",
    "雪舞熊欢",
    "迷你LED悬空剧场",
    "百慕大冒险",
    "淘气堡滑雪",
    "淘气堡三人自行车",
    "美食点点乐",
    "电玩帮帮龙",
    "电玩蹦蹦熊",
    "潮玩飞船",
    "小狮王",
    "兔兔跑步机",
    "雪球攻防拳击机",
    "百变飞车轮胎车"
  ];
  const titleReplacements = new Map(workNames.map((name, index) => [
    `作品 ${String(index + 1).padStart(2, "0")}`,
    name
  ]));
  let selectedWorkName = "";

  function createBermudaDetail() {
    return;
    if (document.getElementById("bermuda-simulator-detail")) return;
    const detail = document.createElement("section");
    detail.id = "bermuda-simulator-detail";
    detail.className = "portfolio-case-detail";
    detail.hidden = true;
    detail.setAttribute("aria-hidden", "true");
    detail.setAttribute("aria-label", "逃出百慕大模拟影院作品详情");
    detail.innerHTML = `
      <button class="portfolio-case-back" type="button" data-close-bermuda>← 返回作品</button>
      <h1 class="portfolio-visually-hidden">逃出百慕大 · 沉浸式动感模拟影院</h1>
      <img class="portfolio-case-board" src="/bermuda-simulator-cinema.png" alt="逃出百慕大沉浸式动感模拟影院完整作品展示页">
    `;
    document.body.appendChild(detail);
  }

  function openBermudaDetail() {
    window.location.href = "/bermuda/";
  }

  function getProductRoute(...labels) {
    const currentWork = labels.join(" ");
    if (currentWork.includes("百慕大冒险")) return "/bermuda/";
    if (currentWork.includes("潮玩飞船")) return "/spaceship/";
    if (currentWork.includes("电玩帮帮龙")) return "/bobbi/";
    if (currentWork.includes("电玩蹦蹦熊")) return "/hopbear/";
    if (currentWork.includes("美食点点乐")) return "/foodmatch/";
    if (currentWork.includes("迷你LED悬空剧场")) return "/ledtheater/";
    if (currentWork.includes("淘气堡滑雪")) return "/duoski/";
    if (currentWork.includes("淘气堡三人自行车")) return "/tricycle/";
    if (currentWork.includes("淘气堡双人自行车")) return "/duobike/";
    if (currentWork.includes("淘气堡蹦蹦床")) return "/duotrampoline/";
    if (currentWork.includes("小狮王")) return "/lionking/";
    if (currentWork.includes("雪舞熊欢")) return "/snowbear/";
    if (currentWork.includes("王者枪神")) return "/gunhero/";
    if (currentWork.includes("兔兔跑步机")) return "/rabbitrun/";
    if (currentWork.includes("雪球攻防拳击机")) return "/snowboxing/";
    if (currentWork.includes("百变飞车轮胎车")) return "/tirecar/";
    return "";
  }

  function closeBermudaDetail() {
    const detail = document.getElementById("bermuda-simulator-detail");
    if (!detail || detail.hidden) return;
    detail.hidden = true;
    detail.setAttribute("aria-hidden", "true");
    document.body.classList.remove("portfolio-case-open");
    const frame = document.getElementById("portfolio-navigation-frame");
    if (frame) frame.style.visibility = "visible";
    document.querySelector(".SectionHomepageHero .portfolio-enter-button")?.focus({ preventScroll: true });
  }

  function bindBermudaDetail() {
    if (document.documentElement.dataset.bermudaDetailBound) return;
    document.documentElement.dataset.bermudaDetailBound = "true";
    document.addEventListener("click", (event) => {
      const galleryCard = event.target.closest(".portfolio-gallery-card");
      const galleryLabel = galleryCard?.getAttribute("aria-label") || galleryCard?.querySelector("img")?.alt || "";
      if (workNames.includes(galleryLabel)) {
        selectedWorkName = galleryLabel;
      }
      if (galleryCard) {
        const galleryRoute = getProductRoute(galleryCard.dataset.portfolioWork || galleryLabel);
        if (galleryRoute) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          window.location.href = galleryRoute;
          return;
        }
      }
      const closeButton = event.target.closest("[data-close-bermuda]");
      if (closeButton) {
        event.preventDefault();
        closeBermudaDetail();
        return;
      }
      const enterButton = event.target.closest(".SectionHomepageHero .portfolio-enter-button");
      if (!enterButton) return;
      const activeTitle = document.querySelector(".SectionHomepageHero h2.overflow-hidden")?.textContent || "";
      const selectedDataset = document.documentElement.dataset.portfolioSelectedWork || "";
      const productRoute = getProductRoute(selectedDataset, selectedWorkName, activeTitle);
      if (!productRoute) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.location.href = productRoute;
    }, true);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeBermudaDetail();
    });
  }

  function customizeSiteIdentity() {
    if (document.title !== "MOXDESIGN") document.title = "MOXDESIGN";
    document.documentElement.lang = "zh-CN";

    const descriptions = document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]');
    descriptions.forEach((meta) => meta.setAttribute("content", "MOXDESIGN 个人作品集"));
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((meta) => {
      meta.setAttribute("content", "MOXDESIGN");
    });

    if (!document.querySelector('link[data-portfolio-icon]')) {
      const icon = document.createElement("link");
      icon.rel = "icon";
      icon.type = "image/svg+xml";
      icon.href = "/portfolio-favicon.svg";
      icon.dataset.portfolioIcon = "true";
      document.head.appendChild(icon);
    }
  }

  function disableOriginalNavigation() {
    const nav = document.querySelector("header nav");
    if (!nav) return;
    nav.style.setProperty("visibility", "visible", "important");
    nav.style.setProperty("pointer-events", "none", "important");
    nav.removeAttribute("aria-hidden");
    const menu = nav.querySelector("ul");
    if (menu) menu.remove();
    const logoLink = nav.querySelector("a[href='/']");
    if (logoLink) logoLink.remove();
    document.querySelectorAll('header a[title="Home"]').forEach((link) => link.remove());
    const header = document.querySelector("header");
    if (header && !header.querySelector(".portfolio-header-brand")) {
      const brand = document.createElement("a");
      brand.className = "portfolio-header-brand";
      brand.href = "/";
      brand.setAttribute("aria-label", "MOXDESIGN 首页");
      brand.innerHTML = '<img src="/portfolio-wordmark.svg" alt="MOXDESIGN">';
      header.appendChild(brand);
    }
  }

  function updateWorkTitles() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const value = node.nodeValue.trim();
      if (titleReplacements.has(value)) {
        node.nodeValue = node.nodeValue.replace(value, titleReplacements.get(value));
      }
    }
    document.querySelectorAll("[alt], [aria-label]").forEach((element) => {
      ["alt", "aria-label"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (titleReplacements.has(value)) element.setAttribute(attribute, titleReplacements.get(value));
      });
    });
    document.querySelectorAll('img[src*="/portfolio-cards/card-"]').forEach((image) => {
      const card = image.closest("button");
      if (!card) return;
      card.classList.add("portfolio-gallery-card");
      card.parentElement?.classList.add("portfolio-gallery-track");
      const match = image.getAttribute("src")?.match(/card-(\d+)\.png/);
      const workName = match ? workNames[Number(match[1]) - 1] : image.alt;
      if (workName) card.dataset.portfolioWork = workName;
      if (!card.dataset.portfolioSelectBound) {
        card.dataset.portfolioSelectBound = "true";
        card.addEventListener("pointerdown", () => {
          document.documentElement.dataset.portfolioSelectedWork = card.dataset.portfolioWork || image.alt || "";
        });
        card.addEventListener("click", () => {
          document.documentElement.dataset.portfolioSelectedWork = card.dataset.portfolioWork || image.alt || "";
        });
      }
    });
  }

  function createPortfolioNavigation() {
    if (document.getElementById("portfolio-navigation-frame")) return;

    const frame = document.createElement("iframe");
    frame.id = "portfolio-navigation-frame";
    frame.title = "作品集导航";
    frame.setAttribute("scrolling", "no");
    Object.assign(frame.style, {
      position: "fixed",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(620px, calc(100vw - 220px))",
      height: "100px",
      border: "0",
      background: "transparent",
      zIndex: "101",
      colorScheme: "normal",
      opacity: "1",
      transition: "opacity .25s ease, transform .25s ease"
    });
    frame.srcdoc = `<!doctype html><html><head><meta name="color-scheme" content="light"><style>
      *{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}
      nav{height:100%;display:flex;align-items:center;justify-content:center;gap:64px;white-space:nowrap}
      button{appearance:none;border:0;padding:8px 0;background:transparent;color:rgba(46,24,92,.72);font:600 clamp(30px,2.8vw,40px)/1 Arial,"PingFang SC",sans-serif;cursor:pointer;transition:color .2s ease,text-shadow .2s ease}
      button:hover,button:focus-visible,button:first-child{color:rgba(255,0,229,.95);text-shadow:0 0 14px rgba(255,0,229,.45)}button:focus-visible{outline:2px solid rgba(255,0,229,.8);outline-offset:5px}
      @media(max-width:700px){nav{justify-content:center;gap:24px;padding:0 12px}button{font-size:22px}}
    </style></head><body><nav aria-label="主导航">${labels.map((label, index) => `<button type="button" data-index="${index}">${label}</button>`).join("")}</nav><script>
      document.addEventListener('click',function(event){var button=event.target.closest('button');if(button)parent.postMessage({type:'portfolio-nav',index:Number(button.dataset.index)},'*')});
    <\/script></body></html>`;
    document.body.appendChild(frame);
  }

  function syncPortfolioNavigation() {
    const frame = document.getElementById("portfolio-navigation-frame");
    if (!frame) return;
    const isAtTop = window.scrollY < 24;
    frame.style.opacity = isAtTop ? "1" : "0";
    frame.style.pointerEvents = isAtTop ? "auto" : "none";
    frame.style.transform = isAtTop
      ? "translateX(-50%)"
      : "translate(-50%, -24px)";
  }

  function removeLowerPages() {
    document.querySelector(".SectionSpotlight")?.remove();
    document.querySelector(".SectionGridCarousel")?.remove();
  }

  function createAboutSection() {
    if (document.getElementById("about")) return;
    const footer = document.querySelector("footer.MainFooter");
    if (!footer?.parentElement) return;

    const section = document.createElement("section");
    section.id = "about";
    section.className = "portfolio-about";
    section.setAttribute("aria-labelledby", "portfolio-about-title");
    section.innerHTML = `
      <div class="portfolio-about-meta">
        <span>ABOUT / 01</span>
        <span>ARCADE &amp; PLAY DESIGN</span>
      </div>
      <div class="portfolio-about-intro">
        <h2 id="portfolio-about-title">关于我</h2>
        <p>我是一名专注电玩与游乐方向的产品设计师。以玩家的动作、情绪和互动关系为起点，把游戏内容、设备结构与空间体验整合成清晰、有吸引力并能够落地的产品。</p>
      </div>
      <dl class="portfolio-about-stats" aria-label="个人经历">
        <div><dt>从业经验</dt><dd>5 年</dd></div>
        <div><dt>所在城市</dt><dd>广州 · 番禺</dd></div>
        <div><dt>落地项目</dt><dd>20+</dd></div>
      </dl>
      <div class="portfolio-about-focus" aria-label="专业方向">
        <article><span>01</span><h3>设计方向</h3><p>电玩设备<br>游乐产品<br>互动体验</p></article>
        <article><span>02</span><h3>核心能力</h3><p>产品定义<br>外观与结构表达<br>体验流程设计</p></article>
        <article><span>03</span><h3>设计关注</h3><p>人机尺度<br>多人互动<br>场景沉浸</p></article>
      </div>
      <div class="portfolio-about-process">
        <div><span>PROCESS</span><h3>从体验出发<br>推进产品落地</h3></div>
        <ol>
          <li><span>01</span><strong>观察场景</strong><small>理解玩家、空间与运营需求</small></li>
          <li><span>02</span><strong>定义体验</strong><small>建立玩法、动作与反馈关系</small></li>
          <li><span>03</span><strong>塑造产品</strong><small>整合造型、结构与品牌语言</small></li>
          <li><span>04</span><strong>协同落地</strong><small>连接研发、生产与现场体验</small></li>
        </ol>
      </div>
      <div class="portfolio-about-collaboration">
        <span>COLLABORATION</span>
        <p>期待与游乐品牌、设备研发团队和内容团队一起，创造让人愿意靠近、参与并再次体验的产品。</p>
      </div>
    `;
    footer.parentElement.insertBefore(section, footer);
  }

  function createContactSection() {
    if (document.getElementById("contact")) return;
    const footer = document.querySelector("footer.MainFooter");
    if (!footer?.parentElement) return;

    const section = document.createElement("section");
    section.id = "contact";
    section.className = "portfolio-contact";
    section.setAttribute("aria-labelledby", "portfolio-contact-title");
    section.innerHTML = `
      <div class="portfolio-contact-meta">
        <span>CONTACT / 02</span>
        <span>LET'S CREATE SOMETHING PLAYFUL</span>
      </div>
      <div class="portfolio-contact-heading">
        <h2 id="portfolio-contact-title">联系方式</h2>
        <p>合作、项目交流与设计分享，欢迎通过以下平台与我保持联系。</p>
      </div>
      <div class="portfolio-contact-channels">
        <figure class="portfolio-contact-channel portfolio-contact-channel-wechat">
          <div><img src="/contact-assets/wechat.png" alt="MOXDESIGN 微信二维码"></div>
          <figcaption><span>01</span><strong>微信</strong><small>WECHAT</small><em>微信号：Moxdesign8</em></figcaption>
        </figure>
        <figure class="portfolio-contact-channel portfolio-contact-channel-rednote">
          <div><img src="/contact-assets/xiaohongshu.png" alt="MOXDESIGN 小红书二维码"></div>
          <figcaption><span>02</span><strong>小红书</strong><small>REDNOTE</small><em>小红书号：1040353360</em></figcaption>
        </figure>
        <figure class="portfolio-contact-channel portfolio-contact-channel-douyin">
          <div><img src="/contact-assets/douyin.png" alt="MOXDESIGN 抖音二维码"></div>
          <figcaption><span>03</span><strong>抖音</strong><small>DOUYIN</small><em>抖音号：1528923528</em></figcaption>
        </figure>
      </div>
    `;
    footer.parentElement.insertBefore(section, footer);
  }

  function customizeHeroControls() {
    const hero = document.querySelector(".SectionHomepageHero");
    if (!hero) return;

    const hotLabel = [...hero.querySelectorAll("h1")].find((element) =>
      element.textContent.trim().toUpperCase() === "HOT"
    );
    if (hotLabel) {
      hotLabel.parentElement.classList.add("portfolio-hot-label");
      let category = hotLabel.nextElementSibling;
      while (category) {
        const next = category.nextElementSibling;
        category.remove();
        category = next;
      }
    }

    let enterControl = null;
    [...hero.querySelectorAll("a, button")].forEach((control) => {
      const compactText = control.textContent.replace(/\s+/g, "").toLowerCase();
      if (compactText === "seeallappsseeallapps" || compactText === "seeallapps") {
        control.remove();
        return;
      }
      if (["launchlaunch", "launch", "启动启动", "启动", "进入进入", "进入"].includes(compactText)) {
        const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (["launch", "启动"].includes(node.nodeValue.trim().toLowerCase())) node.nodeValue = "进入";
        }
        control.setAttribute("aria-label", "进入");
        control.removeAttribute("href");
        control.classList.add("portfolio-enter-button");
        enterControl = control;
      }
    });

    const galleryTrack = hero.querySelector(".portfolio-gallery-track");
    galleryTrack?.parentElement?.parentElement?.classList.add("portfolio-hero-controls");
    const titleHeading = hero.querySelector("h2.overflow-hidden");
    const caption = enterControl?.parentElement?.querySelector("p");
    if (hotLabel && titleHeading) {
      const hotGroup = hotLabel.parentElement;
      hotGroup.style.transform = "none";
      const titleVisual = titleHeading.querySelector("span") || titleHeading;
      const titleRect = titleVisual.getBoundingClientRect();
      const hotRect = hotGroup.getBoundingClientRect();
      const hotX = titleRect.right + 18 - hotRect.left;
      const hotY = titleRect.top + titleRect.height / 2 - hotRect.top - hotRect.height / 2;
      hotGroup.style.transform = `translate(${hotX}px, ${hotY}px)`;
      if (caption && window.matchMedia("(min-width: 768px)").matches) {
        caption.classList.add("portfolio-title-caption");
        caption.style.transform = "none";
        const captionRect = caption.getBoundingClientRect();
        const captionX = titleRect.left - captionRect.left;
        const captionY = titleRect.top - captionRect.height - 4 - captionRect.top;
        caption.style.transform = `translate(${captionX}px, ${captionY}px)`;
      }
    }
    if (enterControl && galleryTrack && !enterControl.dataset.portfolioPositioned) {
      enterControl.style.transform = "none";
      if (window.matchMedia("(min-width: 768px)").matches) {
        const galleryRect = galleryTrack.getBoundingClientRect();
        const buttonRect = enterControl.getBoundingClientRect();
        const titleRect = (titleHeading?.querySelector("span") || titleHeading)?.getBoundingClientRect();
        if (titleRect) {
          if (enterDocumentCenterY === null) {
            enterDocumentCenterY = titleRect.top + titleRect.height / 2 + window.scrollY;
          }
          const lockedEnterCenterY = enterDocumentCenterY - window.scrollY;
          const offsetX = galleryRect.right - buttonRect.width - buttonRect.left;
          const offsetY = lockedEnterCenterY - buttonRect.top - buttonRect.height / 2;
          enterControl.style.setProperty("--portfolio-enter-transform", `translate(${offsetX}px, ${offsetY}px)`);
          enterControl.dataset.portfolioPositioned = "true";
        }
      } else {
        enterControl.dataset.portfolioPositioned = "true";
      }
    }
  }

  function bindHeroCanvasNavigation() {
    const canvas = document.querySelector(".SectionHomepageHero canvas.cursor-move");
    if (!canvas || canvas.dataset.portfolioOpenBound) return;
    canvas.dataset.portfolioOpenBound = "true";

    let pointerStart = null;
    canvas.addEventListener("pointerdown", (event) => {
      pointerStart = { x: event.clientX, y: event.clientY, time: performance.now() };
    });
    canvas.addEventListener("pointerup", (event) => {
      if (!pointerStart) return;
      const distance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
      const duration = performance.now() - pointerStart.time;
      pointerStart = null;
      if (distance > 8 || duration > 600) return;

      const activeTitle = document.querySelector(".SectionHomepageHero h2.overflow-hidden")?.textContent || "";
      const productRoute = getProductRoute(activeTitle);
      if (productRoute) window.location.href = productRoute;
    });
    canvas.addEventListener("pointercancel", () => {
      pointerStart = null;
    });
  }

  let enterDocumentCenterY = null;
  let galleryDocumentTop = null;

  function keepEnterButtonFixed() {
    if (!window.matchMedia("(min-width: 768px)").matches || enterDocumentCenterY === null) return;
    const hero = document.querySelector(".SectionHomepageHero");
    const enterControl = hero?.querySelector(".portfolio-enter-button");
    const galleryTrack = hero?.querySelector(".portfolio-gallery-track");
    if (!enterControl || !galleryTrack) return;

    galleryTrack.style.setProperty("--portfolio-gallery-offset-y", "0px");
    const galleryBaseRect = galleryTrack.getBoundingClientRect();
    if (galleryDocumentTop === null) {
      galleryDocumentTop = galleryBaseRect.top + window.scrollY;
    }
    const galleryOffsetY = galleryDocumentTop - window.scrollY - galleryBaseRect.top;
    galleryTrack.style.setProperty("--portfolio-gallery-offset-y", `${galleryOffsetY}px`);

    enterControl.style.setProperty("--portfolio-enter-transform", "none");
    const buttonRect = enterControl.getBoundingClientRect();
    const galleryRect = galleryTrack.getBoundingClientRect();
    const targetCenterY = enterDocumentCenterY - window.scrollY;
    const offsetX = galleryRect.right - buttonRect.right;
    const offsetY = targetCenterY - buttonRect.top - buttonRect.height / 2;
    enterControl.style.setProperty("--portfolio-enter-transform", `translate(${offsetX}px, ${offsetY}px)`);
  }

  function keepHeroLabelsAligned() {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const hero = document.querySelector(".SectionHomepageHero");
    const titleHeading = hero?.querySelector("h2.overflow-hidden");
    const titleVisual = hero?.querySelector("h2.overflow-hidden span");
    const hotGroup = hero?.querySelector(".portfolio-hot-label");
    const caption = hero?.querySelector(".portfolio-title-caption");
    const galleryTrack = hero?.querySelector(".portfolio-gallery-track");
    if (!titleHeading || !titleVisual || !hotGroup || !caption || !galleryTrack) return;

    titleHeading.style.transform = "none";
    hotGroup.style.transform = "none";
    caption.style.transform = "none";

    const titleRect = titleVisual.getBoundingClientRect();
    const hotRect = hotGroup.getBoundingClientRect();
    const captionRect = caption.getBoundingClientRect();
    const galleryRect = galleryTrack.getBoundingClientRect();

    const titleX = galleryRect.left - titleRect.left;
    const alignedTitleLeft = galleryRect.left;
    const alignedTitleRight = alignedTitleLeft + titleRect.width;
    const titleCenterY = titleRect.top + titleRect.height / 2;
    if (enterDocumentCenterY === null) {
      enterDocumentCenterY = titleCenterY + window.scrollY;
    }
    const lockedTitleCenterY = enterDocumentCenterY - window.scrollY;
    const titleY = lockedTitleCenterY - titleCenterY;
    const alignedTitleTop = titleRect.top + titleY;

    titleHeading.style.transform = `translate(${titleX}px, ${titleY}px)`;
    hotGroup.style.transform = `translate(${alignedTitleRight + 18 - hotRect.left}px, ${lockedTitleCenterY - hotRect.top - hotRect.height / 2}px)`;
    caption.style.transform = `translate(${galleryRect.left - captionRect.left}px, ${alignedTitleTop - captionRect.height - 4 - captionRect.top}px)`;
  }

  function customizeLastPage() {
    document.querySelector(".SectionDiscoverApps")?.remove();

    const footerContent = document.querySelector("footer > div.pt-48");
    if (!footerContent) return;

    const linkColumns = footerContent.children[0];
    if (linkColumns?.textContent.includes("Build on ApeChain")) linkColumns.remove();

    const brandStage = [...footerContent.children].find((element) =>
      element.className.includes("aspect-[3.8]")
    );
    if (brandStage) {
      const oldBrandCanvas = brandStage.querySelector("canvas");
      if (oldBrandCanvas) oldBrandCanvas.style.display = "none";
      const oldFooterBackground = brandStage.querySelector('img[src="/footer-bg.png"]');
      if (oldFooterBackground) oldFooterBackground.style.display = "none";
      if (!brandStage.querySelector(".portfolio-footer-products")) {
        const productWall = document.createElement("div");
        productWall.className = "portfolio-footer-products";
        productWall.setAttribute("aria-hidden", "true");
        workNames.forEach((name, index) => {
          const image = document.createElement("img");
          image.src = `/portfolio-cards/card-${String(index + 1).padStart(2, "0")}.png`;
          image.alt = "";
          image.loading = "lazy";
          productWall.appendChild(image);
        });
        brandStage.prepend(productWall);
      }
      if (!brandStage.querySelector(".portfolio-footer-brand")) {
        const brand = document.createElement("div");
        brand.className = "portfolio-footer-brand";
        brand.textContent = "MOXDESIGN";
        brandStage.appendChild(brand);
      }
    }

    const legalNavigation = footerContent.querySelector('nav[aria-label="Footer navigation links"]');
    if (legalNavigation) legalNavigation.remove();
    const copyright = [...footerContent.querySelectorAll("span")].find((element) =>
      element.textContent.includes("Ape Foundation")
    );
    if (copyright) copyright.textContent = "© 2026 MOXDESIGN";
  }

  window.addEventListener("message", (event) => {
    if (event.source !== document.getElementById("portfolio-navigation-frame")?.contentWindow) return;
    if (event.data?.type !== "portfolio-nav") return;
    if (event.data.index === 0) {
      closeBermudaDetail();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (event.data.index === 1) {
      closeBermudaDetail();
      document.getElementById("about")?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    if (event.data.index === 2) {
      closeBermudaDetail();
      document.getElementById("contact")?.scrollIntoView({ behavior: "auto", block: "start" });
    }
  });

  function initialize() {
    disableOriginalNavigation();
    createPortfolioNavigation();
    createBermudaDetail();
    bindBermudaDetail();
    updateWorkTitles();
    customizeHeroControls();
    bindHeroCanvasNavigation();
    removeLowerPages();
    createAboutSection();
    createContactSection();
    customizeLastPage();
  }

  initialize();
  syncPortfolioNavigation();
  window.setTimeout(customizeSiteIdentity, 1200);
  window.setInterval(keepEnterButtonFixed, 32);
  window.setInterval(keepHeroLabelsAligned, 160);
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
  window.addEventListener("resize", initialize);
  window.addEventListener("scroll", syncPortfolioNavigation, { passive: true });
  const portfolioObserver = new MutationObserver(initialize);
  const observePortfolioRoot = () => {
    const root = document.documentElement;
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    try {
      portfolioObserver.observe(root, { childList: true, subtree: true });
    } catch {
      // A navigation may replace the document while the observer is attaching.
    }
  };
  observePortfolioRoot();
  document.addEventListener("DOMContentLoaded", observePortfolioRoot, { once: true });
})();
