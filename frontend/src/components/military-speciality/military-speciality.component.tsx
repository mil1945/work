import React from 'react';
import {connect} from 'react-redux';
import './military-speciality.component.scss';
import {Button, Form, Input, Modal, Select, Tooltip} from 'antd';
import {addMilitarySpeciality} from "./military-speciality.action";
import {FormComponentProps} from "antd/lib/form";
import {MILITARY_SPECIALITY_LABEL_NAME} from "./military-speciality.constant";
import Http from "../../service/http/http";
import {truncate} from "../../helpers/truncateString";

// const {Option} = Select;

interface IProps extends FormComponentProps {
    idMilitarySpeciality: any;
    addMilitarySpeciality: any;
    militarySpeciality?: any;
}

class MilitarySpecialityComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            visibleMilitarySpecialityModal: false,
            codeMilitarySpecialityHelp: '',
            nameMilitarySpecialityHelp: '',
            competenceMilitarySpecialityHelp: '',
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        let {militarySpeciality, idMilitarySpeciality} = this.props;
        idMilitarySpeciality = !!this.props.idMilitarySpeciality ? this.props.idMilitarySpeciality : null;
        const currentMilitarySpeciality = idMilitarySpeciality ? militarySpeciality.find((elem: any) => elem._id === idMilitarySpeciality) : militarySpeciality[0];
        return (<div className="military-speciality">
            {
                !idMilitarySpeciality ?
                    <Button style={{width: '300px'}} onClick={this.showMilitarySpecialityModal}>
                        Добавить ВУС
                    </Button> :
                    <Tooltip title={currentMilitarySpeciality.nameMilitarySpeciality}>
                        <Button type="link" onClick={this.showMilitarySpecialityModal}>
                            <span>{truncate(currentMilitarySpeciality.nameMilitarySpeciality, 95)}</span>
                        </Button>
                    </Tooltip>
            }

            <Modal title="Военно-учетная специальность"
                   visible={this.state.visibleMilitarySpecialityModal}
                   onCancel={this.handleCancelMilitarySpecialityModal}
                   footer={[
                       !!idMilitarySpeciality ? <Button key="delete" type="danger"
                                                        onClick={this.handleDeleteMilitarySpecialityModal}>Удалить</Button> : null,
                       <Button key="save" htmlType="submit" type="primary"
                               onClick={this.handleSaveMilitarySpecialityModal}>
                           Сохранить
                       </Button>,
                   ]}
                   width={1000}>

                <Form labelCol={{span: 5}}
                      wrapperCol={{span: 17}}
                      onSubmit={this.handleSubmit}>

                    <Form.Item label={MILITARY_SPECIALITY_LABEL_NAME.codeMilitarySpeciality}
                               help={this.state.codeMilitarySpecialityHelp}
                               validateStatus={!!this.state.codeMilitarySpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('codeMilitarySpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorCodeMilitarySpecialitySelect}
                            ],
                            initialValue: currentMilitarySpeciality.codeMilitarySpeciality
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={MILITARY_SPECIALITY_LABEL_NAME.nameMilitarySpeciality}
                               help={this.state.nameMilitarySpecialityHelp}
                               validateStatus={!!this.state.nameMilitarySpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('nameMilitarySpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorNameMilitarySpecialitySelect,}
                            ],
                            initialValue: currentMilitarySpeciality.nameMilitarySpeciality
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={MILITARY_SPECIALITY_LABEL_NAME.competenceMilitarySpeciality}
                               help={this.state.competenceMilitarySpecialityHelp}
                               validateStatus={!!this.state.competenceMilitarySpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('competenceMilitarySpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorCompetenceMilitarySpecialitySelect,}
                            ],
                            initialValue: currentMilitarySpeciality.competenceMilitarySpeciality
                        })(
                            <Select mode="tags"
                                    placeholder={MILITARY_SPECIALITY_LABEL_NAME.competenceMilitarySpeciality}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }

    validatorCodeMilitarySpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({codeMilitarySpecialityHelp: 'Пожалуйста, введите код гражданской специальности'});
            return;
        }

        if (!this.isNumeric(value)) {
            this.setState({codeMilitarySpecialityHelp: 'Код ВУС должнен быть числом'});
            return;
        }

        this.setState({codeMilitarySpecialityHelp: ''});

        callback();
    };


    validatorCompetenceMilitarySpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({competenceMilitarySpecialityHelp: 'Пожалуйста, введите компетенции'});
            return;
        }

        this.setState({competenceMilitarySpecialityHelp: ''});

        callback();
    };

    validatorNameMilitarySpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({nameMilitarySpecialityHelp: 'Пожалуйста, введите название гражданской специальности'});
            return;
        }

        this.setState({nameMilitarySpecialityHelp: ''});

        callback();
    };

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const idMilitarySpeciality = this.props.idMilitarySpeciality ? this.props.idMilitarySpeciality : null;
                const {addMilitarySpeciality} = this.props;

                if (idMilitarySpeciality) {
                    Http.post(`military-speciality/${idMilitarySpeciality}`, {militarySpeciality: values}).then(res => {
                        addMilitarySpeciality(res);
                    });
                } else {
                    Http.post('military-speciality', {militarySpeciality: values}).then(res => {
                        addMilitarySpeciality(res);
                    });
                }
                this.props.form.resetFields();
                this.handleCancelMilitarySpecialityModal(null);
            }
        });
    };

    handleDeleteMilitarySpecialityModal = () => {
        const idMilitarySpeciality = this.props.idMilitarySpeciality ? this.props.idMilitarySpeciality : null;
        const militarySpeciality = this.props.militarySpeciality;
        const {addMilitarySpeciality} = this.props;


        let index = militarySpeciality.findIndex((elem: any) => elem._id === idMilitarySpeciality);
        militarySpeciality.splice(index, 1);

        this.props.addMilitarySpeciality(militarySpeciality);

        this.props.form.resetFields();
        this.handleCancelMilitarySpecialityModal(null);

        Http.delete(`military-speciality/${idMilitarySpeciality}`).then(res => addMilitarySpeciality(res));
    };

    handleSaveMilitarySpecialityModal = (e: any) => {
        this.handleSubmit({
            preventDefault: () => {
            }
        });
    };

    showMilitarySpecialityModal = () => {
        this.setState({
            visibleMilitarySpecialityModal: true,
        });
    };

    handleCancelMilitarySpecialityModal = (e: any) => {
        this.setState({
            visibleMilitarySpecialityModal: false,
        });
    };

    isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

function mapStateToProps(state: any) {
    return {
        militarySpeciality: state.militarySpecialityReducer.militarySpeciality
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addMilitarySpeciality: (militarySpeciality: any) => {
        dispatch(addMilitarySpeciality(militarySpeciality));
    },
});

const WrappedMilitarySpeciality = Form.create<IProps>({name: 'coordinated'})(MilitarySpecialityComponent);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedMilitarySpeciality);
