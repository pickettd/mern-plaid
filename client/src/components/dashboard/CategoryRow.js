import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveUserBudget, saveUserCategoryMap } from "../../actions/authActions";

class CategoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultBudget: 0,
      localBudgets: {},
      defaultCategory: '',
      localCategoryMap: {}
    };
  }

  onCategoryMapChange = (categoryName,e) => {
    const newCatMap = {...this.state.localCategoryMap};
    let newName = e.target.value.trim();
    newCatMap[categoryName] = newName;
    this.setState({localCategoryMap: newCatMap});
  }

  onCategoryMapSaveClick = (categoryName,e) => {
    e.preventDefault();
    const catMapData = {
      userId: this.props.user.id,
      bankCategoryName: categoryName,
      newCategoryName: this.state.localCategoryMap[categoryName]
    };
    if (catMapData.newCategoryName === undefined) {
      catMapData.newCategoryName = this.props.categoryMap[this.props.category.bankName];
    }
    this.props.saveUserCategoryMap(catMapData);
  };

  onBudgetChange = (categoryName,e) => {
    const newBudgets = {...this.state.localBudgets};
    let newAmount = e.target.value;
    if (newAmount.charAt(0) === '$') {
      newAmount = newAmount.substr(1);
    }
    newBudgets[categoryName] = newAmount;
    this.setState({localBudgets: newBudgets});
  }

  onBudgetSaveClick = (categoryName,e) => {
    e.preventDefault();
    const budgetData = {
      budgetName: categoryName,
      budgetAmount: this.state.localBudgets[categoryName]
    };
    if (budgetData.budgetAmount === undefined) {
      budgetData.budgetAmount = this.props.budgets[this.props.category.name];
    }
    this.props.saveUserBudget(budgetData);
  };

  render() {
    const { category, budgets, categoryMap, spendingByCategory } = this.props;
    const { defaultBudget, defaultCategory } = this.state;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    if ((category.bankName !== 'Transfer')&&(category.bankName !== 'Payment')) {
      return (
      <tr key={category.bankName}>
        <td>{category.bankName}</td>
        <td>
        {(categoryMap) && (categoryMap[category.bankName]) ? (
            <input onChange={this.onCategoryMapChange.bind(this,category.bankName)} defaultValue={categoryMap[category.bankName]}></input>
          ) : (
            <input onChange={this.onCategoryMapChange.bind(this,category.bankName)} defaultValue={defaultCategory}></input>
          )}
        <button
          onClick={this.onCategoryMapSaveClick.bind(this,category.bankName)}
          className="btn-flat blue lighten-2 waves-effect"
        >
          Save
        </button>
        </td>
        <td>
          {(budgets) && (budgets[category.bankName]) ? (
            <input onChange={this.onBudgetChange.bind(this,category.bankName)} defaultValue={currencyFormatter.format(budgets[category.bankName])}></input>
          ) : (
            <input onChange={this.onBudgetChange.bind(this,category.bankName)} defaultValue={currencyFormatter.format(defaultBudget)}></input>
          )}
        <button
          onClick={this.onBudgetSaveClick.bind(this,category.bankName)}
          className="btn-flat blue lighten-2 waves-effect"
        >
          Save
        </button>
        </td>
        <td>{currencyFormatter.format(spendingByCategory[category.bankName])}</td>
      </tr>
      )
    }
    else {
      return <></>
    }
  }
}
CategoryRow.propTypes = {
  budgets: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  categoryMap: PropTypes.object.isRequired,
  spendingByCategory: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budgets: state.auth.budgets,
  categoryMap: state.auth.categoryMap
});

export default connect(
  mapStateToProps,
  { saveUserBudget, saveUserCategoryMap }
)(CategoryRow);