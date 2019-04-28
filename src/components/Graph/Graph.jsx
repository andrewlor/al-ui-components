import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import Vertex from './Vertex'
import {
    sequence,
    drawEdge,
    BFS,
    randomAdjList,
} from '../../common/utils'

import './Graph.scss'

class Graph extends React.PureComponent {
    constructor(props) {
        super(props)

        // listen to window resize event
        window.onresize = () => {
            if (this.state.redrawingTimeout)
                clearTimeout(this.state.redrawingTimeout)
            this.setState({
                isRedrawing: true,
                redrawingTimeout: setTimeout(() => {
                    this.setState({isRedrawing: false})
                    this.drawEdges()
                }, 100)
            })
        }

        let adjList = R.ifElse(
            R.equals(true),
            () => randomAdjList(props.n, props.density),
            () => props.adjList
        )(props.random)

        // create a ref for each vertex
        let vertexRefs = []
        for (let i = 0; i < adjList.size; ++i)
            vertexRefs.push(React.createRef())

        this.vertexRefs = vertexRefs

        this.state = {
            adjList: adjList,
            n: adjList.size,
            sideLen: Math.ceil(Math.sqrt(adjList.size)),
            isRedrawing: false,
        }
    }

    canvasRef = React.createRef()

    componentDidMount = () => this.drawEdges()

    // Helpers
    vertexNumber = (row, col) => row * this.state.sideLen + col

    rowColNumber = u => R.pair(Math.floor(u / this.state.sideLen), u % this.state.sideLen)

    // Drawers
    drawEdge = (u, v, canvasOffset, highlighted) =>
        drawEdge(this.vertexRefs.get(u), this.vertexRefs.get(v),
            this.canvasRef, canvasOffset, highlighted)

    drawEdges = () => {
        this.canvasRef.current.innerHTML = ''
        const canvasOffset = this.getCanvasOffset()
        this.state.adjList.forEach((neighbours, u) =>
            neighbours.forEach(v => this.drawEdge(u, v, canvasOffset)))
    }

    getCanvasOffset = () =>
        R.applySpec({
            x: R.prop('x'), y: R.prop('y')
        })(this.canvasRef.current.getBoundingClientRect())

    // Graph algos
    BFS = s => {
        this.drawEdges()
        const canvasOffset = this.getCanvasOffset()
        BFS((u, v) => this.drawEdge(u, v, canvasOffset, true), this.state.adjList, s)
    }

    // Renderers
    renderVertex = row => col =>
        R.ifElse(
            R.lt(this.vertexNumber(row, col)),
            () =>
                <Vertex
                    key={row + '' + col}
                    label={this.vertexNumber(row, col)}
                    handleClick={() => this.BFS(this.vertexNumber(row, col))}
                    reference={this.vertexRefs.get(this.vertexNumber(row, col))}
                    neighbours={this.state.adjList.get(this.vertexNumber(row, col))}
                />,
            R.always(null)
        )(this.state.n)

    renderRow = row =>
        <React.Fragment key={row}>
            {R.ifElse(
                R.lt(this.vertexNumber(row, 0)),
                () =>
                    <div className='row'>
                        {sequence(this.state.sideLen).map(this.renderVertex(row))}
                    </div>,
                R.always(null)
            )(this.state.n)}
        </React.Fragment>

    renderCanvas = () =>
        <svg className='canvas'>
            <defs>
                <marker id='arrow' markerWidth="10" markerHeight="10" refX="20" refY="3" orient="auto"
                        markerUnits="strokeWidth">
                    <path d="M9,3 L0,6 L0,0 z" className='arrow'/>
                </marker>
                <marker id='arrow-highlighted' markerWidth="10" markerHeight="10" refX="20" refY="3"
                        orient="auto" markerUnits="strokeWidth">
                    <path d="M9,3 L0,6 L0,0 z" className='arrow-highlighted'/>
                </marker>
            </defs>
            <svg ref={this.canvasRef} className='canvas'/>
        </svg>

    render = () =>
        <>
            {
                this.state.isRedrawing
                    ? <div id='redrawing'><h1>Redrawing...</h1></div>
                    : <>
                        <div className='graph'>
                            {this.renderCanvas()}
                            {sequence(this.state.sideLen).map(this.renderRow)}
                        </div>
                    </>
            }
        </>
}

Graph.propTypes = {
    adjList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    random: PropTypes.bool,
    n: PropTypes.number,
    density: PropTypes.number,
}

export default Graph
