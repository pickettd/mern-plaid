import { SET_TRANSACTION_DATA } from "../actions/types";
import {
  defaultCategoriesThisSpendRange,
  defaultSpendingByCategory,
} from "./waiwaiCategories.js";

// These are just listed for reference purposes right now (what the server sends)
//const varStringServerSetMainCat = "category[0]";
//const varStringMainPlaidCat = "plaid_categories[0]";
//const varStringMainWaiwaiCat = "waiwai_categories[0]";

export const updateSortedCategories = (
  categoriesThisSpendRange,
  spendingByCategory,
  budgets
) => {
  const returnUnderBudgets = [];
  const returnOverBudgets = [];
  const arrayToSort = [...categoriesThisSpendRange];

  arrayToSort.sort(function (a, b) {
    const aSpend = spendingByCategory[a.name] / budgets[a.name];
    const bSpend = spendingByCategory[b.name] / budgets[b.name];
    return aSpend - bSpend;
  });

  arrayToSort.forEach((category) => {
    if (spendingByCategory[category.name] / budgets[category.name] <= 1) {
      returnUnderBudgets.push(category.name);
    } else {
      returnOverBudgets.push(category.name);
    }
  });
  return { underBudgets: returnUnderBudgets, overBudgets: returnOverBudgets };
};

// NOTE: this is not the redux way, this should be designed differently in next refactor
export const processTransactionList = (transactions, budgets) => (dispatch) => {
  const payloadObject = {};
  let totalTransactionCount = 0;
  let reviewedTransactionCount = 0;
  let paycheckSum = 0;
  let otherIncomeSum = 0;

  let income = 0;
  let spending = 0;
  const spendingByCategory = { ...defaultSpendingByCategory };
  const categoriesThisSpendRange = [...defaultCategoriesThisSpendRange];
  let categoryCount = 1;
  //const spendingByDate = {};
  //const datesLastThirty = [];
  //const dateNow = new Date();
  if (transactions && transactions.length) {
    transactions.forEach(function (account) {
      account.transactions.forEach(function (transaction) {
        let serverSetCategory = transaction.category[0];
        let waiwaiMainCategory = transaction.waiwai_categories[0];
        let plaidMainCategory = transaction.plaid_categories[0];

        // Note that we should check for transactions marked duplicate
        if (!transaction.isDuplicate) {
          // By default, the plaid transactions are positive for spent money and negative for earned money - so we reverse that
          transaction.amount *= -1;
          /*if (
          serverSetCategory !== "Transfer" &&
          serverSetCategory !== "Payment"
        ) {*/
          totalTransactionCount++;
          // NOTE: none of our transactions from the API will have these right now
          //--------------------------------------------------------------------
          if (transaction.isReviewed) {
            reviewedTransactionCount++;
          }
          // Income is done later in income section
          /*if (transaction.category[1] === "Paycheck") {
            paycheckSum += transaction.amount;
          }
          if (transaction.category[1] === "Other Income") {
            otherIncomeSum += transaction.amount;
          }*/
          //--------------------------------------------------------------------
          //profit += transaction.amount;
          if (transaction.amount < 0) {
            spending += -1 * transaction.amount;

            // This if/else sets up the spending category object with category as key and amount total as value
            // Note that we have to check if undefined (because expense of 0 would be falsey)
            if (spendingByCategory[serverSetCategory] !== undefined) {
              spendingByCategory[serverSetCategory] += -1 * transaction.amount;
            } else {
              // This is the case that the category hasn't been seen before
              // And that means this shouldn't happen anymore (all categories loaded by default)
              categoriesThisSpendRange.push({
                x: categoryCount,
                waiwaiName: waiwaiMainCategory,
                plaidName: plaidMainCategory,
                name: serverSetCategory,
              });
              categoryCount++;
              spendingByCategory[serverSetCategory] = -1 * transaction.amount;
            }

            /* Don't think we need spending by date in mlp
            // This if/else sets up the spending date object with date as key and amount total as value
            if (spendingByDate[transaction.date]) {
              spendingByDate[transaction.date] += -1 * transaction.amount;
            } else {
              // This is the case that the date hasn't been seen before
              spendingByDate[transaction.date] = -1 * transaction.amount;
            }*/
          } else {
            income += transaction.amount;
            if (transaction.category[0] === "Income - Paycheck") {
              paycheckSum += transaction.amount;
            } else {
              otherIncomeSum += transaction.amount;
            }
          }
        }
      });
    });

    /* Don't think we need spending by date in mlp
    for (let a = 30; a > 0; a--) {
      let insertDate = new Date(Number(dateNow));
      insertDate.setDate(insertDate.getDate() - a);
      let momentDate = moment(insertDate);
      let setDateSpend = 0;
      if (spendingByDate[momentDate.format("YYYY-MM-DD")]) {
        setDateSpend = spendingByDate[momentDate.format("YYYY-MM-DD")];
      }
      datesLastThirty.push({
        x: momentDate.format("MM-DD"),
        y: setDateSpend,
      });
    }*/
    // Then need to generate new data we didn't calculate before
    const sortedCategories = updateSortedCategories(
      categoriesThisSpendRange,
      spendingByCategory,
      budgets
    );
    payloadObject.incomeSum = income;
    payloadObject.spendingSum = spending;
    payloadObject.totalTransactionCount = totalTransactionCount;

    payloadObject.categoriesThisSpendRange = categoriesThisSpendRange;
    payloadObject.spendingByCategory = spendingByCategory;

    payloadObject.sortedCategoriesOverBudget = sortedCategories.overBudgets;
    payloadObject.sortedCategoriesUnderBudget = sortedCategories.underBudgets;

    // NOTE this is being set to zero right now
    //--------------------------------------------------------------------
    payloadObject.paycheckSum = paycheckSum;
    payloadObject.otherIncomeSum = otherIncomeSum;
    payloadObject.reviewedTransactionCount = reviewedTransactionCount;
    //--------------------------------------------------------------------
  }
  dispatch({
    type: SET_TRANSACTION_DATA,
    payload: payloadObject,
  });
};
