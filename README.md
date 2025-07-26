# MintLockr - NFT Minting dApp

This is a Next.js application that allows users to connect their Ethereum wallet (like MetaMask) and mint an NFT on the Sepolia testnet.

## Project Workflow

Here’s a step-by-step breakdown of how the application functions:

1.  **Page Load & UI Rendering**:
    *   The app starts by rendering `src/app/page.tsx`, which displays the main UI.
    *   The core interactive element is the `<MintNftCard />` component, built with Next.js, React, and ShadCN UI components.

2.  **Connect Wallet**:
    *   The user clicks the "Connect Wallet" button.
    *   The `handleConnectWallet` function in `mint-nft-card.tsx` uses `window.ethereum.request({ method: 'eth_requestAccounts' })` to connect to the user's MetaMask wallet.
    *   Once connected, the user's wallet address is stored in the component's state, and the UI updates to show the connected status.

3.  **Provide NFT Details**:
    *   The user uploads an image file from their computer. The `handleFileChange` function uses the browser's `FileReader` API to display a preview.
    *   The user enters a name and description for the NFT, which are stored in the component's state.

4.  **Mint the NFT**:
    *   The user clicks "Mint Your NFT." This triggers the `handleMint` function.
    *   **Ethers.js Interaction**: The app uses the `ethers` library to communicate with the Ethereum blockchain via the user's wallet provider.
    *   **Smart Contract Call**: A new instance of the smart contract is created using its on-chain address (`MINTLOCKR_CONTRACT_ADDRESS`) and ABI (`MINTLOCKR_ABI`).
    *   **Metadata Note**: In this demo, the image is not uploaded. A placeholder metadata URI is passed to the smart contract. In a production app, the image and metadata would be uploaded to a service like IPFS first.
    *   **Transaction**: The `contract.safeMint()` function is called, prompting the user to confirm the transaction in MetaMask.
    *   **Confirmation**: The app waits for the transaction to be mined and confirmed on the Sepolia testnet.
    *   **Success UI**: After confirmation, the app parses the transaction logs to get the new `tokenId` and updates the UI to show a success message with the transaction details.

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
