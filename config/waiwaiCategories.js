// Mapping idea one (for now just work with 2 levels of category - main and sub)
// The wildcard character is always checked last to find the category
const plaidToWaiwaiMapping = {
  "Bank Fees": {
    "*": "Debt",
  },
  Recreation: {
    "*": "Entertainment",
  },
  Community: {
    Education: "Education",
    "Assisted Living Services": "Insurance & Healthcare",
    "Disabled Persons Services": "Insurance & Healthcare",
    "Day Care and Preschools": "Child Care",
    "*": "Entertainment",
  },
  "Food and Drink": {
    "*": "Food",
  },
  Healthcare: {
    "*": "Insurance & Healthcare",
  },
  Interest: {
    // Note - income one could be a little strange
    "Interest Earned": "Income",
    "*": "Debt",
  },
  Payment: {
    Rent: "Housing",
    "*": "Debt",
  },
  Service: {
    Utilities: "Utilities",
    "Telecommunication Service": "Utilities",
    Rent: "Housing",
    "Home Improvement": "Housing",
    Construction: "Housing",
    Financial: "Debt",
    Entertainment: "Entertainment",
    Recreation: "Entertainment",
    "*": "Personal",
  },
  Shops: {
    "Supermarkets and Groceries": "Food",
    Pharmacies: "Insurance & Healthcare",
    "Hardware Store": "Housing",
    "Construction Supplies": "Housing",
    Automotive: "Transportation",
    "*": "Personal",
  },
  Tax: {
    // Note - income one could be a little strange
    Refund: "Income",
    "*": "Debt",
  },
  Transfer: {
    // Note - income one could be a little strange
    Deposit: "Income",
    // Note - income one could be a little strange
    Credit: "Income",
    Billpay: "Utilities",
    "*": "Personal",
  },
  Travel: {
    Lodging: "Personal",
    Cruises: "Personal",
    "*": "Transportation",
  },
};

const tranlateFunc = (plaidCatA, plaidCatB) => {
  let returnString = "";
  let catMapObj = {};
  // If the main plaid category string exists and it is in the mapping,
  // then assign the object to check the sub category
  if (plaidCatA && plaidToWaiwaiMapping[plaidCatA]) {
    catMapObj = plaidToWaiwaiMapping[plaidCatA];
  }
  // If the main plaid category doesn't exist or it is not in the mapping, just return
  else {
    return plaidCatA;
  }

  // If there is a plaid sub category and it is in the mapping, use the result mapping
  if (plaidCatB && catMapObj[plaidCatB]) {
    returnString = catMapObj[plaidCatB];
  }
  // Otherwise if there is no sub category or the sub category isn't in the map, just return
  // the wildcard mapping
  else {
    returnString = catMapObj["*"];
  }
  return returnString;
};

module.exports = function translatePlaidCategoriesToWaiwai(plaidCategories) {
  let returnCategories = [];
  let optionalPlaidSubCategory = "";
  if (plaidCategories && plaidCategories.length > 0) {
    if (plaidCategories.length > 1) {
      optionalPlaidSubCategory = plaidCategories[1];
    }
    let mainWaiwaiCategory = tranlateFunc(
      plaidCategories[0],
      optionalPlaidSubCategory
    );
    returnCategories = [mainWaiwaiCategory, optionalPlaidSubCategory];
  }
  return returnCategories;
};
