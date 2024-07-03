import "./App.css";
import { useState } from "react";
import { Todo } from "./model";
import { DragDropContext } from "react-beautiful-dnd";
import InputComponent from "./components/InputComponent";
import TodoListComponent from "./components/TodoListComponent";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
    console.log(todos);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="app">
        <span className="heading">Taskify</span>
        <InputComponent todo={todo} setTodo={setTodo} addTask={addTask} />
        <TodoListComponent
          todos={todos}
          setTodos={setTodos}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
