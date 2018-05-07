import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Col, Card, Icon, List, Row, Select, Table, Tooltip as AntdTooltip } from 'antd';
import DataSet from '@antv/data-set';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AnalysisArticle.less';

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class AnalysisArticle extends Component {
  state = {
    followDay: 7,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchAnalysisArticle',
    });
  }

  selectFollowDay = type => {
    const { dispatch } = this.props;
    this.setState({
      followDay: type,
    });
    dispatch({
      type: 'operation/filterArticleFetch',
      payload: {
        count: type,
      },
    });
  };

  isActiveFollowDay(type) {
    const { followDay } = this.state;

    if (followDay === type) {
      return styles.currentDate;
    }
  }

  render() {
    const { operation, loading } = this.props;
    const { analysisArticle, analysisArticleFilter } = operation;

    const followDayExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActiveFollowDay(7)} onClick={() => this.selectFollowDay(7)}>
            7天
          </a>
          <a className={this.isActiveFollowDay(30)} onClick={() => this.selectFollowDay(30)}>
            30天
          </a>
          <a className={this.isActiveFollowDay(90)} onClick={() => this.selectFollowDay(90)}>
            90天
          </a>
        </div>
      </div>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const dsFollow = new DataSet();
    const dvFollow = dsFollow.createView().source(analysisArticleFilter.totalCountArray);
    dvFollow.transform({
      type: 'fold',
      fields: ['总浏览', '总点赞', '总分享', '总收藏'],
      key: 'category', // key字段
      value: 'count', // value字段
    });
    const cols = {
      value: { min: 0 },
      day: {
        range: [0, 1],
      },
    };

    const columns = [
      {
        title: '图文标题',
        dataIndex: 'title',
      },
      {
        title: '图文浏览',
        dataIndex: 'view',
        sorter: true,
        align: 'right',
      },
      {
        title: '图文分享',
        dataIndex: 'share',
        sorter: true,
        align: 'right',
      },
      {
        title: '图文收藏',
        dataIndex: 'collect',
        sorter: true,
        align: 'right',
      },
    ];

    return (
      <Fragment>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col>
            <div className={styles.title}>昨日指标</div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="图文浏览"
              action={
                <AntdTooltip title="公众号昨日总图文浏览次数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisArticle.view}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="图文分享"
              action={
                <AntdTooltip title="公众号昨日总图文分享次数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisArticle.share}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="图文点赞"
              action={
                <AntdTooltip title="公众号昨日总图文分享次数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisArticle.like}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="图文收藏"
              action={
                <AntdTooltip title="公众号昨日总图文收藏次数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisArticle.collect}</span>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="图文统计"
                extra={followDayExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Chart height={400} data={dvFollow} scale={cols} forceFit>
                    <Legend />
                    <Axis name="day" />
                    <Axis name="count" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="line" position="day*count" size={2} color={'category'} />
                    <Geom
                      type="point"
                      position="day*count"
                      size={4}
                      shape={'circle'}
                      color={'category'}
                      style={{ stroke: '#fff', lineWidth: 1 }}
                    />
                  </Chart>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="单篇图文"
                // extra={followDayExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Table
                    loading={loading}
                    rowKey={'title'}
                    // rowSelection={rowSelection}
                    dataSource={analysisArticle.articleCountTop}
                    columns={columns}
                    // pagination={paginationProps}
                    // onChange={this.handleTableChange}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
