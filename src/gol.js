import Cell from "./components/Cell"

const create = (size) => {
    const cells = [...new Array(size)].map(() =>
        [...new Array(size)].map(() => false)
    )

    const numCols = () => cells.length && cells[0].length
    const numRows = () => cells.length
    const numCells = () => Math.pow(cells.length, 2)

    const isCell = (r, c) =>
        r >= 0 &&
        r < cells.length &&
        c >= 0 &&
        c < cells.length &&
        cells[0].length

    const get = (r, c) => isCell(r, c) && cells[r][c]
    const set = (r, c, val) => (cells[r][c] = val)

    const iterate = (callback) =>
        cells.forEach((row, rInd) => {
            row.forEach((cell, cInd) => callback(cell, rInd, cInd))
        })

    const makeSetter = (r, c) => (val) => (cells[r][c] = val)
    const makeToggle = (r, c) => () => {
        isCell(r, c) && set(r, c, !cells[r][c])
        refreshHandler()
    }

    const print = () => console.table(cells)

    const neighbourData = (r, c) => [
        [get(r - 1, c - 1), get(r - 1, c), get(r - 1, c + 1)],
        [get(r, c - 1), get(r, c + 1)],
        [get(r + 1, c - 1), get(r + 1, c), get(r + 1, c + 1)],
    ]

    const livingNeighbours = (r, c) =>
        neighbourData(r, c)
            .flat()
            .reduce((a, curr) => (curr ? a + 1 : a), 0)

    const evolve = (complete) => {

        
        const register = []
        iterate((cellIsAlive, r, c) => {
            const aliveNeighbours = livingNeighbours(r, c)

            // if (!(r === 0 && c === 0)) return

            // console.log(`0/0 has ${aliveNeighbours} alive neighbours`)
            // return

            if (!cellIsAlive) {
                if (aliveNeighbours === 3) {
                    // spring to life
                    //console.log(`${r}/${c} COMES ALIVE`)
                    register.push({
                        action: "spawn",
                        r,
                        c,
                    })
                }
            } else {
                if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                    // die
                    //console.log(`${r}/${c} DIES`)
                    register.push({
                        action: "kill",
                        r,
                        c,
                    })
                }
            }
        })

        register.forEach((reg) => set(reg.r, reg.c, reg.action === "spawn"))
        refreshHandler()
        return complete()
    }

    const render = (viewPortWidth) =>
        cells
            .map((row, rInd) =>
                row.map((c, cInd) => {
                    return (
                        <Cell
                            key={`cell-${rInd}-${cInd}`}
                            className="g-cell"
                            alive={c}
                            toggle={makeToggle(rInd, cInd)}
                            style={{
                                width: `${viewPortWidth / numCols()}px`,
                                lineHeight: `${viewPortWidth / numCols()}px`,
                            }}
                        />
                    )
                })
            )
            .flat()

    let refreshHandler = null
    const registerChangeHandler = (refreshHandlerCallback) => {
        refreshHandler = refreshHandlerCallback
    }


    return {
        numCols,
        numRows,
        numCells,
        isCell,
        get,
        set,
        iterate,
        makeSetter,
        makeToggle,
        print,
        neighbourData,
        evolve,
        render,
        registerChangeHandler,
    }
}

const Gol = {
    create,
}
export default Gol
