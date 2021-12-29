/* indexed access type */
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
type I4 = Person["alve"];


/* ----------------------- */
// const MyArray = [
//   { name: "Alice", age: 15 },
//   { name: "Bob", age: 23 },
//   { name: "Eve", age: 38 },
// ];
 
// type Person = typeof MyArray[number];
// type Age = typeof MyArray[number]["age"];
// // Or
// type Age2 = Person["age"];

// const key = "age"; // 不能使用变量
// // type key = "age";
// type Age3 = Person[key];