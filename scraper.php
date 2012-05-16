<?php
require("connect.php");

header("Content-type: text/javascript");
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
course
title
fall
iap*
spring
summer*
units
unitload
prereq
coreq
SCI
HASS
CI
info
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