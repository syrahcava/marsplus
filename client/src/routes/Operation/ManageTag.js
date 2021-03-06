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
  Tag,
  Tooltip as AntdTooltip,
} from 'antd';
import DataSet from '@antv/data-set';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ManageTag.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
@Form.create()
export default class ManageTag extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchManageTag',
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
            <FormItem>
              {getFieldDecorator('title')(
                <Input placeholder="请输入查找的标签或标签组" style={{ width: 200 }} />
              )}
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
    const { manageTag } = operation;

    const actionExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <Button type="primary">添加标签组</Button>
          <Button type="danger" style={{ marginLeft: 10 }}>
            撤销删除
          </Button>
        </div>
      </div>
    );

    const columns = [
      {
        title: '标签分组',
        dataIndex: 'groupName',
        align: 'center',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        align: 'center',
        render(val, group) {
          return val.map(tag => (
            <Tag color={group.color} key={tag.title} closable>
              {tag.title}
              <Icon type="plus" style={{ marginLeft: 10 }} />
            </Tag>
          ));
        },
      },
      {
        title: '操作',
        align: 'center',
        render: () => (
          <Fragment>
            <a href="">管理</a>
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
                title="自定标签"
                extra={actionExtra}
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <div className={styles.salesRank}>
                  <Table
                    loading={loading}
                    rowKey='title'
                    // rowSelection={rowSelection}
                    dataSource={manageTag.tagArray}
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
