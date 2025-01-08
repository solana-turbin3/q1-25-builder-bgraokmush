import {
    Transaction, SystemProgram, Connection, Keypair,
    LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey,
    clusterApiUrl
} from
    "@solana/web3.js"
import wallet from "./dev-wallet.json"


const from = Keypair.fromSecretKey(Uint8Array.from(wallet));
const to = new PublicKey("2F739QPyYny2PK22xC1pBQrWm8KYb5fVKkZgPxGUWEzR");

const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');

(async () => {
    try {
        const balance = await connection.getBalance(from.publicKey)

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance
            })
        )

        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        const fee = (await
            connection.getFeeForMessage(transaction.compileMessage(),
                'confirmed')).value || 0;

        transaction.instructions.pop();

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );

        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );

        console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${signature}?cluster=devnet`)

    } catch (error: any) {
        console.log(error.message);

    }
})();