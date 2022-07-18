const port = "8000";
const businessErrorMsg = "Card declined";
const attemptsToRetry = 3;

const cardCompaniesData = {
  visa: {
    url: "https://interview.riskified.com/visa/api/chargeCard",
    requestBodyFormat: (req) => {
      return {
        fullName: req.fullName,
        number: req.creditCardNumber,
        expiration: req.expirationDate,
        cvv: req.cvv,
        totalAmount: req.amount,
      };
    },
    readResponse: (res) => {
      return res?.data?.chargeResult === "Success";
    },
  },
  mastercard: {
    url: "https://interview.riskified.com/mastercard/capture_card",
    requestBodyFormat: (req) => {
      const nameSliceIndex = req.fullName.lastIndexOf(" ");
      return {
        first_name: req.fullName.slice(0, nameSliceIndex),
        last_name: req.fullName.slice(nameSliceIndex + 1),
        card_number: req.creditCardNumber,
        expiration: req.expirationDate.replace("/", "-"),
        cvv: req.cvv,
        charge_amount: req.amount,
      };
    },
    readResponse: (res) => {
      return res?.status === 200 ? true : res?.status === 400 ? false : null;
    },
  },
};

const expirationDatePattern = /(0?[1-9]|1[012])[/]\d{2}$/;

const validBody = {
  fullName: (value) => {
    return typeof value === "string";
  },
  creditCardNumber: (value) => {
    return typeof value === "string";
  },
  creditCardCompany: (value) => {
    return typeof value === "string" && cardCompaniesData[value] !== null;
  },
  expirationDate: (value) => {
    return typeof value === "string" && expirationDatePattern.test(value);
  },
  cvv: (value) => {
    return typeof value === "string";
  },
  amount: (value) => {
    return !isNaN(parseFloat(value));
  },
};

module.exports = {
  port,
  validBody,
  cardCompaniesData,
  businessErrorMsg,
  attemptsToRetry,
};
