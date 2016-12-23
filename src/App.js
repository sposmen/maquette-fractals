import * as maquette from 'maquette';
const h = maquette.h;
import './App.css';
import {select as d3select, mouse as d3mouse} from 'd3-selection';
import {scaleLinear} from 'd3-scale';

import Pythagoras from './Pythagoras.js';

class App {
    svg = {
        width: 1280,
        height: 600
    };
    state = {
        currentMax: 0,
        baseW: 80,
        heightFactor: 0,
        lean: 0
    };
    running = false;
    realMax = 11;

    projector = maquette.createProjector({});


    run() {
        this.projector.append(document.body, this.renderMaquette.bind(this));

        d3select("#fractals-svg").on("mousemove", this.onMouseMove.bind(this));

        this.next();

    }

    next() {
        const {currentMax} = this.state;

        if (currentMax < this.realMax) {
            this.state.currentMax++;
            setTimeout(this.next.bind(this), 500);
        }
    }

    onMouseMove(event) {
        if (this.running) return;
        this.running = true;

        const [x, y] = d3mouse("#fractals-svg"),

            scaleFactor = scaleLinear().domain([this.svg.height, 0])
                .range([0, .8]),

            scaleLean = scaleLinear().domain([0, this.svg.width / 2, this.svg.width])
                .range([.5, 0, -.5]);

        this.state.heightFactor = scaleFactor(y);
        this.state.lean = scaleLean(x);
        this.running = false;
    }

    renderMaquette() {
        return (
            <div class="App">
                <div class="App-header">
                    <h2>This is a dancing Pythagoras tree</h2>
                </div>
                <p class="App-intro">
                    {
                        h('svg#fractals-svg', {

                            style: {
                                border: "1px solid lightgray", width: this.svg.width,
                                height: this.svg.height,
                            }
                        }, [
                            Pythagoras({
                                w: this.state.baseW,
                                x: this.svg.width / 2 - 40,
                                y: this.svg.height - this.state.baseW,
                                heightFactor: this.state.heightFactor,
                                lean: this.state.lean,
                                lvl: 0,
                                maxlvl: this.state.currentMax,
                                h: this.state.baseW
                            })
                        ])
                    }

                </p>
            </div>
        );
    }
}

export default App;
