/* MOXDESIGN 作品集 · 3D 环形画廊控制脚本
 * 环形旋转由本脚本驱动（rotateY 变量 + requestAnimationFrame），
 * 支持：自动旋转、左右按钮步进、进度条、正前方作品名跟踪、点击进入作品页。 */
(() => {
  const ring = document.querySelector(".orbit-ring");
  const caption = document.querySelector(".portfolio-ring-caption");
  const prevBtn = document.querySelector(".orbit-prev");
  const nextBtn = document.querySelector(".orbit-next");
  const progressFill = document.querySelector(".orbit-progress-fill");
  const cards = [...document.querySelectorAll(".orbit-card")];
  if (!ring || cards.length < 2) return;

  const STEP = 360 / cards.length;   // 每张卡片的角度间隔
  const DEG_PER_SEC = 360 / 36;      // 36 秒转一圈，给每个作品更充足的停留时间
  const SMOOTH = 0.14;               // 每帧逼近系数（越小越丝滑）
  let rot = 0;                       // 当前显示角度
  let rotTarget = 0;                 // 目标角度
  let pauseUntil = 0;

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
    ring.style.transform = `rotateY(${rot}deg)`;
    const i = ((Math.round(-rot / STEP) % works.length) + works.length) % works.length;
    caption.textContent = works[i].name;
    caption.dataset.route = works[i].route;
    const p = (((rot % 360) + 360) % 360) / 360 * 100;
    if (progressFill) progressFill.style.width = p.toFixed(1) + "%";
  }

  const TICK_MS = 16;               // 60fps 丝滑
  function tick() {
    if (Date.now() >= pauseUntil) rotTarget += DEG_PER_SEC * TICK_MS / 1000;
    // 平滑逼近目标：指数缓动（快起慢收，约 0.5s 平滑到位）
    const diff = rotTarget - rot;
    rot += diff * SMOOTH;
    if (Math.abs(diff) < 0.008) rot = rotTarget;
    render();
  }

  function step(amount) {
    rotTarget += amount * STEP;
    pauseUntil = Date.now() + 1100;  // 短暂停留让用户看清新卡片
  }

  if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => step(1));

  caption.addEventListener("click", () => {
    const route = caption.dataset.route;
    if (route) window.location.href = route;
  });

  render();
  setInterval(tick, TICK_MS);
})();
