import React from "react";
import Cell from "./components/Cell";

const create = (size: number) => {
  const cells: boolean[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));

  const numCols = (): number => cells[0]?.length || 0;
  const numRows = (): number => cells.length;
  const numCells = (): number => Math.pow(cells.length, 2);

  const isCell = (r: number, c: number): boolean =>
    r >= 0 && r < cells.length && c >= 0 && c < cells[0]?.length;

  const get = (r: number, c: number): boolean => isCell(r, c) && cells[r][c];
  const set = (r: number, c: number, val: boolean): void => {
    if (isCell(r, c)) cells[r][c] = val;
  };

  const iterate = (
    callback: (cell: boolean, r: number, c: number) => void
  ): void =>
    cells.forEach((row, rInd) => {
      row.forEach((cell, cInd) => callback(cell, rInd, cInd));
    });

  const makeSetter =
    (r: number, c: number) =>
    (val: boolean): void =>
      set(r, c, val);
  const makeToggle = (r: number, c: number) => (): void => {
    if (isCell(r, c)) {
      cells[r][c] = !cells[r][c];
      refreshHandler?.();
    }
  };

  const print = (): void => console.table(cells);

  const neighbourData = (r: number, c: number) => [
    [get(r - 1, c - 1), get(r - 1, c), get(r - 1, c + 1)],
    [get(r, c - 1), get(r, c + 1)],
    [get(r + 1, c - 1), get(r + 1, c), get(r + 1, c + 1)],
  ];

  const livingNeighbours = (r: number, c: number) =>
    neighbourData(r, c)
      .flat()
      .reduce((a, curr) => (curr ? a + 1 : a), 0);

  interface RegisterEntry {
    action: "spawn" | "kill";
    r: number;
    c: number;
  }

  const evolve = (complete: () => void): void => {
    const register: RegisterEntry[] = [];
    iterate((cellIsAlive, r, c) => {
      const aliveNeighbours = livingNeighbours(r, c);

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
          });
        }
      } else {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          // die
          //console.log(`${r}/${c} DIES`)
          register.push({
            action: "kill",
            r,
            c,
          });
        }
      }
    });

    register.forEach((reg) => set(reg.r, reg.c, reg.action === "spawn"));
    refreshHandler?.();
    return complete();
  };

  const render = (viewPortWidth: number): React.ReactNode[] =>
    cells.flatMap((row, rInd) =>
      row.map((c, cInd) => (
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
      ))
    );

  let refreshHandler: (() => void) | null = null;
  const registerChangeHandler = (refreshHandlerCallback: () => void): void => {
    refreshHandler = refreshHandlerCallback;
  };

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
  };
};

const Gol = {
  create,
};
export default Gol;
