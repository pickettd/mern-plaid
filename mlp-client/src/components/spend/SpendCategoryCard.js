import React from "react";
import { connect } from "react-redux";
import { noDecimalCurrencyFormatter } from "../../utils/currencyFormatter";
import percentFormatter from "../../utils/percentFormatter";
import foodLogo from "../../img/spend-plan/food-background.svg";
import transportationLogo from "../../img/spend-plan/transportation.svg";
import giftsLogo from "../../img/spend-plan/gifts.svg";
import entertainmentLogo from "../../img/spend-plan/entertainment.svg";
import personalLogo from "../../img/spend-plan/personal.svg";
import questionMarkLogo from "../../img/spend-plan/question_mark.svg";

const SpendCategoryCard = (props) => {
  const budgetAmount = props.budgetAmount;
  const spentAmount = props.spentAmount;

  let mainValueDisplay = "";
  let subValueDisplay = "";
  let colorBackgroundClass = "";
  let thisCategoryLogo = questionMarkLogo;

  if (props.categoryName === "Food and Drink") {
    thisCategoryLogo = foodLogo;
  }
  if (props.categoryName === "Travel") {
    thisCategoryLogo = transportationLogo;
  }
  if (props.categoryName === "Shops") {
    thisCategoryLogo = giftsLogo;
  }
  if (props.categoryName === "Recreation") {
    thisCategoryLogo = entertainmentLogo;
  }
  if (props.categoryName === "Personal") {
    thisCategoryLogo = personalLogo;
  }
  if (props.underBudget) {
    colorBackgroundClass = "dark-green-background";
    mainValueDisplay = noDecimalCurrencyFormatter.format(
      budgetAmount - spentAmount
    );
    if (budgetAmount !== 0) {
      subValueDisplay = percentFormatter.format(spentAmount / budgetAmount);
    }
  } else {
    // this is an over budget category
    colorBackgroundClass = "brown-yellow-background";
    subValueDisplay = noDecimalCurrencyFormatter.format(spentAmount);
    if (budgetAmount !== 0) {
      mainValueDisplay = percentFormatter.format(spentAmount / budgetAmount);
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
        <div className="card-description">graph</div>
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