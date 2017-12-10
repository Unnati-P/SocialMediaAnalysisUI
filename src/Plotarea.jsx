import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

const getRetweetChartData = data => {
    const dataValue = _.map(data, value => value);

    return {
        labels: [
            'Retweeted',
            'Not Retweeted',
        ],
        datasets: [{
            data: dataValue,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
            ]
        }]
    }
};


class Plotarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pieChartData: {}
        };
    }

    componentWillMount() {
        const that = this;

        if (that.props.activeGraph === 0) {
            that.setState({loading: true});
            axios.get('http://127.0.0.1:3045/getpollutionretweets')
                .then(function (res) {
                    that.setState({loading: false});
                    that.setState({pieChartData: res.data})
                });
        }

        if (that.props.activeGraph === 1) {
            that.setState({loading: true});
            axios.get('http://127.0.0.1:3045/getockhiretweets')
                .then(function (res) {
                    that.setState({loading: false});
                    that.setState({pieChartData: res.data})
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        const that = this;

        if (that.props.activeGraph !== nextProps.activeGraph) {
            if (nextProps.activeGraph === 0) {
                that.setState({loading: true});
                axios.get('http://127.0.0.1:3045/getpollutionretweets')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pieChartData: res.data})
                    });
            }
            if (nextProps.activeGraph === 1) {
                that.setState({loading: true});
                axios.get('http://127.0.0.1:3045/getockhiretweets')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pieChartData: res.data})
                    });
            }
        }
    }

    render() {
        const that = this;

        if (that.state.loading) {
            return (
                <div className="loaderWrapper">
                    <div className="loader">
                        {'We\'re loading the data, please wait...'}
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 0) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {`${this.state.pieChartData.retweeted} tweets were retweeted and ${this.state.pieChartData.not_retweeted} tweets were not retweeted in case of pollution and smog`}
                    </div>
                    <div>
                        <Pie
                            data={getRetweetChartData(this.state.pieChartData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 1) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {`${this.state.pieChartData.retweeted} tweets were retweeted and ${this.state.pieChartData.not_retweeted} tweets were not retweeted in case of ockhi storm`}
                    </div>
                    <div>
                        <Pie
                            data={getRetweetChartData(this.state.pieChartData)}
                        />
                    </div>
                </div>
            );
        }
        else {
            return <div>{'Could not load graph'}</div>
        }
    }
}

Plotarea.propTypes = {
    activeGraph: PropTypes.number,
};

export default Plotarea;
