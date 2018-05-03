import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class AutoResponse extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'follow':
        dispatch(routerRedux.push(`${match.url}/follow`));
        break;
      case 'default':
        dispatch(routerRedux.push(`${match.url}/default`));
        break;
      case 'keyword':
        dispatch(routerRedux.push(`${match.url}/keyword`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'follow',
        tab: '关注自动回复',
      },
      {
        key: 'default',
        tab: '默认自动回复',
      },
      {
        key: 'keyword',
        tab: '关键词自动回复',
      },
    ];

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
