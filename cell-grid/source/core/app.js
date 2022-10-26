import * as ImGui from '@gui/imgui'
import * as ImGuiImpl from '@gui/imgui-impl'
import Simulation from './simulation'

const App = async function() {
    let isRunning = true
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.tabIndex = 1
    document.getElementById('root').append(canvas)
    document.body.style.margin = '0'
    document.body.style.height = '100vh'
    document.getElementById('root').style.height = '100%'

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    await ImGui.default()
    ImGui.CreateContext()
    ImGuiImpl.Init(canvas)
    ImGui.StyleColorsDark()

    const gl = ImGuiImpl.gl
    const simulation = new Simulation(gl, canvas)
    simulation.init()

    window.requestAnimationFrame(run)

    function run(time) {
        simulation.updateCamera()
        simulation.updateCells()

        ImGuiImpl.NewFrame(time)
        ImGui.NewFrame()
        simulation.renderGui()
        ImGui.EndFrame()
        ImGui.Render()

        const gl = ImGuiImpl.gl
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        simulation.renderCells()

        ImGuiImpl.RenderDrawData(ImGui.GetDrawData())
        window.requestAnimationFrame(isRunning ? run : clean)
    }

    function clean() {
        ImGuiImpl.Shutdown()
        ImGui.DestroyContext()
    }
}

export default App
