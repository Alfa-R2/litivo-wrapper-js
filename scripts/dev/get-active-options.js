(async () => {
  const viewport = document.querySelector('.cdk-virtual-scroll-viewport');
  const countries = new Set();

  let lastHeight = 0;

  while (true) {
    // Get visibles
    document
      .querySelectorAll('nz-option-item .ant-select-item-option-content')
      .forEach((el) => countries.add(el.innerText.trim()));

    // scroll
    viewport.scrollBy(0, 500);

    await new Promise((r) => setTimeout(r, 150));

    // stop if reached the end
    if (viewport.scrollTop === lastHeight) break;
    lastHeight = viewport.scrollTop;
  }

  console.log([...countries]);
})();
