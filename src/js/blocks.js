import blockData from '../blocks.json';

const container = document.querySelector('.container');
let containerSize = {
  width: container.clientWidth,
  height: container.clientHeight,
};

const result = efficientPlacement(
  blockData.map((block, id) => ({ ...block, id })),
  containerSize
);
renderUI(result);

window.addEventListener('resize', () => {
  containerSize = {
    width: container.clientWidth,
    height: container.clientHeight,
  };

  const newResult = efficientPlacement(
    blockData.map((block, id) => ({ ...block, id })),
    containerSize
  );
  renderUI(newResult);
});

function efficientPlacement(blocks, containerSize) {
  const sortedBlocks = blocks
    .slice()
    .sort((a, b) => b.width * b.height - a.width * a.height);
  const blockCoordinates = [];
  let totalWidth = 0;
  let totalHeight = 0;

  function countLeft(width) {
    totalWidth += width;
  }

  function countHeight(height) {
    totalHeight += height;
  }

  function countWindowWidth(block) {
    countHeight(block.height);
    totalWidth = 0;
    countLeft(0);
  }

  sortedBlocks.forEach(block => {
    if (
      containerSize.width < totalWidth + block.width ||
      containerSize.width === totalWidth + block.width
    ) {
      // if (blockCoordinates.left === 0) {
      countWindowWidth(sortedBlocks[0]);
      // }
    } else if (containerSize.width - totalWidth > 0) {
      let freeSpace = containerSize.width - totalWidth;
    }
    createCoordinate(block);
    countLeft(block.width);
  });

  function createCoordinate(block) {
    blockCoordinates.push({
      left: totalWidth,
      bottom: totalHeight,
      initialOrder: block.id,
    });
  }

  // console.log(blockCoordinates);
  const fullness =
    1 -
    (totalWidth * totalHeight) /
      (totalWidth * totalHeight +
        sortedBlocks.reduce(
          (acc, block) => acc + block.width * block.height,
          0
        ));

  return { fullness, blockCoordinates };
}

function renderUI(result) {
  container.innerHTML = '';

  result.blockCoordinates.forEach(block => {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.innerHTML = block.initialOrder;
    blockElement.style.width = blockData[block.initialOrder].width + 'px';
    blockElement.style.height = blockData[block.initialOrder].height + 'px';
    blockElement.style.backgroundColor = getRandomHexColor();
    blockElement.style.bottom = block.bottom + 'px';
    blockElement.style.left = block.left + 'px';

    container.appendChild(blockElement);
  });

  const fullnessElement = document.createElement('div');
  fullnessElement.className = 'fullness';
  fullnessElement.innerHTML = `Fullness: ${result.fullness.toFixed(2)}`;
  container.appendChild(fullnessElement);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
