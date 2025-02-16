use anchor_lang::error_code;

#[error_code]
pub enum ErrorCode {
    #[msg("Custom error message")]
    CustomError,
    #[msg("Name is to long")]
    InvalidName,
    #[msg("Invalid collection")]
    InvalidCollection,
    #[msg("Collection not verified")]
    CollectionVerifiedError,
    #[msg("Collectio is not Verified")]
    UnverifedCollection,
}
