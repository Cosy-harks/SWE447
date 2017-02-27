
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
	// I shortened the lengths because two cube corners 
	//were getting cut for going out of range - I expect.
    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
			0.0, 0.0, 0.0, //0 floor bottom left
			0.8, 0.0, 0.0, //1				right
			0.8, 0.8, 0.0, //2		 top	right
			0.0, 0.8, 0.0, //3				left
			0.0, 0.0, 0.8, //4 ceil  bottom left
			0.8, 0.0, 0.8, //5				right
			0.8, 0.8, 0.8, //6		 top	right
			0.0, 0.8, 0.8  //7				left
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
			0, 2, 3, 0, 1, 2, 0, 5, 1, 0, 4, 5, 0, 7, 4, 0, 3, 7,	// fan around 0
			6, 1, 5, 6, 2, 1, 6, 3, 2, 6, 7, 3, 6, 4, 7, 6, 5, 4	// fan around 6
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};