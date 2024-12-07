const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

//Imports
const db = require("./db/conn");
const Vegetable = require("./models/vegetables");
const vegetableRoutes = require("./routes/vegetables");

//jsx-view-engine
const jsxViewEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

//MIDDLEWARE
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("You have arrived");
});

//localhost:5052/api/vegetables
app.use("/api/vegetables", vegetableRoutes);

//Route for Index View
app.get("/vegetables", async (req, res) => {
  try {
    const foundVegetables = await Vegetable.find({});
    res.status(200).render("vegetables/Index", { vegetables: foundVegetables });
  } catch (err) {
    res.send(err).status(400);
  }
});
//Rout for New View
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//Route for Edit View
app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.status(200).render("vegetables/Edit", {
      vegetables: foundVegetable,
      id: req.params.id,
    });
  } catch (err) {
    res.send(err).status(400);
  }
});
