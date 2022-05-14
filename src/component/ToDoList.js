import React, { useEffect, useState } from "react";
import "./ToDoList.css";
import { useSelector, useDispatch } from "react-redux";
import { editToDO, removeToDO } from "../redux/actions";
import { ListGroup } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
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
          list[index] = { id: id, value: editText };
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

  return (
    <div className="container">
      <ListGroup>
        <div className="row justify-content-md-center">
          {list?.map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <div className="row">
                  <div className="col-md-10">
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
                  <div className="col-md-2">
                    <Button
                      className="float-right"
                      id={item.id}
                      onClick={handleEdit}
                    >
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
          })}
        </div>
      </ListGroup>
    </div>
  );
};

export default React.memo(ToDoList);
