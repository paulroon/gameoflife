import React, { useState } from 'react'

const Grid = ({ gol, viewPortWidth }) => {

    const [refresh, setRefresh] = useState(0)

    gol.registerChangeHandler(() => setRefresh(refresh + 1))

    return (
        <div
            className="gol-grid"
            style={{
                width: `${viewPortWidth}px`,
            }}
        >
            {gol.render(viewPortWidth)}
        </div>
    )
}

export default Grid
