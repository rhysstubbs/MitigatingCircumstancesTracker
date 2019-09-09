import React from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from "prop-types";

const styles = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(130, 130, 130, 0.5)"
};

class Loader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.fullScreen && this.props.isLoading ? styles : {}}>
                <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.props.isLoading}
                />
            </div>
        )
    }
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool
};

Loader.defaultProps = {
    isLoading: false,
    fullScreen: false
};

export default Loader;