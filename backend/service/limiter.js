const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
    windowMs: 15 * 60 * 100,  // 15 min
    max: 1000, // limit each IP to 100 requests per windowMs
    message: "We dont accept to many request. Try after sometime",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: true,
  });
 