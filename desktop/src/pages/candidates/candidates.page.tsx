import React from 'react';
import {connect} from 'react-redux';
import './candidates.page.scss';
import {Button, Card} from 'antd';
import EnrolleeComponent from './../../components/enrollee/enrollee.component';
import ExpertsComponent from './../../components/experts/experts.component';
import RangingComponent from './../../components/ranging/ranging.component';
import {EXPERT_LABEL_NAME} from "../../components/experts/experts.constant";
import Http from "../../service/http/http";
import {addEnrollee} from "../../components/enrollee/enrollee.action";
import {addExperts} from "../../components/experts/experts.action";
import {addRanging, isLoadingRanging} from "../../components/ranging/ranging.action";
import {addCivilSpeciality} from "../../components/civil-speciality/civil-speciality.action";
import {isCandidates} from "../../components/router-tab/router-tab.action";

class CandidatesPage extends React.Component<any, any> {
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
            averageMark[averageValue[0]] = +(+averageValue[1] / (experts.length - 1)).toFixed(3);
        });

        return averageMark;
    }

    componentDidMount(): void {
        const {addEnrollee, addExperts, addRanging, addCivilSpeciality, isCandidates} = this.props;

        Http.get('enrollee').then(enrollee => {
            addEnrollee(enrollee);
        });

        Http.get('experts').then(experts => {
            addExperts(experts);
        });

        Http.get('process').then(rangingData => {

            console.log('get process');
            console.log(rangingData);

            addRanging(rangingData.rangingData);
        });

        Http.get('civil-speciality').then(civilSpecialityData => {
            addCivilSpeciality(civilSpecialityData);
        });

        isCandidates()
    }

    render() {
        const {enrollee, experts} = this.props;
        let averageMark = this.getAverageMark(experts);
        return (<div className={'main'}>
            <section className="main__block">
                <Card className={'main__block-item'}
                      title="Список кандидатов"
                      hoverable={true}
                      style={{
                          margin: '10px',
                          width: '700px'
                      }}>
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
                      style={{
                          margin: '10px',
                          width: '700px'
                      }}>
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
            </section>

            <Button type="primary"
                    size={'large'}
                    onClick={this.handleStartCalculations}>
                Расчитать ранг и интегральный показатель
            </Button>

            <Card className={'main__block-item _experts'}
                  title="Ранжирование кандидатов"
                  hoverable={true}
                  style={{
                      margin: '20px',
                      width: '1250px'
                  }}>
                <RangingComponent/>
            </Card>
        </div>);
    }

    handleStartCalculations = () => {
        const {experts, addRanging, isLoadingRanging} = this.props;
        const averageMark = this.getAverageMark(experts);
        isLoadingRanging();

        Http.post('process', {averageMark}).then((res: any) => {
            fetch('http://localhost:8005/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                mode: 'cors'
            }).then((resp: any) => {
                resp.json().then((rangingData: any) => {
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

    addCivilSpeciality: (civilSpeciality: any) => {
        dispatch(addCivilSpeciality(civilSpeciality));
    },

    isCandidates: () => {dispatch(isCandidates());},
    isLoadingRanging: () => {dispatch(isLoadingRanging());},
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesPage);
