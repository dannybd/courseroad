<?php

require('settings.ini');

$connect = mysql_connect($databaseURL, $username, $password);
mysql_select_db($database);

?>
