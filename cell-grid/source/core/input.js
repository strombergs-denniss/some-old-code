import { vec2 } from 'gl-matrix'

class Input {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.keys = {}
        this.buttons = {}
        this.cursorPosition = vec2.create()
        this.buttonDownPosition = vec2.create()
        this.buttonUpPosition = vec2.create()
        this.onKeyDown = () => {}
        this.onKeyUp = () => {}
        this.onCursorMove = () => {}
        this.onButtonDown = () => {}
        this.onButtonUp = () => {}

        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true
            this.onKeyDown(event)
        })

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false
            this.onKeyUp(event)
        })

        this.canvas.addEventListener('mousemove', (event) => {
            this.cursorPosition[0] = event.pageX
            this.cursorPosition[1] = event.pageY
            this.onCursorMove(event)
        })

        this.canvas.addEventListener('mousedown', (event) => {
            this.buttons[event.button] = true
            this.buttonDownPosition[0] = event.pageX
            this.buttonDownPosition[1] = event.pageY
            this.onButtonDown(event)
        })

        this.canvas.addEventListener('mouseup', (event) => {
            this.buttons[event.button] = false
            this.buttonUpPosition[0] = event.pageX
            this.buttonUpPosition[1] = event.pageY
            this.onButtonUp(event)
        })
    }
}

export default Input
