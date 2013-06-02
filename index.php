<?php
/******************************************************************/
//	CourseRoad: A Four-Year Planner for the MIT Undergraduate Community
//	August 17, 2012
//	By: Danny Ben-David (dannybd@mit.edu)
//	
//	CourseRoad is published under the MIT License, as follows:
//
//	Copyright (c) 2012 Danny Ben-David (dannybd@mit.edu)
//
//	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
//	and associated documentation files (the "Software"), to deal in the Software without restriction, 
//	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
//	subject to the following conditions:
//
//	The above copyright notice and this permission notice shall be included in all copies or substantial 
//	portions of the Software.
//
//	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
//	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
//	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
//	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
/******************************************************************/

require("connect.php"); //connect to database
session_start();

if(isset($_GET['dev'])) $_POST = $_POST + $_GET; //REMOVE AFTER DEVELOPMENT (allows me to test POST code)

if(isset($_GET['addclasses'])){
	if(!isset($_GET['year'])) $_GET['year'] = false;
	if(!isset($_GET['term'])) $_GET['term'] = 1;
	$_SESSION['addterm'] = array('year'=>mysql_real_escape_string($_GET['year']),'term'=>mysql_real_escape_string($_GET['term']),'classes'=>explode(',',mysql_real_escape_string($_GET['addclasses'])));
	if(!isset($_GET['hash'])) $_GET['hash'] = "";
}

if(isset($_GET['hash'])){
	$_SESSION['thishash'] = $_GET['hash'];
	header("Location: $baseURL/#".urldecode($_GET['hash']));
	die();
}

$_SESSION['wenttoindex'] = true;

$addterm = false;
if(isset($_SESSION['addterm'])){
	$addterm = $_SESSION['addterm'];
	unset($_SESSION['addterm']);
}
$thishash = false;
if(isset($_SESSION['thishash'])){
	$thishash = $_SESSION['thishash'];
	unset($_SESSION['thishash']);
}
/*
Future planning: base64 encoded class info sent in, detected here, redirect to secure.php with proper checks, send back to here with prompt for choosing a road to add it to, then load that road in the background (no redirect) and change the hash.

Also changing roads by refresh shouldn't be necessary...

Also fix the wire library already
//*/

//autocomplete business
if(isset($_POST['autocomplete'])){
	$term = mysql_real_escape_string($_POST['autocomplete']);
	$temp = array();
	$query = mysql_query("SELECT DISTINCT `subject_id` FROM `warehouse` WHERE `subject_id` LIKE '$term%' ORDER BY `subject_id` LIMIT 6");
	while($row = mysql_fetch_array($query)) $temp[] = $row['subject_id'];
	die(json_encode($temp));
}

function pullClass($class, $year=false, $classterm=0, $override=false){
	$sql = "SELECT *, '0' AS exception FROM `warehouse` WHERE `subject_id`='$class' UNION ALL SELECT *, '1' AS exception FROM `warehouse_exceptions` WHERE `subject_id`='$class' ORDER BY".($year?" ABS(`year`-'$year') ASC,":" `year` DESC,")." exception DESC, `last_modified` DESC;";
	$row = mysql_fetch_assoc(mysql_query($sql));
	if(!$row) return "noclass";
	unset($row['id']);
	unset($row['design_units']);
	unset($row['tuition_attr']);
	unset($row['supervisor_attr']);
	unset($row['hgn_code']);
	unset($row['hgn_except']);
	unset($row['last_modified']);
	unset($row['notes']);
	unset($row['exception']);
	$row['id'] = str_replace('.','_',$row['subject_id']);
	$row['divid'] = $row['id']."__".rand();
	$row['is_variable_units'] = ($row['is_variable_units']=='1');
	$row['offered_this_year'] = ($row['offered_this_year']=='1');
	$row['fall'] = ($row['fall']=='1');
	$row['iap'] = ($row['iap']=='1');
	$row['spring'] = ($row['spring']=='1');
	$row['summer'] = ($row['summer']=='1');
	$row['permission'] = (strpos($row['reqs'],'Permission')!=false);
	$row['reqs'] = json_decode($row['reqs']);
	$reqs = $row['reqs']?"Reqs: [X]":"No reqs :D";
	if($row['reqstr']) $row['reqstr'] = "Requisites: ".$row['reqstr']."<br>";
	$row['total_units'] = floatval($row['total_units']);
	if(!$row['total_units']) $row['total_units'] = 12;
	$row['info'] = <<<EOD
Additional info for <strong>{$row['subject_id']}</strong>:<br>
<strong>{$row['subject_title']}</strong><br>
<a href="http://student.mit.edu/catalog/search.cgi?search={$row['subject_id']}" target="_blank">Course Catalog</a> &#149;
<a href="https://sisapp.mit.edu/ose-rpt/subjectEvaluationSearch.htm?search=Search&subjectCode={$row['subject_id']}" target="_blank">Class Evalutions</a><br>
{$row['reqstr']}
<p class='infounits'>{$row['unitload']} ({$row['total_units']} units)</p><br>
<p class='infoinfo'>{$row['desc']}</p>
EOD;
	$row['divclasses']  = "classdiv bubble";
	$row['divclasses'] .= " ".$row['id'];
	$row['joint_subjects'] = explode(', ', $row['joint_subjects']);
	foreach($row['joint_subjects'] as &$subj) $subj = rtrim($subj, 'J');
	if(!$row['joint_subjects'][0]) $row['joint_subjects'] = false;
	$row['equiv_subjects'] = explode(', ', $row['equiv_subjects']);
	foreach($row['equiv_subjects'] as &$subj) $subj = rtrim($subj, 'J');
	if(!$row['equiv_subjects'][0]) $row['equiv_subjects'] = false;
	if($row['joint_subjects']) $row['divclasses'] .= " ".str_replace(".","_",implode(' ',$row['joint_subjects']));
	if($row['gir'] and $row['gir'][0]=="H") $row['gir'] = "";
	if($row['gir']) $row['divclasses'] .= " GIR ".$row['gir'];
	if($row['ci']) $row['divclasses'] .= " CI ".$row['ci'];
	if($row['hass']) $row['divclasses'] .= " HASS ".$row['hass'];
	if($row['extraclasses']) $row['divclasses'] .= " ".str_replace(".","_",$row['extraclasses']);
	
	$row['special'] = ($row['gir'] or $row['ci'] or $row['hass']);
	$row['classterm'] = $classterm;
	$row['override'] = $override;
	$row['custom'] = false;
	
	$row['ayear'] = "'".substr($row['year']-1,-2)."-'".substr($row['year'],-2);
	$row['oyear'] = $year?$year:(date("Y")+(date("m")>3));
	$row['otheryears'] = "<select>";
	$query = mysql_query("SELECT DISTINCT `year` FROM `warehouse` WHERE `subject_id`='{$row['subject_id']}' ORDER BY `year` DESC");
	while($row2 = mysql_fetch_assoc($query)){
		$year2 = $row2['year'];
		$ayear2 = "'".substr($year2-1,-2)."-'".substr($year2,-2);
		$row['otheryears'] .= "\n\t<option value='$year2'";
		$row['otheryears'] .= ($year2==$row['year'])?" selected='true'>":">";
		$row['otheryears'] .= "$ayear2</option>";
	}
	$row['yearspan'] = "<span title=\"The data for this class is from the {$row['ayear']} version of the subject. Click to use another year's version.\" href=\"#\" class=\"dummylink\">{$row['ayear']}</span>";
	$row['otheryears'] .= "\n<select>";	
	//the $row['div'] actually stores the HTML of the class bubble.
	$row['div'] = <<<EOD
<div id="{$row['divid']}" class="{$row['divclasses']}">
	<div class="classdivlabel">
		<div class="classdivcourse">{$row['subject_id']}:&nbsp;</div>
		<div class="classdivtitle" title="{$row['subject_title']}">{$row['subject_title']}</div>
	</div>
	<div class="classdivinfo">
		<div class="classdivyear">{$row['yearspan']}</div>
		<div class="reqs">$reqs</div>
	</div>
</div>
EOD;
	return $row;
}

function pullCustom($name, $units, $classterm=0, $override=false){
	$row = array();
	$row['year'] = "0";
	$row['id'] = substr(preg_replace('/[^A-Za-z]/', '', $name), 0, 8);
	$row['divid'] = $row['id']."__".rand();
	$row['subject_title'] = $name;
	$row['total_units'] = floatval($units);
	if(!$row['total_units']) $row['total_units'] = 0;
	$row['info'] = <<<EOD
<strong>{$row['subject_title']}</strong><br>
<p class='infounits'>({$row['total_units']} units)</p><br>
<p class='infoinfo'>[This is a user-defined subject.]</p>
EOD;
	$row['divclasses']  = "classdiv bubble custom";
	$row['classterm'] = $classterm;
	$row['checkrepeat'] = true;
	$row['override'] = $override;
	$row['custom'] = true;
	//the $row['div'] actually stores the HTML of the class bubble.
	$row['div'] = <<<EOD
<div id="{$row['divid']}" class="{$row['divclasses']}">
	<div class="classdivlabel">
		<div class="classdivtitle" title="{$row['subject_title']}">{$row['subject_title']}</div>
	</div>
	<div class="classdivinfo">
		<div>({$row['total_units']} units)</div>
	</div>
</div>
EOD;
	return $row;
}

//loads class data from the database and serves up the JSON CourseRoad requires to load that class.
if(isset($_POST['getclass'])){
	header("Content-type: text/javascript");
	$class = mysql_real_escape_string($_POST['getclass']);
	$year = isset($_POST['getyear'])?mysql_real_escape_string($_POST['getyear']):false;
	//echo $class;
	die(json_encode(pullClass($class, $year)));
}

if(isset($_POST['getcustom'])){
	header("Content-type: text/javascript");
	$name = htmlentities($_POST['getcustom']);
	$units = isset($_POST['getunits'])?floatval($_POST['getunits']):false;
	die(json_encode(pullCustom($name, $units)));
}

//Returns the desired hash's class and major data
if(isset($_POST['gethash'])){
	header("Content-type: text/javascript");
	$hash = mysql_real_escape_string(substr($_POST['gethash'],1));
	$_SESSION['crhash'] = $hash;
	$sql = "SELECT `classes`,`majors` FROM `roads2` WHERE (`hash`='$hash' OR (`hash` LIKE '$hash/%' AND `public`='1')) ORDER BY `added` DESC LIMIT 0,1";
	$query = mysql_query($sql);
	$classes = '';
	$majors = '';
	while($row = mysql_fetch_array($query)){
		$classes = json_decode(decrypt($row['classes']), true);
		$majors = stripslashes(decrypt($row['majors']));
	}
	if($classes=='') die();
	$majors = json_decode($majors, true);
	$json = array();
	foreach($classes as $class){
		if(isset($class["custom"])){
			$json[] = pullCustom($class["name"], $class["units"], $class["term"], $class["override"]);
		}else{
			$tempclass = pullClass($class["id"], $class["year"], $class["term"], $class["override"]);
			if($tempclass!="noclass") $json[] = $tempclass;
		}
	}
	$json[] = $majors;
	die(json_encode($json));
}

if($addterm){
	$json = array();
	foreach($addterm["classes"] as $class){
		$tempclass = pullClass(rtrim($class,'J'), $addterm["year"], $addterm["term"], false);	
		if($tempclass!="noclass") $json[] = $tempclass;
	}
	$addterm = mysql_real_escape_string(json_encode($json));
}

if($thishash){
	$thishash = mysql_real_escape_string($thishash);
	$_SESSION['crhash'] = $thishash;
	$sql = "SELECT `classes`,`majors` FROM `roads2` WHERE (`hash`='$thishash' OR (`hash` LIKE '$thishash/%' AND `public`='1')) ORDER BY `added` DESC LIMIT 0,1";
	$query = mysql_query($sql);
	$classes = '';
	$majors = '';
	while($row = mysql_fetch_array($query)){
		$classes = json_decode(decrypt($row['classes']), true);
		$majors = stripslashes(decrypt($row['majors']));
	}
	if($classes=='') $classes=array();
	$majors = json_decode($majors, true);
	$json = array();
	foreach($classes as $class){
		if(isset($class["custom"])){
			$json[] = pullCustom($class["name"], $class["units"], $class["term"], $class["override"]);
		}else{
			$tempclass = pullClass($class["id"], $class["year"], $class["term"], $class["override"]);
			if($tempclass!="noclass") $json[] = $tempclass;
		}
	}
	$json[] = $majors;
	$thishash = mysql_real_escape_string(json_encode($json));
}

//For certification purposes.
if(!isset($_SESSION['triedcert'])) $_SESSION['triedcert'] = false;
$loggedin = isset($_SESSION['athena']);
$athena = $loggedin?mysql_real_escape_string($_SESSION['athena']):false;
if(!isset($_SESSION['user'])) $_SESSION['user'] = array('class_year'=>'2016','view_req_lines'=>1,'autocomplete'=>1,'need_permission'=>0,'edited'=>0);
if($loggedin){
	$tempuser = mysql_fetch_assoc(mysql_query("SELECT * FROM `users` WHERE `athena`='$athena'"));
	if($tempuser){
		$_SESSION['user']['class_year'] = $tempuser['class_year'];
		$_SESSION['user']['view_req_lines'] = $tempuser['view_req_lines'];
		$_SESSION['user']['autocomplete'] = $tempuser['autocomplete'];
		$_SESSION['user']['need_permission'] = $tempuser['need_permission'];
		unset($tempuser);
	}
}

//This runs if the user has click "save road". It determines the login status of the user 
//and sets the hash to be either random characters or something like username-20120504051511
if(isset($_POST['classes'])){
	$classes = mysql_real_escape_string(encrypt($_POST['classes']));
	$majors = mysql_real_escape_string(encrypt($_POST['majors']));
	$hash = substr(strtr(base64_encode(md5($classes.$majors)), '+/=', '-_,'),0,5);
	for($i="";mysql_num_rows(mysql_query("SELECT 1 FROM `roads2` WHERE `hash`='$hash$i' AND `classes`!='$classes' AND `majors`!='$majors' LIMIT 0,1"));$i===""?$i=0:$i++);
	$hash .= $i;
	$_SESSION['crhash'] = $hash;
	$trycert = false;
	if($_POST['trycert']){
		if($loggedin){
			$saveas = date("YmdHis");
			$hash = $athena.'/'.$saveas;
		}else if(!$_SESSION['triedcert']){
			$_SESSION['trycert'] = true;
		}
	}
	//id, hash, user, classes, majors, public, desc, ip, added
	$sql = "INSERT INTO `roads2` (`hash`, `user`, `classes`, `majors`, `ip`) VALUES ('$hash', '$athena', '$classes', '$majors', '{$_SERVER['REMOTE_ADDR']}');";
	mysql_query($sql);
	die(isset($_SESSION['trycert'])?"**auth**":$hash); //The **auth** lets the user's browser know to try to log in
}

if(isset($_SESSION['trycert']) or isset($_GET['triedlogin'])){
	//This only happens when the check has failed, and the user isn't authenticated.
	$_SESSION['triedcert'] = true;
	unset($_SESSION['trycert']);
	if(!isset($_SESSION['crhash'])) $_SESSION['crhash']="error401";
	header("Location: $baseURL/#{$_SESSION['crhash']}");
	die();
}

//Returns the desired table of saved roads when the user is logged in
if(isset($_POST['savedroads'])){
	if(!$loggedin) die("Sorry, you need to log in again.");
	$sql = "SELECT * FROM `roads2` WHERE `user`='$athena' ORDER BY `added` DESC";
	$query = mysql_query($sql);
	echo "<table>\n";
	echo "<tr>";
	echo "<th style=\"min-width:50px\" title=\"Select if you'd like one of your saved roads to be available more easily at courseroad.mit.edu/index.php#{$_SESSION['athena']}\">Public</th>";
	echo "<th style=\"min-width:118px\">Hash</th>";
	echo "<th style=\"min-width:118px\">Added</th>";
	echo "<th style=\"min-width:95px\">Major(s)</th>";
	echo "<th>Classes</th>";
	echo "<th style=\"min-width:30px;max-width:120px;\">Comment</th>";
	echo "<th>Delete?</th>";
	echo "</tr>\n";
	echo "<tr>";
	$numrows = mysql_query("SELECT COUNT(*) FROM `roads2` WHERE `hash` LIKE '$athena/%' AND `public`='1'");
	$numrows = mysql_fetch_array($numrows);
	$numrows = $numrows[0];
	echo "<td><input type=\"radio\" name=\"choosesavedroad\" class=\"choosesavedroad\" value=\"null\" ".($numrows?"":"checked=\"true\" ")."/></td>";
	echo "<td colspan=\"6\">Select this row to prevent any of your saved roads from being your publicly-facing road.</td>";
	echo "</tr>\n";
	while($row = mysql_fetch_array($query)){
		$row['classes'] = decrypt($row['classes']);
		$row['majors'] = decrypt($row['majors']);
		$hash = stripslashes($row['hash']);
		$roadURL = "?hash=$hash";
		echo "<tr data-hash=\"$hash\">";
		echo "<td><input type=\"radio\" name=\"choosesavedroad\" class=\"choosesavedroad\" value=\"$hash\" ".($row['public']=="1"?"checked=\"true\" ":"")."/></td>";
		echo "<td><span class=\"saved-roads-hash\">".substr(strstr($hash, "/"),1)."</span><span class=\"saved-roads-edit-hash ui-icon ui-icon-pencil\"></span></td>";
		echo "<td><a class=\"hashlink\" href=\"$roadURL\">".stripslashes($row['added'])."</a></td>";
		$majors = stripslashes($row['majors']);
		if($majors[0]!='[') $majors = "[\"$majors\"]";
		$majors = str_replace(',"m0"','',$majors);
		$majors = implode(",<br>\n", json_decode($majors));
		echo "<td>$majors</td>";
		$classes = json_decode($row['classes'], true);
		$classes2 = array();
		foreach($classes as &$class2){
			if(isset($class2["custom"])) $class2["id"] = '('.$class2["name"].')';
			if(!isset($class2["id"])) continue;
			if($class2["override"]) $class2["id"] .= "*";
			$classes2[] = $class2["id"];
		}
		echo "<td>".implode(", ", $classes2)."</td>";
		echo "<td><span class=\"saved-roads-comment\">{$row['comment']}</span><span class=\"saved-roads-edit-comment ui-icon ui-icon-pencil\"></span></td>";
		echo "<td><span class=\"deleteroad ui-icon ui-icon-close\"></span></td>";
		echo "</tr>\n";
	}
	echo "</table>";
	die();
}

//Runs when the user sets one of their roads to be their public road
if(isset($_POST['choosesavedroad'])){
	$hash = mysql_real_escape_string($_POST['choosesavedroad']);
	if(!$loggedin) die();
	if(($athena!=strstr($hash, '/', true)) and ($hash!="null")) die();
	mysql_query("UPDATE `roads2` SET `public`= CASE WHEN `hash`='$hash' THEN '1' ELSE '0' END WHERE `user`='$athena'");
	die("ok");
}
//When the user changes a road's hash
if(isset($_POST['changeroadhash'])){
	$hash = mysql_real_escape_string($_POST['changeroadhash']);
	$newhash = mysql_real_escape_string($athena."/".htmlentities(substr($_POST['newhash'],0,36)));
	if(!$loggedin or preg_match('/\/.*?[^A-Za-z0-9\-]/', $newhash) or !strlen($_POST['newhash'])) die($hash);
	if(($athena!=strstr($hash, '/', true)) and ($hash!="null")) die($hash);
	if(mysql_num_rows(mysql_query("SELECT * FROM `roads2` WHERE `hash`='$newhash'"))) die($hash);
	mysql_query("UPDATE `roads2` SET `hash`='$newhash' WHERE `hash`='$hash'");
	die($newhash);
}
//And when the user adds a comment
if(isset($_POST['commentonroad'])){
	$hash = mysql_real_escape_string($_POST['commentonroad']);
	$comment = mysql_real_escape_string(htmlentities(substr($_POST['commentforroad'],0,100)));
	if(!$loggedin) die($hash);
	if(($athena!=strstr($hash, '/', true)) and ($hash!="null")) die();
	mysql_query("UPDATE `roads2` SET `comment`='$comment' WHERE `hash`='$hash'");
	die(stripslashes($comment));
}
//Similarly, runs when the user deletes a road.
if(isset($_POST['deleteroad'])){
	$hash = mysql_real_escape_string($_POST['deleteroad']);
	if(!$loggedin) die();
	if(($athena!=strstr($hash, '/', true)) and ($hash!="null")) die();
	if($hash!="null") mysql_query("DELETE FROM `roads2` WHERE `hash`='$hash'");
	die("ok");
}

if(isset($_POST['usersettings'])){
	$_SESSION['user']['class_year'] = intval(mysql_real_escape_string($_POST['class_year']));
	$_SESSION['user']['view_req_lines'] = ($_POST['toggle_view_req_lines']=="1")?1:0;
	$_SESSION['user']['autocomplete'] = (mysql_real_escape_string($_POST['toggle_autocomplete'])==1)?1:0;
	$_SESSION['user']['edited'] = $loggedin?0:1;
	if($loggedin) mysql_query("UPDATE `users` SET `class_year`='{$_SESSION['user']['class_year']}', `view_req_lines`='{$_SESSION['user']['view_req_lines']}', `autocomplete`='{$_SESSION['user']['autocomplete']}' WHERE `athena`='$athena'");
	$view_req_lines = $_SESSION['user']['view_req_lines']?'checked="checked"':'';
	$autocomplete = $_SESSION['user']['autocomplete']?'checked="checked"':'';
	echo <<<EOD
		<label for="usersettings_class_year">Class Year: </label><input id="usersettings_class_year" type="text" name="class_year" value="{$_SESSION['user']['class_year']}"><br>
		<label for="usersettings_view_req_lines">Toggle requisite lines: </label><input id="usersettings_view_req_lines" type="checkbox" name="view_req_lines" value="1" $view_req_lines><br>
		<label for="usersettings_autocomplete">Toggle autocomplete: </label><input id="usersettings_autocomplete" type="checkbox" name="autocomplete" value="1" $autocomplete><br>
EOD;
	die();
}

if(isset($_GET['user'])) die("user<br><pre>".print_r(@$_SESSION, true)."\n\n\n".print_r(@$_SERVER, true)."</pre>");

$nocache = isset($_GET['nocache']);
$nocache = true; //Uncomment during development
$nocache = $nocache?"?nocache=".time():"?v2.0"; //This can help force through updates to the linked js and css files in browsers that love to hold on to cached versions; for debugging only.
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<!--[if IE 7]><html lang="en-us" class="ie ie7 lte9 lte8"><![endif]-->
<!--[if IE 8]><html lang="en-us" class="ie ie8 lte9 lte8"><![endif]-->
<!--[if IE 9]><html lang="en-us" class="ie ie9 lte9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="en-us"><!--<![endif]-->
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="A Four-Year Planner for the MIT Undergraduate Community" />
	<title>CourseRoad<?= $loggedin?": $athena":"" ?></title>
	<link rel="stylesheet" type="text/css" href="/css/cr.css<?= $nocache ?>">
	<!--[if lt IE 9]><script type="text/javascript" src="/js/excanvas.compiled.js"></script><![endif]-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	<script src="/js/cr.js<?= $nocache ?>"></script>
	<!--script src="/js/d3.js"></script-->
	<script>
		var _gaq=[["_setAccount","UA-31018454-1"],["_trackPageview",location.pathname+location.search+location.hash]];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
		g.src="https://ssl.google-analytics.com/ga.js";
		s.parentNode.insertBefore(g,s)}(document,"script"));
		var loggedin = <?= intval($loggedin) ?>;
		var triedlogin = <?= intval($_SESSION['triedcert']) ?>; //These are not trusted variables, but they do aid in displaying different (non-secure) things based on login status.
		var user = {classYear:<?= $_SESSION['user']['class_year'] ?>, viewReqLines:<?= $_SESSION['user']['view_req_lines'] ?>, autocomplete:<?= $_SESSION['user']['autocomplete'] ?>, needPermission:<?= $_SESSION['user']['need_permission'] ?>};
		var addterm = $.parseJSON('<?= $addterm ?>')||0;
		var thishash = $.parseJSON('<?= $thishash ?>')||0;
		$(crSetup);
	</script>
</head>
<body>
<div id="leftbar">
	<div id="getnewclass">
		<ul>
			<li><a href="#infotabs-about">About</a></li>
			<li><a href="#infotabs-add">Add</a></li>
			<li><a href="#infotabs-save">Save</a></li>
		</ul>
		<div id="infotabs-about" class="ui-corner-all leftbarholder">
			<div class="infotabs-about-header flakyCSS">Welcome to CourseRoad!</div>
			<div class="infotabs-about-subheader flakyCSS">A four-year planner for the MIT community.</div>
			<a id="openhelp" href="#" class="dummylink">Help</a> ~ <a href="/blog" target="_blank">Blog</a>
			<br>
			<?= $loggedin?"Hello, <strong>$athena</strong>! ":"<input type=\"button\" id=\"userlogin\" class=\"bubble loaders\" value=\"Login\"".($_SESSION['triedcert']?" disabled=\"disabled\" title=\"Sorry, we couldn't log you in. Try reopening your browser.\">":">") ?>
			<input type="button" id="showusersettings" class="bubble loaders" value="User Settings">
		</div>
		<div id="infotabs-add" class="ui-corner-all leftbarholder">
			Class Type:&nbsp;
			<input type="radio" name="getnewclasstype" id="getnewclasstype-subject" value="subject" checked><label for="getnewclasstype-subject" title="18.01, CMS.631, etc.">Subject</label>
			&nbsp;
			<input type="radio" name="getnewclasstype" id="getnewclasstype-custom" value="custom"><label for="getnewclasstype-custom" title="Summer UROP, Lab Assistant, etc.">Custom</label>
			<br>
			<span>Add</span>
			<div id="getnewclass-class"  class="getnewclasstypes visible">
				<input id="getnewclassid" type="text" name="classid" placeholder="18.01" pattern="[A-Za-z0-9\.]*" autofocus>
			</div>
			<div id="getnewclass-custom" class="getnewclasstypes">
				<input id="getnewclassname" type="text" name="classname" placeholder="UROP">
				&nbsp;(<input id="getnewclassunits" type="text" name="classunits" placeholder="0" pattern="[0-9\.]*"> units)
			</div>
			<br>
			&nbsp;to 
			<select id="getnewclassterm" name="classterm">
				<option value="0">Prior Credit</option>
				<option value="1">Freshman Fall</option>
				<option value="2">Freshman IAP</option>
				<option value="3">Freshman Spring</option>
				<option value="4">Freshman Summer</option>
				<option value="5">Sophomore Fall</option>
				<option value="6">Sophomore IAP</option>
				<option value="7">Sophomore Spring</option>
				<option value="8">Sophomore Summer</option>
				<option value="9">Junior Fall</option>
				<option value="10">Junior IAP</option>
				<option value="11">Junior Spring</option>
				<option value="12">Junior Summer</option>
				<option value="13">Senior Fall</option>
				<option value="14">Senior IAP</option>
				<option value="15">Senior Spring</option>
				<option value="16">Senior Summer</option>
				<option value="17">Super-Senior Fall</option>
				<option value="18">Super-Senior IAP</option>
				<option value="19">Super-Senior Spring</option>
				<option value="20">Super-Senior Summer</option>
			</select>
				<button type="button" id="changeclassterm-up" class="bubble loaders changeclassterm ui-button" value="-1">
					<span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-n"></span>
				</button>
				<button type="button" id="changeclassterm-down" class="bubble loaders changeclassterm ui-button" value="1">
					<span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span>
				</button>
			<br> 
			<input type="button" id="getnewclasssubmit" class="bubble loaders" value="Add Class">
		</div>
		<div id="infotabs-save" class="ui-corner-all leftbarholder">
			<input type="button" id="savemap" class="bubble loaders" value="Save Courses">
			<input type="button" id="mapcerts" class="bubble loaders" value="<?= isset($_SESSION['athena'])?"View Saved Roads":"Save with Login (requires certs)"; ?>"><br><br>
		</div>
	</div>
	<div id="COREchecker" class="leftbarholder">
	<strong>General Institute Requirements:</strong><br>
		Physics I: <span id="Physics_I" class="checkbox1 corecheck GIR PHY1">[<span>&#x2713;</span>]</span><br>
		Physics II: <span id="Physics_II" class="checkbox1 corecheck GIR PHY2">[<span>&#x2713;</span>]</span><br>
		Calculus I: <span id="Calculus_I" class="checkbox1 corecheck GIR CAL1">[<span>&#x2713;</span>]</span><br>
		Calculus II: <span id="Calculus_II" class="checkbox1 corecheck GIR CAL2">[<span>&#x2713;</span>]</span><br>
		Chemistry: <span id="Chemistry" class="checkbox1 corecheck GIR CHEM">[<span>&#x2713;</span>]</span><br>
		Biology: <span id="Biology" class="checkbox1 corecheck GIR BIOL">[<span>&#x2713;</span>]</span><br>
		REST <span id="REST" class="checkbox1 corecheck GIR REST">[<span>&#x2713;</span>]</span>&nbsp;<span id="REST2" class="checkbox1 corecheck GIR REST">[<span>&#x2713;</span>]</span><br>
		LAB <span id="LAB" class="checkbox1 corecheck GIR LAB LAB2">[<span>&#x2713;</span>]</span>&nbsp;<span id="LAB2" class="checkbox1 corecheck GIR LAB LAB2">[<span>&#x2713;</span>]</span><br>
		-----------------<br>
		CI-H <span id="CI_H" class="checkbox1 corecheck CI CIH CIHW">[<span>&#x2713;</span>]</span>&nbsp;<span id="CI_H2" class="checkbox1 corecheck CI CIH CIHW">[<span>&#x2713;</span>]</span><br>
		-----------------<br>
		HASS:<br>
		&nbsp;&nbsp;&nbsp;A <span id="HASS_Arts" class="checkbox1 corecheck HASS HA">[<span>&#x2713;</span>]</span>
					&nbsp;H <span id="HASS_Humanities" class="checkbox1 corecheck HASS HH">[<span>&#x2713;</span>]</span>
					&nbsp;S <span id="HASS_Social_Sciences" class="checkbox1 corecheck HASS HS">[<span>&#x2713;</span>]</span><br>
		&nbsp;&nbsp;&nbsp;Other HASS: 
		<span id="HASS_E"  class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
		<span id="HASS_E2" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
		<span id="HASS_E3" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
		<span id="HASS_E4" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span>
		<span id="HASS_E5" class="checkbox1 corecheck HASS HE">[<span>&#x2713;</span>]</span><br>
		<span class="majorminor">-----------------<br></span>
		<select id="choosemajor" name="choosemajor" class="majorminor" data-div="#majorreqs">
			<option value="m0">---Select a Major---</option>
			<option value="m1_A">1A -- Engineering</option>
			<option value="m1_C">1C -- Civil Engineering</option>
			<option value="m1_E">1E -- Environmental Engineering Science</option>
			<option value="m2">2 -- Mechanical Engineering</option>
			<option value="m2_A_new">2A (new) -- Engineering</option>
			<option value="m2_A_old">2A (old) -- Engineering</option>
			<option value="m2_OE">2-OE -- Ocean Engineering</option>
			<option value="m3">3 -- Materials Science and Engineering</option>
			<option value="m3_A">3A	-- Materials Science and Engineering</option>
			<option value="m3_C">3C -- Archaeology and Materials</option>
			<option value="m4_archdesign">4 -- Architecture (Architectural Design)</option>
			<option value="m4_buildingtech">4 -- Architecture (Building Technology)</option>
			<option value="m4_computation">4 -- Architecture (Computation)</option>
			<option value="m4_history">4 -- Architecture (History, Theory, and Criticism)</option>
			<option value="m4_artculture">4 -- Architecture (Art, Culture, and Technology)</option>
			<option value="m5">5 -- Chemistry</option>
			<option value="m6_1">6-1 -- Electrical Science and Engineering</option>
			<option value="m6_2">6-2 -- Electrical Engineering and Computer Science</option>
			<option value="m6_3">6-3 -- Computer Science and Engineering</option>
			<option value="m6_7">6-7 -- Computer Science and Molecular Biology</option>
			<option value="m7">7 -- Biology</option>
			<option value="m7a">7A -- Biology</option>
			<option value="m8_flexible">8 -- Physics (Flexible)</option>
			<option value="m8_focused">8 -- Physics (Focused)</option>
			<option value="m9">9 -- Brain and Cognitive Sciences</option>
			<option value="m10">10 -- Chemical Engineering</option>
			<option value="m10_B">10B -- Chemical-Biological Engineering</option>
			<option value="m10_ENG">10-ENG -- Engineering</option>
			<option value="m11_enviro">11 -- Urban and Environmental Policy and Planning</option>
			<option value="m11_society">11 -- Urban Society, History, and Politics</option>
			<option value="m11_regional">11 -- Urban and Regional Public Policy</option>
			<option value="m11_international">11 -- Urban and International Development</option>
			<option value="m12">12 -- Earth, Atmospheric, and Planetary Sciences</option>
			<option value="m14">14 -- Economics</option>
			<option value="m15">15 -- Management / Management Science</option>
			<option value="m16_1">16-1 -- Aerospace Engineering</option>
			<option value="m16_2">16-2 -- Aerospace Engineering with Information Technology</option>
			<option value="m16_ENG">16-ENG -- Engineering</option>
			<option value="m17">17 -- Political Science</option>
			<option value="m18_general">18 -- Mathematics (General Option)</option>
			<option value="m18_applied">18 -- Mathematics (Applied Option)</option>
			<option value="m18_theoretical">18 -- Mathematics (Theoretical Option)</option>
			<option value="m18_C">18-C -- Mathematics with Computer Science</option>
			<option value="m20">20 -- Biological/Biomedical Engineering</option>
			<option value="m21_german">21 -- German Focus</option>
			<option value="m21">21 -- Ancient and Medieval Studies</option>
			<option value="m21">21 -- East Asian Studies</option>
			<option value="m21">21 -- German</option>
			<option value="m21">21 -- Humanities</option>
			<option value="m21">21 -- Latin American Studies</option>
			<option value="m21">21 -- Psychology</option>
			<option value="m21">21 -- Russian Studies</option>
			<option value="m21_german">21 -- German Studies</option>
			<option value="m21_A">21A -- Anthropology</option>
			<option value="m21_E">21E -- Humanities and Engineering</option>
			<option value="m21_F_french">21F -- French Studies</option>
			<option value="m21_F_spanish">21F -- Spanish Studies</option>
			<option value="m21_H">21H -- History</option>
			<option value="m21_L">21L -- Literature</option>
			<option value="m21_M">21M -- Music</option>
			<option value="m21_S">21S -- Humanities and Science</option>
			<option value="m21_W_creative">21W -- Writing (Creative Writing focus)</option>
			<option value="m21_W_science">21W -- Writing (Science Writing focus)</option>
			<option value="m21_W_digital">21W -- Writing (Digital Media focus)</option>
			<option value="m22">22 -- Nuclear Science & Engineering</option>
			<option value="m24_1">24-1 -- Philosophy</option>
			<option value="m24_2_linguistics">24-2 -- Linguistics</option>
			<option value="m24_2_philosophy">24-2 -- Philosophy / Linguistics</option>
			<option value="mCMS">CMS -- Comparative Media Studies</option>
			<option value="mSTS">STS -- Science, Technology and Society</option>
			<option value="mWGS">WGS -- Women's and Gender Studies</option>
		</select><br>
		<div id="majorreqs" class="majorminor"></div>
		<span class="majorminor">-----------------<br></span>
		<select id="choosemajor2" name="choosemajor2" class="majorminor" data-div="#majorreqs2">
			<option value="m0">---Select a Major---</option>
			<option value="m1_A">1A -- Engineering</option>
			<option value="m1_C">1C -- Civil Engineering</option>
			<option value="m1_E">1E -- Environmental Engineering Science</option>
			<option value="m2">2 -- Mechanical Engineering</option>
			<option value="m2_A_new">2A (new) -- Engineering</option>
			<option value="m2_A_old">2A (old) -- Engineering</option>
			<option value="m2_OE">2-OE -- Ocean Engineering</option>
			<option value="m3">3 -- Materials Science and Engineering</option>
			<option value="m3_A">3A	-- Materials Science and Engineering</option>
			<option value="m3_C">3C -- Archaeology and Materials</option>
			<option value="m4_archdesign">4 -- Architecture (Architectural Design)</option>
			<option value="m4_buildingtech">4 -- Architecture (Building Technology)</option>
			<option value="m4_computation">4 -- Architecture (Computation)</option>
			<option value="m4_history">4 -- Architecture (History, Theory, and Criticism)</option>
			<option value="m4_artculture">4 -- Architecture (Art, Culture, and Technology)</option>
			<option value="m5">5 -- Chemistry</option>
			<option value="m6_1">6-1 -- Electrical Science and Engineering</option>
			<option value="m6_2">6-2 -- Electrical Engineering and Computer Science</option>
			<option value="m6_3">6-3 -- Computer Science and Engineering</option>
			<option value="m6_7">6-7 -- Computer Science and Molecular Biology</option>
			<option value="m7">7 -- Biology</option>
			<option value="m7a">7A -- Biology</option>
			<option value="m8_flexible">8 -- Physics (Flexible)</option>
			<option value="m8_focused">8 -- Physics (Focused)</option>
			<option value="m9">9 -- Brain and Cognitive Sciences</option>
			<option value="m10">10 -- Chemical Engineering</option>
			<option value="m10_B">10B -- Chemical-Biological Engineering</option>
			<option value="m10_ENG">10-ENG -- Engineering</option>
			<option value="m11_enviro">11 -- Urban and Environmental Policy and Planning</option>
			<option value="m11_society">11 -- Urban Society, History, and Politics</option>
			<option value="m11_regional">11 -- Urban and Regional Public Policy</option>
			<option value="m12">12 -- Earth, Atmospheric, and Planetary Sciences</option>
			<option value="m14">14 -- Economics</option>
			<option value="m15">15 -- Management / Management Science</option>
			<option value="m16_1">16-1 -- Aerospace Engineering</option>
			<option value="m16_2">16-2 -- Aerospace Engineering with Information Technology</option>
			<option value="m16_ENG">16-ENG -- Engineering</option>
			<option value="m17">17 -- Political Science</option>
			<option value="m18_general">18 -- Mathematics (General Option)</option>
			<option value="m18_applied">18 -- Mathematics (Applied Option)</option>
			<option value="m18_theoretical">18 -- Mathematics (Theoretical Option)</option>
			<option value="m18_C">18-C -- Mathematics with Computer Science</option>
			<option value="m20">20 -- Biological/Biomedical Engineering</option>
			<option value="m21_german">21 -- German Focus</option>
			<option value="m21">21 -- Ancient and Medieval Studies</option>
			<option value="m21">21 -- East Asian Studies</option>
			<option value="m21">21 -- German</option>
			<option value="m21">21 -- Humanities</option>
			<option value="m21">21 -- Latin American Studies</option>
			<option value="m21">21 -- Psychology</option>
			<option value="m21">21 -- Russian Studies</option>
			<option value="m21_german">21 -- German Studies</option>
			<option value="m21_A">21A -- Anthropology</option>
			<option value="m21_E">21E -- Humanities and Engineering</option>
			<option value="m21_F_french">21F -- French Studies</option>
			<option value="m21_F_spanish">21F -- Spanish Studies</option>
			<option value="m21_H">21H -- History</option>
			<option value="m21_L">21L -- Literature</option>
			<option value="m21_M">21M -- Music</option>
			<option value="m21_S">21S -- Humanities and Science</option>
			<option value="m21_W_creative">21W -- Writing (Creative Writing focus)</option>
			<option value="m21_W_science">21W -- Writing (Science Writing focus)</option>
			<option value="m21_W_digital">21W -- Writing (Digital Media focus)</option>
			<option value="m22">22 -- Nuclear Science & Engineering</option>
			<option value="m24_1">24-1 -- Philosophy</option>
			<option value="m24_2_linguistics">24-2 -- Linguistics</option>
			<option value="m24_2_philosophy">24-2 -- Philosophy / Linguistics</option>
			<option value="mCMS">CMS -- Comparative Media Studies</option>
			<option value="mSTS">STS -- Science, Technology and Society</option>
			<option value="mWGS">WGS -- Women's and Gender Studies</option>
		</select><br>
		<div id="majorreqs2" class="majorminor"></div>
		<span class="majorminor">-----------------<br></span>
		<select id="chooseminor" name="chooseminor" class="majorminor" data-div="#minorreqs">
			<option value="m0">---Select a Minor---</option>
			<option value="miPremed">Pre-Med Path</option>
			<option value="miArchitecture">Minor in Architecture</option>
			<option value="miHist_Architecture_Art">Minor in the History of Architecture and Art</option>
			<option value="miArt_culture_tech">Minor in Art, Culture and Technology</option>
			<option value="miUrban_studies_and_planning">Minor in Urban Studies and Planning</option>
			<option value="miInternational_development">Minor in International Development</option>
			<option value="miToxicology_and_enviro_health">Minor in Toxicology and Environmental Health</option>
			<option value="miCivil_Engineering">Minor in Civil Engineering</option>
			<option value="miEnvrio_Engineering_Science">Minor in Environmental Engineering Science</option>
			<option value="miAnthropology">Minor in Anthropology</option>
			<option value="miCMS">Minor in Comparative Media Studies</option>
			<option value="miBiology">Minor in Biology</option>
			<option value="miBrain_Cog_Sci">Minor in Brain and Cognitive Sciences</option>
			<option value="miChemistry">Minor in Chemistry</option>
			<option value="miEarth_Atmos_Planetary">Minor in Earth, Atmospheric, and Planetary Sciences</option>
			<option value="miEcon">Minor in Economics</option>
			<option value="miWriting">Minor in Writing</option>
			<option value="miManagement">Minor in Management</option>
			<option value="miManagement_science">Minor in Management Science</option>
			<option value="miSTS">Minor in Science, Technology, and Society</option>
			<option value="miMusic">Minor in Music</option>
			<option value="miTheater_arts">Minor in Theater Arts</option>
			<option value="miPhilosophy">Minor in Philosophy</option>
			<option value="miLinguistics">Minor in Linguistics</option>
			<option value="miMSE">Minor in Material Science and Engineering</option>
			<option value="miArchaeology">Minor in Archaeology and Materials</option>
			<option value="miMathematics">Minor in Mathematics</option>
			<option value="miMechE">Minor in Mechanical Engineering</option>
			<option value="miNuclear_science">Minor in Nuclear Science and Engineering</option>
			<option value="miPhysics">Minor in Physics</option>
			<option value="miPolitical_science">Minor in Political Science</option>
			<option value="miChinese">Minor in Chinese</option>
			<option value="miFrench">Minor in French</option>
			<option value="miGerman">Minor in German</option>
			<option value="miSpanish">Minor in Spanish</option>
			<option value="miJapanese">Minor in Japanese</option>
			<option value="miAsian">Minor in Asian and Asian Diaspora Studies</option>
			<option value="miHistory">Minor in History</option>
			<option value="miLiterature">Minor in Literature</option>
			<option value="miAncient_and_medieval">Minor in Ancient and Medieval Studies</option>
			<option value="miApplied_international">Minor in Applied International Studies</option>
			<option value="miAstronomy">Minor in Astronomy</option>
			<option value="miBiomed">Minor in Biomedical Engineering</option>
			<option value="miEnergy_studies">Minor in Energy Studies</option>
			<option value="miPsych">Minor in Psychology</option>
			<option value="miPublic_policy">Minor in Public Policy</option>
		</select><br>
		<div id="minorreqs" class="majorminor"></div>
		<span class="majorminor">-----------------<br></span>
		<select id="chooseminor2" name="chooseminor2" class="majorminor" data-div="#minorreqs2">
			<option value="m0">---Select a Minor---</option>
			<option value="miPremed">Pre-Med Path</option>
			<option value="miArchitecture">Minor in Architecture</option>
			<option value="miHist_Architecture_Art">Minor in the History of Architecture and Art</option>
			<option value="miArt_culture_tech">Minor in Art, Culture and Technology</option>
			<option value="miUrban_studies_and_planning">Minor in Urban Studies and Planning</option>
			<option value="miInternational_development">Minor in International Development</option>
			<option value="miToxicology_and_enviro_health">Minor in Toxicology and Environmental Health</option>
			<option value="miCivil_Engineering">Minor in Civil Engineering</option>
			<option value="miEnvrio_Engineering_Science">Minor in Environmental Engineering Science</option>
			<option value="miAnthropology">Minor in Anthropology</option>
			<option value="miCMS">Minor in Comparative Media Studies</option>
			<option value="miBiology">Minor in Biology</option>
			<option value="miBrain_Cog_Sci">Minor in Brain and Cognitive Sciences</option>
			<option value="miChemistry">Minor in Chemistry</option>
			<option value="miEarth_Atmos_Planetary">Minor in Earth, Atmospheric, and Planetary Sciences</option>
			<option value="miEcon">Minor in Economics</option>
			<option value="miWriting">Minor in Writing</option>
			<option value="miManagement">Minor in Management</option>
			<option value="miManagement_science">Minor in Management Science</option>
			<option value="miSTS">Minor in Science, Technology, and Society</option>
			<option value="miMusic">Minor in Music</option>
			<option value="miTheater_arts">Minor in Theater Arts</option>
			<option value="miPhilosophy">Minor in Philosophy</option>
			<option value="miLinguistics">Minor in Linguistics</option>
			<option value="miMSE">Minor in Material Science and Engineering</option>
			<option value="miArchaeology">Minor in Archaeology and Materials</option>
			<option value="miMathematics">Minor in Mathematics</option>
			<option value="miMechE">Minor in Mechanical Engineering</option>
			<option value="miNuclear_science">Minor in Nuclear Science and Engineering</option>
			<option value="miPhysics">Minor in Physics</option>
			<option value="miPolitical_science">Minor in Political Science</option>
			<option value="miChinese">Minor in Chinese</option>
			<option value="miFrench">Minor in French</option>
			<option value="miGerman">Minor in German</option>
			<option value="miSpanish">Minor in Spanish</option>
			<option value="miJapanese">Minor in Japanese</option>
			<option value="miAsian">Minor in Asian and Asian Diaspora Studies</option>
			<option value="miHistory">Minor in History</option>
			<option value="miLiterature">Minor in Literature</option>
			<option value="miAncient_and_medieval">Minor in Ancient and Medieval Studies</option>
			<option value="miApplied_international">Minor in Applied International Studies</option>
			<option value="miAstronomy">Minor in Astronomy</option>
			<option value="miBiomed">Minor in Biomedical Engineering</option>
			<option value="miEnergy_studies">Minor in Energy Studies</option>
			<option value="miPsych">Minor in Psychology</option>
			<option value="miPublic_policy">Minor in Public Policy</option>
		</select><br>
		<div id="minorreqs2" class="majorminor"></div>
		-----------------<br>
		<strong>Total Units: <span id="totalunits">0</span></strong>
	</div>
	<div id="overrider" class="leftbarholder"><span><label for="overridercheck" title="Check this box if you received credit for this class, overriding standard requisites.">OVERRIDE REQUISITES: </label><input id="overridercheck" type="checkbox"></span></div>
	<div id="nowreading" class="leftbarholder">Click on a class to see more info.</div>
</div>
<div id="rightbar">
	<div class="term credit"><div class="termname"><span>Prior<br>Credit</span></div></div>
	<div class="year freshman">
		<div class="yearname"><span>Freshman Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year sophomore">
		<div class="yearname"><span>Sophomore Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year junior">
		<div class="yearname"><span>Junior Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year senior">
		<div class="yearname"><span>Senior Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year supersenior hidden">
		<div class="yearname supersenior hidden"><span>Super-senior Year</span></div>
		<div class="term fall supersenior hidden"><div class="termname supersenior hidden"><span>Fall</span></div></div>
		<div class="term iap supersenior hidden"><div class="termname supersenior hidden"><span>Iap</span></div></div>
		<div class="term spring supersenior hidden"><div class="termname supersenior hidden"><span>Spring</span></div></div>
		<div class="term summer supersenior hidden"><div class="termname supersenior hidden"><span>Summer</span></div></div>
	</div>
</div>
<div id="trash" class="trash trashdefault">
	<!--svg class="trash" xmlns="http://www.w3.org/2000/svg">
		<g>
		<line id="svg_1" y2="100%" x2="100%" y1="0" x1="0" stroke-width="15" stroke="#f00000" fill="none"/>
		<line id="svg_2" y2="0" x2="100%" y1="100%" x1="0" stroke-width="15" stroke="#f00000" fill="none"/>
		</g>
	</svg-->
	<img src="/images/trashx.png" alt="" class="trash">
</div>
<div id="loading" class="bubble"><h1>Loading...</h1></div>
<div id="viewroads" class="bubble my-dialog">
	<div id="viewroads_close" class="my-dialog-close">Close this</div>
	<h3 id="viewroads_header" class="my-dialog-header">Your saved roads:</h3>
	<div id="savedroads">Loading...</div>
</div>
<div id="help" class="bubble my-dialog">
	<div id="help_close" class="my-dialog-close">Close this</div>
	<h2 id="help_welcome" class="my-dialog-header">CourseRoad Help</h2>
	<div id="accordion">
		<h3><a href="#" class="dummylink">What is CourseRoad?</a></h3>
		<div>
			CourseRoad allows you to plan out your classes over your MIT undergrad career.<br>
			<br>
			Enter classes you have taken and want to take, and CourseRoad will tell you all about how you're doing on class prerequisites, General Institute Requirements (GIRs), and requirements for majors and minors.<br>
			You can even save course mappings to share with friends and advisors to get feedback!
		</div>
		<h3><a href="#" class="dummylink">How do I add/move/delete classes?</a></h3>
		<div>
			In the upper-left, click the "Add" tab, where you can enter the course numbers of your classes and choose the semester you took them/want to take them.
			You'll see that class added on the main timeline on the right-hand side of the page. This area gets filled with the classes you choose.<br>
			<br>
			If you want to move a class around, simply drag and drop it to another semester.<br><br>
			If you want to delete the class, drag it to the right-hand and drop it on the the black X that appears, or select the class and hit Delete.
		</div>
		<h3><a href="#" class="dummylink">How do I add a UROP/elective/PE class/thing that isn't an MIT class? (New!)</a></h3>
		<div>
			When you click the "Add" tab in the upper-left, change "Class Type" from Subject to Custom: from there, type the subject's name and units, and proceed as you would normally for a class.
		</div>
		<h3><a href="#" class="dummylink">What are those weird lines everywhere? Why are some classes red?</a></h3>
		<div>
			Those lines appear between classes to show you the map of prerequisites and corequisites for your classes. Grey is for prereqs, black is for coreqs.<br>
			<br>
			If you've added a class and all of its requisites are satisfied by the classes you've already added, then it'll turn green. If you're still missing reqs, it'll appear red and you can mouse over the part that says "Reqs: [ ]" to see which classes you still need. Your class might also be red if it's placed in the wrong semester, isn't counting for credit, or isn't available in that year.
		</div>
		<h3><a href="#" class="dummylink">I have permission to override the requisites for X.XX. How do I show that?</a></h3>
		<div>
			If you've taken a class without taking its requisites (or if CourseRoad's acting up and not recognizing that you've completed said reqs), you can click once on the class (thus highlighting the class in pink) and click "OVERRIDE REQUISITES" in the lower-left. You can also read that course's description and other info in the lower-left as well.
		</div>
		<h3><a href="#" class="dummylink">What are the years displayed on each class? (New!)</a></h3>
		<div>
			The year attached to each class represents the <strong>catalog year from which that class' data was taken</strong>. It doesn't necessarily match the year in which you took the class: if the requisites and teachers are the same then and now, then you don't have to worry about it.<br>
			<br>
			If, however, you took (say) the 2009-2010 version of a class, simply click the displayed year and choose "'09-'10" from the dropdown. The class will automatically replace itself with the proper version.<br>
			<br>
			If you're entering a lot of classes and this seems like an issue, try clicking the "About" tab and choosing "User Settings": if you update your class year in that field, CourseRoad will try to add the classes to semesters using data from the year in which you took said classes.
		</div>
		<h3><a href="#" class="dummylink">What is that checklist for?</a></h3>
		<div>
			The checklist on the left-hand side lets you keep track of all of your GIRs and major/minor requirements. If you choose majors and minors from the dropdowns, then you'll also see how you're doing on their respective requirements as well.
		</div>
		<h3><a href="#" class="dummylink">How do I save a "road" for later or to share with others?</a></h3>
		<div>
			If you want to save your course map for later, simply click the "Save" tab in the upper-left, and click "Save Classes". The URL you see in the address bar will become a specialized, saved link to your courses. Copy and share it with whomever you like.<br>
			<br>
			You can also click "Save with Login" to save the road while connecting it to your Kerberos username (i.e. the <em>username</em> in <em>username</em>@mit.edu). Note: this requires that you have certificates installed and enabled on the browser you're using.
		</div>
		<h3><a href="#" class="dummylink">What good does logging in do? (New!)</a></h3>
		<div>
			Logging in allows you to:
			<ul>
				<li>Save your roads attached to your account and manage them later (go to the "Save" tab and click "View Saved Roads")</li>
				<li>Save user settings such as class year and toggling CourseRoad features</li>
				<li>Choose custom save hashes for your roads (e.g. "<em>username</em>/with-energy-minor"), and even choose a "public" road to be visible at courseroad.mit.edu/<em>username</em></li>
			</ul>
			and more!
		</div>
		<h3><a href="#" class="dummylink">What about privacy?</a></h3>
		<div>
			When you aren't signed in, the save hashes you generate (the stuff after the "#" in the URL) are random and don't contain any information about you, specifically. On my end in those cases, the database is only storing your IP address, the classes and majors/minors you added, and a timestamp.<br>
			<br>
			If you save roads while signed in, the road will be attached to your athena username with a timestamp, thus hiding the link from being easily discoverable.<br>
			You can personally choose to change these hashes by clicking the "Save" tab, clicking "View Saved Roads", and editing the hash from there.<br>
			You can also choose to enable one of your saved roads as public: a public road will be viewable to anyone who goes to courseroad.mit.edu/<em>username</em>. 
			<br>
			You'll also have the option to supply your graduation year to CourseRoad, in case you want the class year versions to be accurate (see above in "What are the years displayed on each class?").
			<br>
			<br>
			tl;dr: don't worry, you're safe :)
		</div>
		<h3><a href="#" class="dummylink">Further help, who's behind this, and why?</a></h3>
		<div>
			First off, feel free to email me at <a href="mailto:courseroad@mit.edu?subject=[CourseRoad]%20">courseroad@mit.edu</a> if you have any comments/complaints/hate mail/cool historical maps.<br>
			<br>
			CourseRoad is the brainchild of Danny Ben-David '15, and was the Grand Prize Winner in the 2012 <a href="icampusprize.mit.edu">iCampus Student Prize Competition</a>. Ever since I showed up at MIT last year, I've been bothered at how unintuitive the course and major structures are as laid out in the MIT Catalog. Seeking a better way, the iCampus Prize provided the motive for me to build CourseRoad, and here we are. :)<br>
			<br>
			Special thanks to <a href="http://oeit.mit.edu">OEIT<a> for funding and guiding me through the spring and summer, and to the awesome folks at <a href="http://sipb.mit.edu">SIPB</a> for their litany of services and helpful insights.
		</div>
	</div>
</div>
<div id="usersettings" class="bubble my-dialog">
	<div id="usersettings_close" class="my-dialog-close">Close this</div>
	<h3 id="usersettings_header" class="my-dialog-header">User Settings<?= $athena?" for $athena":"" ?>:</h3>
	<div id="usersettings_div">
		<label for="usersettings_class_year">Class Year: </label><input id="usersettings_class_year" type="text" name="class_year" value="<?= $_SESSION['user']['class_year'] ?>"><br>
		<label for="usersettings_view_req_lines">Toggle requisite lines: </label><input id="usersettings_view_req_lines" type="checkbox" name="view_req_lines" value="1" <?= $_SESSION['user']['view_req_lines']?'checked="checked"':'' ?>><br>
		<label for="usersettings_autocomplete">Toggle autocomplete: </label><input id="usersettings_autocomplete" type="checkbox" name="autocomplete" value="1" <?= $_SESSION['user']['autocomplete']?'checked="checked"':'' ?>><br>
	</div>
	<input id="usersettings_save" type="button" name="save" value="Save Settings"><span id="usersettings_saved">Settings saved!</span>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/utilities/utilities.js"></script>
<!--[if gte IE 9]><script>ie9=1;</script><![endif]--><!-- Spoofs IE9+ as not IE to YUI 2.9, so the wires render properly. -->
<script src="/js/json2-min.js"></script>
<script src="/js/wireit-min.js"></script>
</body>
</html>