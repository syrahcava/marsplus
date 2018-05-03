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

import styles from './CustomerList.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
@Form.create()
export default class CustomerList extends Component {
  state = {
    formValues: {},
    selectedRowKeys: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchCustomerList',
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
            <FormItem label="加入日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
            <FormItem>
              {getFieldDecorator('title')(
                <Input placeholder="请填写手机号或姓名进行查找" style={{ width: 300 }} />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 10 }}>导出信息</Button>
            <Button style={{ marginLeft: 10 }}>标记标签</Button>
          </Col>
        </Row>
      </Form>
    );
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { customer, loading } = this.props;
    const { customerList } = customer;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const columns = [
      {
        title: '社交信息',
        dataIndex: 'id',
        align: 'center',
        render(val, customer) {
          return (
            <div>
              {val}
              <br />
              {customer.gender === '男' ? (
                <Icon type="man" style={{ fontSize: 16, color: '#08c' }} />
              ) : (
                <Icon type="woman" style={{ fontSize: 16, color: 'pink' }} />
              )}
            </div>
          );
        },
      },
      {
        title: '姓名',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        align: 'center',
      },
      {
        title: '地域',
        dataIndex: 'area',
        align: 'center',
      },
      {
        title: '手机号',
        dataIndex: 'tel',
        align: 'center',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        align: 'center',
      },
      {
        title: '渠道',
        dataIndex: 'channel',
        align: 'center',
        render(val) {
          return val === '微信' ? (
            <Icon type="wechat" style={{ fontSize: 24, color: 'green' }} />
          ) : (
            { val }
          );
        },
      },
      {
        title: '操作',
        align: 'center',
        render: () => (
          <Fragment>
            <a href="">详情</a>
          </Fragment>
        ),
      },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <PageHeaderLayout>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="活跃用户数量"
              action={
                <AntdTooltip title="互动次数高于70%用户的用户总数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{customerList.activeCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="取消关注用户"
              action={
                <AntdTooltip title="取消关注用户总数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{customerList.cancelFollowCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日新增用户"
              action={
                <AntdTooltip title="昨日净增长用户">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{customerList.newFollowCount}</span>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="用户总数"
              action={
                <AntdTooltip title="当前用户总数">
                  <Icon type="info-circle-o" />
                </AntdTooltip>
              }
              total={() => <span>{customerList.totalCount}</span>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.title}>{this.renderSearchForm()}</div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card loading={loading} bordered={false} bodyStyle={{ overflow: 'hidden' }}>
                <div className={styles.salesRank}>
                  <Table
                    loading={loading}
                    rowKey={'title'}
                    rowSelection={rowSelection}
                    dataSource={customerList.customerArray}
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
