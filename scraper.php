<?php

die();
/*
echo "HERE:<br><pre>";
print_r($_SERVER);
echo "</pre>";
die();
//*/
require("connect.php");

header("Content-type: text/javascript");

/*
	TO COPY FROM WAREHOUSE TO THE EXCEPTIONS TABLE:
	"INSERT INTO `warehouse_exceptions` (SELECT * FROM `warehouse` WHERE `id`='25')"
	INSERT INTO `warehouse_exceptions` (SELECT * FROM `warehouse` WHERE `subject_id` LIKE '18.100%' AND `subject_number`!='100')
//*/
//$map = array(0, 1,2,3, 5,6,7, 9,10,11, 13,14,15);

//$sql = "SELECT * FROM `roads2` WHERE `id`>'5472' ORDER BY `id` ASC";
//$sql = "SELECT DISTINCT `majors` FROM `roads2` WHERE `majors` NOT LIKE '[%'";
//$sql = "SELECT * FROM `roads2` WHERE `id`>'5714' ORDER BY `id` ASC";
//$sql = "SELECT * FROM `roads2` ORDER BY `id` DESC";
//$query = mysql_query($sql);
/*
while($row = mysql_fetch_array($query)){
	//echo print_r($row,true), "\n\n";
	$classes = encrypt($row['classes']);
	$majors = encrypt($row['majors']);
	//echo $classes;
	//$majors = mysql_real_escape_string(json_encode(array($row["majors"],"m0","m0","m0")));
	//echo "\n$majors";
	/*
	$hash = $row['hash'];
	$user = $row['user'];
	//*/
	/*
	echo $row['classes']."\n\n";
	$classes = json_decode(stripslashes($row['classes']), true);
	foreach($classes as &$class){
		$class["term"] = $map[$class["term"]];
	}
	$classes = mysql_real_escape_string(json_encode($classes));
	echo stripslashes($classes);
	echo "\n";
	///
	//echo $majors;
	//$public = $row['public'];
	//$ip = $row['ip'];
	//$added = $row['added'];
	//print_r(json_decode(stripslashes($classes),true));
	//echo json_encode($classes)==$row['classes'];
	///
	$sql = "UPDATE `roads2` SET `classes`='$classes', `majors`='$majors' WHERE `id`='{$row['id']}'";
	//$sql = "INSERT INTO `roads2`(`hash`, `user`, `classes`, `majors`, `public`, `ip`, `added`) VALUES ('$hash','$user','$classes','$majors','$public','$ip','$added')";
	echo $sql;
	//mysql_query($sql);
	echo "\n------------------------\n\n";
	//break;
}
echo "YAY";

die();
//*/
/*
echo <<<EOD
id
year
subject_id
subject_code
subject_number
subject_title
joint_subjects
equiv_subjects
gir
ci
hass
is_variable_units [Y/N->1/0]
unitload
total_units
grade_type
grade_rule
reqstr
reqs
desc
offered_this_year
fall
iap
spring
summer
fall_instructors
spring_instructors
design_units
tuition_attr
supervisor_attr
hgn_code
hgn_except
last_modified
notes
extraclasses

EOD;//*/

/*
	In BrioQuery: SELECT * FROM `CIS_COURSE_CATALOG` WHERE `Last Activity Date`>'08/18/2012';
//*/

$handle = fopen('archive/Warehouse-update-20120819.csv', 'r');
$headers = fgetcsv($handle);
foreach($headers as &$header){
	$header = strtr(($header), ' ', '_');
}
//print_r($headers);
//echo "\n";
/*
for($i=0;$i<33009;$i++) fgetcsv($handle);
for($i=33011;$i<53111;$i++){
	$course = fgetcsv($handle);
	if(!$course) break;
	$course = array_combine($headers, $course);
	$r = $course['Prerequisites']; 
	if(!$r) continue;
	if($r=="Permission of instructor") continue;
	echo "{$course['Subject_Id']}\t({$course['Academic_Year']})\t<$i>\n";
	echo "\tIN:  ".$r."\n";
	echo "\tOUT: ".json_encode(parseReqs2($r))."\n\n";
}
//*/
for($i=1;$i<=10000;$i++){
	$course = fgetcsv($handle);
	if(!$course) break;
	$course = array_combine($headers, $course);
	foreach($course as &$val) $val = mysql_real_escape_string($val);
	
	$course2 = array();
	$course2[] = $course['Academic_Year'];			//year
	$course2[] = $course['Subject_Id'];				//subject_id
	$course2[] = $course['Subject_Code'];			//subject_code
	$course2[] = $course['Subject_Number'];			//subject_number
	$course2[] = $course['Subject_Title'];			//subject_title
	$course2[] = $course['Joint_Subjects'];			//joint_subjects
	$course2[] = $course['Equivalent_Subjects'];	//equiv_subjects
	$course2[] = $course['Gir_Attribute'];			//gir
	$course2[] = $course['Comm_Req_Attribute'];		//ci
	$course2[] = $course['Hass_Attribute'];			//hass
	if(!$course['Is_Variable_Units']) $course['Is_Variable_Units']='Y';
	$course2[] = strtr($course['Is_Variable_Units'], 'YN', '10');		//is_variable_units
	$course2[] = intval($course['Lecture_Units']).'-'.intval($course['Lab_Units']).'-'.intval($course['Preparation_Units']);		//unitload
	$course2[] = intval($course['Total_Units']);			//total_units
	$course2[] = $course['Grade_Type'];				//grade_type
	$course2[] = $course['Grade_Rule'];				//grade_rule
	$course2[] = $course['Prerequisites'];			//reqstr
	//parse things here
	$course2[] = mysql_real_escape_string(json_encode(parseReqs2($course['Prerequisites'])));			//reqs
	$course2[] = $course['Subject_Description'];	//desc
	if(!$course['Is_Offered_This_Year']) $course['Is_Offered_This_Year']='N';
	$course2[] = strtr($course['Is_Offered_This_Year'], 'YN', '10');		//offered_this_year
	$course2[] = strtr($course['Is_Offered_Fall_Term'], 'YN', '10');		//fall
	$course2[] = strtr($course['Is_Offered_Iap'], 'YN', '10');				//iap
	$course2[] = strtr($course['Is_Offered_Spring_Term'], 'YN', '10');		//spring
	$course2[] = strtr($course['Is_Offered_Summer_Term'], 'YN', '10');		//summer
	$course2[] = $course['Fall_Instructors'];		//fall_instructors
	$course2[] = $course['Spring_Instructors'];		//spring_instructors
	$course2[] = $course['Design_Units'];			//design_units
	$course2[] = $course['Tuition_Attribute'];		//tuition_attr
	$course2[] = $course['Supervisor_Attribute'];	//supervisor_attr
	$course2[] = $course['Hgn_Code'];				//hgn_code
	$course2[] = $course['Hgn_Except'];				//hgn_except
	
	
	print_r($course2);
	//$sql = "INSERT INTO `warehouse` VALUES (NULL, '".implode("', '",$course2)."', CURRENT_TIMESTAMP, '', '');";
	//mysql_query($sql);
	echo "\n$sql\n\n";
}
//
//print_r($course);
/*
$course2 = array();
$course2[] = $course['Academic_Year'];			//year
$course2[] = $course['Subject_Id'];				//subject_id
$course2[] = $course['Subject_Code'];			//subject_code
$course2[] = $course['Subject_Number'];			//subject_number
$course2[] = $course['Subject_Title'];			//subject_title
$course2[] = $course['Joint_Subjects'];			//joint_subjects
$course2[] = $course['Equivalent_Subjects'];	//equiv_subjects
$course2[] = $course['Gir_Attribute'];			//GIR
$course2[] = $course['Comm_Req_Attribute'];		//CI
$course2[] = $course['Hass_Attribute'];			//HASS
if(!$course['Is_Variable_Units']) $course['Is_Variable_Units']='Y';
$course2[] = strtr($course['Is_Variable_Units'], 'YN', '10');		//is_variable_units
$course2[] = intval($course['Lecture_Units']).'-'.intval($course['Lab_Units']).'-'.intval($course['Preparation_Units']);		//unitload
$course2[] = intval($course['Total_Units']);			//total_units
$course2[] = $course['Grade_Type'];				//grade_type
$course2[] = $course['Grade_Rule'];				//grade_rule
$course2[] = $course['Prerequisites'];			//reqstr
//parse things here
$course2[] = mysql_real_escape_string(json_encode(parseReqs2($course['Prerequisites'])));			//reqs
$course2[] = $course['Subject_Description'];	//desc
if(!$course['Is_Offered_This_Year']) $course['Is_Offered_This_Year']='N';
$course2[] = strtr($course['Is_Offered_This_Year'], 'YN', '10');		//offered_this_year
$course2[] = strtr($course['Is_Offered_Fall_Term'], 'YN', '10');		//fall
$course2[] = strtr($course['Is_Offered_Iap'], 'YN', '10');				//iap
$course2[] = strtr($course['Is_Offered_Spring_Term'], 'YN', '10');		//spring
$course2[] = strtr($course['Is_Offered_Summer_Term'], 'YN', '10');		//summer
$course2[] = $course['Fall_Instructors'];		//fall_instructors
$course2[] = $course['Spring_Instructors'];		//spring_instructors
$course2[] = $course['Design_Units'];			//design_units
$course2[] = $course['Tuition_Attribute'];		//tuition_attr
$course2[] = $course['Supervisor_Attribute'];	//supervisor_attr
$course2[] = $course['Hgn_Code'];				//hgn_code
$course2[] = $course['Hgn_Except'];				//hgn_except
//*/




//print_r($course2);
fclose($handle);

//$sql = "INSERT INTO `catalog` VALUES (NULL, '".implode("', '",$course2)."', CURRENT_TIMESTAMP);";
//echo $sql;

/*
testReq("");
testReq("6.013, 8.07, or 22.105; 18.04 or [18.075]");
testReq("6.602, 6.621, 6.630, or 6.631");
testReq("2.006, 2.06, 2.016, 2.20, or 2.25; 18.075");
testReq("3.022, 3.20, 3.23 or permission of instructor");
testReq("6.003 or 2.003, GIR:PHY2; or permission of instructor");
testReq("GIR:BIOL; 2.002, 2.006, 6.013, 10.301, or 10.302");
testReq("Permission of instructor or [7.51 and 7.52]");
testReq("GIR:CAL2, GIR:CHEM, GIR:PHY1; [GIR:PHY2]");
testReq("6.431, 15.085J, or 18.100");
testReq("6.241; [18.100]");
testReq("[1.061, 1.070]");
testReq("1.060; [1.106, 1.070; or permission of instructor]");
testReq("Permission of instructor; or [15.714, 15.722]");
testReq("16.004 or permission of instructor; [16.09 or 6.041]");
testReq("8.282J, 12.402J, 12.409, or other introductory astronomy course; [8.03]");
testReq("2.003 or 2.03; [2.005, 2.05 and 2.051, or 2.016; 2.671]");
testReq("[CC.A10, CC.010, or CC.011]");
testReq("Permission of instructor, [10.85 (10.87)]");
testReq("24.900 or permission of instructor or [9.00]");
testReq("[21F.171-175, 21F.181-185, 21F.371-374, 21F.471-474, 21F.571-576, 21F.771-774, or 21F.792]");
testReq("5.60, 7.012/7.013/7.014");
testReq("");
//*/

function testReq($r){
	echo "IN:  $r\nOUT: ";
	$j = json_encode(parseReqs2($r));
	//$j = str_replace('"~{', '{', $j);
	//$j = str_replace('}~"', '}', $j);
	echo $j;
	echo "\n\n";
}

function parseReqs2($str){
	//$str = preg_replace("/<(.*?)>/s", "", $str);
	$str = str_replace('permission','Permission',$str);
	$str = str_replace('; or Permission','',$str);
	$str = str_replace(' or Permission',', or Permission',$str);
	$str = str_replace(' of instructor','',$str);
	$str = str_replace(' (GIR)','',$str);
	$str = str_replace('None.','',$str);
	$str = str_replace('None','',$str);
	$str = str_replace('and/or','or',$str);
	$reqpaths = explode(';',$str);
	$temp = array();
	$coreq = false;
	$endcoreq = false;
	
	//Priorities run ; then OR then AND.
	
	foreach($reqpaths as &$series){
		/*
		if(strpos($series,'Permission')!==false){
			$temp[] = "Permission";
			continue;
		}
		//*/
		if(strpos($series,' or ')!==false){ //or series
			$series = str_replace(' or ', ',',$series);
			$temp2 = explode(',',$series);
			$temp3 = array();
			$temp3[] = 1;
			foreach($temp2 as &$course){
				$course = trim($course);
				if(!$course) continue;
				if($course[0]=='[') $coreq = true;
				if(substr($course, -1)==']') $endcoreq = true;
				$course = rtrim(ltrim($course, '['), 'J]');
				if(strpos($course,' and ')!==false){
					$course = explode(' and ', $course);
					$course = array(2, req(trim($course[0]), $coreq), req(trim($course[1]), $coreq));
					$temp3[] = $course;
				}else{
					if(substr($course, 0, 4)=="GIR:") $course = strtr($course, ':', '.');
					$temp3[] = req($course, $coreq);
				}
				if($endcoreq) $coreq = $endcoreq = false;
			}
			if(count($temp3)>1) $temp[] = $temp3;
			continue;
		}
		$temp2 = explode(',',$series); //and series
		foreach($temp2 as &$course){
			$course = trim($course);
			if(!$course) continue;
			if($course[0]=='[') $coreq = true;
			if(substr($course, -1)==']') $endcoreq = true;
			$course = rtrim(ltrim($course, '['), 'J]');
			//if(substr($course, 0, 4)=="GIR:") $course = strtr($course, ':', '.');
			$temp[] = req($course, $coreq);
			if($endcoreq) $coreq = $endcoreq = false;
		}
	}
	array_unshift($temp, count($temp));
	return count($temp)>1?$temp:false;
}

function req($str, $isCoreq){
	return $isCoreq?array("id"=>$str, "coreq"=>1):$str;
}
die();

$runsql = false;
//$runsql = true;

$search = "http://student.mit.edu/catalog/search.cgi?search=";
$courses = array(
	"http://student.mit.edu/catalog/m1a.html", 
	"http://student.mit.edu/catalog/m1b.html", 
	"http://student.mit.edu/catalog/m1c.html", 
	"http://student.mit.edu/catalog/m2a.html", 
	"http://student.mit.edu/catalog/m2b.html", 
	"http://student.mit.edu/catalog/m2c.html", 
	"http://student.mit.edu/catalog/m3a.html", 
	"http://student.mit.edu/catalog/m3b.html", 
	"http://student.mit.edu/catalog/m4a.html", 
	"http://student.mit.edu/catalog/m4b.html", 
	"http://student.mit.edu/catalog/m4c.html", 
	"http://student.mit.edu/catalog/m4d.html", 
	"http://student.mit.edu/catalog/m4e.html", 
	"http://student.mit.edu/catalog/m4f.html", 
	"http://student.mit.edu/catalog/m4g.html", 
	"http://student.mit.edu/catalog/m5a.html", 
	"http://student.mit.edu/catalog/m5b.html", 
	"http://student.mit.edu/catalog/m6a.html", 
	"http://student.mit.edu/catalog/m6b.html", 
	"http://student.mit.edu/catalog/m6c.html", 
	"http://student.mit.edu/catalog/m7a.html", 
	"http://student.mit.edu/catalog/m8a.html", 
	"http://student.mit.edu/catalog/m8b.html", 
	"http://student.mit.edu/catalog/m9a.html", 
	"http://student.mit.edu/catalog/m9b.html", 
	"http://student.mit.edu/catalog/m10a.html", 
	"http://student.mit.edu/catalog/m10b.html", 
	"http://student.mit.edu/catalog/m11a.html", 
	"http://student.mit.edu/catalog/m11b.html", 
	"http://student.mit.edu/catalog/m11c.html", 
	"http://student.mit.edu/catalog/m12a.html", 
	"http://student.mit.edu/catalog/m12b.html", 
	"http://student.mit.edu/catalog/m12c.html", 
	"http://student.mit.edu/catalog/m13a.html", 
	"http://student.mit.edu/catalog/m14a.html", 
	"http://student.mit.edu/catalog/m14b.html", 
	"http://student.mit.edu/catalog/m15a.html", 
	"http://student.mit.edu/catalog/m15b.html", 
	"http://student.mit.edu/catalog/m15c.html", 
	"http://student.mit.edu/catalog/m16a.html", 
	"http://student.mit.edu/catalog/m16b.html", 
	"http://student.mit.edu/catalog/m17a.html", 
	"http://student.mit.edu/catalog/m17b.html", 
	"http://student.mit.edu/catalog/m18a.html", 
	"http://student.mit.edu/catalog/m18b.html", 
	"http://student.mit.edu/catalog/m20a.html", 
	"http://student.mit.edu/catalog/m21a.html", 
	"http://student.mit.edu/catalog/m21Aa.html", 
	"http://student.mit.edu/catalog/m21Fa.html", 
	"http://student.mit.edu/catalog/m21Fb.html", 
	"http://student.mit.edu/catalog/m21Fc.html", 
	"http://student.mit.edu/catalog/m21Fd.html", 
	"http://student.mit.edu/catalog/m21Fe.html", 
	"http://student.mit.edu/catalog/m21Ff.html", 
	"http://student.mit.edu/catalog/m21Fg.html", 
	"http://student.mit.edu/catalog/m21Fh.html", 
	"http://student.mit.edu/catalog/m21Fi.html", 
	"http://student.mit.edu/catalog/m21Ha.html", 
	"http://student.mit.edu/catalog/m21Hb.html", 
	"http://student.mit.edu/catalog/m21La.html", 
	"http://student.mit.edu/catalog/m21Ma.html", 
	"http://student.mit.edu/catalog/m21Mb.html", 
	"http://student.mit.edu/catalog/mWGSa.html", 
	"http://student.mit.edu/catalog/m21Wa.html", 
	"http://student.mit.edu/catalog/m21Wb.html",
	"http://student.mit.edu/catalog/m22a.html", 
	"http://student.mit.edu/catalog/m22b.html", 
	"http://student.mit.edu/catalog/m22c.html", 
	"http://student.mit.edu/catalog/m24a.html", 
	"http://student.mit.edu/catalog/m24b.html", 
	"http://student.mit.edu/catalog/mCCa.html", 
	"http://student.mit.edu/catalog/mCMSa.html", 
	"http://student.mit.edu/catalog/mCSBa.html", 
	"http://student.mit.edu/catalog/mECa.html", 
	"http://student.mit.edu/catalog/mECb.html", 
	"http://student.mit.edu/catalog/mESa.html", 
	"http://student.mit.edu/catalog/mESDa.html", 
	"http://student.mit.edu/catalog/mHSTa.html", 
	"http://student.mit.edu/catalog/mHSTb.html", 
	"http://student.mit.edu/catalog/mMASa.html", 
	"http://student.mit.edu/catalog/mASa.html",
	"http://student.mit.edu/catalog/mMSa.html",
	"http://student.mit.edu/catalog/mNSa.html",	
	"http://student.mit.edu/catalog/mSTSa.html", 
	"http://student.mit.edu/catalog/mSTSb.html", 
	"http://student.mit.edu/catalog/mSWEa.html", 
	"http://student.mit.edu/catalog/mSPa.html", 
	"http://student.mit.edu/catalog/mSPb.html"
);

function cut(){
	$temp = func_get_arg(0);
	$cuts = func_get_args();
	array_shift($cuts);
	foreach($cuts as $cut){
		$temp = is_int($cut)?substr($temp, $cut):strstr($temp, $cut);
	}
	return $temp;
}

function strbounds($str, $start, $end, $include=false, $offsets=0, $offsete=0){
	$temp = $str;
	if(is_string($start)) $start = strpos($temp, $start);
	$temp = substr($temp, $start+$offsets);
	if(is_string($end)) $end = strpos($temp, $end)+($include?strlen($end):0);
	$temp = substr($temp, 0, $end+$offsete);
	return $temp;
}

function parseReqs($str){
	$str = preg_replace("/<(.*?)>/s", "", $str);
	$str = str_replace('permission','Permission',$str);
	$str = str_replace('; or Permission','',$str);
	$str = str_replace(' or Permission',', or Permission',$str);
	$str = str_replace(' of instructor','',$str);
	$str = str_replace(' (GIR)','',$str);
	$str = str_replace('None.','',$str);
	$str = str_replace('None','',$str);
	$reqpaths = explode(';',$str);
	$temp = array();
	foreach($reqpaths as &$series){
		/*
		if(strpos($series,'Permission')!==false){
			$temp[] = "Permission";
			continue;
		}
		//*/
		if(strpos($series,' or ')!==false){ //or series
			$series = str_replace(' or ',',',$series);
			$temp2 = explode(',',$series);
			$temp3 = array();
			$temp3[] = 1;
			foreach($temp2 as &$course){
				$course = trim($course);
				if(!$course) continue;
				if(strpos($course,' and ')!==false){
					$course = explode(' and ', $course);
					$course = array(2, trim($course[0]), trim($course[1]));
				}
				$temp3[] = $course;
			}
			if(count($temp3)>1) $temp[] = $temp3;
			continue;
		}
		$temp2 = explode(',',$series); //and series
		foreach($temp2 as &$course){
			$course = trim($course);
			if(!$course) continue;
			$temp[] = $course;
		}
	}
	array_unshift($temp, count($temp));
	return count($temp)>1?$temp:false;
}

/*
id
year
subject_id
subject_code
subject_number
subject_title
joint_subjects
equiv_subjects
GIR
CI
HASS
is_variable_units [Y/N->1/0]
unitload
total_units
grade_type
grade_rule
reqstr
reqs
desc
offered_this_year
fall
iap
spring
summer
fall_instructors
spring_instructors
design_units
tuition_attr
supervisor_attr
hgn_code
hgn_except
added

FROM


Academic Year
Subject Id
Subject Code
Subject Number
Subject Title
Is Variable Units
**	Lecture Units
**	Lab Units
**	Preparation Units
Total Units
Design Units (?)
Grade Type
Grade Rule
Hgn Code
Hgn Except
Gir Attribute
Comm Req Attribute
Tuition Attribute
Supervisor Attribute
Prerequisites

Subject Description
Joint Subjects
School Wide Electives
Equivalent Subjects
Is Offered This Year
Is Offered Fall Term
Is Offered Iap
Is Offered Spring Term
Is Offered Summer Term
Fall Instructors
Spring Instructors
Hass Attribute
//*/
//echo "<table>";
//print_r(parseReqs($_GET['p']));
//die();
$SCI = array('Physics I', 'Physics II', 'Calculus I', 'Calculus II', 'Chemistry', 'Biology');
$HASS = array('HASS Elective', 'HASS Arts', 'HASS Humanities', 'HASS Social Sciences');
$CI = array('Communication Intensive HASS', 'Communication Intensive Writing');
$regex1 = "/<a name=\"(?'course'.*?)\">.*?<h3>.*? (?'title'.*?)\n*<br>.*?<\/h3>.*?(?'imgdata'<img.*?<br>).*?(\(Same .*?\n*<br>?)?.*?(?:Prereq: (?'prereq'.*?)\n*<br>?)?.*?(?:Units: (?'unitload'.*?)\n*<br>?)?.*?hr.gif.*?<br>(?'desc'.*?)\n*(?:<\/p><!--end-->|<a name)/s";
$regex2 = "/alt=\"(.*?)\"/s";
if($_GET['n']!=-1){
	$course = $courses[$_GET['n']?$_GET['n']:21];
	$courses = array($course);
}
foreach($courses as $course){
	$data = array();
	preg_match_all($regex1, file_get_contents($course), $results);
	for($i=0;$i<count($results[0]);$i++){
		preg_match_all($regex2, $results['imgdata'][$i], $results['imgdata'][$i]);
		$results['imgdata'][$i] = $results['imgdata'][$i][1];
		//if(!in_array('Undergrad',$results['imgdata'][$i])) continue;
		$data[] = array();
		foreach($results as $key=>&$value){
			if(is_int($key)) continue;
			//*
			if($key=='imgdata'){
				$data[$i]['year'] = 2012;
				$data[$i]['fall'] = intval(in_array('Fall', $value[$i]));
				$data[$i]['iap'] = intval(in_array('IAP', $value[$i]));
				$data[$i]['spring'] = intval(in_array('Spring', $value[$i]));
				$data[$i]['summer'] = intval(in_array('Summer', $value[$i]));
				$data[$i]['SCI'] = array_pop(array_intersect($SCI, $value[$i]));
				$data[$i]['HASS'] = array_pop(array_intersect($HASS, $value[$i]));
				$data[$i]['CI'] = array_pop(array_intersect($CI, $value[$i]));
				$data[$i]['REST'] = intval(in_array('Rest Elec in Sci & Tech', $value[$i]));
				$data[$i]['LAB'] = intval(in_array('Institute Lab', $value[$i]))?12:0;
				$data[$i]['LAB'] = intval(in_array('1/2 Institute Lab', $value[$i]))?6:$data[$i]['LAB'];
				$data[$i]['isGIR'] = intval($data[$i]['SCI'].$data[$i]['HASS'].$data[$i]['CI'].($data[$i]['REST']+$data[$i]['LAB']!=0) == true);
				$data[$i]['imgdata'] = mysql_real_escape_string(serialize($value[$i]));
				continue;
			}
			//*/
			if($key=='unitload'){
				$data[$i]['units'] = array_sum(explode('-',$value[$i]));
			}
			if($key=='prereq'){
				$data[$i]['reqstr'] = mysql_real_escape_string($value[$i]);
				$data[$i]['prereq'] = explode('Coreq:', $value[$i]);
				$data[$i]['coreq'] = parseReqs(count($data[$i]['prereq'])>1?$data[$i]['prereq'][1]:'');
				$data[$i]['prereq'] = parseReqs($data[$i]['prereq'][0]);
				if($data[$i]['prereq']) $data[$i]['prereq'] = mysql_real_escape_string(serialize($data[$i]['prereq']));
				if($data[$i]['coreq'])  $data[$i]['coreq']  = mysql_real_escape_string(serialize($data[$i]['coreq']));
				continue;
			}
			$data[$i][$key] = mysql_real_escape_string($value[$i]);
		}
		$sql = "INSERT INTO `catalog` VALUES (NULL, '".implode("', '",$data[$i])."', CURRENT_TIMESTAMP);";
		//echo $sql."\n\n\n";
		if($runsql) mysql_query($sql); //Uncomment to populate the database.
	}
	print_r($data);
}
//This line moves over exceptions.
if($runsql) mysql_query("INSERT `catalog` (`course`,`title`,`year`,`fall`,`iap`,`spring`,`summer`,`SCI`,`HASS`,`CI`,`REST`,`LAB`,`isGIR`,`imgdata`,`reqstr`,`prereq`,`coreq`,`units`,`unitload`,`desc`,`added`) SELECT `course`,`title`,`year`,`fall`,`iap`,`spring`,`summer`,`SCI`,`HASS`,`CI`,`REST`,`LAB`,`isGIR`,`imgdata`,`reqstr`,`prereq`,`coreq`,`units`,`unitload`,`desc`,`added` FROM `exceptions` WHERE 1");
echo "</table>";
?>