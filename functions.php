<?php

// connect to database
require 'connect.php';

function getBaseURL() {
  $path_name = dirname(strtok($_SERVER['REQUEST_URI'], '?'));
  return "https://{$_SERVER['SERVER_NAME']}$path_name";
}

function newCSRFToken() {
  return hash('sha512', mt_rand() . mt_rand() . mt_rand());
}

function getCSRFToken() {
  if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = newCSRFToken();
  }
  return $_SESSION['csrf_token'];
}
getCSRFToken();

function checkCSRFToken() {
  if (!isset($_POST['csrf'])) {
    return false;
  }
  // TODO: Fix CSRF tokens to not time out so soon
  return true;
  return $_POST['csrf'] === getCSRFToken();
}

function requireCSRF() {
  if (!checkCSRFToken()) {
    dieJSON(array(
      'error' => true,
      'csrfError' => true
    ));
  }
}

function redirectHash($hash) {
  $link = getBaseURL()."#$hash";
  header("Location: $link");
  echo "Redirecting to <a href=\"$link\">$link</a>. ";
  echo "Click on that link if you're not redirected.";
  die();
}

/**
 * Set the header type to Javascript and JSON encode the result.
 */
function dieJSON($obj) {
  header("Content-type: text/javascript");
  die(json_encode($obj));
}

function requirePostDataFields() {
  $post_fields = func_get_args();
  foreach ($post_fields as $field) {
    if (!isset($_POST[$field])) {
      dieJSON(array(
        'error' => true,
        'errorDesc' => "Missing $field value"
      ));
    }
  }
}

/**
 * Create an array of info on a particular class of a particular year.
 */
function pullClass(
    $class,
    $year = false,
    $classterm = 0,
    $override = false,
    $substitute = '') {

  $row = CourseRoadDB::getBestClassInfo($class, $year);
  if (!$row) {
    return array(
      'error' => true,
      'errorDesc' => 'No class'
    );
  }

  // Some returned columns are unhelpful and are thus discarded.
  unset($row['id']);
  unset($row['design_units']);
  unset($row['tuition_attr']);
  unset($row['supervisor_attr']);
  unset($row['hgn_code']);
  unset($row['hgn_except']);
  unset($row['last_modified']);
  unset($row['notes']);
  unset($row['exception']);

  // Format assorted other rows. While classes are usually considered as "8.01",
  // it's easier to keep refer to them as "8_01" [for classes, etc.]
  $row['id'] = str_replace('.', '_', $row['subject_id']);
  $row['divid'] = $row['id'] . '__' . rand();
  $row['is_variable_units'] = ($row['is_variable_units'] == '1');
  $row['offered_this_year'] = ($row['offered_this_year'] == '1');
  $row['fall'] = ($row['fall'] == '1');
  $row['iap'] = ($row['iap'] == '1');
  $row['spring'] = ($row['spring'] == '1');
  $row['summer'] = ($row['summer'] == '1');
  $row['permission'] = (strpos($row['reqs'], 'Permission') != false);
  $row['reqs'] = json_decode($row['reqs']);
  $reqs = $row['reqs'] ? 'Reqs: [X]' : 'No reqs :D';

  if ($row['reqstr']) {
    $row['reqstr'] = 'Requisites: ' . $row['reqstr'] . '<br>';
  }

  $row['total_units'] = floatval($row['total_units']);

  // Occasionally, the Warehouse tries to say that a class has 0 units. Since
  // that doesn't make much sense, default these exceptions to 12 units.
  $default_unit_count = 12;
  if (!$row['total_units']) {
    $row['total_units'] = $default_unit_count;
  }

  // Build the class' HTML for the info box when it's selected.
  $row['info'] = makeClassInfoHTML($row);

  // Each class added to the page is a div; this string holds the space-
  // separated classes added to that div. (Apologies on the overloading of the
  // word "class".)
  $row['divclasses']  = 'classdiv bubble ' . $row['id'];

  // Joint subjects at MIT are labelled with a J suffix. This trims that off.
  $row['joint_subjects'] = explode(', ', $row['joint_subjects']);
  foreach($row['joint_subjects'] as &$subj) {
    $subj = rtrim($subj, 'J');
  }
  if (!$row['joint_subjects'][0]) {
    $row['joint_subjects'] = false;
  }

  $row['equiv_subjects'] = explode(', ', $row['equiv_subjects']);
  foreach($row['equiv_subjects'] as &$subj) {
    $subj = rtrim($subj, 'J');
  }
  if (!$row['equiv_subjects'][0]) {
    $row['equiv_subjects'] = false;
  }

  if ($row['joint_subjects']) {
    $joint_subjects_classes = implode(' ', $row['joint_subjects']);
    $joint_subjects_classes = str_replace('.', '_', $joint_subjects_classes);
    $row['divclasses'] .= ' ' . $joint_subjects_classes;
  }

  if ($row['gir'] && $row['gir'][0] === 'H') {
    $row['gir'] = '';
  }
  if ($row['gir']) {
    $row['divclasses'] .= ' GIR ' . $row['gir'];
  }
  if ($row['ci']) {
    $row['divclasses'] .= ' CI ' . $row['ci'];
  }
  if ($row['hass']) {
    $row['divclasses'] .= ' HASS ' . $row['hass'];
  }

  // Extraclasses handles cases where a class universally also counts for
  // something else, like 18.100B and 18.100. This is set manually in the
  // warehouse_exceptions table.
  if ($row['extraclasses']) {
    $row['divclasses'] .= ' ' . str_replace('.', '_', $row['extraclasses']);
  }

  $row['special'] = ($row['gir'] || $row['ci'] || $row['hass']);
  $row['classterm'] = $classterm;
  $row['override'] = $override;
  $row['substitute'] = $substitute;
  $row['custom'] = false;

  // year = 2013 --> year_range = '12-'13
  $row['year_range'] = (
    "'" . substr($row['year'] - 1, -2) . "-'" . substr($row['year'], -2)
  );

  // year_desired holds the year the class attempted to match. This allows for
  // classes which will be in the '14-'15 cycle to be defined now with '13-'14,
  // but should '14-'15 become available, that version with be loaded instead.
  // Thus, year_desired holds the user's desired year.
  $row['year_desired'] = $year ? $year : (date('Y') + (date('m') > 3));

  // Generate HTML for a dropdown list of the other offered years
  $row['otheryears'] = makeYearsOfferedHTML($row['subject_id'], $row['year']);

  $row['yearspan'] = (
    '<span title="The data for this class is from the '. $row['year_range'] .
    ' version of the subject. Click to use another year\'s version." '.
    'href="#" class="dummylink">' . $row['year_range'] . '</span>'
  );

  // $row['div'] actually stores the HTML of the class bubble.
  $row['div'] = <<<EOD
<div id="{$row['divid']}" class="{$row['divclasses']}">
  <div class="classdivlabel">
    <div class="classdivcourse">{$row['subject_id']}:&nbsp;</div>
    <div class="classdivtitle" title="{$row['subject_title']}">
      {$row['subject_title']}
    </div>
  </div>
  <div class="classdivinfo">
    <div class="classdivyear">{$row['yearspan']}</div>
    <div class="reqs">$reqs</div>
  </div>
</div>
EOD;
  return $row;
}

/**
 * Turn "2013" into "'12-'13"
 */
function makeYearRange($year) {
  return "'" . substr($year - 1, -2) . "-'" . substr($year, -2);
}

/**
 * Generate the innerHTML for the info box to be used for when the class is
 * highlighted.
 */
function makeClassInfoHTML($row) {
  $catalog_link_base = 'http://student.mit.edu/catalog/search.cgi?search=';
  $catalog_link = $catalog_link_base . $row['subject_id'];

  $evaluations_link_base = (
    'https://sisapp.mit.edu/ose-rpt/subjectEvaluationSearch.htm?search=' .
    'Search&subjectCode='
  );
  $evaluations_link = $evaluations_link_base . $row['subject_id'];
  $joint_subjects = "";
  if ($row['joint_subjects']) {
    $joint_subjects = "This class meets with {$row['joint_subjects']}.";
  }
  if ($row['equiv_subjects']) {
    $joint_subjects .= "This class is equivalent to {$row['equiv_subjects']}.";
  }
  return <<<EOD
Additional info for <strong>{$row['subject_id']}</strong>:<br>
<strong>{$row['subject_title']}</strong><br>
<a href="{$catalog_link}" target="_blank">Course Catalog</a> &#149;
<a href="{$evaluations_link}" target="_blank">Class Evalutions</a><br>
{$row['reqstr']}
<p class='infounits'>{$row['unitload']} ({$row['total_units']} units)</p><br>
<p class='infoinfo'>{$row['desc']}</p><br>
<p><em>{$joint_subjects}</em></p>
EOD;
}

/**
 * Generate the HTML of the dropdown which holds the list of offered years for
 * a given class.
 */
function makeYearsOfferedHTML($subject_id, $year) {
  $html = '<select>';
  $years_offered = CourseRoadDB::getYearsClassOffered($subject_id);
  foreach ($years_offered as $year_offered) {
    $year_range = makeYearRange($year_offered);
    $html .= "\n\t<option value='$year_offered'";
    $html .= ($year_offered === $year) ? " selected='true'" : '';
    $html .= ">$year_range</option>";
  }
  $html .= "\n<select>";
  return $html;
}

/**
 * Create an array of info on a custom-created class.
 */
function pullCustom(
    $name,
    $units,
    $classterm = 0,
    $override = false,
    $substitute = "") {

  $row = array();
  $row['year'] = '0';
  $row['id'] = substr(preg_replace('/[^A-Za-z]/', '', $name), 0, 8);
  $row['divid'] = $row['id'] . '__' . rand();
  $row['subject_title'] = $name;
  $row['total_units'] = floatval($units);
  if (!$row['total_units']) $row['total_units'] = 0;
  $row['info'] = <<<EOD
<strong>{$row['subject_title']}</strong><br>
<p class='infounits'>({$row['total_units']} units)</p><br>
<p class='infoinfo'>[This is a user-defined subject.]</p>
EOD;
  $row['divclasses']  = "classdiv bubble custom";
  $row['classterm'] = $classterm;
  $row['checkrepeat'] = true;
  $row['override'] = $override;
  $row['substitute'] = $substitute;
  $row['custom'] = true;

  // $row['div'] actually stores the HTML of the class bubble.
  $row['div'] = <<<EOD
<div id="{$row['divid']}" class="{$row['divclasses']}">
  <div class="classdivlabel">
    <div class="classdivtitle" title="{$row['subject_title']}">
      {$row['subject_title']}
    </div>
  </div>
  <div class="classdivinfo">
    <div>({$row['total_units']} units)</div>
  </div>
</div>
EOD;
  return $row;
}

function buildClassesArray($hash) {
  $_SESSION['crhash'] = $hash;

  // Pull out the latest matching saved road's classes and majors
  $classdata = CourseRoadDB::getClassDataFromRoad($hash);
  if (!$classdata) {
    die();
  }
  $classes = json_decode(CourseRoadDB::decrypt($classdata['classes']), true);
  $majors = stripslashes(CourseRoadDB::decrypt($classdata['majors']));
  $majors = json_decode($majors, true);
  if (!$classes) {
    return array(
      'error' => true,
      'errorDesc' => 'No classes'
    );
  }

  $classes_data = array();
  foreach($classes as &$class) {
    if (!isset($class['override'])) {
      $class['override'] = false;
    }
    if (!isset($class['substitute'])) {
      $class['substitute'] = '';
    }
    if (isset($class['custom'])) {
      $classes_data[] = pullCustom(
        $class['name'],
        $class['units'],
        $class['term'],
        $class['override'],
        $class['substitute']
      );
    } else {
      $classdata = pullClass(
        $class['id'],
        $class['year'],
        $class['term'],
        $class['override'],
        $class['substitute']
      );
      if ($classdata != 'noclass') {
        $classes_data[] = $classdata;
      }
    }
  }
  return array(
    'classes' => $classes_data,
    'majors' => $majors
  );
}

function getCurrentAcademicYear() {
  return date('Y') + (date('m') > 7);
}

function getDefaultUserPrefs() {
  return array(
    'class_year' => getCurrentAcademicYear() + 3,
    'view_req_lines' => 1,
    'autocomplete' => 1,
    'need_permission' => 0,
    'edited' => 0
  );
}

function fetchDataFromLDAP($user) {
  $user = escapeshellarg($user);
  $ldap = explode("\n", shell_exec(
    "ldapsearch -LLL -x -h ldap-too -b 'ou=users,ou=moira,dc=mit,dc=edu' " .
    "'uid=$user'"
  ));
  $data = array();
  foreach ($ldap as $row) {
    list($k, $v) = explode(': ', $row, 2);
    if ($k) {
      $data[$k] = $v;
    }
  }
  return $data;
}

function importUserPrefs($athena) {
  // If logged in, repopulate the user prefs with their real values.
  $userprefs = CourseRoadDB::getUserPrefs($athena);
  foreach ($userprefs as $pref_key => $pref_value) {
    $_SESSION['user'][$pref_key] = $pref_value;
  }
}

function makeUserSettingsHTML() {
  $view_req_lines = $_SESSION['user']['view_req_lines']
    ? 'checked="checked"'
    : '';
  $autocomplete = $_SESSION['user']['autocomplete']
    ? 'checked="checked"'
    : '';
  return <<<EOD
    <label for="usersettings_class_year">Class Year: </label>
    <input id="usersettings_class_year" type="text" name="class_year"
      value="{$_SESSION['user']['class_year']}"><br>
    <label for="usersettings_view_req_lines">Toggle requisite lines: </label>
    <input id="usersettings_view_req_lines" type="checkbox"
      name="view_req_lines" value="1" $view_req_lines><br>
    <label for="usersettings_autocomplete">Toggle autocomplete: </label>
    <input id="usersettings_autocomplete" type="checkbox" name="autocomplete"
      value="1" $autocomplete><br>
EOD;
}

function hashOwner($hash) {
  return strstr($hash, '/', true);
}

function defaultOwnedHashName($owner) {
  return $owner.'/'.date("YmdHis");
}

function noCacheLink($uri) {
  return "$uri?nocache=" . md5(file_get_contents($uri));
}
