pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("GANBDrAki61P7N3SQx41rEj1zVT6vUnEus7dRbeJ9vnc");

#[program]
pub mod solana_program {

    use super::*;

    pub fn create_and_mint(ctx: Context<CreateTokenMint>, args: CreateNftAndMint) -> Result<()> {
        ctx.accounts
            .create_token_mint(args.token_name, args.token_symbol, args.token_uri)?;

        Ok(())
    }
}
