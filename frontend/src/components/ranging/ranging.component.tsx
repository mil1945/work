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

    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log(sorter.field, sorter.order);
    };

    render() {
        const {ranging} = this.props;
        return (<div className="ranging">
            <Table dataSource={ranging}
                   columns={COLUMNS}
                   onChange={this.handleTableChange}/>;
        </div>);
    }
}

function mapStateToProps(state: any) {
    return {
        ranging: state.rangingReducer.ranging
    };
}

export default connect(mapStateToProps)(RangingComponent);
