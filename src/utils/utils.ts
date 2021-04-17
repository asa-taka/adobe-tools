export const filter = <T>(items: T[], test: (item: T) => boolean) => {
  const result: T[] = []
  for (let e of items) {
    if (test(e)) result.push(e)
  }
  return result
}

export const find = <T>(
  items: T[],
  test: (item: T) => boolean
): T | undefined => {
  for (let e of items) {
    if (test(e)) return e
  }
}

export const map = <T, V>(items: T[], mapper: (item: T) => V) => {
  const result: V[] = []
  for (let e of items) {
    result.push(mapper(e))
  }
  return result
}

export const mapNonNullable = <T, V>(
  items: T[],
  mapper: (item: T) => V | undefined
): V[] => {
  const result: V[] = []
  for (let e of items) {
    const v = mapper(e)
    if (v != null) result.push(v)
  }
  return result
}

export const some = <T>(items: T[], test: (item: T) => boolean): boolean => {
  for (let e of items) {
    if (test(e)) return true
  }
  return false
}

export const forEach = <T>(items: T[], callback: (item: T) => void) => {
  for (let e of items) {
    callback(e)
  }
}

export const indexOf = <T>(items: T[], test: (item: T) => boolean) => {
  for (let i = 0; i < items.length; i++) {
    if (test(items[i])) return i
  }
  return -1
}

export const splitBy = <T>(
  items: T[],
  test: (item: T) => boolean
): [T[], T[]] => {
  const i = indexOf(items, test)
  if (i === -1) return [items, []]
  return [items.slice(0, i), items.slice(i + 1, items.length)]
}

export const concat = <T>(...arrays: T[][]): T[] => {
  const result: T[] = []
  return result.concat(...arrays)
}

export const splitFileExtension = (name: string) => {
  const tokens = name.split('.')
  const bearedName = tokens.slice(0, tokens.length - 1).join('.')
  const ext = tokens[tokens.length - 1]
  return [bearedName, ext] as const
}

const AI_FILE_PTN = /.\.ai/

export const hasAiFileExtention = (name: string) => {
  return AI_FILE_PTN.test(name)
}

export const filterFiles = (files: (File | Folder)[]) => {
  return filter(files, f => f instanceof File) as File[]
}

export const getAiFiles = (path: string) => {
  const files = filter(new Folder(path).getFiles(), f =>
    hasAiFileExtention(f.name)
  )
  return filterFiles(files)
}

export const isOpenedDocument = (docFullName: string) => {
  return some(app.documents, doc => doc.fullName.fullName === docFullName)
}

export const selectFolder = (prompt: string) => {
  const doc = app?.activeDocument
  return doc ? doc.fullName.parent : Folder.selectDialog(prompt)
}

export const resolvePathByActiveDocument = (path: string) => {
  const doc = app?.activeDocument
  return [doc.fullName.parent, path].join('/')
}
