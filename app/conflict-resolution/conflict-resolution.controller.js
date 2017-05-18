angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = [ '$scope' ];
function ConflictResolutionController( $scope ){
    for( var i = 0; i < mockData.values.length; i++ ){
        var obj = mockData.values[i];
        for( var j = 0; j < obj.responses.length; j++ ){
            var rsp = obj.responses[j];
            if( rsp.data.value == "" ){
                if( rsp.data.disabled ){
                    rsp.data.value = "Not Reported";
                    continue;
                }
                rsp.data.value = "No Response";
            }
        }
    }
    $scope.myUserKey = mockUserKey;
    $scope.valueConflicts = mockData.values;

    $scope.getRandomAvatar = getRandomAvatar;

    function getRandomAvatar() {
        var min = 1;
        var max = 9;
        var rand = Math.floor(Math.random() * (max - min)) + min;
        return "../assets/avatars/" + rand + ".png";
    }
}


var mockUserKey = "363";
var mockData = {
    "values": [
        {
            "question": {
                "_key": "acclimationPeriod",
                "description_long": "Describe what the scientists did to the mice before the experiment started. These statements may look like prior to the experiment, mice were maintained on a control diet for 2 weeks, or mice were allowed to acclimate for 1 week prior to receiving the treatment.",
                "description_short": "What did they do to the mice in the acclimation period?",
                "icon": "fa fa-question",
                "name": "Acclimation Period",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "acclimationDuration",
                "description_long": "Scientist say how long mice did something before the start of the experiment (examples: from weaning until 8 months would be reported 32, assuming four weeks per month; for the 1st week would be reported as 1; mice were adapted to the facility for 1-2 weeks before start would be reported as 1-2)",
                "description_short": "How many weeks did it last?",
                "icon": "fa fa-question",
                "name": "Acclimation Duration",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "ageAtStart",
                "description_long": "Scientists report how many weeks old the mice were when the experiment started. If there is an acclimation period, make sure to report only when the experiment started (example: five week old mice were allowed to acclimate for 1 week prior to being assigned to exercise or control  the age at start would be 6 weeks; seven week old mice adapted to the facility for 1-2 weeks before assignment would be 8-9).",
                "description_short": "How many days old were the mice when the experiment started?",
                "icon": "fa fa-calendar-check-o",
                "name": "Age at Start",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "ageAtWeight",
                "description_long": "The age of mice when the final weight was recorded can be presented in several ways. Sometimes they will just say (example: weights were taken at 18 weeks); sometimes you have to do math (example: if the age at start was 5 weeks, and the treatment lasted 12, then the age at final weight would be 17 weeks; if there was a 1 week acclimation period before starting treatment, it would be 18 weeks); sometimes, only a range is available (example: mice were started on treatment between 6 and 8 weeks old, and kept on treatment for 8 weeks is reported as 14-16).",
                "description_short": "How many days old were the mice when the final weight was recorded?",
                "icon": "fa fa-calendar-check-o",
                "name": "Age at Weight",
                "type": "number",
                "value": ""
            },
            "responses": [
                {
                    "data": [

                    ],
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "facilityName",
                "description_long": "Scientists mention the name of the animal facility where mice were housed (example: the University of Alabama at Birmingham).",
                "description_short": "The name of where the mice where housed.",
                "icon": "fa fa-home",
                "name": "Animal Facility Name",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "facilityCityState",
                "description_long": "Scientists may mention the city where the animal facility is located (example: if at UAB, then this would be Birmingham, AL). Sometimes they do not say, but if all of the authors are from the same institution, then we can guess that they were in the city where the authors are.",
                "description_short": "City and state (if available) of facility location. e.g. Birminham, AL",
                "icon": "fa fa-globe",
                "name": "Animal Facility City and State",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "facilityCountry",
                "description_long": "Scientists may mention the country where the animal facility is located (example: if at UAB, then this would be United States). Sometimes they do not say, but if all of the authors are from the same institution, then we can guess that they were in the country where the authors are.",
                "description_short": "What country is the building located in?",
                "icon": "fa fa-globe",
                "name": "Animal Facility Country",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "animalLocations",
                "description_long": "When scientists say where mice were housed, they may mention one location or more than one location (example: Ohio State animal facility OR evaluated a three sites).",
                "description_short": "Were mice housed in different cities or states?",
                "falseOption": "No",
                "icon": "fa fa-globe",
                "name": "Animal Locations",
                "trueOption": "Yes",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "pathogenFreeEnvironment",
                "description_long": "Its important to make sure the research animals do not get sick, both for their well-being and for the quality of the research. In some cases, the scientists need their to be no bacteria (sometimes called completely germ-free); other times, they just need to be sure there are not disease like influenza (and they will report this as specific pathogen free). Occasionally they will indicate that the facility was not germ free. Remember if they do not report a status, disable the field; dont assume its not germ free.",
                "description_short": "Did the mice live in a germ- or pathogen-free environment?",
                "icon": "fa fa-question",
                "name": "Germ- or Pathogen-Free Environment",
                "options": [
                    "Completely germ-free",
                    "Specific pathogen-free",
                    "Not germ free"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "cageType",
                "description_long": "Scientists say what type of cage mice were placed in (example: polycarbonate standard filter top cages = polycarbonate cages).",
                "description_short": "What type of cage were the mice housed in?",
                "icon": "fa fa-archive",
                "name": "Cage Type",
                "options": [
                    "Open cages",
                    "Polycarbonate cages",
                    "Soft filter-top cages",
                    "Plastic pens",
                    "Microisolator cages",
                    "Other"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "airCirculation",
                "description_long": "Describes how air is exchanged in the animal facility or cages (example: ventilation rack system used or filter top cages).",
                "description_short": "What type of air circulation occurred?",
                "icon": "fa fa-",
                "name": "Air Circulation",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "beddingMaterial",
                "description_long": "Describes the type of material used to line the bottom of the cages (e.g. wood chips, sawdust, etc.)",
                "description_short": "What type of bedding material was used in the cages?",
                "icon": "fa fa-bed",
                "name": "Bedding Material",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "changeFrequency",
                "description_long": "Describes how often the bedding material was changed (example: cages changed weekly would be weekly; cages changed every other day would be <7 days; terms like biweekly can mean every other week or twice per week, so read carefully to see if you can distinguish between the two definitions).",
                "description_short": "How often was the bedding material changed in days?",
                "icon": "fa fa-repeat",
                "name": "Change Frequency",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "enrichmentType",
                "description_long": "Scientists may say that mice were given material for hiding (example: a piece of PVC pipe), destruction (example: paper squares), or chewing (example: Nylabone).",
                "description_short": "What type of enrichment did they provide the mice with?",
                "icon": "fa fa-futbol-o",
                "name": "Enrichment Type",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "lightingSchedule",
                "description_long": "Scientists say whether the amount of time the lights were turned on or off stayed the same (constant) or changed (variable) during the experiment (example: mice were housed with a 12 hour light/dark cycle is constant; mice were switched every two weeks to a light cycle starting at 6 AM or 12 AM is variable).",
                "description_short": "Was the light schedule constant or did it change?",
                "falseOption": "Changing",
                "icon": "fa fa-lightbulb-o",
                "name": "Lighting Schedule",
                "trueOption": "Constant",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "lightHours",
                "description_long": "Scientist say how long the light cycle lasted in hours (examples: a 12:12 light-dark cycle = 12; 14 h light/10 h dark = 14).",
                "description_short": "How long were the lights kept on in hours?",
                "icon": "fa fa-lightbulb-o",
                "name": "Light Hours",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "darkHours",
                "description_long": "Scientist say how long the dark cycle lasted in hours (examples: a 12:12 light-dark cycle = 12; 14 h light/10 h dark = 10). Sometimes they will only report hours of light, in which case we assume a 24 hour day (example: if they say a 12 hour light cycle, we will assume 12 hours of dark).",
                "description_short": "How long were the lights turned off in hours?",
                "icon": "fa fa-lightbulb-o",
                "name": "Dark Hours",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "lightStartTime",
                "description_long": "Scientist say when the light cycle started (example: the light cycle started at 6 a.m., 0600h, or 06:00 would be reported as 0600 without a colon in the time)",
                "description_short": "What time were the lights turned on in military time?",
                "icon": "fa fa-lightbulb-o",
                "name": "Light Start Time",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "facilityHumidity",
                "description_long": "Scientists say the percent humidity of the animal room or facility (example: 50% humidity should be reported as 50; humidity-controlled room 5510% should be reported as 45 - 65).",
                "description_short": "What was the humidity of the faciliity?",
                "icon": "fa fa-thermometer-half",
                "maximum": 75,
                "minimum": 0,
                "name": "Humidity",
                "type": "range",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "constantTemperature",
                "description_long": "Scientists say whether the temperature was purposefully changed (variable) or was held constant during the experiment (example: temperature controlled between 25 and 27 degrees Celsius is Constant, even though there was a temperature range because they tried to hold it constant; mice were intermittently exposed to cold temperature is Changing).",
                "description_short": "Did the temperature stay the same, or did it change?",
                "falseOption": "Changing",
                "icon": "fa fa-thermometer-half",
                "name": "Constant Temperature",
                "trueOption": "Constant",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "temperatureRange",
                "description_long": "Scientists say the temperature of the animal room or facility (example: 221oC should be reported as 21  23; 22-24 oC should be reported as 22  24; 22 oC should be reported as 22). If it is reported in Fahrenheit, use an internet search to convert it to Celsius (example: type 73 Fahrenheit in Celsius into Google).",
                "description_short": "What was the range of temperature in Celsius?",
                "icon": "fa fa-thermometer-half",
                "maximum": 60,
                "minimum": 0,
                "name": "Temperature Range",
                "type": "range",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "dietType",
                "description_long": "Scientists write the type of diet mice were given (examples: low-fat control diet, high fat diet, standard lab diet, standard rodent chow)",
                "description_short": "What diet were the mice placed on?",
                "icon": "fa fa-question",
                "name": "Diet Type",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "dietID",
                "description_long": "Scientists may write the catalog number of the diet they used to feed the mice (examples: Research Diets, D12451 should be reported as D12451; catalog ID 5bV8 would be reported as 5bV8)",
                "description_short": "What is the catalog number of the diet?",
                "icon": "fa fa-question",
                "name": "Vendor ID",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "dietVendor",
                "description_long": "Scientists write the name of the company where they ordered the diet for the mice (examples: Research Diets, Inc.; Ao-boxing Biotech Company Ltd.) or sometimes make it themselves (example: diets were made in-house from purified ingredients).",
                "description_short": "What company or lab did the scientists get the diet from?",
                "icon": "fa fa-question",
                "name": "Vendor Name",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "dietVendorCity",
                "description_long": "Scientist may write the city where the company or lab is located after mentioning the name of the company when describing the diet (example: Research Diets, Inc.; New Brunswick, NJ is reported as New Brunswick, NJ; Beijing, China is reported as Beijing; Purina/Test Diet (St. Louis MO) is reported as St. Louis, MO).",
                "description_short": "What city and state (if available) is the company or lab located in? (e.g. Birmingham, AL)",
                "icon": "fa fa-question",
                "name": "Vendor City/State",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "feedingFrequency",
                "description_long": "Were the mice fed ad libitum, which means food is freely available to them to consume as much as they want; paired, which means the amount available to one animal depends on the amount that another animal ate; or fixed, which means the amount offered to each animal is a set amount determined by the researchers.",
                "description_short": "How were the mice fed?",
                "icon": "fa fa-question",
                "name": "Feeding Design",
                "options": [
                    "Ad libitum",
                    "Paired",
                    "Fixed"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "percentEnergy",
                "description_long": "Scientists often describe the composition of diets in terms of percentages, but how the percentage is calculated is important. For instance, if they say a diet is 60% fat, is that 60% of energy or calories from fat (that is, 60% of all the food energy is from fat, known as percent by energy) or is it percent by mass or weight (that is, 60% of the weight of the food is fat, or percent by weight). Often, they wont say, in which case, disable the field.",
                "description_short": "How did the scientists express the percentages?",
                "falseOption": "Percent by weight",
                "icon": "fa fa-percent",
                "name": "Percent by Energy",
                "trueOption": "Percent by energy",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "percentFat",
                "description_long": "Scientists may write what percent of the diet is made of fat (example: 10% fat diet = 10; 60% kcal fat = 60). Sometimes only one macronutrient will be reported, which means we do not know the percent for the other two. If, however, they report two macronutrients, and no alcohol is in the diet, then we can get the third from subtraction (example: 60% carbohydrate and 20% fat means 10% protein to get to 100%).",
                "description_short": "What percent of the diet was made of fat?",
                "icon": "fa fa-percent",
                "name": "Percent Fat",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "percentCarbohydrates",
                "description_long": "Scientists may write what percent of the diet is made of carbohydrates (example: 70% of calories from carbohydrates = 70; 20% carbohydrate diet = 20). Sometimes only one macronutrient will be reported, which means we do not know the percent for the other two. If, however, they report two macronutrients, and no alcohol is in the diet, then we can get the third from subtraction (example: 60% carbohydrate and 20% fat means 10% protein to get to 100%).",
                "description_short": "What percent of the diet was made of carbohydrates?",
                "icon": "fa fa-percent",
                "name": "Percent Carbohydrates",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "percentProtein",
                "description_long": "Scientists may write what percent of the diet was made of protein (example: 20% of calories from protein = 20; 20% kcal protein = 20). Sometimes only one macronutrient will be reported, which means we do not know the percent for the other two. If, however, they report two macronutrients, and no alcohol is in the diet, then we can get the third from subtraction (example: 60% carbohydrate and 20% fat means 10% protein to get to 100%).",
                "description_short": "What percent of the diet was made of protein?",
                "icon": "fa fa-percent",
                "name": "Percent Protein",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "exerciseType",
                "description_long": "Describes the type of exercise mice were exposed to (examples: exercise wheel, rotarod, hamster wheel etc.).",
                "description_short": "What type of exercise did the mice perform?",
                "icon": "fa fa-bolt",
                "name": "Exercise Type",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "exerciseFreq",
                "description_long": "(examples: four sessions spanning 2 weeks would be 2-6 times per week; mice were housed in a cage in the presence of a non-load bearing hamster wheel means it was always around, so coded as continuously)",
                "description_short": "How often did the mice exercise or have access?",
                "icon": "fa fa-bolt",
                "name": "Exercise Frequency",
                "options": [
                    "Continuously (ex: wheel in the cage",
                    "Multiple times per day",
                    "Daily",
                    "2-6 times per week",
                    "Weekly",
                    "2-4 times per month",
                    "Monthly",
                    "Less frequently than monthly"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "forcedExcecise",
                "description_long": "Describes whether the mice were allowed to exercise as they wanted, such as having an exercise wheel in their cage (Available), or if they were forced to exercise, such as being placed on rodent treadmill (Forced).",
                "description_short": "Were the mice forced to excercise?",
                "falseOption": "Available",
                "icon": "fa fa-bolt",
                "name": "Forced Excercise",
                "trueOption": "Forced",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "daysOnTreatment",
                "description_long": "Scientists say how long the experiment lasted (examples: mice were started on a 28-day treatment is reported as 4 weeks; the experiment was 8 weeks in duration is reported as = 8; the mice were euthanized after 8 or 19 weeks on treatment is an indication that there are two separate study arms here, with one group studied for 8 weeks and the other for 19 weeks).",
                "description_short": "How many weeks did the mice recieve treatment?",
                "icon": "fa fa-calendar",
                "name": "Weeks on Treatment",
                "type": "number",
                "value": ""
            },
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
                    "data": [

                    ],
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "vendorName",
                "description_long": "Scientists say the name of the company or lab where they got the mice from (examples: obtained from the Experimental Animal Center, China Medical University is reported as China Medical University; purchased from Jackson Laboratories = Jackson Laboratories)",
                "description_short": "What company or lab did the scientists get the mice from?",
                "icon": "fa fa-question",
                "name": "Vendor Name",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "miceVendorCity",
                "description_long": "Scientists may say where the company or lab is located right after they mention the name of the vendor (examples: Jackson Laboratory (Bar Harbor, ME) = Bar Harbor, ME; Experimental Animal Center, China Medical University, Shenyang, China = Shenyang). If only a country is listed, disable the field and enter the country in the Vendor Country field. (example: Charles River (Charles River Laboratories, France)).",
                "description_short": "What city and state (if available) is the company or lab located in? (e.g. Birmingham, AL)",
                "icon": "fa fa-globe",
                "name": "Vendor City and State",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "vendorCountry",
                "description_long": "Scientists may say where the company or lab is located right after they mention the name of the vendor (examples: Jackson Laboratory (Bar Harbor, ME) = USA; Experimental Animal Center, China Medical University, Shenyang, China = China; Charles River (Charles River Laboratories, France) = France).",
                "description_short": "What country is the company or lab located in?",
                "icon": "fa fa-globe",
                "name": "Vendor Country",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "sex",
                "description_long": "Scientists should say whether they used male or female rats, or a mix. Make sure if they used both male and female mice, but separated them in experiments, that you indicate that sex is a variable at the study arm level (example: male and female mice were each given the treatment is reported as male for one study arm and female for another).",
                "description_short": "Did the experiment use male, female, or mixture of sex mice?",
                "icon": "fa fa-venus",
                "name": "Sex",
                "options": [
                    "Male",
                    "Female",
                    "Mixture"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "breed",
                "description_long": "Name given to separate different types of mice based on where they originated (e.g. C57BL/6, C57BL/6J, C57BL/6H).",
                "description_short": "What is the name of the mouse strain?",
                "icon": "fa fa-question",
                "name": "Breed/Background/Strain",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "surgeryType",
                "description_long": "Describe what type of surgery the mice underwent (examples: ovariectomy, Roux-en-Y gastric bypass, cardiac stent).",
                "description_short": "What type of surgery was performed on the mice?",
                "icon": "fa fa-question",
                "name": "Surgery Type",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "routeOfAdministration",
                "description_long": "Scientists describe how they gave the mice a compound (examples: insulin was given i.p. means it was injected intraperitoneally; mice were given the drug p.o. by gavage, which means given per oral and was gavaged; the compound was spread topically is reported as topically).",
                "description_short": "How was the compound given to the mice",
                "icon": "fa fa-question",
                "name": "Route of Administration",
                "options": [
                    "Injected",
                    "Water",
                    "Food",
                    "Topically (on the bodys surface",
                    "Gavage (forced into stomach)"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "compoundName",
                "description_long": "Scientists describe what they gave (examples: acetaminophen; compound GSK-86473; antibiotic). If it appears to be a nutrient and is part of food or drink, consider moving it to the diet category (example: glucose is a compound, but is typically considered part of the diet; phytosterols, although they exist in food, are typically given like a drug).",
                "description_short": "What is the name of the compound used?",
                "icon": "fa fa-question",
                "name": "Compound Name",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "compoundFrequency",
                "description_long": "How frequently the animal received the compound. (examples: the compound was dissolved in the drinking water means that it was around all the time, so it was continuously; the first pellets had the treatments put on them, and after the animals completed these they received the rest of their food means that they got the compound daily; animals were injected every Wednesday means they received it weekly",
                "description_short": "How often was the compound given?",
                "icon": "fa fa-repeat",
                "name": "Frequency",
                "options": [
                    "Continuously (such as in water)",
                    "Multiple times per day",
                    "Daily",
                    "2-6 times per week",
                    "Weekly",
                    "2-4 times per month",
                    "Monthly",
                    "Less frequently than monthly"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "dosage",
                "description_long": "Describe how much of the compound was given to each mouse. This can be described in a number of ways (examples: the compound was dissolved in water at a concentration of 20% g/v would be reported as 20% g/v; the animals were gavaged with 3 mg/kg body weight would be reported as 3 mg/kg body weight; 100IU of insulin were delivered i.p. would be reported as 100IU),",
                "description_short": "How much of the compound were mice given?",
                "icon": "fa fa-question",
                "name": "Dosage",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "geneticManipulationType",
                "description_long": "",
                "description_short": "What type of genetic manipulation did mice go through?",
                "icon": "fa fa-heartbeat",
                "name": "Genetic Manipulation Type",
                "type": "text",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "ethicalStatement",
                "description_long": "Scientists say whether they received approval from an Ethical Review Committee (examples: IACUC  Institutional Animal Care and Use Committee , IRB  Institutional Review Board, Institutional Guideline for the Care and Use of Laboratory Animals, Dutch Law on Animal Experimentation)",
                "description_short": "Did the scientists state that they received approval from an Ethical Review Committee (e.g. IACUC, IRB)?",
                "falseOption": "No",
                "icon": "fa fa-question",
                "name": "Ethical Statement",
                "trueOption": "Yes",
                "type": "boolean",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "micePerCage",
                "description_long": "(examples: single housed = 1, individually housed = 1, 9 -10 per cage is reported as 9-10, 5 mice/cage = 5)",
                "description_short": "How many were in a single cage?",
                "icon": "fa fa-hashtag",
                "name": "Mice Per Cage",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "sampleSize",
                "description_long": "The number of mice given a particular treatment. This is not the total number in a study, but the number in each study arm. Sometimes it is reported as a range (example: 4-5 mice per treatment is reported as 4-5). The number of mice is not always the same between study arms, so one study arm might have 4 mice, while another could have 5. In that case, Sample Size needs to be moved to the study arms.",
                "description_short": "How many mice (sample size, n) were included in the treatment?",
                "icon": "fa fa-question",
                "name": "Sample Size",
                "type": "number",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "whereReported",
                "description_long": "Weight can be reported in several ways. It can be reported in a table as numbers; in the text as numbers; in a figure, such as a bar chart or a line graph; or mentioned in generic terms in the text (example: weight did not differ between groups), without numbers. Sometimes it is in multiple places, or reported only as differences over time or between groups. And, sometimes, it is not reported at all.",
                "description_short": "",
                "icon": "fa fa-question",
                "name": "Where in the paper is weight reported?",
                "options": [
                    "A table with numbers",
                    "Text, with numbers reported",
                    "In a figure",
                    "Mentioned generally in the text",
                    "Presented as differences from baseline",
                    "Presented as differences between groups"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "averageFinalWeight",
                "description_long": "The weight as reported in the paper. If no numbers are reported, then disable this field. Hopefully numbers will be reported in a table or text. Do not estimate the numbers from figures. Do not report weights as differences from baseline or differences between groups.",
                "description_short": "What was the last reported average (mean) weight of the mice in grams?",
                "icon": "fa fa-scale",
                "name": "Average Final Weight",
                "type": "number",
                "value": ""
            },
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
                    "data": [

                    ],
                    "users": [
                        "363"
                    ]
                }
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "errorOfMeasurmentValue",
                "description_long": "Scientist may report means followed by a  sign or parentheses and a number to show the error of measurement (example: 22  3 is reported as 3; 22 (3) is also reported as 3). If there is more than one number, then report them both with a dash or hyphen (example: 22[19,25] is reported as 19-25). If not reporting a final weight, do not report the error here.",
                "description_short": "What was the standard deviator (S.D.) or standard error (S.E.) of the last reported average (mean) weight of the mice in grams?",
                "icon": "fa fa-question",
                "name": "Error for the Final Weight",
                "type": "number",
                "value": ""
            },
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
                    "data": [

                    ],
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
            ],
            "location": 0
        },
        {
            "question": {
                "_key": "errorOfMeasurmentType",
                "description_long": "Scientist say what type of error measurement they used. This can be represented as S.D. or sd for standard deviation; S.E. or s.e.m. for standard error of the mean; or CI for confidence interval. Sometimes the type of error is shown right next to the numbers (example: 22  3 s.d.); other times there is a statistics or analysis section in the paper that says what they used throughout the paper (example: values are reported as means and standard deviations). If not reporting a final weight, do not report the error type.",
                "description_short": "What type of error of measurement was reported?",
                "icon": "fa fa-question",
                "name": "Error of Measurement Type",
                "options": [
                    "Standard Deviation (S.D. or s.d.)",
                    "Standard Error or Standard Error of the Mean (s.e. of S.E.M.",
                    "Confidence Interval (C.I.)"
                ],
                "type": "select",
                "value": ""
            },
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
            ],
            "location": 0
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