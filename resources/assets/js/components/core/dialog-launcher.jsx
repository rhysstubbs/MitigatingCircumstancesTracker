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
    }

    render() {
        const Dialog = this.props.dialog;

        const Icon = this.props.buttonIcon;

        return (
            <div>
                <Button className={this.props.className}
                        disableRipple={true}
                        disableFocusRipple={true}
                        onClick={this.toggle}
                        size={this.props.size}
                        variant={this.props.variant}
                        color={this.props.color}>
                    {typeof Icon !== 'undefined' ? <Icon/> : null}
                    {this.props.buttonText}
                </Button>

                {this.state.open ?
                    <Dialog data={this.props.dialogData} open={this.state.open} onClose={this.toggle}/> : null}
            </div>
        );
    }

}

DialogLauncher.propTypes = {
    dialogData: PropTypes.object,
    buttonText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    dialog: PropTypes.func,
    size: PropTypes.string,
    buttonIcon: PropTypes.func
};

export default DialogLauncher;