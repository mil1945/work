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

// {
//     "name": "tau",
//     "version": "0.1.0",
//     "private": true,
//     "dependencies": {
//     "@types/pdfmake": "^0.1.5",
//         "@types/react-router-dom": "^4.3.3",
//         "@types/redux-logger": "^3.0.7",
//         "@types/redux-thunk": "^2.1.0",
//         "antd": "^3.17.0",
//         "electron": "^5.0.8",
//         "pdfmake": "^0.1.56",
//         "react": "^16.8.6",
//         "react-dom": "^16.8.6",
//         "react-redux": "^7.0.3",
//         "react-router-dom": "^5.0.0",
//         "react-scripts-ts-antd": "2.17.0",
//         "redux-logger": "^3.0.6",
//         "redux-thunk": "^2.2.0"
// },
//     "scripts": {
//     "start": "react-scripts-ts-antd start",
//         "build": "react-scripts-ts-antd build",
//         "test": "react-scripts-ts-antd test --env=jsdom",
//         "eject": "react-scripts-ts-antd eject",
//         "now-build": "react-scripts-ts-antd build"
// },
//     "devDependencies": {
//     "@types/jest": "^24.0.12",
//         "@types/node": "^12.0.0",
//         "@types/react": "^16.8.16",
//         "@types/react-dom": "^16.8.4",
//         "@types/react-redux": "^7.0.8",
//         "electron-builder": "^21.1.5",
//         "typescript": "^3.4.5"
// }
// }
