import React, { useRef } from "react";
import "./InputComponent.css";
import { Button, Stack, TextField } from "@mui/material";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTask: (e: React.FormEvent) => void;
}

function InputComponent({ todo, setTodo, addTask }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Stack
      component="form"
      className="input"
      width="80%"
      direction="row"
      onSubmit={(e) => {
        addTask(e);
        inputRef.current?.blur();
      }}
    >
      <TextField
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        label="Add Task"
        color="primary"
        className="text_input"
      />
      <Button
        sx={{ ml: 2 }}
        className="submit"
        color="primary"
        variant="contained"
        size="large"
        type="submit"
      >
        ADD
      </Button>
    </Stack>
  );
}

export default InputComponent;
