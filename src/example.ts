type PropEventSource<Type> = {
  on<Key extends string & keyof Type>
      (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;


const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", () => { });

// 防止人为的书写错误
person.on("firstName", () => { });
person.on("frstNameChanged", () => { });

person.on("firstNameChanged", newName => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});