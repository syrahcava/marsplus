import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Col, Card, Icon, List, Radio, Row, Select, Tooltip as AntdTooltip } from 'antd';
import DataSet from '@antv/data-set';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AnalysisInteractive.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class AnalysisInteractive extends Component {
  state = {
    day: 7,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchAnalysisInteractive',
    });
  }

  selectDay = type => {
    const { dispatch } = this.props;
    this.setState({
      day: type,
    });
    dispatch({
      type: 'operation/filterInteractiveFetch',
      payload: {
        count: type,
      },
    });
  };

  render() {
    const { operation, loading } = this.props;
    const { analysisInteractive, analysisInteractiveFilter } = operation;

    const dayExtra = (
      <RadioGroup defaultValue="7" onChange={e => this.selectDay(e.target.value)}>
        <RadioButton value="7">7天</RadioButton>
        <RadioButton value="30">30天</RadioButton>
        <RadioButton value="90">90天</RadioButton>
      </RadioGroup>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const ds = new DataSet();
    const dv = ds.createView().source(analysisInteractiveFilter.messageCountArray);
    dv.transform({
      type: 'fold',
      fields: ['消息数量'],
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
            <div className={styles.title}>{dayExtra}</div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={8} lg={8} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="互动用户数"
              action={
                <AntdTooltip title="互动次数超过30%用户低于70%用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisInteractiveFilter.userInter[0].y}</span>}
              contentHeight={46}
            />
          </Col>
          <Col xl={8} lg={8} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="沉默用户数"
              action={
                <AntdTooltip title="互动次数低于30%用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisInteractiveFilter.userInter[1].y}</span>}
              contentHeight={46}
            />
          </Col>
          <Col xl={8} lg={8} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="活跃用户数"
              action={
                <AntdTooltip title="互动次数高于70%用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{analysisInteractiveFilter.userInter[2].y}</span>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="互动用户占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie
                hasLegend
                data={analysisInteractiveFilter.userInter}
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
              title="互动类型占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie
                hasLegend
                data={analysisInteractiveFilter.userInterType}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="消息互动情况"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Chart height={248} data={dv} scale={cols} forceFit>
                {/* <Legend /> */}
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
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="消息情况占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie
                hasLegend
                data={analysisInteractiveFilter.messageInfoType}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="关键词回复TOP"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar autoLabel data={analysisInteractiveFilter.keywordTop} height={248} />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="点击菜单TOP"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar autoLabel data={analysisInteractiveFilter.menuTop} height={248} />
            </Card>
          </Col>
        </Row>
        {/* <Row gutter={12} style={{marginBottom: 12}}>
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
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="day*count" size={2} color={'category'} />
                    <Geom type='point' position="day*count" size={4} shape={'circle'} color={'category'} style={{ stroke: '#fff', lineWidth: 1}} />
                  </Chart>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={12} style={{marginBottom: 12}}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="用户地域占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >

            </Card>
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
              <Pie
                hasLegend
                data={analysisUser.gender}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{marginBottom: 12}}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="标签TOP"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar
                hasLegend
                data={analysisUser.tagsTop}
                height={248}
              />
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
              <Pie
                hasLegend
                data={analysisUser.equipment}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row> */}
      </Fragment>
    );
  }
}
