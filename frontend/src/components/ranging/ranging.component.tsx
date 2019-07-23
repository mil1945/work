import React from 'react';
import {connect} from 'react-redux';
import './ranging.component.scss';
import {Table} from 'antd';
import {COLUMNS} from "./ranging.constant";

interface IProps {
    ranging?: any;
}

class RangingComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {ranging} = this.props;
        return (<div className="ranging">
            <Table dataSource={ranging} columns={COLUMNS}/>;
        </div>);
    }
}

function mapStateToProps(state: any) {
    return {
        ranging: state.rangingReducer.ranging
    };
}

export default connect(mapStateToProps)(RangingComponent);
