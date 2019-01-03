import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountIcon from "@material-ui/icons/AccountBoxRounded";
import Typography from "@material-ui/core/es/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import FormGroup from "@material-ui/core/es/FormGroup";
import Button from "@material-ui/core/Button";
import {loadCSS} from "fg-loadcss";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import MailIcon from "@material-ui/icons/Mail";
import SaveIcon from "@material-ui/icons/Save";

const drawerWidth = 320;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginRight: 20
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2
    },
    bottomActions: {
        padding: theme.spacing.unit * 3,
        position: 'absolute',
        bottom: 0,
        left: 0
    }
});

class AccountDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: true
        };
    }

    handleSave = (event) => {
        event.preventDefault();

        alert("Coming Soon.")
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {

        const {classes} = this.props;

        const {onClose, open} = this.props;

        return (
            <React.Fragment>
                <Drawer anchor="right"
                        open={open}
                        onClose={onClose}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>

                    <div tabIndex={0}
                        role="button">

                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={onClose}
                                    className={classes.menuButton}>
                                    <AccountIcon/>
                                </IconButton>
                                <Typography variant="h6" color="inherit" noWrap>
                                    Account Settings
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <main className={classes.content}>
                            <div className={classes.toolbar}/>

                            <form onSubmit={this.handleSave}>

                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <Typography variant={"h5"} color={"primary"}
                                                gutterBottom>Notifications</Typography>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.notifications}
                                                onChange={this.handleChange}
                                                value="notifications"
                                            />
                                        }
                                        label="Receive Notifications"
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl} fullWidth={true}>

                                    <Typography variant={"body1"} color={"primary"} gutterBottom>Slack</Typography>

                                    <Input
                                        id="input-with-icon-adornment"
                                        placeholder={'Username'}
                                        fullWidth
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Icon className={classNames(classes.icon, 'fab fa-slack')}
                                                      style={{color: '#3eb991'}}/>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl} fullWidth={true}>

                                    <Typography variant={"body1"} color={"primary"} gutterBottom>Email</Typography>

                                    <Input
                                        id="input-with-icon-adornment"
                                        placeholder={'someone@example.com'}
                                        fullWidth={true}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailIcon style={{color: '#5c7cfa'}}/>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormGroup className={classes.bottomActions}>
                                    <Button variant="contained" size="medium" type={'submit'} color={"secondary"}
                                            className={classes.button}>
                                        <SaveIcon className={classes.menuButton}/>
                                        Save
                                    </Button>
                                </FormGroup>
                            </form>
                        </main>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}

AccountDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountDrawer)