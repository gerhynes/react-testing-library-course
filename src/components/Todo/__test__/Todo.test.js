import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "../Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, {
      target: { value: task }
    });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  it("should add todo to TodoList", async () => {
    render(<MockTodo />);
    addTask(["Put out the bins"]);
    const divElement = screen.getByText(/Put out the bins/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should add multiple todos to TodoList", async () => {
    render(<MockTodo />);
    addTask(["Put out the bins", "Walk the dog", "Pay the electricity bill"]);
    const divElements = screen.getAllByTestId(/task-container/i);
    expect(divElements.length).toBe(3);
  });

  it("tasks should not have completed class when initially rendered", async () => {
    render(<MockTodo />);
    addTask(["Put out the bins"]);
    const divElement = screen.getByText(/Put out the bins/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  it("tasks should have completed class when clicked", async () => {
    render(<MockTodo />);
    addTask(["Put out the bins"]);
    const divElement = screen.getByText(/Put out the bins/i);
    fireEvent.click(divElement)
    expect(divElement).toHaveClass("todo-item-active");
  });
});
