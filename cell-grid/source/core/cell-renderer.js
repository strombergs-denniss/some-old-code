import Gl from './gl'
import { VERTEX_SHADER, FRAGMENT_SHADER } from './program'

class CellRenderer {
    constructor(gl, ref) {
        this.gl = gl
        this.ref = ref
    }

    init() {
        this.program = Gl.createProgram(this.gl, VERTEX_SHADER, FRAGMENT_SHADER)
        this.positionAttribute = this.gl.getAttribLocation(this.program, 'a_Position')
        this.textureCoordinateAttribute = this.gl.getAttribLocation(this.program, 'a_TextureCoordinate')
        this.projectionUniform = this.gl.getUniformLocation(this.program, 'u_Projection')
        this.viewUniform = this.gl.getUniformLocation(this.program, 'u_View')
        this.modelUniform = this.gl.getUniformLocation(this.program, 'u_Model')
        this.textureUniform = this.gl.getUniformLocation(this.program, 'u_Texture')
        this.zoom = this.gl.drawingBufferWidth > this.gl.drawingBufferHeight ? this.gl.drawingBufferHeight : this.gl.drawingBufferWidth

        const axis = this.ref.size[0] > this.ref.size[1] ? this.ref.size[0] : this.ref.size[1]
        const width = this.ref.size[0] / axis
        const height = this.ref.size[1] / axis
        this.positions = [-width, height, 0, -width, -height, 0, width, height, 0, width, -height, 0]
        this.textureCoordinates = [0, 1, 0, 0, 1, 1, 1, 0]
        this.model = new Float32Array([this.zoom, 0, 0, 0, 0, this.zoom, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

        this.projection = new Float32Array([-2 / this.gl.drawingBufferWidth, 0, 0, 0, 0, -2 / this.gl.drawingBufferHeight, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        this.view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

        this.positionBuffer = this.gl.createBuffer()
        this.gl.useProgram(this.program)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW)
        this.gl.enableVertexAttribArray(this.positionAttribute)
        this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0)

        this.textureCoordinateBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordinateBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), this.gl.DYNAMIC_DRAW)
        this.gl.enableVertexAttribArray(this.textureCoordinateAttribute)
        this.gl.vertexAttribPointer(this.textureCoordinateAttribute, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.uniformMatrix4fv(this.projectionUniform, false, this.projection)

        this.texture = this.gl.createTexture()
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.ref.size[0], this.ref.size[1], 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.ref.pixels)
    }

    refresh() {
        const axis = this.ref.size[0] > this.ref.size[1] ? this.ref.size[0] : this.ref.size[1]
        const width = this.ref.size[0] / axis
        const height = this.ref.size[1] / axis
        this.positions = [-width, height, 0, -width, -height, 0, width, height, 0, width, -height, 0]


        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW)
        this.gl.enableVertexAttribArray(this.positionAttribute)
        this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordinateBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), this.gl.DYNAMIC_DRAW)
        this.gl.enableVertexAttribArray(this.textureCoordinateAttribute)
        this.gl.vertexAttribPointer(this.textureCoordinateAttribute, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.uniformMatrix4fv(this.projectionUniform, false, this.projection)

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.ref.size[0], this.ref.size[1], 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.ref.pixels)
    }

    render() {
        this.gl.clearColor(this.ref.backgroundColor[0], this.ref.backgroundColor[1], this.ref.backgroundColor[2], this.ref.backgroundColor[3])
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        this.gl.uniformMatrix4fv(this.viewUniform, false, this.view)
        this.gl.uniformMatrix4fv(this.modelUniform, false, this.model)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.ref.size[0], this.ref.size[1], 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.ref.pixels)
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
    }
}

export default CellRenderer
