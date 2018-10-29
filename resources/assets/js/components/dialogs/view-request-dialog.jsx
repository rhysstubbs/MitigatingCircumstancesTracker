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
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faFile} from '@fortawesome/free-solid-svg-icons';
import {editRequest} from "MCT/store/actions";

library.add(faTimes, faFile);
import {connect} from 'react-redux';

const mapDispatchToProps = {
    editRequest,
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

        this.state = {};
        this.initialState = this.state;
    }

    close = () => {
        this.props.onClose();
        this.setState(this.initialState);
    };

    render() {
        return (
            <div>
                <Dialog fullScreen={true}
                        open={this.props.open}
                        TransitionComponent={Transition}
                        onClose={this.props.onClose}
                        onExited={() => this.setState(this.initialState)}>

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
                                        Status: <span className={'text-secondary'}>{this.props.data.status}</span>
                                    </Typography>

                                    <Typography color="textPrimary" gutterBottom>
                                        Date Submitted: <span className={'text-secondary'}><Moment
                                        format="DD/MM/YYYY">{this.props.data.dateSubmitted}</Moment></span>
                                    </Typography>

                                    <hr/>

                                    <div>
                                        <Typography variant={"headline"} gutterBottom>
                                            Description:
                                        </Typography>

                                        <Typography variant={"body1"}>{this.props.data.description}</Typography>
                                    </div>

                                    <hr/>

                                    <List>
                                        <ListItem>
                                            <Avatar>
                                                <FontAwesomeIcon icon={"file"}/>
                                            </Avatar>
                                            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                                        </ListItem>

                                        <ListItem>
                                            <Avatar>
                                                <FontAwesomeIcon icon={"file"}/>
                                            </Avatar>
                                            <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                                        </ListItem>

                                        <ListItem>
                                            <Avatar>
                                                <FontAwesomeIcon icon={"file"}/>
                                            </Avatar>
                                            <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                                        </ListItem>
                                    </List>

                                </CardContent>

                                <CardActions>
                                    <Button onClick={() => this.props.editRequest({status: "Approved"})} variant={'contained'} color="secondary" className={'mr-3'}>Approve</Button>
                                    <Button onClick={() => this.props.editRequest({status: "Archived"})} variant={"contained"} color="primary" className={'mr-3'}>Archive</Button>
                                </CardActions>
                            </Card>
                        </Paper>


                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

ViewRequestDialog.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ViewRequestDialog));