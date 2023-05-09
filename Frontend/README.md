# VitTrack Frontend README

This is the README file for the Frontend of **VitTrack** project (Engineering Project at THWS). This file provides instructions on how to set up and run the web application.

## Backend Setup

To run the backend, refer to the `README.md` file in the Backend directory for detailed instructions on setting up the server.

## WebApp Setup

To start the web application, perform the following steps:

1. Navigate to the `dashboard_planning` directory.
2. Run the command `ng serve` to start the application.

### Troubleshooting

If you encounter the following error: "Watchpack Error (watcher): Error: ENOSPC: System limit for the number of file watchers reached," try running the following command instead:
`ng serve --watch --live-reload --poll 2000`

## Prerequisites

Before running the server and web application, ensure that you have the following prerequisites installed:

- **Node.js** and **npm**: If you do not have them installed, follow the steps below:

    - Install **nvm** (Node Version Manager) by referring to the official documentation.
    - Run the command `nvm install node` to install Node.js.
    - Run the command `npm install -g npx` to install the NPX package runner.
    - Run the command `npm install -g @angular/cli` to install the Angular CLI globally.

- **TypeScript**: If TypeScript is not installed, run the command `npm install -g typescript`.

## Troubleshooting

If you encounter any issues during the setup or running of the server and web application, try the following steps:

1. Delete the `node_modules` folder and `package-lock.json` file.
2. Run the command `npm install` to reinstall the dependencies.

If the problem persists, you may need to switch to a different version of npm using nvm. Follow these steps:

1. Run `nvm ls` to view all installed versions of npm.
2. Select the desired version using `nvm use version-number`.
3. If the version you want is not installed, run `nvm install version-number` to install it. (e.g., `nvm install 18.10.0`)
4. After switching the npm version, retry the setup steps mentioned above (1 and 2).
