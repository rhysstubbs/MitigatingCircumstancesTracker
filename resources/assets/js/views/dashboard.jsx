import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Timeline} from 'react-twitter-widgets';

const mapStateToProps = state => {
    return {
        name: state.user.name
    }
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h4>{this.props.name}, welcome back!</h4>

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
            </React.Fragment>
        )
    }

}

Dashboard.propTypes = {
    name: PropTypes.string
};

export default connect(mapStateToProps)(Dashboard);