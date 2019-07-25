from bson import json_util
from algorithm.algorithm import main


def get_data(db):
    print(db.list_collection_names())

    military_specialitie = list(db.militaryspecialities.find())
    print(military_specialitie)

    for enrollee in db.enrollees.find():
        civil_speciality = db.civilspecialities.find_one({'codeCivilSpeciality': enrollee['civilSpeciality']})
        competence_civil_speciality = civil_speciality['competenceCivilSpeciality']
        print(competence_civil_speciality)
        idEnrollee = enrollee['_id']

        print(idEnrollee)

        for elem_military_specialitie in military_specialitie:
            equality = main(competence_civil_speciality, elem_military_specialitie['competenceMilitarySpeciality'])
            elem_military_specialitie['equality'] = equality
            print(elem_military_specialitie)
            print(equality)

        military_specialitie.sort(key=lambda x: x['equality'], reverse=True)
        print(military_specialitie)

        ranging = db.rangings.find_one({'idEnrollee': str(idEnrollee)})
        ranging['recommendationsMilitarySpeciality'] = 15
        ranging['recommendationsSubdivision'] = 15
        db.rangings.save(ranging)

    # for civilspecialities in db.civilspecialities.find():
    #     print(civilspecialities)

    data = list(db.rangings.find())

    return json_util.dumps({
        'rangingData': data
    })
