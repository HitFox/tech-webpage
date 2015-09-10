import $ from 'jquery';
import throttle from 'lodash/function/throttle';

const SIZE    = 140;
const START_X =  75;
const START_Y =  75;
const STEP_X  = SIZE * 1.7;
const STEP_Y  = SIZE * 0.7;

class HorizontalSorter {
  constructor(nodes){
    this.nodes = nodes;
    this.stepX = SIZE * 1.7;
    this.stepY = SIZE * 0.7;
  }

  resize(){
    const CONTAINER_WIDTH = window.innerWidth;
    this.bubblesPerRow = ~~(CONTAINER_WIDTH / this.stepX);
    this.bubblesInDoubleRow   = 2 * this.bubblesPerRow - 1;

    Array.prototype.forEach.call(this.nodes, ::this._position);
  }

  _position(node, index) {
    const PHYSICAL_INDEX = this._getPhysicalIndex(index);
    const ROW    = ~~(PHYSICAL_INDEX / this.bubblesPerRow);
    const COLUMN = ~~(PHYSICAL_INDEX % this.bubblesPerRow);
    const EVEN = !!(ROW % 2);
    const OFFSET_X = (EVEN ? -this.stepX / 4 : this.stepX / 4);

    let x = START_X + COLUMN * this.stepX + OFFSET_X;
    let y = START_Y + ROW    * this.stepY;
    node.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  }

  _getPhysicalIndex(logicalIndex) {
    const doubleRowIndex          = ~~(logicalIndex / this.bubblesInDoubleRow);
    const logicalIndexInDoubleRow = ~~(logicalIndex % this.bubblesInDoubleRow);
    var physicalIndexInDoubleRow;
    if (logicalIndexInDoubleRow < this.bubblesPerRow - 1) {
      physicalIndexInDoubleRow = logicalIndexInDoubleRow;
    } else {
      physicalIndexInDoubleRow = this.bubblesPerRow + (this.bubblesInDoubleRow - 1 - logicalIndexInDoubleRow);
    }
    var physicalIndex = physicalIndexInDoubleRow + doubleRowIndex * 2 * this.bubblesPerRow;
    return physicalIndex;
  }

}

function initialize(){
  $(function(){
    const bubbles = document.getElementsByClassName('head-bubble');
    const sorter = new HorizontalSorter(bubbles);
    sorter.resize();
    $(window).on('resize', throttle(::sorter.resize, 500));
  });
}

export default { initialize };
