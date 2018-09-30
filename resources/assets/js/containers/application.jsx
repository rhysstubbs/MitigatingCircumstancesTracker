import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Routes from 'MCT/routes';

import { Container, Row, Col } from 'reactstrap';

import Header from 'MCT/views/global/header';
import Footer from "MCT/views/global/footer";

/**
 * Main dashboard.html component
 */
class Application extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: window.app.username
        };

    }

    render() {
        return (
            <div>
                <Header username={this.state.username}/>

                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Routes isStaff={false}/>
                        </Col>
                    </Row>
                </Container>

                <Footer/>
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
        <Router>
            <ThemedApplication/>
        </Router>,
        document.getElementById(id)
    );
};

export default Application;