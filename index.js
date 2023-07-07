const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();
const app = require("express")();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.URL,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

const connDB = async () => {
  //  try {
  //   // make sure that any items are correctly URL encoded in the connection string
  //   await sql.connect(sqlConfig)
  //   const result = await sql.query`SELECT ID, ProductID, ProductName, Category, Price, [Type], Description FROM IU.dbo.Product;  `
  // //   console.dir(result)
  //  } catch (err) {
  //     console.log(err);
  //   // ... error checks
  //  }
};

connDB();

app.use(cors({
  origin:"*"
}))

const middleware =(req,res,next)=>{
  console.log(`[${new Date().toLocaleTimeString()}] | ${req.method} | ${req.originalUrl}`)
  next();
}
app.get("/api/products", middleware,async (req, res) => {
  await sql.connect(sqlConfig);
  const query = `select * from IU.dbo.Product;`;
  const result = await sql.query(query);
  // console.log("GET products: ", result)
  res.json(result?.recordset);
});

app.get("/api/products/:id",middleware, async (req, res) => {
  const id = req.params.id;
  await sql.connect(sqlConfig);
  const query = `select * from IU.dbo.Product WHERE ID = ${id};`;
  const result = await sql.query(query);
  res.json(result?.recordset);
});

app.get("/api/products/search", middleware,async (req, res) => {
  const search = req.query.q;
  await sql.connect(sqlConfig);
  const query = `select * from IU.dbo.Product p WHERE ProductName LIKE '%${search}%';`;
  const result = await sql.query(query);
  res.json(result?.recordset); 
});

app.listen(8000);
