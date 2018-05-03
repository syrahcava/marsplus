import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Col, Card, Icon, List, Row, Select, Tooltip as AntdTooltip } from 'antd';
import DataSet from '@antv/data-set';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AnalysisUser.less';

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class AnalysisUser extends Component {
  state = {
    followDay: 7,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchAnalysisUser',
    });
  }

  selectFollowDay = type => {
    const { dispatch } = this.props;
    this.setState({
      followDay: type,
    });
    dispatch({
      type: 'operation/filterFollowFetch',
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
    const { analysisUser, analysisUserFilter } = operation;

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
    const dvFollow = dsFollow.createView().source(analysisUserFilter.followCountArray);
    dvFollow.transform({
      type: 'fold',
      // fields: [ 'newFollowCount', 'cancelFollowCount', 'newTotalFollowCount', 'totalFollowNumbers' ],
      fields: ['新增关注用户', '取消关注用户', '净增关注用户'],
      key: 'category', // key字段
      value: 'count', // value字段
    });
    const cols = {
      value: { min: 0 },
      day: {
        range: [0, 1],
      },
    };

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
              title="新增关注用户"
              action={
                <AntdTooltip title="昨日新关注用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisUser.newFollowCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="取消关注用户"
              action={
                <AntdTooltip title="昨日取消关注用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisUser.cancelFollowCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="净增关注用户"
              action={
                <AntdTooltip title="昨日净增长关注用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisUser.newTotalFollowCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="关注用户总数"
              action={
                <AntdTooltip title="昨日总关注用户总数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisUser.totalFollowNumbers}</span>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="用户增长情况"
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
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="用户来源占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie
                hasLegend
                subTitle="用户来源"
                total="10044"
                data={analysisUser.followSource}
                // valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="二维码扫描TOP"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar data={analysisUser.qrFollowTop} height={248} />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="用户地域占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            />
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="用户性别占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie hasLegend data={analysisUser.gender} height={248} lineWidth={4} />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="标签TOP"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar data={analysisUser.tagsTop} height={248} />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="用户设备占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie hasLegend data={analysisUser.equipment} height={248} lineWidth={4} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
