import { position } from './blocks';
import { getRandomHexColor } from './randomColor';

export function renderBlocks(sortedBlocks) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  sortedBlocks.forEach(block => {
    const blockElement = document.createElement('div');
    const coordinate = position(block.id);

    blockElement.className = 'block';
    blockElement.innerHTML = block.id;
    blockElement.style.width = block.width + 'px';
    blockElement.style.height = block.height + 'px';
    blockElement.style.backgroundColor = getRandomHexColor();
    blockElement.style.bottom = coordinate.bottom + 'px';
    blockElement.style.left = coordinate.left + 'px';

    container.appendChild(blockElement);
  });
}
