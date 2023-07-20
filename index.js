const cors = require("cors");
const { Review, Clothing } = require("./modelMogo.js");
const { connectSQL } = require("./connSQL.js");
require("dotenv").config();
const app = require("express")();

let clientSQL;
app.use(
  cors({
    origin: "*",
  })
);
const middleware = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] | ${req.method} | ${req.originalUrl}`);
  next();
};
//CALL SQL SERVER
app.get("/api/products", middleware, async (req, res) => {
  const query = `select * from IU.dbo.Product;`;
  const result = await clientSQL.query(query);
  res.json(result?.recordset);
});

app.get("/api/products/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const query = `select * from IU.dbo.Product WHERE ID = ${id};`;
  const result = await clientSQL.query(query);
  res.json(result?.recordset);
});

app.get("/api/product/search", middleware, async (req, res) => {
  const search = req.query.q;
  const query = `select * from IU.dbo.Product p WHERE ProductName LIKE '%${search}%';`;
  const result = await clientSQL.query(query);
  res.json(result?.recordset);
});

app.get("/api/productid/search", middleware, async (req, res) => {
  const search = req.query.q;
  const query = `select * from IU.dbo.Product p WHERE ProductID LIKE '%${search}%';`;
  const result = await clientSQL.query(query);
  res.json(result?.recordset);
});

//------------------------------------------
//CALL MONGODB SERVER
app.get("/api/review", middleware, async (req, res) => {
  const review = await Review.find();
  res.json(review);
});
app.get("/api/ratings/:rate", middleware, async (req, res) => {
  const rate = req.params.rate;
  const review = await Review.find({ rating: rate });
  res.json(review);
});
app.get("/api/user/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const review = await Review.find({ user_id: id });
  res.json(review);
});
app.get("/api/items/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const review = await Review.find({ item_id: id });
  res.json(review);
});
app.get("/api/categories/:category", middleware, async (req, res) => {
  const category = req.params.category;
  const review = await Review.find({ category: category });
  res.json(review);
});
//CLOTHING
app.get("/api/clothing/users/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const query = { $regex: id }
  const review = await Clothing.find({$or:[{user_id:query},{user_name:query}]});
  res.json(review);
});
app.listen(8000, async () => {
  clientSQL = await connectSQL();
});
