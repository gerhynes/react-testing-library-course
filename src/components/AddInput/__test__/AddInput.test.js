import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

const mockedSetTodos = jest.fn;

describe("AddInput", () => {
  it("should render input element", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../);
    expect(inputElement).toBeInTheDocument();
  });

  it("should update value when typed into", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../);
    fireEvent.change(inputElement, { target: { value: "Buy groceries" } });
    expect(inputElement.value).toBe("Buy groceries");
  });

  it("should have empty input when add button is clicked", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: "Buy groceries" } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});
