## Getting Started

### Prerequisites

Make sure you have [Yarn](https://yarnpkg.com/) installed. If you don't have Yarn installed, you can install it by running:

```bash
npm install --global yarn
```

### Installation

Install the project dependencies using Yarn:

```bash
yarn install
```

### Running the Development Server

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Building for Production

To build the project for production, run:

```bash
yarn build
```

### Setting Up Environment Variables

Create a `.env` file in the root of your project by copying the [`.env.example`](./.env.example) file and adding the necessary environment variables. For example:

```bash
cp .env.example .env
```

Then, edit the `.env` file to include your specific environment variables. For example:

```bash
VITE_API_BASE_URL=https://api.example.com
```