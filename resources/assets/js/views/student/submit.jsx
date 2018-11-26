import React from "react";
import Select from 'react-select';
import Dropzone from 'react-dropzone'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {compose} from "recompose";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {connect} from 'react-redux';
import {postRequest} from "MCT/store/action-creators/requests";
import Checkbox from '@material-ui/core/Checkbox';
import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Form,
    Label,
    Input,
    FormText,
    Alert
} from 'reactstrap';

import {
    faFileWord,
    faFilePowerpoint,
    faFilePdf,
    faFileAudio,
    faFileAlt,
    faFileImage
} from '@fortawesome/free-solid-svg-icons';
import Slide from '@material-ui/core/Slide';

import {faFileUpload, faInfoCircle, faGraduationCap, faTimes} from '@fortawesome/free-solid-svg-icons';
import Loader from "MCT/components/core/loader";
import Typography from "@material-ui/core/Typography/Typography";
import {withRouter} from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";

library.add(faFileUpload, faInfoCircle, faGraduationCap, faTimes);
library.add(faFileWord, faFilePdf, faFilePowerpoint, faFileAudio, faFileAlt, faFileImage);

const IconFileExtensionMappings = {
    pdf: "file-pdf",
    docx: "file-word",
    png: "file-image"
};

const reasons = [
    {
        value: 0,
        label: "Illness"
    },
    {
        value: 1,
        label: "Family Illness"
    },
    {
        value: 2,
        label: "Pregnancy related illness"
    },
    {
        value: 3,
        label: "Unforeseen travel disruption"
    },
    {
        value: 4,
        label: "Acute Personal difficulties"
    },
    {
        value: 'other',
        label: "Other"
    }
];


const mapDispatchToProps = {
    postRequest
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
    },
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SubmitRequestView extends React.Component {

    constructor(props) {
        super(props);

        this.form = React.createRef();

        this.state = {
            activeStep: 0,
            description: null,
            files: [],
            selectedSubjects: [],
            declinedFiles: [],
            formErrors: [],
            fileUploadErrors: [],
            showErrors: false,
            loading: false,
            extension: false,
            reason: null
        };
    }

    static getIconForFileType(fileName) {

        let fileExtension = SubmitRequestView.getFileExtension(fileName);

        if (!fileExtension) {
            return <FontAwesomeIcon icon={"fa-file-alt"}/>
        }

        return <FontAwesomeIcon icon={IconFileExtensionMappings[fileExtension]} color={'#CCCCCC'}/>
    }

    static getFileExtension(fileName) {
        let fn = fileName.split('.');

        if (fn.length === 0) {
            return null;
        }

        return fn.pop().toLowerCase();
    };

    submit = (event) => {

        this.setState({
            loading: true
        });

        event.preventDefault();

        let request = {
            owner: this.props.user.username,
            description: this.state.description,
            files: this.state.files
        };

        this.props.postRequest(request)
            .then(response => {

                this.setState({
                    loading: false
                });

                return response;
            })
            .then(response => {
                this.props.history.push('/requests');
            });
    };

    removeFile = (fileName) => {

        let currentFiles = this.state.files;

        if (currentFiles) {

            currentFiles.forEach((file) => {
                if (file.name === fileName) {

                    let index = currentFiles.indexOf(file);
                    currentFiles.splice(index, 1);
                }
            });

            this.setState({
                files: currentFiles
            })
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleCheckChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    onDrop(accepted, declined) {

        let existingFiles = this.state.files;
        let fileUploadErrors = [];

        if (accepted) {

            accepted.forEach((file) => {

                if (existingFiles.length >= 1) {
                    existingFiles.forEach((existingFile) => {

                        if (file.name === existingFile.name) {

                            fileUploadErrors.push(`Files with the same name cannot be uploaded, please rename "${file.name}"`);

                        } else {
                            existingFiles.push(file);
                        }
                    });
                } else {
                    existingFiles.push(file);
                }

            });

            this.setState({
                files: existingFiles
            });

        } else if (declined) {
            declined.forEach((declinedFile) => {
                fileUploadErrors.push(`You have uploaded an supported file type, do NOT upload file with the extension ${SubmitRequestView.getFileExtension(declinedFile)}`);
            })
        }

        this.setState({
            fileUploadErrors: fileUploadErrors
        });
    }

    getSteps = () => {
        return ['General Details', 'Create an ad group', 'Evidence', 'Sign and Submit'];
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <FormGroup row={false} className={'mb-3'}>

                            <Label for="description">
                                <i className={'mr-2'}>
                                    <FontAwesomeIcon icon={'info-circle'} color={'#CCCCCC'}/>
                                </i>
                                Provide details:
                            </Label>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.extension}
                                        onChange={this.handleCheckChange('extension')}
                                        value='extension'
                                    />
                                }
                                label="Is this a assignment extension request?"
                            />
                        </FormGroup>

                        <FormGroup row={false} className={'mb-3'}>
                            <Input type="textarea"
                                   name="description"
                                   id="description"
                                   rows={8}
                                   onChange={this.handleChange}
                                   value={this.state.description}
                                   placeholder="Description"
                            />
                        </FormGroup>

                        <FormGroup row={false} className={'mb-3'}>

                            <Label>
                                <i className={'mr-2'}>
                                    <FontAwesomeIcon icon={'graduation-cap'} color={'#CCCCCC'}/>
                                </i>
                                Which subject(s) does this affect?
                            </Label>


                            <Select
                                value={this.state.subjects}
                                onChange={this.handleChange}
                                options={[]}
                                isMulti={true}
                            />
                        </FormGroup>

                        <Label for="description">
                            <i className={'mr-2'}>
                                <FontAwesomeIcon icon={'info-circle'} color={'#CCCCCC'}/>
                            </i>
                            Reason:
                        </Label>


                        <FormGroup className={'mb-3'}>
                            <Select
                                value={this.state.reason}
                                onChange={this.handleChange}
                                options={reasons}
                                isMulti={true}
                            />
                        </FormGroup>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <FormGroup row={false} className={'mb-3'}>

                            <Typography variant={"headline"} gutterBottom>
                                Exceptional Circumstances Details
                            </Typography>

                            <Label>{"Date the Circumstance started"}</Label>

                            <TextField
                                id="date"
                                label="Date started"
                                type="date"
                                required={true}
                                className={styles.textField}
                                fullWidth={false}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange}
                                name={'dateStarted'}
                            />
                        </FormGroup>

                        <FormGroup row={false} className={'mb-3'}>

                            <Label>{"Date the Circumstance Ended"}</Label>

                            <TextField
                                id="date"
                                label="Date end"
                                type="date"
                                required={true}
                                className={styles.textField}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </FormGroup>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <FormGroup>
                            <Label for="evidence">
                                <i className={'mr-2'}>
                                    <FontAwesomeIcon icon="file-upload" color={'#CCCCCC'}/>
                                </i>Supporting Evidence</Label>
                            <div>

                                <div>
                                    {this.state.fileUploadErrors.map((error) =>
                                        <Alert color="danger">
                                            {error}
                                        </Alert>
                                    )}
                                </div>

                                <div className="dropzone">
                                    <Dropzone style={{
                                        width: "100%",
                                        height: "200px",
                                        border: '2px dashed #D81476',
                                        padding: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        backgroundColor: "#f8f9fa"
                                    }} onDrop={this.onDrop.bind(this)}
                                              accept=".jpeg, .png, .pdf, .docx, .doc">
                                        <p className={'font-weight-bold'}>Try dropping some files here, or click to
                                            select files to upload.</p>
                                        <small>Please upload any significant and relevant evidence that you feel will
                                            provide
                                            support for
                                            you request.
                                        </small>
                                    </Dropzone>
                                </div>
                                <aside>
                                    {this.state.files.length > 0 ?
                                        <h6 className={'mt-3'}>Dropped files</h6> : null}

                                    <ListGroup>
                                        {this.state.files.map((file) =>
                                            <ListGroupItem key={file.name}
                                                           style={{position: "relative"}}>
                                                <i className={'mr-2'}>{SubmitRequestView.getIconForFileType(file.name)}</i> {file.name}

                                                <div className={'actions'} style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    top: 6,
                                                    paddingRight: "1.25rem"
                                                }}>
                                                    <Button size={'xs'} color={"link"}
                                                            onClick={() => this.removeFile(file.name)}><FontAwesomeIcon
                                                        icon={"times"} color={'#dc3545'}/></Button>
                                                </div>
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </aside>
                            </div>
                        </FormGroup>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {

        const {classes} = this.props;
        const steps = this.getSteps();
        const {activeStep} = this.state;

        return (
            <Form className={styles.container} onSubmit={this.submit}>

                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{this.getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}>
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={activeStep === steps.length - 1 ? this.submit : this.handleNext}
                                                className={classes.button}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}

                    <Loader isLoading={this.state.loading} fullScreen={true}/>

                </Stepper>
            </Form>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(SubmitRequestView)