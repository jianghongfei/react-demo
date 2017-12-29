import React from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { Icon } from 'antd';
import GlobalFooter from '../../components/GlobalFooter';

import logo from '../../logo.svg';

import Login from './Login';
import Register from './Register';

import styles from './User.less';

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>;


const User = ({ match }) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <div className={styles.header}>
        <Link to="/">
          <img alt="logo" className={styles.logo} src={logo} />
          <span className={styles.title}>Ant Design</span>
        </Link>
      </div>
      <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <Route exact path={`${match.url}/login`} component={Login} />
    <Route exact path={`${match.url}/register`} component={Register} />
    <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
  </div>
);

User.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default User;
