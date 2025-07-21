# 🏗️ JSON Schema Builder

A **React-based dynamic JSON Schema Builder** with **live JSON preview**.  

This app lets you **create, edit, delete, and nest fields recursively**, generating a real-time JSON representation of the schema. It’s built using **React + TypeScript**, **ShadCN UI components**, and **Framer Motion** for smooth animations.

---


## Table of Contents

- [Project Overview](#-project-overview)
- [Demo](#-demo)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment-vercel--netlify)
  - [Deploy on Vercel](#-deploy-on-vercel)
  - [Deploy on Netlify](#deploy-on-netlify)
- [Usage](#%EF%B8%8F-usage)
- [Example](#-example)
- [Supported Field Types](#-supported-field-types)
- [Features Implemented](#--features-implemented)
- [Submission Guidelines](#-submission-guidelines)
- [Author](#-author)
- [License](#-license)

---

## 📖 Project Overview
This project is a **dynamic JSON Schema Builder** built with **React (Vite + TypeScript)** and styled using **TailwindCSS** with **ShadCN UI components**. It allows users to **create, edit**, and **manage JSON schemas interactively** by dynamically adding fields, selecting their types, toggling required states, and supporting **recursive nested fields** for complex structures. Each field can have a name, a type (string, number, boolean, array, nested, objectId, float), and an optional required flag. For the **Nested type**, users can add unlimited child fields recursively.

The **right-hand panel** shows a **real-time JSON preview**, reflecting all changes instantly. Empty fields (where no name or type is selected) remain blank (`""`) in the JSON output. The schema is fully editable until manually deleted or the page is refreshed. State updates are handled **immutably** using React functional updates, ensuring existing records remain intact when adding or modifying new fields.

---

## 📸 Demo

👉 **Features**
- Add new fields dynamically  
- Edit field name and type  
- Mark fields as required  
- Add **nested fields** recursively  
- Delete any field (root or nested)  
- Live **JSON preview** updates instantly  
- Smooth animations with **Framer Motion**  

---

## 🛠️ Tech Stack

- **React 18 + Vite** (Fast build & HMR)
- **TypeScript** (Type safety)
- **ShadCN UI** (Beautiful UI components)
- **Framer Motion** (Animations)
- **NanoID** (Unique IDs for fields)

---

## 🚀 Project Structure
```bash
  src/  
  ├── components/  
  │ ├── SchemaBuilder.tsx # Main recursive builder logic  
  │ ├── FieldRow.tsx # UI for a single field  
  │ └── ui/… # ShadCN UI components (Input, Select, etc.)  
  │  
  ├── types.ts # FieldType & SchemaField interfaces  
  ├── App.tsx # Main page  
  └── main.tsx # Entry point
```

For a more detailed breakdown of the project structure, see the full directory tree in the expanded section below.

<details>
<summary>Full Directory Structure (Click to Expand)</summary>

```bash

json-schema-builder/          ← root project folder
│
├── src/                      ← main source code
│   ├── components/           ← all React components
│   │   ├── ui/               ← ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── input.tsx
│   │   │
│   │   ├── FieldRow.tsx      ← single editable field row
│   │   └── SchemaBuilder.tsx ← recursive schema builder
│   │
│   ├── types.ts              ← SchemaField & FieldType definitions
│   ├── App.tsx               ← main page (schema builder + preview)
│   ├── main.tsx              ← React entry point
│   └── index.css             ← Tailwind + ShadCN styles
│
├── index.html                ← Vite HTML template
├── package.json              ← dependencies & scripts
├── postcss.config.js         ← Tailwind/PostCSS config
├── tailwind.config.js        ← Tailwind configuration
├── tsconfig.json             ← TypeScript config
├── tsconfig.node.json        ← TypeScript for Vite config
├── vite.config.ts            ← Vite build config
└── README.md                 ← project docs & instructions

```
</details>

---

## 🔧 Installation & Setup

1️⃣ **Clone the repo**
```bash
git clone https://github.com/prudhvi1519/JSON-Formatted-Schema-builder.git
cd JSON-Formatted-Schema-builder
```

2️⃣ **Install dependencies**
```bash
npm install
# or
yarn install
```

3️⃣ **Start development server**
```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) (Vite default).

---

## 📦 Building for Production
To create a production build:
  ```bash
  npm run build
  npm run preview
  ```

---

## 🌐 Deployment (Vercel / Netlify)
You can deploy this easily:
  ### ✅ Deploy on Vercel
  1. Push your repo to GitHub (make sure it’s public or shared with reviewer).
  2. Go to https://vercel.com, import your repo.
  3. Vercel will auto-detect Vite & deploy.
  4. Share the live URL in your submission form.
  
  ### Deploy on Netlify
  1. `npm run build` → generates `dist/`
  2. Drag & drop `dist/` folder into [Netlify Drop](https://app.netlify.com/drop)
  3. Done ✅

---

## 🖱️ Usage

1. Click **➕ Add Field** → Adds a new row.
2. Enter a **Field Name** & select a **Field Type** (string, number, nested, etc.)
3. Toggle **Required if** needed.
4. For **Nested** types → Click **+ Child** to add sub-fields.
5. Delete unwanted rows using the **❌** delete button.
6. The **right panel** shows a **Live JSON Preview** of your schema.
7. Click **Submit** to log the JSON schema in console.

---

## 🔄 Example
For this input:

```bash
  - name: "user"
    type: "nested"
    children:
      - name: "username"
        type: "string"
        required: true
      - name: "age"
        type: "number"
      - name: "address"
        type: "nested"
        children:
          - name: "city"
            type: "string"
  ```
The generated JSON preview is:
```bash
  {
    "user": {
      "username": "STRING",
      "age": "NUMBER",
      "address": {
        "city": "STRING"
      }
    }
  }
```

---

## 🧩 Supported Field Types

| Type       | Output in JSON    |
| ---------- | ----------------- |
| `string`   | `"STRING"`        |
| `number`   | `"NUMBER"`        |
| `float`    | `"NUMBER"`        |
| `boolean`  | `"BOOLEAN"`       |
| `array`    | `[]`              |
| `objectId` | `"OBJECT_ID"`     |
| `nested`   | `{ ...children }` |

---

## ✅ Features Implemented
✔️ Add / edit / delete fields dynamically  
✔️ Add **recursive nested fields**  
✔️ Live JSON tab showing real-time schema  
✔️ Default values for each type  
✔️ Smooth transitions with Framer Motion  
✔️ Ready for **Vercel/Netlify** deployment  

---

## 📜 Submission Guidelines
1. Push your **public GitHub repo** (ensure it’s accessible).
2. Deploy on **Vercel/Netlify** & get live URL.
3. Share both **repo link** & **live link** in the form.

---

## 👨‍💻 Author
Akula Prudhvi  
📧 [prudhviakula92@gmail.com](mailto:prudhviakula92@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/prudhvi1519/)  

---

## 📄 License
[MIT](LICENSE) – Free to use & modify.


