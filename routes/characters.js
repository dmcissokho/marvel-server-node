var express = require('express');
var axios = require('axios');
var dotenv = require('dotenv');
var crypto = require('crypto');

var router = express.Router();

dotenv.config()

const hashString = crypto.createHash('md5').update(`${process.env.API_TS}${process.env.API_PRIVATE_KEY}${process.env.API_PUBLIC_KEY}`).digest("hex")

/* GET characters listing. */
router.get('/',  async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : process.env.API_DEFAULT_PAGINATION;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const response = await axios.get(`${process.env.API_ENDPOINT}/characters?ts=${process.env.API_TS}&apikey=${process.env.API_PUBLIC_KEY}&hash=${hashString}&offset=${offset}&limit=${limit}`)
    if(!response) return res.status(404).json({ message: "error not found" })
    res.status(200).json(response.data)
  }
  catch (err) {
    res.status(500).json({ message: "error" });
  }
});

module.exports = router;
