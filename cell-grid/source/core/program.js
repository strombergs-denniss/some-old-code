const VERTEX_SHADER = `precision mediump float;
attribute vec3 a_Position;
attribute vec2 a_TextureCoordinate;
uniform mat4 u_Projection;
uniform mat4 u_View;
uniform mat4 u_Model;
varying vec2 v_TextureCoordinate;

void main(void) {
    gl_Position = u_Projection * u_View * u_Model * vec4(a_Position, 1);
    v_TextureCoordinate = a_TextureCoordinate;
}

`

const FRAGMENT_SHADER = `precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TextureCoordinate;

void main(void) {
    gl_FragColor = texture2D(u_Texture, v_TextureCoordinate);
}

`

export { VERTEX_SHADER, FRAGMENT_SHADER }
