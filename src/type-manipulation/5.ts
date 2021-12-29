/* typeof */
let s = "hello";
let n: typeof s;


/* ----------------------- */
function f() {
  return { x: 10, y: 3 };
}
type P1 = ReturnType<f>; // error
type P2 = ReturnType<typeof f>;