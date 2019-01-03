import React from "react";
import PropTypes from 'prop-types';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class RequestMoreInfoDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reasonForInfo: "",
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <React.Fragment>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.props.open}
                    onClose={this.props.onClose}
                    onOpen={this.props.onOpen}>

                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.onClick}
                        onKeyDown={this.props.onClick}>
                    </div>

                    <div className={'pt-5 pb-5 pl-2 pr-2'}>

                        <Typography variant={"headline"} color="primary" gutterBottom>Request further
                            information</Typography>

                        <TextField
                            id="outlined-full-width"
                            label="Details"
                            required
                            style={{marginBottom: 20}}
                            placeholder="Give details of the extra information you need..."
                            helperText="Pleas ensure you are clear and concise as this will be sent to the student as well as other staff."
                            fullWidth
                            multiline
                            rowsMax="4"
                            value={this.state.reasonForInfo}
                            onChange={this.handleChange('reasonForInfo')}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button
                            onClick={this.props.onClick}
                            variant={"outlined"}
                            disabled={this.state.reasonForInfo.length <= 0}
                            color="primary">Send</Button>

                    </div>

                </SwipeableDrawer>
            </React.Fragment>
        );
    }
}


RequestMoreInfoDrawer.defaultProps = {
    open: false
};

RequestMoreInfoDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onClick: PropTypes.func
};

export default RequestMoreInfoDrawer;