<?php
/*//
secure.php is the connection page to check for MIT certificates; 
if the certs are found it will add the user data to the session accordingly 
and then pass the browser back to whence it came.
//*/
require("connect.php");
session_start();
if(!isset($_SERVER['SSL_CLIENT_S_DN_Email'])){
	header("Location: {$_SERVER['HTTP_REFERER']}");
	die();
}
$athena = explode("@", $_SERVER['SSL_CLIENT_S_DN_Email']);
$athena = $athena[0];
$fullname = $_SERVER['SSL_CLIENT_S_DN_CN']; //"Jack Florey";

unset($_SESSION['trycert']);
$_SESSION['triedcert'] = true;
$_SESSION['athena'] = $athena;
$_SESSION['fullname'] = $fullname;
$_SESSION['saveas'] = date("YmdHis");
$_SESSION['saveas'] = $_SESSION['athena'].'/'.$_SESSION['saveas'];
mysql_query("INSERT INTO `roads` (`id`, `hash`, `user`, `classes`, `major`, `public`, `ip`, `added`) (SELECT NULL, '{$_SESSION['saveas']}', '$athena', `classes`, `major`, `public`, `ip`, CURRENT_TIMESTAMP FROM `roads` WHERE `hash`='{$_SESSION['crhash']}' AND `classes` != '[]' ORDER BY `added` DESC LIMIT 0,1)");
header("Location: {$_SERVER['HTTP_REFERER']}#{$_SESSION['saveas']}");
die();
print_r($_SESSION);
echo $athena." ; ".$fullname;
?>
<br>
<p>
<pre>
<?= print_r($_SERVER);?>
</pre>
</p>
<?
die();
/*
The code below was used to migrate roads previously. Stored here should it be needed again.
if(isset($_GET['moveterms'])){
	die();
	$query = mysql_query("SELECT `id`,`classes` FROM `roads` WHERE 1");
	echo "<pre>";
	$before = array(",7,",",6,",",5,",",4,",",3,",",2,",",1,",",0,");
	$after = array(",12,",",10,",",9,",",7,",",6,",",4,",",3,",",1,");
	while($row = mysql_fetch_array($query)){
		$b = $row['classes'];
		$a = str_replace($before, $after, $b);
		echo "{$row['id']}:\n\t$b\n\t$a\n";
		//mysql_query("UPDATE `roads` SET `classes`='$a' WHERE `id`='{$row['id']}'");
		//mysql_query("INSERT INTO `roads` (`id`, `hash`, `classes`, `major`, `public`, `ip`, `added`) (SELECT NULL, 'MOVETEST-{$row['id']}', '$a', `major`, `public`, `ip`, CURRENT_TIMESTAMP FROM `roads` WHERE `id`='{$row['id']}')");
		//break;
	}
	echo "</pre>";
	die();
}
if(isset($_GET['debug'])){
	$query = mysql_query("SELECT * FROM `catalog` WHERE `prereq`='' AND `coreq`=''");
	echo "<pre>";
	while($row = mysql_fetch_assoc($query)){
		//if(!$row['prereq'] and !$row['coreq']) continue;
		echo "{$row['id']}: ({$row['course']})\n";
		
		echo "\tImgdata: {$row['imgdata']}\n";
		$row['imgdata'] = mysql_real_escape_string(json_encode(unserialize($row['imgdata'])));
		$row['imgdata'] = $row['imgdata']!="false"?$row['imgdata']:"";
		echo "\tImgdata: {$row['imgdata']}\n";

		echo "\tPrereqs: {$row['prereq']}\n";
		$row['prereq'] = mysql_real_escape_string(json_encode(unserialize($row['prereq'])));
		$row['prereq'] = $row['prereq']!="false"?$row['prereq']:"";
		echo "\tPrereqs: {$row['prereq']}\n";
		
		echo "\tCoreqs: {$row['coreq']}\n";
		$row['coreq'] = mysql_real_escape_string(json_encode(unserialize($row['coreq'])));
		$row['coreq'] = $row['coreq']!="false"?$row['coreq']:"";
		echo "\tCoreqs: {$row['coreq']}\n";
		
		echo "-------------------------\n";
		mysql_query("UPDATE `catalog` SET `imgdata`='{$row['imgdata']}' WHERE `id`='{$row['id']}'");
		//mysql_query("UPDATE `exceptions` SET `imgdata`='{$row['imgdata']}', `prereq`='{$row['prereq']}', `coreq`='{$row['coreq']}' WHERE `id`='{$row['id']}'");
	}
	echo "</pre>";
	die();
}
//*/
?>