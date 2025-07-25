// This is a placeholder for your actual smart contract address and ABI.
// In a real-world application, you would replace these with your deployed contract's details.

// A dummy ERC-721 contract address on the Sepolia testnet.
export const MINTLOCKR_CONTRACT_ADDRESS = '0x09aea93022145c835a475f255447c1f2a5703243';

// A minimal Application Binary Interface (ABI) for an ERC-721 minting function.
export const MINTLOCKR_ABI = [
  // This function is commonly used for minting new tokens.
  // It takes the recipient's address and a URI for the token's metadata.
  "function safeMint(address to, string uri)",

  // The Transfer event is emitted when a token is created or transferred.
  // It can be used to get the tokenId of the newly minted NFT.
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];
