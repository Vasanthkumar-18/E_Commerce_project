import express from "express";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
const port = 4000;
env.config();
app.use(
  cors({
    // origin: "http://localhost:5173/",
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SECRET_SESSSION,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

const saltRound = 10;
const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("Connected to Railway PostgreSQL"))
  .catch((err) => console.error(" Database connection error :", err.stack));

app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id ASC");
    if (result) {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: "SERVER ERROR" });
  }
});
app.get("/products/:id", async (req, res) => {
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

app.post("/products", async (req, res) => {
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
app.post("/search/product", async (req, res) => {
  try {
    const query = req.body.query;

    const result = await db.query(
      "SELECT * FROM products WHERE title ILIKE $1",
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Searching Products" });
  }
});

app.put("/products/:id", async (req, res) => {
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

app.delete("/products/:id", async (req, res) => {
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

const secretKey = process.env.SECRET_KEY_JWT;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ error: "Request Denied" });
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const checkEmail = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (checkEmail.rows.length > 0) {
        res.status(404).json({ message: "User Email already Exists" });
      } else {
        const hashPassword = await bcrypt.hash(password, saltRound);

        await db.query(
          "INSERT INTO users (name, email, password) VALUES ( $1, $2, $3 ) ",
          [name, email, hashPassword]
        );
        res.status(201).json("User Created Successfully");
      }
    } else {
      res.status(404).json({ error: "some detail Required" });
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Address
app.post("/user/address", async (req, res) => {
  try {
    const { addressname, email, mobileno, pincode, states, address, landmark } =
      req.body;
    console.log("name :", addressname);
    console.log("email :", email);
    console.log("mobile no :", mobileno);
    console.log("picode :", pincode);
    console.log("state :", states);
    console.log("address :", address);
    console.log("lanmark :", landmark);

    if (
      email &&
      addressname &&
      mobileno &&
      pincode &&
      states &&
      address &&
      landmark
    ) {
      const checkEmail = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (checkEmail.rows.length > 0) {
        await db.query(
          "UPDATE users SET addressname = $1, mobilenum = $2, pincode = $3, states = $4, address = $5, landmark = $6 WHERE email = $7 ",
          [addressname, mobileno, pincode, states, address, landmark, email]
        );
        res.status(200).json({ success: "Address Added SucessFully" });
      } else {
        res.status(404).json({ error: " User Not Found" });
      }
    } else {
      res.status(404).json({ error: " Some  Data Requried" });
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/address", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Received email:", email);

    const checkUserAddress = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkUserAddress.rows.length > 0) {
      const userAddress = await db.query(
        " SELECT * FROM users  WHERE email = $1",
        [email]
      );

      res.json({ address: userAddress.rows[0] });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, loginPassword } = req.body;
    if (email && loginPassword) {
      const checkUserDetails = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (checkUserDetails.rows.length > 0) {
        const user = checkUserDetails.rows[0];
        const storedHashedPassword = user.password;

        const validPassword = await bcrypt.compare(
          loginPassword,
          storedHashedPassword
        );
        console.log(validPassword);

        if (validPassword) {
          const token = jwt.sign(
            { clientName: user.name, email: user.email },
            secretKey,
            { expiresIn: "5H" }
          );
          res.send({ token });
        } else {
          return res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        return res.status(404).json({ error: "email is not found" });
      }
      return;
    } else {
      return res.status(404).json({ error: "email & passsword Required" });
    }
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/profile", verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.clientName} `);
});

// userOrdetails

app.get("/orderlists/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const result = await db.query(
      "SELECT  users.id, users.email, orderDetails.id AS orderId,orderDetails.productDescription,orderDetails.quantity,orderDetails.productImage, orderDetails.price, orderDetails.status FROM users JOIN orderDetails ON users.email = orderDetails.userEmail WHERE users.email = $1   ORDER BY orderDetails.id;",
      [userEmail]
    );
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).send("No orders found for this user");
    }
  } catch (err) {
    res.status(500).json({ error: "SERVER ERROR" });
  }
});
app.post("/add/orderlist", async (req, res) => {
  const { description, quantity, email, image, price } = req.body;

  try {
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkEmail.rows.length > 0) {
      const query = `
      INSERT INTO orderDetails (userEmail, productDescription, quantity, productImage, price)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
      await db.query(query, [email, description, quantity, image, price]);

      res.status(200).json({ success: " Product Added SucessFully" });
    } else {
      res.status(404).json({ error: " User Not Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting order details");
  }
});
app.post("/cancel/order:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);

  try {
    await db.query("UPDATE orderDetails SET status = false where ID = $1", [
      orderId,
    ]);
    res.status(200).json({ success: " product Canceled" });
  } catch (err) {
    res.status(500).json({ error: "Order ID is Missing" });
  }
});
app.get("/", (req, res) => {
  res.send("<h1> THIS IS SERVER SIDE LOGICS</h1>");
});

app.all("*", (req, res) => {
  res.status(404).json({ error: " Page not found" });
});
app.listen(port, () => {
  console.log(`The Server running port is ${port}/`);
});
