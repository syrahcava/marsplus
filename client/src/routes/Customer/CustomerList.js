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

    const columns = [
      {
        title: '昵称',
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
            <div>{val}</div>
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
                    rowKey={'username'}
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
