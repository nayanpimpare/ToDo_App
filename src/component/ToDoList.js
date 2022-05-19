import React, { useState } from "react";
import "./ToDoList.css";
import { useSelector, useDispatch } from "react-redux";
import { editToDO, removeToDO } from "../redux/actions";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import { Button, TextField, Paper } from "@material-ui/core";
import { BsFillTrashFill, BsPencilFill, BsCheck2Circle } from "react-icons/bs";

const ToDoList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoList);

  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState("");
  const [editText, setEditText] = useState("");

  const handleEdit = (event) => {
    setIsEdit(!isEdit);
    let id = +event.currentTarget.id;
    if (editText) {
      let updatedList = list.map((todo, index) => {
        if (todo.id === id) {
          list[index] = {
            id: id,
            value: editText,
            date: todo.date,
          };
        }
        return todo;
      });
      dispatch(editToDO(...updatedList));
    }
    setRowData(id);
    setEditText("");
  };

  const handleDelete = (event) => {
    let id = +event.currentTarget.id;
    dispatch(removeToDO(id));
  };

  const displayList = (data) => {
    return data?.map((item, index) => {
      return (
        <ListGroup.Item key={index}>
          <div className="row">
            <div className="col-md-7">
              {rowData == item.id && isEdit ? (
                <TextField
                  fullWidth
                  defaultValue={item.value}
                  onChange={(e) => setEditText(e.target.value)}
                  id={item.id}
                />
              ) : (
                <span className="col-md-10">{item.value}</span>
              )}
            </div>
            <div className="col-md-3">
              <span>{moment(item.date).format("MM/DD/YYYY h:mm A")}</span>
            </div>
            <div className="col-md-2">
              <Button className="float-right" id={item.id} onClick={handleEdit}>
                {rowData == item.id && isEdit ? (
                  <BsCheck2Circle />
                ) : (
                  <BsPencilFill />
                )}
              </Button>

              <Button
                className="float-right"
                onClick={handleDelete}
                id={item.id}
              >
                <BsFillTrashFill />
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
  };

  let todaysActivity = list.filter(
    (obj) =>
      moment(obj.date).format("DD/MM/YYYY") ===
      moment(new Date()).format("DD/MM/YYYY")
  );

  let otherActivity = list.filter(
    (obj) =>
      moment(obj.date).format("DD/MM/YYYY") !==
      moment(new Date()).format("DD/MM/YYYY")
  );

  return (
    <div className="container">
      <ListGroup>
        <div className="row justify-content-md-center">
          <Paper>
            {todaysActivity?.length ? (
              <>
                <strong>Todays Activity</strong>
                {displayList(todaysActivity)}
              </>
            ) : null}

            {otherActivity?.length ? (
              <>
                <strong>Tasks</strong>
                {displayList(otherActivity)}
              </>
            ) : null}
          </Paper>
        </div>
      </ListGroup>
    </div>
  );
};

export default React.memo(ToDoList);
