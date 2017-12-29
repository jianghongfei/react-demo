import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
      getFieldDecorator: PropTypes.func,
    }).isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={styles.forgot} href="#">Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles.loginButton}>
            Log in
          </Button>
          Or <a href="/user/register">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default connect(store => ({
  collapsed: store.global.collapsed,
}))(Form.create()(Login));
