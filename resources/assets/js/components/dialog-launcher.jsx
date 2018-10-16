import React from 'react';
import Button from '@material-ui/core/Button';

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
                <Button className={this.props.className} onClick={this.toggle} size={this.props.size} variant={this.props.variant} color={this.props.color}>
                    {this.props.buttonText}
                </Button>

                <Dialog open={this.state.open} data={this.props.dialogData} onClose={this.toggle}/>

            </div>
        );
    }

}

export default DialogLauncher;