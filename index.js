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
    processList : processList
}