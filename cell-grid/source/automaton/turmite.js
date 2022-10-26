import * as ImGui from '@gui/imgui'
import { vec2, vec3 } from 'gl-matrix'
import General from '@core/general'
import CellularAutomaton from '@core/cellular-automaton'

class Turmite extends CellularAutomaton {
    setup() {
        this.position = [parseInt(this.ref.size[0] / 2), parseInt(this.ref.size[1] / 2)]
        this.startingPosition = [...this.position]
        this.currentDirection = 0
        this.directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ]
        this.state = 0
        this.transitionPreset = 0
        this.transitionPresetKeys = [
            'Fibonacci Spiral',
            'Spiral',
            'F2',
            'F4',
            'F5',
            'Langton\'s Ant',
            'F1'
        ]
        this.transitionPresetValues = [
            [
                [{write: 1, turn: 'L', next: 1}, {write: 1, turn: 'L', next: 1}],
                [{write: 1, turn: 'R', next: 1}, {write: 0, turn: 'N', next: 0}]
            ],
            [
                [{write: 1, turn: 'N', next: 1}, {write: 1, turn: 'L', next: 0}],
                [{write: 1, turn: 'R', next: 1}, {write: 0, turn: 'N', next: 0}]
            ],
            [
                [{ write: 1, turn: 'R', next: 0 }, { write: 1, turn: 'R', next: 1 }],
                [{write: 0, turn: 'N', next: 0}, {write: 0, turn: 'N', next: 1}]
            ],
            [
                [{write: 1, turn: 'L', next: 0}, {write: 1, turn: 'R', next: 1}],
                [{write: 0, turn: 'R', next: 0}, {write: 0, turn: 'L', next: 1}]
            ],
            [
                [{write: 1, turn: 'R', next: 1}, {write: 1, turn: 'L', next: 1}],
                [{write: 1, turn: 'R', next: 1}, {write: 0, turn: 'R', next: 0}]
            ],
            [
                [{write: 1, turn: 'R', next: 0},{write: 0, turn: 'L', next: 0}]
            ],
            [
                [{write: 1, turn: 'R', next: 1}, {write: 0, turn: 'R', next: 1}],
                [{write: 1, turn: 'N', next: 0}, {write: 1, turn: 'N', next: 1}]
            ],
        ]
        this.transitions = this.transitionPresetValues[0]

        this.directionMap = {
            'N': 0,
            'L': -1,
            'R': 1,
            'U': 2
        }

        this.setRGB(this.position, vec3.fromValues(255, 0, 0), General.loopIndex)
    }

    reset() {
        super.reset()
        this.position = [...this.startingPosition]
    }

    callback() {
        const pixel = this.getRGB(this.position, General.loopIndex)
        const transitions = this.transitionPresetValues[this.transitionPreset]
        const transition = transitions[this.state][parseInt(pixel[0] / 255)]
        const direction = this.directionMap[transition.turn]

        this.currentDirection = General.loop(this.currentDirection + direction, this.directions.length)
        this.setRGB(this.position, [transition.write * 255, transition.write * 255, transition.write * 255], General.loopIndex)
        vec2.add(this.position, this.position, this.directions[this.currentDirection])
        this.state = transition.next
    }

    guiCallback() {
        ImGui.DragInt2('Starting Position', this.startingPosition)
        ImGui.Combo('Transition Preset##' + this.id, (_ = this.transitionPreset) => this.transitionPreset = _, this.transitionPresetKeys, ImGui.ARRAYSIZE(this.transitionPresetKeys))
    }
}

export default Turmite
