import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

class Sidebar extends React.Component {
    onClick(graphNumber) {
        this.props.onSideBarItemClick(graphNumber);
    }

    render() {
        const that = this;

        return (
            <div className="sidebar">
                <div
                    className={classnames('sidebar__item', {active: this.props.activeGraph === 0})}
                    onClick={_.partial(that.onClick.bind(that), 0)}
                >
                    <div>{'Pollution Retweets Curve'}</div>
                </div>
                <div
                    className={classnames('sidebar__item', {active: this.props.activeGraph === 1})}
                    onClick={_.partial(that.onClick.bind(that), 1)}
                >
                    {'Ockhi Retweets Curve'}
                </div>
                <div
                    className={classnames('sidebar__item', {active: this.props.activeGraph === 2})}
                    onClick={_.partial(that.onClick.bind(that), 2)}
                >
                    {'Third Graph'}
                </div>
                <div
                    className={classnames('sidebar__item', {active: this.props.activeGraph === 3})}
                    onClick={_.partial(that.onClick.bind(that), 3)}
                >
                    {'Fourth Graph'}
                </div>
                <div
                    className={classnames('sidebar__item', {active: this.props.activeGraph === 4})}
                    onClick={_.partial(that.onClick.bind(that), 4)}
                >
                    {'Fifth Graph'}
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