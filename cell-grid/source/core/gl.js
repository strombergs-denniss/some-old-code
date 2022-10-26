class Gl {
    static createShader(gl, type, source) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)

            return null
        }

        return shader
    }

    static createProgram(gl, vertexShaderSource, fragmentShaderSource) {
        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)

        if (!vertexShader) {
            return null
        }

        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

        if (!fragmentShader) {
            gl.deleteShader(vertexShader)

            return null
        }

        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.detachShader(program, vertexShader)
        gl.detachShader(program, fragmentShader)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)

            return null
        }

        return program
    }
}

export default Gl
