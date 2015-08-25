import $ from 'jquery';
import throttle from 'lodash/function/throttle';

const SIZE    = 140;
const START_X =  75;
const START_Y =  75;
const STEP_X  = SIZE * 1.7;
const STEP_Y  = SIZE * 0.7;

function horizontal(node, index) {
  const CONTAINER_WIDTH = window.innerWidth;
  const BUBBLES_PER_ROW = ~~(CONTAINER_WIDTH / STEP_X);
  const BUBBLES_IN_DOUBLE_ROW   = 2 * BUBBLES_PER_ROW - 1;
  const PHYSICAL_INDEX = getPhysicalIndex(index);

  const ROW    = ~~(PHYSICAL_INDEX / BUBBLES_PER_ROW);
  const COLUMN = ~~(PHYSICAL_INDEX % BUBBLES_PER_ROW);
  const EVEN = !!(ROW % 2);
  const OFFSET_X = (EVEN ? -STEP_X / 4 : STEP_X / 4);

  let x = START_X + COLUMN * STEP_X + OFFSET_X;
  let y = START_Y + ROW    * STEP_Y;
  node.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  function getPhysicalIndex(logicalIndex) {
    const doubleRowIndex          = ~~(logicalIndex / BUBBLES_IN_DOUBLE_ROW);
    const logicalIndexInDoubleRow = ~~(logicalIndex % BUBBLES_IN_DOUBLE_ROW);
    var physicalIndexInDoubleRow;
    if (logicalIndexInDoubleRow < BUBBLES_PER_ROW - 1) {
      physicalIndexInDoubleRow = logicalIndexInDoubleRow;
    } else {
      physicalIndexInDoubleRow = BUBBLES_PER_ROW + (BUBBLES_IN_DOUBLE_ROW - 1 - logicalIndexInDoubleRow);
    }
    var physicalIndex = physicalIndexInDoubleRow + doubleRowIndex * 2 * BUBBLES_PER_ROW;
    return physicalIndex;
  }

}

function reorder(){
  const bubbles = document.getElementsByClassName('head-bubble');
  Array.prototype.forEach.call(bubbles, horizontal);
}

function initialize(){
  $(function(){
    reorder();
    $(window).on('resize', throttle(reorder, 500));
  });
}

export default { initialize };
