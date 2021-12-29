# TypeScript高级类型

## 内置工具类型

[Utility Types（官方文档）](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### 1 可选类型`Partial<Type>`

将`Type`的所有属性设置为可选

```ts
// 示例
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

// 实现
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

### 2 必选类型`Required<Type>`

将`Type`的所有属性设置为必选

```ts
// 示例
interface Props {
  a?: number;
  b?: string;
}
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 };

// 实现
type Required<T> = { [P in keyof T]-?: T[P]; }
```

### 3 只读类型`Readonly<Type>`

将`Type`类型的所有属性设置为只读状态

```ts
// 示例
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello";

// 实现
type Readonly<T> = { readonly [P in keyof T]: T[P]; }
```

### 4 属性映射`Record<Keys, Type>`

转换后的类型中，每一个属性的类型都必须是`Type`类型

```ts
// 示例
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
cats.boris; // (property) boris: CatInfo

// 实现
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
```

### 5 提取属性`Pick<Type, Keys>`

从`Type`中选择一组属性`Keys`构造出的类型

```ts
// 示例
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// 实现
type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
```

### 6 排除属性`Omit<Type, Keys>`

从`Type`中排除一组属性`Keys`构造出的类型

```ts
// 示例
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

// 实现
type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
```

### 7 排除类型`Exclude<Type, ExcludedUnion>`

从`Type`中剔除所有可以赋值给`ExcludedUnion`的类型

```ts
// 示例
type T0 = Exclude<"a" | "b" | "c", "a">;
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
type T2 = Exclude<string | number | (() => void), Function>;

// 实现
type Exclude<T, U> = T extends U ? never : T
```

### 8 提取类型`Extract<Type, Union>`

从`Type`中提取所有可以赋值给`Union`的类型

```ts
// 示例
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
type T1 = Extract<string | number | (() => void), Function>;

// 实现
type Extract<T, U> = T extends U ? T : never
```

### 9 不可为空类型`NonNullable<Type>`

从`Type`中剔除`null、undefined、never`类型，不会剔除`void、unknown`类型

```ts
// 示例
type T0 = NonNullable<string | number | undefined | never | unknown>;
type T1 = NonNullable<string[] | null | undefined | void>;

// 实现
type NonNullable<T> = T extends null ? never : T
```

### 10 函数参数类型`Parameters<Type>`

使用函数类型的`Type`的参数构造出的类型

```ts
// 示例
declare function f1(arg: { a: number; b: string }): void;
type T0 = Parameters<() => string>;
type T1 = Parameters<(s: string) => void>;
type T2 = Parameters<<T>(arg: T) => T>;
type T3 = Parameters<typeof f1>;
type T4 = Parameters<any>;
type T5 = Parameters<never>;
type T6 = Parameters<string>; // error
type T7 = Parameters<Function>; // error

// 实现
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

### 11 构造函数参数类型`ConstructorParameters<Type>`

使用构造函数类型的`Type`的参数构造出的元组类型

```ts
// 示例
type T0 = ConstructorParameters<ErrorConstructor>;
type T1 = ConstructorParameters<FunctionConstructor>;
type T2 = ConstructorParameters<RegExpConstructor>;
type T3 = ConstructorParameters<any>;
type T4 = ConstructorParameters<Function>; // error

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
const params1: ConstructorType = ['Jack', 20 ] // error
const params2: ConstructorType = ['Jack', 20, 'man']

// 实现
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never
```

### 12 函数返回值类型`ReturnType<Type>`

使用函数类型的`Type`的返回值构造出的类型

```ts
// 示例
declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>;
type T1 = ReturnType<(s: string) => void>;
type T2 = ReturnType<<T>() => T>;
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
type T4 = ReturnType<typeof f1>;
type T5 = ReturnType<any>;
type T6 = ReturnType<never>;
type T7 = ReturnType<string>;
type T8 = ReturnType<Function>; // error

// 实现
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

### 13 实例类型`InstanceType<Type>`

使用`Type`中的构造函数的实例类型组成的类型

```ts
// 示例
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof C>;
type T1 = InstanceType<any>;
type T2 = InstanceType<never>;
type T3 = InstanceType<string>; // error
type T4 = InstanceType<Function>; // error

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

// 实现
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any
```


## 类型操作

[Creating Types from Types（官方文档）](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

### 泛型

以`identity`函数为例，添加了类型变量`Type`帮助我们捕获用户传入的类型，并规定返回值类型同样为`Type`，以确保参数类型与返回值类型一致。

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>("myString");
```

### 1 交叉类型`&`

将多个类型合并为一个类型

```ts
interface Button {
  text: string
}
interface Link {
  href: string
}
const linkBtn: Button & Link = {
  text: 'submit',
  href: 'http://www.baidu.com'
}
```

### 2 联合类型`|`

表示该类型为连接的多个类型中的任意一个

```ts
interface Button {
  type: 'default' | 'primary' | 'danger'
  text: string
}
const btn: Button = {
  type: 'primary',
  text: 'submit'
}
```

### 3 类型约束`extends`

`T extends K`：`extends`不是类、接口的继承，而是对于类型的判断和约束，意思是判断`T`能否赋值给`K`

```ts
type BaseType = string | number | boolean
function copy<T extends BaseType>(arg: T): T {
  return arg
}
copy(123)
copy({}) // error
```

### 4 索引类型操作符`keyof`

`keyof`返回类型上已知的**公共**属性名

```ts
class Animal {
  type: string;
  weight: number;
  private speed: number;
}

type AnimalProps = keyof Animal; // "type" | "weight"
const a:AnimalProps = 'type'
const b:AnimalProps = 'weight'
const c:AnimalProps = 'speed' // error
```

### 5 类型判断`typeof`

JavaScript已经有了一个`typeof`操作符，用于获取原始类型`（number、string、boolean、symbol）`
TypeScript添加了一个`typeof`操作符，可以引用变量或属性的类型:

```ts
function f() {
  return { x: 10, y: 3 };
}
type P1 = ReturnType<f>; // error
type P2 = ReturnType<typeof f>;
```

### 6 索引访问类型`T[K]`

类似于JavaScript中使用对象索引的方式，只不过JavaScript中是返回对象属性的值，而在TypeScript中返回的是`T`对应属性`K`的类型

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
type I4 = Person["alve"]; // error
```

### 7 条件类型`U ? X : Y`

语法规则和三元表达式一致，用于一些类型不确定的情况

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;
```

### 8 推断类型`infer P`

用`infer P`来标记一个泛型，表示这个泛型是一个待推断的类型，并且可以直接使用

```ts
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
type Num = GetReturnType<() => number>;
type Str = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
```

### 9 类型映射`in`

`in`用于遍历已有接口的属性或者是遍历联合类型，一般与`keyof`结合使用

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };


type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;
```

### 10 类型断言`as`

在TypeScript 4.1及以后版本中，可以用`as`重新映射类型中的键

```ts
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;
```

### 11 模板字符串类型

模板字符串类型的强大在于，可以使用类型内部的信息来定义新的字符串类型

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
```

## 综合案例

效果：声明一个用于创建观察对象的函数。生成的观察对象将包含各属性对应的`on`事件函数，便于观察属性值变化。各个属性的`on`事件函数会对事件名以及`callback`函数中的参数类型做准确的类型约束。

```ts
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>
      (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```

```ts
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", () => { });

// 人为的书写错误将准确报错
person.on("firstName", () => { });
person.on("frstNameChanged", () => { });

// callback中的参数类型将被准确规定
person.on("firstNameChanged", newName => {
  console.log(`new name is ${newName.toUpperCase()}`);
});
person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});
```