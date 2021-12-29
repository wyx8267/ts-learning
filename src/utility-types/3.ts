// 3 Readonly<Type>
// Constructs a type with all properties of Type set to readonly
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello";