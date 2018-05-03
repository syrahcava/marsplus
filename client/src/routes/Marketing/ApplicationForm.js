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

import styles from './ApplicationForm.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ marketing, loading }) => ({
  marketing,
  loading: loading.models.marketing,
}))
@Form.create()
export default class ApplicationForm extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'marketing/fetchApplicationForm',
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
            <FormItem label="表格状态">
              {getFieldDecorator('type', { initialValue: '' })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="0">未开始</Option>
                  <Option value="1">使用中</Option>
                  <Option value="2">已停用</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="创建日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
            <FormItem>
              {getFieldDecorator('title')(<Input placeholder="请填写表格名称" />)}
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
    const { marketing, loading } = this.props;
    const { applicationForm } = marketing;

    const actionExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <Button type="primary">新建表格</Button>
          <Button type="danger" style={{ marginLeft: 10 }}>
            撤销删除
          </Button>
        </div>
      </div>
    );

    const columns = [
      {
        title: '表格名称',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '反馈数量',
        dataIndex: 'feedbackCount',
        align: 'center',
      },
      {
        title: '生成时间',
        dataIndex: 'createTime',
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
            <a href="">预览链接</a>
            <Divider type="vertical" />
            <a href="">查看反馈</a>
            <Divider type="vertical" />
            <a href="">重命名</a>
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
                title="应用表格"
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
                    dataSource={applicationForm.applicationFormArray}
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
