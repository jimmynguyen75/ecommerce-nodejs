const sql = require("mssql");
const cors = require("cors");
const { Review } = require("./modelMogo.js");
const connectSQL = require("./connSQL.js");
require("dotenv").config();

const app = require("express")();

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
  connectSQL();
  const query = `select * from IU.dbo.Product;`;
  const result = await sql.query(query);
  res.json(result?.recordset);
});

app.get("/api/products/:id", middleware, async (req, res) => {
  const id = req.params.id;
  connectSQL();
  const query = `select * from IU.dbo.Product WHERE ID = ${id};`;
  const result = await sql.query(query);
  res.json(result?.recordset);
});

app.get("/api/product/search", middleware, async (req, res) => {
  const search = req.query.q;
  connectSQL();
  const query = `select * from IU.dbo.Product p WHERE ProductName LIKE '%${search}%';`;
  const result = await sql.query(query);
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
app.listen(8000);
