const express = require("express");
const { validateBody } = require("../services/validateBody");
const { charge } = require("../logic/chargeLogic");
const { retry } = require("../utils/retry");
const { attemptsToRetry, businessErrorMsg } = require("../consts/consts");

const router = express.Router();

router.post("/charge", async (req, res) => {
  try {
    if (validateBody(req.body)) {
      try {
        const chargeResponse = await retry(
          async () => charge(req.body),
          attemptsToRetry
        );

        if (chargeResponse) {
          return res.status(200).send({});
        } else if (chargeResponse === false) {
          return res.status(200).send({ error: businessErrorMsg });
        } else {
          throw new Error("unexpected server error");
        }
      } catch (err) {
        throw err;
      }
    } else {
      return res.status(400).send({});
    }
  } catch (err) {
    return res.status(500).send({});
  }
});

module.exports = router;
