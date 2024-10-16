import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export interface ControlsParams {
  gol: any;
  speed: number;
}

const Controls = ({ gol, speed }: ControlsParams): React.ReactNode => {
  const [isStarted, setIsStarted] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const interval = isStarted
      ? setInterval(() => {
          gol.evolve(() => setGeneration(generation + 1));
        }, speed)
      : undefined;
    return () => clearInterval(interval);
  }, [generation, isStarted, gol, speed]);

  const step = () => gol.evolve(() => setGeneration(generation + 1));

  const report = () => {
    gol.print();
  };

  return (
    <div className="gol-controls">
      <Row>
        <Col>
          <Button
            size="sm"
            onClick={() => setIsStarted(!isStarted)}
            variant="primary"
          >
            {isStarted ? "!!!stop!!!" : ">> start >>"}
          </Button>{" "}
          <Button size="sm" onClick={step} variant="warning">
            Step {">>"}
          </Button>{" "}
          <Button size="sm" onClick={report} variant="info">
            Report
          </Button>
        </Col>
        <Col>
          Generation: {generation} Grid size: {gol.numRows()}x{gol.numCols()} (
          {gol.numCells()})
        </Col>
      </Row>
    </div>
  );
};

export default Controls;
