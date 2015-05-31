<?php
error_reporting(E_ALL);
header("Content-type: text/javascript;");

if (isset($_GET['date'])) {
  die(date("d-M-Y", time()-10*86400));
}

require 'connect.php';

if (!__DEV__) {
  header('Location: ./index.php');
  die();
}
// DEV ONLY
$db = CourseRoadDB::getDB();

$filename = '../../../cron_scripts/output.html';
$file = file_get_contents($filename);
if (isset($_GET['verbose'])) {
  echo preg_replace( "/\s*[\r\n]\s*/", '', $file);
}
$test_mode = isset($_GET['test']);
if ($test_mode) {
  echo "Running in TEST mode:\n\n";
}

preg_match_all("/<td[^>]*>\n(.*?)\n<\/td>/s", $file, $matches);
$matches = $matches[1];
if (!count($matches)) {
  file_put_contents($filename, '');
  die("No matches/changes\n");
}

$headers = explode(',',
  'Academic Year,Subject Id,Subject Code,Subject Number,Source Subject Id,' .
  'Print Subject Id,Is Printed In Bulletin,Department Code,Department Name,' .
  'Effective Term Code,Subject Short Title,Subject Title,Is Variable Units,' .
  'Lecture Units,Lab Units,Preparation Units,Total Units,Design Units,' .
  'Grade Type,Grade Type Desc,Grade Rule,Grade Rule Desc,Hgn Code,Hgn Desc,' .
  'Hgn Except,Gir Attribute,Gir Attribute Desc,Comm Req Attribute,' .
  'Comm Req Attribute Desc,Tuition Attribute,Tuition Attribute Desc,' .
  'Write Req Attribute,Write Req Attribute Desc,Supervisor Attribute,' .
  'Supervisor Attribute Desc,Prerequisites,Subject Description,' .
  'Joint Subjects,School Wide Electives,Meets With Subjects,' .
  'Equivalent Subjects,Is Offered This Year,Is Offered Fall Term,' .
  'Is Offered Iap,Is Offered Spring Term,Is Offered Summer Term,' .
  'Fall Instructors,Spring Instructors,Status Change,Last Activity Date,' .
  'Warehouse Load Date,Master Subject Id,Hass Attribute,Hass Attribute Desc,' .
  'Term Duration,Global Regions,Global Countries,On Line Page Number'
);
foreach ($headers as &$header) {
  $header = strtr(($header), ' ', '_');
}
$head = count($headers);
// print_r($headers);
$courses = array();
for ($i = 0; $i < count($matches); $i++) {
  $row = floor($i / $head);
  $pos = $i % $head;
  if ($matches[$i] === '&nbsp;') {
    $matches[$i] = '';
  }
  $courses[$row][$headers[$pos]] = mysqli_real_escape_string(
    $db,
    html_entity_decode(trim($matches[$i]))
  );
}
echo "ADDING " . count($courses) . " COURSES:\n\n";
// print_r($courses);
foreach ($courses as &$course) {
  $course2 = array();
  // year
  $course2[] = $course['Academic_Year'];
  // subject_id
  $course2[] = $course['Subject_Id'];
  // subject_code
  $course2[] = $course['Subject_Code'];
  // subject_number
  $course2[] = $course['Subject_Number'];
  // subject_title
  $course2[] = $course['Subject_Title'];
  // joint_subjects
  $course2[] = $course['Joint_Subjects'];
  // equiv_subjects
  $course2[] = $course['Equivalent_Subjects'];
  // gir
  $course2[] = $course['Gir_Attribute'];
  // ci
  $course2[] = $course['Comm_Req_Attribute'];
  // hass
  $course2[] = $course['Hass_Attribute'];
  // is_variable_units
  if (!$course['Is_Variable_Units']) {
    $course['Is_Variable_Units']='Y';
  }
  $course2[] = parseBoolStr($course['Is_Variable_Units']);
  // unitload
  $course2[] = (
    intval($course['Lecture_Units']) . '-' . intval($course['Lab_Units']) .
    '-' . intval($course['Preparation_Units'])
  );
  // total_units
  $course2[] = intval($course['Total_Units']);
  // grade_type
  $course2[] = $course['Grade_Type'];
  // grade_rule
  $course2[] = $course['Grade_Rule'];
  // reqstr
  $course2[] = $course['Prerequisites'];
  // reqs; parse things here
  $course2[] = mysqli_real_escape_string(
    $db,
    json_encode(parseRequisites($course['Prerequisites']))
  );
  // desc
  $course2[] = $course['Subject_Description'];
  // offered_this_year
  $course2[] = parseBoolStr($course['Is_Offered_This_Year']);
  // fall
  $course2[] = parseBoolStr($course['Is_Offered_Fall_Term']);
  // iap
  $course2[] = parseBoolStr($course['Is_Offered_Iap']);
  // spring
  $course2[] = parseBoolStr($course['Is_Offered_Spring_Term']);
  // summer
  $course2[] = parseBoolStr($course['Is_Offered_Summer_Term']);
  // fall_instructors
  $course2[] = $course['Fall_Instructors'];
  // spring_instructors
  $course2[] = $course['Spring_Instructors'];
  // design_units
  $course2[] = $course['Design_Units'];
  // tuition_attr
  $course2[] = $course['Tuition_Attribute'];
  // supervisor_attr
  $course2[] = $course['Supervisor_Attribute'];
  // hgn_code
  $course2[] = $course['Hgn_Code'];
  // hgn_except
  $course2[] = $course['Hgn_Except'];

  // print_r($course2);
  // print_r($course['Last_Activity_Date']."\n");
  $sql = (
    "INSERT INTO `warehouse` VALUES (NULL, '" . implode("', '",$course2) .
    "', CURRENT_TIMESTAMP, '', '');"
  );
  echo "\n$sql\n\n";
  if ($test_mode) {
    echo "Not running query in TEST mode\n\n";
  } else {
    mysqli_query($db, $sql);
  }
}

function parseBoolStr($str) {
  return ($str === 'Y') ? '1' : '0';
}

function parseRequisites($str) {
  // $str = preg_replace("/<(.*?)>/s", "", $str);
  $str = str_replace('permission', 'Permission', $str);
  $str = str_replace('; or Permission', '', $str);
  $str = str_replace(' or Permission', ', or Permission', $str);
  $str = str_replace(' of instructor', '', $str);
  $str = str_replace(' (GIR)', '', $str);
  $str = str_replace('None.', '', $str);
  $str = str_replace('None', '', $str);
  $str = str_replace('and/or', 'or', $str);
  $reqpaths = explode(';', $str);
  $reqlist = array();
  $coreq = false;
  $endcoreq = false;

  // Priorities run ; then OR then AND.
  foreach ($reqpaths as &$series) {
    /*
    if (strpos($series,'Permission') !== false) {
      $reqlist[] = "Permission";
      continue;
    }
    //*/
    // Check for OR series
    if (strpos($series, ' or ') !== false) {
      $series = str_replace(' or ', ',', $series);
      $series_parts = explode(',', $series);
      $or_series_parts = array();
      $or_series_parts[] = 1;
      foreach ($series_parts as &$course) {
        $course = trim($course);
        if (!$course) {
          continue;
        }
        if ($course[0] === '[') {
          $coreq = true;
        }
        if (substr($course, -1) === ']') {
          $endcoreq = true;
        }
        $course = rtrim(ltrim($course, '['), 'J]');
        if (strpos($course, ' and ') !== false) {
          $course = explode(' and ', $course);
          $course = array(
            2,
            getRequisiteElement(trim($course[0]), $coreq),
            getRequisiteElement(trim($course[1]), $coreq)
          );
          $or_series_parts[] = $course;
        } else {
          $or_series_parts[] = getRequisiteElement($course, $coreq);
        }
        if ($endcoreq) {
          $coreq = $endcoreq = false;
        }
      }
      if (count($or_series_parts) > 1) {
        $reqlist[] = $or_series_parts;
      }
      continue;
    }
    // Run for AND series
    $series_parts = explode(',', $series);
    foreach ($series_parts as &$course) {
      $course = trim($course);
      if (!$course) {
        continue;
      }
      if ($course[0] === '[') {
        $coreq = true;
      }
      if (substr($course, -1) === ']') {
        $endcoreq = true;
      }
      $course = rtrim(ltrim($course, '['), 'J]');
      $reqlist[] = getRequisiteElement($course, $coreq);
      if ($endcoreq) {
        $coreq = $endcoreq = false;
      }
    }
  }
  // Prepend the requisite count, to make this "All of the following"
  array_unshift($reqlist, count($reqlist));
  return count($reqlist) > 1 ? $reqlist : false;
}

function getRequisiteElement($str, $is_coreq) {
  if ($is_coreq) {
    return array(
      'id' => $str,
      'coreq' => 1
    );
  }
  return $str;
}

if (!$test_mode) {
  file_put_contents($filename, '');
}
