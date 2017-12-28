import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout, Icon } from 'antd';

import About from './About';
import Topics from './Topics';
import Dashboard from './Dashboard';

import styles from './Home.less';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
  };

  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
    this.triggerResizeEvent();
  };

  /* eslint-disable */
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  /* eslint-enable */

  render() {
    const { collapsed } = this.props;
    const {
      Footer,
      Header,
      Sider,
      Content,
    } = Layout;

    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={this.onCollapse}
          width={256}
          className={styles.sider}
        >
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><a href="/user/login">User</a></li>
          </ul>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            Header
          </Header>
          <Content>
            <Route exact path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>);
  }
}

export default connect(store => ({
  collapsed: store.global.collapsed,
}))(Home);
