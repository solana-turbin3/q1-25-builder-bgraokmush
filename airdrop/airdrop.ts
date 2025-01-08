import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet));

const connecton = new Connection(clusterApiUrl("devnet"));


(async () => {
    try {
        const txhash = await connecton.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

    } catch (e: any) {
        console.log(e.message);
    }

})();