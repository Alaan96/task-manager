interface Task {
  _id: string,
  title: string,
  description: string,
  tag: Tag,
  time: string,
  date: string,

  author: string,
  creationDate: string,
  active: boolean,
  // sharedWith: string[]
}

interface Tag {
  text: string,
  color: string
}

interface Api {
  readonly url: string
}

interface User {
  readonly _id: string,
  readonly token: string,
  name: string,
  email: string,
  google: boolean,
  birthday: string | undefined,
  enabled: boolean,
  tags: Array<Tag>,
  settings: object
}

interface Option {
  text: string,
  value: string
}

export {
  Task,
  Tag,
  Api,
  User,
  Option,
}