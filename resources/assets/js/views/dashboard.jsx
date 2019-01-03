import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Timeline} from 'react-twitter-widgets';
import {compose} from "recompose";

import {Row, Col} from 'reactstrap';
import Typography from "@material-ui/core/es/Typography/Typography";
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from "@material-ui/icons/Face";
import Moment from "react-moment";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {clearNotification} from "MCT/store/action-creators/user";

const mapStateToProps = state => {
    return {
        name: state.user.name,
        notifications: state.user.notifications
    }
};

const mapDispatchToProps = {
    clearNotification
};

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 1.5,
        width: '100%'
    },
    notificationIcon: {
        position: "absolute",
        top: 0,
        right: 0
    }
});

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    getNotifications = () => {

        if (this.props.notifications.length === 0) {
            return (<Typography variant={"body1"} color={"secondary"}>No new notifications!</Typography>);
        }

        return this.props.notifications.map((notification) => {
            return (
                <ListItem alignItems="flex-start" key={notification.id}>
                    <ListItemIcon>
                        <FaceIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={notification.title}
                        secondary={
                            <React.Fragment>
                                <Typography color="textPrimary">{notification.description}</Typography>
                                <Moment format="DD/MM/YYYY">{notification.created}</Moment>
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={this.props.clearNotification.bind(null, {id: notification.id, username: this.props.name})}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });
    };

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant={"h4"} className={'mb-5'}>{this.props.name}, welcome
                    back!</Typography>

                <Row>
                    <Col xs={6} sm={12} md={12} lg={12}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant={"h5"} color={"primary"} gutterBottom={true} style={{position: "relative"}}>BU News</Typography>
                                <Timeline
                                    dataSource={{
                                        sourceType: 'profile',
                                        screenName: 'bournemouthuni'
                                    }}
                                    options={{
                                        username: 'bournemouthuni',
                                        height: '400'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Col>

                    <Col xs={6} sm={12} md={12} lg={12}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant={"h5"} color={"primary"} gutterBottom={true}
                                            style={{position: "relative"}}>Notifications
                                    <Badge className={classes.notificationIcon}
                                           badgeContent={this.props.notifications.length} color="secondary">
                                        <NotificationsIcon/>
                                    </Badge>
                                </Typography>

                                <List dense={false}>
                                    {this.getNotifications()}
                                </List>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>

            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    name: PropTypes.string,
    notifications: PropTypes.array,
    classes: PropTypes.object,
    clearNotification: PropTypes.func
};

Dashboard.defaultProps = {
    notifications: []
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);