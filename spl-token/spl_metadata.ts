import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";

import wallet from './wba-wallet.json';
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args, findMetadataPda } from "@metaplex-foundation/mpl-token-metadata";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";


//Define the mint address
const mint = publicKey('6yryc1qY5T6SDTMpNWUjo5AMpHxYju84QewoDxQxBd6h');

//Create a umi connection
const umi = createUmi(clusterApiUrl('devnet'));
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));


(async () => {
    try {
        const metadataPda = findMetadataPda(umi, { mint });

        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            metadata: metadataPda,
            mint: mint,
            mintAuthority: signer,
            payer: signer,
            updateAuthority: signer.publicKey,
        };

        const data: DataV2Args = {
            name: 'B Token',
            symbol: 'BT',
            uri: '',
            sellerFeeBasisPoints: 500,
            creators: null,
            collection: null,
            uses: null,
        };

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null,
        };

        let tx = createMetadataAccountV3
            (
                umi,
                {
                    ...accounts,
                    ...args
                }
            )
        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`)
    }
})()