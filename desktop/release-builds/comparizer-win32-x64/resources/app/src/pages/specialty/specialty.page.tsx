import React from 'react';
import {connect} from 'react-redux';
import './specialty.page.scss';
import {Card} from 'antd';
import MilitarySpecialityComponent from './../../components/military-speciality/military-speciality.component';
import CivilSpecialityComponent from './../../components/civil-speciality/civil-speciality.component';
import Http from "../../service/http/http";
import {addMilitarySpeciality} from "../../components/military-speciality/military-speciality.action";
import {addCivilSpeciality} from "../../components/civil-speciality/civil-speciality.action";
import {isSpecialty} from "../../components/router-tab/router-tab.action";

class SpecialtyPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        const {addMilitarySpeciality, addCivilSpeciality, isSpecialty} = this.props;

        Http.get('military-speciality').then(militarySpecialityData => {
            addMilitarySpeciality(militarySpecialityData);
        });

        Http.get('civil-speciality').then(civilSpecialityData => {
            addCivilSpeciality(civilSpecialityData);
        });

        isSpecialty();
    }

    render() {
        const {militarySpeciality, civilSpeciality} = this.props;
        return (<div className={'main'}>
            <section className="main__block">
                <Card className={'main__block-item'}
                      title="Военно-учетная специальность"
                      hoverable={true}
                      style={{
                          margin: '10px',
                          width: '700px'
                      }}>
                    {
                        !!militarySpeciality && militarySpeciality.map((elem: any, index: number) =>
                            <MilitarySpecialityComponent key={index}
                                                         idMilitarySpeciality={elem._id}
                            />)
                    }
                </Card>

                <Card className={'main__block-item'}
                      title="Гражданская специальность"
                      hoverable={true}
                      style={{
                          margin: '10px',
                          width: '700px'
                      }}>
                    {
                        !!civilSpeciality && civilSpeciality.map((elem: any, index: number) =>
                            <CivilSpecialityComponent key={index}
                                                      idCivilSpeciality={elem._id}
                            />)
                    }
                </Card>
            </section>
        </div>);
    }
}

function mapStateToProps(state: any) {
    return {
        militarySpeciality: state.militarySpecialityReducer.militarySpeciality,
        civilSpeciality: state.civilSpecialityReducer.civilSpeciality,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addMilitarySpeciality: (militarySpeciality: any) => {
        dispatch(addMilitarySpeciality(militarySpeciality));
    },

    addCivilSpeciality: (civilSpeciality: any) => {
        dispatch(addCivilSpeciality(civilSpeciality));
    },

    isSpecialty: () => {dispatch(isSpecialty());},
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyPage);
