import express from "express";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
env.config();
app.use(bodyParser.urlencoded({ extended: true }));
const db = new pg.Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});
db.connect();

// PRODUCTS SERVER RESPONSE

app.get("/api/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id ASC");
    if (result) {
      res.json(result.rows);
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
});
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Product  not found " });
    }
  } catch (err) {
    // console.log(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { title, description, price, image_URL, product_id } = req.body;
    const UpperProductId = product_id.toUpperCase();

    if (UpperProductId) {
      console.log(UpperProductId);

      const checkExistProducts = await db.query(
        "SELECT * FROM products WHERE product_id = $1",
        [UpperProductId]
      );
      if (checkExistProducts.rows.length > 0) {
        return res.status(400).json({ message: "Product ID already exists" });
      } else {
        const addProdcut = await db.query(
          "INSERT INTO products (title, description, price, image_URL, product_id) VALUES ($1, $2, $3, $4, $5 ) RETURNING * ",
          [title, description, price, image_URL, UpperProductId]
        );
        // res.json(addProdcut.rows[0]);
        res.status(201).json({ message: "product Created Sucessfully" });
      }
    } else {
      res.status(400).json({ error: "Product Id Required" });
    }
  } catch (err) {
    // console.log(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image, product_id } = req.body;

    if (title && description && price && image && product_id) {
      const UpperProductId = product_id.toUpperCase();

      console.log(UpperProductId);

      const checkProduct = await db.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );

      if (checkProduct.rows.length > 0) {
        const updateProduct = await db.query(
          "UPDATE products SET title = $1, description = $2, price = $3, image_URL = $4, product_id = $5 WHERE id = $6 RETURNING *",
          [title, description, price, image, UpperProductId, id]
        );

        res.json(updateProduct.rows[0]);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } else {
      return res.status(400).json({ message: "Some Details are required" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const checkId = await db.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (checkId.rows.length > 0) {
      const deleteProduct = await db.query(
        "DELETE FROM PRODUCTS WHERE id = $1 RETURNING *",
        [id]
      );
      res.status(200).json({
        message: "Product deleted Successfully",
        prodcut: deleteProduct.rows[0],
      });
    } else {
      res.status(404).json({ error: "id not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// USERS SERVER RESPONSE
app.post("/login", (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const details = [name, email, password]
      res.json(details);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("register", (res, req) => {});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found or Page not found" });
});
app.get("/", (req, res) => {
  res.send("<h1> THIS IS SERVER SIDE LOGICS</h1>");
});

app.listen(port, () => {
  console.log(`The Server running port is ${port}/`);
});
