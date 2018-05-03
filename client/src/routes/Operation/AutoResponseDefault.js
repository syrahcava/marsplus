import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Col,
  Card,
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

import styles from './AutoResponseDefault.less';

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
      type: 'operation/fetchAnalysisArticle',
    });
  }

  selectType = type => {
    const { dispatch } = this.props;
    this.setState({
      type: type,
    });
  };

  render() {
    const { operation, loading } = this.props;
    const { type } = this.state;

    const textContent = <ReactQuill />;

    const articleContent = (
      <Row gutter={12} style={{ textAlign: 'center' }}>
        <Col xl={4} lg={4} sm={12} xs={12}>
          <div>
            <Icon type="picture" style={{ fontSize: 56 }} />
          </div>
          <div>从素材库选择</div>
        </Col>
        <Col xl={4} lg={4} sm={12} xs={12}>
          <div>
            <Icon type="plus" style={{ fontSize: 56 }} />
          </div>
          <div>新建图文消息</div>
        </Col>
      </Row>
    );

    return (
      <Fragment>
        <Row gutter={12}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <div className={styles.title}>
              <RadioGroup onChange={e => this.selectType(e.target.value)} value={this.state.type}>
                <Radio value="text">发送文字</Radio>
                <Radio value="article">发送图文</Radio>
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <Card
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
              actions={[
                <Button type="primary">保存</Button>,
                <Button type="danger">删除回复</Button>,
              ]}
            >
              {type === 'text' ? textContent : articleContent}
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
