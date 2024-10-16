import { useState } from "react";

export interface GridParams {
  gol: any;
  viewPortWidth: number;
}

const Grid = ({ gol, viewPortWidth }: GridParams): React.ReactNode => {
  const [refresh, setRefresh] = useState(0);

  gol.registerChangeHandler(() => setRefresh(refresh + 1));

  return (
    <div
      className="gol-grid"
      style={{
        width: `${viewPortWidth}px`,
      }}
    >
      {gol.render(viewPortWidth)}
    </div>
  );
};

export default Grid;
