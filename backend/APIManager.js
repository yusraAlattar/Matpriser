module.exports = class APIManager {
  static connectToDb() {
    var mysql = require("mysql");

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mat_pris",
    });

    con.connect((err) => {
      if (err) throw err;
      console.log("Connected!");
    });
  }
  static getProducts() {}

  static setProducts() {
    app.post("/rest/products", async (req, res) => {
      console.log(req.body);
      const values = {
        id: req.body.id,
        name: req.body.name,
        storeId: req.body.storeId,
        category: req.body.category,
        brand: req.body.brand,
        photoUrl: req.body.photoUrl,
        isEco: req.body.isEco,
        unit: req.body.unit,
        pricePerUnit: req.body.pricePerUnit,
        pricePerItem: req.body.pricePerItem,
        country: req.body.country,
        url: req.body.url,
        modifyDate: req.body.modifyDate,
      };
      try {
        await con.query("INSERT INTO product SET ?", values);
        res.json({ message: "success!" });
      } catch (e) {
        res.json({ message: "failed" });
      }
    });
  }

  static getCategories() {
    app.get("/rest/categories", async (req, res) => {
      con.query("SELECT * FROM category", (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      });
    });
  }

  static getStores() {
    app.get("/rest/stores", async (req, res) => {
      con.query("SELECT * FROM store", (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      });
    });
  }
};