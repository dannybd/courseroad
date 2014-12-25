<?php

require('settings.ini');
if (!__DEV__) {
  error_reporting(0);
}

require('CourseRoadDB.php');
CourseRoadDB::initialize($databaseURL, $username, $password, $database);

unset($databaseURL, $username, $password, $database);

?>
