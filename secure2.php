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
$sql = "INSERT INTO `roads2` (`id`, `hash`, `user`, `classes`, `major`, `public`, `desc`, `ip`, `added`) (SELECT NULL, '{$_SESSION['saveas']}', '$athena', `classes`, `major`, `public`, `desc`, `ip`, CURRENT_TIMESTAMP FROM `roads2` WHERE `hash`='{$_SESSION['crhash']}' AND `classes` != '[]' ORDER BY `added` DESC LIMIT 0,1)";
mysql_query($sql);
header("Location: {$_SERVER['HTTP_REFERER']}#{$_SESSION['saveas']}");
die();
?>