import { FC } from 'react'
import { SchemaField } from '@/types'
import { FieldRow } from './FieldRow'
import { nanoid } from 'nanoid'
import { motion } from 'framer-motion'

interface BuilderProps {
  fields: SchemaField[]
  onChange: (fields: SchemaField[]) => void
}

// ✅ Helper: Update a specific field recursively
function updateField(
  list: SchemaField[],
  id: string,
  fn: (f: SchemaField) => SchemaField
): SchemaField[] {
  return list.map(f => {
    if (f.id === id) return fn(f)
    if (f.type === 'nested' && f.children) {
      return { ...f, children: updateField(f.children, id, fn) }
    }
    return f
  })
}

// ✅ Helper: Remove field by ID recursively
function removeField(list: SchemaField[], id: string): SchemaField[] {
  return list
    .filter(f => f.id !== id)
    .map(f =>
      f.children
        ? { ...f, children: removeField(f.children, id) }
        : f
    )
}

export const SchemaBuilder: FC<BuilderProps> = ({ fields, onChange }) => {
  const addRoot = () => {
    onChange([
      ...fields,
      { id: nanoid(), name: '', type: '' as any, required: false },
    ])
  }

  const renderList = (list: SchemaField[]) =>
    list.map(f => (
      <motion.div
        key={f.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="ml-4 border-l pl-4 mb-4"
      >
        <FieldRow
          field={f}
          onChange={upd =>
            onChange(
              updateField(fields, f.id, old => ({ ...old, ...upd }))
            )
          }
          onDelete={() => onChange(removeField(fields, f.id))}
        />

        {/* Recursively render children */}
        {f.children && f.children.length > 0 && renderList(f.children)}

        {/* + Child button if nested */}
        {f.type === 'nested' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              onChange(
                updateField(fields, f.id, old => ({
                  ...old,
                  children: [
                    ...(old.children || []),
                    {
                      id: nanoid(),
                      name: '',
                      type: '' as any,
                      required: false,
                    },
                  ],
                }))
              )
            }
            className="mt-1 ml-8 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
          >
            + Child
          </motion.button>
        )}
      </motion.div>
    ))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderList(fields)}

      {/* + Add Field Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addRoot}
        className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        + Add Field
      </motion.button>
    </motion.div>
  )
}
