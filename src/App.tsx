import "./App.scss";

import Layout from "./components/Layout.tsx";
import Grid from "./components/Grid.tsx";
import Controls from "./components/Controls.tsx";

import Gol from "./gol";

const App = () => {
  const title = `Game Of Life`;
  const introText = `John Horton Conway FRS (26 December 1937 - 11 April 2020) 
                An English mathematician active in the theory of finite groups,
                knot theory, number theory, combinatorial game theory and coding
                theory. 
                
                He also made contributions to many branches of
                recreational mathematics, most notably the invention of the
                cellular automaton called the Game of Life.

                This is the Game Of Life.`;

  const speed = 20;
  const viewPort = 800;
  const cells = 50;

  const gol = Gol.create(cells);

  return (
    <Layout title={title} intro={introText}>
      <Controls gol={gol} speed={speed} />
      <Grid gol={gol} viewPortWidth={viewPort} />
    </Layout>
  );
};

export default App;
