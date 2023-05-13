const express = require("express");
const NewsItemModel = require("../models/newsItem");
const router = express.Router();

router.post("/addnewsitem", async function (req, res){
  try {
    const newsitem = new NewsItemModel(req.body);
    await newsitem.save();
    res.send("News added successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/getallnewsitems", async function (req, res){
    try {
      const data = await NewsItemModel.find({});
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

module.exports = router;
