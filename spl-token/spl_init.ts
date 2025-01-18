import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import wallet from './wba-wallet.json';
import { createMint } from "@solana/spl-token";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment = 'confirmed';
const connection = new Connection(clusterApiUrl('devnet'), commitment);


(async () => {
    try {
        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
        console.log('The mint account -> ', mint.toBase58());
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})();