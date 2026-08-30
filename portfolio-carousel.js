/* MOXDESIGN 作品集 · 主卡轮播控制脚本
 * 中间完整展示当前作品，左右露出相邻作品；支持自动轮播、按钮、滑动和点击进入。 */
(() => {
  const ring = document.querySelector(".orbit-ring");
  const caption = document.querySelector(".portfolio-ring-caption");
  const prevBtn = document.querySelector(".orbit-prev");
  const nextBtn = document.querySelector(".orbit-next");
  const progressFill = document.querySelector(".orbit-progress-fill");
  const stage = document.querySelector(".orbit-stage");
  const cards = [...document.querySelectorAll(".orbit-card")];
  if (!ring || cards.length < 2) return;

  const STEP = 360 / cards.length;   // 每张卡片的角度间隔
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTOPLAY_MS = 4300;
  const INTRO_MS = 1450;
  const INTRO_MORPH_MS = 560;
  let rot = 0;                       // 当前显示角度
  let rotTarget = 0;                 // 目标角度
  let pauseUntil = 0;
  let introRunning = !reduceMotion;
  let introLayer = null;
  let transitionCard = null;

  const works = [
    { name: "淘气堡蹦蹦床", route: "/duotrampoline/" },
    { name: "淘气堡双人自行车", route: "/duobike/" },
    { name: "王者枪神",         route: "/gunhero/" },
    { name: "雪舞熊欢",         route: "/snowbear/" },
    { name: "迷你LED悬空剧场",  route: "/ledtheater/" },
    { name: "百慕大冒险",       route: "/bermuda/" },
    { name: "淘气堡滑雪",       route: "/duoski/" },
    { name: "淘气堡三人自行车", route: "/tricycle/" },
    { name: "美食点点乐",       route: "/foodmatch/" },
    { name: "电玩帮帮龙",       route: "/bobbi/" },
    { name: "电玩蹦蹦熊",       route: "/hopbear/" },
    { name: "潮玩飞船",         route: "/spaceship/" },
    { name: "小狮王",           route: "/lionking/" },
    { name: "兔兔跑步机",       route: "/rabbitrun/" },
    { name: "雪球攻防拳击机",   route: "/snowboxing/" },
    { name: "百变飞车轮胎车",   route: "/tirecar/" }
  ];

  function render() {
    ring.style.transform = "none";
    const i = ((Math.round(-rot / STEP) % works.length) + works.length) % works.length;
    const previous = (i - 1 + cards.length) % cards.length;
    const next = (i + 1) % cards.length;
    cards.forEach((card, index) => {
      const active = index === i;
      card.classList.toggle("is-active", active);
      card.classList.toggle("is-prev", index === previous);
      card.classList.toggle("is-next", index === next);
      card.setAttribute("aria-hidden", active ? "false" : "true");
      card.tabIndex = active ? 0 : -1;
    });
    caption.textContent = works[i].name;
    caption.dataset.route = works[i].route;
    const p = (((rot % 360) + 360) % 360) / 360 * 100;
    if (progressFill) progressFill.style.width = p.toFixed(1) + "%";
  }

  function step(amount, manual = true) {
    if (introRunning) return;
    rotTarget += amount * STEP;
    if (manual) pauseUntil = Date.now() + AUTOPLAY_MS;
    rot = rotTarget;
    render();
  }

  if (prevBtn) prevBtn.addEventListener("click", () => step(1));
  if (nextBtn) nextBtn.addEventListener("click", () => step(-1));

  let swipeStart = null;
  ring.addEventListener("pointerdown", (event) => {
    swipeStart = { x: event.clientX, y: event.clientY };
  });
  ring.addEventListener("pointerup", (event) => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) < 42 || Math.abs(dx) <= Math.abs(dy)) return;
    step(dx < 0 ? -1 : 1);
  });
  ring.addEventListener("pointercancel", () => { swipeStart = null; });

  caption.addEventListener("click", () => {
    if (introRunning) return;
    const route = caption.dataset.route;
    if (route) window.location.href = route;
  });

  function finishIntro() {
    introLayer?.remove();
    introLayer = null;
    ring.style.transition = "none";
    ring.style.opacity = "1";
    stage?.classList.add("is-settling");
    stage?.classList.remove("is-intro");
    transitionCard?.remove();
    transitionCard = null;
    introRunning = false;
    pauseUntil = Date.now() + AUTOPLAY_MS;
    window.requestAnimationFrame(() => {
      ring.style.transition = "";
      ring.style.opacity = "";
      window.requestAnimationFrame(() => stage?.classList.remove("is-settling"));
    });
  }

  function morphIntoCarousel() {
    const frontCard = introLayer?.querySelector(".orbit-card");
    const activeCard = cards[0];
    if (!frontCard || !activeCard) {
      finishIntro();
      return;
    }

    const source = frontCard.getBoundingClientRect();
    const target = activeCard.getBoundingClientRect();
    const sourceStyle = getComputedStyle(frontCard);
    const targetStyle = getComputedStyle(activeCard);

    transitionCard = frontCard.cloneNode(true);
    transitionCard.className = "orbit-transition-card";
    transitionCard.removeAttribute("href");
    transitionCard.setAttribute("aria-hidden", "true");
    Object.assign(transitionCard.style, {
      left: `${source.left}px`,
      top: `${source.top}px`,
      width: `${source.width}px`,
      height: `${source.height}px`,
      borderRadius: sourceStyle.borderRadius,
      boxShadow: sourceStyle.boxShadow
    });
    document.body.append(transitionCard);
    frontCard.style.opacity = "0";
    introLayer.classList.add("is-clearing");
    transitionCard.getBoundingClientRect();
    transitionCard.style.transition = `left ${INTRO_MORPH_MS}ms cubic-bezier(.22,1,.36,1), top ${INTRO_MORPH_MS}ms cubic-bezier(.22,1,.36,1), width ${INTRO_MORPH_MS}ms cubic-bezier(.22,1,.36,1), height ${INTRO_MORPH_MS}ms cubic-bezier(.22,1,.36,1), border-radius ${INTRO_MORPH_MS}ms ease, box-shadow ${INTRO_MORPH_MS}ms ease`;
    Object.assign(transitionCard.style, {
      left: `${target.left}px`,
      top: `${target.top}px`,
      width: `${target.width}px`,
      height: `${target.height}px`,
      borderRadius: targetStyle.borderRadius,
      boxShadow: targetStyle.boxShadow
    });
    window.setTimeout(finishIntro, INTRO_MORPH_MS + 40);
  }

  function playIntro() {
    render();
    stage?.classList.add("is-intro");
    introLayer = ring.cloneNode(true);
    introLayer.className = "orbit-intro-ring";
    const introCards = [...introLayer.querySelectorAll(".orbit-card")];
    introCards.forEach((card) => {
      card.classList.remove("is-active", "is-prev", "is-next");
      card.setAttribute("aria-hidden", "true");
      card.tabIndex = -1;
    });
    ring.parentElement?.append(introLayer);
    introLayer.style.transition = "none";
    introLayer.style.transform = "rotateY(0deg)";
    introLayer.getBoundingClientRect();
    introLayer.style.transition = `transform ${INTRO_MS}ms cubic-bezier(.45,.05,.2,1)`;
    introLayer.style.transform = "rotateY(-360deg)";
    window.setTimeout(morphIntoCarousel, INTRO_MS);
  }

  if (introRunning) playIntro();
  else render();
  if (!reduceMotion) {
    setInterval(() => {
      if (!introRunning && Date.now() >= pauseUntil) step(-1, false);
    }, AUTOPLAY_MS);
  }
})();
