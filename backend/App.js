const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! From Express!");
});

const APIManager = require("./APIManager");
const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");
var scrubbedData;

app.get("/test:store", (req, res) => {
  res.json({
    category: req.query.category,
    random: req.query.random,
    store: req.params.store,
  });
});
APIManager.connectToDb();

app.get("/harvest/getproducts/:store", (req, res) => {
  //example http://localhost:3000/harvest/getproducts/0?category=Kott-chark-och-fagel/Fagel/Fryst-fagel - willys
  //example http://localhost:3000/harvest/getproducts/1?category=32486 - coop
  //store must be a number
  APIManager.harvestProducts(req, res)
});

app.get("/harvest/getcategories/:store", (req, res) => {
  if (!/^[0-2]{1}$/.test(req.params.store)) {
    //change [0-2] if you want to have more stores
    res.status(404).send(`store cannot be found: ${req.params.store}`);
    return;
  }

  let storeId = Number(req.params.store);
  HarvesterFactory.createCategories(storeId)
    .then((result) => {
      res.status(300).json(result);
    })
    .then(console.log("Printing categories to backend using factory"))
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/harvest/getproducts/:store", async (req, res) => {
 APIManager.harvestProducts(req, res);
});

app.get("/rest/products", async (req, res) => {
  APIManager.getProductsFromDb(res);
});

app.get("/rest/categories", async (req, res) => {
  APIManager.getCategories(res);
});

app.get("rest/stores", async (req, res) => {
  APIManager.getStores(res);
});

app.delete("/rest/products", async (req, res) => {
  APIManager.deleteProducts(res);
});
