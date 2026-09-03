document.addEventListener('DOMContentLoaded', async () => {

  const container = document.getElementById('galleryContainer');
  const track = document.getElementById('galleryTrack');
  if (!container || !track) return;

  let items = [];

  try {
    const response = await fetch('thescrollofthank.json');
    if (!response.ok) {
      throw new Error(`Грешка при зареждане: ${response.status}`);
    }
    items = await response.json();
  } catch (error) {
    console.error('Неуспешно извличане на изображенията:', error);
    return;
  }

  const fullList = [...items, ...items];

  fullList.forEach(item => {
    const linkTag = document.createElement('a');
    linkTag.href = item.link;
    linkTag.target = "_blank";
    linkTag.rel = "noopener noreferrer";

    const imgTag = document.createElement('img');
    imgTag.src = item.image;
    imgTag.alt = item.alt;

    linkTag.appendChild(imgTag);
    track.appendChild(linkTag);
  });

  let isPaused = false;
  let autoScrollStarted = false;
  const scrollSpeed = 0.6;

  let currentScroll = 0;
  let touchTimeout = null;

  container.addEventListener('mouseenter', () => isPaused = true);
  container.addEventListener('mouseleave', () => isPaused = false);

  container.addEventListener('touchstart', () => {
    isPaused = true;
    if (touchTimeout) clearTimeout(touchTimeout);
  }, { passive: true });

  container.addEventListener('touchend', () => {
    touchTimeout = setTimeout(() => {
      isPaused = false;
      currentScroll = container.scrollTop;
    }, 1000);
  }, { passive: true });

  setTimeout(() => {
    currentScroll = container.scrollTop;
    autoScrollStarted = true;
  }, 4000);

  function animate() {
    const halfHeight = container.scrollHeight / 2;

    if (autoScrollStarted && !isPaused && halfHeight > 0) {
      currentScroll += scrollSpeed;
      container.scrollTop = currentScroll;
    } else {
      currentScroll = container.scrollTop;
    }

    if (halfHeight > 0) {
      if (container.scrollTop >= halfHeight) {
        container.scrollTop -= halfHeight;
        currentScroll -= halfHeight;
      } else if (container.scrollTop <= 0) {
        container.scrollTop += halfHeight;
        currentScroll += halfHeight;
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});