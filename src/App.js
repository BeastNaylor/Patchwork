import { Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectCount } from "./state/slice";
import TitleBar from "./components/TitleBar";
import PlayerInfo from "./components/PlayerInfo";
import MovementScreen from "./components/MovementScreen";
import TileGrid from "./components/TileGrid";
import GridControls from "./components/GridControls";
import ShapeSelectionRow from "./components/ShapeSelectionRow";
import ShapeOverview from "./components/ShapeOverview";

const App = () => {
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "r":
        dispatch(actions.rotate());
        break;
      case "f":
        dispatch(actions.flip());
        break;
      default:
        break;
    }
  };
  return (
    <div tabIndex={0} onKeyDown={handleKeyPress}>
      <TitleBar />
      <Container>
        <PlayerInfo />
        <MovementScreen />
        <TileGrid />
        <GridControls />
        <ShapeSelectionRow />
        <ShapeOverview />
      </Container>
    </div>
  );
};

export default App;
