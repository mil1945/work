import React from 'react';
import {connect} from 'react-redux';
import './experts.component.scss';
import {Button, Form, Input, Modal} from 'antd';
import {addExperts} from "./experts.action";
import {FormComponentProps} from "antd/lib/form";
import {EXPERT_LABEL_NAME} from "./experts.constant";
import Http from "../../service/http/http";

interface IProps extends FormComponentProps {
    idExperts: any;
    addExperts: any;
    experts?: any;
    expertIndex: number;
}

class ExpertsComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            visibleExpertsModal: false,
            healthStatusHelp: '',
            physicalStatusHelp: '',
            profPsychStatusHelp: '',
            socialSelectionStatusHelp: '',
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        let {expertIndex, experts, idExperts} = this.props;
        idExperts = this.props.idExperts ? this.props.idExperts : null;

        const currentExperts = idExperts ? experts.find((elem: any) => elem._id === idExperts) : experts[0];
        
        return (<div className="experts">
            {
                !idExperts ?
                    <Button style={{width: '300px'}} onClick={this.showExpertsModal}>
                        Добавить оценку эксперта
                    </Button> :
                    <Button type="link" onClick={this.showExpertsModal}>
                        <span>Эксперт {expertIndex}</span>
                    </Button>
            }

            <Modal title="Оценка эксперта"
                   visible={this.state.visibleExpertsModal}
                   onCancel={this.handleCancelExpertsModal}
                   footer={[
                       !!idExperts ?<Button key="delete" type="danger" onClick={this.handleDeleteExpertsModal}>Удалить</Button> : null,
                       <Button key="save" htmlType="submit" type="primary" onClick={this.handleSaveExpertsModal}>
                           Сохранить
                       </Button>,
                   ]}
                   width={1000}>

                <Form labelCol={{span: 10}}
                      wrapperCol={{span: 12}}
                      onSubmit={this.handleSubmit}>

                    <Form.Item label={EXPERT_LABEL_NAME.healthStatus}
                               help={this.state.healthStatusHelp}
                               validateStatus={!!this.state.healthStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('healthStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorHealthStatusSelect}
                            ],
                            initialValue: currentExperts.healthStatus
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={EXPERT_LABEL_NAME.physicalStatus}
                               help={this.state.physicalStatusHelp}
                               validateStatus={!!this.state.physicalStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('physicalStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorPhysicalStatusSelect,}
                            ],
                            initialValue: currentExperts.physicalStatus
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={EXPERT_LABEL_NAME.profPsychStatus}
                               help={this.state.profPsychStatusHelp}
                               validateStatus={!!this.state.profPsychStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('profPsychStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorProfPsychStatusSelect,}
                            ],
                            initialValue: currentExperts.profPsychStatus
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={EXPERT_LABEL_NAME.socialSelectionStatus}
                               help={this.state.socialSelectionStatusHelp}
                               validateStatus={!!this.state.socialSelectionStatusHelp ? 'error' : 'success'}>
                        {getFieldDecorator('socialSelectionStatus', {
                            rules: [
                                {required: true},
                                {validator: this.validatorSocialSelectionStatusSelect,}
                            ],
                            initialValue: currentExperts.socialSelectionStatus
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={EXPERT_LABEL_NAME.educationLevel}
                               help={this.state.educationLevelHelp}
                               validateStatus={!!this.state.educationLevelHelp ? 'error' : 'success'}>
                        {getFieldDecorator('educationLevel', {
                            rules: [
                                {required: true},
                                {validator: this.validatorEducationLevelSelect,}
                            ],
                            initialValue: currentExperts.educationLevel
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }

    validatorEducationLevelSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({educationLevelHelp: 'Пожалуйста, введите оценку уровеня образования'});
            return;
        }

        if (!this.isNumeric(value)) {
            this.setState({educationLevelHelp: 'Оценка уровня образования должна быть числом'});
            return;
        }

        this.setState({educationLevelHelp: ''});

        callback();
    };

    validatorSocialSelectionStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({socialSelectionStatusHelp: 'Пожалуйста, введите оценку результата социального отбора'});
            return;
        }
        
        if (!this.isNumeric(value)) {
            this.setState({socialSelectionStatusHelp: 'Оценка результата социального отбора должна быть числом'});
            return;
        }
        
        this.setState({socialSelectionStatusHelp: ''});

        callback();
    };

    validatorHealthStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({healthStatusHelp: 'Пожалуйста, введите оценку состояния здоровья'});
            return;
        }

        if (!this.isNumeric(value)) {
            this.setState({healthStatusHelp: 'Оценка состояния здоровья должна быть числом'});
            return;
        }

        this.setState({healthStatusHelp: ''});

        callback();
    };


    validatorProfPsychStatusSelect = (rule: any, value: any, callback: any) => {
        if (!this.isNumeric(value)) {
            this.setState({profPsychStatusHelp: 'Оценка профессионально-психологической пригодности должна быть числом'});
            return;
        }
        
        if (!value) {
            this.setState({profPsychStatusHelp: 'Пожалуйста, введите оценку профессионально-психологической пригодности'});
            return;
        }

        this.setState({profPsychStatusHelp: ''});

        callback();
    };

    validatorPhysicalStatusSelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({physicalStatusHelp: 'Пожалуйста, введите оценку физической подготовленности'});
            return;
        }

        if (!this.isNumeric(value)) {
            this.setState({physicalStatusHelp: 'Оценка физической подготовленности должна быть числом'});
            return;
        }
        
        this.setState({physicalStatusHelp: ''});

        callback();
    };

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const idExperts = this.props.idExperts ? this.props.idExperts : null;
                const {addExperts} = this.props;

                if (idExperts) {
                    Http.post(`experts/${idExperts}`, {experts: values}).then(res => {
                        addExperts(res);
                    });
                } else {
                    Http.post('experts', {experts: values}).then(res => {
                        addExperts(res);
                    });
                }
                this.props.form.resetFields();
                this.handleCancelExpertsModal(null);
            }
        });
    };

    handleDeleteExpertsModal = () => {
        const idExperts = this.props.idExperts ? this.props.idExperts : null;
        const experts = this.props.experts;
        const {addExperts} = this.props;


        let index = experts.findIndex((elem: any) => elem._id === idExperts);
        experts.splice(index, 1);

        this.props.addExperts(experts);

        this.props.form.resetFields();
        this.handleCancelExpertsModal(null);

        Http.delete(`experts/${idExperts}`).then(res => addExperts(res));
    };

    handleSaveExpertsModal = (e: any) => {
        this.handleSubmit({
            preventDefault: () => {
            }
        });
    };

    showExpertsModal = () => {
        this.setState({
            visibleExpertsModal: true,
        });
    };

    handleCancelExpertsModal = (e: any) => {
        this.setState({
            visibleExpertsModal: false,
        });
    };

    isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

function mapStateToProps(state: any) {
    return {
        experts: state.expertsReducer.experts
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addExperts: (experts: any) => {
        dispatch(addExperts(experts));
    },
});

const WrappedExperts = Form.create<IProps>({name: 'coordinated'})(ExpertsComponent);

export default  connect(mapStateToProps, mapDispatchToProps)(WrappedExperts);
