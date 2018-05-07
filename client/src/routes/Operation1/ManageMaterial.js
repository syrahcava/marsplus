import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class ManageMaterial extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'article':
        dispatch(routerRedux.push(`${match.url}/article`));
        break;
      case 'picture':
        dispatch(routerRedux.push(`${match.url}/picture`));
        break;
      case 'composition':
        dispatch(routerRedux.push(`${match.url}/composition`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'article',
        tab: '图文素材',
      },
      {
        key: 'picture',
        tab: '图片素材',
      },
      {
        key: 'composition',
        tab: '排版素材',
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
