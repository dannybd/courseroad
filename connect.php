<?php

require('settings.ini');
if (!__DEV__) {
  error_reporting(0);
}

require('sql.php');
CourseRoadDB::initialize($databaseURL, $username, $password, $database);

unset($databaseURL, $username, $password, $database);

?>
