var gl = null;
var cone = null;
var rs = 0;
function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 206/256, 200/256, 0.0, 1.0 );
    cone = new Cone( gl, 10 );
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    rs += 0.5
    cone.MV = rotate(rs, [0, 1, 0]); //added
    cone.render();
}

window.onload = init;
