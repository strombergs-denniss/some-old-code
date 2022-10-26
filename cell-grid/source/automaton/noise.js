import * as ImGui from '@gui/imgui'
import { vec3 } from 'gl-matrix'
import General from '@core/general'
import CellularAutomaton from '@core/cellular-automaton'
import { Noise as NoiseFunction } from '@core/noise'

class Noise extends CellularAutomaton {
    setup() {
        this.ref.size = [256, 256]
        this.noise = new NoiseFunction(Math.random())
        this.val = 0
    }

    callback() {
        const size = this.ref.size
        for (let x = 0; x < size[0]; ++x) {
            for (let y = 0; y < size[1]; ++y) {
                const value = Math.abs(this.noise.simplex3(x / 100, y / 100, this.val)) * 2550;
                this.setRGB([x, y], vec3.fromValues(value, value, value), General.loopIndex)
            }
        }
        
        this.val += 0.01;
    }

    guiCallback() {
    }
}

export default Noise
