//
//  MatrixStack.js
//

function MatrixStack() {
  this.stack = [ mat4() ];
  this.current = function ()  { return this.stack[0]; };
  this.push = function ()  { this.stack.unshift( this.stack[0] ); };
  this.pop = function ()  { this.stack.shift(); };
  this.load = function (m) { this.stack[0] = m; };
  this.mult = function (m) { this.stack[0] = mult( this.stack[0], m ); };
  this.loadIdentity = function ()  { this.stack[0] = mat4(); };

  this.rotate = function (angle, axis) { 
    this.stack[0] = mult( this.stack[0], rotate(angle, axis) );
  };
  this.scale = function(x, y, z) {
    if (y === undefined && z === undefined) {
      y = x;
      z = x;
    }
    this.stack[0] = mult( this.stack[0], scalem(x, y, z) );
  };
  this.translate = function(x, y, z) {
   this.stack[0] = mult( this.stack[0], translate(x, y, z) ); 
  };
};