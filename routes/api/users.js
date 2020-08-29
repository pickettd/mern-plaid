const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const checkJwt = require("../../config/checkJwt-Auth0");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateBudgetInput = require("../../validation/budget");
const validateNewTransactionCategoryInput = require("../../validation/newTransactionCategory");

// Load User model
const User = require("../../models/User");

// Note this does not save the new user because it will be saved in the calling function
const findOrCreateUser = (userId) => {
  return User.findById(userId).then((user) => {
    if (user) {
      return user;
    } else {
      const newUser = new User({
        _id: userId,
      });
      return newUser; //.save().catch((err) => console.log(err));
    }
  });
};

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          categoryMap: user.categoryMap,
          budgets: user.budgets,
          categoryOverridePatterns: user.categoryOverridePatterns,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/users/budget
// @desc Set budget object
// @access Private
router.post("/budgets", checkJwt, (req, res) => {
  const reqUserId = req.user.sub;
  //const userId = req.user.id;
  // Form validation

  const { errors, isValid } = validateBudgetInput(req.body);

  // Check validation
  if (!isValid) {
    console.log("budget request not valid");
    return res.status(400).json(errors);
  }

  const budgetName = req.body.budgetName;
  const budgetAmount = req.body.budgetAmount;
  const expenseBudgetSum = req.body.expenseBudgetSum;

  findOrCreateUser(reqUserId).then((user) => {
    if (!user.budgets) {
      user.budgets = new Map();
    }
    user.expenseBudgetSum = expenseBudgetSum;
    user.budgets.set(budgetName, budgetAmount);
    return user
      .save()
      .then((user) => {
        return res.json({
          userId: reqUserId,
          budgets: user.budgets,
          expenseBudgetSum: user.expenseBudgetSum,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// @route POST api/users/new-transaction-category
// @desc Set new category in transaction settings object
// @access Private
router.post("/new-transaction-category", checkJwt, (req, res) => {
  //const userId = req.user.id;
  const reqUserId = req.user.sub;
  // Form validation

  const { errors, isValid } = validateNewTransactionCategoryInput(req.body);

  // Check validation
  if (!isValid) {
    console.log("NewTransactionCategory request not valid");
    return res.status(400).json(errors);
  }

  const transactionID = req.body.transactionID;
  const newCategoryName = req.body.newCategoryName;

  User.findById(userId).then((user) => {
    if (!user.perTransactionSettings) {
      user.perTransactionSettings = new Map();
      user.perTransactionSettings.set(transactionID, { userCategories: [] });
    }
    const transactionSettings = user.perTransactionSettings.get(transactionID);
    transactionSettings.userCategories.push(newCategoryName);
    user.perTransactionSettings.set(transactionID, transactionSettings);
    user
      .save()
      .then((user) => {
        res.json({
          userId: userId,
          perTransactionSettings: user.perTransactionSettings,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// @route GET api/users/user-info
// @desc Return the user object (eg budgets and categoryMap data)
// @access Private
router.get("/user-info", checkJwt, (req, res) => {
  //const userId = req.user.id;
  const reqUserId = req.user.sub;

  User.findById(reqUserId)
    .then((user) => {
      if (!user.budgets) {
        user.budgets = {};
      }
      const returnUser = {
        id: user.id,
        budgets: user.budgets,
        expenseBudgetSum: user.expenseBudgetSum,
      };
      res.json(returnUser);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
