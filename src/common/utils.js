import * as R from 'ramda'

export const sequence = n => Array.from(new Array(n), (val, i) => i)

const randN = n => Math.round(Math.random() * (n - 1))

export const randomAdjList = (n, density) => {
    let adjList = new Array(n)

    for (let i = 0; i < n; ++i) {
        const neighbours = []
        let degree = randN(n * density)
        for (let j = 0; j < degree; ++j)
            neighbours.push(randN(n - 1))
        adjList[i] = neighbours
    }

    return toImmutableListDeep(adjList)
}

export const stringifyAdjList =
    R.pipe(
        R.map(
            R.pipe(
                JSON.stringify,
                R.prepend('    '),
                R.append(',\n'),
                R.join('')
            )
        ),
        R.prepend('[\n'),
        R.append(']'),
        R.join('')
    )

const isValidJson = str => {
    try {
        return (R.is(String, str) && JSON.parse(str));
    } catch (e) {
        return false;
    }
}

export const isValidAdjList = str =>
    isValidJson(str) &&
    R.reduce(
        (acc, list) =>
            acc && R.is(Array, list) && R.reduce((acc, element) => acc && R.is(Number, element), true, list),
        true,
        JSON.parse(str)
    )

export const BFS = (onVisit, adjList, s) => {
    let visited = []
    for (let i = 0; i < adjList.size; ++i)
        visited.push(false)
    visited[s] = true

    let Q = []
    Q.push(s)

    while (Q.length > 0) {
        let u = Q.shift()
        adjList.get(u).forEach(v => {
            if (!visited[v]) {
                Q.push(v)
                visited[v] = true
                onVisit(u, v)
            }
        })
    }
}


export const drawEdge = (uRef, vRef, canvasRef, canvasOffset, highlighted) => {
    const xMid = window.innerWidth / 2
    const yMid = window.innerHeight / 2


    // path begin and end
    const x1 = 20 + uRef.current.getBoundingClientRect().x - canvasOffset.x
    const y1 = 20 + uRef.current.getBoundingClientRect().y - canvasOffset.y
    const x2 = 20 + vRef.current.getBoundingClientRect().x - canvasOffset.x
    const y2 = 20 + vRef.current.getBoundingClientRect().y - canvasOffset.y

    // curve to avoid overlap
    let curvePoint1 = [0, 0]
    let curvePoint2 = [0, 0]
    if (x1 === x2)
        curvePoint1 = [x1 === xMid ? 0 : (x1 < xMid ? -100 : 100), (y2 - y1) / 2]
    if (y1 === y2)
        curvePoint1 = [(x2 - x1) / 2, y1 === yMid ? 0 : (y1 < yMid ? -100 : 100)]

    if (x1 === x2 && y1 === y2) {
        curvePoint1 = [-100, -100]
        curvePoint2 = [100, -100]
    } else {
        curvePoint2 = curvePoint1
    }

    const style = 'class="highlighted" marker-end="url(#arrow-highlighted)"'
    canvasRef.current.innerHTML +=
        `<path d="M ${x1} ${y1}` +
        `  c ${curvePoint1[0]} ${curvePoint1[1]}` +
        `  ${curvePoint2[0]} ${curvePoint2[1]}` +
        `  ${x2 - x1} ${y2 - y1}"` +
        `  ${highlighted === true ? style : 'marker-end="url(#arrow)"'}"/>`
}
