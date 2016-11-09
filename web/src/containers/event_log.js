import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-virtualized';

class EventLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <p><b>Event Log</b></p>
        <hr width="100%"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.events.messages
});

export default connect(mapStateToProps)(EventLog);