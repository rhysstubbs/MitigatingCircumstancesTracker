import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import {connect} from 'react-redux';
import * as actions from "MCT/store/actions";

import * as actionCreators from "MCT/store/action-creators/requests";

const mapDispatchToProps = {
    ...actions,
    ...actionCreators
};

class StoreButton extends React.Component {

    constructor(props) {
        super(props);

        console.log("STORE BUTTON", this);
    }

    render() {
        return (
            <Button className={"btn-mini outlined-primary"}
                    disableRipple={true}
                    disableFocusRipple={true}
                    variant="outlined"
                    color="primary"
                    size="small"
                    {...props}>
                {this.props.buttonText}
            </Button>
        );
    }
}

StoreButton.propTypes = {
    buttonText: PropTypes.string,
    action: PropTypes.string.isRequired,
    actionParams: PropTypes.object
};

export default connect(null, mapDispatchToProps)(StoreButton);