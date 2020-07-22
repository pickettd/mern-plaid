import React from 'react';
import {Link} from 'react-router-dom';

const SpendStory = () => {
  return <>
    <div>
      <span>This is the Spend Story</span>
      <ul>
        <li>
          <Link to="/manage-transactions">Manage Transactions</Link>
        </li>
        <li>
          <Link to="/spend-plan">Spend Plan</Link>
        </li>
      </ul>
    </div>
  </>
}

export default SpendStory