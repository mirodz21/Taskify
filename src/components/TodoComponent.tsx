import React, { useEffect, useRef, useState } from "react";
import "./TodoComponent.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDoneAll } from "react-icons/md";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}
function TodoComponent({ todo, todos, setTodos, index }: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const onEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(!edit);
  };
  const onDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todo"
          onSubmit={(e) => onEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              className="edit_text"
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todo_text">{todo.todo}</s>
          ) : (
            <span className="todo_text">{todo.todo}</span>
          )}
          <div className="icon_container">
            <span
              className="icon"
              onClick={(e) => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }

                onEdit(e, todo.id);
                setEdit(!edit);
              }}
            >
              <FaEdit />
            </span>
            <span className="icon" onClick={() => onDelete(todo.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => onComplete(todo.id)}>
              <MdDoneAll />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default TodoComponent;
