import React, {Component} from 'react';
import Sidebar from './Sidebar.jsx';
import Plotarea from './Plotarea.jsx';

class App extends Component {
    constructor(props) {
        super(props);

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
