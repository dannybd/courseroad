<?php

require 'functions.php';

$fromjs = $_POST['fromjsflag']

if ($fromjs == 1){
    echo $_POST['sendit']
} else {

$athena = $_SESSION['athena'];
isset($athena) or die('Sorry, please log in again.');

header('Content-type: text/javascript');
header('Content-Disposition: attachment; filename="courseroad.'.$athena.'.json"');

$data = array('athena' => $athena);
$data = $data + CourseRoadDB::getUserPrefs($athena);
$data['roads'] = array();

$roads = CourseRoadDB::getSavedRoads($athena);
foreach ($roads as $road) {
  $road['classes'] = json_decode(CourseRoadDB::decrypt($road['classes']), true);
  $road['majors'] = json_decode(CourseRoadDB::decrypt($road['majors']), true);
  $data['roads'][] = $road;
}

echo json_encode($data);
}

die();
