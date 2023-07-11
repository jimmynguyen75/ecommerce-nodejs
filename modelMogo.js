const mongoose = require("mongoose");
const { connection, connectionIU } = require("./connMogo.js");

const requestSchema = mongoose.Schema({
  email: String,
  name: String,
});

const reviewSchema = new mongoose.Schema({
  fit: String,
  user_id: String,
  item_id: String,
  weight: String,
  rating: String,
  review_text: String,
  review_summary: String,
  category: String,
  height: String,
  size: Number,
  age: String,
  review_date: String,
})
// const IUDB = mongoose.connection.useDb("iu_csdldn")
// const NormalDB = mongoose.connection.useDb("nodejs")
const Request =  connection.model("requests", requestSchema);
const Review  =  connectionIU.model("review_rating", reviewSchema);


module.exports = {
  Request, Review
}