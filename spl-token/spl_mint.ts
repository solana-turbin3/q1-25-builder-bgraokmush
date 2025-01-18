import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("6yryc1qY5T6SDTMpNWUjo5AMpHxYju84QewoDxQxBd6h");

(async () => {
    try {
        const ata = getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        const mintTx = await mintTo(connection, keypair, mint, (await ata).address, keypair, 1000000);

        console.log(`Success! Your mint transaction is: ${mintTx}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
