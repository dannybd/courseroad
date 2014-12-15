<?php

require('settings.ini');
if (!__DEV__) {
  error_reporting(0);
}

$connect = mysql_connect($databaseURL, $username, $password);
mysql_select_db($database);

$db = new mysqli($databaseURL, $username, $password, $database);
if($db->connect_errno > 0){
	die('Unable to connect to database [' . $db->connect_error . ']');
}

unset($databaseURL, $username, $password, $database);

?>
