import React from 'react';
import {connect} from 'react-redux';
import './main.page.scss';
import {Button, Card} from 'antd';
import EnrolleeComponent from './../../components/enrollee/enrollee.component';
import ExpertsComponent from './../../components/experts/experts.component';
import RangingComponent from './../../components/ranging/ranging.component';
import MilitarySpecialityComponent from './../../components/military-speciality/military-speciality.component';
import CivilSpecialityComponent from './../../components/civil-speciality/civil-speciality.component';
import {EXPERT_LABEL_NAME} from "../../components/experts/experts.constant";
import Http from "../../service/http/http";
import {addEnrollee} from "../../components/enrollee/enrollee.action";
import {addExperts} from "../../components/experts/experts.action";
import {addRanging} from "../../components/ranging/ranging.action";
import {addMilitarySpeciality} from "../../components/military-speciality/military-speciality.action";
import {addCivilSpeciality} from "../../components/civil-speciality/civil-speciality.action";

class MainPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    private getAverageMark(experts: any) {
        let averageMark = experts.reduce((averageMark: any, elem: any) => {
            if (!elem._id) {
                return averageMark;
            }

            Object.keys(elem).forEach(key => {
                averageMark[key] += +elem[key];
            });

            return averageMark;
        }, {
            healthStatus: 0,
            physicalStatus: 0,
            profPsychStatus: 0,
            socialSelectionStatus: 0,
            educationLevel: 0
        });

        Object.entries(averageMark).forEach((averageValue: any) => {
            averageMark[averageValue[0]] = +averageValue[1] / (experts.length - 1);
        });

        return averageMark;
    }

    componentDidMount(): void {
        const {addEnrollee, addExperts, addRanging, addMilitarySpeciality, addCivilSpeciality} = this.props;

        Http.get('enrollee').then(enrollee => {
            addEnrollee(enrollee);
        });

        Http.get('experts').then(experts => {
            console.log('componentDidMount experts');
            console.log(experts);
            addExperts(experts);
        });

        Http.get('process').then(rangingData => {
            console.log('componentDidMount rangingData');
            console.log(rangingData);

            addRanging(rangingData.rangingData);
        });

        Http.get('military-speciality').then(militarySpecialityData => {
            console.log('componentDidMount militarySpecialityData');
            console.log(militarySpecialityData);

            addMilitarySpeciality(militarySpecialityData);
        });

        Http.get('civil-speciality').then(civilSpecialityData => {
            console.log('componentDidMount civilSpecialityData');
            console.log(civilSpecialityData);

            addCivilSpeciality(civilSpecialityData);
        });
    }

    render() {
        const {enrollee, experts, militarySpeciality, civilSpeciality} = this.props;
        let averageMark = this.getAverageMark(experts);
        return (<div className={'main'}>
            <section className="main__block">
                <Card className={'main__block-item'}
                      title="Список кандидатов"
                      hoverable={true}
                      style={{margin: '10px'}}>
                    {
                        !!enrollee && enrollee.map((elem: any, index: number) =>
                            <EnrolleeComponent key={index}
                                               idEnrollee={elem._id}
                            />)
                    }
                </Card>

                <Card className={'main__block-item _experts'}
                      title="Оценки экспертов"
                      hoverable={true}
                      style={{margin: '10px'}}>
                    <div className="main__block-mark">
                        {
                            Object.entries(averageMark).map((averageMark: any, index: number) =>
                                !!averageMark[1] && <div className="main__block-mark-item" key={index}>
                                    <div className="main__block-mark-key">{EXPERT_LABEL_NAME[averageMark[0]]}:</div>
                                    <div className="main__block-mark-value">{averageMark[1]}</div>
                                </div>
                            )
                        }
                    </div>

                    {
                        !!experts && experts.map((elem: any, index: number) =>
                            <ExpertsComponent key={index}
                                              idExperts={elem._id}
                                              expertIndex={index}
                            />)
                    }
                </Card>

                <Card className={'main__block-item'}
                      title="Военно-учетная специальность"
                      hoverable={true}
                      style={{margin: '10px'}}>
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
                      style={{margin: '10px'}}>
                    {
                        !!civilSpeciality && civilSpeciality.map((elem: any, index: number) =>
                            <CivilSpecialityComponent key={index}
                                                         idCivilSpeciality={elem._id}
                            />)
                    }
                </Card>
            </section>

            <Button type="primary"
                    size={'large'}
                    onClick={this.handleStartCalculations}>
                Расчитать
            </Button>

            <Card className={'main__block-item _experts'}
                  title="Ранжирование кандидатов"
                  hoverable={true}
                  style={{margin: '10px'}}>
                <RangingComponent />
            </Card>
        </div>);
    }

    handleStartCalculations = () => {
        const {experts, addRanging} = this.props;
        const averageMark = this.getAverageMark(experts);


        Http.post('process', {averageMark}).then((res: any) => {
            console.log('process');
            console.log(res);

            fetch('http://localhost:8005/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                mode: 'cors'
            }).then((resp: any) => {
                resp.json().then((rangingData: any) => {

                    console.log('rangingData');
                    console.log(rangingData);

                    console.log(rangingData.rangingData)

                    addRanging(rangingData.rangingData);
                });
            })
        });
    }
}

function mapStateToProps(state: any) {
    return {
        enrollee: state.enrolleeReducer.enrollee,
        experts: state.expertsReducer.experts,
        militarySpeciality: state.militarySpecialityReducer.militarySpeciality,
        civilSpeciality: state.civilSpecialityReducer.civilSpeciality,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    addEnrollee: (enrollee: any) => {
        dispatch(addEnrollee(enrollee));
    },

    addExperts: (experts: any) => {
        dispatch(addExperts(experts));
    },

    addRanging: (ranging: any) => {
        dispatch(addRanging(ranging));
    },

    addMilitarySpeciality: (militarySpeciality: any) => {
        dispatch(addMilitarySpeciality(militarySpeciality));
    },

    addCivilSpeciality: (civilSpeciality: any) => {
        dispatch(addCivilSpeciality(civilSpeciality));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
