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
import Loader from "MCT/components/core/loader";
import Typography from "@material-ui/core/Typography/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import reasons from 'MCT/fixtures/mct-reasons';
import {faFileUpload, faInfoCircle, faGraduationCap, faTimes} from '@fortawesome/free-solid-svg-icons';
import {isObjectEmpty} from "MCT/utils/helpers";
import PropTypes from 'prop-types';

library.add(faFileUpload, faInfoCircle, faGraduationCap, faTimes);
library.add(faFileWord, faFilePdf, faFilePowerpoint, faFileAudio, faFileAlt, faFileImage);

import {
    ListGroup,
    ListGroupItem,
    Button,
    Label,
    Input,
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

const IconFileExtensionMappings = {
    pdf: "file-pdf",
    docx: "file-word",
    png: "file-image"
};

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

class SubmitRequestView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            declinedFiles: [],
            formErrors: [],
            fileUploadErrors: [],
            loading: false,
            showOther: false,

            /** payload data */
            description: "",
            extension: false,
            reason: {},
            reasonOther: "",
            agreementSigned: false,
            dateStarted: "",
            dateEnded: "",
            onGoing: false,
            files: []
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
    }

    submit = () => {

        this.setState({
            loading: true
        });

        const request = {
            owner: this.props.user.username,
            extension: this.state.extension,
            description: this.state.description,
            reason: isObjectEmpty(this.state.reason) ?  this.state.reasonOther : this.state.reason.value,
            agreementSigned: this.state.agreementSigned,
            dateStarted: this.state.dateStarted,
            dateEnded: this.state.dateEnded,
            onGoing: this.state.onGoing,
            files: this.state.files
        };

        this.props.postRequest(request)
         .then(response => {

                this.setState({
                    loading: false
                });

                return response;
            })
         .then(() => {
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

    handleSubjectChange = (selectedOptions) => {
        this.setState({
            subjects: selectedOptions
        });
    };

    handleReasonChange = (selectedOption) => {

        if (selectedOption.value === 'Other') {

            this.setState({
                showOther: true
            });
        }

        this.setState({
            reason: selectedOption
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
        return ['General Details', 'Tell Us When', 'Evidence', 'Sign and Submit'];
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Typography gutterBottom={true}
                                    variant={"h6"}>{"Please complete all sections and provide as much detail as possible."}</Typography>

                        <FormGroup row={false} className={'mb-3'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.extension}
                                        onChange={this.handleCheckChange('extension')}
                                        value='extension'
                                    />
                                }
                                label="Is this an assignment extension request?"
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
                                   invalid={this.state.description === ""}
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
                                name={'reason'}
                                value={this.state.reason}
                                onChange={this.handleReasonChange}
                                options={reasons}

                            />
                        </FormGroup>

                        <FormGroup row={false} className={this.state.showOther ? 'mb-3' : 'd-none'}>
                            <Input type="textarea"
                                   name="reasonOther"
                                   id="reasonOther"
                                   rows={4}
                                   onChange={this.handleChange}
                                   value={this.state.reasonOther}
                                   placeholder="Please explain..."
                                   invalid={this.state.showOther && this.state.reasonOther === ""}
                            />
                        </FormGroup>

                    </React.Fragment>
                );
            case 1:
                return (
                    <React.Fragment>
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

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.onGoing}
                                        onChange={this.handleCheckChange('onGoing')}
                                        value='onGoing'
                                    />
                                }
                                label="Is this on-going?"
                            />

                            <div className={this.state.onGoing ? 'd-none' : ''}>

                                <TextField
                                    id="date"
                                    label="Date end"
                                    type="date"
                                    required={true}
                                    className={styles.textField}
                                    fullWidth={false}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    name={'dateEnded'}
                                />
                            </div>

                        </FormGroup>

                    </React.Fragment>
                );
            case 2:
                return (
                    <React.Fragment>

                        <Typography gutterBottom={true}
                                    variant={"h6"}>{"Please upload any files that you feel will aid your case."}</Typography>

                        <FormGroup>
                            <Label for="evidence">
                                <i className={'mr-2'}>
                                    <FontAwesomeIcon icon="file-upload" color={'#CCCCCC'}/>
                                </i>Ensure files are no more than 25MB in size.</Label>
                            <div>

                                <div>
                                    {this.state.fileUploadErrors.map((error) =>
                                        <Alert key={Math.random()} color="danger">
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
                    </React.Fragment>
                );
            case 3:
                return (
                    <React.Fragment>
                        <Typography gutterBottom={true}
                                    variant={"h6"}>{"By signing and dating below you are confirming that you have read and understood the following:"}</Typography>

                        <ul className={'mt-3'}>
                            <li>The University enters into communications with students in good faith and expects the
                                same from our
                                students in return. Any false declaration, fraudulent evidence received and/or
                                dishonesty is taken
                                extremely seriously by the University and could result in disciplinary action (under
                                11K-Student
                                Disciplinary Procedure) and in very serious instances, may lead to expulsion from the
                                University.
                            </li>
                            <li>
                                The University reserves the right to check the authenticity of any submitted documents
                                and evidence.
                            </li>
                            <li>
                                All documentation submitted to us will be handled in accordance with the relevant BU
                                Data Protection
                                Policy.
                            </li>
                            <li>
                                Any evidence provided that contains the personal data of a third party is received by
                                the University
                                on
                                the understanding that the student submitting this has gained approval from the third
                                party for
                                submitting
                                this and for the University to handle and process this in line with the relevant BU Data
                                Protection
                                Policy.
                            </li>
                        </ul>

                        <p>
                            I declare that the information given in this form and the accompanying evidence is, to the
                            best of my
                            knowledge, true and complete. I will be willing to answer further questions relating to the
                            statements
                            and/or the evidence that I have provided.
                        </p>

                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.agreementSigned}
                                        onChange={this.handleCheckChange('agreementSigned')}
                                        value='agreementSigned'
                                    />
                                }
                                label="I Agree."
                            />
                        </FormGroup>

                    </React.Fragment>
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

    render() {

        const {classes} = this.props;
        const steps = this.getSteps();
        const {activeStep, loading} = this.state;

        return (
            <React.Fragment>
                <Typography gutterBottom={true} variant={"h6"}>{"Request for Extension or Postponement"}</Typography>

                <small>
                    Please use this form if you are reporting circumstances prior to the hand-in date or examination
                    date.

                    If you have a short term sickness (up to 5 calendar days) before the hand-in date or examination
                    date please ensure you contact your programme team to notify them of short-term sickness. You must
                    contact them at least one hour before the submission time/ examination start time. You will then be
                    provided with the completed Self-certification form to submit as evidence.

                    If you are reporting Circumstances after the hand-in date or examination date please refer to the
                    ‘Assessment Board Consideration’ request form.

                    Please refer to 6J- Exceptional Circumstances including Extensions: Policy and Procedures when
                    completing this form.

                    If this document is not in an accessible format to you, please email
                    academicquality@bournemouth.ac.uk or contact askBU and we will endeavour to supply the information
                    in a more suitable format.

                    Confidentiality: We appreciate that your circumstances may be of a personal or sensitive nature. The
                    information provided in this form and all evidence submitted in support will be handled in
                    accordance with the relevant BU Data Protection Policy.
                </small>

                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {this.getStepContent(index)}
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

                    <Loader isLoading={loading} fullScreen={true}/>
                </Stepper>
            </React.Fragment>
        );
    }
}

SubmitRequestView.propTypes = {
    history: PropTypes.object.isRequired,
    postRequest: PropTypes.func.isRequired,
    classes: PropTypes.object,
    user: PropTypes.object
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(SubmitRequestView);