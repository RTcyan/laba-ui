export type WithId<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? `${string & Key}Id` : Key]?: T[Key]
}