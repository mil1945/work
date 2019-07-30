import * as React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './app.scss';
import NotFound from './pages/not-found/not-found';
import SpecialtyPage from './pages/specialty/specialty.page';
import CandidatesPage from './pages/candidates/candidates.page';
import {Tabs, Spin} from 'antd';
import {connect} from "react-redux";
import {isCandidates, isSpecialty} from "./components/router-tab/router-tab.action";

const {TabPane} = Tabs;


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    tabClick = (event: any) => {
        const {isCandidates, isSpecialty} = this.props;
        switch (event) {
            case '1': {
                this.props.history.push("specialty");
                isSpecialty();
                break;
            }
            case '2': {
                this.props.history.push("candidates");
                isCandidates();
                break;
            }
        }
    };

    public render() {
        const {activeKey, loadingRanging, isLoadingEnrolle} = this.props;

        return (
            <div className="app">
                <div className="app__tabs">
                    <Tabs onTabClick={this.tabClick}
                          activeKey={activeKey}>
                        <TabPane tab="Специальности" key="1"/>
                        <TabPane tab="Кандидаты" key="2"/>
                    </Tabs>
                </div>
                <Spin tip="Загрузка..."
                      spinning={loadingRanging || isLoadingEnrolle}>
                    <Switch>
                        <Route exact={true} path='/' component={SpecialtyPage}/>
                        <Route exact={true} path='/specialty' component={SpecialtyPage}/>
                        <Route exact={true} path='/candidates' component={CandidatesPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        activeKey: state.routerTabReducer.activeKey,
        loadingRanging: state.rangingReducer.loadingRanging,
        isLoadingEnrolle: state.enrolleeReducer.isLoadingEnrolle
    };
}


const mapDispatchToProps = (dispatch: any) => ({
    isCandidates: () => {dispatch(isCandidates());},
    isSpecialty: () => {dispatch(isSpecialty());},
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

