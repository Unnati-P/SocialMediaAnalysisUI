import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar.js';
import Plotarea from './Plotarea.js';

import styles from './styles.scss'

class App extends Component {

    constructor(props) {
        super(props);
        styles._insertCss();
        this.state = {
            activeGraph: 0,
        };
    }

    onSideBarItemClick(activeGraph) {
        this.setState({activeGraph});
        console.log(activeGraph);
    }

    render() {
        return (
            <div className="app">
                <div className="header">{'Flood and Smog analysis from twitter'}</div>
                <div className="wrapper">
                    <Sidebar
                        activeGraph={this.state.activeGraph}
                        onSideBarItemClick={this.onSideBarItemClick.bind(this)}
                    />
                    <Plotarea
                        activeGraph={this.state.activeGraph}
                    />
                </div>
            </div>
        );
    }
}

export default App;
