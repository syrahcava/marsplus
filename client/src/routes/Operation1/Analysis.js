import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class Analysis extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'user':
        dispatch(routerRedux.push(`${match.url}/user`));
        break;
      case 'interactive':
        dispatch(routerRedux.push(`${match.url}/interactive`));
        break;
      case 'article':
        dispatch(routerRedux.push(`${match.url}/article`));
        break;
      case 'qr':
        dispatch(routerRedux.push(`${match.url}/qr`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'user',
        tab: '用户统计',
      },
      {
        key: 'interactive',
        tab: '互动统计',
      },
      {
        key: 'article',
        tab: '图文统计',
      },
      {
        key: 'qr',
        tab: '二维码统计',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
