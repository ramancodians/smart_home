import React, { Component } from 'react';
import { connect } from 'react-redux';

class Inventory extends Component {
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
        <p><b>Inventory</b></p>
        <hr width="100%"/>
            <i className="fa fa-camera-retro fa-3x icon"></i>
            <i className="fa fa-camera-retro fa-3x icon"></i>
            <i className="fa fa-camera-retro fa-3x icon"></i>
            <i className="fa fa-camera-retro fa-3x icon"></i>
            <i className="fa fa-camera-retro fa-3x icon"></i>

     </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Inventory);