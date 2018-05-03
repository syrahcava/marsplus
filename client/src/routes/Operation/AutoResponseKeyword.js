import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Col,
  Card,
  Divider,
  Icon,
  List,
  Radio,
  Row,
  Select,
  Table,
  Tooltip as AntdTooltip,
} from 'antd';
import { Bar, ChartCard, Field, Pie, TagCloud, TimelineChart } from 'components/Charts';
import { Chart, Legend, Tooltip, Geom, Axis, Shape } from 'bizcharts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './AutoResponseKeyword.less';

const RadioGroup = Radio.Group;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
export default class AutoResponseFollow extends Component {
  state = {
    type: 'text', // text - 文字； article - 图文
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchAutoResponseKeyword',
    });
  }

  render() {
    const { operation, loading } = this.props;
    const { autoResponseKeyword } = operation;

    const columns = [
      {
        title: '关键词规则',
        dataIndex: 'title',
        align: 'center',
      },
      {
        title: '关键词',
        dataIndex: 'keyword',
        sorter: true,
        align: 'center',
      },
      {
        title: '回复类型',
        dataIndex: 'type',
        sorter: true,
        align: 'center',
      },
      {
        title: '回复内容',
        dataIndex: 'content',
        sorter: true,
        align: 'left',
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
        <Row gutter={12}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.title}>
              <Button type="primary">同步规则</Button>
              <Button type="primary" style={{ marginLeft: 10 }}>
                新增规则
              </Button>
              <Button type="danger" style={{ marginLeft: 10 }}>
                撤销删除
              </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <Card bordered={false} bodyStyle={{ overflow: 'hidden' }}>
              <Table
                loading={loading}
                rowKey={'title'}
                // rowSelection={rowSelection}
                dataSource={autoResponseKeyword.ruleArray}
                columns={columns}
                // pagination={paginationProps}
                // onChange={this.handleTableChange}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
