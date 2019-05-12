var fs = require("fs")


fs.readFile("ToSend.txt", (err, data) => {
    var csv = data.toString().toLowerCase()
    console.log(csvFormattor(csv.replace("@", "")))
})

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