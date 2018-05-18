/**
 * Declares a new type that is the difference of a type (@FromObject) and a
 * sub-type (@Values).
 *
 * References:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types
 * - https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-307871458
 * - https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
 */
declare type Omit<FromObject, Values> = Pick<FromObject, Exclude<keyof FromObject, keyof Values>>;