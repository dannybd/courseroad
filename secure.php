<?php
/*//
secure.php is the connection page to check for MIT certificates; 
if the certs are found it will add the user data to the session accordingly 
and then pass the browser back to whence it came.
//*/
require("connect.php");
session_start();
if(!@$_SESSION['wenttoindex']){
	header("Location: $baseURL/#soclose");
	//echo "soclose<br><pre>SERVER:\n";
	//print_r($_SERVER);
	die();
}
unset($_SESSION['wenttoindex']);

if(!isset($_SESSION['crhash'])) $_SESSION['crhash'] = "";

if(!isset($_SERVER['SSL_CLIENT_S_DN_Email'])){
	header("Location: $baseURL/#-no-email");
	//echo "nocert<br><pre>SERVER:\n";
	//print_r($_SERVER);
	die();
}
$athena = strstr($_SERVER['SSL_CLIENT_S_DN_Email'], "@", true);
$fullname = @$_SERVER['SSL_CLIENT_S_DN_CN']; //"Jack Florey";
mysql_query("INSERT INTO `users`(`athena`) VALUES ('$athena')");
if(@$_SESSION['user'] and $_SESSION['user']['edited']) mysql_query("UPDATE `users` SET `class_year`='{$_SESSION['user']['class_year']}', `view_req_lines`='{$_SESSION['user']['view_req_lines']}', `autocomplete`='{$_SESSION['user']['autocomplete']}' WHERE `athena`='$athena'");
$_SESSION['triedcert'] = true;
$_SESSION['athena'] = $athena;
$_SESSION['fullname'] = $fullname;
$_SESSION['saveas'] = $_SESSION['crhash']."";
if(isset($_SESSION['trycert'])){
	$_SESSION['saveas'] = $_SESSION['athena'].'/'.date("YmdHis");
	$sql = "INSERT INTO `roads2` (`hash`, `user`, `classes`, `majors`, `comment`, `ip`) (SELECT '{$_SESSION['saveas']}', '$athena', `classes`, `majors`, `comment`, `ip` FROM `roads2` WHERE `hash`='{$_SESSION['crhash']}' AND `classes` != '[]' ORDER BY `added` DESC LIMIT 0,1)";
	mysql_query($sql);
}
/*
echo @$sql;
echo "success<pre>SERVER:\n";
print_r($_SERVER);
echo "\n\nSESSION:\n";
print_r($_SESSION);
unset($_SESSION['trycert']);
echo "\n\n--------------</pre>";
echo "<p><a href='$baseURL/#{$_SESSION['saveas']}'>Click</a></p>";
/*/
header("Location: $baseURL/#{$_SESSION['saveas']}");
//*/
?>