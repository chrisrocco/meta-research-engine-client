/**
 * Created by Chris Rocco on 5/18/2017.
 */

(function (document, window, $) {
    'use strict';

    $(document).ready(function () {
        Site.run();
    });
})(document, window, jQuery);


var mockData = {
    "values": [
        {
            "question": "acclimationPeriod",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "prior to the experiment, mice were provided food and water ad libitum for three days"
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "After three days of cage acclimation, unanesthetized mice (4 per exposure) were irradiated (IR; JL Shepherd Mark I, 137Cs gamma ray source, San Gabriel, CA) with 1, 10, or 100â€‰cGy at 0.96, 0.96, or 88â€‰cGy/min (Â±10%), respectively, or were sham-irradiated (0â€‰cGy-controls)."
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Mice were provided food (LabDiet 5001, Purina Mills, Gray Summit, MO) and water ad libitum."
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": "Mice were irradiated and tissues were harvested on the day of irradiation."
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "acclimationDuration",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": 0
                    },
                    "users": [
                        "352",
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": 4
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": 16
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": 12
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "ageAtStart",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": 70
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": 10
                    },
                    "users": [
                        "782",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": 3
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": 70,
                        "disabled": false
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "ageAtWeight",
            "location": 0,
            "responses": [
                {
                    "data": [],
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": 10
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": 5
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": 27
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": 189
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "facilityName",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "The Jackson Labaratory"
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": "The Jackson Laboratory"
                    },
                    "users": [
                        "782",
                        "531",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "facilityCityState",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Bar Harbor, ME"
                    },
                    "users": [
                        "352",
                        "531",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Bar Harbor,ME"
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Moffett fields, California and Irvine, California"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "facilityCountry",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "United States"
                    },
                    "users": [
                        "352",
                        "782",
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "USA"
                    },
                    "users": [
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "animalLocations",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "field.falseOption"
                    },
                    "users": [
                        "352",
                        "782",
                        "531",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "field.trueOption"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "pathogenFreeEnvironment",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Not germ free"
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": "Completely germ-free"
                    },
                    "users": [
                        "782",
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "cageType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Other",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": "Open cages"
                    },
                    "users": [
                        "782",
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "airCirculation",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Open cages"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "beddingMaterial",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "changeFrequency",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "enrichmentType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "lightingSchedule",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "field.trueOption"
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "field.falseOption"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "lightHours",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 2
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "darkHours",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 5
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "lightStartTime",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 10
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "facilityHumidity",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "upperValue": 75,
                        "value": "",
                        "lowerValue": 38
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "constantTemperature",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "field.trueOption"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "temperatureRange",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "upperValue": 46,
                        "value": "",
                        "lowerValue": 0
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "dietType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Food and water ad lubitium"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Lab diet"
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": "LabDiet 5001, Purina Mills, Gray Summit, MO"
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dietID",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "LabDiet 5001"
                    },
                    "users": [
                        "352",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "5001"
                    },
                    "users": [
                        "782",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": "C57BL/6J"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "dietVendor",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Purina Mills"
                    },
                    "users": [
                        "352",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "LabDiet"
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "NASA"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Purina Mills, Gray Summit, MO"
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "dietVendorCity",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Gray Summit, MO"
                    },
                    "users": [
                        "352",
                        "531",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Purina Mills,Gray Summit,MO"
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Moffet Field, CA and Irvine, CA"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "feedingFrequency",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Ad libitum"
                    },
                    "users": [
                        "352",
                        "782",
                        "281",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "percentEnergy",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "field.falseOption"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "percentFat",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 25
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "percentCarbohydrates",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 45
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "percentProtein",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": 30
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "exerciseType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "exerciseFreq",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Weekly"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "forcedExcecise",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "field.falseOption"
                    },
                    "users": [
                        "281",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "daysOnTreatment",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": 28
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": [],
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "vendorName",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "The Jackson Laboratory"
                    },
                    "users": [
                        "352",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "NASA"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "miceVendorCity",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Moffett Field, CA and Irvine, CA"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Bar Harbor, ME"
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "vendorCountry",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "United States"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "USA"
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "sex",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "Male",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Male"
                    },
                    "users": [
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "breed",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "C57BL/6J"
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "surgeryType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Gastric bypass"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Tissues were harvested on the day of IR (basal) or 1 or 4 months later (n = 8/group), with cell culture being performed at the latter two endpoints."
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "routeOfAdministration",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Food"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "Topically (on the bodys surface"
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "compoundName",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Sucrose"
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": "(IR; JL Shepherd Mark I, 137Cs"
                    },
                    "users": [
                        "531"
                    ]
                }
            ]
        },
        {
            "question": "compoundFrequency",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Weekly"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "dosage",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "200IU"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "geneticManipulationType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "They were given osteoporosis"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "ethicalStatement",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "field.trueOption"
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "field.falseOption"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        },
        {
            "question": "micePerCage",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": 2
                    },
                    "users": [
                        "352",
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": 4
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "sampleSize",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": 5
                    },
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": 8
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": 4
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "whereReported",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": "Text, with numbers reported"
                    },
                    "users": [
                        "281",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": "In a figure"
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "averageFinalWeight",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": {
                        "value": 30
                    },
                    "users": [
                        "281",
                        "531"
                    ]
                },
                {
                    "data": [],
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "errorOfMeasurmentValue",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782"
                    ]
                },
                {
                    "data": [],
                    "users": [
                        "281"
                    ]
                },
                {
                    "data": {
                        "value": 10
                    },
                    "users": [
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": "",
                        "disabled": false
                    },
                    "users": [
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "errorOfMeasurmentType",
            "location": 0,
            "responses": [
                {
                    "data": {
                        "value": "",
                        "disabled": true
                    },
                    "users": [
                        "352",
                        "531"
                    ]
                },
                {
                    "data": {
                        "value": ""
                    },
                    "users": [
                        "782",
                        "363"
                    ]
                },
                {
                    "data": {
                        "value": "Standard Deviation (S.D. or s.d.)"
                    },
                    "users": [
                        "281"
                    ]
                }
            ]
        }
    ],
    "scopes": [
        {
            "question": "acclimationPeriod",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "acclimationDuration",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "ageAtStart",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "ageAtWeight",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "facilityName",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "facilityCityState",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "facilityCountry",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "animalLocations",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "pathogenFreeEnvironment",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "cageType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "airCirculation",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "beddingMaterial",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "changeFrequency",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "enrichmentType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "lightingSchedule",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "lightHours",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "darkHours",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "lightStartTime",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "facilityHumidity",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "constantTemperature",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "temperatureRange",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dietType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dietID",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dietVendor",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dietVendorCity",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "feedingFrequency",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "percentEnergy",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "percentFat",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "percentCarbohydrates",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "percentProtein",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "exerciseType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "exerciseFreq",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "forcedExcecise",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "daysOnTreatment",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "vendorName",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "miceVendorCity",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "vendorCountry",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "sex",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "breed",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "surgeryType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "routeOfAdministration",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "compoundName",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "compoundFrequency",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "dosage",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "geneticManipulationType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "ethicalStatement",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "micePerCage",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "sampleSize",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "whereReported",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "averageFinalWeight",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "errorOfMeasurmentValue",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        },
        {
            "question": "errorOfMeasurmentType",
            "responses": [
                {
                    "scope": "constant",
                    "users": [
                        "352",
                        "782",
                        "281",
                        "531",
                        "363"
                    ]
                }
            ]
        }
    ],
    "structure": {
        "responses": [
            {
                "branches": 1,
                "users": [
                    "352",
                    "782",
                    "281",
                    "531",
                    "363"
                ]
            }
        ]
    }
};