import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

// export default ({ children, wrapperClassName, top, ...restProps }) => (
//   <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
//     {top}
//     <PageHeader key="pageheader" {...restProps} linkElement={Link} />
//     {children ? <div className={styles.content}>{children}</div> : null}
//   </div>
// );

@connect(({ global }) => ({
  global,
}))
export default class PageHeaderLayout extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchChannels',
    });
  }

  render() {
    const { children, wrapperClassName, global, top, ...restProps } = this.props;
    return (
      <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" channels={global.channels} {...restProps} linkElement={Link} />
        {children ? <div className={styles.content}>{children}</div> : null}
      </div>
    );
  }
}
