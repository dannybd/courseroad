<?php
/*//
secure.php is the connection page to check for MIT certificates; 
if the certs are found it will add the user data to the session accordingly 
and then pass the browser back to whence it came.
//*/
require("connect.php");
session_start();

if(!isset($_SERVER['HTTP_REFERER'])) die();
if(!isset($_SESSION['crhash'])) $_SESSION['crhash'] = "";

if(!isset($_SERVER['SSL_CLIENT_S_DN_Email'])){
	header("Location: {$_SERVER['HTTP_REFERER']}");
	die();
}
$athena = explode("@", $_SERVER['SSL_CLIENT_S_DN_Email']);
$athena = $athena[0];
$fullname = $_SERVER['SSL_CLIENT_S_DN_CN']; //"Jack Florey";
mysql_query("INSERT INTO `users`(`athena`) VALUES ('$athena')");
mysql_query("UPDATE `users` SET `class_year`='{$_SESSION['user']['class_year']}', `view_req_lines`='{$_SESSION['user']['view_req_lines']}', `autocomplete`='{$_SESSION['user']['autocomplete']}' WHERE `athena`='$athena'");
$_SESSION['triedcert'] = true;
$_SESSION['athena'] = $athena;
$_SESSION['fullname'] = $fullname;
$_SESSION['saveas'] = $_SESSION['crhash']."";
if(isset($_SESSION['trycert'])){
	$_SESSION['saveas'] = $_SESSION['athena'].'/'.date("YmdHis");
	$sql = "INSERT INTO `roads2` (`hash`, `user`, `classes`, `major`, `comment`, `ip`) (SELECT '{$_SESSION['saveas']}', '$athena', `classes`, `major`, `comment`, `ip` FROM `roads2` WHERE `hash`='{$_SESSION['crhash']}' AND `classes` != '[]' ORDER BY `added` DESC LIMIT 0,1)";
	mysql_query($sql);
}
unset($_SESSION['trycert']);
header("Location: {$_SERVER['HTTP_REFERER']}#{$_SESSION['saveas']}");
echo $sql;
?>