export const enum UserPagesNames {
    PLAYER_TO_PARTNER = "pl-to-pr",
    PARTNER_TO_PLAYER = "pr-to-pl",
    PLAYER_TO_PARTNER_ESTIMATE = "pl-to-pr-estimate",
    PARTNER_TO_PLAYER_ESTIMATE = "pr-to-pl-estimate",
    PARTNER_TO_PLAYER_FILLED_ESTIMATE = "pr-to-pl-filled-estimate",
    EXPECTATIONS = "expectations",
    RESOURCES = "resources",
    MESSAGE = "message",
    RESULTS = "results",
}

export const userPagesNamesWithActions = [
    UserPagesNames.PLAYER_TO_PARTNER,
    UserPagesNames.PLAYER_TO_PARTNER_ESTIMATE,
    UserPagesNames.PARTNER_TO_PLAYER_FILLED_ESTIMATE,
    UserPagesNames.PARTNER_TO_PLAYER,
    UserPagesNames.PARTNER_TO_PLAYER_ESTIMATE,
] as const


