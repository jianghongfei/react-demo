import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import groupBy from 'lodash/groupBy';

import { Layout, Menu, Icon, Avatar, Dropdown, Tag, Spin } from 'antd';

import HeaderSearch from '../components/HeaderSearch';
import NoticeIcon from '../components/NoticeIcon';
import GlobalFooter from '../components/GlobalFooter';

import About from './About';
import Topics from './Topics';
import Dashboard from './Dashboard';

import styles from './Home.less';

const { Header, Sider, Content } = Layout;

const xxx = [{
  id: '000000001',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
  title: '你收到了 14 份新周报',
  datetime: '2017-08-09',
  type: '通知',
}, {
  id: '000000002',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
  title: '你推荐的 曲妮妮 已通过第三轮面试',
  datetime: '2017-08-08',
  type: '通知',
}, {
  id: '000000003',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
  title: '这种模板可以区分多种通知类型',
  datetime: '2017-08-07',
  read: true,
  type: '通知',
}, {
  id: '000000004',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
  title: '左侧图标用于区分不同的类型',
  datetime: '2017-08-07',
  type: '通知',
}, {
  id: '000000005',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
  title: '内容不要超过两行字，超出时自动截断',
  datetime: '2017-08-07',
  type: '通知',
}, {
  id: '000000006',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '曲丽丽 评论了你',
  description: '描述信息描述信息描述信息',
  datetime: '2017-08-07',
  type: '消息',
}, {
  id: '000000007',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '朱偏右 回复了你',
  description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  datetime: '2017-08-07',
  type: '消息',
}, {
  id: '000000008',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '标题',
  description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  datetime: '2017-08-07',
  type: '消息',
}, {
  id: '000000009',
  title: '任务名称',
  description: '任务需要在 2017-01-12 20:00 前启动',
  extra: '未开始',
  status: 'todo',
  type: '待办',
}, {
  id: '000000010',
  title: '第三方紧急代码变更',
  description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  extra: '马上到期',
  status: 'urgent',
  type: '待办',
}, {
  id: '000000011',
  title: '信息安全考试',
  description: '指派竹尔于 2017-01-09 前完成更新并发布',
  extra: '已耗时 8 天',
  status: 'doing',
  type: '待办',
}, {
  id: '000000012',
  title: 'ABCD 版本发布',
  description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  extra: '进行中',
  status: 'processing',
  type: '待办',
}];

class Home extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      userid: PropTypes.string,
      notifyCount: PropTypes.number,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    fetchingNotices: PropTypes.bool.isRequired,
    notices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      extra: PropTypes.string,
      status: PropTypes.string,
    })).isRequired,
  };

  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

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

  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      // this.props.dispatch({
      //   type: 'global/fetchNotices',
      // });

      this.props.dispatch({ type: 'global/fetchNotices' });

      new Promise((resolve) => {
        setTimeout(() => resolve({
          ok: true,
          result: xxx,
        }), 1000);
      }).then((response) => {
        this.props.dispatch({ type: 'global/requestNotesSucceed', payload: response.result });
      });
    }
  };

  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );

    const noticeData = this.getNoticeData();

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
            <div className={styles.right}>
              <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={(value) => {
                  console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={(value) => {
                  console.log('enter', value); // eslint-disable-line
                }}
              />
              <NoticeIcon
                className={styles.action}
                count={currentUser.notifyCount}
                onItemClick={(item, tabProps) => {
                  console.log(item, tabProps); // eslint-disable-line
                }}
                onClear={this.handleNoticeClear}
                onPopupVisibleChange={this.handleNoticeVisibleChange}
                loading={fetchingNotices}
                popupAlign={{ offset: [20, -16] }}
              >
                <NoticeIcon.Tab
                  list={noticeData['通知']}
                  title="通知"
                  emptyText="你已查看所有通知"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['消息']}
                  title="消息"
                  emptyText="您已读完所有消息"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['待办']}
                  title="待办"
                  emptyText="你已完成所有待办"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                />
              </NoticeIcon>
              {currentUser.name ? (
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    {currentUser.name}
                  </span>
                </Dropdown>
              ) : <Spin size="small" style={{ marginLeft: 8 }} />}
            </div>
          </Header>
          <Content>
            <Route exact path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </Content>
          <GlobalFooter
            links={[{
              title: 'Pro 首页',
              href: 'http://pro.ant.design',
              blankTarget: true,
            }, {
              title: 'GitHub',
              href: 'https://github.com/ant-design/ant-design-pro',
              blankTarget: true,
            }, {
              title: 'Ant Design',
              href: 'http://ant.design',
              blankTarget: true,
            }]}
            copyright={
              <div>
                Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
              </div>
            }
          />
        </Layout>
      </Layout>);
  }
}

export default connect(store => ({
  currentUser: store.user.currentUser,
  collapsed: store.global.collapsed,
  fetchingNotices: store.global.fetchingNotices,
  notices: store.global.notices,
}))(Home);
