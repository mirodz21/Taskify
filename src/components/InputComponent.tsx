import React, { useRef } from "react";
import "./InputComponent.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTask: (e: React.FormEvent) => void;
}

function InputComponent({ todo, setTodo, addTask }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        addTask(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add Task"
        className="input_box"
      />
      <button className="submit" type="submit">
        +
      </button>
    </form>
  );
}

export default InputComponent;
