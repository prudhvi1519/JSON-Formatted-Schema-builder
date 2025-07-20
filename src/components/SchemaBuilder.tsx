import { FC } from 'react'
import { SchemaField } from '@/types'
import { FieldRow } from './FieldRow'
import { nanoid } from 'nanoid'
import { motion } from 'framer-motion'

interface BuilderProps {
  fields: SchemaField[]
  onChange: React.Dispatch<React.SetStateAction<SchemaField[]>>
}

// Update a single field recursively
function updateField(
  list: SchemaField[],
  id: string,
  updater: (f: SchemaField) => SchemaField
): SchemaField[] {
  return list.map(f => {
    if (f.id === id) return updater(f)
    if (f.type === 'nested' && f.children) {
      return { ...f, children: updateField(f.children, id, updater) }
    }
    return f
  })
}

// Remove a field by id recursively
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
  // Add a new root field
  const addRoot = () => {
    onChange(prev => [
      ...prev,
      { id: nanoid(), name: '', type: '', required: false }
    ])
  }

  // Render fields recursively
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
          onChange={upd => {
            onChange(prev =>
              updateField(prev, f.id, old => ({ ...old, ...upd }))
            )
          }}
          onDelete={() => {
            onChange(prev => removeField(prev, f.id))
          }}
        />

        {/* Nested children */}
        {f.children && f.children.length > 0 && renderList(f.children)}

        {/* + Child */}
        {f.type === 'nested' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              onChange(prev =>
                updateField(prev, f.id, old => ({
                  ...old,
                  children: [
                    ...(old.children || []),
                    { id: nanoid(), name: '', type: '', required: false }
                  ]
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

      {/* + Add Field */}
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
