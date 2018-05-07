import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  render() {
    const {
      height,
      title,
      forceFit = true,
      data,
      padding,
      percent, // 数据是否按照百分比的格式显示
    } = this.props;

    const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
        formatter(text, item, index) {
          return percent ? text + '%' : text;
        },
      },
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: percent ? y + '%' : y,
      }),
    ];

    const COLORS = [
      '#0088FE',
      '#00C49F',
      '#FFBB28',
      '#FF8441',
      '#EE3B61',
      '#FF6590',
      '#9575DE',
      '#8EA4F1',
      '#C6E8D2',
      '#FFDB91',
      '#FF9054',
    ];

    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            scale={scale}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Axis
              name="x"
              title={false}
              label={autoHideXLabels ? false : {}}
              tickLine={autoHideXLabels ? false : {}}
            />
            <Axis name="y" min={0} />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={['x', COLORS]} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bar;
