import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return <>
    <div>
      <Link to='/'>(Icon)|</Link>
      <Link to='/spend-story'>spend|</Link>
      save|
      borrow|
      plan|
      ||
      ohana (Toggle) personal| 
      (Profile)
    </div>
  </>
}

export default Header