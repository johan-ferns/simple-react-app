# Simple React App

A simple React application built with Vite 4.5.0, compatible with Node.js v16.14.

## Features

- Multi-line text input (textarea) for user input
- Submit button to capture text
- Display submitted text below the form
- Built with React 18 and TypeScript
- Styled with CSS (supports dark/light mode)

## Requirements

- Node.js v16.14 or higher (tested with Node 16)
- npm or yarn

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Usage

1. Type or paste text in the textarea
2. Click the "Submit" button
3. Your text will be displayed below the form

## Project Structure

```
simple-react-app/
├── src/
│   ├── App.tsx          # Main component with form
│   ├── App.css          # Styles
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Vite types
├── index.html           # HTML entry
├── package.json         # Dependencies (Vite 4.5.0)
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
└── .gitignore           # Ignore node_modules, dist, etc.
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 4.5.0** - Build tool (compatible with Node 16)
- **CSS** - Styling

## WIP:

Deploying to Azure