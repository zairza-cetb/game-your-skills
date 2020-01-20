import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Dropdown, Icon, Form, Button } from 'antd';
const { Header, Content, Footer } = Layout;

class BasicLayout extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
  }
  render() {
    // Renders a login form
    const loginMenu = (
      <Menu>
        <Menu.Item key='0'>
          <Form onSubmit={this.handleSubmit} className='login-form' onClick={(e) => e.stopPropagation()}>
            <Form.Item>
              <input type='text' name='username'/>
            </Form.Item>
            <Form.Item>
              <input type='password' name='password'/>
            </Form.Item>
            <Form.Item>
              <input type='submit' value='Login'/>
            </Form.Item>
          </Form>
        </Menu.Item>
      </Menu>
    )
    /**
      Ant design default layout
      "https://ant.design/components/layout/#components-layout-demo-fixed"
     */
    const layout = (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Dropdown overlay={loginMenu} trigger={['click']}>
              <Button type='primary'>
                Login <Icon type="down" />
              </Button>
            </Dropdown>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2020 Created by Zairza</Footer>
      </Layout>
    );
    return (
      <React.Fragment>
        {layout}
      </React.Fragment>
    )
  }
}

export default BasicLayout