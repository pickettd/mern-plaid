import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveUserBudget } from "../../actions/authActions";

class CategoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultBudget: 0,
      budgets: {}
    };
  }

  onBudgetChange = (categoryName,e) => {
    const newBudgets = {...this.state.budgets};
    let newAmount = e.target.value;
    if (newAmount.charAt(0) === '$') {
      newAmount = newAmount.substr(1);
    }
    newBudgets[categoryName] = newAmount;
    this.setState({budgets: newBudgets});
  }

  onBudgetSaveClick = (categoryName,e) => {
    e.preventDefault();
    const budgetData = {
      budgetName: categoryName,
      budgetAmount: this.state.budgets[categoryName]
    };
    this.props.saveUserBudget(budgetData);
  };

  render() {
    const { category, budgets, categoryMap, spendingByCategory } = this.props;
    const { defaultBudget } = this.state;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    if ((category.name !== 'Transfer')&&(category.name !== 'Payment')) {
      return (
      <tr key={category.name}>
        <td>{category.name}</td>
        <td>
        {(categoryMap) && (categoryMap[category.name]) ? (
          <input defaultValue={categoryMap[category.name]}></input>
        ): (
          <input defaultValue={category.name}></input>
        )}
        <button className="btn-flat blue lighten-2 waves-effect">Save</button>
        </td>
        <td>
          {(budgets) && (budgets[category.name]) ? (
            <input onChange={this.onBudgetChange.bind(this,category.name)} defaultValue={currencyFormatter.format(budgets[category.name])}></input>
          ) : (
            <input onChange={this.onBudgetChange.bind(this,category.name)} defaultValue={currencyFormatter.format(defaultBudget)}></input>
          )}
        <button
          onClick={this.onBudgetSaveClick.bind(this,category.name)}
          className="btn-flat blue lighten-2 waves-effect"
        >
          Save
        </button>
        </td>
        <td>{currencyFormatter.format(spendingByCategory[category.name])}</td>
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
  spendingByCategory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budgets: state.auth.budgets
});

export default connect(
  mapStateToProps,
  { saveUserBudget }
)(CategoryRow);