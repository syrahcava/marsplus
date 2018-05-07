import * as React from 'react';
export interface IBarProps {
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

export default class Bar extends React.Component<IBarProps, any> {}
