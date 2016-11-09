import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Inventory from './inventory';
import EventLog from './event_log';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  //used to trigger a re-render
  handleResize() {
    this.setState({}); 
  }

  render() {
    const cols = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2};
    const height = (window.innerHeight*0.95)/12;

    return (
      <ResponsiveReactGridLayout rowHeight={height} cols={cols}>
        <div key='a' data-grid={{x: 0, y: 0, w: 3, h: 4, isResizable:false}} className='box'><Inventory/></div>
        <div key='b' data-grid={{x: 0, y: 0, w: 3, h: 1, isResizable:false}} className='box'>


          <AutoSizer>
            {({ height }) => {
              let iconClass = 'fa fa-2x icon';
              if(height > 32)
                iconClass = 'fa fa-3x icon';

              return (
                <div className='centered'>
                  <i className={'fa-gear ' + iconClass}></i>
                  <i className={'fa-gear ' + iconClass}></i>
                  <i className={'fa-gear ' + iconClass}></i>
                  <i className={'fa-gear ' + iconClass}></i>
                  <i className={'fa-gear ' + iconClass}></i>
                  <i className={'fa-gear ' + iconClass}></i>
                </div>
              );
            }}
          </AutoSizer>
        </div>
        <div key='c' data-grid={{x: 0, y: 0, w: 3, h: 5, isResizable:false}} className='box'><EventLog/></div>
        <div key='d' data-grid={{x: 4, y: 0, w: 9, h: 10, isResizable:false}}>
        </div>
      </ResponsiveReactGridLayout>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(App);