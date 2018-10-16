import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

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

class ArchiveRequestDialog extends React.Component {

    constructor(props) {
        super(props);

        this.classes = this.props.classes;

        this.state = {};

        this.initialState = this.state;
        this.handleExit = this.handleExit.bind(this);
    }

    handleExit() {
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
                <Dialog fullScreen
                        open={this.props.open}
                        TransitionComponent={Transition}
                        onClose={this.props.onClose}
                        onExited={this.handleExit}>

                    <DialogContent className={this.classes.content}>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ArchiveRequestDialog);