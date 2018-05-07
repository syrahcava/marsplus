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

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class OperationOverview extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchOverview',
    });
  }

  render() {
    const { operation, loading } = this.props;
    const { overview } = operation;

    return (
      <PageHeaderLayout>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="销量趋势"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 350 }}
            >
              <Bar data={overview.salesVolume} height={248} />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="家用电器-大家电-品类占比"
              bodyStyle={{ padding: 0 }}
              style={{ marginTop: 24, minHeight: 420 }}
            >
              <Pie hasLegend data={overview.classRatio} height={330} lineWidth={4} />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="渠道占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 420 }}
            >
              <Pie hasLegend data={overview.channelRatio} height={260} lineWidth={4} />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
