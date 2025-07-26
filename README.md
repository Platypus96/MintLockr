# MintLockr - NFT Minting dApp

This is a Next.js application that allows users to connect their Ethereum wallet (like MetaMask) and mint an NFT on the Sepolia testnet.

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

*   **Node.js:** This is the runtime environment for the project. You can download it from [nodejs.org](https://nodejs.org/). Installing Node.js will also install `npm`.
*   **Git:** This is the version control system used to manage code. You can download it from [git-scm.com](https://git-scm.com/).
*   **A Code Editor:** A good code editor like [Visual Studio Code](https://code.visualstudio.com/) is highly recommended.

## How to Set Up This Project on Your Computer

Follow these steps to get the project running locally.

### 1. Get the Code on Your Machine

The most reliable way to get this project's code is to copy it from the Firebase Studio editor to files on your local computer.

1.  **Create a Project Folder:** On your computer, create a new folder named `mintlockr-app`.
2.  **Recreate Files and Folders:** Manually create the same file and folder structure you see in the Firebase Studio editor inside your `mintlockr-app` folder.
3.  **Copy Contents:** Copy the code from each file in the editor and paste it into the corresponding file on your computer.

### 2. Install Dependencies

Once the code is on your machine, you need to install all the required packages listed in `package.json`.

1.  **Open a Terminal:**
    *   **On macOS:** Open the **Terminal** app.
    *   **On Windows:** Open **Command Prompt**, **PowerShell**, or **Git Bash**.
2.  **Navigate to Your Project Folder:** Use the `cd` command to move into your project's directory.
    ```bash
    cd path/to/your/mintlockr-app
    ```
3.  **Install Packages:** Run the following command. This will download all necessary libraries into a `node_modules` folder.
    ```bash
    npm install
    ```

### 3. Run the Development Server

After the installation is complete, you can start the local web server to view the app in your browser.

```bash
npm run dev
```

This will start the app, typically on `http://localhost:9002`. You can open this URL in your web browser to see the application running.

## How to Push to Your GitHub Repository

After setting up the project locally, you can push it to the GitHub repository you created.

Run these commands from your project folder in the terminal:

```bash
# Initialize a new Git repository in your project folder
# The -b main flag sets the default branch name to "main"
git init -b main

# Add all the files to be tracked by Git
git add .

# Create your first commit to save the project's state
git commit -m "Initial commit of MintLockr project"

# Link your local repository to the one you created on GitHub
# Make sure to replace <YOUR_GITHUB_REPO_URL> with your actual repository URL
git remote add origin <YOUR_GITHUB_REPO_URL>

# Push your code to the 'main' branch on GitHub
git push -u origin main
```

Now your code is safely stored on GitHub!