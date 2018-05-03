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

import styles from './ManageMaterialComposition.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
@Form.create()
export default class ManageMaterialComposition extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchManageMaterialComposition',
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
            <FormItem label="创建日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
            <FormItem>
              {getFieldDecorator('title')(<Input placeholder="请输入版式名称" />)}
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
    const { manageMaterialComposition } = operation;

    const actionExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <Button type="primary">新建排版</Button>
          <Button type="danger" style={{ marginLeft: 10 }}>
            撤销删除
          </Button>
        </div>
      </div>
    );

    const columns = [
      {
        title: '版式名称',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: () => (
          <Fragment>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <Fragment>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            {this.renderSearchForm()}
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card
                title="排版版式"
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
                    dataSource={manageMaterialComposition.compositionArray}
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
