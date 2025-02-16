# NFT Marketplace on Solana ⚡

This repository contains a **Solana** smart contract developed using the **Anchor framework**. The contract implements an **NFT Marketplace**, allowing users to list, delist, and purchase NFTs securely on the Solana blockchain.

## Prerequisites 📋

Before deploying and interacting with this smart contract, ensure you have the following dependencies installed:

- **Rust**: Install the latest stable version of Rust from [Rust's official website](https://www.rust-lang.org/).
- **Solana CLI**: Required for blockchain interactions. Install it from [here](https://docs.solana.com/cli/install-solana-cli-tools).
- **Anchor Framework**: The contract is built using Anchor. Install it using:

  ```bash
  cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
  avm install latest
  avm use latest
  ```

## Dependencies 🛠️

The project uses the following dependencies in `Cargo.toml`:

```toml
[dependencies]
anchor-lang = { version = "0.30.1", features = ["init-if-needed"] }
anchor-spl = { version = "0.30.1", features = ["metadata"] }
```

Ensure these dependencies are correctly specified before compiling the contract.

## Smart Contract Functionality 🔍

The **NFT Marketplace** program consists of the following core functions:

### 1. Initialize Marketplace 🏗️

This function initializes the **Marketplace** contract with a specified name and marketplace fee:

```rust
pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
    ctx.accounts.init(name, fee, &ctx.bumps)?;
    Ok(())
}
```

### 2. List NFT for Sale 🔄

This function allows a user to list their NFT for sale at a specified price:

```rust
pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
    ctx.accounts.create_listing(price, &ctx.bumps)?;
    ctx.accounts.deposit_nft()?;
    Ok(())
}
```

### 3. Delist NFT ❌

This function allows a user to remove their NFT listing from the marketplace:

```rust
pub fn delist(ctx: Context<Delist>) -> Result<()> {
    ctx.accounts.withdraw_nft()?;
    ctx.accounts.close_listing()?;
    Ok(())
}
```

### 4. Purchase NFT ✅

This function allows a buyer to purchase a listed NFT, transferring ownership and handling payments:

```rust
pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
    ctx.accounts.pay()?;
    ctx.accounts.transfer_nft()?;
    ctx.accounts.close_vault_account()?;
    ctx.accounts.reward_buyer()?;
    Ok(())
}
```

## NFT Marketplace Process Flowchart 📊

Below is a visual representation of how the NFT marketplace system works:

```
  Seller                         Buyer
   |                              |
   |---- List NFT ---------------->|
   |                              |
   |        NFT Locked            |
   |                              |
   |<------ Purchase NFT ---------|
   |                              |
   |       Funds Transferred      |
   |                              |
   |       NFT Ownership Updated  |
   |                              |
   |          Transaction Complete |
```

## Deployment 🚀

### 1. Build the Smart Contract

Compile the program using:

```bash
anchor build
```

### 2. Deploy to Solana Devnet

First, set up your Solana wallet and configure your CLI to use **devnet**:

```bash
solana config set --url https://api.devnet.solana.com
```

Then, deploy the program:

```bash
anchor deploy
```

### 3. Verify Deployment

You can check the deployed program using:

```bash
solana program show <PROGRAM_ID>
```

## Testing 🧪

To run unit tests for the smart contract:

```bash
anchor test
```

Ensure that all test cases pass before deploying to mainnet.

## License 📜

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contributions 🤝

Contributions are welcome! Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss your ideas.
