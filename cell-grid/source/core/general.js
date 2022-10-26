import { vec2 } from 'gl-matrix'

class General {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    static randomVec2(min, max) {
        return vec2.fromValues(General.randomInt(min[0], max[0]), General.randomInt(min[1], max[1]))
    }

    static clamp(x, min, max) {
        return Math.min(Math.max(x, min), max)
    }

    static loop(x, max) {
        return (max + x % max) % max
    }

    static normalIndex(size, position) {
        return position[1] * size[1] + position[0]
    }
    
    static clampIndex(size, position) {
        return General.clamp(position[1], 0, size[1]) * size[0] + General.clamp(position[0], 0, size[0])
    }

    static loopIndex(size, position) {
        return General.loop(position[1], size[1]) * size[0] + General.loop(position[0], size[0])
    }
}

export default General
