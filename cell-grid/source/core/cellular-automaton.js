import * as ImGui from '@gui/imgui'
import { vec3 } from 'gl-matrix'

class CellularAutomaton {
    constructor(ref, id) {
        this.ref = ref
        this.id = id
        this.name = this.constructor.name + id
        this.isActive = true
        this.setup()
    }

    reset() {
        this.ref.pixels.forEach((_, a) => this.ref.pixels[a] = 0)
    }

    update() {
        if (this.isActive) {
            this.callback()
        }
    }

    renderGui() {
        if (ImGui.CollapsingHeader(this.name)) {
            ImGui.Checkbox('Is Active##' + this.id, (_ = this.isActive) => this.isActive = _)
            this.guiCallback()
            
            if (ImGui.Button('Delete##' + this.id)) {
                this.ref.delete(this)
            }
        }
    }

    getRGB(position, indexFunction) {
        const index = indexFunction(this.ref.size, position)

        return vec3.fromValues(
            this.ref.pixels[index * 3],
            this.ref.pixels[index * 3 + 1],
            this.ref.pixels[index * 3 + 2]
        )
    }

    setRGB(position, value, indexFunction) {
        const index = indexFunction(this.ref.size, position)

        this.ref.pixels[index * 3] = value[0]
        this.ref.pixels[index * 3 + 1] = value[1]
        this.ref.pixels[index * 3 + 2] = value[2]
    }

    getConfig() {
        return {
            isActive: this.isActive
        }
    }
}

export default CellularAutomaton
