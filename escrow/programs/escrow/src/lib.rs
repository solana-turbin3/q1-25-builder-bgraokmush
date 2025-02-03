pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("4ByU1fbE2K1dCztazkLTufWZLskGianYn2WKRy7nK2uM");

#[program]
pub mod escrow {
    use super::*;

    pub fn make(
        ctx: Context<Make>,
        seed: u64,
        recive_amount: u64,
        desposit_amount: u64,
    ) -> Result<()> {
        ctx.accounts
            .init_escrow_state(seed, recive_amount, ctx.bumps)?;

        ctx.accounts.desposit(desposit_amount)?;

        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.refund()?;
        ctx.accounts.close()?;
        Ok(())
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.release()?;
        ctx.accounts.close()?;
        Ok(())
    }
}
