<?php

require('settings.ini');

if (!__DEV__) {
  error_reporting(0);
}

$baseURL = 'https://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI']);

require('CourseRoadDB.php');
CourseRoadDB::initialize(
  $db_URL, $db_username, $db_password, $db_name, $db_salt
);
unset($db_URL, $db_username, $db_password, $db_name, $db_salt);

session_start();
