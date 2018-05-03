import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Col,
  Card,
  Checkbox,
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

import styles from './ManageMessage.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
@Form.create()
export default class ManageMessage extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchManageMessage',
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
            <FormItem label="消息日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
            <FormItem>
              {getFieldDecorator('hideAutoReply')(<Checkbox>隐藏自动回复</Checkbox>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('title')(<Input placeholder="请填写消息内容" />)}
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
    const { manageMessage } = operation;

    const columns = [
      {
        title: '用户',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '消息内容',
        dataIndex: 'messageContent',
        align: 'center',
        render(val, message) {
          return (
            <div>
              {message.messageType}
              <br />
              {val}
            </div>
          );
        },
      },
      {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '回复类型',
        dataIndex: 'replyType',
        align: 'center',
      },
      {
        title: '回复内容',
        dataIndex: 'replyContent',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: () => (
          <Fragment>
            <a href="">回复</a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="star-o" style={{ fontSize: 16 }} />
            </a>
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
              <Card loading={loading} bordered={false} bodyStyle={{ overflow: 'hidden' }}>
                <div className={styles.salesRank}>
                  <Table
                    loading={loading}
                    rowKey={'title'}
                    // rowSelection={rowSelection}
                    dataSource={manageMessage.messageArray}
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
