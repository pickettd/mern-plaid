import React from "react";
import { connect } from "react-redux";
import { noDecimalCurrencyFormatter } from "../../utils/currencyFormatter";
import percentFormatter from "../../utils/percentFormatter";
import foodLogo from "../../img/spend-plan/food-background.svg";

const SpendCategoryCard = (props) => {
  const thisCategoryLogo = foodLogo;
  const budgetAmount = props.budgetAmount;
  const spentAmount = props.spentAmount;

  let mainValueDisplay = "";
  let subValueDisplay = "";
  let colorBackgroundClass = "";
  if (props.underBudget) {
    colorBackgroundClass = "dark-green-background";
    mainValueDisplay = noDecimalCurrencyFormatter.format(
      budgetAmount - spentAmount
    );
    if (budgetAmount !== 0) {
      subValueDisplay = percentFormatter.format(spentAmount / budgetAmount);
    }
  } else {
    colorBackgroundClass = "brown-yellow-background";
    subValueDisplay = noDecimalCurrencyFormatter.format(
      budgetAmount - spentAmount
    );
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
