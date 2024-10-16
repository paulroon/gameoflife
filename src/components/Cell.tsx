export interface CellParams {
  alive: boolean;
  className: string;
  style: React.CSSProperties;
  toggle: () => void;
}

const Cell = ({
  alive,
  className,
  style,
  toggle,
}: CellParams): React.ReactNode => {
  const styles = {
    ...style,
    backgroundColor: alive ? "#FFFFFF" : "#000000",
    borderColor: alive ? "#000000" : "#FFFFFF",
    color: alive ? "#FFFFFF" : "#000000",
  };

  return (
    <span className={className} onClick={toggle} style={styles}>
      {alive ? "x" : "."}
    </span>
  );
};

export default Cell;
