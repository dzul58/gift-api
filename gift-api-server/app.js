const express = require("express");
const Controller = require("./controllers/controller");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const authorizationClaim = require("./middlewares/authorizationClaim");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/login", Controller.login);
app.post("/register", Controller.register);
app.use(authentication);
app.get("/vouchers", Controller.readVouchers)
app.post("/vouchers/:voucherId", Controller.sendGift)
app.get("/gifts", Controller.giftsUser)
app.patch("/gifts/:id", authorization, Controller.updateGift)
app.delete("/gifts/:id", authorization, Controller.deleteGift)
app.patch("/gifts/:id/claim", authorizationClaim, Controller.claimGift)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
