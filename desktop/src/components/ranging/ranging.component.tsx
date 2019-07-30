import React from 'react';
import {connect} from 'react-redux';
import './ranging.component.scss';
import {Table} from 'antd';
import {COLUMNS} from "./ranging.constant";
import Http from "../../service/http/http";
import {addRanging} from "./ranging.action";


interface IProps {
    ranging?: any;
    addRanging: any
}

class RangingComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log(sorter.field, sorter.order);
        const {addRanging} = this.props;

        Http.get(`ranging/${sorter.field}/${sorter.order}`).then((rang) => {

            console.log('filter rang');
            console.log(rang);

            addRanging(rang.rangingData);
        });
    };

    render() {
        const {ranging} = this.props;

        console.log('render ranging');
        console.log(ranging);

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

const mapDispatchToProps = (dispatch: any) => ({
    addRanging: (ranging: any) => {
        dispatch(addRanging(ranging));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RangingComponent);
