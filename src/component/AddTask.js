import React, { useState } from "react";
import { addToDo } from "../redux/actions";
import { TextField, Button } from "@material-ui/core";

import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    dispatch(addToDo(text));
    setText("");
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-7">
          <TextField
            placeholder="Add Todo here"
            fullWidth
            onChange={(event) => setText(event.target.value)}
            value={text}
            autoFocus
          />
        </div>
        <div className="col-md-2">
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddTask);
