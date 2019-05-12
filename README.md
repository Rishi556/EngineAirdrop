# EngineAirdrop

EngineAirdrop is a free tool for anyone to use to send airdrops to recipients on Steem-Engine.

To use this, simply clone this, `cd` to the directory and use `npm i` to install the dependencies.
Next use `npm link` to be able to use the command line interface for it.

Now edit the `ToSend.txt` file. Follow this format, each person should be on their own line, followed by a comma and how much they should receive,
```
username,amountToSend
username2,amountToSend2
```

There's an example of this within the file itself, or here : https://github.com/Rishi556/EngineAirdrop/blob/master/ToSend.txt.

Next edit the `config.js` file. There's four fields and you need to change each one to be correct for you. Theres instructions right next to each field if you have any questions.

Finally, you are ready to start.

You can see who'll get how much by typing in `airdrop genList`. Use this to confirm that each person is getting the correct amount and make the changes if necessary.

You can also use `airdrop processList` to make sure that all accounts are on steem. If an array with names is returned, those are the ones that don't have steem accounts.

`airdrop help` gives you the help menu.

When you are ready to send, you can use `airdrop send` to start the sending process. It takes some time and an estimate will be printed out for you. If there are any errors, they'll be printed out in human readable form.
