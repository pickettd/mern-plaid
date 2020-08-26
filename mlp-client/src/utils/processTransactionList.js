import { SET_TRANSACTION_DATA } from "../actions/types";

const varStringDefaultMainPlaidCat = "category[0]";
const varStringMainPlaidCat = "plaid_categories[0]";
const varStringMainWaiwaiCat = "waiwai_categories[0]";

// NOTE: this is not the redux way, this should be designed differently in next refactor
const processTransactionList = (transactions, budgets) => (dispatch) => {
  // This payloadObject is what the demo data looks like right now
  const payloadObject = {
    /*incomeSum: 1001,
    paycheckSum: 500,
    otherIncomeSum: 500,
    spendingSum: 4391.92,
    totalTransactionCount: 50,
    reviewedTransactionCount: 45,
    categoriesThisSpendRange: [
      { bankName: "Food and Drink", x: 1, name: "" },
      { bankName: "Shops", x: 2, name: "" },
      { bankName: "Travel", x: 3, name: "" },
      { bankName: "Recreation", x: 4, name: "" },
      { bankName: "Personal", x: 5, name: "" },
    ],
    spendingByCategory: {
      "Food and Drink": 2211.46,
      Shops: 1000,
      Travel: 10233.46,
      Recreation: 157,
      Personal: 50,
    },
    sortedCategoriesUnderBudget: ["Personal"],
    sortedCategoriesOverBudget: [
      "Food and Drink",
      "Recreation",
      "Shops",
      "Travel",
    ],*/
  };
  let sortedCategoriesUnderBudget = [];
  let sortedCategoriesOverBudget = [];
  let totalTransactionCount = 0;
  let reviewedTransactionCount = 0;
  let paycheckSum = 0;
  let otherIncomeSum = 0;

  //let profit = 0;
  let income = 0;
  let spending = 0;
  const spendingByCategory = {};
  const categoriesThisSpendRange = [];
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
        /*if (user.categoryMap && user.categoryMap[transaction.category[0]]) {
          displayCategory = user.categoryMap[transaction.category[0]];
        }*/
        // By default, the plaid transactions are positive for spent money and negative for earned money - so we reverse that
        transaction.amount *= -1;
        if (
          serverSetCategory !== "Transfer" &&
          serverSetCategory !== "Payment"
        ) {
          totalTransactionCount++;
          // NOTE: none of our transactions from the API will have these right now
          //--------------------------------------------------------------------
          if (transaction.reviewed) {
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
            if (spendingByCategory[serverSetCategory]) {
              spendingByCategory[serverSetCategory] += -1 * transaction.amount;
            } else {
              // This is the case that the category hasn't been seen before
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
            if (transaction.category[1] === "Paycheck") {
              paycheckSum += transaction.amount;
            } else {
              otherIncomeSum += transaction.amount;
            }
          }
        }

        /*transactionsData.push({
          account: account.accountName,
          date: transaction.date,
          category: displayCategory,
          name: transaction.name,
          amount: currencyFormatter.format(transaction.amount),
        });*/
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
    categoriesThisSpendRange.sort(function (a, b) {
      const aSpend = spendingByCategory[a.name] / budgets[a.name];
      const bSpend = spendingByCategory[b.name] / budgets[b.name];
      return aSpend - bSpend;
    });

    categoriesThisSpendRange.forEach((category) => {
      if (spendingByCategory[category.name] / budgets[category.name] <= 1) {
        sortedCategoriesUnderBudget.push(category.name);
      } else {
        sortedCategoriesOverBudget.push(category.name);
      }
    });
    payloadObject.incomeSum = income;
    payloadObject.spendingSum = spending;
    payloadObject.totalTransactionCount = totalTransactionCount;

    payloadObject.categoriesThisSpendRange = categoriesThisSpendRange;
    payloadObject.spendingByCategory = spendingByCategory;

    payloadObject.sortedCategoriesOverBudget = sortedCategoriesOverBudget;
    payloadObject.sortedCategoriesUnderBudget = sortedCategoriesUnderBudget;

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

export default processTransactionList;
