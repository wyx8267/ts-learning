// 9 NonNullable<Type>
// Constructs a type by excluding null and undefined from Type.
type T0 = NonNullable<string | number | undefined | never | unknown>;
type T1 = NonNullable<string[] | null | undefined | void>;