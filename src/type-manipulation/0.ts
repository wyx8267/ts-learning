function fn<Type>(arg: Type): Type {
  return arg;
}
let output = fn<string>("myString");

/* ----------------------- */
// function loggingIdentity<Type>(arg: Type): Type {
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

/* ----------------------- */
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
function identity<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;
myIdentity(1)
