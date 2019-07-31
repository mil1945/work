export const ADD_ENROLLEE = 'ADD_ENROLLEE';
export const LOADING_ENROLLEE = 'LOADING_ENROLLEE';

export const ENROLLEE_LABEL_NAME = {
    fullName: 'Фамилия Имя Отчество',
    healthStatus : 'Состояние здоровья',
    physicalStatus: 'Физическая подготовленность',
    profPsychStatus: 'Профессионально-психологическая пригодность',
    socialSelectionStatus: 'Результат социального отбора',
    educationLevel: 'Уровень образования',
    civilSpeciality: 'Гражданская специальность'
};

export const ENROLLEE_HEALTH_STATUS  = {
    5: 'A1',
    4.5: 'A2',
    4: 'A3',
    3.5: 'A4',
    3: 'Б2',
    2.5: 'Б3',
    2: 'Б4',
    1.5: 'B',
    1: 'Г',
    0.5: 'Д',
};

export const ENROLLEE_PHYSICAL_STATUS = {
    5: 'отл.',
    3.75: 'хор.',
    2.5: 'удовл.',
    1.25: 'неуд.',
};

export const ENROLLEE_PROFPHYSC_STATUS = {
    5: 'I',
    3.75: 'II',
    2.5: 'III',
    1.25: 'IV',
};

export const ENROLLEE_SOCIAL_SELECTION_STATUS = {
    5: 'I',
    3.75: 'II',
    2.5: 'III',
    1.25: 'IV',
};

export const ENROLLEE_EDUCATION_LEVEL = {
    0.7: 'Основное общее',
    1.4: 'Среднее общее',
    2.1: 'Среднее профессиональное',
    2.9: 'Бакалавриат',
    3.6: 'Специалитет',
    4.3: 'Магистратура',
    5: 'Кадры высшей категории',
};
