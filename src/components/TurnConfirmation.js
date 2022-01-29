import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/slice";
import { Row } from "reactstrap";

const TurnConfirmation = () => {
  const dispatch = useDispatch();

  return (
    <Row
      className={"mt-2"}
      style={{ justifyContent: "center", flexFlow: "row nowrap" }}
    >
      <div style={{ width: "initial" }}>
        <div
          onClick={(x) => dispatch(actions.confirmTurn())}
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid black",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Confirm Turn
        </div>
      </div>
      <div style={{ width: "initial" }}>
        <div
          onClick={(x) => dispatch(actions.resetTurn())}
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid black",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Reset Turn
        </div>
      </div>
    </Row>
  );
};

export default TurnConfirmation;
