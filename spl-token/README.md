# Step-by-Step Guide for Solana SPL Token and NFT Creation 🚀

## Overview

This guide outlines the steps to create a Solana SPL token and mint an NFT using Metaplex and related tools. By following this guide, you'll have your token and NFT ready with proper metadata, images, and transactions.

---

### 0. Required Installations

Before starting, ensure you have **yarn**, **npm**, and **node.js** installed on your system.

To install all dependencies, run the following command in the project directory:

```bash
yarn install
```

### 1. Creating and Managing SPL Tokens 💰

#### 1.1 Initialize the SPL Token

To create an SPL token, run the following command:

```bash
yarn spl_init
```

#### 1.2 Mint SPL Tokens

To mint tokens to your wallet, execute:

```bash
yarn spl_mint
```

#### 1.3 Transfer SPL Tokens

To transfer tokens to another wallet, run:

```bash
yarn spl_transfer
```

---

### 2. Creating NFTs 🎨

#### 2.1 Generate NFT Image

Prepare your NFT image using the following command:

```bash
yarn nft_image
```

The image will be hosted at a URL, such as:
[View NFT Image](https://devnet.irys.xyz/5qyf3imta5fddQFWbdivf8PLEBNorbvMTrcYK96C9Szv)

#### 2.2 Create NFT Metadata

Generate the metadata file for your NFT by running:

```bash
yarn nft_metadata
```

You can view the metadata here:
[NFT Metadata](https://devnet.irys.xyz/DnB98S7HzsPhEKRJ9KNTDEibj3yEEaeXcZGUTxw4wMrg)

#### 2.3 Mint the NFT

Mint the NFT to your wallet using the command below:

```bash
yarn nft_mint
```

After minting, view your NFT on the blockchain:
[NFT Details](https://explorer.solana.com/address/51cysooNM1nCAMH7FW9ZvjEP3nd3kHLsdtBaTAJxyxQs?cluster=devnet)

### 3. Tracking Transactions 🔍

Track the minting transaction on Solana Explorer:
[NFT Mint Transaction](https://explorer.solana.com/tx/54ueCyJ5bzRfXsCgoJj3TtsN7jVz9f7nfQi8TjKGZcGB7sUDF6Bvi4NHSEcMeksucGGBVk993wA15NegXPTqoHHw?cluster=devnet)

You can monitor all your transactions step by step via the Solana Explorer.

---

### 4. Dependencies

The project relies on the following packages:

#### Main Dependencies:

```json
{
  "@coral-xyz/anchor": "0.29.0",
  "@metaplex-foundation/mpl-token-metadata": "3.1.1",
  "@metaplex-foundation/umi": "^0.8.10",
  "@metaplex-foundation/umi-bundle-defaults": "^0.8.10",
  "@metaplex-foundation/umi-uploader-irys": "^0.9.1",
  "@solana/spl-token": "^0.3.9",
  "@solana/web3.js": "^1.87.6",
  "@types/node": "^20.9.3",
  "@types/prompt": "^1.1.8",
  "bs58": "^5.0.0",
  "prompt": "^1.3.0",
  "typescript": "^5.3.2"
}
```

#### Development Dependencies:

```json
{
  "ts-node": "^10.9.1"
}
```

---

### Additional Links and Resources

Solana Doc : click [here](https://spl.solana.com/token)
Metaplex Doc : click [here](https://developers.metaplex.com/guides/javascript/how-to-create-a-solana-token)
