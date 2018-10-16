import React from "react";

import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Alert
} from 'reactstrap';

import Select from 'react-select';
import Dropzone from 'react-dropzone'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
    faFileWord,
    faFilePowerpoint,
    faFilePdf,
    faFileAudio,
    faFileAlt,
    faFileImage
} from '@fortawesome/free-solid-svg-icons';
import {faFileUpload, faInfoCircle, faGraduationCap, faTimes} from '@fortawesome/free-solid-svg-icons';

library.add(faFileUpload, faInfoCircle, faGraduationCap, faTimes);
library.add(faFileWord, faFilePdf, faFilePowerpoint, faFileAudio, faFileAlt, faFileImage);

const IconFileExtensionMappings = {
    pdf: "file-pdf",
    docx: "file-word",
    png: "file-image"
};

class SubmitRequestView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                description: "",
                files: [],
                selectedSubjects: [],
            },
            declinedFiles: [],
            formErrors: [],
            fileUploadErrors: [],
            showErrors: false
        };

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeFile = this.removeFile.bind(this)
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

    submit(event) {

        let errors = [];
        Object.keys(this.state.formValues).forEach(function (key) {

            let val = this.state.formValues[key];
            if (!val) {
                errors.push(`Please complete the ${val} section`)
            }
        });

        if (errors.length === 0) {

            this.setState({
                showErrors: true
            });

            return false;
        } else {
            console.log(this.state.formValues);
        }

    }

    removeFile(fileName) {

        let currentFiles = this.state.formValues.files;

        if (currentFiles) {

            currentFiles.forEach((file) => {
                if (file.name === fileName) {

                    let index = currentFiles.indexOf(file);
                    currentFiles.splice(index, 1);
                }
            });

            this.setState({
                formValues: {
                    files: currentFiles
                }
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onDrop(accepted, declined) {

        let existingFiles = this.state.formValues.files;
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
                formValues: {
                    files: existingFiles
                }
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

    render() {
        return (
            <Row>
                <Col>
                    <h2>Submit a new request for mitigating circumstances</h2>
                    <hr/>

                    <Form className={'mt-5'}>

                        <FormGroup>
                            <Label for="description"><i className={'mr-2'}><FontAwesomeIcon icon={'info-circle'}
                                                                                            color={'#CCCCCC'}/></i>Provide
                                details:</Label>
                            <Input type="textarea"
                                   name="description"
                                   id="description"
                                   rows={8}
                                   onChange={this.handleChange}
                                   value={this.state.description}
                                   placeholder="Description/Explanation/Reasoning..."
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label><i className={'mr-2'}><FontAwesomeIcon icon={'graduation-cap'}
                                                                          color={'#CCCCCC'}/></i>Which subject(s) does
                                this affect?</Label>
                            <Select
                                value={this.state.subjects}
                                onChange={this.handleChange}
                                options={[]}
                                isMulti={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="evidence"><i className={'mr-2'}><FontAwesomeIcon icon="file-upload"
                                                                                         color={'#CCCCCC'}/></i>Supporting
                                Evidence</Label>
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
                                    {this.state.formValues.files.length > 0 ?
                                        <h6 className={'mt-3'}>Dropped files</h6> : null}

                                    <ListGroup>
                                        {this.state.formValues.files.map((file) =>
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

                        <Button color="primary" size={'lg'} onClick={this.submit}>Submit for Review</Button>
                        <FormText>All information provide is confidential.</FormText>

                    </Form>

                </Col>
            </Row>
        );
    }
}

export default SubmitRequestView;