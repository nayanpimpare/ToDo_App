import "react-datetime/css/react-datetime.css";
import React, { useState } from "react";
import { addToDo } from "../redux/actions";
import { TextField, Button } from "@material-ui/core";
import Datetime from "react-datetime";

import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [showError, setShowError] = useState({
    todoItem: false,
    dateTime: false,
  });
  const [date, setDate] = useState();
  const [inputPropsForDateTimePicker] = useState({
    placeholder: "MM/DD/YYYY",
    required: true,
  });

  const handleAdd = () => {
    let setErrors = {
      todoItem: false,
      dateTime: false,
    };
    let flag = true;
    if (!text) {
      setErrors = { ...setErrors, todoItem: true };
      flag = false;
    }
    if (!date) {
      setErrors = { ...setErrors, dateTime: true };
      flag = false;
    }
    if (flag) {
      dispatch(addToDo({ value: text, selectedDate: date }));
      setText("");
      setDate("");
    } else {
      setShowError(setErrors);
    }
  };

  const handleItemChange = (event) => {
    setShowError({ ...showError, todoItem: false });
    setText(event.target.value);
  };

  const handleDateTime = (selectedDate) => {
    if (typeof selectedDate === "object" && new Date(selectedDate)) {
      setDate(new Date(selectedDate));
      setShowError({ ...showError, dateTime: false });
    } else {
      setDate("");
    }
  };

  return (
    <form noValidate autoComplete="off">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <TextField
              required
              id="outlined-required"
              label="Add Todo"
              placeholder="Add Todo here"
              fullWidth
              onChange={handleItemChange}
              value={text}
              autoFocus
              error={showError?.todoItem}
              helperText={showError?.todoItem && "This is requied field"}
            />
          </div>
          <div className="col-md-3">
            <label className={showError?.dateTime ? "validation-red" : ""}>
              Select Date:{" "}
            </label>

            <Datetime
              onChange={handleDateTime}
              value={date}
              inputProps={inputPropsForDateTimePicker}
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
    </form>
  );
};

export default React.memo(AddTask);
