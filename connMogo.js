const mongoose = require("mongoose");

const connection = async() => {
    await mongoose.createConnection("mongodb+srv://admin:wXI9w0fOSVO7AqBt@cluster0.g561dup.mongodb.net/nodejs?retryWrites=true&w=majority");
}
const connectionIU = async() => {
    await mongoose.createConnection("mongodb+srv://admin:wXI9w0fOSVO7AqBt@cluster0.g561dup.mongodb.net/iu_csdldn?retryWrites=true&w=majority");
}
module.exports= {connection, connectionIU};