/* Mapped Types */

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };


/* ----------------------- */
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;


/* ----------------------- */
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;


/* ----------------------- */
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
type User = Concrete<MaybeUser>;


/* ----------------------- */
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;


/* ----------------------- */
type Bard = {
  fly: () => {
    /*  Do something */
  };
};
type Fish = {
  swim: () => {
    /*  Do something */
  };
};
const example = (fishOrBard: Fish | Bard) => {
  // fishOrBardは'fly'というプロパティを持っているかどうかの判定
  if ("fly" in fishOrBard) {
    console.log(fishOrBard.fly); // Bard型として推論される
  } else {
    console.log(fishOrBard.swim); // Fish型として推論される
  }
};