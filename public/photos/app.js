(() => {
  'use strict';
  const photos = window.FIELD_NOTES_PHOTOS || [];
  if (!photos.length) return;
  const $ = id => document.getElementById(id);
  const photograph = $('photograph');
  const marks = $('marks');
  const viewer = $('viewer');
  const requested = photos.findIndex(photo => `#${photo.id}` === location.hash);
  let current = requested >= 0 ? requested : Math.floor(Math.random() * photos.length);
  let announcement;
  const symbols = ['X', 'O', '+', '?', '!', '*', '~'];

  // Keep the full-viewport background ready before displaying a new frame.
  const images = photos.map(photo => {
    const image = new Image();
    image.src = photo.src;
    return image;
  });
  function announce(text) {
    clearTimeout(announcement);
    $('status').textContent = '';
    announcement = setTimeout(() => { $('status').textContent = text; }, 30);
  }
  function render() {
    const photo = photos[current];
    const image = images[current];
    const show = () => {
      // An old load callback must never replace a more recent selection.
      if (photo !== photos[current]) return;
      photograph.style.backgroundImage = `url("${photo.src}")`;
      photograph.dataset.photo = photo.id;
      photograph.setAttribute('aria-label', `${photo.alt} Click for the next photograph.`);
    };
    if (image.complete && image.naturalWidth) show();
    else image.addEventListener('load', show, { once: true });
    if (viewer.open) renderViewer();
  }
  function changePhoto(delta) {
    current = (current + delta + photos.length) % photos.length;
    render();
    announce(`Photograph ${current + 1} of ${photos.length}. ${photos[current].alt}`);
  }
  function leaveMark(x, y) {
    const mark = document.createElement('span');
    mark.className = 'mark';
    mark.style.left = `${x / innerWidth * 100}%`;
    mark.style.top = `${y / innerHeight * 100}%`;
    mark.style.setProperty('--rotation', `${Math.floor(Math.random() * 360)}deg`);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50');
    text.setAttribute('y', '77');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'none');
    text.setAttribute('stroke', 'currentColor');
    text.setAttribute('stroke-width', '1.2');
    text.setAttribute('font-size', '79');
    text.setAttribute('font-family', 'serif');
    text.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    svg.append(text);
    mark.append(svg);
    marks.append(mark);
    // Keep repeated interaction bounded while preserving the accumulated effect.
    if (marks.children.length > 64) marks.firstElementChild.remove();
  }
  photograph.addEventListener('click', event => {
    const x = event.detail ? event.clientX : innerWidth / 2;
    const y = event.detail ? event.clientY : innerHeight / 2;
    changePhoto(1);
    leaveMark(x, y);
  });
  $('clearMarks').addEventListener('click', () => {
    marks.replaceChildren();
    announce('Symbols cleared.');
  });
  function renderViewer() {
    const photo = photos[current];
    $('viewerImage').src = photo.src;
    $('viewerImage').alt = photo.alt;
    $('viewerTitle').textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')} — ${photo.title}`;
    $('viewerDescription').textContent = photo.alt;
    $('originalLink').href = photo.src;
  }
  $('infoButton').addEventListener('click', () => {
    renderViewer();
    viewer.showModal();
    $('closeViewer').focus();
  });
  $('closeViewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => $('infoButton').focus({ preventScroll: true }));
  $('previousPhoto').addEventListener('click', () => changePhoto(-1));
  $('nextPhoto').addEventListener('click', () => changePhoto(1));
  viewer.addEventListener('click', event => {
    // Clicking the dark side margins closes the full-photo view.
    if (event.target === viewer) viewer.close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      changePhoto(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  window.addEventListener('hashchange', () => {
    const index = photos.findIndex(photo => `#${photo.id}` === location.hash);
    if (index >= 0) { current = index; render(); }
  });
  render();
})();
