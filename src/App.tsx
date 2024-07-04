import "./App.css";
import { useState } from "react";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      comp = completed;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = comp[source.index];
      comp.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      comp.splice(destination.index, 0, add);
    }
    setCompleted(comp);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
