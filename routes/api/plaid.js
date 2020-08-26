const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");

const checkJwt = require("../../config/checkJwt-Auth0");

// Load Account and User models
const Account = require("../../models/Account");
const User = require("../../models/User");

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY;
const PLAID_ENV_STRING = process.env.REACT_APP_PLAID_ENV_STRING || "sandbox";

var PLAID_ENVIRONMENT = null;
if (PLAID_ENV_STRING == "production") {
  PLAID_ENVIRONMENT = plaid.environments.production;
} else if (PLAID_ENV_STRING == "development") {
  PLAID_ENVIRONMENT = plaid.environments.development;
} else {
  PLAID_ENVIRONMENT = plaid.environments.sandbox;
}

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  PLAID_ENVIRONMENT,
  { version: "2018-05-22" }
);

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// Auth0 version of get accounts
// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get("/accounts", checkJwt, (req, res) => {
  Account.find({ userId: req.user.sub })
    .then((accounts) => {
      if (accounts && accounts.length == 0) {
        res.status(400).send("No accounts found");
      } else {
        res.json(accounts);
      }
    })
    .catch((err) => console.log(err));
});

// Auth0 version of add account
// @route POST api/plaid/accounts/add
// @desc Trades public token for access token and stores credentials in database
// @access Private
router.post("/accounts/add", checkJwt, (req, res) => {
  PUBLIC_TOKEN = req.body.public_token;

  const reqUserId = req.user.sub;

  const institution = req.body.metadata.institution;
  const { name, institution_id } = institution;

  if (PUBLIC_TOKEN) {
    client
      .exchangePublicToken(PUBLIC_TOKEN)
      .then((exchangeResponse) => {
        ACCESS_TOKEN = exchangeResponse.access_token;
        ITEM_ID = exchangeResponse.item_id;

        // Check if account already exists for specific user
        Account.findOne({
          userId: reqUserId,
          institutionId: institution_id,
        })
          .then((account) => {
            if (account) {
              console.log("Account already exists");
            } else {
              const newAccount = new Account({
                userId: reqUserId,
                accessToken: ACCESS_TOKEN,
                itemId: ITEM_ID,
                institutionId: institution_id,
                institutionName: name,
              });

              newAccount.save().then((account) => res.json(account));
            }
          })
          .catch((err) => console.log(err)); // Mongo Error
      })
      .catch((err) => console.log(err)); // Plaid Error
  }
});

// @route POST api/plaid/accounts/:id
// @desc Refresh the token
// @access Private
router.post(
  "/accounts/refresh/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const institution = req.body.metadata.institution;
    const { name, institution_id } = institution;
    Account.findOne({
      userId: req.user.id,
      institutionId: institution_id,
    })
      .then((account) => {
        if (account) {
          account.toRefresh = false;
          account.save();
        } else {
          console.log("could not find account to refresh");
        }
        res.json(account);
      })
      .catch((err) => console.log(err)); // Mongo Error
  }
);

// @route DELETE api/plaid/accounts/:id
// @desc Delete account with given id
// @access Private
router.delete(
  "/accounts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then((account) => {
      // Delete account
      account.remove().then(() => res.json({ success: true }));
    });
  }
);

// Auth0 version of get accounts
// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post("/accounts/transactions", checkJwt, (req, res) => {
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  let transactions = [];
  let needUpdate = [];
  let accountPromises = [];

  const accounts = req.body;

  if (accounts) {
    accounts.forEach(function (account) {
      ACCESS_TOKEN = account.accessToken;
      const institutionName = account.institutionName;
      accountPromises.push(
        client
          .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
          .then(
            (response) => {
              transactions.push({
                accountName: institutionName,
                transactions: response.transactions,
              });
              // We want to handle the case of item_login_required here
            },
            (reject) => {
              if (reject && reject.error_code === "ITEM_LOGIN_REQUIRED") {
                return client
                  .createPublicToken(ACCESS_TOKEN)
                  .then((tokenResponse) => {
                    return Account.findOne({ itemId: account.itemId }).then(
                      (foundAccount) => {
                        foundAccount.toRefresh = true;
                        foundAccount.publicToken = tokenResponse.public_token;
                        needUpdate.push(foundAccount);
                        console.log(
                          "found an account that needs refresh and got the token for it"
                        );
                        console.log(foundAccount);
                        return foundAccount.save().then(() => {
                          return foundAccount;
                        });
                      }
                    );
                  });
              } else {
                // If it is not the error above, then reject
                return new Error(reject);
              }
            }
          )
          .catch((err) => {
            console.log(err);
          })
      );
    });
    Promise.allSettled(accountPromises).then(() => {
      // If there are any transactions or accounts, respond with them, otherwise error
      if (transactions.length || needUpdate.length) {
        res.json({ transactions: transactions, needUpdate: needUpdate });
      } else {
        res.status(400).send({ message: "This is an error!" });
      }
    });
  }
});

module.exports = router;
