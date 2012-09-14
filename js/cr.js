/********************
Welcome to the cr.js file! Right below this comment you'll see a bunch of major defintions.
The syntax for these major definitions isn't difficult: it consists of a list, where element 0
is an integer which provides the condition you need from the elements that follow to satisfy
that branch. Most of the time, this condition is a number: this means that n of the following
classes must be present and correct (which is defined later) in order for that "branch" of the
list to be valid. Alternative conditions are stored as objects, of the form:
{count:42, type:"total_units", desc:"units from", special:1}
which means that the present and correct classes must add up to at least 42 units.

There's a subtle point here: the lists can then themselves contain further lists.
Thus, you can say requirements like "18.02, (18.03 or 18.033), and 18.06" as 
[3, "18.02", [1, "18.03", "18.033"], "18.06"].
(Note, that leading 3 can be a 0: CourseRoad will interpret that 0 as "all of the following".)

Individual strings for subjects can be replaced with objects, if additional details are needed. This is primarily evident in certain cases:
	- Coreqs: {id: "18.03", coreq: 1}
	- Ranges: {id: "18.03-18.06", range: 1, dept: "18", from:"03", to:"06"}
	- Descriptions: {id: "18.03", desc: "(optional)"}
	- Skip: {id: "Just a marker; ignore me", skip: 1}
*********************/

majors = {};
majors["m0"] = [0];
majors["m1_A"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", [1, "1.00", "1.010"], "1.101", "1.102"];
majors["m1_C"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", "1.00", "1.010", "1.011", "1.035", "1.036", "1.041", "1.101", "1.102", [1, "1.015", "1.032", "1.054", "1.124", "1.200", "1.201", "1.252", "1.260", "1.573"]];
majors["m1_E"] = [0, "1.018", "1.020", "1.050", "1.060", "18.03", "1.013", [1, "1.00", "1.010"], "1.061", "1.070", "1.080", "1.083", "1.106", "1.107", [1, "1.801", "11.002", "11.122", "14.01"], "1.101", "1.102", [1, "1.071", "1.64", "1.69", "1.72", "1.731", "1.77", "1.83", "1.89"]];
majors["m2"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.006", "2.008", "2.009", "2.086", "2.670", "2.671", "18.03", "2.THU", [1, "2.007", "2.017"], [1, "2.672", "2.674"], [2, "2.016", "2.017", "2.019", "2.050", "2.092", "2.12", "2.14", "2.184", "2.370", "2.51", "2.60", "2.71", "2.72", "2.793", "2.797", "2.813", "2.96"]];
majors["m2_A_old"] = [0, "2.001", "2.003", "2.005", "2.009", "2.670", "2.671", "18.03", [2, "2.002", "2.004", "2.006", "2.007", "2.008", "2.086", "2.THU"], {id:"6 Elective Subjects with Engineering Content",skip:1}];
majors["m2_A_new"] = [0, [1, "2.00", "2.00B"], "2.678", "2.087", "2.090", "2.01", [1, "2.02A", "2.02B"], "2.03", [1, "2.04A", "2.04B"], "2.05", "2.051", "2.06", "2.671", "2.009", {id:"6 subjects forming a 2A Concentration",skip:1}];
majors["m2_OE"] = [0, "2.001", "2.002", "2.003", "2.004", "2.005", "2.016", "2.017", "2.019", "2.086", "2.612", "2.670", "2.671", "18.03", [2, "2.006", "2.007", "2.008", "2.065", "2.092", "2.12", "2.14", "2.51", "2.60", "2.700", "2.72", "2.96", "2.THU"]];
majors["m3"] = [0, [{count:2,desc:"(for CI-M) from",globalskip:1}, "3.014", "3.042", "3.155"], "3.012", "3.014", [1, "18.03", "18.034", "3.016"], [1, "3.021", "1.00", "6.01", "3.016"], "3.022", "3.024", "3.032", "3.034", "3.042", "3.044", [1, "3.THU", [2, "3.930", "3.931"]], [4, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"]];
majors["m3_A"] = [0, [5, "3.012", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.01"], "3.022", "3.024", "3.032", "3.034", "3.042", "3.044"], "3.014", [3, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"], {id:"6 Planned electives appropriate to the student's stated goals",skip:1}];
majors["m3_C"] = [0, "3.012", "3.014", [1, "3.016", "18.03", "18.034"], [1, "3.021", "1.00", "6.01"], "3.022", [1, "3.032", "3.044"], "3.THU", "3.985", "3.986", "3.987", "3.990", "12.001", [1, "12.110", "12.119"], "21A.100", [1, "3.07", "3.14", "3.051", "3.052"], [1, "3.982", "3.983", "3.984", "3.988"]];
majors["m4_archdesign"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.113", "4.114", "4.115", "4.440", "4.603", "4.605", [1, "4.116", {id:"2 Classes from other streams",skip:1}]];
majors["m4_buildingtech"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.411", "4.440", "4.605", "4.THT", "4.THU", {id:"4 Classes in Building Tech",skip:1}, {id:"1 Class from the other streams",skip:1}];
majors["m4_computation"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.501", "4.503", "4.504", "4.505", "4.605", "4.THT", "4.THU", {id:"1 Class in Computation",skip:1}];
majors["m4_history"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.601", "4.605", [1, "4.602", "4.641", "4.651"], [1, "4.613", "4.614"], "4.THT", "4.THU", {id:"3 Classes in History, Theory and Criticism",skip:1}, {id:"1 Class from Art, Culture and Technology",skip:1}];
majors["m4_artculture"] = [0, [0, "4.111", "4.11A"], "4.112", "4.302", "4.401", "4.500", "4.322", "4.341", "4.351", "4.601", "4.THT", "4.THU", {id:"3 Classes in Art, Culture and Technology",skip:1}, {id:"1 Class from History, Theory and Criticism",skip:1}];
majors["m5"] = [0, "5.03", "5.07", [1, "5.111", "5.112"], "5.12", "5.13", "5.35", "5.36", "5.37", "5.38", {id:"Note: CourseRoad doesn't currently recognize the 5.35-38 module behavior. Try using 0-unit custom classes to mark where the modules <em>should</em> be.",skip:1}, "5.60", "5.61", [2, "5.04", "5.08", "5.43", "5.62"]];
//majors["m5"] = [0, [3, {id:"8.03-07",range:1,dept:"8",from:"03",to:"07"}, "8.012", "8.022"]];
majors["m6_1"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], [1, "6.041", "18.440"], [1, [1, {id:"6.100-182",range:1,dept:"6",from:"100",to:"182"}], {id:"CS lab",skip:1}, [2, {id:"6.021",globalskip:1}, "6.022"]], [3, "6.002", "6.003", "6.004", "6.007"], [{count:3,globalskip:1}, "6.011", "6.012", "6.013", "6.021"], {id:"2 from dept. list of advanced undergraduate subjects",skip:1}, [1, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"]];
majors["m6_2"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], [1, "6.041", "18.440", "6.042"], [2, "6.002", "6.003", "6.007", "6.004"], [2, "6.005", "6.006", "6.004"], [1, "6.011", "6.012", "6.013", "6.021"], [1, "6.033", "6.034", "6.046"], [{count:1,globalskip:1}, "6.011", "6.012", "6.013", "6.021", "6.033", "6.034", "6.046"], [1, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"], [1, [1, {id:"6.100-182",range:1,dept:"6",from:"100",to:"182"}], {id:"CS lab",skip:1}, [2, {id:"6.021",globalskip:1}, "6.022"]], {id:"2 from dept. list of advanced undergraduate subjects",skip:1}];
majors["m6_3"] = [0, "6.01", "6.02", "6.UAT", "6.UAP", [1, "18.03", "18.06"], "6.042",  [{count:1,globalskip:1}, "6.172", "6.035", "6.141", "6.813", "6.828"], [3, "6.004", "6.005", "6.006"], [{count:3,globalskip:1}, "6.033", "6.034", "6.046"], [2, "6.022", "6.023", "6.035", "6.045", "6.047", "6.049", "6.061", "6.077", "6.111", "6.115", "6.131", "6.141", "6.142", "6.172", "6.173", "6.207", "6.301", "6.302", "6.336", "6.341", "6.434", "6.502", "6.503", "6.602", "6.608", "6.641", "6.701", "6.717", "6.801", "6.802", "6.803", "6.804", "6.805", "6.813", "6.814", "6.815", "6.824", "6.825", "6.837", "6.840", "6.854", "6.857", "6.858", "6.863", "6.867", "16.36"], [{count:1,desc:"(for CI-M) from"}, "6.021", "6.033", "6.101", "6.111", "6.115", "6.131", "6.141", "6.152", "6.161", "6.163", "6.173", "6.182", "6.805"]];
majors["m6_7"] = [0, [1, "18.03", "18.06"], "6.01", "6.042", "5.12", [1, "5.60", "7.10", "20.110"], [1, "7.02", "20.109"], "6.005", "6.006", "6.046", "7.03", "7.06", [1, "7.05", "5.07"], [1, "6.047", "6.048", "6.503", "6.802", "7.36"], [1, "7.20", "7.23", "7.27", "7.28", "7.33"], "6.UAP", "6.UAT"];
majors["m7"] = [0, "5.12", [1, "20.110", "7.10", "5.60"], [1, "7.02", "20.109"], "7.03", [1, "7.05", "5.07"], "7.06", [3, {id:"7.08-37",range:1,dept:"7",from:"08",to:"37"}], [1, "7.13", "7.16", "7.18"]];
majors["m7a"] = [0, [1, "5.111", "5.112", "3.091"], [1, "20.110", "7.10", "5.60"], [1, 
"7.012", "7.013", "7.014"], [1, "7.02", "20.109"], "7.03", [1, "5.07", "7.05"], "7.06", [3, "7.08", "7.20", "7.21", "7.22", "7.23", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30", "7.31", "7.32", "7.33", "7.35", "7.36", "7.37", "7.41", "7.49"], [1, "3.014", "5.36", "5.38", {id:"Note: CourseRoad doesn't currently recognize the 5.35-38 module behavior. Try using 0-unit custom classes to mark where the modules <em>should</em> be.",skip:1}, "7.19", "7.30", "7.49", "8.13", "9.02", "9.12", "10.26", "10.27", "10.28", "10.29", "20.380", "6.021"]];
majors["m8_flexible"] = [0, "8.03", [1, "18.03", "18.034"], "8.04", "8.044", [1, "8.21", "8.223"], [1, "8.05", "8.20", "8.033"], [1, "8.13", {id:"8.THU",desc:"*"}, {id:"another lab",desc:"*",skip:1}, {id:"an experimentally oriented summer internship",desc:"*",skip:1}, {id:"* = (plus permission of department)",skip:1}], [1, {id:"8.03-999",range:1,dept:"8",from:"03",to:"999"}], {id:"3 other subjects forming a coherent unit in some area (plus permission of department)",skip:1}, [{count:2,desc:"(CI-M) from",globalskip:1,globalignore:1}, "8.06", "8.13", "8.225", "8.226", "8.287"]];
majors["m8_focused"] = [0, "8.03", [1, "18.03", "18.034"], "8.04", "8.044", "8.033", "8.05", {id:"8.06",desc:" (CI-13",desc:" (CI-M)"}, "8.14", "8.223", "8.THU", [1, {id:"18.04-999",range:1,dept:"18",from:"04",to:"999"}], [1, "8.07", "8.08", "8.09"], [1, {id:"8.03-999",range:1,dept:"8",from:"03",to:"999"}]];
//majors["m9"] = [0, "9.00", "9.01", "9.07", [6, "9.34", "9.37", "9.56", "9.57", "9.59", "9.65", "9.66", "9.85", "24.900", "9.10", "9.20", "9.22", "9.35", "9.71", "9.03", "9.04", "9.05", "9.09", "9.14", "9.15", "9.18", "9.24", "9.29", "9.31"], [1, "9.02", "9.12", "9.63"], [1, "9.URG", "9.02", "9.12", "9.41", "9.50", "9.63"]];
majors["m9"] = [0, "9.00", "9.01", "9.06", [1, "9.07", "18.05"], "6.00", [{count:5,desc:"(any combination is fine but but at least one subject must be in a second area) from"}, {id:"Cognitive Science:",skip:1}, "9.34", "9.37", "9.56", "9.57", "9.65", "9.66", "9.85", "24.900", {id:"Cognitive Neuroscience",skip:1}, "9.10", "9.20", "9.35", "9.71", {id:"Neuroscience:",skip:1}, "9.03", "9.04", "9.09", "9.14", "9.15", "9.18", "9.29", "9.31"], [1, "9.02", "9.12", "9.59", "9.63"], [1, "9.URG", "9.02", "9.12", "9.41", "9.50", "9.59", "9.61"], {id:"One relevant subject to be arranged with advisor",skip:1}];
majors["m10"] = [0, "5.12", [1, "5.07", "7.05"], "5.310", "5.60", "10.10", "10.213", [1, "10.28", "10.26", "10.27", "10.29"], "10.301", "10.302", "10.32", "10.37", "10.490", "10.491", [2, "10.492", "10.493", "10.494"], [1, "18.03", "18.034"], [1, [1, {id:"10.001-039",range:1,dept:"10",from:"001",to:"039"}], [1, {id:"10.401-791",range:1,dept:"10",from:"401",to:"791"}], [1, {id:"10.793-800",range:1,dept:"10",from:"793",to:"800"}], [1, {id:"10.817-899",range:1,dept:"10",from:"817",to:"899"}]], [1, "3.014", "5.36", {id:"Note: CourseRoad doesn't currently recognize the 5.35-38 module behavior. Try using 0-unit custom classes to mark where the modules <em>should</em> be.",skip:1}, "6.152", "10.28", "10.467", "10.702", "10.26", "10.27", "10.29"]];
majors["m10_B"] = [0, "5.12", "5.60", [1, "7.02", "10.702"], "7.03", [1, "5.07", "7.05"], "7.06", "10.10", "10.213", [1, "10.28", "10.26", "10.27", "10.29"], "10.301", "10.302", "10.37", "10.490", "10.491", [2, "10.492", "10.493", "10.494"], [1, "18.03", "18.034"]];
majors["m10_ENG"] = [0, "5.12", "18.03", "10.10", "10.213", "10.301", "10.302", "10.37", [1, "10.28", "10.26", "10.27", "10.29", "10.467"], [1, [2, "1.106", "1.107"], "2.671", "3.014", "5.310", "5.35", {id:"Note: CourseRoad doesn't currently recognize the 5.35-38 module behavior. Try using 0-unit custom classes to mark where the modules <em>should</em> be.",skip:1}, "10.702", "12.335", "20.109"], [1, "1.00", "1.018", "1.080", "3.012", "3.155", "5.12", "5.61", "6.00", "7.03", "8.21"], {id:"4 Engineering concentration",skip:1}, [1, "10.THU", [{count:12,type:"total_units",desc:"units from",special:1}, {id:"10.490-494",range:1,dept:"10",from:"490",to:"494"}], [2, "10.910", [1, {id:"10.492-494",range:1,dept:"10",from:"492",to:"494"}]]]];
majors["m11_enviro"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.011", "11.014", "11.016", "11.021", "11.026", "11.122", "11.162", "11.165", "11.168", "1.011", "1.041"], "11.027", "11.THT", "11.THU"];
majors["m11_society"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.013", "11.014", "11.015", "11.016", "11.019", "11.026", "11.150"], "11.027", "11.THT", "11.THU"];
majors["m11_regional"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.003", "11.005", "11.011", "11.025", "11.126", "11.152", "11.164", "11.166"], "11.027", "11.THT", "11.THU"];
majors["m11_international"] = [0, "11.001", "11.002", "11.123", "14.01", "11.188", [5, "11.005", "11.025", "11.140", "11.144", "11.147", "11.164", "11.165", "11.166"], "11.027", "11.THT", "11.THU"];
majors["m12"] = [0, "12.001", "12.003", "12.009", [1, "18.03", "18.034"], "12.TIP", "12.THU", [1, "12.115", [2, "12.221", "12.222"], "12.307", "12.335", "12.410"], [{count:72,type:"total_units",desc:"units from",special:1}, [{count:24,type:"total_units",desc:"units (at least) from",special:1}, "12.002", "12.005", "12.006", "12.007", "12.008", "12.021", "12.086", "12.021", "12.102", "12.104", "12.108", "12.109", "12.110", "12.113", "12.114", "12.119", "12.120", "12.158", "12.163", "12.170", "12.172", "12.201", "12.207", "12.213", "12.214", "12.301", "12.310", "12.333", "12.340", "12.348", "12.420", "12.425", "12.43", "12.431"], [{count:48,type:"total_units",desc:"units (at MAX) from",special:1}, "1.00", "1.060", "1.061", "1.080", "3.012", "5.60", "5.03", "5.12", "5.61", "6.00", "7.03", "7.05", "7.21", "8.03", "8.04", "8.044", "8.07", "8.09", "8.21", "12.010", "12.320", "18.04", "18.05", "18.06", "18.100A", "18.100B", "18.100C", "18.311"]]];
majors["m14"] = [0, "14.01", "14.02", "14.04", "14.05", "14.30", "14.32", "14.33", "14.THU", [{count:60,type:"total_units",desc:"units from",special:1}, {id:"Elective subjects in economics",skip:1}]];
majors["m15"] = [0, [1, "1.00", "6.005"], [1, "6.041", "18.440"], "14.01", "14.02", [1, "15.053", "15.058"], [1, "15.075", "18.443"], "15.279", "15.301", "15.501", "18.06", [1, "15.354", "15.401", "15.812", "15.761"], {id:"2 Subjects in Finanace, Information Technologies, Marketing Science, Operations Research",skip:1}];
majors["m16_1"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [2, "16.20", "16.50", "16.90", "16.100"], [2, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_2"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", "16.06", "16.07", [1, "16.09", "6.041"], [1, "18.03", "18.034"], [3, "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.100", "16.20", "16.50", "16.90", "16.30", "6.111", "16.35", "16.36", "16.400", "16.410"], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m16_ENG"] = [0, "16.001", "16.002", "16.003", "16.004", "1.00", [1, "18.03", "18.034"], [1, "16.06", "16.07"], [{count:42,type:"total_units",desc:"units from",special:1}, {id:"Engineering concentration electives",skip:1}], [{count:12,type:"total_units",desc:"units from",special:1}, {id:"Math or science concentration electives",skip:1}], [{count:18,type:"total_units",desc:"units from",special:1}, {id:"Other concentration electives",skip:1}], [1, "16.82", "16.83"], [1, [2, "16.621", "16.622"], "16.821", "16.831"]];
majors["m17"] = [0, "17.869", "17.871", "17.THT", "17.THU", [1, {id:"17.00-099",range:1,dept:"17",from:"00",to:"099"}], [1, {id:"17.20-299",range:1,dept:"17",from:"20",to:"299"}], [1, {id:"17.30-40-599",range:1,dept:"17",from:"40",to:"599"}], {id:"3 Additional political science subjects representing a coherent plan of study",skip:1}];
//majors["m18_general"] = [0, [1, "18.03", "18.034"], [1, [{count:2,globalskip:1,runinfull:1}, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "8.06", "14.33", "18.100C", "18.310"]]], [1, "18.06", "18.700", "18.701"], [6, {id:"18.100-999",range:1,dept:"18",from:"100",to:"999"}], [2, {id:"18.04-999",range:1,dept:"18",from:"04",to:"999"}]];
majors["m18_general"] = [0, [{count:8,desc:"(in total) from",globalskip:1,runinfull:1}, {id:"18.04-999",range:1,dept:"18",from:"04",to:"999"}], [{count:6,globalskip:1,runinfull:1}, {id:"18.100-999",range:1,dept:"18",from:"100",to:"999"}], [1, "18.03", "18.034"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994", "8.06", "14.33", "18.100C", "18.310"]], [1, "18.06", "18.700", "18.701"]];
majors["m18_applied"] = [0, [1, "18.03", "18.034"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994", "8.06", "14.33", "18.100C", "18.310"]], "18.310", "18.311", [1, "18.04", "18.112"], [1, "18.06", "18.700"], {id:"Group I class: Probability and statistics, combinatorics, computer science",skip:1}, {id:"Group II class: Numerical analysis, physical mathematics, nonlinear dynamics",skip:1}, {id:"Class from Groups I or II",skip:1}, {id:"Class from Groups I or II",skip:1}];
majors["m18_theoretical"] = [0, [1, "18.03", "18.034"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994", "8.06", "14.33", "18.100C", "18.310"]], "18.100", "18.701", "18.702", "18.901", [1, "18.101", "18.102", "18.103"], [1, "18.104", "18.504", "18.704", "18.784", "18.904", "18.994"], [2, {id:"18.100-999",range:1,dept:"18",from:"100",to:"999"}]];
majors["m18_C"] = [0, [1, "18.03", "18.034"], [1, "18.06", "18.700", "18.701"], "18.410", "6.01", "6.006", [1, "18.062", {id:"18.310",globalskip:1}, "18.314"], [1, "18.400", "18.404"], [1, "6.005", "6.033"], [2, [1, "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994"], [1, "18.310", "18.104", "18.304", "18.384", "18.424", "18.434", "18.504", "18.704", "18.784", "18.821", "18.904", "18.994", "8.06", "14.33", "18.100C"]], [1, "6.02", "6.041", {id:"6.170-179",range:1,dept:"6",from:"170",to:"179"}, {id:"a Foundation or Header subject",skip:1}, {id:"6.100-999",range:1,dept:"6",from:"100",to:"999"}], [4, {id:"18.04-999",range:1,dept:"18",from:"04",to:"999"}]];
majors["m20"] = [0, "18.03", [1, "20.110", "20.111"], "5.12", "20.109", "7.03", "6.00", [1, "5.07", "7.05"], "7.06", "20.310", "20.320", "20.330", "20.309", "20.380"];
majors["m21_german"] = [0, "21F.406", "21F.407", [1, "21F.409", "21F.410", "21F.412", "21F.414", "21F.415", "21F.416", "21F.420"]];
majors["m21_A"] = [0, "21A.100", "21A.109", "21A.510", "21A.512", {id:"8 Anthropology electives program",skip:1}];
//majors["m21_E"] = [0];
majors["m21_F_french"] = [0, "21F.301", "21F.302", "21F.304", "21F.306", "21F.307", [1, "21F.308", "21F.310", "21F.311", "21F.312", "21F.315", "21F.320", "21F.325", "21F.345", "21F.346"]];
majors["m21_F_spanish"] = [0, "21F.701", "21F.702", "21F.704", "21F.708", "21F.709", [1, "21F.716", "21F.717", "21F.721", "21F.730", "21F.731", "21F.735", "21F.736", "21F.738", "21F.740"]];
majors["m21_H"] = [0, [1, {id:"21H.001-999",range:1,dept:"21H",from:"001",to:"999"}], "21H.390", "21H.THT", "21H.THU", {id:"7 subjects forming a coherent program of subjects from the history curriculum",skip:1}, {id:"3 related subjects from a second HASS discipline.",skip:1}];
majors["m21_L"] = [0, [2, "21L.473", "21L.701", "21L.702", "21L.703", "21L.704", "21L.705", "21L.706", "21L.707", "21L.708", "21L.709"], {id:"7 subjects forming a coherent program of subjects from the literature cirriculum",skip:1}];
majors["m21_M"] = [0, [1, "21M.220", "21M.260"], [1, "21M.235", "21M.250"], "21M.301", "21M.302", [1, "21M.303", "21M.350"], [2, {id:"21M.401-499",range:1,dept:"21M",from:"401",to:"499"}], "21M.500", [1, {id:"21M.300-399",range:1,dept:"21M",from:"300",to:"399"}], [1, "21M.215", "21M.223", "21M.226", "21M.283", "21M.284", [1, {id:"21M.291-299",range:1,dept:"21M",from:"291",to:"299"}]], [1, [1, {id:"21M.300-399",range:1,dept:"21M",from:"300",to:"399"}], [1, {id:"21M.200-299",range:1,dept:"21M",from:"200",to:"299"}], [2, {id:"21M.400-499",range:1,dept:"21M",from:"400",to:"499"}]]];
//majors["m21_S"] = [0];
majors["m21_W_creative"] = [0, "21W.THT", "21W.THU", [1, "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771", "21W.777"], {id:"6 subjects centered on creative writing",skip:1}, {id:"3 subjects in literature",skip:1}];
majors["m21_W_science"] = [0, "21W.777", "21W.778", "21W.792", "21W.THT", "21W.THU", {id:"4 subjects in writing",skip:1}, [1, {id:"STS.001-999",range:1,dept:"STS",from:"001",to:"999"}]];
majors["m21_W_digital"] = [0, "21W.764", "21W.765", "21W.785", "21W.THT", "21W.THU", [1, "21W.757", "21W.758", "21W.759", "21W.762", "21W.770", "21W.771", "21W.777"], {id:"3 subjects in writing",skip:1}];
majors["m22"] = [0, "2.005", [1, "6.00", "12.010"], "8.03", [1, "18.03", "18.034"], "18.085", "22.01", "22.071", "22.02", "22.033", "22.05", "22.09", [2, "22.058", "22.055", "22.06", "22.070"], "22.THT", "22.THU"];
majors["m24_1"] = [0, {id:"CIH Philosophy subject",skip:1}, [1, "24.01", "24.201"], [1, "24.08", "24.09", "24.111", "24.112", "24.114", "24.211", "24.215", "24.221", "24.251", "24.253", "24.280"], [1, "24.02", "24.04", "24.06", "24.120", "24.209", "24.213", "24.214", "24.222", "24.231", "24.235", "24.237", "24.263"], [1, "24.118", "24.241", "24.242", "24.243", "24.244", "24.245"], {id:"5 subjects forming a coherent program of addition subjects, two of which must be philosophy",skip:1}, "24.260", [1, "24.120", "24.201", "24.221", "24.231", "24.235", "24.237", "24.251", "24.263"]];
majors["m24_2_linguistics"] = [0, "24.900", "24.901", "24.902", "24.903", "24.918", [1, "24.909", "24.910", "24.914"], [1, "24.09", "24.241", "24.251"], [1, "24.904", "24.905", "24.906", "24.907", "24.915"], {id:"3 subjects forming a coherent program of subjects from linguistics, philosophy, or a related area.",skip:1}];
majors["m24_2_philosophy"] = [0, "24.900", "24.201", "24.241", "24.251", "24.260", [1, "24.08", "24.09"], [1, "24.111", "24.112", "24.114", "24.211", "24.215", "24.221", "24.253", "24.280"], [1, "9.65", "24.904", "24.905"], {id:"3 subjects forming a coherent program of subjects from linguistics, philosophy, or a related area.",skip:1}];
majors["mCMS"] = [0, "21L.011", "CMS.100", [1, "CMS.400", "CMS.403", "CMS.405", "CMS.407"], [1, "21L.706", "21L.715"], [6, "CMS.300", "CMS.309", "CMS.312", "CMS.313", "CMS.314", "CMS.334", "CMS.336", "CMS.338", "CMS.360", "CMS.361", "CMS.362", "CMS.376", "CMS.603", "CMS.607", "CMS.608", "CMS.609", "CMS.610", "CMS.611", "CMS.612", "CMS.613", "CMS.614", "CMS.615", "CMS.616", "CMS.621", "CMS.627", "CMS.628", "CMS.631", "CMS.701", "CMS.S60", "CMS.S61", "CMS.S62", [2, "CMS.THT", "CMS.THU"], "CMS.URG"]];
majors["mSTS"] = [0, [1, "STS.001", "STS.003", "STS.005", "STS.006", "STS.007", "STS.008", "STS.009", "STS.010", "STS.011"], [1, {id:"STS.025-090",range:1,dept:"STS",from:"025",to:"090"}], "STS.091", "STS.THT", "STS.THU", {id:"5 Coherent group of subjects in STS",skip:1}];
//majors["mWGS"] = [0];

majors["miArchitecture"] = [0, "4.111", "4.112", "4.605", [1, [2, "4.113", "4.114"], [{count:3,desc:"(up to two from each group A-D, and no more than one from group E) from"}, {id:"Group A:",skip:1}, "4.122", "4.170", "4.211", "4.231", "4.233", "4.250", {id:"Group B:",skip:1}, "4.301", "4.312", "4.314", "4.322", "4.330", "4.332", "4.341", "4.351", "4.352", "4.361", "4.366", "4.368", "4.371", {id:"Group C:",skip:1}, "4.401", "4.411", "4.42", "4.440", "4.444", "4.472", "4.474", {id:"Group D:",skip:1}, "4.500", "4.501", "4.503", "4.504", "4.520", "4.522", {id:"Group E:",skip:1}, "4.601", "4.602", "4.603", "4.606", "4.609", "4.613", "4.614", "4.615", "4.635", "4.641", "4.651", "4.671", "4.67"]]];
majors["miHist_Architecture_Art"] = [0, [1, "4.601", "4.602"], [1, "4.605", "4.614"], [{count:3,desc:"(no more than two subjects from either the history of art or the history of architecture) from"}, "4.603", "4.606", "4.613", "4.615", "4.635", "4.641", "4.645", "4.651", "4.671", "4.673"], [1, "4.609", {id:"Other advanced seminar in the history of art and/or architecture, incl. offerings from Harvard or Wellsley",skip:1}]];
majors["miArt_culture_tech"] = [0, [1, "4.301", "4.302"], [1, "4.601", "4.602", "4.606", "4.641", "4.651", "4.671", "4.673"], [2, "4.322", "4.330", "4.341", "4.351"], [2, "4.312", "4.314", "4.332", "4.352", "4.361", "4.366", "4.368", "4.371"]];
majors["miUrban_studies_and_planning"] = [0, "11.001", "11.002", [3, "11.005", "11.011", "11.013", "11.014", "11.016", "11.021", "11.022", "11.025", "11.026", "11.122", "11.126", "11.162", "11.165", "11.166", "11.168"], "11.123"];
majors["miInternational_development"] = [0, [2, "11.005", "11.025", "11.140"], [4, "4.233", "11.002", "11.027", "11.122", "11.147", "11.164", "11.165", "11.166", "11.167", "EC.715"]];
majors["miToxicology_and_enviro_health"] = [0, "20.102", "20.104", "20.106", [1, "20.109", "5.310", "7.02", "10.702"], [1, "20.URG", "1.080", "1.725", "1.89", "5.07", "7.05", "7.06", "7.28", "22.01"]];
majors["miCivil_Engineering"] = [0, "1.050", "1.060", "1.101", "1.102", "1.035", [1, "1.041", "1.036"]];
majors["miEnvrio_Engineering_Science"] = [0, "1.018", "1.020", "1.101", "1.102", "1.080", "1.107", "1.801", "11.002", "11.122", "14.01"];
majors["miAnthropology"] = [0, [1, "21A.00", "21A.01"], {id:"4 subjects with a unifying theme",skip:1}, [1, "21A.852", "21A.802"]];
majors["miCMS"] = [0, [1, "21L.011", "CMS.100"], [1, "CMS.400", "CMS.403", "CMS.405", "CMS.407"], [1, "21L.706", "21L.715"], {id:"3 electives (consult with advisor)", skip:1}];
majors["miBiology"] = [0, "5.12", "7.03", "7.05", [2, [1, "7.02", "20.109"], "7.06", "7.08", "7.20", "7.21", "7.22", "7.23", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30", "7.31", "7.32", "7.33", "7.35", "7.36", "7.37", "7.41", "7.49"]];
majors["miBrain_Cog_Sci"] = [0, "9.00", "9.01", [{count:4,desc:"(three from one area of specialization and one from the other) from"}, {id:"Cognitive Science:",skip:1}, "9.34", "9.35", "9.56", "9.57", "9.65", "9.66", "9.71", "9.85", {id:"9.URG",desc:" (can only count once)"}, {id:"Computation and Systems Neuroscience:",skip:1}, "9.03", "9.04", "9.09", "9.10", "9.14", "9.15", "9.18", "9.20", "9.22", "9.24", "9.29", "9.31", "9.37", {id:"9.URG",desc:" (can only count once)"}]];
majors["miChemistry"] = [0, "5.03", "5.12", "5.310", "5.60", [2, "5.04", "5.07", "5.08", "5.13", "5.36", "5.37", {id:"Note: CourseRoad doesn't currently recognize the 5.35-38 module behavior. Try using 0-unit custom classes to mark where the modules go in your schedule.",skip:1}, [2, "5.36U", "5.37U"], "5.43", "5.61", "5.62"]];
majors["miEarth_Atmos_Planetary"] = [0, [2, "12.001", "12.002", "12.003", "12.006", "12.102", "12.400"], [1, "18.03", "18.034", "5.60"]];
majors["miEcon"] = [0, "14.01", "14.02", [1, "14.30", "18.05", [2, "18.440", [1, "18.441", "18.443"]]], [1, "14.03", "14.04", "14.05"], {id:"2 elective undergraduate subjects chosen from the fields of applied economics",skip:1}];
majors["miWriting"] = [0, [{count:6,desc:"(1 from one area of study, five from the others) from"}, {id:"Writing and Rhetoric",skip:1}, "21W.011", "21W.012", "21W.013", {id:"Writing and Experience",skip:1}, "21W.021", "21W.022", "21W.023", "21W.024", {id:"Science Writing and New Media",skip:1}, "21W.031", "21W.032", "21W.033", "21W.034", "21W.035", {id:"Writing about Literature",skip:1}, "21W.041", {id:"Writing with Shakespeare",skip:1}, "21W.042", {id:"Writing and Reading Short Stories",skip:1}, "21W.755", {id:"Writing and Reading Poems",skip:1}, "21W.756"]];
majors["miManagement"] = [0, [1, "15.301", "15.668"], "15.501", "15.812", {id:"3 Course 15 subjects (other than UROP, Special Studies, Special Seminars, and general elective transfer credit) that are not designated as restricted to students in other Sloan School programs",skip:1}];
majors["miManagement_science"] = [0, [1, "6.041", "18.440"], "14.01", [1, "15.053", "15.058"], [1, "15.075", "18.443"], {id:"2 Course 15 restricted electives",skip:1}];
majors["miSTS"] = [0, "STS.091", [1, {id:"STS.001-011",range:1,dept:"STS",from:"001",to:"011"}], [1, {id:"STS.025-089",range:1,dept:"STS",from:"025",to:"089"}], [3, {id:"STS.001-089",range:1,dept:"STS",from:"001",to:"089"}]];
majors["miMusic"] = [0, [1, "21M.011", "21M.030", "21M.051"], "21M.301", [1, {id:"21M.200-299",range:1,dept:"21M",from:"200",to:"299"}], [2, {id:"21M.400-499",range:1,dept:"21M",from:"400",to:"499"}], [1, [2, "21M.500", {id:"21M.200-299",range:1,dept:"21M",from:"200",to:"299"}], [2, {id:"21M.300-399",range:1,dept:"21M",from:"300",to:"399"}, "21M.500", {id:"21M.550-589",range:1,dept:"21M",from:"550",to:"589"}], [4, {id:"21M.401-499",range:1,dept:"21M",from:"401",to:"499"}]]];
majors["miTheater_arts"] = [0, [1, "21M.611", "21M.618", "21M.703", "21M.710", "21M.711", "21M.846"], [4, "21M.600", "21M.603", "21M.604", "21M.605", "21M.606", "21M.624", "21M.645", "21M.704", "21M.705", "21M.715", "21M.732", "21M.733", "21M.734", "21M.735", "21M.736", "21M.785", "21M.790", "21M.830", "21M.840", "21M.863"], [{count:12,type:"total_units",desc:"units from",special:1}, "21M.805", "21M.815", "21M.851"]];
majors["miPhilosophy"] = [0, {id:"Any CIH philosophy subject",skip:1}, [1, "24.118", "24.241", "24.242", "24, 243", "24.244", "24.245", {id:"A logic subject in another department e.g. Mathematics",skip:1}], {id:"Three nonintroductory philosophy subjects",skip:1}, "24.260"];
majors["miLinguistics"] = [0, "24.900", "24.901", "24.902", "24.903", [2, "24.904", "24.905", "24.906", "24.907", "24.909", "24.910", "24.914", "24.915"]];
majors["miMSE"] = [0, [{count:72,type:"total_units",desc:"units from",special:1}, [1, "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"], [5, "3.012", "3.014", "3.016", "18.03", "18.034", "3.021", "1.00", "6.01", "3.016", "3.022", "3.024", "3.032", "3.034", "3.042", "3.044", "3.THU", [2, "3.930", "3.931"], "3.004", "3.016", "3.021", "3.046", "3.048", "3.051", "3.052", "3.053", "3.054", "3.055", "3.063", "3.064", "3.07", "3.072", "3.073", "3.074", "3.080", "3.14", "3.15", "3.153", "3.155"]]];
majors["miArchaeology"] = [0, "3.012", "3.014", "3.022", "3.986", "3.985", [1, "3.07", "3.14", "3.051", "3.052", "3.984"]];
majors["miMathematics"] = [0, [{count:72,type:"total_units",desc:"units (6 classes, 12 units each) from",special:1}, [4, {id:"18.100-999",range:1,dept:"18",from:"100",to:"999"}], [2, {id:"18.03-999",range:1,dept:"18",from:"03",to:"999"}], {id:"[Note: All classes must be of essentially different content]",skip:1}]];
majors["miMechE"] = [0, [{count:72,type:"total_units",desc:"units from",special:1},  [4, "2.001", "2.002", "2.003", "2.004", "2.005", "2.009", "2.086", "2.671", "18.03", "2.007", "2.006", "2.008", "2.017"], [2, "2.006", "2.007", "2.008", "2.65", "2.700", "2.016", "2.017", "2.019", "2.050", "2.092", "2.12", "2.14", "2.184", "2.370", "2.51", "2.60", "2.71", "2.72", "2.793", "2.797", "2.813", "2.96", "2.THU"]]];
majors["miNuclear_science"] = [0, "22.01", "22.02", "22.05", "22.06", "22.058", "22.09"];
majors["miPhysics"] = [0, [1, "18.03", "18.034"], [{count:57,type:"total_units",desc:"units from",special:1}, [5, {id:"8.03-999",range:1,dept:"8",from:"03",to:"999"}]]];
majors["miPolitical_science"] = [0, [1, {id:"Intro class (two digit decimal)",skip:1}], [4, {id:"Advanced classes (three digit decimal)",skip:1}], [1, {id:"17.01-999",range:1,dept:"17",from:"01",to:"999"}]];
majors["miChinese"] = [0, [1, [2, [1, "21F.103", "21F.173"], "21F.104"], [2, [1, "21F.109", "21F.183"], "21F.110"], [2, "21F.142", "21F.143"]], [1, [2, [1, "21F.105", "21F.175"], "21F.106"], [1, "21F.113", "21F.185"]], [1, "21F.190", "21F.192", "21F.193", "21F.194", "21F.195", {id:"21F.199",desc:" (if Capstone)"}], [1, "21F.027", "21F.030", "21F.193", "21F.036", "21F.190", "21F.038", "21F.194", "21F.043", "21F.044", "21F.195", "21F.046", "21F.192", "21F.075", "21H.151", "21H.152", "21H.351"]];
majors["miFrench"] = [0, [1, "21F.303", "21F.373"], [1, "21F.304", "21F.374"], [2, {id:"21F.308-315",range:1,dept:"21F",from:"308",to:"315"}], [2, "21F.052", "21F.068", "21F.071", {id:"21F.320-348",range:1,dept:"21F",from:"320",to:"348"}, "21H.241"], [1, {id:"21F.308-315",range:1,dept:"21F",from:"308",to:"313"}, "21F.315", "21F.052", "21F.068", "21F.071", {id:"21F.320-348",range:1,dept:"21F",from:"320",to:"348"}, "21H.241"]];
majors["miGerman"] = [0, [1, "21F.403", "21F.473"], [1, "21F.404", "21F.474"], [2, {id:"21F.405-412",range:1,dept:"21F",from:"405",to:"412"}], [2, "21F.019", "21F.055", "21F.059", "21F.098", {id:"21F.414-420",range:1,dept:"21F",from:"414",to:"420"}], [1, {id:"21F.405-412",range:1,dept:"21F",from:"405",to:"412"}, "21F.019", "21F.055", "21F.059", "21F.098", {id:"21F.414-420",range:1,dept:"21F",from:"414",to:"420"}]];
majors["miSpanish"] = [0, [1, "21F.703", "21F.773"], [1, "21F.704", "21F.774"], [3, {id:"21F.711-714",range:1,dept:"21F",from:"711",to:"714"}, "21F.792"], [{count:2,desc:"(at least) from"}, "21F.010", "21F.084", {id:"21F.716-740",range:1,dept:"21F",from:"716",to:"740"}]];
majors["miJapanese"] = [0, [1, [2, [1, "21F.503", "21F.573"], "21F.504"], [2, "21F.562", "21F.563"]], [1, "21F.505", "21F.575"], "21F.506", [1, "21F.590", "21F.591", "21F.592", "21F.593", "21F.596"], [1, "21F.590", "21F.591", "21F.592", "21F.593", "21F.596", "17.433", "17.537", "17.543", "21F.027", "21F.030", "21F.039", "21F.063", "21F.064", "21F.065"]];
majors["miHistory"] = [0, "21H.390", {id:"Four undergraduate introductory or intermediate subjects from the history curriculum",skip:1}, {id:"At least one 21H seminar in addition to 21H.390",skip:1}, {id:"At least two temporal periods, one premodern (before 1700) and one modern, to be covered by the five subjects other than 21H.390",skip:1}];
majors["miLiterature"] = [0, [1, {id:"21L.000-044",range:1,dept:"21L",from:"000",to:"044"}], [2, {id:"21L.420-522",range:1,dept:"21L",from:"420",to:"522"}], [1, [1, {id:"21L.000-044",range:1,dept:"21L",from:"000",to:"044"}], [1, {id:"21L.420-522",range:1,dept:"21L",from:"420",to:"522"}]], [2, {id:"21L.701-715",range:1,dept:"21L",from:"701",to:"715"}]];

/*
majors["miApplied_international"] = [0, {id:"Proficiency in at least one language (minimum second-year college-level)",skip:1}, {id:"Two or three subjects in foreign language/culture (beyond first-year language) or anthropology. At least two of these subjects must focus on specific region or country",skip:1}, ];


//*/
majors["miAstronomy"] = [0, "8.03", "8.282", "18.03", [1, "8.284", "8.286"], [1, "12.008", "12.400", "12.420", "12.425"], [1, "8.287", "12.43", "12.431", "12.432"], [1, "8.UR", "12.UR", "8.THU", "12.THU", "12.411"], {id:"Four of the subjects used to satisfy the requirements for the astronomy minor may not be used to satisfy any other major or minor.",skip:1}];
majors["miBiomed"] = [0, [1, "18.03", "3.016"], [1, "1.010", "7.36", "9.07", "18.440", "18.443"], [1, "5.07", "7.05"], [2, "7.02", "7.03", "7.06", {id:"An intro level engineering-focused class from Courses 1, 2, 3, 6, 10, 16, or 22",skip:1}], [1, [3, [1, "20.110", "20.111"], [1, "20.310", "20.320", "20.330"], [1, "20.371", "20.390", "HST.561"]], [3, [1, {id:"20.340-499",range:1,dept:"20",from:"340",to:"499"}], [1, {id:"20.340-499",range:1,dept:"20",from:"340",to:"499"}], [1, {id:"20.340-499",range:1,dept:"20",from:"340",to:"499"}], [1, {id:"HST.520-529",range:1,dept:"HST",from:"520",to:"529"}], [1, {id:"HST.520-529",range:1,dept:"HST",from:"520",to:"529"}], [1, {id:"HST.520-529",range:1,dept:"HST",from:"520",to:"529"}], [1, {id:"HST.540-549",range:1,dept:"HST",from:"540",to:"549"}], [1, {id:"HST.540-549",range:1,dept:"HST",from:"540",to:"549"}], [1, {id:"HST.540-549",range:1,dept:"HST",from:"540",to:"549"}]]]];
//majors["miEnergy_studies"] = [0, [1, "8.21", [2, "6.007", [1, "2.005", "5.60"]], [2, [1, "2.005", "5.60"], [1, "12.021", "12.340"]], [2, "6.007", [1, "12.021", "12.340"]]], "15.031", [1, "2.60", "4.42", "22.081"], [{count:24,type:"total_units",desc:"units from",special:1}, "1.071", "1.801", "2.006", "2.570", "2.612", "2.627", "2.813", "3.003", "4.401", "4.472", "5.92", "6.061", "6.131", "6.701", "10.04", "10.27", "11.162", "11.165", "11.168", "12.213", "14.42", "14.44", "15.026", "21H.207", "22.033", "22.06", "SP.775", "STS.032", "4.274", "11.369", "15.366", "15.933", "ESD.124", "ESD.162"]];
majors["miEnergy_studies"] = [0, [1, "8.21", [2, "6.007", [1, "2.005", "5.60"], [1, "12.021", "12.340"]]], "15.031", [1, "2.60", "4.42", "22.081"], [{count:24,type:"total_units",desc:"units from",special:1}, "1.071", "1.801", "2.006", "2.570", "2.612", "2.627", "2.813", "3.003", "4.401", "4.472", "5.92", "6.061", "6.131", "6.701", "10.04", "10.27", "11.162", "11.165", "11.168", "12.213", "14.42", "14.44", "15.026", "21H.207", "22.033", "22.06", "SP.775", "STS.032", "4.274", "11.369", "15.366", "15.933", "ESD.124", "ESD.162"]];
majors["miPsych"] = [0, "9.00", [2, {id:"Subject in experimental psychology",skip:1}, {id:"Subject in personality and social psychology",skip:1}, {id:"Subject in applied psychology",skip:1}], [3, {id:"Subject in experimental psychology",skip:1}, {id:"Subject in personality and social psychology",skip:1}, {id:"Subject in applied psychology",skip:1}]];
majors["miPublic_policy"] = [0, [1, "11.002", "17.30"], "14.01", [1, "11.003", "17.303"], {id:"3 Subjects chosen in one of the following tracks: social and educational policy, environmental policy, infrastructure policy, science and technology policy, labor and industrial policy, international development policy, security and defense policy, and urban and regional policy",skip:1}];

var countdefault = {count:0,type:"",desc:"from",special:0,globalskip:0,globalignore:0,runinfull:0};
var classdefault = {id:"",desc:"",skip:0,coreq:0,range:0,dept:"",from:"",to:"",globalskip:0};
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
		var matched = $.extend({}, countdefault, {count:parseInt(0+arr[0])});
	}else{
		var matched = $.extend({}, countdefault, arr[0]);
	}
	matched.ocount = 0+matched.count;
	matched.matches = [];
	var tempstr = []; //Holds the unsatisfied requisites in a string for display to the user.
	var temp2 = true;
	for(var i=1;i<arr.length;i++){
		if($.isArray(arr[i])){
			var req = checkReqs(arr[i], callback, callbackargs, level.concat([i])); //In case a sub-branch is inside this branch, we recursively solve that branch and use its result.
			if(req[0]){ //If the sub-branch matched its requirements
				matched.special ? $(req[2]).each(function(){ matched.count -= $(this).data(matched.type); }) : matched.count--;
				var tempargs = callbackargs.slice();
				var clspos = $.inArray("cls", tempargs);
				if(clspos!=-1) tempargs[clspos] = $.extend({},newarr,{div:arr[i]});
				var lvlpos = $.inArray("lvl", tempargs);
				if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
				var temp2 = callback.apply(null, tempargs);
			}else{
				tempstr.push(req[1]);
			}
			continue;
		}
		//Let's deal with the objects (for things like coreqs) now.
		if(typeof(arr[i])=="object"){ //Converting both things to objects, but only the coreq ones will have a "coreq":1 attribute.
			var newarr = $.extend({}, classdefault, arr[i]);
		}else{
			var newarr = $.extend({}, classdefault, {id:arr[i]});
		}
		if(newarr.desc==undefined) newarr.desc = "";
		if(newarr.skip) continue;
		if(newarr.id=="Permission" && !user.needPermission){
			if(matched.ocount==arr.length-1) matched.count -= matched.special?$(this).data(matched.type):1;
			continue;
		}
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(newarr.range){
			var rangematches = $(".classdiv:not(.custom)").filter(function(index){
				var rng = [newarr.dept, "."+newarr.from, "."+newarr.to];
				var temp2 = [$(this).data("subject_id")].concat($(this).data("joint_subjects")?$(this).data("joint_subjects"):[]);
				for(j in temp2){
					var temp3 = [temp2[j].split(".")[0], "."+temp2[j].split(".")[1]];
					if((temp3[0]==rng[0]) && (rng[1]<=temp3[1]) && (temp3[1]<=rng[2])) return true;
				}
				return false;
			}).each(function(){
				if($.inArray(this, globalmatches)!=-1 && !matched.globalignore) return true;
				var tempargs = callbackargs.slice();
				var clspos = $.inArray("cls", tempargs);
				if(clspos!=-1) tempargs[clspos] = $.extend({},newarr,{div:$(this)});
				var lvlpos = $.inArray("lvl", tempargs);
				if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
				var temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
				if(temp2){
					matched.count -= matched.special?$(this).data(matched.type):1;
					matched.matches.push(this);
					if(!newarr.globalskip && !matched.globalskip) globalmatches.push(this);
					if(newarr.globalskip) console.log("newarrskip", newarr, matched);
					if(matched.globalskip) console.log("matchedskip", newarr, matched);
				}
				if(matched.count<=0 && !matched.runinfull) return [true, "", level.length?matched.matches:globalmatches];
			});
			if(matched.count<=0) return [true, "", level.length?matched.matches:globalmatches];
			tempstr.push((newarr.coreq==1)?("["+newarr.id+newarr.desc+"]"):(newarr.id+newarr.desc));
			continue;
		}
		//Now only bona fide classes
		var classmatches = $(".classdiv."+(newarr.id.toUpperCase().replace('.','_').replace(':','.')));
		classmatches.each(function(){
			if($.inArray(this, globalmatches)!=-1 && !matched.globalignore) return true;
			var tempargs = callbackargs.slice();
			var clspos = $.inArray("cls", tempargs);
			if(clspos!=-1) tempargs[clspos] = $.extend({},newarr,{div:$(this)});
			var lvlpos = $.inArray("lvl", tempargs);
			if(lvlpos!=-1) tempargs[lvlpos] = level.concat([i]);
			var temp2 = callback.apply(null, tempargs); //calls callback with tempargs as its arguments. In Python this would be callback(*tempargs)
			if(temp2){
				matched.count -= matched.special?$(this).data(matched.type):1;
				matched.matches.push(this);
				if(!newarr.globalskip && !matched.globalskip) globalmatches.push(this);
				return false;
			}
		});
		if(!classmatches.length || !temp2){ //If it's not a class, or callback failed, then we need to note that.
			tempstr.push((newarr.coreq==1)?("["+newarr.id+newarr.desc+"]"):(newarr.id+newarr.desc));
		}
		if(matched.count<=0 && !matched.runinfull) return [true, "", level.length?matched.matches:globalmatches];
	}
	//return two pieces of info: state and string
	if(matched.count<=0) return [true, "", level.length?matched.matches:globalmatches];
	var tempstr = tempstr.join(", ");
	tempstr = deGIR(tempstr);
	if(matched.special){
		tempstr = "("+matched.count+" "+matched.desc+": "+(JSON.stringify(arr.slice(1)))+")";
	}else if(level.length || (!level.length && (arr[0]!=arr.length-1))){
		tempstr = "("+matched.count+" "+matched.desc+": "+tempstr+")";
	}
	return [false, tempstr, level.length?matched.matches:globalmatches];
}

/*** Course functions ***/
function newWire(from,to){
	//Defines new wire's properties (black/grey, straight/curved) 
	//partially based on the relative semesters and terms of the two would-be connected classes.
	//from is $() div, to is object with to.div as $() div.
	if($.isArray(to.div)) return true;
	var fromid = from.attr("id");
	var toid = to.div.attr("id");
	var fromterm = from.data("classterm")+0;
	var toterm = to.div.data("classterm")+0;
	var dterm = Math.abs(fromterm - toterm);
	var options = {prereq:{color:"#888888",bordercolor:"#B8B8B8",borderwidth:1,width:2,OK:true},coreq:{color:"#000000",bordercolor:"#000000",borderwidth:1,width:1,OK:true},error:{color:"#ff0000",bordercolor:"#dd0000",borderwidth:1,width:1,OK:false}};
	var option = "prereq";
	if(to.coreq){
		option = "coreq";
	}else{
		toterm += to.div.data("override")?0:1;
	}
	if((fromterm < toterm) && (fromterm || dterm)) option = "error";
	if(user.viewReqLines) from.data("terminals").wires.push(new WireIt[(dterm==1 || dterm==2)?"Wire":"BezierWire"](from.data("terminals").terminal, to.div.data("terminals").terminal, document.body, options[option]));
	return (options[option].OK);
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
			return ((($.inArray($(this).data("subject_id"), div.data("equiv_subjects"))!=-1) || $(this).hasClass(div.data("id"))) && (j<$(div).index(".classdiv")));
		}).length) div.data("checkrepeat", false);
	}
	div.data("status", (((div.data("reqstatus") && div.data("checkrepeat")) || div.data("override")) && (div.data("checkterm")) && (div.data("offered_this_year"))) || div.data("classterm")==0);
	div.removeClass("classdivgood").removeAttr('title');
	if(div.data("status")) div.addClass("classdivgood");
	if(!div.data("checkrepeat")) div.attr('title', div.data("subject_id")+' is not counting for credit');
	if(!div.data("checkterm")) div.attr('title', div.data("subject_id")+' is not available '+(['in the Fall term', 'during IAP', 'in the Spring term', 'in the Summer term'])[(div.data("classterm")-1)%4]);
	if(!div.data("offered_this_year")) div.attr('title', div.data("subject_id")+' is not available in this year ('+div.data('ayear')+')');
	if(div.data("override")) div.find(".coreqs").attr('title','OVERRIDE enabled');
	if($('.classdivhigh').length==1){
		$('.WireIt-Wire').addClass("WireIt-Wire-low");
		for(i in $(".classdivhigh").data("terminals").terminal.wires){
			$($(".classdivhigh").data("terminals").terminal.wires[i].element).removeClass("WireIt-Wire-low");
		}
	}
	return div.data("status");
}

function updateWires(){
	$(".term").each(function(){
		$(this).find(".termname, .termname span").css("width", $(this).height()+"px");
	});
	$(".year").each(function(){
		$(this).find(".yearname, .yearname span").css("width", $(this).height()+"px");
	});
	if(preventUpdateWires) return false;
	$(".classdiv").each(function(){
		$(this).data("terminals").terminal.redrawAllWires();
	});
}

function checkClasses(){
	//This does the work for the left-hand side checklist bar.
	totalUnits = 0;
	$("#COREchecker span.checkbox1").removeAttr('title');
	$(".corecheck").addClass("unused").removeClass("used");
	$(".classdiv").each(function(i){
		var div = this;
		if(!$(div).data("checkrepeat")) return true;
		var forUnits = true;
		if(!$(div).data("special")){
			totalUnits += $(div).data("total_units");
			return true;
		}
		if($(div).data("gir")){
			var effect = "#COREchecker .corecheck.unused.GIR."+$(div).data("gir")+":first";
			if($(effect).length){
				$(effect).removeClass('unused').addClass('used').attr('title', $(div).data("subject_id"));
				if($(div).data("gir")=="LAB") $(effect).removeClass('unused').addClass('used').attr('title', $(div).data("subject_id"));
				forUnits = false;
			}
		}
		var thisterm = $(div).data("classterm");
		if($(div).data("ci") && !($(".classdiv.CI:not(.CIM)").not(div).filter(function(){ return ($(this).data("classterm")==$(div).data("classterm")) && ($(this).index(".classdiv")<i); }).length)){
			var effect = "#COREchecker .corecheck.unused.CI."+$(div).data("ci")+":first";
			if($(effect).length){
				$(effect).removeClass('unused').addClass('used').attr('title',$(div).data("subject_id"));
				forUnits = false;
			}
		}
		if($(div).data("hass")){
			var hass = [$(div).data("hass")];
			if(hass[0].indexOf(",")!=-1){
				hass = hass[0].split(",");
			}
			for(i in hass){
				var effect = "#COREchecker .corecheck.unused.HASS."+hass[i]+":first";
				if($(effect).length){
					$(effect).removeClass('unused').addClass('used').attr('title',$(div).data("subject_id"));
					forUnits = false;
				}else{
					if((hass.length>1)&&(i!=(hass.length-1))) continue;
					var effect = "#COREchecker .corecheck.unused.HASS.HE:first";
					if($(effect).length){
						$(effect).removeClass('unused').addClass('used').attr('title',$(div).data("subject_id"));
						forUnits = false;
					}
				}
			}
		}
		if(forUnits) totalUnits += $(div).data("total_units");
	});
	totalUnits = Math.round(100*totalUnits)/100;
	$("#totalunits").html(totalUnits);
}

function addAllWires(){
	var status = true;
	$(".classdiv").each(function(){
		$(this).data("terminals").terminal.removeAllWires();
		$(this).data("classterm", $(this).parent().index(".term"));
	}).each(function(){
		if($(this).data("custom")) return true;
		var temp = addWires($(this));
		status = status && temp;
	});
	$(".term").each(function(){ 
		$(this).find(".termname span a").attr("href", "http://picker.mit.edu/browse.html?courses="+
			$(this).find(".classdiv:not(.custom)").map(function(){ 
				return $(this).data("subject_code"); 
			}).get().join("%3B")
		);
	});
	updateWires();
	checkClasses();
	$("select.majorminor").each(function(){checkMajor(this);});
	$(window).on("beforeunload", runBeforeUnload);
	return status;
}

/*** Course-loading functions ***/
function classFromJSON(json, loadspeed, replacediv){
	if(loadspeed==undefined) loadspeed = "slow";
	if(json.classterm>16) $(".supersenior.hidden").removeClass("hidden", loadspeed);
	if(json.classterm && json.classterm%4==0) $(".term .termname").eq(json.classterm).fadeIn(loadspeed).parent().slideDown(loadspeed, function(){updateWires();}).siblings(".yearname").addClass("showsummer", loadspeed);
	json.info = deGIR(json.info);
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
	newdiv.data("terminals", { terminal: new WireIt.Terminal(newdiv[0], {editable: false }), wires: [] });
	return newdiv;
}

function getClass(){
	//pulls down and interprets the class data
	var classterm = $("#getnewclassterm").val();
	user.supersenior = ($(".year.supersenior").is(":visible") || classterm>16)?1:0;
	if($("input[name='getnewclasstype']:checked").val()=="custom"){
		if(!$("#getnewclassname").val()) return false;
		var data = {getcustom: $("#getnewclassname").val(), getunits: $("#getnewclassunits").val()||0};
	}else{
		if(!$("#getnewclassid").val()) return false;
		var data = {getclass: $("#getnewclassid").val(), getyear:0};
		data.getyear = user.classYear - parseInt(3-Math.floor((classterm-1)/4)) - user.supersenior;
	}
	$("#getnewclass .ui-autocomplete").hide();
	$(".getnewclasstypes input").val("");
	$.post('?', data, function(json){
		if($.inArray(json,["error","noclass",""])!=-1) return false;
		json.classterm = classterm;
		json.override = false;
		classFromJSON(json);
		addAllWires();
		$('.getnewclasstypes.visible input:first').focus();
		$("#getnewclass .ui-autocomplete").hide();
		return true;
	}, "json");
}

function getClasses(classarr){
	//Used for initial pageload when a hash is present: takes in an array containing objects describing the classes.
	for(i=0;i<classarr.length;i++){
		classFromJSON(classarr[i], 0);
	}
	addAllWires();
}

/*** Major/minor functions ***/
function checkOff(majordiv, lvl, cls){ 
	//$(majordiv+" .majorchk.majorchk_"+lvl.join("_")+":not(.chk):first").addClass("chk").html("[X]").attr("title",$.isArray(cls.div)?null:cls.div.data("subject_id")); 
	$(majordiv+" .majorchk.majorchk_"+lvl.join("_")+":not(.chk):first").addClass("chk").attr("title",$.isArray(cls.div)?null:cls.div.data("subject_id")); 
	return true;
}

function checkMajor(selector){
	var val = $(selector).val();
	var div = $(selector).data("div");
	var span = $(selector).prev("span.majorminor");
	span.attr("data-empty",1).removeAttr("data-value");
	if(majors[val]==undefined) majors[val]=[0];
	if(val=="m0") return $(div).html("")&&false;
	span.attr("data-value", $(selector).find("option:selected").text()).removeAttr("data-empty");
	$(div).html(buildMajor(majors[val])).append("<span class=\"letmeknow\"><br>See an error? Let me know <a href=\"mailto:courseroad@mit.edu?subject=[CourseRoad]%20Error%20in%20"+val+"\">here<\/a>.<\/span>");
	draggableChecklist();
	checkReqs(majors[val], checkOff, [div, "lvl", "cls"]);
}

function buildMajor(arr, level){
	if(level==undefined) level = []; //Keep track of recursion. 
	if(arr[0]==0) arr[0] = arr.length-1; //allows "and" arrays to be prefixed with a 0 (easier) [0, "a", "b"] --> [2, "a", "b"];
	if(typeof(arr[0])=="number"){
		var holdobj = $.extend({}, countdefault, {count:(0+arr[0])});
	}else{
		var holdobj = $.extend({}, countdefault, arr[0]);
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
			var newarr = $.extend({}, classdefault, arr[i]);
		}else{
			var newarr = $.extend({}, classdefault, {id:arr[i]});
		}
		//Now check for ranges. These are strings of the form "X.XXX-X.XXX"
		if(newarr.range){
			var innertempstr = "";
			for(var j=0;j<holdobj.count;j++){
				innertempstr += "<span class='majorchk majorchk_"+level.concat([i]).join("_")+" checkbox1'>[<span>&#x2713;<\/span>]<\/span>";
			}
			tempstr += "<li>"+innertempstr+" The range "+newarr.id+newarr.desc+"<\/li>\n";
			//return "<li>"+innertempstr+" "+holdobj.count+" from the range "+newarr.id+newarr.desc+"<\/li>\n";
			continue;
		}
		//Now only strings
		tempstr += "<li>"+(newarr.skip?"&#x2006;&#x2014; ":"<span class='majorchk majorchk_"+level.concat([i]).join("_")+" checkbox1'>[<span>&#x2713;<\/span>]<\/span> ")+(newarr.skip?"":"<span class='checkbox1_text' data-id='"+newarr.id+"'>")+newarr.id+(newarr.skip?"":"</span>")+newarr.desc+"<\/li>\n";
	}
	tempstr = "<ul>\n"+tempstr+"<\/ul>\n";
	if(holdobj.special){
		tempstr = holdobj.count+" "+holdobj.desc+":\n"+tempstr;
	}else if(level.length || (!level.length && (holdobj.count!=arr.length-1))){
		tempstr = holdobj.count+" "+holdobj.desc+":\n"+tempstr; //the != part find the "2 from following" strings
	}
	if(!level.length) return "<strong>Requirements:<\/strong><br>\n"+tempstr;
	return "<li><span class='majorchk majorchk_"+level.join("_")+" checkbox1'>[<span>&#x2713;<\/span>]<\/span> "+tempstr+"<\/li>\n";
}

function draggableChecklist(){
	$(".checkbox1_text").draggable({
		appendTo: "#rightbar", 
		//containment: "body",
		//distance: 30, 
		helper: "clone",
		start: function(event, ui){
			ui.helper.attr("data-term","(none)");
			$(".term").addClass("notOKterm");
			$(".WireIt-Wire").addClass("WireIt-Wire-low");
		},
		stop: function(event, ui){
			$(".term").removeClass("notOKterm");
			unhighlightClasses();
			$(".WireIt-Wire").removeClass("WireIt-Wire-low");
		},
		revert: "invalid",
		zIndex: 2700
	});
}

/*** Helper functions ***/
function unhighlightClasses(){
	$("#overridercheck").prop("disabled", true);
	$("#overrider span").css('opacity', 0);
	$(".classdiv").removeClass("classdivhigh classdivlow");
	$('.WireIt-Wire').removeClass("WireIt-Wire-low");
	$("#nowreading").html('Click on a class to see more info.');
}

function deGIR(str){
	str = str.replace(/GIR:PHY1/g, "Physics I (GIR)");
	str = str.replace(/GIR:PHY2/g, "Physics II (GIR)");
	str = str.replace(/GIR:CAL1/g, "Calculus I (GIR)");
	str = str.replace(/GIR:CAL2/g, "Calculus II (GIR)");
	str = str.replace(/GIR:BIOL/g, "Biology (GIR)");
	str = str.replace(/GIR:CHEM/g, "Chemistry (GIR)");
	str = str.replace(/GIR:REST/g, "REST Requirement");
	str = str.replace(/GIR:LAB/g, "LAB Requirement");
	str = str.replace(/GIR:LAB2/g, "1/2 LAB Requirement");
	return str;
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

/*** UI/Page-loading functions ***/
function runBeforeUnload(){
	return "Are you sure you want to close CourseRoad? You'll lose any unsaved changes you've made.";
}

var userHashChange = true;
window.onhashchange = function(){
	//userHashChange means that if the user types in a new hash in the URL, 
	//the browser will reload, but if the hash changes due to saving a new version or something it won't.
	userHashChange = !userHashChange || window.location.reload(); 
	document.title = "CourseRoad: "+window.location.hash.substr(1);
}

var reasonToTrySave = preventUpdateWires = false;
var totalUnits = 0;
var crSetup = function(){
	crSetup = undefined;
	$("#getnewclass").tabs({collapsible: false, selected:(loggedin?1:0)});
	user.supersenior = $(".year.supersenior").is(":visible")?1:0;
	setInterval('updateWires();', 10000); //Assures regular updating of the window, should anything change
	if(window.location.hash){
		//Load hash's classes on pageload
		$("#loading").show();
		userHashChange = false;
		window.location.hash = window.location.hash.replace(/\/+$/,'');
		document.title = "CourseRoad: "+window.location.hash.substr(1);
		$.post("?", {gethash:window.location.hash}, function(data){
			$("#loading").hide();
			if(data=="") return false;
			var json = $.parseJSON(data);
			var jsonmajors = json.pop();
			$("select.majorminor").each(function(i){
				$(this).val(jsonmajors[i]).attr("selected",true);
			});
			getClasses(json);
			$(window).off("beforeunload", runBeforeUnload);
		});
		userHashChange = true;
	}
	$("body").on("click", ".classdivyear span", function(){
		var par = $(this).parents(".classdiv");
		if(par.data("changing")) return false;
		par.data("changing", true);
		$(this).replaceWith(function(){return par.data("otheryears");});
		par.data("changing", false);
		par.find(".classdivyear select").focus();
	}).on("change blur", ".classdivyear select", function(event){
		var val = $(this).val();
		var oldclass = $(this).parents(".classdiv");
		if(oldclass.data("changing")) return false;
		oldclass.data("changing", true);
		if(val==oldclass.data("year")){
			$(this).replaceWith(function(){return oldclass.data("yearspan");});
			oldclass.data("changing", false);
			return false;
		}
		oldclass.addClass("classdivlow");
		$.post('?', {getclass:oldclass.data("subject_id"), getyear:val}, function(json){
			if($.inArray(json,["error","noclass",""])!=-1) return false;
			json.classterm = oldclass.data("classterm");
			json.override = oldclass.data("override");
			classFromJSON(json, 0, oldclass);
			addAllWires();
			unhighlightClasses();
		}, "json");
	}).on("click", ".classdiv", function(){
		//Highlights the selected class, dims the others, and displays info on that class in the lower right
		$(".classdiv").not($(this)).removeClass("classdivhigh");
		$(".classdiv").removeClass("classdivlow");
		$(this).toggleClass("classdivhigh");
		if($('.classdivhigh').length==1){
			$("#overrider span").css('opacity', 1);
			$('.classdiv').not($(this)).addClass("classdivlow");
			$('.WireIt-Wire').addClass("WireIt-Wire-low");
			for(i in $(".classdivhigh").data("terminals").terminal.wires){
				$($(".classdivhigh").data("terminals").terminal.wires[i].element).removeClass("WireIt-Wire-low");
			}
			$("#nowreading").html($('.classdivhigh').data("info")).scrollTop(0);
			$("#overridercheck").prop("disabled", false).prop("checked", $('.classdivhigh').data('override'));
		}else{
			unhighlightClasses();
		}
	}).on("click", "canvas.WireIt-Wire", unhighlightClasses).keydown(function(event){
		var cls = $(".classdiv.classdivhigh");
		if(event.which==46 && cls.length && confirm("Are you sure you want to delete "+(cls.data("subject_id")||("\""+cls.data("subject_title")+"\""))+"?")){
			cls.remove();
			unhighlightClasses();
			addAllWires();
		}
	}).on("click", ".my-dialog-close, .ui-widget-overlay", function(){
		$(".my-dialog").dialog('close');
	}).on("click", ".choosesavedroad", function(){
		$.post("?", {choosesavedroad: $(this).val()});
	}).on("click", ".deleteroad", function(){
		if(!confirm("Are you sure you want to delete this road? This action cannot be undone.")) return false;
		var parent = $(this).parents("tr");
		$.post("?", {deleteroad: parent.data("hash")}, function(data){
			if(data=="ok") parent.fadeOut('slow').delay(2000).queue(function(){$(this).remove();});
			if(window.location.hash.substr(1)==parent.data("hash")) $(window).on("beforeunload", runBeforeUnload);
		});
	}).on("click", ".saved-roads-edit-hash", function(){
		var newhash2 = prompt("Enter a new hash for this saved road below (max. 36 characters, letters, numbers, and hyphens only):", $(this).prev().text());
		if(newhash2===false) return false;
		newhash2 = newhash2.substr(0,36);
		var prev = $(this).prev();
		prev.addClass("newload");
		$.post("?", {changeroadhash: $(this).parents("tr").data("hash"), newhash: newhash2}, function(data){
			console.log(data, window.location.hash, prev.parents("tr").data("hash"), window.location.hash==prev.parents("tr").data("hash"));
			if(window.location.hash.substr(1)==prev.parents("tr").data("hash")){
				userHashChange = false;
				window.location.hash = data;
				document.title = "CourseRoad: "+window.location.hash.substr(1);
			}
			prev.text(data.substr(data.indexOf("/")+1)).removeClass("newload").parents("tr").data("hash", data).attr("data-hash", data).find(":radio").val(data).parents("tr").find("a.hashlink").attr("href", "?hash="+data);
		});
	}).on("click", ".saved-roads-edit-comment", function(){
		var comment = prompt("Enter your comment for this saved road below (max. 100 characters):", $(this).prev().text());
		if(comment===false) return false;
		comment = comment.substr(0,100);
		var prev = $(this).prev();
		prev.addClass("newload");
		$.post("?", {commentonroad: $(this).parents("tr").data("hash"), commentforroad: comment}, function(data){
			prev.text(data).removeClass("newload");
		});
	}).on("click", ".dummylink", function(e){
		e.preventDefault();
	});
	$("#overridercheck").change(function(){
		$(".classdivhigh").data("override", $(this).prop("checked"));
		$('.classdivhigh').toggleClass("classdivoverride");
		addAllWires();
	});
	$(".term, .year, #getnewclass, #getnewclass>ul *").click(unhighlightClasses);
	$(".term").sortable({
		//Allows the classes to be draggable and sortable.
		connectWith: '.term', 
		containment: '#rightbar', 
		cursor: 'default', 
		distance: 20, 
		items: '.classdiv',
		opacity: 0.8, 
		placeholder: 'ui-sortable-placeholder', 
		scroll: true, 
		zIndex: 99,
		start: function(event, ui){
			preventUpdateWires = true;
			$('.WireIt-Wire').hide();
			var terms = ["fall","iap","spring","summer"];
			for(s in terms) $("."+terms[s]).addClass(ui.item.data("custom")||ui.item.data(terms[s])?"OKterm":"notOKterm");
		},
		stop: function(event, ui){
			preventUpdateWires = false;
			$('.classdiv').removeAttr("style");
			$('.WireIt-Wire').show();
			$(".term").removeClass("OKterm notOKterm");
			addAllWires();
		}
	}).droppable({
		accept: ".checkbox1_text",
		over: function(event, ui){
			$(".term").not(this).addClass("notOKterm");
			$(this).removeClass("notOKterm");
			ui.helper.attr("data-term",$("#getnewclassterm option").eq($(this).index(".term")).text());
		},
		out: function(event, ui){
			$(this).addClass("notOKterm");
		},
		drop: function(event, ui){
			$(".term").removeClass("notOKterm");
			classterm = $(this).index(".term");
			var data = {getclass: event.target.innerHTML, getyear:0};
			data.getyear = user.classYear - parseInt(3-Math.floor((classterm-1)/4)) - user.supersenior;
			$.post('?', data, function(json){
				if($.inArray(json,["error","noclass",""])!=-1) return false;
				json.classterm = classterm;
				json.override = false;
				classFromJSON(json);
				addAllWires();
			}, "json");
			draggableChecklist();
		}
	});
	$("#rightbar").disableSelection();
	$("#trash").droppable({
		accept: '.classdiv',
		hoverClass: 'drophover',
		tolerance: 'touch',
		activate: function(event, ui){
			$(this).addClass('trashon', 'slow');
		},
		deactivate: function(event, ui){
			$(this).removeClass('trashon', 'fast');
		},
		over: function(event, ui){
			$(".trash").addClass('trashhover', 'fast');
		},
		out: function(event, ui){
			$(".trash").removeClass('trashhover', 'fast');
		},
		drop: function(event, ui){
			preventUpdateWires = false;
			ui.draggable.remove();
			$(".trash").removeClass('trashhover', 'fast');
			addAllWires();
		}
	});
	$('#getnewclassid').blur(function(){ $("#getnewclass .ui-autocomplete").hide();	}).focus();
	$('#getnewclasssubmit').click(getClass);
	$("input[name='getnewclasstype']").change(function(){
		$(".getnewclasstypes").toggleClass("visible").filter(".visible").find("input:first").focus();
	});
	$("#getnewclassid").autocomplete({
		source: function(request, response){
			$.post("?", {autocomplete: request.term}, response, "json");
		},
		minLength: 2,
		appendTo: "#getnewclass",
		disabled: !user.autocomplete
	});
	$(".getnewclasstypes input").keydown(function(event){
		if(event.which==13) getClass();
	});
	$("button.changeclassterm").click(function(){
		$('.getnewclasstypes.visible input:first').focus();
		$("#getnewclassterm").val(Math.max(0, Math.min($("#getnewclassterm option").length-1, parseInt($("#getnewclassterm").val())+parseInt($(this).val()))));
	});
	$("#savemap").click(function(){
		$("#savemap").val("Saving...").prop("disabled",true);
		$.post("?", {classes: minclass(true), majors: minmajors(true), trycert: loggedin}, function(data){
			$(window).off("beforeunload", runBeforeUnload);
			if(loggedin){
				if(data=="**auth**"){
					//This redirects us to the secure cert check.
					window.location.href = "https://courseroad.mit.edu:444/secure.php";
				}else{
					userHashChange = false;
					window.location.hash = data;
					document.title = "CourseRoad: "+window.location.hash.substr(1);
				}	
			}else{
				userHashChange = false;
				window.location.hash = data;
				document.title = "CourseRoad: "+window.location.hash.substr(1);
			}
			$("#savemap").val("Save Courses").prop("disabled",false);
		});
	});
	if(!loggedin && triedlogin) $("#mapcerts").hide();
	$("#mapcerts").click(function(){
		if(loggedin){
			$("#viewroads").dialog("open");
		}else{
			$("#mapcerts").val("Saving...").prop("disabled",true);
			$.post("?", {classes: minclass(true), majors: minmajors(true), trycert: true}, function(data){
				$(window).off("beforeunload", runBeforeUnload);
				if(data=="**auth**"){
					window.location.href = "https://courseroad.mit.edu:444/secure.php";
				}else{
					userHashChange = false;
					window.location.hash = data;
					document.title = "CourseRoad: "+window.location.hash.substr(1);
				}
				$("#mapcerts").val("Save with Login (requires certs)").prop("disabled",false);
			});
		}
	});
	$("select.majorminor").on("change", function(){checkMajor(this);});
	$("#viewroads").dialog({
		autoOpen: false,
		width: 900,
		draggable: false,
		resizeable: false,
		modal: true,
		open: function(event, ui){
			$("#savedroads").html("Loading...");
			$.post("?", {savedroads:1}, function(data){
				$("#savedroads").html(data);
			});
		}
	});
	//Runs the help dialog down below
	$("#help").dialog({
		autoOpen: false,
		width: 600,
		draggable: false,
		resizeable: false,
		modal: true
	});
	$("#accordion").accordion({
		autoHeight: false,
		collapsible: true,
		change: function(event, ui){
			var temp = ui.newContent.length?ui.newContent.position().top:0;
		}
	});
	$("#openhelp").click(function(){
		$("#help").dialog('open').dialog('option', 'position', 'center');
		$( "#accordion" ).accordion( "resize" );
	});
	setTimeout(function(){$("#help").dialog('option', 'position', 'center');$( "#accordion" ).accordion( "resize" );}, 2500);
	$("select.majorminor option").each(function(){
		if(majors[$(this).val()]==undefined) $(this).remove();
	});
	$(window).resize(updateWires);
	$("#printroad").click(function(){
		$("body, #rightbar, .term, .year").toggleClass("printing");
		updateWires();
		window.print();
		$("body, #rightbar, .term, .year").toggleClass("printing");
		updateWires();
	});
	$(".flakyCSS").removeClass("flakyCSS");
	$("#userlogin").click(function(){
		window.location.href = "https://courseroad.mit.edu:444/secure.php";
	});
	$("#usersettings").dialog({
		autoOpen: false,
		draggable: false,
		resizeable: false,
		modal: true
	});
	$("#showusersettings").click(function(){
		$("#usersettings").dialog('open');
	});
	$("#usersettings_save").click(function(){
		var data = {
			usersettings: 1, 
			class_year: $("#usersettings_class_year").val(), 
			toggle_view_req_lines: ($("#usersettings_view_req_lines").prop("checked")?1:0),
			toggle_autocomplete: ($("#usersettings_autocomplete").prop("checked")?1:0)
		};
		$("#usersettings_div").load("?", data, function(){
			user.classYear = parseInt($("#usersettings_class_year").val());
			user.viewReqLines = ($("#usersettings_view_req_lines").prop("checked")?1:0);
			user.autocomplete = ($("#usersettings_autocomplete").prop("checked")?1:0);
			user.needPermission = ($("#usersettings_need_permission").prop("checked")?1:0);
			$("#usersettings_saved").show().delay(1000).fadeOut("slow");
			$("body").toggleClass("no-wires", !user.viewReqLines);
			addAllWires();
			$("#getnewclassid").autocomplete("option", "disabled", !user.autocomplete);
			$(window).off("beforeunload", runBeforeUnload);
		});
	});
	$(".termname span").wrapInner('<a href="http://picker.mit.edu/browse.html?courses=" class="spannamepicker" target="_blank" title="Click to head over to Picker to check your classes for this semester."></a>');
};
