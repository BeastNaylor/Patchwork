import { Container, Row, Button, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectCount } from "./state/slice";
import TileSquare from "./components/TileSquare";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  const handleKeyPress = (e) => {
    console.log(e);
    switch (e.key) {
      case "r":
        dispatch(actions.rotate());
        break;
      case "f":
        dispatch(actions.flip());
        break;
    }
  };

  let grid = [];
  for (let row = 1; row <= 7; row++) {
    let rows = [];
    for (let col = 1; col <= 7; col++) {
      rows.push(<TileSquare column={col} row={row} Active={false} />);
    }
    grid.push(<Row style={{ display: "flex" }}>{rows}</Row>);
  }

  return (
    <>
      <Container onKeyPress={handleKeyPress}>
        <Row>
          <h2>Hello</h2>
        </Row>
        <Button onClick={() => dispatch(actions.rotate())}>Rotate</Button>
        <Button onClick={() => dispatch(actions.flip())}>Flip</Button>
      </Container>
      <Container>{grid}</Container>
    </>
  );
};

export default App;
