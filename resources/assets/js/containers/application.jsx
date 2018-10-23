import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Routes from 'MCT/routes';
import {Provider} from 'react-redux';
import store from '../store';
import {Container, Row, Col} from 'reactstrap';
import Header from 'MCT/views/global/header';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        isAdmin: state.user.isAdmin
    }
};

/**
 * Main dashboard component
 */
class Application extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>

                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Routes isAdmin={this.state.isAdmin}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * Static helper to mount the dashboard.html in an element by ID
 */
Application.mount = function (id) {

    const ThemedApplication = withRouter(Application);

    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <ThemedApplication/>
            </Router>
        </Provider>
        ,
        document.getElementById(id)
    );
};

export default connect(mapStateToProps)(Application);