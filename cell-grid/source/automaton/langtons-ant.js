import * as ImGui from '@gui/imgui'
import { vec2, vec3 } from 'gl-matrix'
import General from '@core/general'
import CellularAutomaton from '@core/cellular-automaton'

class LangtonsAnt extends CellularAutomaton {
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

        this.setRGB(this.position, vec3.fromValues(255, 0, 0), General.loopIndex)

        this.turnSequence = 'LLRLRRLLL'
        this.turnSequenceBuffer = this.turnSequence
        this.colorSequence = [
            [0, 0, 0],
            [64,40,89],
            [53,55,99],
            [39,95,119],
            [56,135,113],
            [90,158,92],
            [255,234,99],
            [216,149,68],
            [141,132,74],
            [188,178,111],
            [255,229,191],
            [255,255,255]
        ]

        this.directionMap = {
            'N': 0,
            'L': -1,
            'R': 1,
            'U': 2,
            'l': -2,
            'r': 2,
            'u': 3
        }

        this.colorBuffer = this.colorSequence.map(color => [color[0] / 255, color[1] / 255, color[2] / 255])

        this.patterPreset = 0
        this.patternPresetKeys = [
            'Langton\'s Ant',
            'Chaotic without highway',
            'Cardiod',
            'Square',
            'Convoluted highways',
            'Triangle',
            'Hexagonal circular',
            'Hexagonal spiral'
        ],
        this.patternPresetValues = [
            'LR',
            'RLR',
            'LLRR',
            'LRRRRRLLR',
            'LLRRRLRLRLLR',
            'RRLLLRLLLRRR',
            'lNNLlL',
            'LlNulLr'
        ]

        
        this.connectivity = 0
        this.connectivityKeys = [
            'Neumann Neighborhood',
            'Hexagonal',
            'Inverse Neuman Neighborhood',
            'Moore neighborhood'
        ],
        this.connectivityValues = [
            [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0]
            ],
            [
                [0, 1],
                [1, 1],
                [1, 0],
                [0, -1],
                [-1, -1],
                [-1, 0]
            ],
            [
                [-1, -1],
                [-1, 1],
                [1, 1],
                [1, -1]
            ],
            [
                [-1, 1],
                [0, 1],
                [1, 1],
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, -1],
                [-1, 0]
            ]
        ]
    }

    reset() {
        super.reset()
        this.position = [...this.startingPosition]
    }

    callback() {
        const pixel = this.getRGB(this.position, General.loopIndex)
        const index = this.colorSequence.indexOf(this.colorSequence.find(color => color[0] == pixel[0] && color[1] == pixel[1] && color[2] == pixel[2]))
        const turn = this.turnSequence[index] || 'N'
        const direction = this.directionMap[turn]

        this.currentDirection = General.loop(this.currentDirection + direction, this.directions.length)
        this.setRGB(this.position, this.colorSequence[General.loop(index + 1, this.turnSequence.length)], General.loopIndex)
        vec2.add(this.position, this.position, this.directions[this.currentDirection])
    }

    guiCallback() {
        ImGui.DragInt2('Starting Position', this.startingPosition)
        ImGui.Text('Current Turn Sequence: ' + this.turnSequence)
        ImGui.Combo('Pattern Preset##' + this.id, (_ = this.patterPreset) => this.patterPreset = _, this.patternPresetKeys, ImGui.ARRAYSIZE(this.patternPresetKeys))
        ImGui.SameLine()

        if (ImGui.Button('Set##' + this.id)) {
            this.turnSequence = this.patternPresetValues[this.patterPreset]
            this.turnSequenceBuffer = this.turnSequence
        }

        ImGui.InputText('Turn Sequence##' + this.id, (_ = this.turnSequenceBuffer) => this.turnSequenceBuffer = _, 12)
        ImGui.SameLine()

        if (ImGui.Button('Save##' + this.id)) {
            if (/^[LRNUlru]+$/.test(this.turnSequenceBuffer)) {
                this.turnSequence = this.turnSequenceBuffer
            } else {
                this.turnSequenceBuffer = this.turnSequence
            }
        }

        ImGui.Combo('Connectivity##' + this.id, (_ = this.connectivity) => this.connectivity = _, this.connectivityKeys, ImGui.ARRAYSIZE(this.connectivityKeys))
        ImGui.SameLine()

        if (ImGui.Button('Set2##' + this.id)) {
            this.directions = this.connectivityValues[this.connectivity]
        }

        if (ImGui.TreeNode('Directions##' + this.id)) {
            for (let a = 0; a < this.directions.length; ++a) {
                ImGui.SliderInt2(a.toString(), this.directions[a], -10, 10)
            }

            ImGui.TreePop()
        }

        if (ImGui.TreeNode('Color Sequence##' + this.id)) {
            for (let a = 0; a < this.colorBuffer.length; ++a) {
                ImGui.ColorEdit3(a.toString(), this.colorBuffer[a])
            }

            if (ImGui.Button('Save2##' + this.id)) {
                this.colorSequence = this.colorBuffer.map(color => [parseInt(color[0] * 255), parseInt(color[1] * 255), parseInt(color[2] * 255)])
            }

            ImGui.TreePop()
        }
    }

    getConfig() {
        return {
            ...super.getConfig(),
            startingPosition: this.startingPosition,
            directions: this.directions,
            colorSequence: this.colorSequence,
            turnSequence: this.turnSequence
        }
    }
}

export default LangtonsAnt
