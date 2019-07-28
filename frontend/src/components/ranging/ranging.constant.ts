export const ADD_RANGING = 'ADD_RANGING';
export const LOADING_RANGING = 'LOADING_RANGING';

export const COLUMNS = [
    {
        title: 'ФИО',
        dataIndex: 'fullName',
        sorter: true,
        key: 'fullName',
    },
    {
        title: 'Дата занесения',
        dataIndex: 'date',
        sorter: true,
        key: 'date',
    },
    {
        title: 'Ранг',
        dataIndex: 'rang',
        sorter: true,
        key: 'rang',
    },
    {
        title: 'Интегральный показатель',
        dataIndex: 'integralIndex',
        sorter: true,
        key: 'integralIndex',
    },
];