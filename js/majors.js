/**
 * Right below this comment you'll see a bunch of major defintions.
 * The syntax for these major definitions isn't difficult: it consists of a
 * list, where element 0 is an integer which provides the condition you need
 * from the elements that follow to satisfy that branch. Most of the time,
 * this condition is a number: this means that n of the following classes must
 * be present and correct (which is defined later) in order for that "branch"
 * of the list to be valid. Alternative conditions are stored as objects,
 * of the form:
 *
 * {count:42, type:"total_units", desc:"units from", special:1}
 *
 * which means that the present and correct classes must add up to
 * at least 42 units.
 *
 * There's a subtle point here: the lists can then themselves contain
 * further lists. Thus, you can say requirements like
 * "18.02, (18.03 or 18.033), and 18.06" as
 * [3, "18.02", [1, "18.03", "18.033"], "18.06"].
 * (Note, that leading 3 can be a 0: CourseRoad will interpret it as
 * "all of the following".)
 *
 * Individual strings for subjects can be replaced with objects, if additional
 * details are needed. This is primarily evident in certain cases:
 *   - Coreqs: {id: "18.03", coreq: 1}
 *   - Ranges: {id: "18.03-18.06", range: 1, regexMatch: /^18\.0[3-6]/}
 *   - Descriptions: {id: "18.03", desc: "(optional)"}
 *   - Skip: {id: "Just a marker; ignore me", skip: 1}
 */

window.majors = {
  m1_A: {
    name: "1A -- Engineering (as of May '15)",
    disable: 1,
    reqs: [0,
      "1.018", "1.020", "1.050", "1.060", [1, "18.03", "18.034"],
      [1, "1.00", "1.010"], "1.101", "1.102"
    ]
  },

  m1_C: {
    name: "1C -- Civil Engineering (as of May '15)",
    disable: 1,
    reqs: [0,
      "1.018", "1.020", "1.050", "1.060", [1, "18.03", "18.034"], "1.013",
      "1.00", "1.010", "1.011", "1.035", "1.036", "1.041", "1.101", "1.102",
      [1, "1.015", "1.032", "1.054", "1.152"]
    ]
  },

  m1_E: {
    name: "1E -- Environmental Engineering Science (as of May '15)",
    disable: 1,
    reqs: [0,
      "1.018", "1.020", "1.050", "1.060", [1, "18.03", "18.034"], "1.013",
      [1, "1.00", "1.010"],
      "1.061", "1.070", "1.080", "1.083", "1.106","1.107",
      [1, "1.801", "11.002", "11.122", "14.01"], "1.101", "1.102",
      [1, "1.064", "1.071", "1.072", "1.085", "1.089", "5.60"]
    ]
  },

  m1_ENG: {
    name: "1-ENG -- Civil and Environmental Degree (as of Sep '17)",
    reqs: [0,
      [1, "1.00", "1.000"], "1.010", "1.013", [1, "1.073", "1.074"], "18.03",
      [
        {
          count: 54,
          type: "total_units",
          desc: "units from",
          special: 1,
          runinfull: 1
        },
        {id: "Environment Core:", skip: 1},
        [
          {count: 9, globalMatchesIgnore: 1},
          "1.060A", "1.070A", "1.080A", "1.061A", "1.018A", "1.089A", "1.092",
          "1.106", "1.107"
        ],
        {id: "Mechanics/Materials Core:", skip: 1},
        [
          {count: 6, globalMatchesIgnore: 1},
          "1.050", "1.035", "1.036", "1.060A", "1.101", "1.102"
        ],
        {id: "Systems Core:", skip: 1},
        [
          {count: 6, globalMatchesIgnore: 1},
          "1.011", "1.020", "1.022", "1.041", "1.075", "1.101", "1.102"
        ]
      ],
      {id: "Restricted Electives:", skip: 1},
      [4,
        "1.015", "1.032", "1.054", "1.153",
        {
          id: "4 subjects offered within or outside CEE forming a coherent " +
          "program of study",
          skip: 1
        }
      ]
    ]
  },

  m2: {
    name: "2 -- Mechanical Engineering (as of Aug '16)",
    reqs: [0,
      "2.001", "2.002",
      [1, "2.003", [2, "2.03", "2.031"]], "2.004",
      [1, "2.005", [3, "2.05", "2.051", "2.06"]], "2.006", "2.008",
      [1,
        "2.009",
        {
          id: "2.013",
          desc: " (with petition)"
        },
        {
          id: "2.750",
          desc: " (with petition)"
        },
        {
          id: "2.760",
          desc: " (with petition)"
        }
      ],
      "2.086", "2.670", "2.671",
      [1,
        "18.03", "18.034",
        [2,
          "2.087",
          {
            id: "6 units of math or science (not engineering or humanities)",
            skip: 1
          }
        ]
      ],
      [1,
        "2.THU",
        {
          id: "2.014",
          desc: " (with petition)"
        },
        {
          id: "2.752",
          desc: " (with petition)"
        }
      ],
      [1, "2.007", "2.017"],
      {id: "Restricted Electives:", skip: 1},
      [2,
        "2.016", "2.017", "2.019", "2.050", "2.092", "2.12", "2.14", "2.184",
        "2.370", "2.51", "2.60", "2.650", "2.71", "2.72", "2.797", "2.813",
        "2.96",
        [2,
          "2.674",
          {id: "A letter-graded engineering subject of 6+ units", skip: 1}
        ],
        {
          id: "Another graduate-level class (with petition). "+
              "See the GAMED book for more details.",
          skip: 1
        }
      ]
    ]
  },

  m2_A_new: {
    name: "2A -- Engineering (as of Aug '16)",
    reqs: [0,
      [1, "2.00", "2.00A", "2.00B", "2.007"],
      "2.678", "2.086",
      [1, "2.087", "18.03", "18.034"],
      "2.001",
      [1, "2.03", "2.003"],
      [1, "2.04A", "2.04B", "2.004"],
      [1, "2.05", "2.005"],
      [1, [2, "2.051", "2.06"], "2.006"], "2.671",
      [1,
        "2.009",
        {
          id: "2.013",
          desc: " (with petition)"
        },
        {
          id: "2.750",
          desc: " (with petition)"
        },
        {
          id: "2.760",
          desc: " (with petition)"
        }
      ],
      {
        id: "72 units forming a 2A Concentration, plus proposal "+
            "<a href=\"https://meche-res.mit.edu/resources/new2A/\" "+
            "target=\"_blank\">(click here)</a>.",
        skip: 1
      }
    ]
  },

  m2_OE: {
    name: "2-OE -- Ocean Engineering (as of Aug '16)",
    reqs: [0,
      "2.001", "2.002",
      [1, "2.003", [2, "2.03", "2.031"]],
      "2.004",
      [1, "2.005", [3, "2.05", "2.051", "2.06"]],
      "2.016", "2.017", "2.019", "2.086", "2.612",
      "2.670", "2.671",
      [1,
        "18.03", "18.034",
        [2,
          "2.087",
          {
            id: "6 units of math or science (not engineering or humanities)",
            skip: 1
          }
        ]
      ],
      "2.065",
      [1,
        "2.006", "2.007", "2.008", "2.092", "2.12", "2.14", "2.51",
        "2.60", "2.700", "2.72", "2.96", "2.THU",
        {
          id: "Another graduate-level class (with petition). "+
              "See the GAMED book for more details.",
          skip: 1
        }
      ]
    ]
  },

  m3: {
    name: "3 -- Materials Science and Engineering (as of May '15)",
    reqs: [0,
      [
        {
          count: 2,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1
        },
        "3.014", "3.042", "3.155"
      ],
      "3.012", "3.014",
      [1, "18.03", "18.034", "3.016"],
      [1, "3.021", "1.00", "6.01", "3.016"],
      "3.022", "3.024", "3.032", "3.034", "3.042", "3.044",
      [1, "3.THU", [2, "3.930", "3.931"]],
      [
        {
          count: 48,
          type: "total_units",
          desc: "units from Restricted Electives",
          special: 1
        },
        "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053",
        "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074",
        "3.080", "3.086", "3.14", "3.15", "3.152", "3.153", "3.154", "3.155",
        "3.156", "3.19"
      ]
    ]
  },

  m3_A: {
    name: "3A -- Materials Science and Engineering (as of May '15)",
    reqs: [0,
      [5,
        "3.012",
        [1, "3.016", "18.03", "18.034"],
        [1, "3.021", "1.00", "6.01"],
        "3.022", "3.024", "3.032", "3.034", "3.042", "3.044"
      ],
      "3.014",
      [3,
        "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053",
        "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074",
        "3.080", "3.14", "3.15", "3.153", "3.155"
      ],
      {
        id: "6 Planned electives appropriate to the student's stated goals",
        skip: 1
      }
    ]
  },

  m3_C: {
    name: "3C -- Archaeology and Materials (as of May '15)",
    reqs: [0,
      "3.012", "3.014", [1, "3.016", "18.03", "18.034"],
      [1, "3.021", "1.00", "6.01"], "3.022", [1, "3.032", "3.044"], "3.THU",
      "3.985", "3.986", "3.987", "3.990", "12.001", [1, "12.110", "12.119"],
      "21A.100", [1, "3.07", "3.14", "3.051", "3.052"],
      [1, "3.982", "3.983", "3.984", "3.988"]
    ]
  },

  m4_archdesign: {
    name: "4 -- Architecture (Architectural Design) (as of May '15)",
    reqs: [0,
      [1, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500",
      "4.113", "4.114", "4.115", "4.440", "4.603", "4.605",
      [1,
        "4.116",
        {
          id: "2 Classes from other streams",
          skip: 1
        }
      ]
    ]
  },

  m4_buildingtech: {
    name: "4 -- Architecture (Building Technology) (as of May '15)",
    reqs: [0,
      [1, "4.111", "4.11A"], "4.112", "4.302", "4.401",
      "4.500", "4.411", "4.440", "4.605", "4.THT", "4.THU",
      {
        id: "4 Classes in Building Tech",
        skip: 1
      },
      {
        id: "1 Class from the other streams",
        skip: 1
      }
    ]
  },

  m4_computation: {
    name: "4 -- Architecture (Computation) (as of May '15)",
    reqs: [0,
      [1, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500",
      "4.501", "4.503", "4.504", "4.505", "4.605", "4.THT", "4.THU",
      {
        id: "1 Class in Computation",
        skip: 1
      }
    ]
  },

  m4_history: {
    name: "4 -- Architecture (History, Theory, and Criticism) (as of May '15)",
    reqs: [0,
      [1, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500",
      "4.601", "4.605", [1, "4.602", "4.641", "4.651"],
      [1, "4.613", "4.614"], "4.THT", "4.THU",
      {
        id: "3 Classes in History, Theory and Criticism",
        skip: 1
      },
      {
        id: "1 Class from Art, Culture and Technology",
        skip: 1
      }
    ]
  },

  m4_artculture: {
    name: "4 -- Architecture (Art, Culture, and Technology) (as of May '15)",
    reqs: [0,
      [1, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500",
      "4.322", "4.341", "4.351", "4.601", "4.THT", "4.THU",
      {
        id: "3 Classes in Art, Culture and Technology",
        skip: 1
      },
      {
        id: "1 Class from History, Theory and Criticism",
        skip: 1
      }
    ]
  },

  m4_new: {
    name: "4 -- Architecture (as of Aug '16)",
    reqs: [0,
      [1, "4.021", "4.02A"],
      "4.022", "4.023", "4.024", "4.302", "4.401", "4.440", "4.500",
      [1, "4.501", "4.503"],
      "4.603",
      [1, "4.605", "4.614", "4.635"],
      [1, "4.025",
        [
          {
            count: 2,
            desc: "Restricted Electives"
          },
          {id: "Art, Culture and Technology:", skip: 1},
          "4.307", "4.322", "4.341", "4.354", "4.368",
          {id: "Building Technology:", skip: 1},
          "4.411", "4.42", "4.432", "4.444",
          {id: "Computation:", skip: 1},
          "4.504", "4.520", "4.522",
          {id: "History and Theory of Architecture", skip: 1},
          "4.601", "4.602", "4.651"
        ]
      ]
    ]
  },

  m5: {
    name: "5 -- Chemistry (as of May '15)",
    reqs: [0,
      "5.03", "5.07", [1, "5.111", "5.112"], "5.12", "5.13", "5.35", "5.36",
      "5.37", "5.38",
      {
        id: "Note: CourseRoad doesn't currently recognize the 5.35-38 module " +
            "behavior. Try using 0-unit custom classes to mark where the " +
            "modules <em>should</em> be.",
        skip: 1
      },
      "5.60", "5.61", [2, "5.04", "5.08", "5.43", "5.62"]
    ]
  },

  m6_1: {
    name: "6-1 -- Electrical Science and Engineering (Old) (as of Sep '15)",
    disable: 1,
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      "6.01",
      [1, "6.S04", "6.02", "6.03"],
      [1,
        [2, "6.UAT", "6.UAP"],
        {id: "6.UAR", desc: " (w/ SuperUROP)"}
      ],
      [1, "6.041", "18.440", "18.600"],
      [1, "18.03", "18.034", "18.06", "18.700"],
      [
        {count: 1, desc: "(departmental lab) from"},
        "6.035",
        [2,
          {
            id: "6.021",
            globalMatchesSkip: 1
          }, "6.022"
        ],
        "6.035", "6.101", "6.111", "6.115", "6.123", "6.129", "6.131", "6.141",
        "6.142", "6.152", "6.161", "6.163", "6.170", "6.172", "6.173", "6.175",
        "6.182", "6.813", "6.828"
      ],
      [
        {count: 3, desc: "(EE foundation subjects) from"},
        "6.002", "6.003", "6.004", "6.007"
      ],
      [
        {
          count: 3,
          desc: "(EE header subjects) from",
          globalMatchesSkip: 1
        },
        "6.011", "6.012", "6.013", "6.021"
      ],
      [
        {
          count: 2,
          desc: "from the Advanced Undergraduate Subjects (AUS)"
        },
        "6.022", "6.023", "6.025", "6.035", "6.036", "6.045", "6.047", "6.049",
        "6.061", "6.101", "6.111", "6.115", "6.131", "6.141", "6.170", "6.172",
        "6.207", "6.301", "6.302", "6.502", "6.503", "6.602", "6.701", "6.717",
        "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.835", "6.837", "6.857", "6.905", "16.36",
        "21M.359", "6.241", "6.251", "6.255", "6.262", "6.267", "6.334",
        "6.336", "6.341", "6.344", "6.345", "6.374", "6.375", "6.376", "6.436",
        "6.437", "6.438", "6.450", "6.453", "6.521", "6.522", "6.551", "6.555",
        "6.561", "6.631", "6.632", "6.634", "6.641", "6.685", "6.720", "6.728",
        "6.730", "6.774", "6.775", "6.777", "6.820", "6.823", "6.824", "6.828",
        "6.829", "6.830", "6.831", "6.832", "6.839", "6.840", "6.845", "6.850",
        "6.852", "6.854", "6.856", "6.857", "6.858", "6.863", "6.864", "6.866",
        "6.867", "6.869", "6.874", "6.875",
        {id: "6.S193", desc: " (Fall 2012 Only)"},
        {id: "6.S196", desc: " (Fall 2012 Only)"},
        {id: "6.S898", desc: " (Fall 2012 Only)"},
        {id: "6.S063", desc: " (Spring 2013 Only)"},
        {id: "6.S077", desc: " (Spring 2013 Only)"},
        {id: "6.S080", desc: " (Spring 2013 Only)"},
        {id: "6.S079", desc: " (Spring 2014/2015 Only)"},
        {id: "6.S081", desc: " (Spring 2014 Only)"},
        {id: "6.036", desc: " (Spring 2014 Only)"},
        {id: "6.885", desc: " (Spring 2015 Only)"},
        {id: "6.S083", desc: " (Fall 2015 Only)"}
      ],
      [
        {
          count: 1,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.101", "6.111", "6.115", "6.129", "6.131", "6.141", "6.152",
        "6.161", "6.163", "6.182", "6.021", "6.025", "6.805"
      ],
      [
        {
          count: 1,
          desc: "(also for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.UAR",
        [{count: 2, globalMatchesIgnore: 1}, "6.UAT", "6.UAP"],
        [
          {count: 2, globalMatchesIgnore: 1},
          "6.UAT",
          [
            {count: 1, globalMatchesIgnore: 1},
            "6.101", "6.111", "6.115", "6.129", "6.131", "6.141", "6.152",
            "6.161", "6.163", "6.182", "6.021", "6.025", "6.805"
          ]
        ]
      ]
    ]
  },

  m6_1_new: {
    name: "6-1 -- Electrical Science and Engineering (as of Aug '16)",
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      {
        id: "If switching from the old curriculum, certain substitutions " +
            "can be made. Check the description of the new curriculum " +
            "on the EECS website and 6.AcAd on Piazza.",
        skip: 1
      },
      [1, [2, [1, "6.01", "6.S08"],
              {id: "Programming add-on (subject number pending)", skip: 1}],
          [2, "6.0001", [1, "6.01", "6.02", "6.03", "6.S08"]]
      ],
      [1, "6.UAT", "6.UAR"],
      [1, "18.03", "2.087"],
      [
        {count: 3, desc: "EE foundation subjects"},
        "6.002", "6.003", [1, "6.004", "6.007"]
      ],
      [
        {
          count: 3,
          desc: "EE header subjects",
          globalMatchesSkip: 1
        },
        "6.011", "6.012", "6.013", "6.021", "6.036"
      ],
      [
        {
          count: 2,
          desc: "Advanced Undergraduate Subjects (AUS2)"
        },
        "6.023", "6.025", "6.035", "6.047", "6.061", "6.101", "6.111", "6.115",
        "6.131", "6.1311", "6.172", "6.175", "6.301", "6.302", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      [
        {
          count: 2,
          desc: "from any EECS course that satisfies a departmental requirement"
        },
        "6.01", "6.02", "6.03", "6.S08", "6.002", "6.003", "6.004", "6.006",
        "6.007", "6.008", "6.009", "6.011", "6.012", "6.013", "6.031", "6.033",
        "6.034", "6.036", "6.045", "6.046", "6.022", "6.023", "6.024", "6.025",
        "6.035", [2, "6.041A", "6.041B"], "6.042J", "6.047", "6.049", "6.061",
        "6.073", "6.101", "6.111", "6.115", "6.1151", "6.129", "6.131",
        "6.1311", "6.141", "6.152", "6.161", "6.163", "6.170", "6.172", "6.175",
        "6.182", "6.207", "6.301", "6.302", "6.503", "6.580", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.807",
        "6.809J", "6.811", "6.813", "6.814", "6.815", "6.816", "6.819", "6.835",
        "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      {id: "Requirements below can be double counted", skip: 1},
      [
        {
          count: 1,
          desc: "advanced departmental lab (DLAB2)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.025", "6.035", "6.047", "6.073", "6.101", "6.111", "6.115", "6.1151",
        "6.129", "6.131", "6.1311", "6.141", "6.152", "6.161", "6.163", "6.170",
        "6.172", "6.175", "6.182", "6.302", "6.804", "6.806", "6.809", "6.813",
        "6.816", "6.819", "6.837"
      ],
      [
        {
          count: 1,
          desc: "independent inquiry (II)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.035", "6.047", "6.100", "6.111", "6.1151", "6.129", "6.1311",
        "6.141", "6.161", "6.163", "6.170", "6.172", "6.182", "6.805", "6.806",
        "6.809", "6.811", "6.819", "6.905"
      ],
      [
        {
          count: 1,
          desc: "for probability grounding (PROB)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.008", "6.041A", "6.042", "18.05", "18.600"
      ],
      [
        {
          count: 1,
          desc: "for CI-M",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.025", "6.033", "6.101", "6.115", "6.1151", "6.129", "6.131",
        "6.1311", "6.141", "6.152", "6.161", "6.163", "6.182", "6.805"
      ],
    ]
  },

  m6_2: {
    name: "6-2 -- Electrical Engineering and Computer Science (Old) (as of Sep '15)",
    disable: 1,
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      "6.01",
      [1, "6.S04", "6.02", "6.03"],
      [1,
        [2, "6.UAT", "6.UAP"],
        {id: "6.UAR", desc: " (w/ SuperUROP)"}
      ],
      [1, "6.041", "6.042", "18.440", "18.600"],
      [1, "18.03", "18.034", "18.06", "18.700"],
      [
        {count: 1, desc: "(departmental lab) from"},
        "6.035",
        [2,
          {
            id: "6.021",
            globalMatchesSkip: 1
          }, "6.022"
        ],
        "6.035", "6.101", "6.111", "6.115", "6.123", "6.129", "6.131", "6.141",
        "6.142", "6.152", "6.161", "6.163", "6.170", "6.172", "6.173", "6.175",
        "6.182", "6.813", "6.828"
      ],
      [
        {count: 2, desc: "(EE foundation subjects) from"},
        "6.002", "6.007", "6.003", "6.004"
      ],
      [
        {count: 2, desc: "(CS foundation subjects) from"},
        "6.005", "6.006", "6.004"
      ],
      {id: "EECS header subjects:", skip: 1},
      [1, "6.011", "6.012", "6.013", "6.021"],
      [1, "6.034", "6.046", "6.033", "6.036", "6.045"],
      [1,
        "6.011", "6.012", "6.013", "6.021",
        "6.034", "6.046", "6.033", "6.036", "6.045"
      ],
      [
        {
          count: 2,
          desc: "from the Advanced Undergraduate Subjects (AUS)"
        },
        "6.022", "6.023", "6.025", "6.035", "6.036", "6.045", "6.047", "6.049",
        "6.061", "6.101", "6.111", "6.115", "6.131", "6.141", "6.170", "6.172",
        "6.207", "6.301", "6.302", "6.502", "6.503", "6.602", "6.701", "6.717",
        "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.835", "6.837", "6.857", "6.905", "16.36",
        "21M.359", "6.241", "6.251", "6.255", "6.262", "6.267", "6.334",
        "6.336", "6.341", "6.344", "6.345", "6.374", "6.375", "6.376", "6.436",
        "6.437", "6.438", "6.450", "6.453", "6.521", "6.522", "6.551", "6.555",
        "6.561", "6.631", "6.632", "6.634", "6.641", "6.685", "6.720", "6.728",
        "6.730", "6.774", "6.775", "6.777", "6.820", "6.823", "6.824", "6.828",
        "6.829", "6.830", "6.831", "6.832", "6.839", "6.840", "6.845", "6.850",
        "6.852", "6.854", "6.856", "6.857", "6.858", "6.863", "6.864", "6.866",
        "6.867", "6.869", "6.874", "6.875",
        {id: "6.S193", desc: " (Fall 2012 Only)"},
        {id: "6.S196", desc: " (Fall 2012 Only)"},
        {id: "6.S898", desc: " (Fall 2012 Only)"},
        {id: "6.S063", desc: " (Spring 2013 Only)"},
        {id: "6.S077", desc: " (Spring 2013 Only)"},
        {id: "6.S080", desc: " (Spring 2013 Only)"},
        {id: "6.S079", desc: " (Spring 2014/2015 Only)"},
        {id: "6.S081", desc: " (Spring 2014 Only)"},
        {id: "6.036", desc: " (Spring 2014 Only)"},
        {id: "6.885", desc: " (Spring 2015 Only)"},
        {id: "6.S083", desc: " (Fall 2015 Only)"}
      ],
      [
        {
          count: 1,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.101", "6.111", "6.115", "6.129", "6.131", "6.141", "6.152",
        "6.161", "6.163", "6.182", "6.021", "6.025", "6.033", "6.805"
      ],
      [
        {
          count: 1,
          desc: "(also for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.UAR",
        [{count: 2, globalMatchesIgnore: 1}, "6.UAT", "6.UAP"],
        [
          {count: 2, globalMatchesIgnore: 1},
          "6.UAT",
          [
            {count: 1, globalMatchesIgnore: 1},
            "6.101", "6.111", "6.115", "6.129", "6.131", "6.141", "6.152",
            "6.161", "6.163", "6.182", "6.021", "6.025", "6.033", "6.805"
          ]
        ]
      ]
    ]
  },

  m6_2_new: {
    name: "6-2 -- Electrical Engineering and Computer Science (as of Aug '16)",
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      {
        id: "If switching from the old curriculum, certain substitutions " +
            "can be made. Check the description of the new curriculum " +
            "on the EECS website and 6.AcAd on Piazza.",
        skip: 1
      },
      [1, [2, "6.0001",
              [ {count:1, globalMatchesIgnore:1},
                "6.01", "6.02", "6.03", "6.S08"] ]
          [2, [ {count:1, globalMatchesIgnore:1},
                "6.01", "6.S08"],
              {id: "Programming add-on (subject number pending)", skip: 1}],
      ],
      [1, "6.UAT", "6.UAR"],
      [1, "18.03", "2.087"],
      [
        {count: 3, desc: "EECS foundation subjects"},
        "6.002", "6.003", "6.004", "6.006", "6.007", "6.008", "6.009"
      ],
      [
        {
          count: 3,
          desc: "EECS header subjects",
          globalMatchesSkip: 1
        },
        "6.011", "6.012", "6.013", "6.021", "6.031", "6.033", "6.034", "6.036",
        "6.045", "6.046"
      ],
      [
        {
          count: 2,
          desc: "Advanced Undergraduate Subjects (AUS2)"
        },
        "6.023", "6.025", "6.035", "6.047", "6.061", "6.101", "6.111", "6.115",
        "6.131", "6.1311", "6.172", "6.175", "6.301", "6.302", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      [
        {
          count: 2,
          desc: "from any EECS course that satisfies a departmental requirement"
        },
        "6.01", "6.02", "6.03", "6.S08", "6.002", "6.003", "6.004", "6.006",
        "6.007", "6.008", "6.009", "6.011", "6.012", "6.013", "6.031", "6.033",
        "6.034", "6.036", "6.045", "6.046", "6.022", "6.023", "6.024", "6.025",
        "6.035", [2, "6.041A", "6.041B"], "6.042J", "6.047", "6.049", "6.061",
        "6.073", "6.101", "6.111", "6.115", "6.1151", "6.129", "6.131",
        "6.1311", "6.141", "6.152", "6.161", "6.163", "6.170", "6.172", "6.175",
        "6.182", "6.207", "6.301", "6.302", "6.503", "6.580", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.807",
        "6.809J", "6.811", "6.813", "6.814", "6.815", "6.816", "6.819", "6.835",
        "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      {id: "Requirements below can be double counted", skip: 1},
      [
        {
          count: 1,
          desc: "advanced departmental lab (DLAB2)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.025", "6.035", "6.047", "6.073", "6.101", "6.111", "6.115", "6.1151",
        "6.129", "6.131", "6.1311", "6.141", "6.152", "6.161", "6.163", "6.170",
        "6.172", "6.175", "6.182", "6.302", "6.804", "6.806", "6.809", "6.813",
        "6.816", "6.819", "6.837"
      ],
      [
        {
          count: 1,
          desc: "independent inquiry (II)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.035", "6.047", "6.100", "6.111", "6.1151", "6.129", "6.1311",
        "6.141", "6.161", "6.163", "6.170", "6.172", "6.182", "6.805", "6.806",
        "6.809", "6.811", "6.819", "6.905"
      ],
      [
        {
          count: 2,
          desc: "EE foundations/headers (EE12)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.002", "6.003", "6.007", "6.011", "6.012", "6.013", "6.021"
      ],
      [
        {
          count: 2,
          desc: "CS foundations/headers (CS12)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.006", "6.009", "6.031", "6.033", "6.034", "6.045", "6.046"
      ],
      [
        {
          count: 1,
          desc: "EECS foundation/header (EECS12)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.004", "6.008", "6.036"
      ],
      [
        {
          count: 1,
          desc: "for probability grounding (PROB)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.008", "6.041A", "6.042", "18.05", "18.600"
      ],
      [
        {
          count: 1,
          desc: "for CI-M",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.025", "6.033", "6.101", "6.115", "6.1151", "6.129", "6.131",
        "6.1311", "6.141", "6.152", "6.161", "6.163", "6.182", "6.805"
      ],
    ]
  },

  m6_3: {
    name: "6-3 -- Computer Science and Engineering (Old) (as of Sep '15)",
    disable: 1,
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      "6.01",
      [1, "6.S04", "6.02", "6.03"],
      [1,
        [2, "6.UAT", "6.UAP"],
        {id: "6.UAR", desc: " (w/ SuperUROP)"}
      ],
      [1, "6.042", "6.008"],
      [1, "18.03", "18.034", "18.06", "18.700"],
      [
        {count: 1, desc: "(departmental lab) from"},
        "6.035", "6.141", "6.170", "6.172", "6.173", "6.175", "6.813", "6.828"
      ],
      [
        {count: 3, desc: "(CS foundation subjects) from"},
        "6.004", "6.005", "6.006"
      ],
      [
        {
          count: 3,
          desc: "(CS header subjects) from",
          globalMatchesSkip: 1
        },
        "6.033", [1, "6.034", "6.036"], [1, "6.045", "6.046"]
      ],
      [
        {
          count: 2,
          desc: "from the Advanced Undergraduate Subjects (AUS)"
        },
        "6.022", "6.023", "6.025", "6.035", "6.036", "6.045", "6.047", "6.049",
        "6.061", "6.101", "6.111", "6.115", "6.131", "6.141", "6.170", "6.172",
        "6.207", "6.301", "6.302", "6.502", "6.503", "6.602", "6.701", "6.717",
        "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.835", "6.837", "6.857", "6.905", "16.36",
        "21M.359", "6.241", "6.251", "6.255", "6.262", "6.267", "6.334",
        "6.336", "6.341", "6.344", "6.345", "6.374", "6.375", "6.376", "6.436",
        "6.437", "6.438", "6.450", "6.453", "6.521", "6.522", "6.551", "6.555",
        "6.561", "6.631", "6.632", "6.634", "6.641", "6.685", "6.720", "6.728",
        "6.730", "6.774", "6.775", "6.777", "6.820", "6.823", "6.824", "6.828",
        "6.829", "6.830", "6.831", "6.832", "6.839", "6.840", "6.845", "6.850",
        "6.852", "6.854", "6.856", "6.857", "6.858", "6.863", "6.864", "6.866",
        "6.867", "6.869", "6.874", "6.875",
        {id: "6.S193", desc: " (Fall 2012 Only)"},
        {id: "6.S196", desc: " (Fall 2012 Only)"},
        {id: "6.S898", desc: " (Fall 2012 Only)"},
        {id: "6.S063", desc: " (Spring 2013 Only)"},
        {id: "6.S077", desc: " (Spring 2013 Only)"},
        {id: "6.S080", desc: " (Spring 2013 Only)"},
        {id: "6.S079", desc: " (Spring 2014/2015 Only)"},
        {id: "6.S081", desc: " (Spring 2014 Only)"},
        {id: "6.036", desc: " (Spring 2014 Only)"},
        {id: "6.885", desc: " (Spring 2015 Only)"},
        {id: "6.S083", desc: " (Fall 2015 Only)"}
      ],
      [
        {
          count: 1,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.141", "6.021", "6.025", "6.033", "6.101", "6.111", "6.115", "6.129",
        "6.131", "6.152", "6.161", "6.163", "6.182", "6.805"
      ],
      [
        {
          count: 1,
          desc: "(also for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.UAR",
        [{count: 2, globalMatchesIgnore: 1}, "6.UAT", "6.UAP"],
        [{count: 2, globalMatchesIgnore: 1}, "6.UAT", "6.141"]
      ]
    ]
  },

  m6_3_new: {
    name: "6-3 -- Computer Science and Engineering (as of Aug '16)",
    reqs: [0,
      {
        id: "Note: CourseRoad pulls information from the catalog and the " +
            "Course VI website, but the Course VI requirements change " +
            "frequently. For the most up-to-date listings please refer to " +
            "the Course VI checklist.",
        skip: 1
      },
      {
        id: "If switching from the old curriculum, certain substitutions " +
            "can be made. Check the description of the new curriculum " +
            "on the EECS website and 6.AcAd on Piazza.",
        skip: 1
      },
      [1, [2, [1, "6.01", "6.S08"],
              {id: "Programming add-on (subject number pending)", skip: 1}],
          [2, "6.0001", [1, "6.01", "6.02", "6.03", "6.S08"]]
      ],
      [1, "6.UAT", "6.UAR"],
      "6.042",
      [
        {count: 3, desc: "CS foundation subjects"},
        "6.004", "6.006", "6.009"
      ],
      [
        {
          count: 4,
          desc: "CS header subjects",
          globalMatchesSkip: 1
        },
        "6.031", "6.033", [1, "6.034", "6.036"], [1, "6.045", "6.046"]
      ],
      [
        {
          count: 2,
          desc: "Advanced Undergraduate Subjects (AUS2)"
        },
        "6.023", "6.025", "6.035", "6.047", "6.061", "6.101", "6.111", "6.115",
        "6.131", "6.1311", "6.172", "6.175", "6.301", "6.302", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.806", "6.813", "6.814",
        "6.815", "6.816", "6.819", "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      [
        {
          count: 1,
          desc: "from any EECS course that satisfies a departmental requirement"
        },
        "6.01", "6.02", "6.03", "6.S08", "6.002", "6.003", "6.004", "6.006",
        "6.007", "6.008", "6.009", "6.011", "6.012", "6.013", "6.031", "6.033",
        "6.034", "6.036", "6.045", "6.046", "6.022", "6.023", "6.024", "6.025",
        "6.035", [2, "6.041A", "6.041B"], "6.042J", "6.047", "6.049", "6.061",
        "6.073", "6.101", "6.111", "6.115", "6.1151", "6.129", "6.131",
        "6.1311", "6.141", "6.152", "6.161", "6.163", "6.170", "6.172", "6.175",
        "6.182", "6.207", "6.301", "6.302", "6.503", "6.580", "6.602", "6.701",
        "6.717", "6.801", "6.802", "6.803", "6.804", "6.805", "6.806", "6.807",
        "6.809J", "6.811", "6.813", "6.814", "6.815", "6.816", "6.819", "6.835",
        "6.837", "6.905",
        {id: "Graduate courses (by petition)", skip: 1}
      ],
      {id: "Requirements below can be double counted", skip: 1},
      [
        {
          count: 1,
          desc: "independent inquiry (II)",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.035", "6.047", "6.100", "6.111", "6.1151", "6.129", "6.1311",
        "6.141", "6.161", "6.163", "6.170", "6.172", "6.182", "6.805", "6.806",
        "6.809", "6.811", "6.819", "6.905"
      ],
    ]
  },

  m6_7: {
    name: "6-7 -- Computer Science and Molecular Biology (Old) (as of Sep '15)",
    disable: 1,
    reqs: [0,
      "6.01",
      "6.042",
      [1, "18.03", "18.034", "18.06"],
      "5.12",
      [1, "5.60", "7.10", "20.110"],
      [1, "7.02", "20.109"],
      {id: "Computer Science subjects:", skip: 1},
      "6.005", "6.006", "6.046",
      {id: "Biological Science subjects:", skip: 1},
      "7.03", "7.06",
      [1, "7.05", "5.07"],
      {id: "Restricted Electives:", skip: 1},
      [1, "6.047", "6.503", "7.36"],
      [1, "7.20", "7.23", "7.27", "7.28", "7.33"],
      [1,
        [2, "6.UAT", "6.UAP"],
        "6.UAR"
      ],
      [
        {
          count: 1,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "7.02", "20.109"
      ],
      [
        {
          count: 1,
          desc: "(also for CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "6.UAR",
        [2, "6.UAT", "6.UAP"],
        [2,
          "6.UAT",
          [1,
            "6.101", "6.111", "6.115", "6.129", "6.131", "6.141", "6.152",
            "6.161", "6.163", "6.182"
          ]
        ]
      ]
    ]
  },

  m6_7_new: {
    name: "6-7 -- Computer Science and Molecular Biology (as of Aug '16)",
    reqs: [0,
      "6.009",
      [1, "6.00", "6.031"],
      "6.042", "5.12",
      [1, "5.60", "20.110"],
      [1, "7.02", "20.109"],
      "6.006", "6.046", "7.03", "7.05", "7.06",
      [1, "6.047", "6.503", "7.36"],
      [1,
        "7.08", "7.20", "7.21", "7.22", "7.23",
        "7.26", "7.27", "7.28", "7.29",
        [2, "7.30A", "7.30B"],
        "7.31", "7.32", "7.33", "7.371", "7.38",
        "7.41", "7.45", "7.49"
      ],
      [1, "6.UAT", "6.UAR"]
    ]
  },

  m7: {
    name: "7 -- Biology (as of May '15)",
    reqs: [0,
    [1, "5.111", "5.112", "3.091"],
      "5.12", [1, "20.110", "7.10", "5.60"],
    [1, "7.012", "7.013", "7.014", "7.015", "7.016"],
      [1, "7.02", "20.109"], "7.03", [1, "7.05", "5.07"], "7.06",
    [
      {
        count: 3,
        desc: "Restricted Electives"
      },
      "7.08", "7.20", "7.21", "7.22", "7.23", "7.24", "7.26", "7.27", "7.28",
      "7.29", [2, "7.30A", "7.30B"], "7.31", "7.32", "7.33", "7.36", "7.37",
      "7.38", "7.49"
      ],
      [1, "7.15", "7.16", "7.18"]
    ]
  },

  m7a: {
    name: "7A -- Biology (as of May '15)",
    reqs: [0,
      [1, "5.111", "5.112", "3.091"],
      [1, "20.110", "7.10", "5.60"],
      [1, "7.012", "7.013", "7.014"],
      [1, "7.02", "20.109"], "7.03", [1, "5.07", "7.05"], "7.06",
      [3,
        "7.08", "7.20", "7.21", "7.22", "7.23", "7.25", "7.26", "7.27", "7.28",
        "7.29", "7.30", "7.31", "7.32", "7.33", "7.35", "7.36", "7.37", "7.41",
        "7.49"
      ],
      [1,
        "3.014", "5.36", "5.38",
        {
          id: "Note: CourseRoad doesn't currently recognize the 5.35-38 " +
              "module behavior. Try using 0-unit custom classes to mark " +
              "where the modules <em>should</em> be.",
          skip: 1
        },
        "7.19", "7.30", "7.49", "8.13", "9.02", "9.12", "10.26", "10.27",
        "10.28", "10.29", "20.380", "6.021"
      ]
    ]
  },

  m8_flexible: {
    name: "8 -- Physics (Flexible) (as of Jun '15)",
    reqs: [0,
      "8.03", [1, "18.03", "18.034"], "8.04", "8.044", [1, "8.21", "8.223"],
      [1, "8.05", "8.20", "8.033"],
      [1, "8.13",
        {
          id: "8.THU",
          desc: "*"
        },
        {
          id: "another lab",
          desc: "*",
          skip: 1
        },
        {
          id: "an experimentally oriented summer internship",
          desc: "*",
          skip: 1
        },
        {
          id: "* = (plus permission of department)",
          skip: 1
        }
      ],
      [1,
        {
          id: "8.03-999",
          range: 1,
          matchRegex: /^8\../,
          excludeRegex: /^8\.0[0-2]/
      }],
      {
        id: "3 other subjects forming a coherent unit in some area " +
            "(plus permission of department)",
        skip: 1
      },
      [
        {
          count: 2,
          desc: "(CI-M) from",
          globalMatchesSkip: 1,
          globalMatchesIgnore: 1
        },
        "8.06", "8.13", "8.225", "8.226", "8.287"
      ]
    ]
  },

  m8_focused: {
    name: "8 -- Physics (Focused) (as of Jun '15)",
    reqs: [0,
      "8.03", [1, "18.03", "18.034"], "8.04", "8.044", "8.033",
      "8.05",
      {
        id: "8.06",
        desc: " (CI-M)"
      },
      {
        id: "8.13",
        desc: " (CI-M)"
      }, "8.14", "8.223", "8.THU", [1,
        {
          id: "18.04-999",
          range: 1,
          matchRegex: /^18\../,
          excludeRegex: /^18\.0[0-3]/
      }],
      [1, "8.07", "8.08", "8.09"],
      [1,
        {
          id: "8.03-999",
          range: 1,
          matchRegex: /^8\../,
          excludeRegex: /^8\.0[0-2]/
      }]
    ]
  },

  m9: {
    name: "9 -- Brain and Cognitive Sciences (as of Dec '15)",
    reqs: [0,
      [
        {count: 5, desc: "Tier 1 subjects"},
        [1,
          "6.00",
          [2, "6.0001", "6.0002"]
        ],
        "9.00", "9.01", "9.40",
        [1, "6.041", "9.07", "18.05", "18.440"]
      ],
      [
        {count: 3, desc: "Tier 2 subjects"},
        "9.04", "9.09", "9.10", "9.14", "9.15", "9.16", "9.18", "9.20", "9.31",
        "9.35", "9.54", "9.65", "9.66", "9.85"
      ],
      [{count: 1, desc: "Laboratory subject"}, "9.12", "9.17", "9.59", "9.63"],
      [
        {count: 1, desc: "Research subject"},
        "9.12", "9.17", "9.41", "9.50", "9.59", "9.63", "9.URG"
      ],
      [4,
        {id: "Tier 2 subjects:", skip: 1},
        "9.04", "9.09", "9.10", "9.14", "9.15", "9.16", "9.18", "9.20", "9.31",
        "9.35", "9.54", "9.65", "9.66", "9.85",
        {id: "Tier 3 subjects:", skip: 1},
        "9.24", "9.26", "9.46", "9.56", "9.57", "9.71",
        {id: "Restricted Electives:", skip: 1},
        "2.003", "2.184", "5.07", "5.12", "6.003", "6.034", "6.045", "6.801",
        "7.03", "7.05", "18.03", "18.034", "18.06", "18.404", "18.510",
        "18.511", "20.309", "24.211", "24.900", "24.901", "24.902", "24.903",
        {id: "Any graduate Course 9 subject (approval needed)", skip: 1}
      ]
    ]
  },

  m10: {
    name: "10 -- Chemical Engineering (as of Jun '15)",
    reqs: [0,
      "5.12", [1, "5.07", "7.05"], "5.310", "5.60", "10.10", "10.213",
      [1, "10.28", "10.26", "10.27", "10.29"],
      "10.301", "10.302", "10.32", "10.37", "10.490", "10.491",
      [2, "10.492", "10.493", [1, "10.494", "10.01"]],
      [1, "18.03", "18.034"],
      [1, "3.014", "5.36",
        {
          id: "Note: CourseRoad doesn't currently recognize the 5.35-38 " +
              "module behavior. Try using 0-unit custom classes to mark " +
              "where the modules <em>should</em> be.",
          skip: 1
      }, "6.152", "10.28", "10.467", "10.702", "10.26", "10.27", "10.29"],
      [1, [1,
          {
            id: "10.001-039",
            range: 1,
            matchRegex: /^10\.0[0-3]\d/
        }],
        [1,
          {
            id: "10.401-791",
            range: 1,
            matchRegex: /^10\.[4-7]\d\d/,
            excludeRegex: /^10\.(400|79[2-9])/
        }],
        [1,
          {
            id: "10.793-800",
            range: 1,
            matchRegex: /^10\.(79[3-9]|800)/
        }],
        [1,
          {
            id: "10.817-899",
            range: 1,
            matchRegex: /^10\.8(1[7-9]|[2-9]\d)/
        }]
      ]
    ]
  },

  m10_B: {
    name: "10B -- Chemical-Biological Engineering (as of May '15)",
    reqs: [0,
      "5.12", "5.60", [1, "7.02", "10.702"], "7.03", [1, "5.07", "7.05"],
      "7.06", "10.10", "10.213", [1, "10.28", "10.26", "10.27", "10.29"],
      "10.301", "10.302", "10.37", "10.490", "10.491",
      [2, "10.492", "10.493", [1, "10.494", "10.01"]],
      [1, "18.03", "18.034"]
    ]
  },

  m10_ENG: {
    name: "10-ENG -- Engineering (as of May '15)",
    reqs: [0,
      "5.12", [1, "18.03", "18.034"], "10.10", "10.213", "10.301", "10.302",
      "10.37", [1, "10.28", "10.26", "10.27", "10.29", "10.467"],
      [1, [2, "1.106", "1.107"], "2.671", "3.014", "5.310", "5.35",
        {
          id: "Note: CourseRoad doesn't currently recognize the 5.35-38 " +
              "module behavior. Try using 0-unit custom classes to mark " +
              "where the modules <em>should</em> be.",
          skip: 1
        }, "10.702", "12.335", "20.109"
      ],
      [1,
        "1.00", "1.018", "1.080", "3.012", "3.155", "5.12", "5.61", "6.00",
        "7.03", "8.21"
      ],
      {
        id: "4 Engineering concentration",
        skip: 1
      },
      [1,
        "10.THU",
        [
          {
            count: 12,
            type: "total_units",
            desc: "units from",
            special: 1
          },
          {
            id: "10.490-494",
            range: 1,
            matchRegex: /^10\.49[0-4]/
          }
        ],
        [2,
          "10.910",
          [1,
            {
              id: "10.492-494",
              range: 1,
              matchRegex: /^10\.49[234]/
            }
          ]
        ]
      ]
    ]
  },

  m10_C: {
    name: "10C -- Chemical Engineering (as of May '15)",
    reqs: [0,
      "5.60", "10.10", "10.213", "10.301", "10.302", "18.03",
      [1,
        "3.014", "6.152", "5.36", "10.702", "10.28", "10.26", "10.27", "10.29"
      ],
      [1,
        "6.021", "6.033", "6.111", "6.805", "14.05", "15.279", "15.301",
        "3.014", "6.152", "5.36", "10.702", "10.28", "10.26", "10.27", "10.29"
      ]
    ]
  },

  m11_enviro: {
    name: "11 -- Urban and Environmental Policy and Planning (as of May '15)",
    reqs: [0,
      "11.001", "11.002", "11.011", "11.123", "14.01", "11.188",
      [
        {
          count: 57,
          type: "total_units",
          desc: "units",
          special: 1
        },
        "11.003", "11.016", "11.021", "11.022", "11.161", "11.162", "11.165"
      ],
      "11.027", "11.THT", "11.THU"
    ]
  },

  m11_society: {
    name: "11 -- Urban Society, History, and Politics (as of May '15)",
    reqs: [0,
      "11.001", "11.002", "11.011", "11.123", "14.01", "11.188",
      [
        {
          count: 57,
          type: "total_units",
          desc: "units",
          special: 1
        },
        "11.013", "11.014", "11.015", "11.019", "11.026", "11.150", "11.152"
      ],
      "11.027", "11.THT", "11.THU"
    ]
  },

  m11_international: {
    name: "11 -- Urban and International Development (as of May '15)",
    reqs: [0,
      "11.001", "11.002", "11.011", "11.123", "14.01", "11.188",
      [
        {
            count: 57,
            type: "total_units",
            desc: "units",
            special: 1
        },
        "11.005", "11.025", "11.140", "11.144", "11.147", "11.164", "11.165",
        "11.166"
      ],
      "11.027", "11.THT", "11.THU"
    ]
  },

  m12: {
    name: "12 -- Earth, Atmospheric, and Planetary Sciences (as of Oct '15)",
    reqs: [0,
      "12.001", "12.002", "12.003", "12.009", [1, "18.03", "18.034"], "12.TIP",
      "12.THU",
      [1,
        [2, "12.115", "12.116"],
        [2, "12.221", "12.222"],
        "12.307", "12.335", "12.410"
      ],
      [
        {
          count: 60,
          type: "total_units",
          desc: "units from ",
          special: 1,
          pullmatches: 1
        },
        [
          {
            count: 24,
            type: "total_units",
            desc: "units (at least) from Discipline Science subjects",
            special: 1,
            runinfull: 1
          },
          "12.005", "12.006", "12.007", "12.008", "12.021", "12.086", "12.102",
          "12.104", "12.108", "12.109", "12.113", "12.114", "12.119", "12.120",
          "12.158", "12.163", "12.170", "12.201", "12.207", "12.213", "12.214",
          "12.301", "12.306", "12.310", "12.333", "12.336", "12.338", "12.385",
          "12.340", "12.348", "12.420", "12.425", "12.43", "12.431"
        ],
        [
          {
            count: 36,
            type: "total_units",
            desc: "units (at MAX) from Supporting Science subjects",
            special: 1
          },
          "1.00",
          [2, "1.060A", "1.060B"],
          "1.061",
          [2, "1.080A", "1.080B"],
          [1, "3.012", "5.60"],
          "5.03", "5.12", "5.61",
          [2, "6.0001", "6.0002"],
          "7.03", "7.05", "7.21", "8.03", "8.04", "8.044", "8.07", "8.09",
          "8.21", "12.010", "12.012",
          [2, "12.320A", "12.320B"],
          "18.04", "18.05", "18.06", "18.100", "18.300"
        ]
      ]
    ]
  },

  m14: {
    name: "14 -- Economics (Old) (as of May '15)",
    disable: 1,
    reqs: [0,
      "14.01", "14.02", "14.04", "14.05", "14.30", "14.32", "14.33", "14.THU",
      [
        {
          count: 60,
          type: "total_units",
          desc: "units from elective subjects in economics",
          special: 1
        },
        "14.06", "14.11", "14.12", "14.13", "14.15", "14.16", "14.19", "14.20",
        "14.21", "14.23", "14.26", "14.36", "14.41", "14.42", "14.43", "14.44",
        "14.45", "14.51", "14.54", "14.64", "14.70", "14.71", "14.72", "14.73",
        "14.74", "14.75"
      ]
    ]
  },

  m14_1: {
    name: "14-1 -- Economics (as of Aug '16)",
    reqs: [0,
      "14.01", "14.02",
      [1, "14.04", "14.12", "14.15", "14.16", "14.19", "14.26"],
      [1, "14.05", [2, "14.06", "14.18"]],
      "14.30", "14.32", "14.33",
      [
        {
          count: 60,
          type: "total_units",
          desc: "units from elective subjects",
          special: 1
        },
        "14.03",
        "14.06", "14.11", "14.12", "14.13", "14.15", "14.16", "14.19", "14.20",
        "14.21", "14.23", "14.26", "14.27", "14.36", "14.41", "14.42", "14.43",
        "14.44",
        "14.45", "14.51", "14.54", "14.64", "14.70", "14.71", "14.73",
        "14.74", "14.75"
      ],
      [1,
        {id: "Thesis", skip: 1},
        "14.03",
        "14.06", "14.11", "14.12", "14.13", "14.15", "14.16", "14.19", "14.20",
        "14.21", "14.23", "14.26", "14.27", "14.36", "14.41", "14.42", "14.43",
        "14.44",
        "14.45", "14.51", "14.54", "14.64", "14.70", "14.71", "14.73",
        "14.74", "14.75"
      ]
    ]
  },

  m14_2: {
    name: "14-2 -- Mathematical Economics (as of Aug '16)",
    reqs: [0,
      [1, "14.01", {id: "14.03", desc: " (with 5 on Economics AP exam)"}],
      "14.02",
      [1, "14.30", "6.041", "6.431", "1.010", "18.600"],
      "14.32", "18.100",
      [
        {count: 1, desc: "CI-M in Economics"},
        "14.33", "14.05", "14.18"
      ],
      [
        {count: 1, desc: "CI-M in Mathematics"},
        "18.100C", "18.104", "18.504", "18.784"
      ],
      [1, "14.12", "14.04", "14.15", "14.19"],
      [1, "18.06", "18.03"],
      [
        {
          count: 36,
          type: "total_units",
          desc: "units from elective subjects (choose at least one in "+
                "Mathematics and one in Economics)",
          special: 1
        },
        "14.03",
        "14.06", "14.11", "14.12", "14.13", "14.15", "14.16", "14.19", "14.20",
        "14.21", "14.23", "14.26", "14.27", "14.36", "14.41", "14.42", "14.43",
        "14.44",
        "14.45", "14.51", "14.54", "14.64", "14.70", "14.71", "14.73",
        "14.74", "14.75"
      ]
    ]
  },

  m15: {
    name: "15 -- Management / Management Science (as of Sep '15)",
    disable: 1,
    reqs: [0,
      "15.501",
      [1,
        "1.00", "1.000", "6.00",
        [2, "6.0001", "6.0002"],
        "6.005"
      ],
      [1, "18.06", "18.700"],
      "14.02",
      [1, "6.041", "18.440", "18.600", "15.079"],
      "15.279",
      [1, "15.301", [2, "15.418", "15.310"]],
      [1, "14.01", "15.0111"],
      [1, "15.053", "15.058"],
      [1, "15.075", "18.443", "18.650"],
      [1, "15.411", "15.812", "15.7611", "15.9001"],
      {
        id: "2 Subjects in Finanace, Information Technologies, " +
            "Marketing Science, or Business Analytics & Operations Research",
        skip: 1
      }
    ]
  },

  m15_1: {
    name: "15-1 -- Management (as of Mar '16)",
    reqs: [0,
      "15.501", "15.279",
      [1,
        "15.301",
        [2,
          [1, "15.310", "15.668"],
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "15.417", "15.418"
          ]
        ]
      ],
      [1, "14.01", "15.0111"],
      [1, "15.079", "6.041", "14.30", "18.600", "18.440"],
      [1, "15.075", "14.32", "18.650", "18.443"],
      [2,
        [1, "15.417", "15.401"],
        [1, "15.7611", "15.761"],
        "15.812",
        [1, "15.9001", "15.900"]
      ],
      {
        id: "5 Concentration Elective subjects. At least 3 must be Course " +
            "15 subjects.",
        skip: 1
      }
    ]
  },

  m15_2: {
    name: "15-2 -- Business Analytics (as of Apr '16)",
    reqs: [0,
      "15.276",
      [1, [2, "6.0001", "6.0002"], "6.01"],
      [1, "15.279", "15.301", "15.417", "15.418"],
      "15.053",
      [1, "15.079", "6.041", "18.600"],
      "15.075", "15.780", "6.036",
      {
        id: "5 Concentration Elective subjects. At least 3 must be Sloan " +
            "subjects.",
        skip: 1
      }
    ]
  },

  m15_3: {
    name: "15-3 -- Finance (as of Mar '16)",
    reqs: [0,
      [1,
        "15.417",
        [0,
          "15.401",
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "15.418"
          ],
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "15.276", "15.279"
          ]
        ]
      ],
      [1,
        "15.418",
        [0,
          "15.402",
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "15.417"
          ],
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "15.276", "15.279"
          ]
        ]
      ],
      "15.501",
      [1, "14.01", "15.0111"],
      [1, "15.079", "6.041", "18.600", "14.30"],
      [1, "15.075", "18.650", "14.32"],
      {id: "Restricted Electives:", skip: 1},
      [1, "15.4331", "15.4371", "15.438"],
      [1, "15.4311", "15.4341"],
      [3,
        "15.4331", "15.4371", "15.438",
        "15.4311", "15.4341",
        "15.447", "15.450", "15.4601", "15.466", "15.467", "15.5181"
      ],
      [2,
        "15.4331", "15.4371", "15.438",
        "15.4311", "15.4341",
        "15.447", "15.450", "15.4601", "15.466", "15.467", "15.5181",
        "15.053", "15.7611", "15.812", "15.9001",
        [1, "15.301", "15.310", "15.668"]
      ]
    ]
  },

  m16_1: {
    name: "16-1 -- Aerospace Engineering (2015s only) (as of May '15)",
    disable: 1,
    reqs: [0,
      "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07",
      [1, "16.09", "6.041"],
      [1, "18.03", "18.034"],
      [2, "16.20", "16.50", "16.90", "16.100"],
      [2,
        "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36",
        "16.400", "16.410"
      ],
      [1, "16.82", "16.83"],
      [1, [2, "16.621", "16.622"], "16.821", "16.831"]
    ]
  },

  m16_2: {
    name: "16-2 -- Aerospace Engineering with IT (2015s only) (as of May '15)",
    disable: 1,
    reqs: [0,
      "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07",
      [1, "16.09", "6.041"],
      [1, "18.03", "18.034"],
      [3, "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"],
      [1,
        "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36",
        "16.400", "16.410"
      ],
      [1, "16.82", "16.83"],
      [1, [2, "16.621", "16.622"], "16.821", "16.831"]
    ]
  },

  m16: {
    name: "16 -- Aerospace Engineering (as of Sep '16)",
    reqs: [0,
      "16.001", "16.002", "16.003", "16.004",
      [1,
        {id: "1.00", desc: " (2016s only)"},
        [2, "6.0001", "6.0002"],
        {id: "6.01", desc: " (by petition)"}
      ],
      "16.06", "16.07",
      [1, "16.09", "6.041"],
      [1, "18.03", "18.034"],
      [
        {
          count: 48,
          type: "total_units",
          desc: "units from Professional Area Subjects",
          special: 1
        },
        "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36",
        "16.400", "16.410"
      ],
      [
        {
          count: 36,
          type: "total_units",
          desc: "units (IT ONLY)",
          globalMatchesIgnore: 1,
          special: 1
        },
        {
          id: "Note: these overlap with the Professional Area Subjects above.",
          skip: 1
        },
        "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"
      ],
      {id: "Laboratory and Capstone Subjects", skip: 1},
      [1, "16.82", "16.83"],
      [1, [2, "16.621", "16.622"], "16.821", "16.831"]
    ]
  },

  m16_ENG: {
    name: "16-ENG -- Engineering (as of May '15)",
    reqs: [0,
      "16.001", "16.002", "16.003", "16.004",
      [1,
        {id: "1.00", desc: " (2016s only)"},
        [2, "6.0001", "6.0002"]
      ],
      [1, "18.03", "18.034"],
      [1, "16.06", "16.07"],
      [
        {
          count: 42,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        {
          id: "Engineering concentration electives",
          skip: 1
        }
      ],
      [
        {
          count: 12,
          type: "total_units",
          desc: "units from",
          special: 1
        },
          {
          id: "Math or science concentration electives",
          skip: 1
      }],
      [
        {
          count: 18,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        {
          id: "Other concentration electives",
          skip: 1
      }],
      [1, "16.82", "16.83"],
      [1, [2, "16.621", "16.622"], "16.821", "16.831"]
    ]
  },

  m17: {
    name: "17 -- Political Science (as of May '15)",
    reqs: [0,
      "17.869", "17.871", "17.THT", "17.THU",
      [1,
        {
          id: "17.00-099",
          range: 1,
          matchRegex: /^17\./
      }],
      [1,
        {
          id: "17.20-299",
          range: 1,
          matchRegex: /^17\.2/
      }],
      [1,
        {
          id: "17.30-399",
          range: 1,
          matchRegex: /^17\.3/
        },
        {
          id: "A subject in another field designated as fulfilling the " +
              "public policy requirement",
          skip: 1
        }
      ],
      [1,
        {
          id: "17.40-599",
          range: 1,
          matchRegex: /^17\.[45]/
      }],
      {
        id: "3 additional political science subjects representing " +
            "a coherent plan of study",
        skip: 1
      }
    ]
  },

  m18_general: {
    name: "18 -- Mathematics (General Option) (as of Aug '16)",
    reqs: [0,
      [1, "18.03", "18.034"],
      [1, "18.700", "18.701", "18.06"],
      [
        {
          count: 8,
          desc: "(in total) from",
          globalMatchesIgnore: 1,
          globalMatchesSkip: 1,
          runinfull: 1
        },
        {
          id: "18.04-999",
          range: 1,
          matchRegex: /^18\../,
          excludeRegex: /^18\.0[0-3]/
        }
      ],
      [
        {
          count: 6,
          desc: "(in total) from",
          globalMatchesIgnore: 1,
          globalMatchesSkip: 1,
          runinfull: 1
        },
        {
          id: "18.100-999",
          range: 1,
          matchRegex: /^18\.[1-9]\d\d/
        }
      ],
      [
        {
          count: 2,
          desc: "(for CI-M) from",
          globalMatchesIgnore: 1,
          globalMatchesSkip: 1
        },
        [1,
          "18.104", "18.200", "18.204", "18.384", "18.424", "18.434", "18.504",
          "18.704", "18.784", "18.821", "18.904", "18.994"
        ],
        [1,
          "18.104", "18.200", "18.204", "18.384", "18.424", "18.434", "18.504",
          "18.704", "18.784", "18.821", "18.904", "18.994",
          "8.06", "14.33", "18.100C", "18.200"
        ]
      ]
    ]
  },

  m18_applied: {
    name: "18 -- Mathematics (Applied Option) (as of Aug '16)",
    reqs: [0,
      [1, "18.03", "18.034", "18.152", "18.303"],
      [1, "18.04", "18.112"],
      [1, "18.06", "18.700", "18.701"],
      [1, "18.200", "18.200A"],
      "18.300",
      [
        {
          count: 4,
          desc: "(with at least one from each group) from"
        },
        {
          id: "Group I class: Probability and statistics, combinatorics, " +
              "computer science",
          skip: 1
        },
        "18.204",
        [1, "18.211", "18.212"],
        [1, "18.400", "18.404"],
        "18.424", "18.453", "18.434", "18.600", "18.650",
        {
          id: "Group II class: Numerical analysis, physical mathematics, " +
              "nonlinear dynamics",
          skip: 1
        },
        "18.303", "18.330", "18.352", "18.353", "18.354", "18.384"
      ],
      [
        {
          count: 2,
          desc: "(for CI-M) from",
          globalMatchesIgnore: 1,
          globalMatchesSkip: 1
        },
        [1,
          "18.104", "18.200", "18.204", "18.384", "18.424", "18.434", "18.504",
          "18.704", "18.784", "18.821", "18.904", "18.994"
        ],
        [1,
          "18.104", "18.200", "18.204", "18.384", "18.424", "18.434", "18.504",
          "18.704", "18.784", "18.821", "18.904", "18.994",
          "8.06", "14.33", "18.100C", "18.200"
        ]
      ]
    ]
  },

  m18_theoretical: {
    name: "18 -- Mathematics (Theoretical Option) (as of Mar '16)",
    reqs: [0,
      [1, "18.03", "18.034"],
      [1, "18.100B", "18.100C"], "18.701", "18.702", "18.901",
      [1, "18.101", "18.102", "18.103"],
      [1, "18.104", "18.504", "18.704", "18.784", "18.904", "18.994"],
      [2,
        {
          id: "18.100-999",
          range: 1,
          matchRegex: /^18\.[1-9]\d\d/
      }],
      [
        {
          count: 1,
          desc: "(for CI-M) from",
          globalMatchesIgnore: 1,
          globalMatchesSkip: 1
        },
        [
          {
            count: 2,
            globalMatchesIgnore: 1,
            globalMatchesSkip: 1
          },
          "18.104", "18.204", "18.384", "18.424", "18.434", "18.504", "18.704",
          "18.784", "18.821", "18.904", "18.994"
        ],
        [
          {
            count: 2,
            globalMatchesIgnore: 1,
            globalMatchesSkip: 1
          },
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "18.104", "18.204", "18.384", "18.424", "18.434", "18.504",
            "18.704", "18.784", "18.821", "18.904", "18.994"
          ],
          [
            {
              count: 1,
              globalMatchesIgnore: 1,
              globalMatchesSkip: 1
            },
            "8.06", "14.33", "18.100C", "18.310"
          ]
        ]
      ]
    ]
  },

  m18_C: {
    name: "18-C -- Mathematics with Computer Science (as of Aug '16)",
    reqs: [0,
      [1, "18.03", "18.034", "18.152", "18.303"],
      [1, "18.06", "18.700", "18.701"],
      "18.410", "6.0001", "6.006",
      [1, "6.009", "6.01"],
      [1, "18.062", "18.200", "18.200A"],
      [1, "18.400", "18.404"],
      [1, "6.031", "6.033", "6.034", "6.005"],
      {id: "Restricted Electives:", skip: 1},
      [4,
        {
          id: "18.04-999",
          range: 1,
          matchRegex: /^18\../,
          excludeRegex: /^18\.0[0-3]/
      }],
      [
        {
          count: 12,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        [1,
          {
            id: "6.XXX (except 6.042)",
            range: 1,
            matchRegex: /^6\./,
            excludeRegex: /^6.042$/
          }
        ]
      ],
      [{count: 5, desc: "(overall) from", globalMatchesIgnore: 1},
        {
          id: "18.100-999",
          range: 1,
          matchRegex: /^18\.[1-9]\d\d$/
        }
      ],
      [{count: 1, desc: "(for CI-M) from"},
        [{count: 2, globalMatchesIgnore: 1},
          "18.100C", "18.104", "18.200", "18.204", "18.384", "18.424",
          "18.434", "18.504",
          "18.704", "18.784", "18.821", "18.904", "18.994"
        ],
        [2,
          [{count: 1, globalMatchesIgnore: 1},
            "18.100C", "18.104", "18.200", "18.204", "18.384", "18.424",
            "18.434", "18.504",
            "18.704", "18.784", "18.821", "18.904", "18.994"
          ],
          [{count: 1, globalMatchesIgnore: 1},
            "6.033", "8.06", "14.33", "18.100C", "18.310"
          ]
        ]
      ]
    ]
  },

  m20: {
    name: "20 -- Biological/Biomedical Engineering (as of Aug '16)",
    reqs: [0,
      [1, "5.07", "7.05"],
      "5.12",
      [1, "18.03", "18.034", "3.016"],
      "7.03", "7.06", "20.109",
      [1, "20.110", "20.111"],
      "6.0001", "6.0002", "20.320", "20.330", "20.309", "20.380",
      [
        {
          count: 3,
          desc: "from (Restricted Electives; at least 1 must be from Course 20)"
        },
        {
          id: "Biomechanics and Biophysics",
          skip: 1
        },
        "2.71", "2.715", "2.717", "2.785", "2.799", "3.052", "3.22", "5.08",
        "5.64", "6.002", "7.38", "7.71", "8.241", "20.415",
        {
          id: "BioMEMS & Biological Instrumentation",
          skip: 1
        },
        "20.345", "6.152", "2.374", "2.391", "2.674", "2.782",
        {
          id: "Synthetic Biology & Macromolecular Design",
          skip: 1
        },
        "6.002", "7.76", "20.305", "20.385",
        {
          id: "Computational & Systems Biology",
          skip: 1
        },
        [1, "18.06", "18.062"],
        [1, "6.003", "6.041", "18.600"],
        "6.034", "6.047", "7.32", "10.544", "7.09", "20.390", "20.482",
        {
          id: "Microbial and Ecological Systems",
          skip: 1
        },
        "1.018A", "1.018B", "20.106", "1.89", "7.21", "7.493", "20.363",
        {
          id: "Pharmacology & Toxicology",
          skip: 1
        },
        "5.08", "20.106", "20.104", "20.102", "9.15", "20.201", "20.213",
        "20.360", "7.37", "7.371", "7.547", "10.644",
        {
          id: "Cell & Tissue Engineering",
          skip: 1
        },
        "20.441", "20.360", "7.37", "20.342", "20.363", "20.451", "3.052",
        "20.411",
        {
          id: "Human Pathophysiology",
          skip: 1
        },
        "20.370", "20.371", "7.20", "7.23", "7.27", "20.450",
        {
          id: "Neuroscience",
          skip: 1
        },
        "9.07", "9.173", "9.29", "7.29", "9.15", "9.472", "MAS.881",
        "9.40", "9.66", "20.203", "20.205"
      ]
    ]
  },

  m21: {
    name: "21 -- Russian Studies (as of May '15)",
    disable: 1,
    reqs: [0]
  },

  m21_german: {
    name: "21 -- German Studies (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21F.406", "21F.407",
      [1,
        "21F.409", "21F.410", "21F.412", "21F.414", "21F.415", "21F.416",
        "21F.420"
      ]
    ]
  },

  m21_A: {
    name: "21A -- Anthropology (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21A.100", "21A.109", "21A.510", "21A.512",
      {
        id: "8 Anthropology electives program",
        skip: 1
      }
    ]
  },

  m21_E: {
    name: "21E -- Humanities and Engineering (as of May '15)",
    disable: 1,
    reqs: [0]
  },

  m21_F_french: {
    name: "21F -- French Studies (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21F.301", "21F.302", "21F.304", "21F.306", "21F.307",
      [1,
        "21F.308", "21F.310", "21F.311", "21F.312", "21F.315", "21F.320",
        "21F.325", "21F.345", "21F.346"
      ]
    ]
  },

  m21_F_spanish: {
    name: "21F -- Spanish Studies (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21F.701", "21F.702", "21F.704", "21F.708", "21F.709",
      [1,
        "21F.716", "21F.717", "21F.721", "21F.730", "21F.731", "21F.735",
        "21F.736", "21F.738", "21F.740"
      ]
    ]
  },

  m21_G_french: {
    name: "21G -- French Studies (as of Oct '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21G.301", "21G.302", "21G.304", "21G.306", "21G.307",
      [1,
        "21G.308", "21G.310", "21G.311", "21G.312", "21G.315", "21G.320",
        "21G.325", "21G.345", "21G.346"
      ]
    ]
  },

  m21_G_spanish: {
    name: "21G -- Spanish Studies (as of Oct '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21G.701", "21G.702", "21G.704", "21G.708", "21G.709",
      [1,
        "21G.716", "21G.717", "21G.721", "21G.730", "21G.731", "21G.735",
        "21G.736", "21G.738", "21G.740"
      ]
    ]
  },

  m21_H: {
    name: "21H -- History (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      [1,
        {
          id: "21H.001-999",
          range: 1,
          matchRegex: /^21H\.\d{3}/,
          excludeRegex: /^21H\.000/
      }],
      "21H.390", "21H.THT", "21H.THU",
      {
        id: "7 subjects forming a coherent program of subjects " +
            "from the history curriculum",
        skip: 1
      },
      {
        id: "3 related subjects from a second HASS discipline.",
        skip: 1
      }
    ]
  },

  m21_L: {
    name: "21L -- Literature (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      [2,
        "21L.473", "21L.701", "21L.702", "21L.703", "21L.704", "21L.705",
        "21L.706", "21L.707", "21L.708", "21L.709"
      ],
      {
        id: "7 subjects forming a coherent program of subjects from " +
            "the literature cirriculum",
        skip: 1
      }
    ]
  },

  m21_M: {
    name: "21M -- Music (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      [1, "21M.220", "21M.260"],
      [1, "21M.235", "21M.250"],
      "21M.301", "21M.302",
      [1, "21M.303", "21M.350"],
      [2,
        {
          id: "21M.401-499",
          range: 1,
          matchRegex: /^21M\.4\d\d/
      }],
      "21M.500",
      [1,
        {
          id: "21M.300-399",
          range: 1,
          matchRegex: /^21M\.3\d\d/
      }],
      [1,
        "21M.215", "21M.223", "21M.226", "21M.283", "21M.284",
        [1,
          {
            id: "21M.291-299",
            range: 1,
            matchRegex: /^21M\.29[1-9]/
        }]
      ],
      [1,
        [1,
          {
            id: "21M.300-399",
            range: 1,
            matchRegex: /^21M\.3\d\d/
        }],
        [1,
          {
            id: "21M.200-299",
            range: 1,
            matchRegex: /^21M\.2\d\d/
        }],
        [2,
          {
            id: "21M.400-499",
            range: 1,
            matchRegex: /^21M\.4\d\d/
        }]
      ]
    ]
  },

  m21_M_2: {
    name: "21M-2 -- Theater Arts (as of May '15)",
    reqs: [0,
      [
        {
          count: 2,
          desc: "(for CI-M) from",
          globalMatchesSkip: 1
        },
        "21M.624", "21M.732", "21M.733", "21M.735", "21M.785", "21M.830"
      ],
      [
      {
        count: 36,
        type: "total_units",
        desc: "units (Theoretical Studies) from",
        special: 1
      },
      "21M.611", "21M.703", "21M.710", "21M.711", "21M.715", "21M.800",
        "21M.846", "21M.863"
    ],
      [
      {
        count: 60,
        type: "total_units",
        desc: "units (Practical Studies) from",
        special: 1
      },
      "21M.600", "21M.603", "21M.604", "21M.605", "21M.606", "21M.624",
        "21M.645", "21M.704", "21M.705", "21M.732", "21M.733", "21M.734",
        "21M.735", "21M.785", "21M.790", "21M.830", "21M.840"
    ],
      [
      {
        count: 12,
        type: "total_units",
        desc: "units (Performance and Design Practica) from",
        special: 1
      },
      "21M.805", "21M.815", "21M.851"
    ],
      "21M.THT", "21M.THU"
    ]
  },

  m21_S: {
    name: "21S -- Humanities and Science (as of May '15)",
    disable: 1,
    reqs: [0]
  },

  m21_W_creative: {
    name: "21W -- Writing (Creative Writing focus) (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21W.THT", "21W.THU",
      [1,
        "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771",
        "21W.777"
      ],
      {
        id: "6 subjects centered on creative writing",
        skip: 1
      },
      {
        id: "3 subjects in literature",
        skip: 1
      }
    ]
  },

  m21_W_science: {
    name: "21W -- Writing (Science Writing focus) (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21W.777", "21W.778", "21W.792", "21W.THT", "21W.THU",
      {
        id: "4 subjects in writing",
        skip: 1
      },
      [1,
        {
          id: "STS.001-999",
          range: 1,
          matchRegex: /^STS\.\d{3}/,
          excludeRegex: /^STS.000/
      }]
    ]
  },

  m21_W_digital: {
    name: "21W -- Writing (Digital Media focus) (as of May '15)",
    reqs: [0,
      {
        id: "Propose to join major " +
            "(<a href=\"http:\/\/shass.mit.edu\/undergraduate\/majors\" " +
            "target=\"_blank\">details<\/a>)",
        skip: 1
      },
      "21W.764", "21W.765", "21W.785", "21W.THT", "21W.THU",
      [1,
        "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771",
        "21W.777"
      ],
      {
        id: "3 subjects in writing",
        skip: 1
      }
    ]
  },

  m22: {
    name: "22 -- Nuclear Science & Engineering (as of Oct '15)",
    reqs: [0,
      "2.005",
      [1, [2, "6.0001", "6.0002"], "12.010", "2.086", "1.000"],
      "8.03",
      [1, "18.03", "18.034"],
      "18.06", "22.01", "22.071",
      "22.02", "22.033", "22.05", "22.09",
      "22.THT", "22.THU",
      [
        {
          count: 24,
          type: "total_units",
          desc: "units",
          pullmatches: 1,
          special: 1
        },
        "22.04", "22.054", "22.055", "22.06", "22.081", "22.14", "22.15",
        "22.107", "22.212", "22.213", "22.251", "22.313", "22.315", "22.38",
        "22.39", "22.51", "22.611", "22.615", "22.62", "22.71", "22.72",
        "22.74", "22.76", "22.78", "22.811", "22.812", "22.814", "2.006",
        [1, "18.0751", "18.04"],
        [1, "6.041", "18.05", "18.600"]
      ]
    ]
  },

  m24_1: {
    name: "24-1 -- Philosophy (as of May '15)",
    reqs: [0,
      {
        id: "CIH Philosophy subject",
        skip: 1
      },
      [1, "24.01", "24.201"],
      [1,
        "24.08", "24.09", "24.111", "24.112", "24.114", "24.211", "24.215",
        "24.221", "24.251", "24.253", "24.280"
      ],
      [1,
        "24.02", "24.04", "24.06", "24.120", "24.209", "24.213", "24.214",
        "24.222", "24.231", "24.235", "24.237", "24.263"
      ],
      [1, "24.118", "24.241", "24.242", "24.243", "24.244", "24.245"],
      {
        id: "5 subjects forming a coherent program of addition subjects, " +
            "two of which must be philosophy",
        skip: 1
      },
      "24.260",
      [1,
        "24.120", "24.201", "24.221", "24.231", "24.235", "24.237", "24.251",
        "24.263"
      ]
    ]
  },

  m24_2_linguistics: {
    name: "24-2 -- Linguistics (as of May '15)",
    reqs: [0,
      "24.900", "24.901", "24.902", "24.903", "24.918",
      [1, "24.909", "24.910", "24.914"],
      [1, "24.09", "24.241", "24.251"],
      [1, "24.904", "24.905", "24.906", "24.907", "24.915"],
      {
        id: "3 subjects forming a coherent program of subjects from " +
            "linguistics, philosophy, or a related area.",
        skip: 1
      }
    ]
  },

  m24_2_philosophy: {
    name: "24-2 -- Philosophy / Linguistics (as of May '15)",
    reqs: [0,
      "24.900", "24.201", "24.241", "24.251", "24.260",
      [1, "24.08", "24.09"],
      [1,
        "24.111", "24.112", "24.114", "24.211", "24.215", "24.221", "24.253",
        "24.280"
      ],
      [1, "9.65", "24.904", "24.905"],
      {
        id: "3 subjects forming a coherent program of subjects from " +
            "linguistics, philosophy, or a related area.",
        skip: 1
      }
    ]
  },

  mCMS: {
    name: "CMS -- Comparative Media Studies (as of May '15)",
    reqs: [0,
      "21L.011", "CMS.100",
      [1, "CMS.400", "CMS.403", "CMS.405", "CMS.407"],
      [1, "21L.706", "21L.715"],
      [6,
        "CMS.300", "CMS.309", "CMS.312", "CMS.313", "CMS.314", "CMS.334",
        "CMS.336", "CMS.338", "CMS.360", "CMS.361", "CMS.362", "CMS.376",
        "CMS.603", "CMS.607", "CMS.608", "CMS.609", "CMS.610", "CMS.611",
        "CMS.612", "CMS.613", "CMS.614", "CMS.615", "CMS.616", "CMS.621",
        "CMS.627", "CMS.628", "CMS.631", "CMS.701", "CMS.S60", "CMS.S61",
        "CMS.S62",
        [2, "CMS.THT", "CMS.THU"],
        "CMS.URG", "4.341", "4.352", "4.354", "4.602", "4.373", "11.127",
        "21A.203", "21A.500", "21A.502", "21A.503", "21A.505", "21A.550",
        "21F.011", "21F.027", "21F.030", "21F.035", "21F.036", "21F.038",
        "21F.039", "21F.046", "21F.052", "21F.055", "21F.060", "21F.063",
        "21F.065", "21F.071", "21H.214", "21H.315", "21L.012", "21L.021",
        "21L.430", "21L.432", "21L.433", "21L.434", "21L.435", "21L.486",
        "21L.707", "21L.708", "21M.283", "21M.284", "21M.624", "21M.840",
        "21M.846", "21W.749", "21W.752", "21W.765", "21W.772", "21W.784",
        "21W.785", "21W.787", "21W.789", "21W.790", "MAS.110", "STS.008",
        "STS.056", "STS.085"
      ]
    ]
  },

  mSTS: {
    name: "STS -- Science, Technology and Society (as of May '15)",
    reqs: [0,
      [1,
        "STS.001", "STS.003", "STS.005", "STS.006", "STS.007", "STS.008",
        "STS.009", "STS.010", "STS.011"
      ],
      [1,
        {
          id: "STS.025-090",
          range: 1,
          matchRegex: /^STS\.0([2-8]\d|90)/,
          excludeRegex: /^STS\.02[0-4]/
      }],
      "STS.091", "STS.THT", "STS.THU",
      {
        id: "5 Coherent group of subjects in STS",
        skip: 1
      }
    ]
  },

  mWGS: {
    name: "WGS -- Women's and Gender Studies (as of Apr '16)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      "WGS.101",
      {id: "Tier II:", skip: 1},
      [1,
        "WGS.109", "WGS.110", "WGS.111", "WGS.115", "WGS.140", "WGS.141", "WGS.142",
        "WGS.154", "WGS.161", "WGS.190", "WGS.220", "WGS.226", "WGS.231", "WGS.233",
        "WGS.234", "WGS.235", "WGS.236", "WGS.240"
      ],
      [1,
        "WGS.125", "WGS.150", "WGS.151", "WGS.170", "WGS.172", "WGS.175", "WGS.221",
        "WGS.222", "WGS.225", "WGS.228", "WGS.270", "WGS.271", "WGS.272", "WGS.274",
        "WGS.276"
      ],
      [5,
        "WGS.109", "WGS.110", "WGS.111", "WGS.115", "WGS.140", "WGS.141", "WGS.142",
        "WGS.154", "WGS.161", "WGS.190", "WGS.220", "WGS.226", "WGS.231", "WGS.233",
        "WGS.234", "WGS.235", "WGS.236", "WGS.240",
        "WGS.125", "WGS.150", "WGS.151", "WGS.170", "WGS.172", "WGS.175", "WGS.221",
        "WGS.222", "WGS.225", "WGS.228", "WGS.270", "WGS.271", "WGS.272", "WGS.274",
        "WGS.276",
        {
          id: "A subject at Harvard, Wellesley, or Cambridge " +
              "(with permission of the director)",
          skip: 1
        }
      ],
      {id: "Tier III:", skip: 1},
      [1,
        "WGS.301",
        {
          id: "An advanced WGS subject (with permission of the director)",
          skip: 1
        }
      ]
    ]
  },

  miComputerScience: {
    name: "Minor in Computer Science (New!) (as of Apr '16)",
    reqs: [0,
      "6.0001", "6.0002", "6.042",
      [1, "6.009", "6.S04", "6.005"],
      "6.006",
      {id: "Elective Subjects:", skip: 1},
      [1,
        "6.005", "6.031", "6.033", "6.036", "6.045",
        "6.046", "6.170"
      ],
      [1,
        "6.004", "6.008", "6.034",
        "6.033", "6.036", "6.045", "6.046", "6.170"
      ]
    ]
  },

  miArchitecture: {
    name: "Minor in Architecture (as of May '15)",
    reqs: [0,
      [1,
        {id: "Old system:", skip: 1},
        [0,
          [1, "4.111", "4.11A"],
          "4.112", "4.605"
        ],
        {id: "New system:", skip: 1},
        [0, [1, "4.021", "4.02A"], "4.022", "4.605"]
      ],
      [1,
        {id: "Old system:", skip: 1},
        [2, "4.113", "4.114"],
        {id: "New system:", skip: 1},
        [2, "4.023", "4.024"],
        [
          {
            count: 3,
            desc: "(up to two from each group A-D, and no more than one " +
                  "from group E) from"
          },
          {id: "Group A:", skip: 1},
          "4.110", "4.122", "4.170", "4.211", "4.231", "4.233", "4.250",
          {id: "Group B:", skip: 1},
          "4.301", "4.302", "4.307", "4.312", "4.314", "4.320", "4.322",
          "4.330", "4.332", "4.341", "4.351", "4.352", "4.354", "4.356",
          "4.361", "4.366", "4.368", "4.371", "4.373",
          {id: "Group C:", skip: 1},
          "4.401", "4.411", "4.42", "4.432", "4.440", "4.444", "4.472", "4.474",
          {id: "Group D:", skip: 1},
          "4.500", "4.501", "4.503", "4.504", "4.520", "4.522",
          {id: "Group E:", skip: 1},
          "4.601", "4.602", "4.603", "4.606", "4.609", "4.610", "4.613",
          "4.614", "4.615", "4.635", "4.641", "4.651", "4.671", "4.67", "4.673"
        ]
      ]
    ]
  },

  miDesign: {
    name: "Minor in Design (as of Apr '16)",
    reqs: [0,
      "4.031", "4.032", "4.101",
      [3,
        "4.110", "4.411J", "4.500", "4.502", "4.520", "2.007", "CMS.634",
        "EC.720J", "MAS.110",
        "4.301", "4.307", "4.322",
        [1, "4.330", "4.332"],
        [1, "4.341", "4.344"],
        "4.602", "4.657", "CMS.362"
      ]
    ]
  },

  miEntrepreneurship_Innovation: {
    name: "Minor in Entrepreneurship & Innovation (as of Aug '16)",
    reqs: [0,
      {id: "E&I Foundations:", skip: 1},
      [2, "15.359", "15.373"],
      {id: "E&I in Context:", skip: 1},
      [1,
        "3.086", "6.805", "11.005", "11.123", "11.142", "11.165", "15.031",
        "15.364", "17.307", "17.309", "17.315", "17.33",
        "STS.002", "STS.004", "STS.032", "STS.088", "EC.701"
      ],
      {id: "Leadership of Teams and Organizations:", skip: 1},
      [1,
        "2.96", "6.915", "10.02", "15.3941", "15.668",
        {id: "GEL 1:", skip: 1},
        [3, "6.902", "6.911", "6.912"]
      ],
      {id: "E&I Experimental:", skip: 1},
      [1,
        "2.009", "2.750", "2.752", "2.760", "3.042", "6.170", "6.811", "6.813",
        "10.807", "11.127", "15.3781", "15.3901", "21W.789",
        "CMS.610", "CMS.611", "EC.720",
        [1,
          {
            id: "EC.7## (9- or 12-unit D-Lab subject, approved by advisor",
            range: 1,
            matchRegex: /^EC\.7\d\d/
          }
        ]
      ],
    ]
  },

  miHist_Architecture_Art: {
    name: "Minor in the History of Architecture and Art (as of May '15)",
    reqs: [0,
      [1, "4.601", "4.602"],
      [1, "4.605", "4.614"],
      [
        {
          count: 3,
          desc: "(no more than two subjects from either the history of art " +
                "or the history of architecture) from"
        },
        "4.603", "4.606", "4.613", "4.615", "4.635", "4.641", "4.645", "4.651",
        "4.671", "4.673"
      ],
      [1,
        "4.609",
        {
          id: "Other advanced seminar in the history of art and/or " +
              "architecture, incl. offerings from Harvard or Wellsley",
          skip: 1
        }
      ]
    ]
  },

  miArt_culture_tech: {
    name: "Minor in Art, Culture and Technology (as of May '15)",
    reqs: [0,
      {id: "Tier 1:", skip: 1},
      [1, "4.301", "4.302"],
      [1, "4.601", "4.602", "4.606", "4.641", "4.651", "4.671", "4.673"],
      {id: "Tier 2:", skip: 1},
      [2, "4.320", "4.322", "4.330", "4.341", "4.354"],
      {id: "Tier 3:", skip: 1},
      [2,
        "4.312", "4.314", "4.332", "4.352", "4.361", "4.366", "4.368", "4.371"
      ]
    ]
  },

  miUrban_studies_and_planning: {
    name: "Minor in Urban Studies and Planning (as of May '15)",
    reqs: [0,
      "11.001", "11.002",
      [3,
        "11.005", "11.011", "11.013", "11.014", "11.016", "11.021", "11.022",
        "11.025", "11.026", "11.122", "11.126", "11.162", "11.165", "11.166",
        "11.168"
      ],
      "11.123"
    ]
  },

  miInternational_development: {
    name: "Minor in International Development (as of May '15)",
    reqs: [0,
      [2, "11.005", "11.025", "11.140"],
      [4,
        "4.233", "11.002", "11.027", "11.122", "11.147", "11.164", "11.165",
        "11.166", "11.167", "EC.715"
      ]
    ]
  },

  miToxicology_and_enviro_health: {
    name: "Minor in Toxicology and Environmental Health (as of May '15)",
    reqs: [0,
      "20.102", "20.104", "20.106",
      [1, "20.109", "5.310", "7.02", "10.702"],
      [1,
        "20.URG", "1.080", "1.725", "1.89", "5.07", "7.05", "7.06", "7.28",
        "22.01"
      ]
    ]
  },

  miCivil_Engineering: {
    name: "Minor in Civil Engineering (as of May '15)",
    reqs: [0,
      "1.050", "1.060", "1.101", "1.102", "1.035", [1, "1.041", "1.036"]
    ]
  },

  miEnvrio_Engineering_Science: {
    name: "Minor in Environmental Engineering Science (as of May '15)",
    reqs: [0,
      "1.018", "1.020", "1.101", "1.102", "1.080",
      "1.107", "1.801", "11.002", "11.122", "14.01"
    ]
  },

  miAnthropology: {
    name: "Minor in Anthropology (as of May '15)",
    reqs: [0,
      [1, "21A.00", "21A.01"],
      {
        id: "4 subjects with a unifying theme",
        skip: 1
      },
      [1, "21A.852", "21A.802"]
    ]
  },

  miCMS: {
    name: "Minor in Comparative Media Studies (as of May '15)",
    reqs: [0,
      [1, "21L.011", "CMS.100"],
      [1, "CMS.400", "CMS.403", "CMS.405", "CMS.407"],
      [1, "21L.706", "21L.715"],
      {
        id: "3 electives (consult with advisor)",
        skip: 1
      }
    ]
  },

  miBiology: {
    name: "Minor in Biology (as of May '15)",
    reqs: [0,
      "5.12", "7.03", "7.05",
      [2,
        [1, "7.02", "20.109"], "7.06", "7.08",
        "7.20", "7.21", "7.22", "7.23", "7.25", "7.26", "7.27", "7.28", "7.29",
        "7.30", "7.31", "7.32", "7.33", "7.35", "7.36", "7.37", "7.41", "7.49"
      ]
    ]
  },

  miBrain_Cog_Sci: {
    name: "Minor in Brain and Cognitive Sciences (as of May '15)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      "9.00", "9.01", "9.40",
      [3,
        {id: "Tier II:", skip: 1},
        "9.04", "9.09", "9.10", "9.14", "9.15", "9.16", "9.18", "9.20", "9.31",
        "9.35", "9.54", "9.65", "9.66", "9.85",
        {id: "Tier III:", skip: 1},
        "9.24", "9.26", "9.46", "9.56", "9.57", "9.71"
      ]
    ]
  },

  miChemistry: {
    name: "Minor in Chemistry (as of May '15)",
    reqs: [0,
      "5.03", "5.12", "5.310", "5.60",
      [2,
        "5.04", "5.07", "5.08", "5.13", "5.36", "5.37",
        {
          id: "Note: CourseRoad doesn't currently recognize the 5.35-38 " +
              "module behavior. Try using 0-unit custom classes to mark " +
              "where the modules go in your schedule.",
          skip: 1
        },
        [2, "5.36U", "5.37U"], "5.43", "5.61", "5.62"
      ]
    ]
  },

  miEarth_Atmos_Planetary: {
    name: "Minor in Earth, Atmospheric, and Planetary Sciences (as of Oct '15)",
    reqs: [0,
      [2, "12.001", "12.002", "12.003", "12.006", "12.102", "12.400"],
      [1, "18.03", "18.034", "5.60"],
      [2,
        {
          id: "Course 12 subjects within one of the EAPS concentration " +
              "areas, approved by the minor advisor",
          skip: 1
        }
      ],
      [
        {
          count: 12,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        {id: "Lab:", skip: 1},
        "12.115", "12.119", "12.307", "12.410",
        {id: "Field and IAP:", skip: 1},
        "12.120", "12.141", "12.213", "12.214", "12.221", "12.310", "12.411",
        {id: "Independent Study:", skip: 1},
        "12.IND", "12.UR"
      ]
    ]
  },

  miAtmospheric_chemistry: {
    name: "Minor in Atmospheric Chemistry (as of Oct '15)",
    reqs: [0,
      {id: "Chemistry, Dynamics, and the Atmosphere:", skip: 1},
      "12.003", "5.60", "1.085", "12.306",
      {id: "Observations/Applications:", skip: 1},
      [1, "1.080", "12.335", "12.338", [2, "12.310", "12.IND"]],
      {id: "Linkages of Atmospheric Chemistry to Policy:", skip: 1},
      [1, "12.385", "12.340", "12.346"]
    ]
  },

  miEcon: {
    name: "Minor in Economics (as of Aug '16)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      "14.01", "14.02",
      [1,
        "14.30", "14.31", "18.05", "1.010",
        [2,
          [1, "6.041", "18.440"],
          [1, "14.32", "15.075", "18.441", "18.443"]
        ]
      ],
      {id: "Tier II:", skip: 1},
      [1, "14.03", "14.04", "14.05"],
      {id: "Tier III:", skip: 1},
      [2,
        "14.06", "14.11", "14.12", "14.13", "14.15", "14.16", "14.18", "14.19",
        "14.20", "14.21",
        "14.26", "14.27", "14.41", "14.42", "14.43", "14.44", "14.54", "14.64",
        "14.70", "14.73", "14.74", "14.75",
        [2, "15.411", "15.412"]
      ]
    ]
  },

  mi15_1: {
    name: "Minor in 15-1: Management (as of Mar '16)",
    reqs: [0,
      "15.501",
      [1, "15.301", "15.310", "15.668"],
      [1,
        [1, "15.417", "15.401"],
        [1, "15.7611", "15.761"],
        "15.812",
        [1, "15.9001", "15.900"]
      ],
      {
        id: "Three full subjects (two six-unit subjects equal a full " +
            "elective) from Course 15. UROP, Independent Study, Special " +
            "Seminars, or general-elective transfer credit may not be used. " +
            "14.01 may be used as an elective.",
        skip: 1
      }
    ]
  },

  mi15_2: {
    name: "Minor in 15-2: Business Analytics (as of Mar '16)",
    reqs: [0,
      "15.053",
      [1, "15.079", "6.041", "18.600"],
      [1, "15.075", "18.650"],
      {
        id: "Three full subjects from <a href=\"" +
            "http://mitsloan.mit.edu/uploadedFilesV9/Undergraduate/Pages/" +
            "Majors_and_Minors/15-2%20BA%20Electives_web.pdf\">" +
            "a list of restricted electives</a>. At least two of the " +
            "subjects must be from Course 15.",
        skip: 1
      }
    ]
  },

  mi15_3: {
    name: "Minor in 15-3: Finance (as of Mar '16)",
    reqs: [0,
      [1, "15.417", "15.401"],
      [1, "15.418", "15.402"],
      "15.501",
      [2,
        "15.4331", "15.4371", "15.438", "15.4311", "15.4341", "15.447",
        "15.450", "15.4601", "15.466", "15.467", "15.5181"
      ]
    ]
  },

  miStatistics: {
    name: "Minor in Statistics and Data Science (as of May '16)",
    reqs: [0,
      [1,
        "2.087", "6.01",
        [2, "6.0001", "6.0002"],
        "18.03", "18.06"
      ],
      [1, "6.041", "14.30", "18.600"],
      [1, "14.32", "15.075", "18.650"],
      [2,
        "2.086", "6.036", "6.819", "7.36", "14.36", "15.053",
        "18.642"
      ],
      "IDS.012"
    ],
  },

  miWriting: {
    name: "Minor in Writing (as of Dec '15)",
    reqs: [0,
      [1,
        {id: "Writing and Rhetoric", skip: 1},
        "21W.011", "21W.012", "21W.013",
        {id: "Writing and Experience", skip: 1},
        "21W.021", "21W.022", "21W.023", "21W.024",
        {id: "Science Writing and New Media", skip: 1},
        "21W.031", "21W.032", "21W.033", "21W.034", "21W.035",
        {id: "Writing about Literature", skip: 1},
        "21W.041",
        {id: "Writing with Shakespeare", skip: 1},
        "21W.042",
        {id: "Writing and Reading Short Stories", skip: 1},
        "21W.755",
        {id: "Writing and Reading Poems", skip: 1},
        "21W.756"
      ],
      [5,
        "21W.THT", "21W.THU",
        {id: "Creative Writing", skip: 1},
        "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771",
        "21W.777",
        {id: "Science Writing", skip: 1},
        "21W.777", "21W.778", "21W.792",
        {id: "Digital Media", skip: 1},
        "21W.764", "21W.765", "21W.785", "21W.757", "21W.758", "21W.759",
        "21W.762", "21W.770", "21W.771", "21W.777"
      ]
    ]
  },

  miManagement: {
    name: "Minor in Management (as of May '15)",
    reqs: [0,
      [1, "15.301", "15.310", "15.668"], "15.501", "15.812",
      [
        {
          count: 3,
          desc: "MIT Sloan subjects (other than UROP, Special Studies, " +
            "Special Seminars, and general elective transfer credit) that " +
            "meet the following restrictions"
        },
        {
          id: "UROP, Special Studies, Special Seminars, or general-elective" +
            "transfer credit may not be used",
          skip: 1
        },
        {
          id: "A full elective must carry at least nine units of credit. " +
            "Two six-unit subjects count as a single elective",
          skip: 1
        },
        {
          id: "15.301, 15.310, and 15.668 may not be used as electives",
          skip: 1
        },
        {
          id: "Students may use 18.443 as a substitution for 15.075 " +
            "(as an elective option)",
          skip: 1
        },
        {
          id: "14.01 may also be used as an elective",
          skip: 1
        }
      ]
    ]
  },

  miManagement_science: {
    name: "Minor in Management Science (as of May '15)",
    reqs: [0,
      [1, "14.01", "15.016"],
      "15.053",
      [1, "6.041", "18.440"],
      [1, "15.075", "18.443"],
      {
        id: "2 Course 15 restricted electives",
        skip: 1
      }
    ]
  },

  miSTS: {
    name: "Minor in Science, Technology, and Society (as of May '15)",
    reqs: [0,
      "STS.091",
      [1,
        {
          id: "STS.001-011",
          range: 1,
          matchRegex: /^STS\.0(0\d|1[01])/,
          excludeRegex: /^STS\.000/
      }],
      [1,
        {
          id: "STS.025-089",
          range: 1,
          matchRegex: /^STS\.0([2-8]\d)/,
          excludeRegex: /^STS\.02[0-4]/
      }],
      [3,
        {
          id: "STS.001-089",
          range: 1,
          matchRegex: /^STS\.0[0-8]\d/,
          excludeRegex: /^STS\.000/
      }]
    ]
  },

  miMusic: {
    name: "Minor in Music (as of May '15)",
    reqs: [0,
      [1, "21M.011", "21M.030", "21M.051"],
      "21M.301",
      [1,
        {
          id: "21M.200-299",
          range: 1,
          matchRegex: /^21M\.2\d\d/
      }],
      [2,
        {
          id: "21M.400-499",
          range: 1,
          matchRegex: /^21M\.4\d\d/
      }],
      [1,
        [2,
          "21M.500",
          {
            id: "21M.200-299",
            range: 1,
            matchRegex: /^21M\.2\d\d/
          }
        ],
        [2,
          {
            id: "21M.300-399",
            range: 1,
            matchRegex: /^21M\.3\d\d/
          },
          "21M.500",
          {
            id: "21M.550-589",
            range: 1,
            matchRegex: /^21M\.5[5-8]\d/
          }
        ],
        [4,
          {
            id: "21M.401-499",
            range: 1,
            matchRegex: /^21M\.4\d\d/,
            excludeRegex: /^21M\.400/
        }]
      ]
    ]
  },

  miTheater_arts: {
    name: "Minor in Theater Arts (as of May '15)",
    reqs: [0,
      [1, "21M.611", "21M.618", "21M.703", "21M.710", "21M.711", "21M.846"],
      [4,
        "21M.600", "21M.603", "21M.604", "21M.605", "21M.606", "21M.624",
        "21M.645", "21M.704", "21M.705", "21M.715", "21M.732", "21M.733",
        "21M.734", "21M.735", "21M.736", "21M.785", "21M.790", "21M.830",
        "21M.840", "21M.863"
      ],
      [
        {
          count: 12,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        "21M.805", "21M.815", "21M.851"
      ]
    ]
  },

  miPhilosophy: {
    name: "Minor in Philosophy (as of Feb '16)",
    reqs: [0,
      {
        id: "Any CIH philosophy subject",
        skip: 1
      },
      [1,
        "24.118", "24.241", "24.242", "24.243", "24.244", "24.245",
        {
          id: "A logic subject in another department e.g. Mathematics",
          skip: 1
        }
      ],
      {
        id: "Three nonintroductory philosophy subjects",
        skip: 1
      }, "24.260"
    ]
  },

  miLinguistics: {
    name: "Minor in Linguistics (as of May '15)",
    reqs: [0,
      "24.900", "24.901", "24.902", "24.903",
      [2,
        "24.904", "24.905", "24.906", "24.907", "24.909", "24.910", "24.914",
        "24.915"
      ]
    ]
  },

  miMSE: {
    name: "Minor in Material Science and Engineering (as of May '15)",
    reqs: [0,
      [
        {
          count: 72,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        [1,
          "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052",
          "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073",
          "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"
        ],
        [5,
          "3.012", "3.014", "3.016", "18.03", "18.034", "3.021", "1.00", "6.01",
          "3.016", "3.022", "3.024", "3.032", "3.034", "3.042", "3.044",
          "3.THU",
          [2, "3.930", "3.931"],
          "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052",
          "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073",
          "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"
        ]
      ]
    ]
  },

  miArchaeology: {
    name: "Minor in Archaeology and Materials (as of May '15)",
    reqs: [0,
      "3.012", "3.014", "3.022", "3.986", "3.985",
      [1, "3.07", "3.14", "3.051", "3.052", "3.984"]
    ]
  },

  miMathematics: {
    name: "Minor in Mathematics (as of May '15)",
    reqs: [0,
      [
        {
          count: 72,
          type: "total_units",
          desc: "units (6 classes, 12 units each) from",
          special: 1
        },
        [4,
          {
            id: "18.100-999",
            range: 1,
            matchRegex: /^18\.[1-9]\d\d/
        }],
        [2,
          {
            id: "18.03-999",
            range: 1,
            matchRegex: /^18\../,
            excludeRegex: /^18\.0[0-3]/
        }],
        {
          id: "[Note: All classes must be of essentially different content]",
          skip: 1
        }
      ]
    ]
  },

  miMechE: {
    name: "Minor in Mechanical Engineering (as of May '15)",
    reqs: [0,
      [
        {
          count: 72,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        [4,
          "2.001", "2.002", "2.003", "2.004", "2.005", "2.009", "2.086",
          "2.671", "18.03", "18.034", "2.007", "2.006", "2.008", "2.017"
        ],
        [2,
          "2.006", "2.007", "2.008", "2.65", "2.700", "2.016", "2.017", "2.019",
          "2.050", "2.092", "2.12", "2.14", "2.184", "2.370", "2.51", "2.60",
          "2.71", "2.72", "2.793", "2.797", "2.813", "2.96", "2.THU"
        ]
      ]
    ]
  },

  miNuclear_science: {
    name: "Minor in Nuclear Science and Engineering (as of May '15)",
    reqs: [0,
      "22.01", "22.02", [2, "22.05", "22.06", "22.058", "22.09"]
    ]
  },

  miPhysics: {
    name: "Minor in Physics (as of May '15)",
    reqs: [0,
      [1, "18.03", "18.034"],
      [
        {
          count: 57,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        [5,
          {
            id: "8.03-999",
            range: 1,
            matchRegex: /^8\../,
            excludeRegex: /^8\.0[0-2]/
        }]
      ]
    ]
  },

  miPolitical_science: {
    name: "Minor in Political Science (as of May '15)",
    reqs: [0,
      [1,
        {
          id: "Intro class (two digit decimal)",
          range: 1,
          matchRegex: /^17\.\d{2}\D/
        }
      ],
      [4,
        {
          id: "Advanced classes (three digit decimal)",
          range: 1,
          matchRegex: /^17\.\d{3}/
        }
      ],
      [1,
        {
          id: "17.01-999",
          range: 1,
          matchRegex: /^17\../,
          excludeRegex: /^17\.00/
        }
      ]
    ]
  },

  miChinese: {
    name: "Minor in Chinese (21F) (as of May '15)",
    disable: 1,
    reqs: [0,
      [1,
        [2, [1, "21F.103", "21F.173"], "21F.104"],
        [2, [1, "21F.109", "21F.183"], "21F.110"],
        [2, "21F.142", "21F.143"]
      ],
      [1,
        [2, [1, "21F.105", "21F.175"], "21F.106"],
        [1, "21F.113", "21F.185"]
      ],
      [1,
        "21F.190", "21F.192", "21F.193", "21F.194", "21F.195",
        {
          id: "21F.199",
          desc: " (if Capstone)"
        }
      ],
      [1,
        "21F.027", "21F.030", "21F.193", "21F.036", "21F.190", "21F.038",
        "21F.194", "21F.043", "21F.044", "21F.195", "21F.046", "21F.192",
        "21F.075", "21H.151", "21H.152", "21H.351"
      ]
    ]
  },

  mi21_G_chinese: {
    name: "Minor in Chinese (as of Aug '16)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      [1,
        [2, [1, "21G.103", "21G.173"], "21G.104"],
        [2, [1, "21G.109", "21G.183"], "21G.110"],
        [2, "21G.142", "21G.143"]
      ],
      {id: "Tier II:", skip: 1},
      [1,
        [2, [1, "21G.105", "21G.175"], "21G.106"],
        [1, "21G.113", "21G.185"]
      ],
      {id: "Tier III:", skip: 1},
      [1,
        "21G.190", "21G.192", "21G.193", "21G.194", "21G.195", "21G.196",
        {
          id: "21G.199",
          desc: " (if Capstone)"
        }
      ],
      [1,
        "21G.030", "21G.036", "21G.038", "21G.043", "21G.044", "21G.045",
        "21G.046", "21G.075",
        "21G.190", "21G.192", "21G.193", "21G.194", "21G.195", "21G.196",
        "21H.151", "21H.152", "21H.351"
      ]
    ]
  },

  miFrench: {
    name: "Minor in French (as of May '15)",
    disable: 1,
    reqs: [0,
      [1, "21F.303", "21F.373"],
      [1, "21F.304", "21F.374"],
      [2,
        {
          id: "21F.308-313",
          range: 1,
          matchRegex: /^21F\.3(0[89]|1[0-3])/
        },
        "21F.315"
      ],
      [2,
        "21F.052", "21F.068", "21F.071",
        {
          id: "21F.320-348",
          range: 1,
          matchRegex: /^21F\.3[2-4]\d/,
          excludeRegex: /^21F\.349/
        },
        "21H.241"
      ]
    ]
  },

  mi21_G_french: {
    name: "Minor in French (as of Aug '16)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      [
        {
          count: 2,
          desc: "(or fewer) from"
        },
        [1, "21G.303", "21G.373"],
        [1, "21G.304", "21G.374"]
      ],
      {id: "Tier II:", skip: 1},
      [
        {
          count: 2,
          desc: "(or 3) from",
          runinfull: 1
        },
        "21G.308", "21G.310", "21G.311", "21G.312", "21G.315"
      ],
      {id: "Tier III:", skip: 1},
      [
        {
          count: 2,
          desc: "(or 3) from",
          runinfull: 1
        },
        "21G.049", "21G.052", "21G.053", "21G.054", "21G.068",
        "21G.320", "21G.321", "21G.322", "21G.325", "21G.341",
        "21G.346", "21G.347"
      ]
    ]
  },

  miGerman: {
    name: "Minor in German (as of May '15)",
    reqs: [0,
      [1, "21F.403", "21F.473"],
      [1, "21F.404", "21F.474"],
      [2,
        {
          id: "21F.405-412",
          range: 1,
          matchRegex: /^21F\.4(0[5-9]|1[0-2])/
        }
      ],
      [2,
        "17.651", "21F.019", "21F.055", "21F.059", "21F.098",
        {
          id: "21F.414-420",
          range: 1,
          matchRegex: /^21F\.4(1[4-9]|20)/
        }
      ],
      [1,
        {
          id: "21F.405-412",
          range: 1,
          matchRegex: /^21F\.4(0[5-9]|1[0-2])/
        },
        "17.651", "21F.019", "21F.055", "21F.059", "21F.098",
        {
          id: "21F.414-420",
          range: 1,
          matchRegex: /^21F\.4(1[4-9]|20)/
        }
      ]
    ]
  },

  miSpanish: {
    name: "Minor in Spanish (as of May '15)",
    disable: 1,
    reqs: [0,
      [1, "21F.703", "21F.773"],
      [1, "21F.704", "21F.774"],
      [3,
        {
          id: "21F.711-714",
          range: 1,
          matchRegex: /^21F\.71[1-4]/
        },
        "21F.792"
      ],
      [
        {
          count: 2,
          desc: "(at least) from"
        },
        "21F.010", "21F.084",
        {
          id: "21F.716-740",
          range: 1,
          matchRegex: /^21F\.7(1[6-9]|[23]\d|40)/
        }
      ]
    ]
  },

  mi21_G_spanish: {
    name: "Minor in Spanish (as of Mar '16)",
    reqs: [0,
      [6,
        {id: "Tier I (2 or fewer):", skip: 1},
        "21G.703", "21G.704",
        {id: "Tier II: (3 or fewer):", skip: 1},
        "21G.711", "21G.712", "21G.713", "21G.714",
        {id: "Tier III (2 or more):", skip: 1},
        "21G.070", "21G.084", "21G.716", "21G.717", "21G.730", "21G.735",
        "21G.736", "21G.738", "21G.739", "21G.740"
      ]
    ]
  },

  miJapanese: {
    name: "Minor in Japanese (as of May '15)",
    reqs: [0,
      [1,
        [2, [1, "21F.503", "21F.573"], "21F.504"],
        [2, "21F.562", "21F.563"]
      ],
      [1, "21F.505", "21F.575"],"21F.506",
      [1, "21F.590", "21F.591", "21F.592", "21F.593", "21F.596"],
      [1,
        "21F.590", "21F.591", "21F.592", "21F.593", "21F.596", "17.433",
        "17.537", "17.543", "21F.027", "21F.030", "21F.039", "21F.063",
        "21F.064", "21F.065"
      ]
    ]
  },


  miAsian: {
    name: "Minor in Asian and Asian Diaspora Studies (as of May '15)",
    reqs: [0,
      [
        {
          count: 2,
          desc: "(Language subjects) from"
        },
        "21F.103", "21F.104", "21F.105", "21F.106", "21F.109", "21F.110",
        "21F.113", "21F.142", "21F.143", "21F.503", "21F.504", "21F.505",
        "21F.56", "21F.514", "21F.562", "21F.563", "21F.114"
      ],
      [
        {
          count: 4,
          desc: "from at least two of the following areas"
        },
        {
          id: "HUMANITIES AND THE ARTS",
          skip: 1
        },
        "21F.011", "21F.027", "21F.029", "21F.030", "21F.036", "21F.038",
        "21F.039", "21F.040", "21F.044", "21F.046", "21F.063", "21F.064",
        "21F.065", "21F.199", "21L.011", "21L.504", "21M.291", "21W.788",
        {
          id: "SOCIAL SCIENCES",
          skip: 1
        },
        "17.407", "17.433", "17.486", "17.537", "17.543", "17.547", "17.551",
        "21A.141", "21A.140", "21A.400",
        {
          id: "HISTORICAL STUDIES",
          skip: 1
        },
        "21F.043", "21F.069", "21F.075", "21H.151", "21H.152", "21H.154",
        "21H.155", "21H.351", "21H.354",
        {
          id: "[No longer offered:]",
          skip: 1
        },
        "11.167", "21F.035", "21F.067", "21H.504", "21H.511", "21H.521",
        "21H.522", "21H.523", "21H.546", "21H.560", "21H.580", "21M.292"
      ]
    ]
  },


  miHistory: {
    name: "Minor in History (as of May '15)",
    reqs: [0,
      "21H.390",
      {
        id: "Four undergraduate introductory or intermediate subjects " +
            "from the history curriculum",
        skip: 1
      },
      {
        id: "At least one 21H seminar in addition to 21H.390",
        skip: 1
      },
      {
        id: "At least two temporal periods, one premodern (before 1700) and " +
            "one modern, to be covered by the five subjects other than 21H.390",
        skip: 1
      }
    ]
  },

  miLiterature: {
    name: "Minor in Literature (as of May '15)",
    reqs: [0,
      [1,
        {
          id: "21L.000-044",
          range: 1,
          matchRegex: /^21L\.0[0-4]\d/,
          excludeRegex: /^21L\.04[5-9]/
      }],
      [2,
        {
          id: "21L.420-522",
          range: 1,
          matchRegex: /^21L\.(4[2-9]|5[0-2])\d/,
          excludeRegex: /^21L\.52[3-9]/
      }],
      [1,
        [1,
          {
            id: "21L.000-044",
            range: 1,
            matchRegex: /^21L\.0[0-4]\d/,
            excludeRegex: /^21L\.04[5-9]/
        }],
        [1,
          {
            id: "21L.420-522",
            range: 1,
            matchRegex: /^21L\.(4[2-9]|5[0-2])\d/,
            excludeRegex: /^21L\.52[3-9]/
        }]
      ],
      [2,
        {
          id: "21L.701-715",
          range: 1,
          matchRegex: /^21L\.7(0[1-9]|1[0-5])/
      }]
    ]
  },

  miAncient_and_medieval: {
    name: "Minor in Ancient and Medieval Studies (as of May '15)",
    reqs: [0,
      [
        {
          count: 2,
          desc: "from (Language)"
        },
        "21F.303", "21F.304", "21F.403", "21F.404", "21F.703", "21F.704"
      ],
      [4,
        "4.609", "4.614", "4.635", "21L.001", "21L.012", "21L.330", "21L.335",
        "21L.455", "21L.458", "21L.460", "21L.704", "21L.705", "21M.220",
        "24.410", "3.982", "3.983", "3.993", "21H.007", "21H.333", "21H.130",
        "21H.132", "21H.233", "21H.236", "21H.331", "21H.133", "21H.134",
        "21H.160", "21H.238", "21H.334", "4.444", "21A.211", "21H.411",
        "21H.521", "21H.522", "24.200",
        [
          {
            count: 1,
            desc: "from (Methodology, with petition"
          },
          "3.990", "21H.390"
        ]
      ]
    ]
  },

  miApplied_international: {
    name: "Minor in Applied International Studies (as of May '15)",
    reqs: [0,
      {
        id: "Six classes from any program in SHASS, including at least 2 " +
            "focused on one area of the world, and at least one " +
            "in the social sciences",
        skip: 1
      },
      {
        id: "The equivalent of 4 semesters of college language training " +
            "related to the student's geographical specialization",
        skip: 1
      },
      {
        id: "An international experience (MISTI, D-Lab or other)",
        skip: 1
      },
      {
        id: "A research seminar in international studies and social science " +
            "(this class counts as 1 of the 6 total required for the minor). " +
            "In consultation with the instructor, students pick a topic for " +
            "extensive independent research and over the course of the " +
            "semester complete a lengthy term paper. Normally students would " +
            "take this seminar after completing some course work " +
            "and their international experience",
        skip: 1
      }
    ]
  },

  miPremed: {
    name: "Pre-Med Path (as of Oct '15)",
    reqs: [0,
      [1, "7.02", "20.109", "10.702", "9.12"],
      "5.12",
      [1, "5.310", "5.35"],
      [1, "7.05", "5.07", "20.507"],
      {id: "Recommended Courses:", skip: 1},
      {id: "Biology:", skip: 1},
      "7.03", "7.06", "7.20",
      {id: "Chemistry:", skip: 1},
      "5.08", "5.13", "5.60", "20.110", "7.10",
      {id: "Math/Statistics:", skip: 1},
      "18.05",
      {id: "Psychology:", skip: 1},
      "9.00",
      {id: "Anthropology:", skip: 1},
      "21A.00", "21A.300", "21A.301", "21A.302", "21A.303", "21A.305", "21A.306",
      "21A.308",
      {id: "Sociology:", skip: 1},
      "21A.156", "21A.307",
      {id: "Political Science:", skip: 1},
      "17.309", "17.315", "17.317",
      {id: "Science, Technology, and Society:", skip: 1},
      "STS.049", "STS.046",
      {id: "Women's and Gender Studies:", skip: 1},
      "WGS.151", "WGS.228",
      {id: "Economics:", skip: 1},
      "14.21",
      {id: "Linguistics and Philosophy:", skip: 1},
      "24.06", "24.636",
    ]
  },

  miAstronomy: {
    name: "Minor in Astronomy (as of May '15)",
    reqs: [0,
      "8.03", "8.282",
      [1, "18.03", "18.034"],
      [1, "8.284", "8.286"],
      [1, "12.008", "12.400", "12.420", "12.425"],
      [1, "8.287", "12.43", "12.431", "12.432"],
      [1, "8.UR", "12.UR", "8.THU", "12.THU", "12.411"],
      {
        id: "Four of the subjects used to satisfy the astronomy minor " +
            "may not be used to satisfy any other major or minor.",
        skip: 1
      }
    ]
  },

  miBiomed: {
    name: "Minor in Biomedical Engineering (as of May '15)",
    reqs: [0,
      [1, "18.03", "18.034", "3.016"],
      [1, "1.010", "2.086", "6.041", "18.05"],
      [1, "5.07", "7.05"],
      [1, "7.02", "7.03", "7.06"],
      {
        id: "An intro level engineering-focused class from Courses " +
            "1, 2, 3, 6, 10, 16, or 22",
        skip: 1
      },
      [1,
        [3,
          [1, "20.110", "20.111"],
          [1, "20.310", "20.320", "20.330"],
          [1, "20.371", "20.390"]
        ],
        [3,
          [1,
            {
              id: "20.340-499",
              range: 1,
              matchRegex: /^20\.[34]\d\d/,
              excludeRegex: /^20\.3[0-3]\d/
          }],
          [1,
            {
              id: "20.340-499",
              range: 1,
              matchRegex: /^20\.[34]\d\d/,
              excludeRegex: /^20\.3[0-3]\d/
          }],
          [1,
            {
              id: "20.340-499",
              range: 1,
              matchRegex: /^20\.[34]\d\d/,
              excludeRegex: /^20\.3[0-3]\d/
          }],
          [1,
            {
              id: "HST.520-529",
              range: 1,
              matchRegex: /^HST\.52\d/
          }],
          [1,
            {
              id: "HST.520-529",
              range: 1,
              matchRegex: /^HST\.52\d/
          }],
          [1,
            {
              id: "HST.520-529",
              range: 1,
              matchRegex: /^HST\.52\d/
          }],
          [1,
            {
              id: "HST.540-549",
              range: 1,
              matchRegex: /^HST\.54\d/
          }],
          [1,
            {
              id: "HST.540-549",
              range: 1,
              matchRegex: /^HST\.54\d/
          }],
          [1,
            {
              id: "HST.540-549",
              range: 1,
              matchRegex: /^HST\.54\d/
          }]
        ]
      ]
    ]
  },

  miEnergy_studies: {
    name: "Minor in Energy Studies (as of Aug '16)",
    reqs: [0,
      {id: "Science Foundations:", skip: 1},
      [1,
        "8.21",
        [2,
          "6.007",
          [1, "2.005", "5.60"],
        ],
        [2,
          "5.60",
          [1, "12.021", "12.340"]
        ]
      ],
      {id: "Social Science Foundations:", skip: 1},
      [1, "14.01", "15.0111"],
      [1,
        "15.031",
        [1, "14.42", "14.44", "15.026"],
        [1, "1.801", "11.162", "22.04"]
      ],
      {id: "Technology/Engineering in Context:", skip: 1},
      [1, "2.60", "4.42", "22.081"],
      {id: "Electives:", skip: 1},
      [
        {
          count: 24,
          type: "total_units",
          desc: "units from",
          special: 1
        },
        "1.071", "2.006", "2.612", "2.627", "2.813", "3.003",
        "3.004", "3.18", "4.401", "6.061", "6.131", "6.701", "8.044", "10.04",
        "10.213", "10.27", "10.426", "11.142", "11.160", "11.165", "12.213",
        "12.346", "22.033", "22.06", "EC.711", "STS.032",
        "5.00", "6.695", "15.366", "15.933", "IDS.521"
      ]
    ]
  },

  miPsych: {
    name: "Minor in Psychology (as of May '15)",
    reqs: [0,
      "9.00",
      [2,
        {
          id: "Subject in experimental psychology",
          skip: 1
        },
        {
          id: "Subject in personality and social psychology",
          skip: 1
        },
        {
          id: "Subject in applied psychology",
          skip: 1
        }
      ],
      [3,
        {
          id: "Subject in experimental psychology",
          skip: 1
        },
        {
          id: "Subject in personality and social psychology",
          skip: 1
        },
        {
          id: "Subject in applied psychology",
          skip: 1
        }
      ]
    ]
  },

  miPublic_policy: {
    name: "Minor in Public Policy (as of May '15)",
    reqs: [0,
      [1, "11.002", "17.30"], "14.01", [1, "11.003", "17.303"],
      {
        id: "3 Subjects chosen in one of the following tracks: social and " +
            "educational policy, environmental policy, infrastructure " +
            "policy, science and technology policy, labor and industrial  " +
            "policy, international development policy, security and defense " +
            "policy, and urban and regional policy",
        skip: 1
      }
    ]
  },

  miWGS: {
    name: "Minor in Women's & Gender Students (as of May '15)",
    reqs: [0,
      {id: "Tier I:", skip: 1},
      "WGS.101",
      {id: "Tier II:", skip: 1},
      [4,
        {id: "At least one \"Humanities and the Arts\" class", skip: 1},
        {id: "At least one \"Social and Natural Sciences\" class", skip: 1},
        {
          id: "(One of these four may be taken at Harvard, Wellesley, or " +
              "Cambridge with the permission of the Director.",
          skip: 1
        }
      ],
      {id: "Tier III:", skip: 1},
      "WGS.301"
    ]
  },

  miRussian_Eurasian_studies: {
    name: "Minor in Russian & Eurasian Studies (as of Dec '15)",
    reqs: [0,
      {id: "Note: Subjects taken at Harvard or Wellesley may count.", skip: 1},
      [1,
        [2, "21G.613", "21G.614"],
        {id: "Area I: Language", skip: 1},
        {id: "Two advanced language subjects", skip: 1},
        {id: "Two additional subjects from Areas II, III, or IV", skip: 1},
        {
          id: "(Native speakers may substitute other subjects with permission)",
          skip: 1
        }
      ],
      [4,
        {id: "Area II: Humanities and the Arts", skip: 1},
        {id: "Area III: Social Sciences", skip: 1},
        "11.142", "17.569", "21H.245",
        {id: "Area IV: Historical Studies", skip: 1},
        "21H.244"
      ]
    ],
  }
};
