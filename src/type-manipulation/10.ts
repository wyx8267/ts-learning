/* as */

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;


/* ----------------------- */
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;


/* ----------------------- */
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>