// 13 InstanceType<Type>
// Constructs a type consisting of the instance type of a constructor function in Type.
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof C>;
type T1 = InstanceType<any>;
type T2 = InstanceType<never>;
type T3 = InstanceType<string>;
type T4 = InstanceType<Function>;

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
type PersonInstance = InstanceType<typeof Person>

const params: PersonInstance = {
  name: 'Jack',
  age: 20,
  weight: 120,
  gender: 'man'
}