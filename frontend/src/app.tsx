import * as React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './app.scss';
import NotFound from './pages/not-found/not-found';
import MainPage from './pages/main/main.page';

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact={true} path='/' component={MainPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);

