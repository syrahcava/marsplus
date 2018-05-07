import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Map extends Component {
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
      mapData,
      userData,
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

    const cols = {
      longitude: {
        sync: true,
      },
      latitude: {
        sync: true,
      },
    };
    const ds = new DataSet();
    const worldMap = ds.createView('back').source(mapData, {
      type: 'GeoJSON',
    });
    const userDv = ds
      .createView()
      .source(userData)
      .transform({
        geoDataView: worldMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude'],
      })
      .transform({
        type: 'map',
        callback: function(obj) {
          obj.trend = obj.value + '%';
          return obj;
        },
      });

    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          {/* <Chart
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
            <Axis
              name="y"
              min={0}
            />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={['x', COLORS]} tooltip={tooltip} />
          </Chart> */}
          <Chart
            height={title ? height - 41 : height}
            scale={cols}
            padding={padding || 'auto'}
            forceFit={forceFit}
          >
            <Tooltip showTitle={false} />
            {/* <Legend name='trend' position='left' /> */}
            <View data={worldMap}>
              <Geom
                type="polygon"
                tooltip={false}
                position="longitude*latitude"
                style={{ fill: '#fff', stroke: '#ccc', lineWidth: 1 }}
              />
            </View>
            <View
              data={userDv}
              scale={{
                trend: {
                  alias: '占比',
                },
              }}
            >
              <Geom
                type="polygon"
                position="longitude*latitude"
                animate={{ leave: { animation: 'fadeOut' } }}
                opacity="value"
                tooltip={[
                  'name*trend',
                  (name, trend) => {
                    return {
                      name: name,
                      value: trend,
                    };
                  },
                ]}
                color={['trend', ['#C45A5A', '#14647D']]}
                size={0}
              >
                <Label content="name" offset={0} textStyle={{ fill: '#545454', fontSize: 10 }} />
              </Geom>
            </View>
            <Geom
              type="polygon"
              position="x*y"
              style={{ lineWidth: 1, stroke: '#fff' }}
              color={['count', ['rgb(200, 200, 255)', 'rgb(0, 0, 255)']]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Map;
