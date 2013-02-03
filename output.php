<?php
header("Content-type: text/javascript;");
//curl -s http://courseroad.mit.edu/output.php?date|env LD_LIBRARY_PATH=~/Downloads/instantclient_11_2 TWO_TASK=warehouse rlwrap -H /tmp/sqlplus_hist ~/Downloads/instantclient_11_2/sqlplus -M "HTML ON" -S dannybd/ohlookawarehousepassword @pull.sql;curl -s http://courseroad.mit.edu/output.php?magnets
if(isset($_GET['date'])) die(date("d-M-Y", time()-10*86400));
if(!isset($_GET['magnets'])) die();
require("connect.php");
$filename = "../../cron_scripts/output.html";
$file = file_get_contents($filename);
preg_match_all("/<td[^>]*>\n(.*?)\n<\/td>/s",$file,$matches);
$matches = $matches[1];
if(!count($matches)){
	file_put_contents($filename,"");
	die("No matches/changes\n");
}
$headers = explode(',',"Academic Year,Subject Id,Subject Code,Subject Number,Source Subject Id,Print Subject Id,Is Printed In Bulletin,Department Code,Department Name,Effective Term Code,Subject Short Title,Subject Title,Is Variable Units,Lecture Units,Lab Units,Preparation Units,Total Units,Design Units,Grade Type,Grade Type Desc,Grade Rule,Grade Rule Desc,Hgn Code,Hgn Desc,Hgn Except,Gir Attribute,Gir Attribute Desc,Comm Req Attribute,Comm Req Attribute Desc,Tuition Attribute,Tuition Attribute Desc,Write Req Attribute,Write Req Attribute Desc,Supervisor Attribute,Supervisor Attribute Desc,Prerequisites,Subject Description,Joint Subjects,School Wide Electives,Meets With Subjects,Equivalent Subjects,Is Offered This Year,Is Offered Fall Term,Is Offered Iap,Is Offered Spring Term,Is Offered Summer Term,Fall Instructors,Spring Instructors,Status Change,Last Activity Date,Warehouse Load Date,Master Subject Id,Hass Attribute,Hass Attribute Desc,Term Duration,Global Regions,Global Countries,On Line Page Number");
foreach($headers as &$header){
	$header = strtr(($header), ' ', '_');
}
$head = count($headers);
//print_r($headers);
$courses = array();
for($i=0;$i<count($matches);$i++){
	$row = floor($i / $head);
	$pos = $i % $head;
	if($matches[$i]=="&nbsp;") $matches[$i]="";
	$courses[$row][$headers[$pos]] = mysql_real_escape_string(html_entity_decode(trim($matches[$i])));
}
echo "ADDING ".count($courses)." COURSES:\n\n";
//print_r($courses);
foreach($courses as &$course){
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
	
	//print_r($course2);
	//print_r($course['Last_Activity_Date']."\n");
	$sql = "";
	$sql = "INSERT INTO `warehouse` VALUES (NULL, '".implode("', '",$course2)."', CURRENT_TIMESTAMP, '', '');";
	mysql_query($sql);
	echo "\n$sql\n\n";
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

file_put_contents($filename,"");
?>
