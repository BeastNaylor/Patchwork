import React from "react";
import { Row, Button, ButtonGroup, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { actions } from "../state/slice";

const GridControls = () => {
  const dispatch = useDispatch();

  return (
    <Row style={{ maxWidth: "200px" }}>
      <ButtonGroup>
        <Button color="primary" onClick={() => dispatch(actions.rotate())}>
          Rotate
        </Button>
        <Button color="primary" onClick={() => dispatch(actions.flip())}>
          Flip
        </Button>
      </ButtonGroup>
    </Row>
  );
};

export default GridControls;
