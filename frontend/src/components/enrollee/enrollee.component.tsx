import React from 'react';
import {connect} from 'react-redux';
import './enrollee.component.scss';
import {Button, Form, Input, Modal, Select} from 'antd';
import {addEnrollee, isLoadingEnrollee} from "./enrollee.action";
import {FormComponentProps} from "antd/lib/form";
import {
    ENROLLEE_EDUCATION_LEVEL,
    ENROLLEE_HEALTH_STATUS,
    ENROLLEE_LABEL_NAME,
    ENROLLEE_PHYSICAL_STATUS,
    ENROLLEE_PROFPHYSC_STATUS, ENROLLEE_SOCIAL_SELECTION_STATUS
} from "./enrollee.constant";
import Http from "../../service/http/http";
const {Option} = Select;

interface IProps extends FormComponentProps {
    idEnrollee: any;
    addEnrollee: any;
    enrollee?: any;
    civilSpeciality: any;
    isLoadingEnrollee: any
}

class EnrolleeComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            visibleEnrolleeModal: false,
            fullNameHelp: '',
            healthStatusHelp: '',
            physicalStatusHelp: '',
            profPsychStatusHelp: '',
            socialSelectionStatusHelp: '',
            educationLevelHelp: '',
            civilSpecialitylHelp: ''
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const idEnrollee = !!this.props.idEnrollee ? this.props.idEnrollee : null;
        const enrollee = this.props.enrollee;
        const currentEnrollee = !!idEnrollee ? enrollee.find((elem: any) => elem._id === idEnrollee) : enrollee[0];
        const {civilSpeciality} = this.props;

        return (<div className="enrollee">
            {
                !idEnrollee ?
                    <Button style={{width: '300px', marginBottom: '10px'}} onClick={this.showEnrolleeModal}>
                        Добавить кандидата
                    </Button> :
                    <div className="enrollee__row">
                        <Button type="link" onClick={this.showEnrolleeModal}>{currentEnrollee.fullName}</Button>
                        <div className="enrollee__row-elem">{currentEnrollee.recommendationsMilitarySpeciality.join(', ')}</div>
                        <Button type="dashed" onClick={this.getRecommendation.bind(null, idEnrollee)}>Рекомендованная ВУС</Button>
                    </div>
            }

            <Modal title="Кандидат"
                   visible={this.state.visibleEnrolleeModal}
                   onCancel={this.handleCancelEnrolleeModal}
                   footer={[
                       !!idEnrollee ?<Button key="delete" type="danger" onClick={this.handleDeleteEnrolleeModal}>Удалить</Button> : null,
                       <Button key="save" htmlType="submit" type="primary" onClick={this.handleSaveEnrolleeModal}>
                           Сохранить
                       </Button>,
                   ]}
                   width={1000}>

                <Form labelCol={{span: 10}}
                      wrapperCol={{span: 12}}
                      onSubmit={this.handleSubmit}>

                    <Form.Item label={ENROLLEE_LABEL_NAME.fullName}
                               help={this.state.fullNameHelp}
                               validateStatus={!!this.state.fullNameHelp ? 'error' : 'success'}>
                        {getFieldDecorator('fullName', {
                            rules: [
                                {required: true},
                                {validator: this.validateFullName}
                            ],
                            initialValue: currentEnrollee.fullName
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={ENROLLEE_LABEL_NAME.healthStatus}
                               help={this.state.healthStatusHelp}
                               validateStatus={!!this.state.healthStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('healthStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorHealthStatusSelect,}
                            ],
                            initialValue: currentEnrollee.healthStatus
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.healthStatus}>
                                {
                                    Object.entries(ENROLLEE_HEALTH_STATUS).map((healthStatus, index) =>
                                        <Option value={healthStatus[0]}
                                                key={index}>
                                            {healthStatus[1]}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label={ENROLLEE_LABEL_NAME.physicalStatus}
                               help={this.state.physicalStatusHelp}
                               validateStatus={!!this.state.physicalStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('physicalStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorPhysicalStatusSelect,}
                            ],
                            initialValue: currentEnrollee.physicalStatus
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.physicalStatus}>
                                {
                                    Object.entries(ENROLLEE_PHYSICAL_STATUS).map((physicalStatus, index) =>
                                        <Option value={physicalStatus[0]}
                                                key={index}>
                                            {physicalStatus[1]}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label={ENROLLEE_LABEL_NAME.profPsychStatus}
                               help={this.state.profPsychStatusHelp}
                               validateStatus={!!this.state.profPsychStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('profPsychStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorProfPsychStatusSelect,}
                            ],
                            initialValue: currentEnrollee.profPsychStatus,
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.profPsychStatus}>
                                {
                                    Object.entries(ENROLLEE_PROFPHYSC_STATUS).map((profPsychStatus, index) =>
                                        <Option value={profPsychStatus[0]}
                                                key={index}>
                                            {profPsychStatus[1]}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label={ENROLLEE_LABEL_NAME.socialSelectionStatus}
                               help={this.state.socialSelectionStatusHelp}
                               validateStatus={!!this.state.socialSelectionStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('socialSelectionStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorSocialSelectionStatusSelect,}
                            ],
                            initialValue: currentEnrollee.socialSelectionStatus
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.socialSelectionStatus}>
                                {
                                    Object.entries(ENROLLEE_SOCIAL_SELECTION_STATUS).map((socialSelectionStatus, index) =>
                                        <Option value={socialSelectionStatus[0]}
                                                key={index}>
                                            {socialSelectionStatus[1]}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label={ENROLLEE_LABEL_NAME.educationLevel}
                               help={this.state.educationLevelHelp}
                               validateStatus={!!this.state.educationLevelHelp ? 'error' : 'success'}>
                        {getFieldDecorator('educationLevel', {
                            rules: [
                                {required: true},
                                {validator: this.validatorEducationLevelSelect,}
                            ],
                            initialValue: currentEnrollee.educationLevel
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.educationLevel}>
                                {
                                    Object.entries(ENROLLEE_EDUCATION_LEVEL).map((educationLevel, index) =>
                                        <Option value={educationLevel[0]}
                                                key={index}>
                                            {educationLevel[1]}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={ENROLLEE_LABEL_NAME.civilSpeciality}
                               help={this.state.civilSpecialitylHelp}
                               validateStatus={!!this.state.civilSpecialitylHelp ? 'error' : 'success'}>
                        {getFieldDecorator('civilSpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorCivilSpecialitySelect,}
                            ],
                            initialValue: currentEnrollee.civilSpeciality
                        })(
                            <Select placeholder={ENROLLEE_LABEL_NAME.civilSpeciality}>
                                {
                                    civilSpeciality.map((element: any, index: any) =>
                                        <Option value={element.codeCivilSpeciality}
                                                key={index}>
                                            {element.nameCivilSpeciality}
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }

    validatorCivilSpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({civilSpecialitylHelp: 'Пожалуйста, введите гражданскую специальность'});
            return;
        }

        this.setState({civilSpecialitylHelp: ''});

        callback();
    };

    validatorEducationLevelSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({educationLevelHelp: 'Пожалуйста, введите уровень образования'});
            return;
        }

        this.setState({educationLevelHelp: ''});

        callback();
    };

    validatorSocialSelectionStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({socialSelectionStatusHelp: 'Пожалуйста, введите результат социального отбора'});
            return;
        }

        this.setState({socialSelectionStatusHelp: ''});

        callback();
    };

    validatorProfPsychStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({profPsychStatusHelp: 'Пожалуйста, введите профессионально-психологическую пригодность'});
            return;
        }

        this.setState({profPsychStatusHelp: ''});

        callback();
    };

    validatorPhysicalStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({physicalStatusHelp: 'Пожалуйста, введите физическую подготовленность'});
            return;
        }

        this.setState({physicalStatusHelp: ''});

        callback();
    };

    validatorHealthStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({healthStatusHelp: 'Пожалуйста, введите состояние здоровья'});
            return;
        }

        this.setState({healthStatusHelp: ''});

        callback();
    };

    validateFullName = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({fullNameHelp: 'Пожалуйста, введите ФИО'});
            return;
        }

        this.setState({fullNameHelp: ''});

        callback();
    };

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const idEnrollee = this.props.idEnrollee ? this.props.idEnrollee : null;
                const {addEnrollee} = this.props;

                if (idEnrollee) {
                    Http.post(`enrollee/${idEnrollee}`, {enrollee: values}).then(res => {
                        addEnrollee(res);
                    });
                } else {

                    Http.post('enrollee', {enrollee: values}).then(res => {
                        addEnrollee(res);
                    });
                }

                this.props.form.resetFields();
                this.handleCancelEnrolleeModal(null);
            }
        });
    };

    handleDeleteEnrolleeModal = () => {
        const idEnrollee = this.props.idEnrollee ? this.props.idEnrollee : null;
        const enrollee = this.props.enrollee;
        const {addEnrollee} = this.props;

        let index = enrollee.findIndex((elem: any) => elem._id === idEnrollee);
        enrollee.splice(index, 1);

        this.props.addEnrollee(enrollee);

        this.props.form.resetFields();
        this.handleCancelEnrolleeModal(null);

        Http.delete(`enrollee/${idEnrollee}`).then(res => {
            addEnrollee(res);
        });
    };

    handleSaveEnrolleeModal = (e: any) => {
        this.handleSubmit({
            preventDefault: () => {
            }
        });
    };

    getRecommendation = (idEnrollee: any) => {
        const {addEnrollee, isLoadingEnrollee} = this.props;
        isLoadingEnrollee();

        fetch(`http://localhost:8005/recommendation?idEnrollee=${idEnrollee}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors'
        }).then((resp: any) => {
            resp.json().then((users: any) => {
                addEnrollee(...users);
            });
        })
    };

    showEnrolleeModal = () => {
        this.setState({
            visibleEnrolleeModal: true,
        });
    };

    handleCancelEnrolleeModal = (e: any) => {
        this.setState({
            visibleEnrolleeModal: false,
        });
    };

    isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

function mapStateToProps(state: any) {
    return {
        enrollee: state.enrolleeReducer.enrollee,
        civilSpeciality: state.civilSpecialityReducer.civilSpeciality
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addEnrollee: (enrollee: any) => {
        dispatch(addEnrollee(enrollee));
    },
    isLoadingEnrollee: () => {dispatch(isLoadingEnrollee());},
});

const WrappedEnrollee = Form.create<IProps>({name: 'coordinated'})(EnrolleeComponent);

export default  connect(mapStateToProps, mapDispatchToProps)(WrappedEnrollee);
