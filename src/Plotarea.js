import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Pie, HorizontalBar, Bar, Doughnut} from 'react-chartjs-2';
import { Component } from 'react';
import { Graph } from 'react-d3-graph';
import * as d3 from "d3";
import {forceSimulation,  forceLink,  forceManyBody,  forceCenter} from 'd3-force';
import {  XYPlot,  MarkSeriesCanvas,  LineSeriesCanvas} from 'index';
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

const getPollutionTweetsLocationData = data => {
    const labels = _.keys(data);

    return {
        labels,
        datasets: [{
            data: _.map(data, function (value) {
                return value;
            }),
            label: 'Number of tweets',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            height: 1500,
        }]
    };
};

const getOckhiTweetsLocationData = data => {
    const labels = _.keys(data);

    return {
        labels,
        datasets: [{
            data: _.map(data, function (value) {
                return value;
            }),
            label: 'Number of tweets',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            height: 1500,
        }]
    };
};

const getPollutionTweetsFavoritesData = data => {
    const labels = _.keys(data);

    return {
        labels,
        datasets: [{
            data: _.map(data, function (value) {
                return value;
            }),
            label: 'Favorite Count',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }]
    };
};

const getOckhiTweetsFavoritesData = data => {
    const labels = _.keys(data);

    return {
        labels,
        datasets: [{
            data: _.map(data, function (value) {
                return value;
            }),
            label: 'Favorite Count',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }]
    };
};

const getPollutionTweetsMediaData = data => {
    const labels = _.keys(data);

    return {
        labels,
        datasets: [{
            data: _.map(data, function (value) {
                return value;
            }),
            label: 'Tweets with image and image + text',
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
            ]
        }]
    };
};

const getPollutionTweetsMentionsData = () => {

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 120,
      highlightStrokeColor: 'blue'
    },
    link: {
      highlightColor: 'lightblue'
    }
  };

  return myConfig;

};



class Plotarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pieChartData: {},
            pollutionTweetsLocationData: {},
            pollutionTweetsFavoritesData: {},
            pollutionTweetsMediaData: {},
            pollutionTweetsReplyData: {},
            pollutionTweetsMentionsData: {},
            ockhiTweetsMentionsData: {},
            ockhiTweetsLocationData: {},
            ockhiTweetsFavoritesData: {},
            ockhiTweetsMediaData: {},
            ockhiTweetsReplyData: {}
        };
    }

    componentWillMount() {
        const that = this;

        if (that.props.activeGraph === 0) {
            that.setState({loading: true});
            axios.get('https://social-media-analysis-api.herokuapp.com/getpollutionretweets')
                .then(function (res) {
                    that.setState({loading: false});
                    that.setState({pieChartData: res.data})
                });
        }

        if (that.props.activeGraph === 1) {
            that.setState({loading: true});
            axios.get('https://social-media-analysis-api.herokuapp.com/getockhiretweets')
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
                axios.get('https://social-media-analysis-api.herokuapp.com/getpollutionretweets')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pieChartData: res.data})
                    });
            }
            if (nextProps.activeGraph === 1) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getockhiretweets')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pieChartData: res.data})
                    });
            }
            if (nextProps.activeGraph === 2) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getpollutiontweetslocations')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pollutionTweetsLocationData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 3) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getpollutiontweetsfavorites')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pollutionTweetsFavoritesData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 4) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getpollutiontweetsmedia')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({pollutionTweetsMediaData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 5) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getockhitweetslocations')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({ockhiTweetsLocationData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 6) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getockhitweetsfavorites')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({ockhiTweetsFavoritesData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 7) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getockhitweetsmedia')
                    .then(function (res) {
                        that.setState({loading: false});
                        that.setState({ockhiTweetsMediaData: res.data.results})
                    });
            }
            if (nextProps.activeGraph === 8) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getmentionslinkspollution')
                    .then(function (res) {
                        that.setState({pollutionTweetsMentionsData: res.data , loading: false});
                    });
            }
            if (nextProps.activeGraph === 9) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getmentionslinksockhi')
                    .then(function (res) {
                        that.setState({ockhiTweetsMentionsData: res.data , loading: false});
                    });
            }
            if (nextProps.activeGraph === 10) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getreplypollution')
                    .then(function (res) {
                        that.setState({pollutionTweetsReplyData: res.data , loading: false});
                    });
            }
            if (nextProps.activeGraph === 11) {
                that.setState({loading: true});
                axios.get('https://social-media-analysis-api.herokuapp.com/getreplyockhi')
                    .then(function (res) {
                        that.setState({ockhiTweetsReplyData: res.data , loading: false});
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
                        {'We\'re loading the data. This may take upto 1 minute, please wait...'}
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 0) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {`${this.state.pieChartData.retweeted} are retweeted and ${this.state.pieChartData.not_retweeted} tweets are original tweets`}
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
                        {`${this.state.pieChartData.retweeted} are retweeted and ${this.state.pieChartData.not_retweeted} tweets are original tweets`}
                    </div>
                    <div>
                        <Pie
                            data={getRetweetChartData(this.state.pieChartData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 2) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'This graph shows the locations of users who tweeted'}
                    </div>
                    <div>
                        <HorizontalBar
                            data={getPollutionTweetsLocationData(this.state.pollutionTweetsLocationData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 3) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'This graph shows favorite count of original tweets'}
                    </div>
                    <div>
                        <Bar
                            data={getPollutionTweetsFavoritesData(this.state.pollutionTweetsFavoritesData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 4) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Distribution of type of tweets'}
                    </div>
                    <div>
                        <Doughnut
                            data={getPollutionTweetsMediaData(this.state.pollutionTweetsMediaData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 5) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'This graph shows the locations of users who tweeted'}
                    </div>
                    <div>
                        <HorizontalBar
                            data={getOckhiTweetsLocationData(this.state.ockhiTweetsLocationData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 6) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'This graph shows favorite count of original tweets'}
                    </div>
                    <div>
                        <Bar
                            data={getOckhiTweetsFavoritesData(this.state.ockhiTweetsFavoritesData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 7) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Distribution of type of tweets'}
                    </div>
                    <div>
                        <Doughnut
                            data={getPollutionTweetsMediaData(this.state.ockhiTweetsMediaData)}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 8) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Network graph of mentions in Tweets (You may zoom, select and move nodes)'}
                    </div>
                    <div className="netgraph">
                        <Graph
                             id='graph-id'
                            data={this.state.pollutionTweetsMentionsData}
                            config={getPollutionTweetsMentionsData()}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 9) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Network graph of mentions in Tweets (You may zoom, select and move nodes)'}
                    </div>
                    <div className="netgraph">
                        <Graph
                             id='graph-id1'
                            data={this.state.ockhiTweetsMentionsData}
                            config={getPollutionTweetsMentionsData()}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 10) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Network graph of replies of Tweets '}
                    </div>
                    <div className="netgraph">
                        <Graph
                             id='graph-id2'
                            data={this.state.pollutionTweetsReplyData}
                            config={getPollutionTweetsMentionsData()}
                        />
                    </div>
                </div>
            );
        } else if (that.props.activeGraph === 11) {
            return (
                <div className="plotArea">
                    <div
                        className="heading"
                    >
                        {'Network graph of replies Tweets'}
                    </div>
                    <div className="netgraph">
                        <Graph
                             id='graph-id3'
                            data={this.state.ockhiTweetsReplyData}
                            config={getPollutionTweetsMentionsData()}
                        />
                    </div>
                </div>
            );
        } else {
            return <div>{'Could not load graph'}</div>
        }
    }
}

Plotarea.propTypes = {
    activeGraph: PropTypes.number,
};

export default Plotarea;
