/* Template Literal Types */
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;


/* ----------------------- */
/* Intrinsic String Manipulation Types 内置字符串操作类型 */
// Uppercase<StringType>
type ASCIICacheKeyUpper<Str extends string> = `ID-${Uppercase<Str>}`
type MainIDUpper = ASCIICacheKeyUpper<"my_app">

// Lowercase<StringType>
type ASCIICacheKeyLower<Str extends string> = `id-${Lowercase<Str>}`
type MainIDLower = ASCIICacheKeyLower<"my_app">

// Capitalize<StringType>
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;

// Uncapitalize<StringType>
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;