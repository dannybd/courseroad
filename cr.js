//Welcome to the cr.js file! Right below this comment you'll see a bunch of major defintions.
//The syntax for these major definitions isn't difficult: it consists of a list, where element 0
//is an integer which provides the number of classes you need from the elements that follow to satisfy
//that branch. Now there's a subtle point here: the lists can then themselves contain further lists.
//Thus, you can say requirements like "18.02, (18.03 or 18.033), and 18.06" as 
//[3, "18.02", [1, "18.03", "18.033"], "18.06"].
//(Note: that leading 3 can be a 0; CourseRoad will interpret that 0 as "all of the following".)

majors = {};
majors["m0"] = [0];
majors["m1_A"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", [1, "1.00", "1.010"], "1.101", "1.102"];
majors["m1_C"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", "1.00", "1.010", "1.011", "1.035", "1.036", "1.041", "1.101", "1.102", [1, "1.015", "1.032", "1.054", "1.124", "1.200", "1.201", "1.252", "1.260", "1.573"]];
majors["m1_E"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", [1, "1.00", "1.010"], "1.061", "1.070", "1.080", "1.083", "1.106", "1.107", [1, "1.801", "11.002", "11.122", "14.01"], "1.101", "1.102", [1, "1.071", "1.64", "1.69", "1.72", "1.731", "1.77", "1.83", "1.89"]];
majors["m2"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.006", "2.008", "2.009", "2.086", "2.670", "2.671", "18.03", "2.THU", [1, "2.007", "2.017"], [1, "2.672", "2.674"], [2, "2.016", "2.017", "2.019", "2.050", "2.092", "2.12", "2.14", "2.184", "2.370", "2.51", "2.60", "2.71", "2.72", "2.793", "2.797", "2.813", "2.96"]];
majors["m2_A"] = [0, "2.001", "2.003", "2.005", "2.009", "2.670", "2.671", "18.03", [2, "2.002", "2.004", "2.006", "2.007", "2.008", "2.086", "2.THU"], [6, "Elective Subjects with Engineering Content"]];
majors["m2_OE"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.016", "2.017", "2.019", "2.086", "2.612", "2.670", "2.671", "18.03", [2, "2.006", "2.007", "2.008", "2.065", "2.092", "2.12", "2.14", "2.51", "2.60", "2.700", "2.72", "2.96", "2.THU"]];
majors["m3"] = [0, "3.012", "3.014", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.01", "3.016"], "3.022", "3.024", "3.032", "3.034", "3.042", "3.044", [1, "3.THU", "3.930"], "3.931", [4, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"]];
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
majors["m10_ENG"] = [0, "5.12", "18.03", "10.10", "10.213", "10.301", "10.302", "10.37", [1, "10.28", "10.26", "10.27", "10.29", "10.467"], [1, [2, "1.106", "1.107"], "2.671", "3.014", "5.310", "5.35", "10.702", "12.335", "20.109"], [1, "1.00", "1.018", "1.080", "3.012", "3.155", "5.12", "5.61", "6.00", "7.03", "8.21"], [4, "Engineering concentration"], [1, "10.THU", [2, "10.490-10.494"], [2, "10.910", [1, "10.492-10.494"]]]];
majors["m11_enviro"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.011", "11.014", "11.016", "11.021", "11.026", "11.122", "11.162", "11.165", "11.168", "1.011", "1.041"], "11.027", "11.THT", "11.THU"];
majors["m11_society"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.013", "11.014", "11.015", "11.016", "11.019", "11.026", "11.150"], "11.027", "11.THT", "11.THU"];
majors["m11_regional"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.003", "11.005", "11.011", "11.025", "11.126", "11.152", "11.164", "11.166"], "11.027", "11.THT", "11.THU"];
majors["m12"] = [0, "12.001", "12.003", "12.009", [1, "18.03", "18.034"], "12.TIP", "12.THU", [1, "12.115", [2, "12.221", "12.222"], "12.307", "12.335", "12.410"], [6, "12.002", "12.005", "12.006", "12.007", "12.008", "12.021", "12.086", "12.021", "12.102", "12.104", "12.108", "12.109", "12.110", "12.113", "12.114", "12.119", "12.120", "12.158", "12.163", "12.170", "12.172", "12.201", "12.207", "12.213", "12.214", "12.301", "12.310", "12.333", "12.340", "12.348", "12.420", "12.425", "12.43", "12.431", "1.00", "1.060", "1.061", "1.080", "3.012", "5.60", "5.03", "5.12", "5.61", "6.00", "7.03", "7.05", "7.21", "8.03", "8.04", "8.044", "8.07", "8.09", "8.21", "12.010", "12.320", "18.04", "18.05", "18.06", "18.100A", "18.100B", "18.100C", "18.311"]];
majors["m14"] = [0, "14.01", "14.02", "14.04", "14.05", "14.30", "14.32", "14.33", "14.THU", [5, "Elective subjects in economics"]];
majors["m15"] = [0, "1.00", "6.041", "14.01", "14.02", "15.053", "15.075", "15.279", "15.301", "15.501", "18.06", [1, "15.354", "15.401", "15.812", "15.761"], [2, "Subects in Finanace, Information Technologies, Marketing Science, Operations Research"]];
majors["m16_1"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [2, "16.100", "16.20", "16.50", "16.90"], [2, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_2"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [3, "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_ENG"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", [1, "18.03", "18.034"], [1, "16.06", "16.07"], [6, "Concentration subjects"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
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

function checkMajor(){
	var val = $("#choosemajor").val();
	if(majors[val]==undefined) majors[val]=[0];
	//console.log(val+": "+majors[val]);
	$("#majorreqs").html(buildMajor());
	if(val!="m0") $("#majorreqs").append("<br>See an error? Let me know <a href=\"mailto:dannybd@mit.edu?subject=[CourseRoad]%20Error%20in%20"+val+"\">here<\/a>.");
	$(".majorchk").removeClass("chk").html("[ ]").removeAttr("title");
	var reqs = checkReqs(majors[val], checkOff, ["lvl", "cls"]);
	if(reqs[0]) reqs[1] = "<strong>Congrats!<\/strong> You've fufilled this major's requirements. (Or I haven't entered all of its data yet.)";
	if(!reqs[0]) reqs[1] = "Still needed: "+reqs[1];
	reqs[1] = "<strong>Major requirements:<\/strong><br>" + reqs[1];
	if(val=="m0") reqs[1] = "";
}

function checkMajor2(){
	var val = $("#choosemajor2").val();
	if(majors[val]==undefined) majors[val]=[0];
	//console.log(val+": "+majors[val]);
	$("#majorreqs2").html(buildMajor2());
	if(val!="m0") $("#majorreqs2").append("<br>See an error? Let me know <a href=\"mailto:dannybd@mit.edu?subject=[CourseRoad]%20Error%20in%20"+val+"\">here<\/a>.");
	$(".majorchk2").removeClass("chk").html("[ ]").removeAttr("title");
	var reqs = checkReqs(majors[val], checkOff2, ["lvl", "cls"]);
	if(reqs[0]) reqs[1] = "<strong>Congrats!<\/strong> You've fufilled this major's requirements. (Or I haven't entered all of its data yet.)";
	if(!reqs[0]) reqs[1] = "Still needed: "+reqs[1];
	reqs[1] = "<strong>Major requirements:<\/strong><br>" + reqs[1];
	if(val=="m0") reqs[1] = "";
}

function checkOff(lvl, cls){ 
	$(".majorchk.majorchk_"+lvl.join("_")+":not(.chk):first").addClass("chk").html("[X]").attr("title",cls); 
	return true;
}

function buildMajor(arr, level){
	if(arr==undefined) arr = majors[$("#choosemajor").val()];
	if(level==undefined) level = []; //Keep track of recursion. 
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	var tempstr = ""; //""; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	//console.log("checkReqs in action: "+arr+" on level "+level);
	for(var i=1;i<arr.length;i++){
		//console.log("i="+i+" yields: "+arr[i]);
		if(typeof(arr[i])=="object"){
			//console.log("it's an object!");
			req = buildMajor(arr[i], level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			//console.log(req);
			tempstr += req;
			continue;
		}
		
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(arr[i].indexOf("-")!=-1){
			var innertempstr = "";
			for(var j=0;j<arr[0];j++){
				innertempstr += "<span class='majorchk majorchk_"+(level.concat([i])).join("_")+" checkbox1'>[&#x2717;]<\/span>";
			}
			return "<li>"+innertempstr+" "+arr[0]+" from the range "+arr[i]+"<\/li>\n";
		}
		//Now only strings
		//console.log("it's a string!");
		tempstr += "<li><span class='majorchk majorchk_"+(level.concat([i])).join("_")+" checkbox1'>[&#x2717;]<\/span> "+arr[i]+"<\/li>\n";
	}
	tempstr = "<ul>\n"+tempstr+"<\/ul>\n";
	if(level.length || (!level.length && (arr[0]!=arr.length-1))) tempstr = ""+arr[0]+" from:\n"+tempstr;
	if(!level.length) return "<strong>Major requirements:<\/strong><br>\n"+tempstr;
	return "<li>"+tempstr+"<\/li>\n";
}

function checkOff2(lvl, cls){ 
	$(".majorchk2.majorchk2_"+lvl.join("_")+":not(.chk):first").addClass("chk").html("[X]").attr("title",cls); 
	return true;
}

function buildMajor2(arr, level){
	if(arr==undefined) arr = majors[$("#choosemajor2").val()];
	if(level==undefined) level = []; //Keep track of recursion. 
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	var tempstr = ""; //""; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	//console.log("checkReqs in action: "+arr+" on level "+level);
	for(var i=1;i<arr.length;i++){
		//console.log("i="+i+" yields: "+arr[i]);
		if(typeof(arr[i])=="object"){
			//console.log("it's an object!");
			req = buildMajor(arr[i], level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			//console.log(req);
			tempstr += req;
			continue;
		}
		
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(arr[i].indexOf("-")!=-1){
			var innertempstr = "";
			for(var j=0;j<arr[0];j++){
				innertempstr += "<span class='majorchk2 majorchk2_"+(level.concat([i])).join("_")+" checkbox1'>[ ]<\/span>";
			}
			return "<li>"+innertempstr+" "+arr[0]+" from the range "+arr[i]+"<\/li>\n";
		}
		//Now only strings
		//console.log("it's a string!");
		tempstr += "<li><span class='majorchk2 majorchk2_"+(level.concat([i])).join("_")+" checkbox1'>[ ]<\/span> "+arr[i]+"<\/li>\n";
	}
	tempstr = "<ul>\n"+tempstr+"<\/ul>\n";
	if(level.length || (!level.length && (arr[0]!=arr.length-1))) tempstr = ""+arr[0]+" from:\n"+tempstr;
	if(!level.length && arr!=[0]) return "<strong>Second major requirements:<\/strong><br>\n"+tempstr;
	return "<li>"+tempstr+"<\/li>\n";
}

function getClasses(classarr){
	//Takes a list of classes and runs getClass on each.
	loadingclasses = classarr.length;
	for(i=0;i<classarr.length;i++){
		getClass(classarr[i][0], classarr[i][1], classarr[i][2], (i!=classarr.length-1));
	}
}

function getClass(classid, classterm, override, ignore){
	//pulls down and interprets the class data
	if(override==undefined) override = false;
	if(ignore==undefined) ignore = false;
	$.getJSON('?getclass='+classid, function(json){
		if(jQuery.inArray(json,["error","noclass",""])!=-1) return false;
		if(jQuery.inArray(classes[json.id],["",undefined,{}])==-1 && (classes[json.id]!=undefined)) return false;
		$('.term').eq(classterm).append(json.div);
		/*
		//code from a disabled feature...hopefully returning at some point.
		easyrec_view({
			userId: USERID, 
			sessionId: SESSIONID, 
			itemId: json.id, 
			itemDescription: encodeURIComponent(json.title), 
			itemUrl: "http://student.mit.edu/catalog/search.cgi?search="+json.course
		});
		//*/
		json.REST = (json.REST=="1");
		json.LAB = parseInt(json.LAB);
		json.classterm = classterm;
		json.override = override;
		if(json.imgdata==null) json.imgdata=false;
		if(json.prereq==null) json.prereq=false;
		if(json.coreq==null) json.coreq=false;
		json.prereqstatus = true;
		json.coreqstatus = true;
		if(json.override) $("#"+json.id).addClass('classdivoverride');
		classes[json.id] = json;
		loadClass(json.id, ignore);
	});
	return false;
}

function loadClasses(newclasses){
	classes = newclasses.slice();
	loadingclasses = classes.length;
	$(".classdiv, canvas").remove();
	for(cls in classes){
		$('.term').eq(classes[cls].classterm).append(classes[cls].div);
		loadClass(cls, true);
	}
}

function loadClass(id, ignore){
	classes[id].block = YAHOO.util.Dom.get(id);
	terminals[id] = {};
	terminals[id].terminal = new WireIt.Terminal(classes[id].block, {editable: false });
	terminals[id].wires = [];
	if(!ignore){
		addAllWires();
		setTimeout('addAllWires();', 800);
		$('#getnewclassid').focus();
	}
	loadingclasses--;
}

function isClass(cls){
	//Checks to see if a class has been added to the page and in so tries to find it and return it.
	if(cls.indexOf("-")!=-1){
		var rng = cls.split("-");
		rng = [rng[0].split(".")[0], parseFloat("."+rng[0].split(".")[1]), parseFloat("."+rng[1].split(".")[1])];
		var tempcourses = lowAttr(classes, "course");
		var temp = [];
		for(var co in tempcourses){
			var temp2 = [tempcourses[co].split(".")[0], parseFloat("."+tempcourses[co].split(".")[1])];
			if((temp2[0]==rng[0]) && (rng[1]<=temp2[1]) && (temp2[1]<=rng[2])) temp.push(tempcourses[co]);
		}
		/*
		var temp = lowAttr(classes,"course").filter(function(element, index, array){ 
			var temp2 = [element.split(".")[0], parseFloat("."+element.split(".")[1])];
			return ((temp2[0]==rng[0]) && (rng[1]<=temp2[1]) && (temp2[1]<=rng[2]));
		});
		//*/
		return temp;
	}
	if(gir.SCI[cls]!=undefined) return gir.SCI[cls];
	return (jQuery.inArray(cls.toUpperCase(),lowAttr(classes,"course"))!=-1)?cls.toUpperCase():false;
}

function newWire(from,to,coreq){
	//Defines new wire's properties (black/grey, straight/curved) 
	//partially based on the relative semesters and terms of the two would-be connected classes.
	if(coreq==undefined) coreq = false;
	fromid = from.replace('.','_');
	toid = to.replace('.','_');
	fromterm = classes[fromid].classterm+0;
	toterm = classes[toid].classterm+0;
	dterm = Math.abs(fromterm - toterm);
	if(coreq){
		options = {color: '#000000', bordercolor:"#000000", borderwidth: 1, width: 1, reqerror:false};
		//if(fromterm < toterm) options = {color: '#ff0000', bordercolor: '#ff0000', borderwidth: 1, width: 1, reqerror:true};
	}else{
		toterm += classes[toid].override?0:1;
		options = {color: '#888888', bordercolor:"#B8B8B8", borderwidth: 1, width: 2, reqerror:false};
		//if(fromterm < toterm) options = {color: '#ff0000', bordercolor: '#dd0000', borderwidth: 1, width: 1, reqerror:true};
	}
	if(dterm==1 || dterm==2){
		tempwire = new WireIt.Wire(terminals[fromid].terminal, terminals[toid].terminal, document.body, options);
	}else{
		tempwire = new WireIt.BezierWire(terminals[fromid].terminal, terminals[toid].terminal, document.body, options);
	}
	tempwire.redraw();
	terminals[fromid].wires.push(tempwire);
	return (!options["reqerror"]);
}

function checkReqs(arr, callback, callbackargs, level){
	//The idea here is to make it possible to loop recursively through a requisite tree and perform callback actions when a class matches
	if(callback==undefined) callback = function(){
		return true; //The default callback is just a return true
	};
	if(callbackargs==undefined) callbackargs = []; //Holds the arguments for callback. "cls" (with quotes) will be replaced with the matched course number before beign fed into callback
	if(level==undefined){
		level = []; //Keep track of recursion. 
		matches = [];
	}
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	var matched = 0+arr[0]; //How many requirements in this requisite branch have been met?
	var tempstr = []; //""; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	for(var i=1;i<arr.length;i++){
		if(typeof(arr[i])=="object"){
			req = checkReqs(arr[i], callback, callbackargs, level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			if(req[0]){ //If the sub-branch matched its requirements
				matched--;
			}else{
				tempstr.push(req[1]);
			}
			continue;
		}
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(arr[i].indexOf("-")!=-1){
			rangematches = isClass(arr[i]);
			for(var j=0;j<rangematches.length;j++){
				if(jQuery.inArray(rangematches[j].replace('.','_'), matches)!=-1) continue;
				tempargs = callbackargs.slice();
				clspos = jQuery.inArray("cls", tempargs);
				if(clspos!=-1) tempargs[clspos] = rangematches[j];
				lvlpos = jQuery.inArray("lvl", tempargs);
				if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
				temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
				if(temp2){
					matched--;
					matches.push(rangematches[j].replace('.','_'));
				}
				if(matched<=0) return [true, ""];
			}
			if(matched>0){
				return [false, "("+matched+" from: "+arr[i]+")"];
			}else{
				return [true, ""];
			}
		}
		//Now only strings
		if(isClass(arr[i])){
			if(jQuery.inArray(isClass(arr[i]).replace('.','_'), matches)!=-1) continue;
			tempargs = callbackargs.slice(); //We don't want to alter the callbackargs, only swap out "cls" for, say, "18.03".
			clspos = jQuery.inArray("cls", tempargs);
			if(clspos!=-1) tempargs[clspos] = isClass(arr[i]);
			lvlpos = jQuery.inArray("lvl", tempargs);
			if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
			temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
			if(temp2){
				matched--;
				matches.push(isClass(arr[i]).replace('.','_'));
			}
		}
		if(!isClass(arr[i]) || !temp2){ //If it's not a class, or callback failed, then we need to note that.
			tempstr.push(arr[i]);
		}
		if(matched<=0) return [true, ""];
	}
	//return two pieces of info: state and string
	if(matched<=0) return [true, ""];
	tempstr = tempstr.join(", ");
	if((level.length || (!level.length && (arr[0]!=arr.length-1))) && matched>0) tempstr = "("+matched+" from: "+tempstr+")";
	if(!level.length) return [false, tempstr, matches];
	return [false, tempstr];
}
function addWires(id, addwires){
	//Frankly, this function has outgrown its name. addWires adds everything for a given class and updates its status.
	if(addwires==undefined) addwires=true;
	if(classes[id]==undefined) return false;
	terminals[id].wires = [];
	classes[id].prereqstatus = true;
	if(classes[id].prereq!=false){
		prereqcheck = checkReqs(classes[id].prereq, newWire, [""+id, "cls"]);
		classes[id].prereqstatus = prereqcheck[0];
		tempstr = prereqcheck[1];
	}
	if(classes[id].prereqstatus || classes[id].override || !classes[id].classterm){
		$("#"+id+" .prereqs").html("Prereqs: [X]").removeAttr('title');
	}else{
		$("#"+id+" .prereqs").html("Prereqs: [ ]").attr('title','Need: '+tempstr);
	}
	if(classes[id].override) $("#"+id+" .prereqs").attr('title','OVERRIDE enabled');
	classes[id].coreqstatus = true;
	//console.log(classes[id]);
	if(classes[id].coreq!=false){
		coreqcheck = checkReqs(classes[id].coreq, newWire, [""+id, "cls", true]);
		classes[id].coreqstatus = coreqcheck[0];
		tempstr = coreqcheck[1];
	}
	if(classes[id].coreqstatus || classes[id].override || !classes[id].classterm){
		$("#"+id+" .coreqs").html("Coreqs: [X]").removeAttr('title');
	}else{
		$("#"+id+" .coreqs").html("Coreqs: [ ]").attr('title','Need: '+tempstr);
	}
	classes[id].checkterm = (classes[id].classterm==0) || (([classes[id].fall, classes[id].iap, classes[id].spring])[(classes[id].classterm-1)%3]=="1");
	classes[id].status = (((classes[id].prereqstatus && classes[id].coreqstatus) || classes[id].override) && (classes[id].checkterm)) || classes[id].classterm==0;
	$("#"+id).removeClass("classdivgood");
	$("#"+id).removeAttr('title');
	if(classes[id].status) $("#"+id).addClass("classdivgood");
	if(!classes[id].checkterm) $("#"+id).attr('title', classes[id].course+' is not available '+(['in the Fall term', 'during IAP', 'in the Spring term'])[(classes[id].classterm-1)%3]);
	if(classes[id].override) $("#"+id+" .coreqs").attr('title','OVERRIDE enabled');
	terminals[id].terminal.redrawAllWires();
	if($('.classdivhigh').length==1){
		$('.WireIt-Wire').addClass("WireIt-Wire-low");
		for(i in terminals[$(".classdivhigh").attr("id")].terminal.wires){
			$(terminals[$(".classdivhigh").attr("id")].terminal.wires[i].element).removeClass("WireIt-Wire-low");
		}
	}
	return classes[id].status;
}

function addAllWires(){
	for(term in terminals){
		terminals[term].terminal.removeAllWires();
	}
	checkClasses();
	status = true;
	$(".classdiv").each(function(){
		classes[$(this).attr('id')].classterm = $(".term").index($(this).parent());
		temp = addWires($(this).attr('id'));
		status = status && temp;
	});
	checkClasses();
	return status;
}

function checkClasses(){
	//This does the work for the left-hand side checklist bar.
	gir = {};
	gir.SCI = {};
	gir.CI = [];
	gir.REST = [];
	gir.LAB = [];
	gir.HASS = {};
	gir.HASS2 = [];
	gir.totalUnits = 0;
	$("#COREchecker span").removeAttr('title').each(function(){
		$(this).html('[ ]');
	});
	$("#COREchecker .coreCI, #COREchecker .coreREST, #COREchecker .coreLAB, #COREchecker .coreHASSE").removeClass('oneLeft').addClass('oneLeft');
	for(cls in classes){
		if(classes[cls]==undefined || jQuery.isEmptyObject(classes[cls])) continue;
		forUnits = true;
		if(classes[cls].isGIR=="0"){
			gir.totalUnits += parseInt(classes[cls].units);
			continue;
		}
		used = true;
		if(classes[cls].SCI && gir.SCI[classes[cls].SCI]==undefined){
			gir.SCI[classes[cls].SCI] = classes[cls].id;
			$("#COREchecker #"+classes[cls].SCI.replace(/ /g,'_')).addClass('done').attr('title',classes[cls].course).html('[X]');
			forUnits = false;
		}
		if(classes[cls].CI && gir.CI.length<2){
			gir.CI.push(classes[cls].id);
			$("#COREchecker .coreCI.oneLeft:first").removeClass("oneLeft").attr('title',classes[cls].course).html("[X]");
			forUnits = false;
		}
		if(classes[cls].REST && gir.REST.length<2){
			gir.REST.push(classes[cls].id);
			$("#COREchecker .coreREST.oneLeft:first").removeClass("oneLeft").attr('title',classes[cls].course).html("[X]");
			forUnits = false;
		}
		if(classes[cls].LAB && gir.LAB.length<2){
			gir.LAB.push(classes[cls].id);
			$("#COREchecker .coreLAB.oneLeft:first").removeClass("oneLeft").attr('title',classes[cls].course).html("[X]");
			if(classes[cls].LAB==12){
				$("#COREchecker .coreLAB.oneLeft:first").removeClass("oneLeft").attr('title',classes[cls].course).html("[X]");
			}
			forUnits = false;
		}
		if(classes[cls].HASS){
			if(classes[cls].HASS!="HASS Elective" && gir.HASS[classes[cls].HASS]==undefined){
				gir.HASS[classes[cls].HASS] = classes[cls].id;
				$("#COREchecker #"+classes[cls].HASS.replace(/ /g,'_')).addClass('done').attr('title',classes[cls].course).html('[X]');
				forUnits = false;
			}else if(gir.HASS2.length<5){
				gir.HASS2.push(classes[cls].id);
				$("#COREchecker .coreHASSE.oneLeft:first").removeClass("oneLeft").attr('title',classes[cls].course).html("[X]");
				forUnits = false;
			}
		}
		if(forUnits) gir.totalUnits += parseInt(classes[cls].units);
	}
	$("#totalunits").html(gir.totalUnits);
	checkMajor();
}

function lowAttr(arr, attr, map, clean){
	//Returns an array whose elements are the attributes of all of the elements of a given object.
	//Think finding a list of unit counts or something.
	if(map==undefined) map = false;
	if(clean==undefined) clean = false;
	temp = map?{}:[];
	for(el in arr){
		if(map){
			temp[el] = arr[el][attr];
		}else{
			temp.push(arr[el][attr]);
		}
	}
	if(clean) return temp.filter(String);
	return temp;
}

function minclass(stringify){
	//Creates the storable string which holds our precious class data. Used primarily in saved classes
	if(stringify==undefined) stringify = false;
	temp = [];
	for(cls in classes){
		temp.push([classes[cls].course, classes[cls].classterm, classes[cls].override]);
	}
	temp = temp.sort(function(a,b){return a[0]-b[0]});
	if(stringify){
		for(i in temp){
			temp[i][0] = '"'+temp[i][0]+'"';
			temp[i] = '['+temp[i].join(',')+']';
		}
		temp = '['+temp.join(',')+']';
	}
	return temp;
}

function deltaDate(){
	//Simply returns a date which is relative to now
	d = new Date();
	d = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
	for(t in arguments){
		d[t] += arguments[t];
	}
	return new Date(d[0],d[1],d[2],d[3],d[4],d[5],d[6]);
}
