import React from "react";
import "./TodoListComponent.css";
import { Todo } from "../model";
import TodoComponent from "./TodoComponent";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completed: Todo[];
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoListComponent({
  todos,
  setTodos,
  completed,
  setCompleted,
}: Props) {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos active ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Tasks</span>
            {todos.map((todo, index) => (
              <TodoComponent
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos complete"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Completed</span>
            {completed.map((todo, index) => (
              <TodoComponent
                index={index}
                key={todo.id}
                todo={todo}
                todos={completed}
                setTodos={setCompleted}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TodoListComponent;
