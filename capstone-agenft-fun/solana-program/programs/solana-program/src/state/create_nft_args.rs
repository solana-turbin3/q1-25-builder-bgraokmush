use anchor_lang::prelude::*;

#[derive(AnchorDeserialize, AnchorSerialize)]
pub struct CreateNftAndMint {
    pub token_name: String,
    pub token_symbol: String,
    pub token_uri: String,
}
