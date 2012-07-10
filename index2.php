<?php
/******************************************************************/
//	CourseRoad: Map your Major and Plan your Prereqs
//	May 4, 2012
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

if(isset($_GET['hash'])){
	header("Location: /index2.php#".$_GET['hash']);
	die();
}

require("connect.php"); //connect to database
session_start();

//autocomplete business
if(isset($_GET['term'])){
	$term = mysql_real_escape_string($_GET['term']);
	$temp = array();
	$query = mysql_query("SELECT DISTINCT `subject_id` FROM `warehouse` WHERE `subject_id` LIKE '$term%' ORDER BY `subject_id` LIMIT 6");
	while($row = mysql_fetch_array($query)){
		$temp[] = $row['subject_id'];
	}
	mysql_close($connect);
	echo json_encode($temp);
	die();
}

function pullClass($class, $year=false, $classterm=0, $override=false){
	$sql = "SELECT * FROM `warehouse` WHERE `subject_id`='$class' ".($year?"AND `year`='$year' ORDER BY `last_modified` DESC;":"ORDER BY `year` DESC, `last_modified` DESC;");
	//echo $sql."\n";
	$query = mysql_query($sql);
	if(!$query) die("error");
	if(mysql_num_rows($query)==0) die("noclass");
	$row = mysql_fetch_assoc($query);
//	die();
	unset($row['id']);
	unset($row['design_units']);
	unset($row['tuition_attr']);
	unset($row['supervisor_attr']);
	unset($row['hgn_code']);
	unset($row['hgn_except']);
	unset($row['last_modified']);
	unset($row['notes']);
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
	$reqs = $row['reqs']?"<span class='reqs'>Reqs: [X]</span>":"No reqs :D";
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
	if($row['joint_subjects']) $row['divclasses'] .= " ".implode(' ',$row['joint_subjects']);
	if($row['gir'] and $row['gir'][0]=="H") $row['gir'] = "";
	if($row['gir']) $row['divclasses'] .= " GIR ".$row['gir'];
	if($row['ci']) $row['divclasses'] .= " CI ".$row['ci'];
	if($row['hass']) $row['divclasses'] .= " HASS ".$row['hass'];
	$row['special'] = ($row['gir'] or $row['ci'] or $row['hass']);
	$row['classterm'] = $classterm;
	$row['override'] = $override;
	$row['custom'] = false;
	//the $row['div'] actually stores the HTML of the class bubble.
	$row['div'] = <<<EOD
<div id='{$row['divid']}' class='{$row['divclasses']}'>
	<div class='classdivlabel'>
		<div class='classdivcourse'>{$row['subject_id']}:&nbsp;</div>
		<div class='classdivtitle' title='{$row['subject_title']}'>{$row['subject_title']}</div>
	</div>
	<div class='classdivinfo'>
		$reqs
	</div>
</div>
EOD;
	//print_r($row);
	//echo "\n\n\n";
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
<div id='{$row['divid']}' class='{$row['divclasses']}'>
	<div class='classdivlabel'>
		<div class='classdivcourse'>****&nbsp;</div>
		<div class='classdivtitle' title='{$row['subject_title']}'>{$row['subject_title']}</div>
	</div>
	<div class='classdivinfo'>
		({$row['total_units']} units)
	</div>
</div>
EOD;
	return $row;
}

//loads class data from the database and serves up the JSON CourseRoad requires to load that class.
if(isset($_GET['getclass'])){
	header("Content-type: text/javascript");
	$class = mysql_real_escape_string($_GET['getclass']);
	$year = isset($_GET['getyear'])?mysql_real_escape_string($_GET['getyear']):false;
	//echo $class;
	echo json_encode(pullClass($class, $year));
	die();
}

if(isset($_GET['getcustom'])){
	header("Content-type: text/javascript");
	$name = mysql_real_escape_string($_GET['getcustom']);
	$units = isset($_GET['getunits'])?floatval($_GET['getunits']):false;
	echo json_encode(pullCustom($name, $units));
	die();
}
	
//For certification purposes.
if(!isset($_SESSION['triedcert'])) $_SESSION['triedcert'] = false;

//This runs if the user has click "save road". It determines the login status of the user 
//and sets the hash to be either random characters or something like username-20120504051511
if(isset($_POST['classes'])){
	$classes = mysql_real_escape_string($_POST['classes']);
	$major = mysql_real_escape_string($_POST['major']);
	$hash = substr(strtr(base64_encode(md5($classes.$major)), '+/=', '-_,'),0,5);
	$user = "";
	$_SESSION['crhash'] = $hash;
	$trycert = false;
	if($_POST['trycert']){
		if(isset($_SESSION['athena'])){
			$saveas = date("YmdHis");
			$hash = $_SESSION['athena'].'/'.$saveas;
			$user = $_SESSION['athena'];
		}else if(!$_SESSION['triedcert']){
			$trycert = true;
			$_SESSION['trycert'] = true;
		}
	}
	//id, hash, user, classes, major, public, ip, added
	$sql = "INSERT INTO `roads2` VALUES (NULL, '$hash', '$user', '$classes', '$major', '0', '{$_SERVER['REMOTE_ADDR']}', CURRENT_TIMESTAMP);";
	mysql_query($sql);
	echo $trycert?"**auth**":$hash; //The **auth** lets the user's browser know to try to log in
	die();
}

if(isset($_GET['gethash'])) $_POST['gethash'] = $_GET['gethash']; //Uncomment for development
//Returns the desired hash's class and major data
if(isset($_POST['gethash'])){
	header("Content-type: text/javascript");
	$hash = mysql_real_escape_string(substr($_POST['gethash'],1));
	$sql = "SELECT `classes`,`major` FROM `roads2` WHERE (`hash`='$hash' OR (`hash` LIKE '$hash/%' AND `public`='1')) ORDER BY `added` DESC LIMIT 0,1";
	$query = mysql_query($sql);
	$classes = '';
	$major = '';
	while($row = mysql_fetch_array($query)){
		$classes = json_decode(stripslashes($row['classes']), true);
		$major = stripslashes($row['major']);
	}
	if($classes=='') die();
	if($major[0]!='[') $major = json_encode(array($major, "m0", "m0", "m0"));
	$major = json_decode($major, true);
	$json = array();
	foreach($classes as $class){
		if(isset($class["custom"])){
			$json[] = pullCustom($class["name"], $class["units"], $class["term"], $class["override"]);
		}else{
			$json[] = pullClass($class["id"], $class["year"], $class["term"], $class["override"]);
		}
	}
	$json[] = $major;
	//print_r($json);
	echo json_encode($json);
	die();
}

if(isset($_SESSION['trycert'])){
	//This only happens when the check has failed, and the user isn't authenticated.
	$_SESSION['triedcert'] = true;
	unset($_SESSION['trycert']);
	header("Location: /#".$_SESSION['crhash']);
	die();
}

//Returns the desired table of saved roads when the user is logged in
if(isset($_GET['savedroads'])){
	if(!isset($_SESSION['athena'])) die();
	$hash = mysql_real_escape_string($_SESSION['athena']);
	$sql = "SELECT * FROM `roads2` WHERE `hash` LIKE '$hash/%' ORDER BY `added` DESC";
	$query = mysql_query($sql);
	echo "<table>\n";
	echo "<tr>";
	echo "<th style=\"min-width:50px\" title=\"Select if you'd like one of your saved roads to be available more easily at courseroad.mit.edu/{$_SESSION['athena']}\">Public</th>";
	echo "<th style=\"min-width:118px\">Added</th>";
	echo "<th style=\"min-width:95px\">Major</th>";
	echo "<th>Classes</th>";
	echo "<th>Delete?</th>";
	echo "</tr>\n";
	echo "<tr>";
	$numrows = mysql_query("SELECT COUNT(*) FROM `roads2` WHERE `hash` LIKE '$hash/%' AND `public`='1'");
	$numrows = mysql_fetch_array($numrows);
	$numrows = $numrows[0];
	echo "<td><input type=\"radio\" name=\"choosesavedroad\" class=\"choosesavedroad\" value=\"null\" ".($numrows?"":"checked=\"true\" ")."/></td>";
	echo "<td colspan=\"4\">Select this row to prevent any of your saved roads from being your publicly-facing road.</td>";
	echo "</tr>\n";
	while($row = mysql_fetch_array($query)){
		$roadURL = "?hash=".stripslashes($row['hash']);
		echo "<tr>";
		echo "<td><input type=\"radio\" name=\"choosesavedroad\" class=\"choosesavedroad\" value=\"".stripslashes($row['hash'])."\" ".($row['public']=="1"?"checked=\"true\" ":"")."/></td>";
		echo "<td><a href=\"$roadURL\">".stripslashes($row['added'])."</a></td>";
		$major = stripslashes($row['major']);
		if($major[0]!='[') $major = "[\"$major\"]";
		$major = str_replace(',"m0"','',$major);
		$major = implode(",<br>\n", json_decode($major));
		echo "<td>$major</td>";
		$classes = json_decode(stripslashes($row['classes']), true);
		//echo $row['classes'];
		$classes2 = array();
		foreach($classes as &$class2){
			if(isset($class2["custom"])) $class2["id"] = '('.$class2["name"].')';
			if(!isset($class2["id"])) continue;
			if($class2["override"]) $class2["id"] .= "*";
			$classes2[] = $class2["id"];
		}
		echo "<td>".implode(", ", $classes2)."</td>";
		echo "<td><strong class=\"deleteroad\">X</strong></td>";
		echo "</tr>\n";
	}
	echo "</table>";
	die();
}

//Runs when the user sets one of their roads to be their public road
if(isset($_GET['choosesavedroad'])){
	$hash = mysql_real_escape_string($_GET['choosesavedroad']);
	if(!isset($_SESSION['athena'])) die();
	$hasharray = explode('/', $hash);
	if(($_SESSION['athena']!=$hasharray[0]) and ($hash!="null")) die();
	mysql_query("UPDATE `roads2` SET `public`='0' WHERE `hash` LIKE '{$_SESSION['athena']}/%'");
	if($hash!="null") mysql_query("UPDATE `roads2` SET `public`='1' WHERE `hash`='$hash'");
	echo "ok";
	die();
}
//Similarly, runs when the user deletes a road.
if(isset($_GET['deleteroad'])){
	$hash = mysql_real_escape_string($_GET['deleteroad']);
	if(!isset($_SESSION['athena'])) die();
	$hasharray = explode('/', $hash);
	if(($_SESSION['athena']!=$hasharray[0]) and ($hash!="null")) die();
	if($hash!="null") mysql_query("DELETE FROM `roads2` WHERE `hash`='$hash'");
	echo "ok";
	die();
}
mysql_close($connect);

$nocache = isset($_GET['nocache']);
$nocache = true; //Uncomment during development
$nocache = $nocache?"?nocacher=".time():""; //This can help force through updates to the linked js and css files in browsers that love to hold on to cached versions; for debugging only.
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CourseRoad 2.0<?= isset($_SESSION['athena'])?": {$_SESSION['athena']}":""; ?></title>
<link rel="stylesheet" type="text/css" href="cr2.css<?= $nocache ?>">
<link rel="stylesheet" type="text/css" href="print.css<?= $nocache ?>" <?= isset($_GET['print'])?'':'media="print"' ?>>
<!--[if lt IE 9]>
	<link rel="stylesheet" type="text/css" href="cr-ie2.css<?= $nocache ?>">
	<script type="text/javascript" src="excanvas.compiled.js"></script>
<![endif]-->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/utilities/utilities.js"></script>
<script type="text/javascript" src="json2-min.js"></script>
<script type="text/javascript" src="jquery.cookies.2.2.0.min.js"></script>
<script type="text/javascript" src="wireit-min.js"></script>
<script type="text/javascript" src="cr2.js<?= $nocache ?>"></script>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31018454-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
</head>
<body>
<script type="text/javascript">
//var apiKey = "cd2cfd891944811e690fc5c56acb0660";
//var tenantId = "CourseRoad";
//var USERID = SESSIONID = "<?= session_id(); ?>"; //These date to a prior feature testing; ignore...for now
var loggedin = <?= isset($_SESSION['athena'])?"1":"0"; ?>;
var triedlogin = <?= $_SESSION['triedcert']?"1":"0"; ?>; //These are not trusted variables, but they do aid in displaying different (non-secure) things based on login status.
var userhashchange = true;
var preventUpdateWires = false;
window.onhashchange = function(){
	//userhashchange means that if the user types in a new hash in the URL, 
	//the browser will reload, but if the has changes do to saving a new version or something it won't.
	if(userhashchange) window.location.reload(); 
}

var totalUnits = 0;
//var SCIgirs = ["Calculus I", "Calculus II", "Physics I", "Physics II", "Biology", "Chemistry"];
$(function(){
	setInterval('updateWires();', 10000); //Assures regular updating of the window, should anything change
	if(window.location.hash){
		//Load hash's classes on pageload
		$("#loading").show();
		$.post("?", {gethash:window.location.hash}, function(data){
			$("#loading").hide();
			if(data=="") return false;
			var json = $.parseJSON(data);
			var jsonmajors = json.pop();
			$("#choosemajor").val(jsonmajors[0]).attr("selected",true);
			$("#choosemajor2").val(jsonmajors[1]).attr("selected",true);
			$("#chooseminor").val(jsonmajors[2]).attr("selected",true);
			$("#chooseminor2").val(jsonmajors[3]).attr("selected",true);
			getClasses(json);
		});
	}
	$(window).bind("beforeunload", function(){
		//Still a work in progress
		if(!userhashchange){
			return "Are you sure you want to leave? You'll lose any unsaved courses you've added.";
		}
	});
	$('#getnewclassid').blur(function(){
		$("#getnewclass .ui-autocomplete").hide();
	}).focus();
	$('#getnewclasssubmit').click(function(){
		//Adds the class
		getClass($('#getnewclassid').val(), $('#getnewclassterm').val());
		$('#getnewclassid').val('');
	});
	$("#getnewclass form").submit(function(){
		return false;
	});
	$("body").on("click", ".classdiv", function(){
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
			$("#nowreading").html($('.classdivhigh').data("info"));
			$("#nowreading a[href^='javascript:PopUpHelp']").remove();
			$("#overridercheck").prop("disabled", false).prop("checked", $('.classdivhigh').data('override'));
		}else{
			$("#overrider span").css('opacity', 0);
			$("#overridercheck").prop("disabled", true);
			$(".classdiv").removeClass("classdivlow");
			$('.WireIt-Wire').removeClass("WireIt-Wire-low");
			$("#nowreading").html('Click on a class to see more info.');
		}
	});
	$("#overridercheck").change(function(){
		$(".classdivhigh").data("override", $(this).prop("checked"));
		$('.classdivhigh').toggleClass("classdivoverride");
		addAllWires();
	});
	$(".term, .year").click(function(){
		//Un-select a class
		$("#overridercheck").prop("disabled", true);
		$("#overrider span").css('opacity', 0);
		$(".classdivhigh").removeClass("classdivhigh");
		$(".classdiv").removeClass("classdivlow");
		$('.WireIt-Wire').removeClass("WireIt-Wire-low");
		$("#nowreading").html('Click on a class to see more info.');
	});
	$("body").on("click", "canvas.WireIt-Wire", function(){
		$(".term:first").click();
	});
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
		},
		stop: function(event, ui){
			preventUpdateWires = false;
			$('.classdiv').removeAttr("style");
			$('.WireIt-Wire').show();
			addAllWires();
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
	$("#getnewclassid").autocomplete({
		source: "#",
		minLength: 2,
		appendTo: "#getnewclass"
	});
	$("#savemap").click(function(){
		$.post("?", {classes: minclass(true), major: minmajors(), trycert: loggedin}, function(data){
			if(loggedin){
				if(data=="**auth**"){
					//This redirects us to the secure cert check.
					window.location.href = "https://"+window.location.hostname+":444"+window.location.pathname.split("/").splice(0, window.location.pathname.split("/").length-1).join("/")+"/secure.php";
				}else{
					//console.log("CERTS! "+data);
					userhashchange = false;
					window.location.hash = data;
					setTimeout(function(){userhashchange = true;}, 1000);
				}	
			}else{
				console.log(data);
				userhashchange = false;
				window.location.hash = data;
				setTimeout(function(){userhashchange = true;}, 1000);
			}
		});
	});
	if(!loggedin && triedlogin) $("#mapcerts").hide();
	$("#mapcerts").click(function(){
		if(loggedin){
			$("#viewroads").dialog("open");
		}else{
			$.post("?", {classes: minclass(true), major: minmajors(), trycert: true}, function(data){
				if(data=="**auth**"){
					window.location.href = "https://"+window.location.hostname+":444"+window.location.pathname.split("/").splice(0, window.location.pathname.split("/").length-1).join("/")+"/secure.php";
				}else{
					//console.log("CERTS! "+data);
					userhashchange = false;
					window.location.hash = data;
					setTimeout(function(){userhashchange = true;}, 1000);
				}
			});
		}
	});
	$("select.majorminor").on("change", function(){checkMajor(this);});
	$("#viewroads").dialog({
		autoOpen: false,
		width: 800,
		draggable: false,
		resizeable: false,
		modal: true,
		open: function(event, ui){
			$("#savedroads").html("Loading...");
			$.get("?savedroads=1", null, function(data){
				$("#savedroads").html(data);
			});
		}
	});
	$("#viewroads_close").click(function(){
		$("#viewroads").dialog('close');
	});
	$("body").on("click", ".choosesavedroad", function(){
		$.get("?", {choosesavedroad: $(this).val()}, function(data){
			if(data=="ok"){
				console.log("It worked!");
			}
		});
	});
	$("body").on("click", ".deleteroad", function(){
		if(confirm("Are you sure you want to delete this road? This action cannot be undone.")){
			var parent = $(this).parent().parent();
			val = parent.find(":radio").val();
			$.get("?", {deleteroad: val}, function(data){
				if(data=="ok") parent.fadeOut('slow').delay(2000).queue(function(){$(this).remove();});
			});
		}
	});
	//Runs the help dialog down below
	<?= isset($_GET['modal'])?"$.cookies.del('modalhelp');\n":"\n" ?>
	$("#help").dialog({
		autoOpen: ($.cookies.get('modalhelp')==null),
		width: 600,
		draggable: false,
		resizeable: false,
		modal: true
	});
	$("#help_close").click(function(){
		$("#help").dialog('close');
	});
	$("#accordion").accordion();
	$(".dummylink").click(function(e){
		e.preventDefault();
	});
	$("#openhelp").click(function(){
		$("#help").dialog('open').dialog('option', 'position', 'center');
		$( "#accordion" ).accordion( "resize" );
	});
	setTimeout(function(){$("#help").dialog('option', 'position', 'center');$( "#accordion" ).accordion( "resize" );}, 500);
	if($.cookies.get('modalhelp')==null){
		$.cookies.set('modalhelp','1',{expiresAt: deltaDate(0, 0, 14)});
	}
	$("#choosemajor option").each(function(){
		if(majors[$(this).val()]==undefined) $(this).remove();
	});
	//$("#rightbar").css('width', $("#rightbar").width());
	$(window).resize(function() {
		updateWires();
	});
	$("#printroad").click(function(){
		$("body, #rightbar, .term, .year").toggleClass("printing");
		updateWires();
		window.print();
		$("body, #rightbar, .term, .year").toggleClass("printing");
		updateWires();
	});
	//$(".summer:first .termname").fadeToggle("slow");$(".summer:first").slideToggle("slow", function(){updateWires();});
});
</script>
<div id="leftbar">
	<div id="getnewclass">
		<a id="openhelp" href="#" class="dummylink">Help</a> ~ <a href="/blog" target="_blank">Blog</a><br>
		<?
		if(isset($_SESSION['athena'])){
			echo "Welcome, <strong>{$_SESSION['athena']}</strong>!";
		}
		?>
		<br><br>
		<form action="#" method="POST">
			<span>Add</span>
			<input id="getnewclassid" type="text" size="5" name="classname"> to 
			<select id="getnewclassterm" name="classterm" style="width: 111px;">
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
			</select><br> 
			<input id="getnewclasssubmit" class="bubble loaders" onclick="return false;" type="submit" value="Add Class">
			<input type="button" id="savemap" class="bubble loaders" value="Save Courses">
			<input type="button" id="mapcerts" class="bubble loaders" value="<?= isset($_SESSION['athena'])?"View Saved Roads":"Save with Login (requires certs)"; ?>"><br><br>
			<!--<input type="button" id="printroad" class="bubble loaders" value="Print Road">--><!-- soon! -->
		</form>
		<br>
		<br>
	</div>
	<div id="COREchecker">
	<strong>General Institute Requirements:</strong><br>
		Physics I: <span id="Physics_I" class="corecheck GIR PHY1">[ ]</span><br>
		Physics II: <span id="Physics_II" class="corecheck GIR PHY2">[ ]</span><br>
		Calculus I: <span id="Calculus_I" class="corecheck GIR CAL1">[ ]</span><br>
		Calculus II: <span id="Calculus_II" class="corecheck GIR CAL2">[ ]</span><br>
		Chemistry: <span id="Chemistry" class="corecheck GIR CHEM">[ ]</span><br>
		Biology: <span id="Biology" class="corecheck GIR BIOL">[ ]</span><br>
		REST <span id="REST" class="corecheck GIR REST">[ ]</span>&nbsp;<span id="REST2" class="corecheck GIR REST">[ ]</span><br>
		LAB <span id="LAB" class="corecheck GIR LAB LAB2">[ ]</span>&nbsp;<span id="LAB2" class="corecheck GIR LAB LAB2">[ ]</span><br>
		-----------------<br>
		CI-H <span id="CI_H" class="corecheck CI CIH">[ ]</span>&nbsp;<span id="CI_H2" class="corecheck CI CIH">[ ]</span><br>
		-----------------<br>
		HASS:<br>
		&nbsp;&nbsp;&nbsp;A <span id="HASS_Arts" class="corecheck HASS HA">[ ]</span>
					&nbsp;H <span id="HASS_Humanities" class="corecheck HASS HH">[ ]</span>
					&nbsp;S <span id="HASS_Social_Sciences" class="corecheck HASS HS">[ ]</span><br>
		&nbsp;&nbsp;&nbsp;Other HASS: 
		<span id="HASS_E"  class="corecheck HASS HE">[ ]</span>
		<span id="HASS_E2" class="corecheck HASS HE">[ ]</span>
		<span id="HASS_E3" class="corecheck HASS HE">[ ]</span>
		<span id="HASS_E4" class="corecheck HASS HE">[ ]</span>
		<span id="HASS_E5" class="corecheck HASS HE">[ ]</span><br>
		-----------------<br>
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
		<div id="majorreqs" class="majorminor"></div>
		-----------------<br>
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
		-----------------<br>
		<select id="chooseminor" name="chooseminor" class="majorminor" data-div="#minorreqs">
			<option value="m0">---Select a Minor---</option>
			<option value="miAstronomy">Minor in Astronomy</option>
			<option value="miBiomed">Minor in Biomedical Engineering</option>
			<option value="miEnergy_studies">Minor in Energy Studies</option>
			<option value="miPsych">Minor in Psychology</option>
			<option value="miPublic_policy">Minor in Public Policy</option>
		</select><br>
		<div id="minorreqs" class="majorminor"></div>
		-----------------<br>
		<select id="chooseminor2" name="chooseminor2" class="majorminor" data-div="#minorreqs2">
			<option value="m0">---Select a Minor---</option>
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
	<div id="overrider"><span><label for="overridercheck" title="Check this box if you received credit for this class, overriding standard requisites.">OVERRIDE REQS: </label><input id="overridercheck" type="checkbox"></span></div>
	<div id="nowreading">Click on a class to see more info.</div>
</div>
<div id="rightbar">
	<div class="term credit"><div class="termname"><span>Prior<br>Credit</span></div></div>
	<div class="year">
		<div class="yearname"><span>Freshman Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year">
		<div class="yearname"><span>Sophomore Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year">
		<div class="yearname"><span>Junior Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year">
		<div class="yearname"><span>Senior Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
	<div class="year supersenior hidden">
		<div class="yearname supersenior hidden"><span>Super-senior Year</span></div>
		<div class="term fall"><div class="termname"><span>Fall</span></div></div>
		<div class="term iap"><div class="termname"><span>Iap</span></div></div>
		<div class="term spring"><div class="termname"><span>Spring</span></div></div>
		<div class="term summer"><div class="termname"><span>Summer</span></div></div>
	</div>
</div>
<div id="trash" class="trash trashdefault"><img src="trashx.png" alt="" class="trash"></div>
<div id="loading" class="bubble"><h1>Loading...</h1></div>
<div id="viewroads" class="bubble">
	<div id="viewroads_close">Close this</div>
	<h3 id="viewroads_header">Your saved roads:</h3>
	<div id="savedroads">
	
	</div>
</div>
<div id="help" class="bubble">
	<div id="help_close">Close this</div>
	<h2 id="help_welcome">Welcome to CourseRoad!</h2>
	<div id="accordion">
		<h3><a href="#" class="dummylink">What is CourseRoad?</a></h3>
		<div>
			CourseRoad allows you to plan out your classes over your MIT undergrad career.<br>
			<br>
			Enter classes you have taken and want to take, and CourseRoad will tell you all about how you're doing on class prerequisites, General Institute Requirements (GIRs), and your major's requirements.<br>
			You can even save course mappings to share with friends and advisors to get feedback!
		</div>
		<h3><a href="#" class="dummylink">How do I add/move/delete classes?</a></h3>
		<div>
			In the upper-left, you can enter the course numbers of your classes, choose the semester you took them/want to take them, and click "Add Class." 
			You'll see that class added on the main timeline on the right-hand side of the page. This area gets filled with the classes you choose.<br>
			<br>
			If you want to move a class around, simply drag and drop it to another semester.<br><br>
			If you want to delete the class, drag it to the upper-right and drop it on the the black X that appears.
		</div>
		<h3><a href="#" class="dummylink">What are those weird lines everywhere? Why are some classes red?</a></h3>
		<div>
			Those lines appear between classes to show you the map of prerequisites and corequisites for your classes. Grey is for prereqs, black is for coreqs.<br>
			<br>
			<!-- insert two wires here -->
			If you've added a class and all of its prereqs are satisfied by the classes you've already added, then it'll turn green. If you're still missing a class or two, it'll appear red and you can mouse over the part that says "Prereq: [ ]" to see which classes you still need. Your class might also be red if it's placed in the wrong semester.
		</div>
		<h3><a href="#" class="dummylink">I have credit for X.XX. How do I show that?</a></h3>
		<div>
			If you've received credit for or permission to attend a class without taking its prereqs, you can let CourseRoad know that by clicking once on the class (this should select the class in pink) and click "OVERRIDE REQS" in the lower-left. You can also read that course's description and other info in the lower-left as well.
		</div>
		<h3><a href="#" class="dummylink">What is that checklist for?</a></h3>
		<div>
			The checklist on the left-hand side lets you keep track of all of your GIRs and major requirements. If you choose a major from the dropdown, then you'll also see how you're doing on that major's requirements as well.
		</div>
		<h3><a href="#" class="dummylink">How do I save classes for later or to share with others?</a></h3>
		<div>
			If you want to save your course map for later, simply click the "Save Classes" button in the upper-left. The URL you see in the address bar will become a specialized, saved link to your courses. Copy and share it with whomever you like.
		</div>
		<h3><a href="#" class="dummylink">What about privacy?</a></h3>
		<div>
			When you aren't signed in, the links you generate are random and don't contain any information about you, specifically. On my end in those cases, the database is only storing your IP address, your classes, and a timestamp.<br>
			<br>
			If you save roads while signed in, the road will be attached to your athena username with a timestamp, thus hiding the link from being easily discoverable. You can also choose to enable one of your saved roads as public: a public road will be viewable to anyone who goes to courseroad.mit.edu/<i>yourusername</i>.<br>
			<br>
			tl;dr: don't worry, you're safe :)
		</div>
		<h3><a href="#" class="dummylink">Further help, who's behind this, and why?</a></h3>
		<div>
			First off, feel free to email me at <a href="mailto:dannybd@mit.edu?subject=[CourseRoad]">dannybd@mit.edu</a> if you have any comments/complaints/hate mail/alternate history fiction.<br>
			<br>
			CourseRoad is the brainchild of Danny Ben-David '15, as an entry in the <a href="icampusprize.mit.edu">iCampus Student Prize Competition</a>. Ever since I showed up at MIT last August, I've been bothered at how unintuitive the course and major structures are when laid out as they are in the MIT Catalog. Seeking a better way, the iCampus Prize provided the motive for me to build CourseRoad, and here we are. :)<br>
			<br>
			Special thanks to the awesome folks in <a href="http://sipb.mit.edu">SIPB</a> for their litany of services and helpful insights.
		</div>
	</div>
</div>
</body>
</html>
