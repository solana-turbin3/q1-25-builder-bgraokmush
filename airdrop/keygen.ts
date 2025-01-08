import { Keypair } from "@solana/web3.js";


let kp = Keypair.generate();

console.log(`Yo've generated a new keypair: ${kp.publicKey.toString()}`);

console.log(`[${kp.secretKey}]`)