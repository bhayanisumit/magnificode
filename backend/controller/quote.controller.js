const express = require("express");
const router = express.Router();
const { Validator } = require("node-input-validator");

const quote = require("../model/quote");
const { limiter } = require("../service/limiter");

const filterData = (val) => {
  const quoteStr = val.split(/[“”"|]/).filter((el) => el != "");
  const getAuthoreName = quoteStr[quoteStr?.length - 1]
    .replace(/[^a-zA-Z ]/g, "")
    .trim();
  return { name: quoteStr[0], authorename: quoteStr.length == 1 ? '' :  getAuthoreName };
};

router.post("/create", limiter, async (req, res, next) => {
    console.log('req.body',req.body);
  const v = new Validator(req.body, {
    quote: "required",
  });

  const matched = await v.check();
  if (!matched) {
    return res
      .status(400)
      .json({ status: 0, data: [v.errors], message: "Validation error" });
  }
  const { name, authorename } = filterData(req.body.quote);

  const quoteAdd = new quote();
  quoteAdd.quoteName = name;
  quoteAdd.authorName = authorename;
  quoteAdd
    .save()
    .then(async (models) => {
      return res.status(200).json({ status: 1, message: "Quote created" });
    })
    .catch((err) => {
      if (err) return next(new Error("Error in create Quote"));
    });
});

router.get("/", limiter, async (req, res, next) => {
  const getQuote = await quote.find();
  console.log('get' ,getQuote.length);
  if (!getQuote.length) return res.status(200).json({ status: 0, data: "", message: "No Quote data found" });
  
  return res.status(200).json({ status: 1, data: getQuote, message: "Quote data" });
});

router.put("/:id", limiter, async (req, res) => {
  if (!req.params.id)
    return res
      .status(400)
      .json({ status: 0, data: "", message: "QuoteId missing" });
  const v = new Validator(req.body, {
    quote: "required",
  });

  const matched = await v.check();
  if (!matched) {
    return res
      .status(400)
      .json({ status: 0, data: [v.errors], message: "Validation error" });
  }

  const quoteUpdate = await quote.findOne({ _id: req.params.id });
  if(!quoteUpdate) return res.status(200).json({ status: 0, data: "", message: "No Quote data found" });
  const { name, authorename } = filterData(req.body.quote);

  quoteUpdate.quoteName = name;
  quoteUpdate.authorName = authorename;
  quoteUpdate
    .save()
    .then(async (models) => {
      return res
        .status(200)
        .json({ status: 1, message: "quote Updated success" });
    })
    .catch((err) => {
      if (err) return next(new Error("Error in update quote"));
    });
});

router.delete("/:quoteId", async (req, res, next) => {
  if (!req.params.quoteId)
    return res
      .status(400)
      .json({ status: 0, data: "", message: "QuoteId missing" });
  quote
    .findOneAndDelete({ _id: req.params.quoteId })
    .then((result) => {
      if (!result) return next(new Error("Quote not Found"));
      return res
        .status(200)
        .json({ status: 1, data: "", message: "Quote delete success" });
    })
    .catch((err) => {
      if (err) return next(new Error("Error in delete Quote"));
    });
});

module.exports = router;
