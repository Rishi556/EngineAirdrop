var config = {
    accountName : "rishi556", //Please insert the sending account name here.
    accountPrivateActiveKey : "", //Private active key of sending account here.
    tokenSymbol : "TPU", //Symbol of token to send here.
    mode : "issue" //Eiter issue or transfer. Issue can only be done if accountName is the creator of the token. Issuing creates new token while transfer sends existing tokens. If using transfer, make sure that you have enough tokens in your account.
}

module.exports = {
    config : config
}