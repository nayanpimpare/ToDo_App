import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "./component/AddTask";
import ToDoList from "./component/ToDoList";
import { Paper } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="_App">
      <Paper style={{ margin: 16, padding: 16 }}>
        <AddTask />
        <ToDoList />
      </Paper>
    </div>
  );
}

export default App;
