var fs = require("fs")
var hive = require("@hiveio-hive-js")
var SSC = require("sscjs")
var config = require("./config.js").config
var path = require('path').dirname(require.main.filename)

const ssc = new SSC('https://api.hive-engine.com/rpc')

function genList(callback){
    fs.readFile(`${path}/ToSend.txt`, (err, data) => {
        var csv = data.toString().toLowerCase()
        callback(csvFormattor(csv))
    })
}

//Looks for accounts that aren't steem accounts.
function processList(callback){
    genList(list => {
        var keys = Object.keys(list)
        var found = []
        var diff = []
        steem.api.getAccounts(keys, function(err, result) {
            for (i in result){
                found.push(result[i].name)
            }
            for (i in keys){
                if (!found.includes(keys[i])){
                    diff.push(keys[i])
                }
            }
            callback(diff)
        })
    })
}

function send(callback){

    //Check for mode being issue or transfer
    if (config.mode.toLowerCase() != "issue" && config.mode.toLowerCase() != "transfer"){
        callback("Please only use issue or transfer in the mode in config.")
        return
    }
    
    //Check for error
    processList(diff => {
        if (diff.length){
            callback("Error, Use `airdrop processList` to see what users don't exist.")
            return
        }
        var c = 0
        getAccountBalance(balance => {
            genList(list => {
                if (balance >= getTotalToSend(list) || config.mode.toLowerCase() == "issue"){
                    var keys = Object.keys(list)
                    console.log(`Starting...\nEstimated Time To Completion is ${keys.length * 10} seconds.`)
                    var sending = setInterval(() => {
                        var sendJSON = {"contractName":"tokens","contractAction":config.mode.toLowerCase() ,"contractPayload":{"symbol": config.tokenSymbol,"to": keys[c],"quantity": list[keys[c]],"memo":"Test"}}
                        if (keys[c]){
                            hive.broadcast.customJson(config.accountPrivateActiveKey, [config.accountName], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
                                if (!err){
                                    console.log(`Sent ${list[keys[c]]} to ${keys[c]}.`)
                                    c++
                                } else {
                                    console.log(`Error sending ${list[keys[c]]} to ${keys[c]}.`)
                                    c++
                                }
                            })
                        } else {
                            clearInterval(sending)
                            callback("Done")
                        }
                    } , 10 * 1000)
                } else {
                    callback(`The account only has ${balance} while the total needed to send is ${getTotalToSend(list)}.`)
                }
            })
        
        })
    })
}

//Returns CSV as json
function csvFormattor(csv){
    var unFormattedlines = csv.split("\n")
    var lines = []

    for (i in unFormattedlines){
        if (unFormattedlines[i] != ""){
            lines.push(unFormattedlines[i])
        }
    }

    var res = {}
    for (i in lines){
        var current = lines[i]
        var split = current.split(",")
        res[split[0]] = split[1]
    }
    return res
}

//Gets balance of account with the token
function getAccountBalance(callback){
    ssc.findOne('tokens','balances', { account:  config.accountName, symbol : config.tokenSymbol}, (err, result) => {
        if (err || !result) {
            callback(0)
        } else {
            var balance = parseFloat(result.balance)
            callback(balance)
        }
    })
}

//Gets total amount to send to people.
function getTotalToSend(list){
    var c = 0
    for (i in list){
        c = c + parseFloat(list[i])
    }
    return c
}


module.exports = {
    genList : genList,
    processList : processList,
    send : send,
    getAccountBalance : getAccountBalance
}
