import anime from 'animejs';
import $ from 'jquery';

class Rubber {
  constructor(parentId) {
    this.parent = $(parentId);
    this.SVG = $('#bowSVG');
    this.PATH = $('#bowPATH');
    this.CIRCLE = $('#circle');
    this.mousePos = {x:0, y:0};
    this.setRubber();
    this.setListeners();
  } 

  setRubber() {
    this.h = this.parent.height();
    this.w = this.parent.width();
    this.SVG.height(this.h);
    this.initialD = `M ${this.w/2} 0 Q ${this.w/2} ${this.h/2} ${this.w/2} ${this.h}`;
    this.PATH.attr('d', this.initialD);

    this.initialCirclePos = {cx: this.w/2, cy: this.h/2};
    this.CIRCLE.attr('cx', this.initialCirclePos.cx);
    this.CIRCLE.attr('cy', this.initialCirclePos.cy);
  }

  updateRubber(x,y) {
    let navPosition = this.parent.position();
    this.d = `M ${this.w/2} 0 Q ${2*x-navPosition.left*2-this.w/2} ${2*y-this.h/2} ${this.w/2} ${this.h}`; 
    this.PATH.attr('d', this.d);
    this.CIRCLE.attr('cx', x-navPosition.left);
    this.CIRCLE.attr('cy', y-navPosition.top);
  }

  updateMousePos(x,y) {
  	this.mousePos.x = x;
    this.mousePos.y = y;
  }
  setListeners() {
    const self = this;
    const stretchRubber = function(x, y) {
      self.updateRubber(x,y); //minus half of container dimensions
      self.updateMousePos(x,y);
    };
    


    var mouseDown = 0;
    var isDragging = false;
    var startingPos = [];
    $(this.parent).mousedown(function(evt) {
      // console.log('mouse DOWN');
      mouseDown = 1;
    });

    $(document).mousemove(function(evt) {
      self.updateMousePos(evt.pageX, evt.pageY);
      if (mouseDown===1) {
        stretchRubber(self.mousePos.x, self.mousePos.y);
      }
    }).mouseup(function() {
      console.log('mouse UP');
      mouseDown = 0;
      let resetRubber = anime({
        targets: '#bowPATH',
        d: self.initialD,
        duration: 800,
        elasticity: 808,
        complete: function() {

        }
      });
      let resetCircle = anime({
        targets: '#circle',
        cx: self.initialCirclePos.cx,
        cy: self.initialCirclePos.cy,
        duration: 800,
        elasticity: 808
      });

      
      let navPosition = self.parent.position();
      if (self.mousePos.x - navPosition.left+ self.parent.width()/2 > 600) {
        var cssSelector = anime({
          targets: '.nav',
          duration: 500,
          elasticity: 508,
          translateX: 100

        });
        var reverseAnim = anime({
          targets: '.menu__item',
          translateX: 170,
          duration: 208,
          elasticity: 0,
          opacity: 1,
          delay: function(el, i, l) { return i * 60 + 110; }
        });
        reverseAnim.play();
        
      }
      // reverseAnim.reverse();
    });



  }
}

const nav = $('#nav');

console.log(nav.height());
const rubber = new Rubber('nav');

