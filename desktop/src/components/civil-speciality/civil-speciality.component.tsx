import React from 'react';
import {connect} from 'react-redux';
import './civil-speciality.component.scss';
import {Button, Form, Input, Modal, Select, Tooltip} from 'antd';
import {addCivilSpeciality} from "./civil-speciality.action";
import {FormComponentProps} from "antd/lib/form";
import {CIVIL_SPECIALITY_LABEL_NAME} from "./civil-speciality.constant";
import Http from "../../service/http/http";
import {truncate} from "../../helpers/truncateString";

// const { Option } = Select;

interface IProps extends FormComponentProps {
    idCivilSpeciality: any;
    addCivilSpeciality: any;
    civilSpeciality?: any;
}

class CivilSpecialityComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            visibleCivilSpecialityModal: false,
            codeCivilSpecialityHelp: '',
            nameCivilSpecialityHelp: '',
            competenceCivilSpecialityHelp: '',
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        let {civilSpeciality, idCivilSpeciality} = this.props;
        idCivilSpeciality = !!this.props.idCivilSpeciality ? this.props.idCivilSpeciality : null;
        const currentCivilSpeciality = idCivilSpeciality ? civilSpeciality.find((elem: any) => elem._id === idCivilSpeciality) : civilSpeciality[0];

        return (<div className="civil-speciality">
            {
                !idCivilSpeciality ?
                    <Button style={{width: '300px'}} onClick={this.showCivilSpecialityModal}>
                        Добавить гражданскую специальность
                    </Button> :
                    <Tooltip title={currentCivilSpeciality.nameCivilSpeciality}>
                        <Button type="link" onClick={this.showCivilSpecialityModal}>
                            <span>{truncate(currentCivilSpeciality.nameCivilSpeciality, 95)}</span>
                        </Button>
                    </Tooltip>
            }

            <Modal title="Гражданская специальность"
                   visible={this.state.visibleCivilSpecialityModal}
                   onCancel={this.handleCancelCivilSpecialityModal}
                   footer={[
                       !!idCivilSpeciality ? <Button key="delete" type="danger"
                                                     onClick={this.handleDeleteCivilSpecialityModal}>Удалить</Button> : null,
                       <Button key="save" htmlType="submit" type="primary"
                               onClick={this.handleSaveCivilSpecialityModal}>
                           Сохранить
                       </Button>,
                   ]}
                   width={1000}>

                <Form labelCol={{span: 7}}
                      wrapperCol={{span: 16}}
                      onSubmit={this.handleSubmit}>

                    <Form.Item label={CIVIL_SPECIALITY_LABEL_NAME.codeCivilSpeciality}
                               help={this.state.codeCivilSpecialityHelp}
                               validateStatus={!!this.state.codeCivilSpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('codeCivilSpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorCodeCivilSpecialitySelect}
                            ],
                            initialValue: currentCivilSpeciality.codeCivilSpeciality
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={CIVIL_SPECIALITY_LABEL_NAME.nameCivilSpeciality}
                               help={this.state.nameCivilSpecialityHelp}
                               validateStatus={!!this.state.nameCivilSpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('nameCivilSpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorNameCivilSpecialitySelect,}
                            ],
                            initialValue: currentCivilSpeciality.nameCivilSpeciality
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label={CIVIL_SPECIALITY_LABEL_NAME.competenceCivilSpeciality}
                               help={this.state.competenceCivilSpecialityHelp}
                               validateStatus={!!this.state.competenceCivilSpecialityHelp ? 'error' : 'success'}>
                        {getFieldDecorator('competenceCivilSpeciality', {
                            rules: [
                                {required: true},
                                {validator: this.validatorCompetenceCivilSpecialitySelect,}
                            ],
                            initialValue: currentCivilSpeciality.competenceCivilSpeciality
                        })(
                            <Select mode="tags" placeholder={CIVIL_SPECIALITY_LABEL_NAME.competenceCivilSpeciality}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }

    validatorCodeCivilSpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({codeCivilSpecialityHelp: 'Пожалуйста, введите код ВУС'});
            return;
        }

        if (!this.isNumeric(value)) {
            this.setState({codeCivilSpecialityHelp: 'Код ВУС должнен быть числом'});
            return;
        }

        this.setState({codeCivilSpecialityHelp: ''});

        callback();
    };


    validatorCompetenceCivilSpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({competenceCivilSpecialityHelp: 'Пожалуйста, введите компетенции'});
            return;
        }

        this.setState({competenceCivilSpecialityHelp: ''});

        callback();
    };

    validatorNameCivilSpecialitySelect = (rule: any, value: any, callback: any) => {
        if (!value) {
            this.setState({nameCivilSpecialityHelp: 'Пожалуйста, введите название ВУС'});
            return;
        }

        this.setState({nameCivilSpecialityHelp: ''});

        callback();
    };

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const idCivilSpeciality = this.props.idCivilSpeciality ? this.props.idCivilSpeciality : null;
                const {addCivilSpeciality} = this.props;

                if (idCivilSpeciality) {
                    Http.post(`civil-speciality/${idCivilSpeciality}`, {civilSpeciality: values}).then(res => {
                        addCivilSpeciality(res);
                    });
                } else {
                    Http.post('civil-speciality', {civilSpeciality: values}).then(res => {
                        addCivilSpeciality(res);
                    });
                }
                this.props.form.resetFields();
                this.handleCancelCivilSpecialityModal(null);
            }
        });
    };

    handleDeleteCivilSpecialityModal = () => {
        const idCivilSpeciality = this.props.idCivilSpeciality ? this.props.idCivilSpeciality : null;
        const civilSpeciality = this.props.civilSpeciality;
        const {addCivilSpeciality} = this.props;


        let index = civilSpeciality.findIndex((elem: any) => elem._id === idCivilSpeciality);
        civilSpeciality.splice(index, 1);

        this.props.addCivilSpeciality(civilSpeciality);

        this.props.form.resetFields();
        this.handleCancelCivilSpecialityModal(null);

        Http.delete(`civil-speciality/${idCivilSpeciality}`).then(res => addCivilSpeciality(res));
    };

    handleSaveCivilSpecialityModal = (e: any) => {
        this.handleSubmit({
            preventDefault: () => {
            }
        });
    };

    showCivilSpecialityModal = () => {
        this.setState({
            visibleCivilSpecialityModal: true,
        });
    };

    handleCancelCivilSpecialityModal = (e: any) => {
        this.setState({
            visibleCivilSpecialityModal: false,
        });
    };

    isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

function mapStateToProps(state: any) {
    return {
        civilSpeciality: state.civilSpecialityReducer.civilSpeciality
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addCivilSpeciality: (civilSpeciality: any) => {
        dispatch(addCivilSpeciality(civilSpeciality));
    },
});

const WrappedCivilSpeciality = Form.create<IProps>({name: 'coordinated'})(CivilSpecialityComponent);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCivilSpeciality);
