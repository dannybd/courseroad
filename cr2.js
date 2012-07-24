/********************
Welcome to the cr.js file! Right below this comment you'll see a bunch of major defintions.
The syntax for these major definitions isn't difficult: it consists of a list, where element 0
is an integer which provides the condition you need from the elements that follow to satisfy
that branch. Most of the time, this condition is a number: this means that n of the following
classes must be present and correct (which is defined later) in order for that "branch" of the
list to be valid. Alternative conditions are stored as objects, of the form:
{count:42, type:"total_units", desc:"units from", special:true}
which means that the present and correct classes must add up to at least 42 units.

There's a subtle point here: the lists can then themselves contain further lists.
Thus, you can say requirements like "18.02, (18.03 or 18.033), and 18.06" as 
[3, "18.02", [1, "18.03", "18.033"], "18.06"].
(One more note, that leading 3 can be a 0: CourseRoad will interpret that 0 as "all of the following".)
*********************/

majors = {};
majors["m0"] = [0];
majors["m1_A"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", [1, "1.00", "1.010"], "1.101", "1.102"];
majors["m1_C"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", "1.00", "1.010", "1.011", "1.035", "1.036", "1.041", "1.101", "1.102", [1, "1.015", "1.032", "1.054", "1.124", "1.200", "1.201", "1.252", "1.260", "1.573"]];
majors["m1_E"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", [1, "1.00", "1.010"], "1.061", "1.070", "1.080", "1.083", "1.106", "1.107", [1, "1.801", "11.002", "11.122", "14.01"], "1.101", "1.102", [1, "1.071", "1.64", "1.69", "1.72", "1.731", "1.77", "1.83", "1.89"]];
majors["m2"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.006", "2.008", "2.009", "2.086", "2.670", "2.671", "18.03", "2.THU", [1, "2.007", "2.017"], [1, "2.672", "2.674"], [2, "2.016", "2.017", "2.019", "2.050", "2.092", "2.12", "2.14", "2.184", "2.370", "2.51", "2.60", "2.71", "2.72", "2.793", "2.797", "2.813", "2.96"]];
majors["m2_A_old"] = [0, "2.001", "2.003", "2.005", "2.009", "2.670", "2.671", "18.03", [2, "2.002", "2.004", "2.006", "2.007", "2.008", "2.086", "2.THU"], [6, "Elective Subjects with Engineering Content"]];
majors["m2_A_new"] = [0, [1, "2.00", "2.00B"], "2.678", "2.087", "2.090", "2.01", [1, "2.02A", "2.02B"], "2.03", [1, "2.04A", "2.04B"], "2.05", "2.051", "2.06", "2.671", "2.009", [6, "2A Concentration"]];
majors["m2_OE"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.016", "2.017", "2.019", "2.086", "2.612", "2.670", "2.671", "18.03", [2, "2.006", "2.007", "2.008", "2.065", "2.092", "2.12", "2.14", "2.51", "2.60", "2.700", "2.72", "2.96", "2.THU"]];
majors["m3"] = [0, "3.012", "3.014", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.01", "3.016"], "3.022", "3.024", "3.032", "3.034", "3.042", "3.044", [1, "3.THU", "3.930"], "3.931", [4, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"]];
majors["m3_A"] = [0, [5, "3.012", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.001"], "3.022", "3.024", "3.032", "3.034", "3.042", "3.044"], "3.014", [3, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"], [6, "Planned electives appropriate to the student's stated goals"]];
majors["m3_C"] = [0, "3.012", "3.014", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.01"], "3.022", [1, "3.032", "3.044"], "3.THU", "3.985", "3.986", "3.987", "3.990", "12.001", [1, "12.110", "12.119"], "21A.100", [1, "3.07", "3.14", "3.051", "3.052"], [1, "3.982", "3.983", "3.984", "3.988"]];
majors["m4_archdesign"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.113", "4.114", "4.115", "4.440", "4.603", "4.605", [1, "4.116", [2, "Classes from other streams"]]];
majors["m4_buildingtech"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.411", "4.440", "4.605", "4.THT", "4.THU", [4, "Classes in Building Tech"], [1, "Class from the other streams"]];
majors["m4_computation"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.501", "4.503", "4.504", "4.505", "4.605", "4.THT", "4.THU", [1, "Class in Computation"]];
majors["m4_history"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.601", "4.605", [1, "4.602", "4.641", "4.651"], [1, "4.613", "4.614"], "4.THT", "4.THU", [3, "Classes in History, Theory and Criticism"], [1, "Class from Art, Culture and Technology"]];
majors["m4_artculture"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.322", "4.341", "4.351", "4.601", "4.THT", "4.THU", [3, "Classes in Art, Culture and Technology"], [1, "Class from History, Theory and Criticism"]];
majors["m5"] = [0, "5.03", "5.07", [1, "5.111", "5.112"], "5.12", "5.13", "5.35", "5.36", "5.37", "5.38", "5.60", "5.61", [2, "5.04", "5.08", "5.43", "5.62"]];
majors["m6_1"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], [1, "6.041", "18.440"], [1, [1, "6.100-6.182"], "CS lab"], [3, "6.002", "6.003", "6.004", "6.007"], [3, "6.011", "6.012", "6.013", "6.021"], [2, "from dept. list of advanced undergraduate subjects"], [1, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"]];
majors["m6_2"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], [1, "6.041", "18.440", "6.042"], [2, "6.002", "6.003", "6.007", "6.004"], [2, "6.005", "6.006", "6.004"], [1, "6.011", "6.012", "6.013", "6.021"], [1, "6.033", "6.034", "6.046"], [1, "6.011", "6.012", "6.013", "6.021", "6.033", "6.034", "6.046"], [1, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"], [1, [1, "6.100-6.182"], "CS lab"], [2, "from dept. list of advanced undergraduate subjects"]];
majors["m6_3"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], "6.042",  [1, "6.172", "6.035", "6.141", "6.813", "6.828"], [3, "6.004", "6.005", "6.006"], [3, "6.033", "6.034", "6.046"], [2, "6.022", "6.023", "6.035", "6.045", "6.047", "6.049", "6.061", "6.077", "6.111", "6.115", "6.131", "6.141", "6.142", "6.172", "6.173", "6.207", "6.301", "6.302", "6.336", "6.341", "6.434", "6.502", "6.503", "6.602", "6.608", "6.641", "6.701", "6.717", "6.801", "6.802", "6.803", "6.804", "6.805", "6.813", "6.814", "6.815", "6.824", "6.825", "6.837", "6.840", "6.854", "6.857", "6.858", "6.863", "6.867", "16.36"], [1, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"]];
majors["m6_7"] = [0, [1, "18.03", "18.06"], "6.01", "6.042", "5.12", [1, "5.60", "7.10", "20.110"], [1, "7.02", "20.109"], "6.005", "6.006", "6.046", "7.03", "7.06", [1, "7.05", "5.07"], [1, "6.047", "6.048", "6.503", "6.802", "7.36"], [1, "7.20", "7.23", "7.27", "7.28", "7.33"], "6.UAP", "6.UAT"];
majors["m7"] = [0, "5.12", [1, "20.110", "7.10", "5.60"], [1, "7.02", "20.109"], "7.03", [1, "7.05", "5.07"], "7.06", [3, "7.08-7.37"], [1, "7.13", "7.16", "7.18"]];
majors["m8_flexible"] = [0, "8.03", [1, "18.03", "18.034"], "8.04", "8.044", [1, "8.21", "8.223"], [1, "8.05", "8.20", "8.033"], [1, "8.13", "another lab", "8.THU", "an experimentally oriented summer internship"], [1, "8.03-8.999"], [3, "Subjects forming a coherent unit in some area"]];
majors["m8_focused"] = [0, "8.03", [1, "18.03", "18.034"], "8.04", "8.044", "8.033", "8.05", "8.06", "8.13", "8.14", "8.223", "8.THU", [1, "18.04-18.999"], [1, "8.07", "8.08", "8.09"], [1, "8.03-8.999"]];
majors["m9"] = [0, "9.00", "9.01", "9.07", [6, "9.34", "9.37", "9.56", "9.57", "9.59", "9.65", "9.66", "9.85", "24.900", "9.10", "9.20", "9.22", "9.35", "9.71", "9.03", "9.04", "9.05", "9.09", "9.14", "9.15", "9.18", "9.24", "9.29", "9.31"], [1, "9.02", "9.12", "9.63"], [1, "9.URG", "9.02", "9.12", "9.41", "9.50", "9.63"]];
majors["m10"] = [0, "5.12", [1, "5.07", "7.05"], "5.310", "5.60", "10.10", "10.213", [1, "10.28", "10.26", "10.27", "10.29"], "10.301", "10.302", "10.32", "10.37", "10.490", "10.491", [2, "10.492", "10.493", "10.494"], [1, "18.03", "18.034"], [1, [1, "10.001-10.039"], [1, "10.401-10.791"], [1, "10.793-10.800"], [1, "10.817-10.899"]], [1, "3.014", "5.36", "6.152", "10.28", "10.467", "10.702", "10.26", "10.27", "10.29"]];
majors["m10_B"] = [0, "5.12", "5.60", [1, "7.02", "10.702"], "7.03", [1, "5.07", "7.05"], "7.06", "10.10", "10.213", [1, "10.28", "10.26", "10.27", "10.29"], "10.301", "10.302", "10.37", "10.490", "10.491", [2, "10.492", "10.493", "10.494"], [1, "18.03", "18.034"]];
majors["m10_ENG"] = [0, "5.12", "18.03", "10.10", "10.213", "10.301", "10.302", "10.37", [1, "10.28", "10.26", "10.27", "10.29", "10.467"], [1, [2, "1.106", "1.107"], "2.671", "3.014", "5.310", "5.35", "10.702", "12.335", "20.109"], [1, "1.00", "1.018", "1.080", "3.012", "3.155", "5.12", "5.61", "6.00", "7.03", "8.21"], [4, "Engineering concentration"], [1, "10.THU", [{count:12,type:"total_units",desc:"units from",special:true}, "10.490-10.494"], [2, "10.910", [1, "10.492-10.494"]]]];
majors["m11_enviro"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.011", "11.014", "11.016", "11.021", "11.026", "11.122", "11.162", "11.165", "11.168", "1.011", "1.041"], "11.027", "11.THT", "11.THU"];
majors["m11_society"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.013", "11.014", "11.015", "11.016", "11.019", "11.026", "11.150"], "11.027", "11.THT", "11.THU"];
majors["m11_regional"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.003", "11.005", "11.011", "11.025", "11.126", "11.152", "11.164", "11.166"], "11.027", "11.THT", "11.THU"];
majors["m12"] = [0, "12.001", "12.003", "12.009", [1, "18.03", "18.034"], "12.TIP", "12.THU", [1, "12.115", [2, "12.221", "12.222"], "12.307", "12.335", "12.410"], [{count:72,type:"total_units",desc:"units from",special:true}, [{count:24,type:"total_units",desc:"units (at least) from",special:true}, "12.002", "12.005", "12.006", "12.007", "12.008", "12.021", "12.086", "12.021", "12.102", "12.104", "12.108", "12.109", "12.110", "12.113", "12.114", "12.119", "12.120", "12.158", "12.163", "12.170", "12.172", "12.201", "12.207", "12.213", "12.214", "12.301", "12.310", "12.333", "12.340", "12.348", "12.420", "12.425", "12.43", "12.431"], [{count:48,type:"total_units",desc:"units (at MAX) from",special:true}, "1.00", "1.060", "1.061", "1.080", "3.012", "5.60", "5.03", "5.12", "5.61", "6.00", "7.03", "7.05", "7.21", "8.03", "8.04", "8.044", "8.07", "8.09", "8.21", "12.010", "12.320", "18.04", "18.05", "18.06", "18.100A", "18.100B", "18.100C", "18.311"]]];
majors["m14"] = [0, "14.01", "14.02", "14.04", "14.05", "14.30", "14.32", "14.33", "14.THU", [{count:60,type:"total_units",desc:"units from",special:true}, "Elective subjects in economics"]];
majors["m15"] = [0, "1.00", "6.041", "14.01", "14.02", "15.053", "15.075", "15.279", "15.301", "15.501", "18.06", [1, "15.354", "15.401", "15.812", "15.761"], [2, "Subects in Finanace, Information Technologies, Marketing Science, Operations Research"]];
majors["m16_1"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [2, "16.20", "16.50", "16.90", "16.100"], [2, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_2"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [3, "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_ENG"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", [1, "18.03", "18.034"], [1, "16.06", "16.07"], [{count:42,type:"total_units",desc:"units from",special:true}, "Engineering concentration electives"], [{count:12,type:"total_units",desc:"units from",special:true}, "Math or science concentration electives"], [{count:18,type:"total_units",desc:"units from",special:true}, "Other concentration electives"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m17"] = [0, "17.869", "17.871", "17.THT", "17.THU", [1, "17.00-17.099"], [1, "17.20-17.299"], [1, "17.30-17.399"], [1, "17.40-17.599"], [3, "Additional political science subjects representing a coherent plan of study"]];
majors["m18_general"] = [0, [1, "18.03", "18.034"], [1, [2, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "8.06", "14.33", "18.100C", "18.310"]]], [1, "18.06", "18.700", "18.701"], [6, "18.100-18.999"], [2, "18.04-18.999"]];
majors["m18_applied"] = [0, [1, "18.03", "18.034"], [1, [2, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "8.06", "14.33", "18.100C", "18.310"]]], "18.310", "18.311", [1, "18.04", "18.112"], [1, "18.06", "18.700"], "Group I class: Probability and statistics, combinatorics, computer science", "Group II class: Numerical analysis, physical mathematics, nonlinear dynamics", "Class from Groups I or II", "Class from Groups I or II"];
majors["m18_theoretical"] = [0, [1, "18.03", "18.034"], [1, [2, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "8.06", "14.33", "18.100C", "18.310"]]], "18.100", "18.701", "18.702", "18.901", [1, "18.101", "18.102", "18.103"], [1, "18.104", "18.504", "18.704", "18.784", "18.904", "18.994"], [2, "18.100-18.999"]];
majors["m18_C"] = [0, [1, "18.03", "18.034"], [1, "18.06", "18.700"], "18.410", "6.01", "6.006", [1, "18.062", "18.310"], [1, "18.400", "18.404"], [1, "6.005", "6.033"], [4, "18.04-18.999"], [1, "6.02", "6.041", [1, "6.170-6.179"], "a Foundation or Header subject", [1, "6.100-6.999"]], [1, [2, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "6.033", "8.06", "14.33", "18.100C", "18.310"]]]];
majors["m20"] = [0, "18.03", [1, "20.110", "20.111"], "5.12", "20.109", "7.03", "6.00", [1, "5.07", "7.05"], "7.06", "20.310", "20.320", "20.330", "20.309", "20.380"];
majors["m21_german"] = [0, "21F.406", "21F.407", [1, "21F.409", "21F.410", "21F.412", "21F.414", "21F.415", "21F.416", "21F.420"]];
majors["m21_A"] = [0, "21A.100", "21A.109", "21A.510", "21A.512", [8, "Anthropology electives program"]];
//majors["m21_E"] = [0];
majors["m21_F_french"] = [0, "21F.301", "21F.302", "21F.304", "21F.306", "21F.307", [1, "21F.308", "21F.310", "21F.311", "21F.312", "21F.315", "21F.320", "21F.325", "21F.345", "21F.346"]];
majors["m21_F_spanish"] = [0, "21F.701", "21F.702", "21F.704", "21F.708", "21F.709", [1, "21F.716", "21F.717", "21F.721", "21F.730", "21F.731", "21F.735", "21F.736", "21F.738", "21F.740"]];
majors["m21_H"] = [0, [1, "21H.001-21H.999"], "21H.390", "21H.THT", "21H.THU", [7, "A coherent program of subjects from the history curriculum"], [3, "related subjects from a second HASS discipline."]];
majors["m21_L"] = [0, [2, "21L.473", "21L.701", "21L.702", "21L.703", "21L.704", "21L.705", "21L.706", "21L.707", "21L.708", "21L.709"], [7, "A coherent program of subjects from the literature cirriculum"]];
majors["m21_M"] = [0, [1, "21M.220", "21M.260"], [1, "21M.235", "21M.250"], "21M.301", "21M.302", [1, "21M.303", "21M.350"], [2, "21M.401-21M.499"], "21M.500", [1, "21M.300-21M.399"], [1, "21M.215", "21M.223", "21M.226", "21M.283", "21M.284", [1, "21M.291-21M.299"]], [1, [1, "21M.300-21M.399"], [1, "21M.200-21M.299"], [2, "21M.400-21M.499"]]];
//majors["m21_S"] = [0];
majors["m21_W_creative"] = [0, "21W.THT", "21W.THU", [1, "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771", "21W.777"], [6, "subjects centered on creative writing"], [3, "subjects in literature"]];
majors["m21_W_science"] = [0, "21W.777", "21W.778", "21W.792", "21W.THT", "21W.THU", [4, "subjects in writing"], [1, "STS.001-STS.999"]];
majors["m21_W_digital"] = [0, "21W.764", "21W.765", "21W.785", "21W.THT", "21W.THU", [1, "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771", "21W.777"], [3, "subjects in writing"]];
majors["m22"] = [0, "2.005", [1, "6.00", "12.010"], "8.03", [1, "18.03", "18.034"], "18.085", "22.01", "22.071", "22.02", "22.033", "22.05", "22.09", [2, "22.058", "22.055", "22.06", "22.070"], "22.THT", "22.THU"];
majors["m24_1"] = [0, "CIH Philosophy subject", [1, "24.01", "24.201"], [1, "24.08", "24.09", "24.111", "24.112", "24.114", "24.211", "24.215", "24.221", "24.251", "24.253", "24.280"], [1, "24.02", "24.04", "24.06", "24.120", "24.209", "24.213", "24.214", "24.222", "24.231", "24.235", "24.237", "24.263"], [1, "24.118", "24.241", "24.242", "24.243", "24.244", "24.245"], [5, "a coherent program of addition subjects, two of which must be philosophy"], "24.260", [1, "24.120", "24.201", "24.221", "24.231", "24.235", "24.237", "24.251", "24.263"]];
majors["m24_2_linguistics"] = [0, "24.900", "24.901", "24.902", "24.903", "24.918", [1, "24.909", "24.910", "24.914"], [1, "24.09", "24.241", "24.251"], [1, "24.904", "24.905", "24.906", "24.907", "24.915"], [3, "A coherent program of subjects from linguistics, philosophy, or a related area."]];
majors["m24_2_philosophy"] = [0, "24.900", "24.201", "24.241", "24.251", "24.260", [1, "24.08", "24.09"], [1, "24.111", "24.112", "24.114", "24.211", "24.215", "24.221", "24.253", "24.280"], [1, "9.65", "24.904", "24.905"], [3, "A coherent program of subjects from linguistics, philosophy, or a related area."]];
majors["mCMS"] = [0, "21L.011", "CMS.100", [1, "CMS.400", "CMS.403", "CMS.405", "CMS.407"], [1, "21L.706", "21L.715"]];
majors["mSTS"] = [0, [1, "STS.001", "STS.003", "STS.005", "STS.006", "STS.007", "STS.008", "STS.009", "STS.010", "STS.011"], [1, "STS.025-STS.090"], "STS.091", "STS.THT", "STS.THU", [5, "Coherent group of subjects in STS"]];
//majors["mWGS"] = [0];

//majors["miApplied_international"] = [0];
majors["miAstronomy"] = [0, "8.03", "8.282", "18.03", [1, "8.284", "8.286"], [1, "12.008", "12.400", "12.420", "12.425"], [1, "8.287", "12.43", "12.431", "12.432"], [1, "8.UR", "12.UR", "8.THU", "12.THU", "12.411"], "Four of the subjects used to satisfy the requirements for the astronomy minor may not be used to satisfy any other major or minor."];
majors["miBiomed"] = [0, [1, "18.03", "3.016"], [1, "1.010", "7.36", "9.07", "18.440", "18.443"], [1, "5.07", "7.05"], [2, "7.02", "7.03", "7.06", "An intro level engineering-focused class from Courses 1, 2, 3, 6, 10, 16, or 22"], [1, [3, [1, "20.110", "20.111"], [1, "20.310", "20.320", "20.330"], [1, "20.371", "20.390", "HST.561"]], [3, [1, "20.340-20.499"], [1, "20.340-20.499"], [1, "20.340-20.499"], [1, "HST.520-HST.529"], [1, "HST.520-HST.529"], [1, "HST.520-HST.529"], [1, "HST.540-HST.549"], [1, "HST.540-HST.549"], [1, "HST.540-HST.549"]]]];
majors["miEnergy_studies"] = [0, [1, "8.21", [2, "6.007", [1, "2.005", "5.60"]], [2, [1, "2.005", "5.60"], [1, "12.021", "12.340"]], [2, "6.007", [1, "12.021", "12.340"]]], "15.031", [1, "2.60", "4.42", "22.081"], [{count:24,type:"total_units",desc:"units from",special:true}, "1.071", "1.801", "2.006", "2.570", "2.612", "2.627", "2.813", "3.003", "4.401", "4.472", "5.92", "6.061", "6.131", "6.701", "10.04", "10.27", "11.162", "11.165", "11.168", "12.213", "14.42", "14.44", "15.026", "21H.207", "22.033", "22.06", "SP.775", "STS.032", "4.274", "11.369", "15.366", "15.933", "ESD.124", "ESD.162"]];
majors["miPsych"] = [0, "9.00", [2, "Subject in experimental psychology", "Subject in personality and social psychology", "Subject in applied psychology"], [3, "Subject in experimental psychology", "Subject in personality and social psychology", "Subject in applied psychology"]];
majors["miPublic_policy"] = [0, [1, "11.002", "17.30"], "14.01", [1, "11.003", "17.303"], [3, "Subjects chosen in one of the following tracks: social and educational policy, environmental policy, infrastructure policy, science and technology policy, labor and industrial policy, international development policy, security and defense policy, and urban and regional policy"]];

function checkMajor(selector){
	var val = $(selector).val();
	var div = $(selector).data("div");
	var span = $(selector).prev("span.majorminor");
	span.attr("data-empty",1).removeAttr("data-value");
	if(majors[val]==undefined) majors[val]=[0];
	if(val=="m0") return false;
	span.attr("data-value", $(selector).find("option:selected").text()).removeAttr("data-empty");
	$(div).html(buildMajor(majors[val])).append("<br>See an error? Let me know <a href=\"mailto:courseroad@mit.edu?subject=[CourseRoad]%20Error%20in%20"+val+"\">here<\/a>.");
	var reqs = checkReqs(majors[val], checkOff, [div, "lvl", "cls"]);
	if(reqs[0]) reqs[1] = "<strong>Congrats!<\/strong> You've fufilled this major or minor's requirements. (Or I haven't entered all of its data yet.)";
	if(!reqs[0]) reqs[1] = "Still needed: "+reqs[1];
	reqs[1] = "<strong>Requirements:<\/strong><br>" + reqs[1];
	if(val=="m0") reqs[1] = "";
}

function checkOff(majordiv, lvl, cls){ 
	$(majordiv+" .majorchk.majorchk_"+lvl.join("_")+":not(.chk):first").addClass("chk").html("[X]").attr("title",cls.div.data("subject_id")); 
	return true;
}

function buildMajor(arr, level){
	if(level==undefined) level = []; //Keep track of recursion. 
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	if(typeof(arr[0])=="number"){
		var holdobj = {count:(0+arr[0]),desc:"from",special:false};
	}else{
		var holdobj = $.extend({}, arr[0]);
		holdobj.special = true;
	}
	var tempstr = ""; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	for(var i=1;i<arr.length;i++){
		if($.isArray(arr[i])){
			var req = buildMajor(arr[i], level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			tempstr += req;
			continue;
		}
		if(typeof(arr[i])=="object"){ //Converting both things to objects, but only the coreq ones will have a "coreq":1 thing.
			var newarr = $.extend({}, arr[i]);
		}else{
			var newarr = {id:arr[i]};
		}
		if(newarr.desc==undefined) newarr.desc = "";
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(newarr.id.indexOf("-")!=-1){
			var innertempstr = "";
			for(var j=0;j<holdobj.count;j++){
				innertempstr += "<span class='majorchk majorchk_"+(level.concat([i])).join("_")+" checkbox1'>[ ]<\/span>";
			}
			return "<li>"+innertempstr+" "+holdobj.count+" from the range "+newarr.id+newarr.desc+"<\/li>\n";
		}
		//Now only strings
		tempstr += "<li><span class='majorchk majorchk_"+(level.concat([i])).join("_")+" checkbox1'>[ ]<\/span> "+newarr.id+newarr.desc+"<\/li>\n";
	}
	tempstr = "<ul>\n"+tempstr+"<\/ul>\n";
	if(holdobj.special){
		tempstr = ""+holdobj.count+" "+holdobj.desc+":\n"+tempstr;
	}else if(level.length || (!level.length && (holdobj.count!=arr.length-1))){
		tempstr = ""+holdobj.count+" "+holdobj.desc+":\n"+tempstr; //the != part find the "2 from following" strings
	}
	if(!level.length) return "<strong>Requirements:<\/strong><br>\n"+tempstr;
	return "<li>"+tempstr+"<\/li>\n";
}

function unhighlightClasses(){
	$("#overridercheck").prop("disabled", true);
	$("#overrider span").css('opacity', 0);
	$(".classdiv").removeClass("classdivhigh classdivlow");
	$('.WireIt-Wire').removeClass("WireIt-Wire-low");
	$("#nowreading").html('Click on a class to see more info.');
}

function classFromJSON(json, loadspeed, replacediv){
	if(loadspeed==undefined) loadspeed = "slow";
	if(json.classterm>16) $(".supersenior.hidden").removeClass("hidden", loadspeed);
	if(json.classterm && json.classterm%4==0) $(".term .termname").eq(json.classterm).fadeIn(loadspeed).parent().slideDown(loadspeed, function(){updateWires();}).siblings(".yearname").addClass("showsummer", loadspeed);
	if(replacediv==undefined){
		$('.term').eq(json.classterm).append(json.div);
	}else{
		replacediv.replaceWith(json.div);
	}
	var id = json.divid;
	var newdiv = $("#"+id);
	if(json.reqs==null) json.reqs=false;
	json.reqstatus = true;
	if(json.override) newdiv.addClass('classdivoverride');
	for(attr in json) newdiv.data(attr, json[attr]);
	newdiv.data("terminals", {
		terminal: new WireIt.Terminal(newdiv[0], {editable: false }),
		wires: []
	});
	return newdiv;
}

function getClass(){
	//pulls down and interprets the class data
	var classterm = $("#getnewclassterm").val();
	if($("input[name='getnewclasstype']:checked").val()=="custom"){
		if(!$("#getnewclassname").val()) return false;
		var data = {getcustom: $("#getnewclassname").val(), getunits: $("#getnewclassunits").val()||0};
	}else{
		if(!$("#getnewclassid").val()) return false;
		var data = {getclass: $("#getnewclassid").val()};
	}
	$("#getnewclass .ui-autocomplete").hide();
	$('.getnewclasstypes input').val('');
	$.getJSON('?', data, function(json){
		if(jQuery.inArray(json,["error","noclass",""])!=-1) return false;
		json.classterm = classterm;
		json.override = false;
		classFromJSON(json);
		addAllWires();
		$('.getnewclasstypes.visible input:first').focus();
		return true;
	});
}

function getClasses(classarr){
	//Used for initial pageload when a hash is present: takes in an array containing objects describing the classes.
	for(i=0;i<classarr.length;i++){
		classFromJSON(classarr[i], 0);
	}
	addAllWires();
}

function newWire(from,to){
	//Defines new wire's properties (black/grey, straight/curved) 
	//partially based on the relative semesters and terms of the two would-be connected classes.
	//from is $() div, to is object with to.div as $() div.
	var fromid = from.attr("id");
	var toid = to.div.attr("id");
	var fromterm = from.data("classterm")+0;
	var toterm = to.div.data("classterm")+0;
	var dterm = Math.abs(fromterm - toterm);
	if(to.coreq==1){
		var options = {color: '#000000', bordercolor:"#000000", borderwidth: 1, width: 1, reqOK:true};
	}else{
		toterm += to.div.data("override")?0:1;
		var options = {color: '#888888', bordercolor:"#B8B8B8", borderwidth: 1, width: 2, reqOK:true};
	}
	if(fromterm < toterm) options = {color: '#ff0000', bordercolor: '#dd0000', borderwidth: 1, width: 1, reqOK:false};
	if(dterm==1 || dterm==2){
		var tempwire = new WireIt.Wire(from.data("terminals").terminal, to.div.data("terminals").terminal, document.body, options);
	}else{
		var tempwire = new WireIt.BezierWire(from.data("terminals").terminal, to.div.data("terminals").terminal, document.body, options);
	}
	from.data("terminals").wires.push(tempwire);
	return (options.reqOK);
}

function checkReqs(arr, callback, callbackargs, level, test){
	//The idea here is to make it possible to loop recursively through a requisite tree and perform callback actions when a class matches
	if(callback==undefined) callback = function(){
		return true; //The default callback is just a return true
	};
	if(callbackargs==undefined) callbackargs = []; //Holds the arguments for callback. "cls" (with quotes) will be replaced with the matched course number before beign fed into callback
	if(test==undefined) test = true;
	if(level==undefined){
		level = []; //Keep track of recursion. 
		globalmatches = [];
	}
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	if(typeof(arr[0])=="number"){
		var matched = {count:(0+arr[0]),special:false};
	}else{
		var matched = $.extend({}, arr[0]);
		matched.special = true;
	}
	if(matched.desc==undefined) matched.desc = "from";
	matched.matches = [];
	var tempstr = []; //""; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	for(var i=1;i<arr.length;i++){
		if($.isArray(arr[i])){
			var req = checkReqs(arr[i], callback, callbackargs, level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			//console.log($(req).eq(0).data("id"));
			if(req[0]){ //If the sub-branch matched its requirements
				//console.log(req[2]);
				if(matched.special){
					$(req[2]).each(function(){
						matched.count -= $(this).data(matched.type);
					});
				}else{
					matched.count--;
				}
			}else{
				tempstr.push(req[1]);
			}
			continue;
		}
		//Let's deal with the objects (for things like coreqs) now.
		if(typeof(arr[i])=="object"){ //Converting both things to objects, but only the coreq ones will have a "coreq":1 thing.
			var newarr = $.extend({}, arr[i]);
		}else{
			var newarr = {id:arr[i]};
		}
		if(newarr.desc==undefined) newarr.desc = "";
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(newarr.id.indexOf("-")!=-1){
			var rangematches = $(".classdiv").filter(function(index){
				var rng = newarr.id.split("-");
				rng = [rng[0].split(".")[0], parseFloat("."+rng[0].split(".")[1]), parseFloat("."+rng[1].split(".")[1])];
				var temp2 = [$(this).data("subject_code"), parseFloat("."+$(this).data("subject_number"))];
				return ((temp2[0]==rng[0]) && (rng[1]<=temp2[1]) && (temp2[1]<=rng[2]));
			}).each(function(){
				if($.inArray(this, globalmatches)!=-1) return true;
				var tempargs = callbackargs.slice();
				var clspos = $.inArray("cls", tempargs);
				if(clspos!=-1){
					tempargs[clspos] = $.extend({},newarr);
					tempargs[clspos].div = $(this);
				}
				var lvlpos = jQuery.inArray("lvl", tempargs);
				if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
				var temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
				if(temp2){
					matched.count -= matched.special?$(this).data(matched.type):1;
					matched.matches.push(this);
					globalmatches.push(this);
				}
				//console.log(matched);
				if(matched.count<=0) return [true, "", level.length?matched.matches:globalmatches];
			});
			return [false, "("+matched.count+" "+matched.desc+": "+((newarr.coreq==1)?"["+newarr.id+"]":newarr.id)+newarr.desc+")", level.length?matched.matches:globalmatches];
		}
		//Now only bona fide classes
		var classmatches = $(".classdiv."+(newarr.id.replace('.','_').replace(':','.')));
		classmatches.each(function(){
			if($.inArray(this, globalmatches)!=-1) return true;
			var tempargs = callbackargs.slice();
			var clspos = $.inArray("cls", tempargs);
			if(clspos!=-1){
				tempargs[clspos] = $.extend({},newarr);
				tempargs[clspos].div = $(this);
			}
			var lvlpos = jQuery.inArray("lvl", tempargs);
			if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
			var temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
			if(temp2){
				matched.count -= matched.special?$(this).data(matched.type):1;
				matched.matches.push(this);
				globalmatches.push(this);
				return false;
			}
		});
		if(!classmatches.length || !temp2){ //If it's not a class, or callback failed, then we need to note that.
			tempstr.push((newarr.coreq==1)?("["+newarr.id+newarr.desc+"]"):(newarr.id+newarr.desc));
		}
		if(matched.count<=0) return [true, "", level.length?matched.matches:globalmatches];
	}
	//return two pieces of info: state and string
	if(matched.count<=0) return [true, "", level.length?matched.matches:globalmatches];
	var tempstr = tempstr.join(", ");
	tempstr = tempstr.replace(/GIR:PHY1/g, "Physics I (GIR)");
	tempstr = tempstr.replace(/GIR:PHY2/g, "Physics II (GIR)");
	tempstr = tempstr.replace(/GIR:CAL1/g, "Calculus I (GIR)");
	tempstr = tempstr.replace(/GIR:CAL2/g, "Calculus II (GIR)");
	tempstr = tempstr.replace(/GIR:BIOL/g, "Biology (GIR)");
	tempstr = tempstr.replace(/GIR:CHEM/g, "Chemistry (GIR)");
	tempstr = tempstr.replace(/GIR:REST/g, "REST Requirement");
	tempstr = tempstr.replace(/GIR:LAB/g, "LAB Requirement");
	tempstr = tempstr.replace(/GIR:LAB2/g, "1/2 LAB Requirement");
	if(matched.special){
		tempstr = "("+matched.count+" "+matched.desc+": "+(JSON.stringify(arr.slice(1)))+")";
	}else if(level.length || (!level.length && (arr[0]!=arr.length-1))){
		tempstr = "("+matched.count+" "+matched.desc+": "+tempstr+")";
	}
	return [false, tempstr, level.length?matched.matches:globalmatches];
	//return [false, tempstr];
}

function addWires(div, addwires){
	//Frankly, this function has outgrown its name. addWires adds everything for a given class and updates its status.
	if(addwires==undefined) var addwires=true;
	div.data("terminals").wires = [];
	div.data("reqstatus", true);
	if(div.data("reqs")!=false){
		var reqcheck = checkReqs(div.data("reqs"), newWire, [div, "cls"]);
		div.data("reqstatus", reqcheck[0]);
		var tempstr = reqcheck[1];
		if(div.data("reqstatus") || div.data("override") || !div.data("classterm")){
			div.find(".reqs").html("Reqs: [X]").removeAttr('title');
		}else{
			div.find(".reqs").html("Reqs: [ ]").attr('title','Need: '+tempstr);
		}
		if(div.data("override")) div.find(".reqs").attr('title','OVERRIDE enabled');
	}
	div.data("checkterm", (div.data("classterm")==0) || (([div.data("fall"), div.data("iap"), div.data("spring"), div.data("summer")])[(div.data("classterm")-1)%4]));
	div.data("checkrepeat", true);
	if($.inArray(div.data("grade_rule"), ['J','U','R'])==-1){
		if($(".classdiv").not(div).filter(function(j){
			return ((($.inArray($(this).data("subject_id"), div.data("equiv_subjects"))!=-1) || $(this).hasClass(div.data("id"))) && (j<i));
		}).length) div.data("checkrepeat", false);
	}
	div.data("status", (((div.data("reqstatus") && div.data("checkrepeat")) || div.data("override")) && (div.data("checkterm"))) || div.data("classterm")==0);
	div.removeClass("classdivgood").removeAttr('title');
	if(div.data("status")) div.addClass("classdivgood");
	if(!div.data("checkrepeat")) div.attr('title', div.data("subject_id")+' is not counting for credit');
	if(!div.data("checkterm")) div.attr('title', div.data("subject_id")+' is not available '+(['in the Fall term', 'during IAP', 'in the Spring term', 'in the Summer term'])[(div.data("classterm")-1)%4]);
	if(div.data("override")) div.find(".coreqs").attr('title','OVERRIDE enabled');
	if($('.classdivhigh').length==1){
		$('.WireIt-Wire').addClass("WireIt-Wire-low");
		for(i in $(".classdivhigh").data("terminals").terminal.wires){
			$($(".classdivhigh").data("terminals").terminal.wires[i].element).removeClass("WireIt-Wire-low");
		}
	}
	return div.data("status");
}

function addAllWires(){
	$(".classdiv").each(function(){
		$(this).data("terminals").terminal.removeAllWires();
		$(this).data("classterm", $(this).parent().index(".term"));
	});
	var status = true;
	$(".classdiv").each(function(){
		if($(this).data("custom")) return true;
		var temp = addWires($(this));
		status = status && temp;
	});
	updateWires();
	checkClasses();
	$("select.majorminor").each(function(){checkMajor(this);});
	$(window).on("beforeunload", runBeforeUnload);
	return status;
}

function updateWires(){
	if(preventUpdateWires) return false;
	$(".classdiv").each(function(){
		$(this).data("terminals").terminal.redrawAllWires();
	});
}

function checkClasses(){
	//This does the work for the left-hand side checklist bar.
	totalUnits = 0;
	$("#COREchecker span.checkbox1").removeAttr('title').each(function(){
		$(this).html('[ ]');
	});
	$(".corecheck").addClass("unused");
	$(".classdiv").each(function(i){
		if(!$(this).data("checkrepeat")) return true;
		var forUnits = true;
		if(!$(this).data("special")){
			totalUnits += $(this).data("total_units");
			return true;
		}
		if($(this).data("gir")){
			var effect = "#COREchecker .corecheck.unused.GIR."+$(this).data("gir")+":first";
			if($(effect).length){
				$(effect).removeClass('unused').addClass('used').attr('title', $(this).data("subject_id")).html('[X]');
				if($(this).data("gir")=="LAB") $(effect).removeClass('unused').addClass('used').attr('title', $(this).data("subject_id")).html('[X]');
				forUnits = false;
			}
		}
		if($(this).data("ci")){
			var effect = "#COREchecker .corecheck.unused.CI."+$(this).data("ci")+":first";
			if($(effect).length){
				$(effect).removeClass('unused').addClass('used').attr('title',$(this).data("subject_id")).html('[X]');
				forUnits = false;
			}
		}
		if($(this).data("hass")){
			var hass = [$(this).data("hass")];
			if(hass[0].indexOf(",")!=-1){
				hass = hass[0].split(",");
			}
			for(i in hass){
				var effect = "#COREchecker .corecheck.unused.HASS."+hass[i]+":first";
				if($(effect).length){
					$(effect).removeClass('unused').addClass('used').attr('title',$(this).data("subject_id")).html('[X]');
					forUnits = false;
				}else{
					if((hass.length>1)&&(i!=(hass.length-1))) continue;
					var effect = "#COREchecker .corecheck.unused.HASS.HE:first";
					if($(effect).length){
						$(effect).removeClass('unused').addClass('used').attr('title',$(this).data("subject_id")).html('[X]');
						forUnits = false;
					}
				}
			}
		}
		if(forUnits) totalUnits += $(this).data("total_units");
	});
	totalUnits = Math.round(100*totalUnits)/100;
	$("#totalunits").html(totalUnits);
}

function minclass(stringify){
	//Creates the storable string which holds our precious class data. Used primarily in saved classes
	if(stringify==undefined) stringify = false;
	var temp = $(".classdiv").map(function(){
		arr = $(this).data("custom")?{name:$(this).data("subject_title"),units:$(this).data("total_units"),custom:true}:{id:$(this).data("subject_id"), year:$(this).data("year")};
		arr.term = $(this).data("classterm");
		arr.override = $(this).data("override");
		return arr;
	}).get();
	return stringify?JSON.stringify(temp):temp;
}

function minmajors(stringify){
	var temp = [$("#choosemajor").val(),$("#choosemajor2").val(),$("#chooseminor").val(),$("#chooseminor2").val()];
	return stringify?JSON.stringify(temp):temp;
}

function deltaDate(){
	//Simply returns a date which is relative to now
	var d = new Date();
	d = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
	for(t in arguments){
		d[t] += arguments[t];
	}
	return new Date(d[0],d[1],d[2],d[3],d[4],d[5],d[6]);
}

function runBeforeUnload(){
	return "Are you sure you want to close CourseRoad? You'll lose any unsaved changes you've made.";
}