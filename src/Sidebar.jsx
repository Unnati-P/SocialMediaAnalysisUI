import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPollution: true,
            showOckhi: true,
        };
    }

    onPollutionClick = () => {
        this.setState({showPollution: !this.state.showPollution})
    };

    onOckhiClick = () => {
        this.setState({showOckhi: !this.state.showOckhi})
    };

    onClick(graphNumber) {
        this.props.onSideBarItemClick(graphNumber);
    }

    render() {
        const that = this;

        return (
            <div className="sidebar">
                <div className="main-heading">
                    <div onClick={this.onPollutionClick}>{'Pollution Data Analysis'}</div>
                    {this.state.showPollution && (
                        <div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 0})}
                                onClick={_.partial(that.onClick.bind(that), 0)}
                            >
                                <div>{'Pollution Retweets Chart'}</div>
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 2})}
                                onClick={_.partial(that.onClick.bind(that), 2)}
                            >
                                {'Pollution tweets Users/Location Chart'}
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 3})}
                                onClick={_.partial(that.onClick.bind(that), 3)}
                            >
                                {'Pollution tweets Favorite count Chart'}
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 4})}
                                onClick={_.partial(that.onClick.bind(that), 4)}
                            >
                                {'Pollution tweets with image and texts'}
                            </div>
                        </div>
                    )}
                </div>

                <div className="main-heading">
                    <div onClick={this.onOckhiClick}>{'Ockhi Storm Data Analysis'}</div>
                    {this.state.showOckhi && (
                        <div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 1})}
                                onClick={_.partial(that.onClick.bind(that), 1)}
                            >
                                {'Ockhi Retweets Chart'}
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 5})}
                                onClick={_.partial(that.onClick.bind(that), 5)}
                            >
                                {'Ockhi storm tweets Users/Location Chart'}
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 6})}
                                onClick={_.partial(that.onClick.bind(that), 6)}
                            >
                                {'Ockhi tweets Favorite count Chart'}
                            </div>
                            <div
                                className={classnames('sidebar__item', {active: this.props.activeGraph === 7})}
                                onClick={_.partial(that.onClick.bind(that), 7)}
                            >
                                {'Pollution tweets with image and texts'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    activeGraph: PropTypes.number,
    onSideBarItemClick: PropTypes.func,
};

export default Sidebar;
