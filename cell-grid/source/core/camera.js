import Input from './input'

class Camera {
    constructor(renderer, position) {
        this.renderer = renderer
        this.position = position
        this.movementSpeed = 10
        this.zoomSpeed = 10
        this.input = new Input()
    }

    update() {
        if (this.input.keys['a']) {
            this.position[0] -= this.movementSpeed
        }

        if (this.input.keys['d']) {
            this.position[0] += this.movementSpeed
        }

        if (this.input.keys['s']) {
            this.position[1] -= this.movementSpeed
        }

        if (this.input.keys['w']) {
            this.position[1] += this.movementSpeed
        }

        if (this.input.keys['q']) {
            this.position[2] -= this.zoomSpeed
        }

        if (this.input.keys['e']) {
            this.position[2] += this.zoomSpeed
        }

        this.renderer.view[12] = this.position[0]
        this.renderer.view[13] = this.position[1]
        this.renderer.model[0] = -this.position[2]
        this.renderer.model[5] = this.position[2]
    }
}

export default Camera
