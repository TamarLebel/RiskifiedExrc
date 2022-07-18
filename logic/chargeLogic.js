const axios = require("axios");
const { cardCompaniesData } = require("../consts/consts");

const charge = async (req) => {
  const cardCompanyData = cardCompaniesData[req.creditCardCompany];
  try {
    const res = await axios.post(
      cardCompanyData.url,
      cardCompanyData.requestBodyFormat(req),
      {
        headers: { identifier: "Tamar" },
      }
    );

    return cardCompanyData.readResponse(res);
  } catch (err) {
    return cardCompanyData.readResponse(err.response);
  }
};

module.exports = { charge };
