import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";

import {connect} from 'react-redux';

import * as actions from "MCT/store/actions";

const mapDispatchToProps = {
    ...actions
};

class StoreButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button className={"btn-mini outlined-primary"}
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={this.props[this.props.action]}
                    variant="outlined"
                    color="primary"
                    size="small">
                {this.props.buttonText}
            </Button>
        );
    }
}

StoreButton.propTypes = {
    buttonText: PropTypes.string,
    action: PropTypes.string
};

export default connect(null, mapDispatchToProps)(StoreButton);