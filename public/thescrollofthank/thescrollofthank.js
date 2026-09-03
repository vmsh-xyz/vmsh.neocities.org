const container = document.getElementById('galleryContainer');
const track = document.getElementById('galleryTrack');

const response = await fetch('thescrollofthank.json');
const items = await response.json();

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

let isHovered = false;
let autoScrollStarted = false;
const scrollSpeed = 0.6;

container.addEventListener('mouseenter', () => isHovered = true);
container.addEventListener('mouseleave', () => isHovered = false);

setTimeout(() => {
    autoScrollStarted = true;
}, 4000);

function animate() {
      if (autoScrollStarted && !isHovered) {
        container.scrollTop += scrollSpeed;
      }

      const halfHeight = container.scrollHeight / 2;

      if (container.scrollTop >= halfHeight) {
        container.scrollTop -= halfHeight;
      } else if (container.scrollTop <= 0) {
        container.scrollTop += halfHeight;
      }

      requestAnimationFrame(animate);
    }

requestAnimationFrame(animate);