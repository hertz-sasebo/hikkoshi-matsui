(() => {
  const header = document.querySelector('.header');
  const menuBtn = document.getElementById('menuBtn');
  const gnav = document.getElementById('gnav');

  // ハンバーガーメニュー
  const setMenu = (open) => {
    gnav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  menuBtn.addEventListener('click', () => setMenu(!gnav.classList.contains('is-open')));
  gnav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // スクロール時のヘッダー影
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
