import { useState } from 'react'
import { SchemaBuilder } from '@/components/SchemaBuilder'
import { SchemaField } from '@/types'
import { motion } from 'framer-motion'

export default function App() {
  const [fields, setFields] = useState<SchemaField[]>([])

  // ✅ Build JSON from fields with empty checks
  function buildJSON(list: SchemaField[]): any {
    return list.reduce((acc, f) => {
      const key = f.name || "" // blank key if empty

      // If no type selected → just leave as empty string
      if (!f.type) {
        acc[key] = ""
        return acc
      }

      // If nested → recursively build children
      if (f.type === "nested") {
        acc[key] = buildJSON(f.children || [])
      } else {
        // ✅ Map type → sample values
        acc[key] =
          f.type === "string"
            ? "STRING"
            : f.type === "number" || f.type === "float"
            ? "NUMBER"
            : f.type === "boolean"
            ? "BOOLEAN"
            : f.type === "array"
            ? []
            : f.type === "objectId"
            ? "OBJECT_ID"
            : ""
      }

      return acc
    }, {} as any)
  }

  const handleSubmit = () => {
    const schema = buildJSON(fields)
    console.log('Submitting schema:', schema)
    // TODO: Send to backend
  }

  return (
    <section className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex gap-8">
        {/* Builder Panel */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 bg-white rounded-lg shadow p-4"
        >
          <h1 className="text-2xl font-bold mb-4">
            JSON Schema Builder
          </h1>
          <SchemaBuilder fields={fields} onChange={setFields} />
        </motion.div>

        {/* Live JSON Preview */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 bg-white rounded-lg shadow-inner p-4"
        >
          <h2 className="text-lg font-semibold mb-2">
            Live JSON Preview
          </h2>
          <pre className="bg-gray-50 p-4 rounded border">
            {JSON.stringify(buildJSON(fields), null, 2)}
          </pre>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-start">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Submit
        </motion.button>
      </div>
    </section>
  )
}
