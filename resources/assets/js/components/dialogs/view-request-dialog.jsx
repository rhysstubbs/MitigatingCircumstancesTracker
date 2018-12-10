import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FileIcon from '@material-ui/icons/FileCopy';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTimes, faFile} from '@fortawesome/free-solid-svg-icons';
import {markRequestAs} from "MCT/store/action-creators/requests";
import Loader from 'MCT/components/core/loader';

import {REQUEST_APPROVED, REQUEST_ARCHIVED} from 'MCT/constants/request-status';
import {toast} from 'react-toastify';

library.add(faTimes, faFile);
import {connect} from 'react-redux';

const mapDispatchToProps = {
    markRequestAs,
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    content: {
        position: 'relative',
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        minWidth: '100%',
        flexDirection: 'column',
    },
    contentTop: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.default,
        flexGrow: 0,
        paddingBottom: 0,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
        }
    },
    form: {
        width: '580px',
        height: 'fit-content'
    },
    buttons: {
        display: 'block'
    },
    button: {
        marginRight: '10px'
    },
    label: {
        color: '#fff'
    },
    group: {
        marginBottom: '18px',
        display: 'block'
    },
    bottomGroup: {
        marginTop: '48px',
        display: 'block'
    },
    totalGroup: {
        paddingTop: '18px',
        marginBottom: '18px'
    },
    bold: {
        fontWeight: 700
    },
    businessName: {
        fontWeight: '700'
    },
    input: {
        textAlign: 'left',
        padding: '2px 0 2px 12px',
        color: '#fff !important',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        }
    },
    inputRoot: {
        minWidth: '170px'
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center'
    },
    gridRight: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    info: {
        position: 'relative',
        minWidth: '100%',
        height: 'fit-content',
        [theme.breakpoints.up('sm')]: {
            minWidth: '300px',
        }
    },
    infoContent: {
        position: 'relative',
        padding: '12px !important',
        [theme.breakpoints.up('sm')]: {
            padding: '24px !important',
        },
    },
    infoLeft: {
        borderRight: '2px solid #333333',
        padding: '6px',
    },
    infoRight: {
        padding: '6px 8px 6px 8px',
    },
    infoWrap: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        minHeight: 'fit-content',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
        }
    },
    formWrap: {
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        height: '100%'
    }
});

class ViewRequestDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            reasonToDeny: "",
            draws: {
                denyDrawIsOpen: false,
            }
        };

        this.initialState = this.state;
    }

    toggleDrawer = (side, open) => () => {

        if (side === '*' && open === false) {

            Object.keys(this.state.draws).forEach((key) => {
                this.setState({
                    [key]: open
                });
            })
        }

        this.setState({
            draws: {
                [side]: open
            },
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

    markAs = (status) => {
        this.setState({
            loading: true
        });

        const payload = {
            requestId: this.props.data.id,
            status: status,
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

    getEvidenceFiles = () => {

        const files = this.props.data.files;

        if (files && files.length > 0) {

            return (
                <List>
                    {files.map((file) => {
                        return (
                            <ListItem key={file.name}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FileIcon color={"action"}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={file.name.toLowerCase()}/>
                                <ListItemSecondaryAction>
                                    <Tooltip title="Coming Soon!">
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <a href={file.link}>
                                        <Tooltip title="Download">
                                            <IconButton aria-label="Download">
                                                <DownloadIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </a>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            )
        } else {

            return (<Typography variant={"body1"}>{"No Evidence was submitted."}</Typography>)
        }
    };

    getStudentActions = () => {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    };

    getAdminActions = () => {
        const status = this.props.data.status;
        let actions = [];

        if (status === 'Submitted') {

            actions.push(
                <Button onClick={this.markAs.bind(null, REQUEST_APPROVED)}
                        variant={'contained'}
                        color="secondary"
                        className={'mr-3'}>Approve</Button>
            );

            actions.push(
                <Button onClick={this.toggleDrawer('denyDrawIsOpen', true)}
                        variant={"contained"}
                        color="primary"
                        className={'mr-3'}>Deny</Button>
            );


        } else if (status !== 'Submitted' && status !== 'Archived') {
            actions.push(
                <Button
                    onClick={this.markAs.bind(null, REQUEST_ARCHIVED)}
                    variant={'contained'}
                    color="secondary"
                    className={'mr-3'}>Archive</Button>
            );
        }

        return (
            <React.Fragment>
                {actions.map((action) => action)}
            </React.Fragment>
        )

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    close = () => {
        this.props.onClose();
    };

    render() {
        return (
            <React.Fragment>
                <Dialog fullScreen={true}
                        open={this.props.open}
                        TransitionComponent={Transition}
                        onClose={this.props.onClose}
                        onExited={() => this.setState(this.initialState)}>

                    <Loader isLoading={this.state.loading} fullScreen={true}/>

                    <DialogContent style={{paddingTop: 80}}>
                        <AppBar>
                            <Toolbar>
                                <div style={{display: 'flex', flexGrow: 1}}>
                                    <Typography variant="title" color="inherit" noWrap className={'mr-5'}>
                                        {`Request`}
                                    </Typography>
                                </div>

                                <Button onClick={this.close} color={"default"} style={{color: '#fff'}}>
                                    Close
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <Paper elevation={1}>
                            <Card>
                                <CardContent>
                                    <Typography variant={"headline"} gutterBottom>
                                        Details:
                                    </Typography>

                                    <Typography color="textPrimary" gutterBottom>
                                        ID: <span className={'text-secondary'}>{this.props.data.id}</span>
                                    </Typography>

                                    <Typography color="textPrimary" gutterBottom>
                                        Student: <span className={'text-secondary'}>{this.props.data.owner.path[0].name}</span>
                                    </Typography>

                                    <Typography color="textPrimary" gutterBottom>
                                        Status: <span className={'text-secondary'}>{this.props.data.status}</span>
                                    </Typography>

                                    <Typography color="textPrimary" gutterBottom>
                                        Date Submitted: <span className={'text-secondary'}><Moment
                                        format="DD/MM/YYYY">{this.props.data.dateSubmitted}</Moment></span>
                                    </Typography>

                                    <hr/>

                                    <Typography color={"textPrimary"} gutterBottom>
                                        Date the issue started: <span className={'text-secondary'}><Moment
                                        format="DD/MM/YYYY">{this.props.data.dateStarted}</Moment></span>
                                    </Typography>

                                    {this.props.data.onGoing ?
                                        <Typography gutterBottom>Date the issue stopped: <span className={'text-secondary'}>This is an on-going problem.</span></Typography> :
                                        <Typography gutterBottom>Date the issue stopped: <span className={'text-secondary'}><Moment
                                            format="DD/MM/YYYY">{this.props.data.dateEnded}</Moment></span></Typography>
                                    }

                                    <Typography gutterBottom>Generel Reason: <span className={"text-secondary"}>{this.props.data.reason}</span></Typography>

                                    <hr/>

                                    <div>
                                        <Typography variant={"headline"} gutterBottom>
                                            Description:
                                        </Typography>

                                        <Typography variant={"body1"}>{this.props.data.description}</Typography>
                                    </div>

                                    <hr/>

                                    <div>
                                        <Typography variant={"headline"} gutterBottom>
                                            Evidence:
                                        </Typography>

                                        {this.getEvidenceFiles()}

                                    </div>

                                </CardContent>

                                <CardActions>
                                    {this.props.user.isAdmin ? this.getAdminActions() : this.getStudentActions()}
                                </CardActions>


                                <SwipeableDrawer
                                    anchor="bottom"
                                    open={this.state.draws.denyDrawIsOpen}
                                    onClose={this.toggleDrawer('denyDrawIsOpen', false)}
                                    onOpen={this.toggleDrawer('denyDrawIsOpen', true)}>

                                    <div
                                        tabIndex={0}
                                        role="button"
                                        onClick={this.toggleDrawer('denyDrawIsOpen', false)}
                                        onKeyDown={this.toggleDrawer('denyDrawIsOpen', false)}>
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

                            </Card>
                        </Paper>


                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}

ViewRequestDialog.propTypes = {
    data: PropTypes.object.isRequired,
    markRequestAs: PropTypes.func,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.object
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
)(ViewRequestDialog);