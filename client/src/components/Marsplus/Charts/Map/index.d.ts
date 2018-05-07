import * as React from 'react';
export interface IMapProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<{
    x: string;
    y: number;
  }>;
  autoLabel?: boolean;
  style?: React.CSSProperties;
  percent?: boolean;
}

export default class Map extends React.Component<IMapProps, any> {}
