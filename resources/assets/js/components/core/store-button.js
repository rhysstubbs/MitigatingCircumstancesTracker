import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";

class StoreButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button className={"btn-mini outlined-primary"}
                    disableRipple={true}
                    disableFocusRipple={true}
                    variant="outlined"
                    color="primary"
                    size="small"
                    {...this.props}>
                {this.props.buttontext}
            </Button>
        );
    }
}

StoreButton.propTypes = {
    buttontext: PropTypes.string,
};

export default StoreButton;