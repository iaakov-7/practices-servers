import express from "express";
import fs from "fs/promises";
import { readJson, writeJson } from "./IO_file.js";
import { validateProduct } from "./validator.js";
import { memoryUsage } from "process";

const dir = await fs.readdir(process.cwd());

if (!dir.includes("products.json")) await fs.writeFile("products.json", "[]");

const server = express();

server.use(express.json());

server.get("/products", async (req, res) => {
  try {
    let products = await readJson("products.json");
    const { price } = req.query;
    if (price) products = products.filter((p) => p.price > price);
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

server.get("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }
    const products = await readJson("products.json");

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product ${productId} not found` });
    }
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal server error.");
  }
});

server.post("/products", async (req, res) => {
  try {
    const products = await readJson("products.json");
    const { name, price } = req.body;
    const validation = validateProduct(name, price);
    if (validation.isValid === false) {
      return res.status(400).json({ message: validation.errors });
    }
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, name, price };
    products.push(newProduct);
    await writeJson("products.json", products);
    res.status(201).json({ message: `Product ${id} created successfully` });
  } catch (err) {
    console.log(err.message);
    res.json({ message: "Server internal error" });
  }
});

server.put("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }
    const products = await readJson("products.json");
    const pruduct = products.find((p) => p.id === productId);
    if (!pruduct) {
      return res
        .status(404)
        .json({ message: `product ${productId} not found` });
    }
    const { name = pruduct.name, price = pruduct.price } = req.body;
    Object.assign(pruduct, { name, price });
    await writeJson("products.json", products);
    res.json({ message: `product ${productId} updated successfully` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server internal error" });
  }
});

server.delete("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }
    const products = await readJson("products.json");
    const pruduct = products.find((p) => p.id === productId);
    if (!pruduct) {
      return res
        .status(404)
        .json({ message: `product ${productId} not found` });
    }
    const filtered = products.filter((p) => p.id !== productId);
    await writeJson("products.json", filtered);
    res.json({ message: `product ${productId} deleted successfully` });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server internal error" });
  }
});

server.listen(3000, () => console.log("Server is running..."));
