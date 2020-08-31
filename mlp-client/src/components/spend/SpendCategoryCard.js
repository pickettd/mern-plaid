import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { noDecimalCurrencyFormatter } from "../../utils/currencyFormatter";
import percentFormatter from "../../utils/percentFormatter";
import childCareLogo from "../../img/spend-plan/childcare.svg";
// No categories that match this yet
//import crossLogo from "../../img/spend-plan/cross.svg";
import debtLogo from "../../img/spend-plan/debt.svg";
// Looks like the dollar logo is black line art instead of white like the others
import dollarLogo from "../../img/spend-plan/dollar-sign.svg";
import educationLogo from "../../img/spend-plan/education.svg";
import entertainmentLogo from "../../img/spend-plan/entertainment.svg";
import foodLogo from "../../img/spend-plan/food-background.svg";
// No categories that match this yet
//import giftsLogo from "../../img/spend-plan/gifts.svg";

// Looks like the healthcareLogo is black line art instead of white like the others
//import healthcareLogo from "../../img/spend-plan/healthcare.svg";
// No categories that match this yet
//import healthLogo from "../../img/spend-plan/health.svg";
import housingLogo from "../../img/spend-plan/housing.svg";
import insuranceLogo from "../../img/spend-plan/insurance.svg";
import miscellaneousLogo from "../../img/spend-plan/miscellaneous.svg";
import personalLogo from "../../img/spend-plan/personal.svg";
import savingsLogo from "../../img/spend-plan/savings.svg";
import transportationLogo from "../../img/spend-plan/transportation.svg";
import utilitiesLogo from "../../img/spend-plan/utilities.svg";
// Looks like the wallet logo is black line art instead of white like the others
//import walletLogo from "../../img/spend-plan/wallet.svg";

const SpendCategoryCard = (props) => {
  let budgetAmount = 0;
  let spentAmount = 0;
  let percentageNumber = 0;
  let mainValueDisplay = "";
  let subValueDisplay = "";
  let colorBackgroundClass = "";
  let thisCategoryLogo = miscellaneousLogo;

  if (props.budgetAmount) {
    budgetAmount = props.budgetAmount;
  }
  if (props.spentAmount) {
    spentAmount = props.spentAmount;
  }

  if (budgetAmount !== 0) {
    percentageNumber = spentAmount / budgetAmount;
  }

  if (props.categoryName === "Income") {
    thisCategoryLogo = dollarLogo;
  }
  if (props.categoryName === "Housing") {
    thisCategoryLogo = housingLogo;
  }
  if (props.categoryName === "Transportation") {
    thisCategoryLogo = transportationLogo;
  }
  if (props.categoryName === "Food") {
    thisCategoryLogo = foodLogo;
  }
  if (props.categoryName === "Utilities") {
    thisCategoryLogo = utilitiesLogo;
  }
  // Note there are two possible logos here
  if (props.categoryName === "Insurance & Healthcare") {
    thisCategoryLogo = insuranceLogo;
  }
  if (props.categoryName === "Debt") {
    thisCategoryLogo = debtLogo;
  }
  if (props.categoryName === "Personal") {
    thisCategoryLogo = personalLogo;
  }
  if (props.categoryName === "Education") {
    thisCategoryLogo = educationLogo;
  }
  if (props.categoryName === "Child Care") {
    thisCategoryLogo = childCareLogo;
  }
  if (props.categoryName === "Savings") {
    thisCategoryLogo = savingsLogo;
  }
  if (props.categoryName === "Entertainment") {
    thisCategoryLogo = entertainmentLogo;
  }
  if (props.underBudget) {
    colorBackgroundClass = "dark-green-background";
    mainValueDisplay = noDecimalCurrencyFormatter.format(
      budgetAmount - spentAmount
    );
    if (budgetAmount !== 0 || spentAmount === 0) {
      subValueDisplay = percentFormatter.format(percentageNumber);
      percentageNumber *= 100;
    } else {
      subValueDisplay = "--";
    }
  } else {
    // this is an over budget category
    colorBackgroundClass = "brown-yellow-background";
    subValueDisplay = noDecimalCurrencyFormatter.format(spentAmount);
    if (budgetAmount !== 0 || spentAmount === 0) {
      mainValueDisplay = percentFormatter.format(percentageNumber);
      percentageNumber *= 100;
    } else {
      mainValueDisplay = "--";
    }
  }

  const budgetAmountDisplay = noDecimalCurrencyFormatter.format(budgetAmount);

  return (
    <div className="card card-blog">
      <div className={"card-image " + colorBackgroundClass}>
        <img className="img " alt="Category Name" src={thisCategoryLogo} />
        <div className="card-img-overlay">
          <h5>{props.categoryName}</h5>
        </div>
      </div>
      <div className="card-body text-center">
        <h4 className="card-title text-left">
          {mainValueDisplay}
          <span className="small bottom">
            <br />
            {props.underBudget ? "Available" : "Spent"}
          </span>
        </h4>
        <div className="card-description">
          <ProgressBar
            now={props.underBudget ? percentageNumber : 100}
            variant={props.underBudget ? "success" : "warning"}
          />
        </div>
        <div className="card-footer">
          <div className="row mt-3">
            <div className="col">
              <p className=" text-left">
                {budgetAmountDisplay}
                <span className="small bottom">
                  <br />
                  Budget
                </span>
              </p>
            </div>
            <div className="col">
              <p className=" text-left">
                {subValueDisplay}
                <span className="small bottom">
                  <br />
                  Spent
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  categoryMap: state.auth.categoryMap,
  spendingByCategory: state.plaid.spendingByCategory,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendCategoryCard);
