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

    if ((category.name !== 'Transfer')&&(category.name !== 'Payment')) {
      return (
      <tr key={category.name}>
        <td>{category.name}</td>
        <td>
        {(categoryMap) && (categoryMap[category.name]) ? (
            <input onChange={this.onCategoryMapChange.bind(this,category.name)} defaultValue={categoryMap[category.name]}></input>
          ) : (
            <input onChange={this.onCategoryMapChange.bind(this,category.name)} defaultValue={defaultCategory}></input>
          )}
        <button
          onClick={this.onCategoryMapSaveClick.bind(this,category.name)}
          className="btn-flat blue lighten-2 waves-effect"
        >
          Save
        </button>
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