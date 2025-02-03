use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

declare_id!("3DABdRoJhTUXF84xkoPetgeBYLPZEvufwj5sbKRadgEE");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initilaze(ctx.bumps)?;
        Ok(())
    }

    pub fn desposit(ctx: Context<Payment>, amount: u64) -> Result<()> {
        ctx.accounts.desposit(amount)?;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Payment>, amount: u64) -> Result<()> {
        ctx.accounts.withdraw(amount)?;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub vault_bump: u8,
    pub state_bump: u8,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub siger: Signer<'info>,
    #[account(
        init,
        payer = siger,
        space = 8 + VaultState::INIT_SPACE,
        seeds = [b"state", siger.key().as_ref()],
        bump
    )]
    pub vault_state: Account<'info, VaultState>,
    #[account(
        seeds = [vault_state.key().as_ref()],
        bump,
    )]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initilaze(&mut self, bumps: InitializeBumps) -> Result<()> {
        self.vault_state.vault_bump = bumps.vault;
        self.vault_state.state_bump = bumps.vault_state;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Payment<'info> {
    #[account(mut)]
    pub siger: Signer<'info>,
    #[account(
      mut,
        seeds = [b"state", siger.key().as_ref()],
        bump = vault_state.state_bump
    )]
    pub vault_state: Account<'info, VaultState>,
    #[account(mut,
        seeds = [vault_state.key().as_ref()],
        bump = vault_state.vault_bump,
    )]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> Payment<'info> {
    pub fn desposit(&mut self, amount: u64) -> Result<()> {
        let system_program = self.system_program.to_account_info();

        let accounts = Transfer {
            from: self.siger.to_account_info(),
            to: self.vault.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(system_program, accounts);

        transfer(cpi_ctx, amount)?;
        Ok(())
    }

    pub fn withdraw(&mut self, amount: u64) -> Result<()> {
        let system_program = self.system_program.to_account_info();

        let accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.siger.to_account_info(),
        };

        let seeds = &[
            self.vault_state.to_account_info().key.as_ref(),
            &[self.vault_state.vault_bump],
        ];

        let signer_seeds = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(system_program, accounts, signer_seeds);

        transfer(cpi_ctx, amount)?;
        Ok(())
    }
}
