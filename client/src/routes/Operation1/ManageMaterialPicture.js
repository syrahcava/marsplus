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

import styles from './ManageMaterialPicture.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ operation, loading }) => ({
  operation,
  loading: loading.models.operation,
}))
@Form.create()
export default class ManageMaterialPicture extends Component {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchManageMaterialPicture',
    });
  }

  render() {
    const { operation, loading } = this.props;
    const { manageMaterialPicture } = operation;

    return (
      <Fragment>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Card loading={loading} bordered={false} bodyStyle={{ overflow: 'hidden' }}>
                <List
                  rowKey="id"
                  style={{ marginTop: 24 }}
                  grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                  loading={loading}
                  dataSource={manageMaterialPicture.pictureArray}
                  pagination={{
                    pageSize: 1,
                  }}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <Card
                        hoverable
                        bodyStyle={{ paddingBottom: 20 }}
                        cover={<img src={item.image} />}
                        actions={[
                          <AntdTooltip title="编辑">
                            <Icon type="edit" />
                          </AntdTooltip>,
                          <AntdTooltip title="删除">
                            <Icon type="delete" />
                          </AntdTooltip>,
                        ]}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
