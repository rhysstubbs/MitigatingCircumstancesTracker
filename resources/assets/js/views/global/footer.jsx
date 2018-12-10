import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {}
};

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                <footer className={classes.root}>

                </footer>
            </React.Fragment>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(Footer);