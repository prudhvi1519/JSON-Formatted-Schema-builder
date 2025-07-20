import { FC } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { SchemaField, FieldType } from '@/types'
import { motion } from 'framer-motion'

interface FieldRowProps {
  field: SchemaField
  onChange: (updates: Partial<SchemaField>) => void
  onDelete: () => void
}

const TYPES: FieldType[] = [
  'nested',
  'number',
  'string',
  'objectId',
  'float',
  'boolean',
  'array',
]

export const FieldRow: FC<FieldRowProps> = ({ field, onChange, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-center space-x-6 mb-2 bg-white p-2 rounded-lg shadow-sm"
  >
    {/* ✅ Field Name */}
    <Input
      placeholder="Field Name"
      value={field.name}
      onChange={e => onChange({ name: e.target.value })}
      className="w-56 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition border border-gray-300 rounded"
    />

    {/* ✅ Type Dropdown */}
    <Select
      value={field.type || undefined}
      onValueChange={val => onChange({ type: val as FieldType })}
    >
      <SelectTrigger
        className={`w-48 border border-gray-300 hover:border-blue-400 focus:border-blue-400 bg-white transition rounded ${
          !field.type ? "text-gray-400" : "text-gray-800"
        }`}
      >
        <SelectValue placeholder="Field Type" />
      </SelectTrigger>

      <SelectContent className="bg-white shadow-lg border rounded-lg">
        {TYPES.map(t => (
          <SelectItem
            key={t}
            value={t}
            className="hover:bg-blue-100 transition"
          >
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* ✅ Required Toggle */}
    <div className="flex items-center">
      <Switch
        checked={field.required}
        onCheckedChange={chk => onChange({ required: chk })}
        className={`
          data-[state=unchecked]:bg-gray-300 
          data-[state=checked]:bg-blue-500 
          relative 
          transition
          [&>span]:bg-gray-100 
          [&>span]:shadow-sm
          [&>span]:transition
          [&[data-state=checked]>span]:bg-white
        `}
      />
    </div>

    {/* ✅ Delete Button */}
    <Button
      variant="destructive"
      size="sm"
      onClick={onDelete}
      className="hover:bg-red-700 transition text-sm text-red-600"
    >
      ✖
    </Button>
  </motion.div>
)
