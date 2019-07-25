from bson import json_util
from algorithm.algorithm import main


def get_data(db):
    print(db.list_collection_names())

    military_specialitie = list(db.militaryspecialities.find())

    for enrollee in db.enrollees.find():
        civil_speciality = db.civilspecialities.find_one({'codeCivilSpeciality': enrollee['civilSpeciality']})
        competence_civil_speciality = civil_speciality['competenceCivilSpeciality']
        idEnrollee = enrollee['_id']

        print('.')

        for elem_military_specialitie in military_specialitie:
            equality = main(competence_civil_speciality, elem_military_specialitie['competenceMilitarySpeciality'])
            elem_military_specialitie['equality'] = equality
            # print(elem_military_specialitie)
            # print(equality)

        military_specialitie.sort(key=lambda x: x['equality'], reverse=True)
        # print(military_specialitie)

        stop = 3
        len_military_specialitie = len(military_specialitie)
        if len_military_specialitie < 3:
            stop = len_military_specialitie

        recommendations_military_speciality = []
        for elem in military_specialitie[0:stop:1]:
            recommendations_military_speciality.append(elem['codeMilitarySpeciality'])

        ranging = db.rangings.find_one({'idEnrollee': str(idEnrollee)})
        ranging['recommendationsMilitarySpeciality'] = recommendations_military_speciality
        db.rangings.save(ranging)

    data = list(db.rangings.find())

    return json_util.dumps({
        'rangingData': data
    })
