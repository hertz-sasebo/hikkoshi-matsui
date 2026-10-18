/* ==========================================================
   motion.js … 動き（UI/UX）だけをまとめたファイル
   main.js（メニュー・ヘッダー）とは独立。外せば動きのない元の状態に戻ります
   ========================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  document.documentElement.classList.add('js-motion');

  /* ---------- スクロール進捗バー＋トラック ---------- */
  const progress = document.createElement('div');
  progress.className = 'progress is-top';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<div class="progress__bar"></div><div class="progress__truck"><svg><use href="#i-truck"></use></svg></div>';
  document.body.appendChild(progress);
  const bar = $('.progress__bar', progress);
  const truck = $('.progress__truck', progress);

  /* ---------- 現れる要素に印をつける（HTMLは変更しない） ---------- */
  const groups = [
    '.sec-head', '.cards > .card', '.price-card', '.info-band__item', '.more-link-wrap',
    '.faq__item', '.area__text', '.about__photo', '.about__text', '.cta__body', '.cta__cat'
  ];
  $$(groups.join(',')).forEach((el) => {
    el.classList.add('rv');
    // 同じ並びの中で少しずつ遅らせる
    const sibs = [...el.parentNode.children].filter((c) => c.classList.contains('rv'));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.1 + 's');
  });

  /* 引越しの流れ：トラックが走るレーンを追加 */
  const flow = $('.flow');
  let flowWrap = null;
  if (flow) {
    flowWrap = document.createElement('div');
    flowWrap.className = 'flow-wrap';
    flow.parentNode.insertBefore(flowWrap, flow);
    flowWrap.appendChild(flow);
    const lane = document.createElement('div');
    lane.className = 'flow-track';
    lane.setAttribute('aria-hidden', 'true');
    lane.innerHTML = '<div class="flow-track__truck"><svg><use href="#i-truck"></use></svg></div>';
    flowWrap.appendChild(lane);
  }

  /* 星を1つずつに分ける */
  $$('.stars').forEach((s) => {
    s.innerHTML = [...s.textContent.trim()].map((c) => `<span class="star">${c}</span>`).join('');
  });

  /* 料金の数字をカウントアップ用に */
  const counts = $$('.price-table--basic strong').map((el) => {
    const n = parseInt(el.textContent.replace(/[^\d]/g, ''), 10);
    el.classList.add('count');
    el.dataset.to = n;
    return el;
  });
  const runCount = (el) => {
    const to = +el.dataset.to;
    if (reduce || !to) return;
    const dur = 1100, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString('ja-JP') + '円';
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0円';
    requestAnimationFrame(tick);
  };

  /* ---------- 画面に入ったら .is-in ---------- */
  const targets = [
    ...$$('.rv'), ...$$('.stars'), ...$$('.area__tags'), ...counts,
    ...(flowWrap ? [flowWrap] : []), ...$$('.cta')
  ];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.classList.contains('count')) runCount(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  targets.forEach((el) => io.observe(el));

  /* FV は読み込み直後に開始 */
  const fv = $('.fv');
  requestAnimationFrame(() => setTimeout(() => fv && fv.classList.add('is-in'), reduce ? 0 : 150));

  /* ---------- スクロール連動（進捗バー・スマホ固定ボタン） ---------- */
  const spCta = $('.sp-cta');
  let ticking = false, stopTimer = null;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;
    bar.style.transform = `scaleX(${p})`;
    truck.style.transform = `translateX(calc(${p} * (100vw - 30px)))`;
    progress.classList.toggle('is-top', y < 10);
    progress.classList.add('is-moving');
    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => progress.classList.remove('is-moving'), 160);
    // FVのボタンが見えなくなったらスマホ固定ボタンを出す
    if (spCta) spCta.classList.toggle('is-show', y > window.innerHeight * 0.6);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  progress.classList.remove('is-moving');

  /* ---------- よくある質問：1つ開いたら他を閉じる ---------- */
  $$('.faq__item').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) $$('.faq__item').forEach((o) => { if (o !== d) o.open = false; });
    });
  });
})();
