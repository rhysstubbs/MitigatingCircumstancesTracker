import React from "react";
import PropTypes from 'prop-types';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {REQUEST_ARCHIVED} from "MCT/constants/request-status";
import {toast} from "react-toastify";
import {markRequestAs} from "MCT/store/action-creators/requests";
import connect from "react-redux/es/connect/connect";
import {compose} from "recompose";

const mapDispatchToProps = {
    markRequestAs
};

class DenyRequestDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reasonToDeny: "",
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    markAsDenied = () => {

        this.setState({
            loading: true
        });

        const payload = {
            requestId: this.props.data.id,
            status: REQUEST_ARCHIVED,
            reason: this.state.reasonToDeny
        };

        this.props.markRequestAs(payload)
            .then((response) => {
                toast.success(
                    `Request ${this.props.data.id} was saved.`,
                    {
                        position: toast.POSITION.TOP_RIGHT
                    }
                );
                return response;
            })
            .then((response) => {

                this.setState(this.initialState);

                return response;
            })
            .then(() => this.close());
    };

    render() {
        return (
            <React.Fragment>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.props.open}
                    onClose={this.props.onClose}
                    onOpen={this.props.onOpen}>

                    <div tabIndex={0}
                         role="button"
                         onClick={this.props.onClose}
                         onKeyDown={this.props.onClose}>
                    </div>

                    <div className={'pt-5 pb-5 pl-2 pr-2'}>

                        <Typography variant={"headline"} color="primary" gutterBottom>Mark As
                            Denied</Typography>

                        <TextField
                            id="outlined-full-width"
                            label="Reason to Deny"
                            required
                            style={{marginBottom: 20}}
                            placeholder="E.g. The student no longer requires an extension."
                            helperText="Pleas ensure you are clear and concise as this will be sent to the student as well as other staff."
                            fullWidth
                            multiline
                            rowsMax="4"
                            value={this.state.reasonToDeny}
                            onChange={this.handleChange('reasonToDeny')}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button
                            onClick={this.markAsDenied}
                            variant={"outlined"}
                            disabled={this.state.reasonToDeny.length <= 0}
                            color="primary">Submit</Button>

                    </div>

                </SwipeableDrawer>
            </React.Fragment>
        );
    }
}


DenyRequestDrawer.defaultProps = {
    open: false,
    data: {}
};

DenyRequestDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onClick: PropTypes.func,
    data: PropTypes.object,
    markRequestAs: PropTypes.func
};

export default compose(connect(null, mapDispatchToProps))(DenyRequestDrawer);