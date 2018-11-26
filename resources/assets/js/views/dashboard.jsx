import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Timeline} from 'react-twitter-widgets';

const mapStateToProps = state => {
    return {
        username: state.user.username
    }
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>Welcome back, {this.props.username} </h4>

                <div className={'mt-5'}>
                    <h5>Recent BU News</h5>
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'bournemouthuni'
                        }}
                        options={{
                            username: 'bournemouthuni',
                            height: '400'
                        }}
                    />
                </div>
            </div>
        )
    }

}

Dashboard.propTypes = {
    username: PropTypes.string
};

export default connect(mapStateToProps)(Dashboard);