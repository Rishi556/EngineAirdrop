var fs = require("fs")
var steem = require("steem")

function genList(callback){
    fs.readFile("./ToSend.txt", (err, data) => {
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
    processList(diff => {
        if (diff.length){
            callback("Error, Use `airdrop processList` to see what users don't exist.")
            return
        }
        var config = require("./config.js").config

        var c = 0
        genList(list => {
            var keys = Object.keys(list)
            var sending = setInterval(() => {
                var sendJSON = {"contractName":"tokens","contractAction":"transfer","contractPayload":{"symbol": config.tokenSymbol,"to": keys[c],"quantity": list[keys[c]],"memo":"Test"}}
                if (keys[c]){
                    steem.broadcast.customJson(config.accountPrivateActiveKey, [config.accountName], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
                        if (!err){
                            console.log(`Sent ${list[keys[c]]} to ${keys[c]}.`)
                            c++
                        }
                    })
                } else {
                    clearInterval(sending)
                    callback("Done")
                }
            } , 4 * 1000)

        })
    })
}

//Returns CSV as json
function csvFormattor(csv){
    var lines=csv.split("\n");
    var res = {}
    for (i in lines){
        var current = lines[i]
        var split = current.split(",")
        res[split[0]] = split[1]
    }
    return res
}


module.exports = {
    genList : genList,
    processList : processList,
    send : send
}