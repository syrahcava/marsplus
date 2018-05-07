import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Col, Card, Icon, List, Row, Select, Tooltip as AntdTooltip } from 'antd';
import DataSet from '@antv/data-set';
import { Bar, Map, Pie } from 'components/Marsplus/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Overview.less';

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
export default class CustomerOverview extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchOverview',
    });
    dispatch({
      type: 'customer/fetchOverviewMap',
    });
  }

  render() {
    const { customer, loading } = this.props;
    const { overview, overviewMap } = customer;

    return (
      <PageHeaderLayout>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="年龄占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar data={overview.ageRatio} height={248} percent />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="性别占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Pie hasLegend data={overview.genderRatio} height={248} lineWidth={4} />
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
              bodyStyle={{ padding: 0 }}
              style={{ marginTop: 24, minHeight: 380 }}
            >
              <Map mapData={overviewMap} userData={overview.areaRatio} height={310} />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="标签占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 380 }}
            >
              <Bar data={overview.tagRatio} height={248} percent />
            </Card>
          </Col>
        </Row>
        {/* <Row gutter={12} style={{ marginBottom: 12 }}>
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
        </Row> */}
      </PageHeaderLayout>
    );
  }
}
