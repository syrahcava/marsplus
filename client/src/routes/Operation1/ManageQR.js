import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Col,
  Card,
  DatePicker,
  Divider,
  Form,
  Icon,
  Input,
  List,
  Row,
  Select,
  Table,
  Tooltip as AntdTooltip,
} from 'antd';
import DataSet from '@antv/data-set';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ManageQR.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
@Form.create()
export default class ManageQR extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchManageQR',
    });
  }

  renderSearchForm() {
    // 参考List/TableList.js
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        // onSubmit={this.handleSearch}
        layout="inline"
      >
        <Row gutter={12}>
          <Col>
            <FormItem label="二维码类型">
              {getFieldDecorator('type', { initialValue: '' })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="0">永久</Option>
                  <Option value="1">临时</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="生成日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
            <FormItem label="二维码名称">
              {getFieldDecorator('title')(<Input placeholder="请输入" />)}
            </FormItem>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { operation, loading } = this.props;
    const { manageQR } = operation;

    const actionExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <Button type="primary">下载二维码</Button>
          <Button style={{ marginLeft: 10 }}>新建二维码</Button>
        </div>
      </div>
    );

    const columns = [
      {
        title: '二维码名称',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '二维码类型',
        dataIndex: 'type',
        align: 'center',
      },
      {
        title: '生成时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '使用状态',
        dataIndex: 'state',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: () => (
          <Fragment>
            <a href="">查看大图</a>
            <Divider type="vertical" />
            <a href="">统计</a>
            <Divider type="vertical" />
            <a href="">编辑</a>
            <Divider type="vertical" />
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            {this.renderSearchForm()}
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="二维码"
                extra={actionExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Table
                    loading={loading}
                    rowKey={'title'}
                    // rowSelection={rowSelection}
                    dataSource={manageQR.qrArray}
                    columns={columns}
                    // pagination={paginationProps}
                    // onChange={this.handleTableChange}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
