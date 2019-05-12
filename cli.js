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
} else if (process.argv[2] == "send" || process.argv[2] == "start") {
    index.send(res => {
        console.log(res)
        process.exit(0)
    })
} else {
    console.log("Error. Read readme")
    process.exit(0)
}