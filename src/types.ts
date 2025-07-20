export type FieldType = 'string' | 'number' | 'nested' | 'objectId' | 'float' | 'boolean' | 'array'

export interface SchemaField {
  id: string
  name: string
  type: FieldType | ""
  required: boolean
  children?: SchemaField[]
}
