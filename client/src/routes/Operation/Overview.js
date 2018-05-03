import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Col, Card, DatePicker, Icon, Row, Tooltip as AntdTooltip } from 'antd';
import { ChartCard, TagCloud } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Tooltip, Geom, Axis } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';

import styles from './Overview.less';

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class Overview extends PureComponent {
  state = {
    userDay: 7,
    messsageDay: 7,
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchOverview',
    });
  }

  selectUserDay = type => {
    const { dispatch } = this.props;
    this.setState({
      userDay: type,
    });
    dispatch({
      type: 'operation/filterUserNumberFetch',
      payload: {
        count: type,
      },
    });
  };

  selectMessageDay = type => {
    const { dispatch } = this.props;
    this.setState({
      messsageDay: type,
    });
    dispatch({
      type: 'operation/filterMessageNumberFetch',
      payload: {
        count: type,
      },
    });
  };

  isActiveUserDay(type) {
    const { userDay } = this.state;

    if (userDay === type) {
      return styles.currentDate;
    }
  }

  isActiveMessageDay(type) {
    const { messsageDay } = this.state;

    if (messsageDay === type) {
      return styles.currentDate;
    }
  }

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  render() {
    const { operation, loading } = this.props;
    const { overview, filter } = operation;

    const userDayExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActiveUserDay(7)} onClick={() => this.selectUserDay(7)}>
            7天
          </a>
          <a className={this.isActiveUserDay(30)} onClick={() => this.selectUserDay(30)}>
            30天
          </a>
          <a className={this.isActiveUserDay(90)} onClick={() => this.selectUserDay(90)}>
            90天
          </a>
        </div>
      </div>
    );

    const messageDayExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActiveMessageDay(7)} onClick={() => this.selectMessageDay(7)}>
            7天
          </a>
          <a className={this.isActiveMessageDay(30)} onClick={() => this.selectMessageDay(30)}>
            30天
          </a>
          <a className={this.isActiveMessageDay(90)} onClick={() => this.selectMessageDay(90)}>
            90天
          </a>
        </div>
      </div>
    );

    const cols = {
      value: { min: 0 },
      year: { range: [0, 1] },
    };

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    return (
      <PageHeaderLayout>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日消息"
              action={
                <AntdTooltip title="记录昨日用户在公众号中发送消息的次数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{overview.lastDayMessageCount}</span>}
              // footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日新增关注"
              action={
                <AntdTooltip title="记录昨日用户在公众号中净增长数量">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{overview.lastDayFollowCount}</span>}
              // footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="关注用户总数"
              action={
                <AntdTooltip title="记录昨日公众号中总关注用户数量">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{overview.totalUserNumbers}</span>}
              // footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日打标签"
              action={
                <AntdTooltip title="记录昨日系统为用户标记标签数量">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{overview.lastDayTagCount}</span>}
              // footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="用户增长情况"
                extra={userDayExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Chart height={400} data={filter.userNumbers} scale={cols} forceFit>
                    <Axis name="day" />
                    <Axis name="count" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="line" position="day*count" size={2} />
                    <Geom
                      type="point"
                      position="day*count"
                      size={4}
                      shape='circle'
                      style={{ stroke: '#fff', lineWidth: 1 }}
                    />
                  </Chart>
                </div>
              </Card>
            </div>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="消息互动情况"
                extra={messageDayExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Chart height={400} data={filter.messageNumbers} scale={cols} forceFit>
                    <Axis name="day" />
                    <Axis name="count" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="line" position="day*count" size={2} />
                    <Geom
                      type="point"
                      position="day*count"
                      size={4}
                      shape='circle'
                      style={{ stroke: '#fff', lineWidth: 1 }}
                    />
                  </Chart>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="图文浏览TOP5"
                // extra={salesExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <ul className={styles.rankingList}>
                    {filter.hotArticles.map(article => (
                      <li key={article.title}>
                        <span>{article.title}</span>
                        <span>{numeral(article.view).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="标签情况"
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <TagCloud data={overview.tags} height={161} />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
