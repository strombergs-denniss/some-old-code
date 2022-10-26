import * as ImGui from '@gui/imgui'
import { vec3 } from 'gl-matrix'
import General from '@core/general'
import CellularAutomaton from '@core/cellular-automaton'
import { Noise } from '../../core/noise'

class Entity {
    constructor(position = [0, 0], color = [255, 255, 255]) {
        this.position = position
        this.color = color
    }

    process() {}
}

class Agent extends Entity {
    constructor(position) {
        super(position)
        this.gender = Math.random() > 0.5 ? 'male' : 'female'
        this.color = this.gender === 'male' ? [0, 255, 255] : [255, 0, 255]
        this.clock = Math.random()
        this.isPregnant = false
        this.pregnancyClock = 0
    }

    process(entities, index) {
        this.clock += 0.01

        if (this.isPregnant && this.gender === 'female') {
            this.pregnancyClock += 0.01
        }

        this.position[0] += General.randomInt(-1, 1)
        this.position[1] += General.randomInt(-1, 1)

        const intersect = this.getIntersect(entities, index)

        if (intersect) {
            if (this.clock > 2.5 && intersect.clock > 2.5 && this.gender !== intersect.gender) {
                const female = this.gender === 'female' ? this : intersect

                if (!female.isPregnant) {
                    female.isPregnant = true
                    female.pregnancyClock = 0
                    female.color = [255, 0, 0]
                }
            }
        }

        this.giveBirth(entities)
    }

    giveBirth(entities) {
        if (this.isPregnant && this.pregnancyClock > 1 && entities.length < 1000) {
            entities.push(new Agent([this.position[0], this.position[1]]))
            this.isPregnant = false
            this.pregnancyClock = 0
            this.color = [255, 0, 255]
        }
    }

    getIntersect(entities, index) {
        for (let a = 0; a < entities.length; ++a) {
            const entity = entities[a]

            if (a !== index && this.position[0] === entity.position[0] && this.position[1] === entity.position[1]) {
                return entity
            }
        }

        return false
    }

    isDead() {
        return this.clock > 5
    }
}

class World extends CellularAutomaton {
    setup() {
        this.entities = []

        const noise = new Noise(Math.random())
        const size = this.ref.size
        for (let x = 0; x < size[0]; ++x) {
            for (let y = 0; y < size[1]; ++y) {
                const value = ((Math.abs(noise.perlin2(x / 100, y / 100)) > 0.2) && Math.random() > 0.99) * 255;

                if (value) {
                    if (this.entities.length < 1000) {
                        this.entities.push(new Agent([x, y]))
                    }
                }
            }
        }
    }

    reset() {
        super.reset()
        this.setup()
    }

    callback() {
        for (let a = 0; a < this.entities.length; ++a) {
            const entity = this.entities[a]
            this.setRGB(entity.position, [0, 0, 0], General.loopIndex)
            entity.process(this.entities, a)

            if (entity.isDead()) {
                this.entities.splice(a, 1)
                entity.color = [0, 0, 0]
            }

            this.setRGB(entity.position, entity.color, General.loopIndex)
        }
    }

    guiCallback() {
    }
}

export default World
