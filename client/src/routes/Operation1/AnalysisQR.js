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

import styles from './AnalysisQR.less';

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class AnalysisQR extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchAnalysisQR',
    });
  }

  render() {
    const { operation, loading } = this.props;
    const { analysisQR } = operation;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const columns = [
      {
        title: '二维码名称',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '生成时间',
        dataIndex: 'time',
        sorter: true,
        align: 'center',
      },
      {
        title: '扫码次数',
        dataIndex: 'scanCount',
        sorter: true,
        align: 'center',
      },
      {
        title: '扫码人数',
        dataIndex: 'userCount',
        sorter: true,
        align: 'center',
      },
      {
        title: '关注数',
        dataIndex: 'followCount',
        sorter: true,
        align: 'center',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">详情</a>
          </Fragment>
        ),
      },
    ];

    return (
      <Fragment>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="二维码数量"
              total={() => <span>{analysisQR.qrCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="扫码次数"
              total={() => <span>{analysisQR.scanCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="扫码人数"
              total={() => <span>{analysisQR.userCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="关注人数"
              total={() => <span>{analysisQR.followCount}</span>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="二维码"
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
                    dataSource={analysisQR.qrArray}
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
