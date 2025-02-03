# Vault Smart Contract on Solana ⚡

This repository contains a **Solana** smart contract developed using the **Anchor framework**. The contract provides a simple vault system where users can deposit and withdraw **SOL** securely.

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

The **Vault** program consists of the following core functions:

### 1. Initialize Vault 🏗️

This function initializes the vault by setting up the required **PDA (Program Derived Address)** and storing state information.

```rust
pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    ctx.accounts.initilaze(ctx.bumps)?;
    Ok(())
}
```

### 2. Deposit Funds 💰

Users can deposit SOL into the vault using this function:

```rust
pub fn desposit(ctx: Context<Payment>, amount: u64) -> Result<()> {
    ctx.accounts.desposit(amount)?;
    Ok(())
}
```

### 3. Withdraw Funds 🏦

Users can withdraw SOL from the vault back to their wallet:

```rust
pub fn withdraw(ctx: Context<Payment>, amount: u64) -> Result<()> {
    ctx.accounts.withdraw(amount)?;
    Ok(())
}
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

