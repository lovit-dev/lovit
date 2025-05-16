# Lovit Library Demo

Welcome to the `demo` environment for the **Lovit** library. This folder serves as a **contributor-only sandbox** for testing, debugging, and validating Lovit’s public API with mock data and devtools.

If you want to test other functions, such as utility functions (e.g., `message`, `signal`, etc.) or validation functions that are not part of the public API, simply write your tests in the `test` folder.

> **This is not a production app.** It's a development playground for contributors.

---

## Creating a Branch

To start testing the public APIs, create a new branch like this:

```bash
git checkout -b demo
```

This creates a `demo` branch where you can test things out. Since the `demo` folder is for testing and experimentation (not for real pull requests), you can delete the branch once you're done:

```bash
git checkout main
git branch -D demo
```

However, if your goal is to improve the demo or fix an issue, you can create a different branch for that topic and make a pull request.

## Start Package

To work on the public API and see changes reflected in the demo, run the following command:

```bash
npm run package:dev
```

This command will start [tsup](https://tsup.egoist.dev) and watch for any changes to the package. After making changes, ensure you save the files, and the imported public API functions in `demo/src/js/demo.js` will automatically update. If not, try pressing **Ctrl + S** to save the `demo.js` file and trigger the update. Sometimes, the changes may not reflect immediately.

## Mock API Server

The demo uses a mock API powered by [json-server](https://www.npmjs.com/package/json-server). To start it:

```bash
npm run demo:mock-api
```

This will launch a fake REST API at `http://localhost:3001`.

## Running the Demo Locally

To run the demo locally:

```bash
npm run demo
```

This starts the demo using [Parcel](https://parceljs.org). Open your browser to the URL shown in your terminal (usually http://localhost:1234).
