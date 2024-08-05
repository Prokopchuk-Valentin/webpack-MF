/** @format */

import * as styles from './App.module.css';

import './App.css';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Link to={'/about'}>about</Link>
      <br />
      <Link to={'/shop'}>shop</Link>
      <br />
      <Outlet></Outlet>
    </>
  );
};

export default App;
