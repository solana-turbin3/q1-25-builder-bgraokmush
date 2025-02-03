# Escrow Smart Contract on Solana ⚡

This repository contains a **Solana** smart contract developed using the **Anchor framework**. The contract implements an **Escrow system**, allowing two parties to securely exchange assets on the Solana blockchain.

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
anchor-lang = "0.28.0"
solana-program = "1.15.2"
```

Ensure these dependencies are correctly specified before compiling the contract.

## Smart Contract Functionality 🔍

The **Escrow** program consists of the following core functions:

### 1. Initialize Escrow 🏗️

This function sets up the **EscrowState** account with the required parameters:

```rust
#[account]
#[derive(InitSpace)]
pub struct EscrowState {
    pub seed: u64,
    pub maker: Pubkey,
    pub mint_a: Pubkey,
    pub mint_b: Pubkey,
    pub recive_amount: u64,
    pub bump: u8,
}
```

### 2. Make an Escrow Offer 🔄

This function initializes an escrow state and deposits assets into the escrow:

```rust
pub fn make(
    ctx: Context<Make>,
    seed: u64,
    recive_amount: u64,
    desposit_amount: u64,
) -> Result<()> {
    ctx.accounts
        .init_escrow_state(seed, recive_amount, ctx.bumps)?;
    
    ctx.accounts.desposit(desposit_amount)?;
    
    Ok(())
}
```

### 3. Refund Escrow ❌

This function allows the escrow maker to refund their assets if the deal is canceled:

```rust
pub fn refund(ctx: Context<Refund>) -> Result<()> {
    ctx.accounts.refund()?;
    ctx.accounts.close()?;
    Ok(())
}
```

### 4. Take an Escrow ✅

This function enables the other party to complete the trade by depositing their assets and releasing the escrowed funds:

```rust
pub fn take(ctx: Context<Take>) -> Result<()> {
    ctx.accounts.deposit()?;
    ctx.accounts.release()?;
    ctx.accounts.close()?;
    Ok(())
}
```

## Escrow Process Flowchart 📊

Below is a visual representation of how the escrow system works:

```
  Maker                         Taker
   |                              |
   |---- Make Offer -------------->|
   |                              |
   |        Funds Locked          |
   |                              |
   |<------ Accept Offer ----------|
   |                              |
   |       Funds Exchanged        |
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

