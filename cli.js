#! /usr/bin/env node
var index = require("./index.js")

if (process.argv[2] == "genList"){
    index.genList(res => {
        console.log(res)
        process.exit(0)
    })
} else if (process.argv[2] == "processList") {
    index.processList(res => {
        console.log(res)
        process.exit(0)
    })
} else if (process.argv[2] == "send") {
    index.send(res => {
        console.log(res)
        process.exit(0)
    })
} else if (process.argv[2] == "help") {
    console.log("To see the amount to send to people, use `airdrop genList`. \nTo see if theres any nonsteem usernames in the poeple to send list, use `airdrop processList`.\nOnce you are ready to send, use `airdrop send`.")
    process.exit(0)
} else {
    console.log("Error. Read readme to understand how to use this, or use `airdrop help`.")
    process.exit(0)
}