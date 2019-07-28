from bson import json_util
from algorithm.algorithm import main
from bson.objectid import ObjectId


def get_data_for_user(db, id_user):
    enrollee = db.enrollees.find_one({"_id": ObjectId(id_user)})

    civil_speciality = db.civilspecialityens.find_one({'codeCivilSpecialityEn': enrollee['civilSpeciality']})
    military_specialitie = list(db.militaryspecialityens.find())

    competence_civil_speciality = civil_speciality['competenceCivilSpecialityEn']
    for elem_military_specialitie in military_specialitie:
        equality = main(competence_civil_speciality, elem_military_specialitie['competenceMilitarySpecialityEn'])
        elem_military_specialitie['equality'] = equality
    military_specialitie.sort(key=lambda x: x['equality'], reverse=True)

    stop = 3
    len_military_specialitie = len(military_specialitie)
    if len_military_specialitie < 3:
        stop = len_military_specialitie

    recommendations_military_speciality = []
    for elem in military_specialitie[0:stop:1]:
        recommendations_military_speciality.append(elem['codeMilitarySpecialityEn'])

    enrollee['recommendationsMilitarySpeciality'] = recommendations_military_speciality
    db.enrollees.save(enrollee)
    return json_util.dumps({
        db.enrollees.find()
    })


def get_data(db):
    # print(db.list_collection_names())

    military_specialitie = list(db.militaryspecialityens.find())

    for enrollee in db.enrollees.find():
        # print(db.civilspecialityens)

        civil_speciality = db.civilspecialityens.find_one({'codeCivilSpecialityEn': enrollee['civilSpeciality']})

        # print(civil_speciality)

        competence_civil_speciality = civil_speciality['competenceCivilSpecialityEn']
        idEnrollee = enrollee['_id']

        print('.')
        # print(competence_civil_speciality, military_specialitie)

        for elem_military_specialitie in military_specialitie:
            equality = main(competence_civil_speciality, elem_military_specialitie['competenceMilitarySpecialityEn'])
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
            recommendations_military_speciality.append(elem['codeMilitarySpecialityEn'])

        ranging = db.rangings.find_one({'idEnrollee': str(idEnrollee)})
        ranging['recommendationsMilitarySpeciality'] = recommendations_military_speciality
        db.rangings.save(ranging)

    data = list(db.rangings.find())

    return json_util.dumps({
        'rangingData': data
    })
