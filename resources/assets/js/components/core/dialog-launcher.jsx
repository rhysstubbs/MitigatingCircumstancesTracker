import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class DialogLauncher extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            open: false
        }
    }

    toggle() {
        this.setState({open: !this.state.open})
    };

    render() {
        const Dialog = this.props.dialog;

        return (
            <div>
                <Button className={this.props.className} disableRipple={true} disableFocusRipple={true} onClick={this.toggle} size={this.props.size} variant={this.props.variant} color={this.props.color}>
                    {this.props.buttonText}
                </Button>

                <Dialog  data={this.props.dialogData} open={this.state.open} onClose={this.toggle}/>
            </div>
        );
    }

}

DialogLauncher.propTypes = {
    dialogData: PropTypes.object
};

export default DialogLauncher;