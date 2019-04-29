import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import Vertex from './Vertex'
import debounce from 'lodash.debounce'
import {
    sequence,
    drawEdge,
    BFS,
    randomAdjList,
} from '../../common/utils'

import './Graph.scss'

class Graph extends React.PureComponent {
    state = {
        adjList: [],
        n: 0,
        sideLen: 0,
    }

    canvasRef = React.createRef()

    static getDerivedStateFromProps = ({ n, random, adjList, density }) =>
        random
            ? ({
                n,
                sideLen: Math.ceil(Math.sqrt(n)),
                adjList: randomAdjList(n, density),
                vertexRefs: R.map(
                    React.createRef,
                    sequence(n)
                )
            }) : ({
                n: adjList.length,
                sideLen: Math.ceil(Math.sqrt(adjList.length)),
                adjList,
                vertexRefs: R.map(
                    React.createRef,
                    sequence(adjList.length)
                )
            })

    componentDidMount = () => {
        this.drawEdges()
        window.onresize = () =>
            this.setState({ isRedrawing: true }, this.drawEdgesDebounced)
    }

    componentDidUpdate = (prevProps) =>
        R.not(R.equals(prevProps, this.props))
            ? this.drawEdges() : null

    // Helpers
    vertexNumber = (row, col) => row * this.state.sideLen + col

    rowColNumber = u => R.pair(Math.floor(u / this.state.sideLen), u % this.state.sideLen)

    // Drawers
    drawEdge = (u, v, canvasOffset, highlighted) =>
        drawEdge(this.state.vertexRefs[u], this.state.vertexRefs[v],
            this.canvasRef, canvasOffset, highlighted)

    drawEdges = () =>
        this.setState({ isRedrawing: false }, () => {
            this.canvasRef.current.innerHTML = ''
            const canvasOffset = this.getCanvasOffset()
            this.state.adjList.forEach((neighbours, u) =>
                neighbours.forEach(v => this.drawEdge(u, v, canvasOffset)))
        })

    drawEdgesDebounced = debounce(() => this.drawEdges(), 100)

    getCanvasOffset = () =>
        R.applySpec({
            x: R.prop('x'), y: R.prop('y')
        })(this.canvasRef.current.getBoundingClientRect())

    // Graph algos
    BFS = s => {
        this.drawEdges()
        const canvasOffset = this.getCanvasOffset()
        //BFS((u, v) => this.drawEdge(u, v, canvasOffset, true), this.state.adjList, s)
    }

    // Renderers
    renderVertex = row => col =>
        R.ifElse(
            R.lt(this.vertexNumber(row, col)),
            () =>
                <Vertex
                    key={row + '' + col}
                    label={this.vertexNumber(row, col)}
                    //handleClick={() => this.BFS(this.vertexNumber(row, col))}
                    reference={this.state.vertexRefs[this.vertexNumber(row, col)]}
                    neighbours={this.state.adjList[this.vertexNumber(row, col)]}
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
