import React from "react";
import PropTypes from 'prop-types';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {toast} from "react-toastify";
import {requestMoreInfo} from "MCT/store/action-creators/requests";
import {compose} from "recompose";
import connect from "react-redux/es/connect/connect";
import Loader from "MCT/components/core/loader";

const mapDispatchToProps = {
    requestMoreInfo
};

class RequestMoreInfoDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            reasonForInfo: ""
        };

        this.initialState = this.state;
    }

    markAsMoreInfo = () => {

        this.setState({
            loading: true
        });

        const payload = {
            requestId: this.props.data.id,
            data: {
                description: this.state.reasonForInfo,

            }
        };

        this.props.requestMoreInfo(payload)
            .then((response) => {
                toast.success(
                    `Request ${this.props.data.id} was updated.`,
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
            .then(() => {
                this.setState({loading: false});
                this.props.onClose();
            });
    };

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
                        onClick={this.props.onClose}
                        onKeyDown={this.props.onClose}>
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
                            onClick={this.markAsMoreInfo}
                            variant={"outlined"}
                            disabled={this.state.reasonForInfo.length <= 0}
                            color="primary">Send</Button>

                    </div>

                    <Loader isLoading={this.state.loading} fullScreen={true}/>

                </SwipeableDrawer>
            </React.Fragment>
        );
    }
}

RequestMoreInfoDrawer.defaultProps = {
    open: false,
    data: {}
};

RequestMoreInfoDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    data: PropTypes.object,
    requestMoreInfo: PropTypes.func
};

export default compose(connect(null, mapDispatchToProps))(RequestMoreInfoDrawer);