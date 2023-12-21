import blockData from '../blocks.json';
import { renderBlocks } from './renderBlockHtml';

const container = document.querySelector('.container');
let totalWidth = 0;
let totalHeight = 0;

const renderedBlocks = {
  fullness: 1,
  blockCoordinates: [],
};

const sortedBlocks = blockData.map((block, id) => ({ ...block, id }));

sortedBlocks.sort((a, b) => b.width * b.height - a.width * a.height);

function countWindowWidth(height) {
  if (container.scrollWidth <= totalWidth) {
    countHeight(height);

    totalWidth = 0;
  }
}

function countLeft(width) {
  totalWidth += width;
}

function countHeight(height) {
  totalHeight += height;
}

export function position(id) {
  return renderedBlocks.blockCoordinates.find(
    position => position.initialOrder === id
  );
}

window.addEventListener('resize', () => {
  totalWidth = 0;
  totalHeight = 0;
  renderedBlocks.blockCoordinates = [];
  createBlocksCoordinate();
  renderBlocks(sortedBlocks);
});

function createBlocksCoordinate() {
  sortedBlocks.forEach(block => {
    renderedBlocks.blockCoordinates.push({
      left: totalWidth,
      bottom: totalHeight,
      initialOrder: block.id,
    });

    countWindowWidth(block.height);
    countLeft(block.width);
  });
}

createBlocksCoordinate();
renderBlocks(sortedBlocks);
