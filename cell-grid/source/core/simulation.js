import * as ImGui from '@gui/imgui'
import CellRenderer from './cell-renderer'
import Camera from './camera'
import LangtonsAnt from '@automata/langtons-ant'
import Turmite from '@automata/turmite'
import General from './general'
import moment from 'moment'
import World from '@automata/world/world'
import Noise from '@automata/noise'

class Simulation {
    constructor(gl, canvas) {
        this.gl = this.gl
        this.backgroundColor = [General.randomInt(0, 255) / 255, General.randomInt(0, 255) / 255, General.randomInt(0, 255) / 255]
        this.size = [256, 256]
        this.sizeBuffer = [...this.size]
        this.pixels = new Uint8Array(this.size[0] * this.size[1] * 3)
        this.isActive = true
        this.iterationCount = 1
        this.cellularAutomaton = 0
        this.cellularAutomata = {
            'Turmite': Turmite,
            'Langton\'s Ant': LangtonsAnt,
            'World': World,
            'Noise': Noise
        }
        this.cellularAutomataKeys = Object.keys(this.cellularAutomata)
        this.cellularAutomataValues = Object.values(this.cellularAutomata)
        this.instances = []

        this.idCount = 0
        this.ref = {
            size: this.size,
            pixels: this.pixels,
            backgroundColor: this.backgroundColor,
            delete: this.delete.bind(this)
        }
        this.canvas = canvas
        this.renderer = new CellRenderer(gl, this.ref)
        this.camera = new Camera(this.renderer, [0, 0, this.size[0] > this.size[1] ? this.canvas.width / 2 : this.size[0]])
        this.instances.push(new World(this.ref, this.idCount))
    }

    init() {
        this.renderer.init()
    }

    updateCamera() {
        this.camera.update()
    }

    updateCells() {
        if (this.isActive) {
            for (let a = 0; a < this.iterationCount; ++a) {
                for (let b = 0; b < this.instances.length; ++b) {
                    this.instances[b].update(this.pixels)
                }
            }
        }
    }

    renderCells() {
        this.renderer.render()
    }

    delete(instance) {
        this.instances.splice(this.instances.indexOf(instance), 1)
    }

    importJson() {

    }

    exportJson() {

    }

    importImage() {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = this.onChange
        input.click()
    }

    exportImage() {

    }

    reset() {
        if (this.sizeBuffer[0] != this.size[0] || this.sizeBuffer[1] != this.size[1]) {
            this.size[0] = this.sizeBuffer[0]
            this.size[1] = this.sizeBuffer[1]
            this.pixels = new Uint8Array(this.size[0] * this.size[1] * 3)
            this.ref.pixels = this.pixels
            this.renderer.refresh()
        }

        for (const instance of this.instances) {
            instance.reset()
        }

        if (!this.instances.length) {
            this.pixels.forEach((_, index) => this.pixels[index] = 0)
        }
    }
    
    onChange = this.onChange.bind(this)

    onChange(event) {
        const self = this
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])

        reader.onload = event => {
            const image = new Image()
            image.src = event.target.result

            image.onload = function () {
                const canvas = document.createElement('canvas')
                canvas.width = this.width
                canvas.height = this.height
                const context = canvas.getContext('2d')
                context.drawImage(image, 0, 0)

                if (this.width > 0 && this.width <= 2048 && this.height > 0 && this.height <= 2048) {
                    const data = context.getImageData(0, 0, this.width, this.height).data
                    self.size[0] = this.width
                    self.size[1] = this.height
                    self.pixels = new Uint8Array(this.width * this.height * 3)
                    self.ref.pixels = self.pixels

                    for (let a = 0; a < data.length / 4; ++a) {
                        self.pixels[a * 3] = data[a * 4]
                        self.pixels[a * 3 + 1] = data[a * 4 + 1]
                        self.pixels[a * 3 + 2] = data[a * 4 + 2]
                    }

                    self.renderer.refresh()
                }
            }
        }
    }

    exportImage() {
        const canvas = document.createElement('canvas')
        canvas.width = this.size[0]
        canvas.height = this.size[1]
        const context = canvas.getContext('2d')
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        for (let a = 0; a < imageData.data.length / 4; ++a) {
            imageData.data[a * 4] = this.pixels[a * 3]
            imageData.data[a * 4 + 1] = this.pixels[a * 3 + 1]
            imageData.data[a * 4 + 2] = this.pixels[a * 3 + 2]
            imageData.data[a * 4 + 3] = 255
        }

        context.putImageData(imageData, 0, 0)

        const link = document.createElement('a')
        link.download = 'CA_' + moment().format('YYYYMDHHmmss') + '.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    exportConfig() {
        const config = {
            backgroundColor: this.backgroundColor,
            size: this.size,
            isActive: this.isActive,
            iterationCount: this.iterationCount,
            instances: this.instances.map(instance => instance.getConfig())
        }
    }

    renderGui() {
        ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0), ImGui.Cond.FirstUseEver)
        ImGui.SetNextWindowSize(new ImGui.ImVec2(450, 450), ImGui.Cond.FirstUseEver)
        ImGui.Begin('Cellular Automaton')

        if (ImGui.CollapsingHeader('General')) {
            ImGui.ColorEdit3('Background Color', this.backgroundColor)
            ImGui.DragInt2('Size', this.sizeBuffer, 1, 1, 2048)
            ImGui.DragFloat3('Position', this.camera.position)
            ImGui.Checkbox('Is Active', (_ = this.isActive) => this.isActive = _)
            ImGui.DragInt('Iteration Count', (_ = this.iterationCount) => this.iterationCount = _, 1, 1, 10000)
            ImGui.Combo('Instance', (_ = this.cellularAutomaton) => this.cellularAutomaton = _, this.cellularAutomataKeys, ImGui.ARRAYSIZE(this.cellularAutomataKeys))
            ImGui.SameLine()

            if (ImGui.Button('Create')) {
                const instance = this.cellularAutomataValues[this.cellularAutomaton]
                this.instances.push(new instance(this.ref, this.idCount))
                this.idCount++
            }

            if (ImGui.Button('Reset')) {
                this.reset()
            }
        }

        if (ImGui.CollapsingHeader('Import / Export')) {
            if (ImGui.Button('Import Image')) {
                this.importImage()
            }

            ImGui.SameLine()

            if (ImGui.Button('Export Image')) {
                this.exportImage()
            }

            if (ImGui.Button('Import Config')) {
                
            }

            ImGui.SameLine()

            if (ImGui.Button('Export Config')) {
                this.exportConfig()
            }
        }

        ImGui.End()

        ImGui.SetNextWindowPos(new ImGui.ImVec2(this.canvas.width - 450, 0), ImGui.Cond.FirstUseEver)
        ImGui.SetNextWindowSize(new ImGui.ImVec2(450, 450), ImGui.Cond.FirstUseEver)
        ImGui.Begin('Instances')

        for (const instance of this.instances) {
            instance.renderGui()
        }

        ImGui.End()
    }
}

export default Simulation
