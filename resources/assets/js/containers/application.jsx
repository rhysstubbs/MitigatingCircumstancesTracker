import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Routes from 'MCT/routes';
import {Provider} from 'react-redux';
import configureStore from 'MCT/store/index';
import {Container, Row, Col} from 'reactstrap';
import Header from 'MCT/views/global/header';

const initialState = window.app;

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
                            <Routes isAdmin={initialState.user.isAdmin}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * Static helper to mount the application in an element by ID
 */
Application.mount = function (id) {

    const ThemedApplication = withRouter(Application);
    const store = configureStore(initialState);

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

export default Application;