# Turbin3 Rust Library 🚀

This repository contains the Rust library for interacting with the **Turbin3** platform. It provides functionality for wallet management, key generation, airdrop requests, money transfers, and communication with smart contracts on the Solana blockchain.

## Prerequisites 📋

Before using this library, make sure you have the following dependencies installed:

- **Rust**: Ensure you have the latest stable version of Rust installed. You can download it from [Rust's official website](https://www.rust-lang.org/).
- **Solana CLI**: Required to interact with Solana's blockchain network. Installation instructions can be found [here](https://docs.solana.com/cli/install-solana-cli-tools).

## Dependencies

This library relies on the following crates:

```toml
[dependencies]
solana-program = "1.15.2"
solana-sdk = "1.15.2"
solana-client = "1.15.2"
bs58 = "0.5.1"
borsh = "0.10.3"
solana-idlgen = { git = "https://github.com/deanmlittle/solana-idlgen.git" }
```

Make sure these dependencies are specified in your `Cargo.toml` file.

## Getting Started

### 1. Key Generation 🔑

To create a new Solana wallet keypair, run the following command:

```bash
cargo test -- --nocapture keygen
```

This command will generate a new keypair and print the public and private keys. Save your keypair securely by creating a file named **dev-wallet.json** and storing the private key in this file.

### 2. Converting Wallet Formats

- **Base58 to Wallet File**: Convert your private key from Base58 format to a wallet file byte array.

  ```bash
  cargo test -- --nocapture base58_to_wallet
  ```

- **Wallet File to Base58**: Convert your private key from a wallet file to Base58 format.

  ```bash
  cargo test -- --nocapture wallet_to_base58
  ```

### 3. Airdrop Creation 💸

You’ll need **Solana (SOL)** to pay transaction fees. To request an airdrop of SOL, execute the following command:

```bash
cargo test -- --nocapture airdrop
```

A link to view your transaction on Solana Explorer will be provided.

### 4. Money Transfer 🏦

To transfer SOL between wallets:

1. Save the recipient's public key in the **transfer-wallet.json** file.
2. Run the following command:

```bash
cargo test -- --nocapture transfer_sol
```

You will receive a link to check the transaction details on Solana Explorer.

### 5. Smart Contract Interaction 🤝

The library allows you to interact with the **Turbin3PrereqProgram** smart contract. To send a transaction to the smart contract, use:

```bash
cargo test -- --nocapture test_program
```

## Example Transactions 🔍

- **Program Intregration**: 'https://explorer.solana.com/tx/KWqoRaHPigi16UYrspg1tQGz35cjo7TptGQmTPK6q5goenGYE5QMYUpYhnTXBza9hvvSSGa1UfM9DpxHFVvqjwS?cluster=devnet'

## Running Tests 🧪

All functionalities are covered with unit tests. To run the tests, simply execute:

```bash
cargo test
```

This will test the key generation, wallet conversion, airdrop requests, money transfer, and communication with the Turbin3Prereq smart contract.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing 🤝

We welcome contributions! Feel free to submit issues, fork the repo, and create pull requests. For major changes, please open an issue first to discuss what you would like to change.
