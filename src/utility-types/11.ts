// 11 ConstructorParameters<Type>
// Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).
type T0 = ConstructorParameters<ErrorConstructor>;
type T1 = ConstructorParameters<FunctionConstructor>;
type T2 = ConstructorParameters<RegExpConstructor>;
type T3 = ConstructorParameters<any>;
type T4 = ConstructorParameters<Function>;

class Person {
  name: string
  age: number
  weight: number
  gender: 'man' | 'women'

  constructor(name: string, age: number, gender: 'man' | 'women') {
      this.name = name
      this.age = age;
      this.gender = gender
  }
}
type ConstructorType = ConstructorParameters<typeof Person>
const params1: ConstructorType = ['Jack', 20 ]
const params2: ConstructorType = ['Jack', 20, 'man']