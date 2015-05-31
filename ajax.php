<?php
/**
 * CourseRoad: A Four-Year Planner for the MIT Undergraduate Community
 * August 17, 2012
 * By: Danny Ben-David (dannybd@mit.edu)
 *
 * CourseRoad is published under the MIT License, as follows:
 *
 * Copyright (c) 2012 Danny Ben-David (dannybd@mit.edu)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
error_reporting(0);

// Makes it easier to test POST code
if (__DEV__ && isset($_GET['dev'])) {
  error_reporting(E_ALL);
  $_POST = $_POST + $_GET;
}

require 'functions.php';

// Yields a JSON-encoded list of classes which match the autocompletion field
// in the Add Class tab.
if (isset($_POST['autocomplete'])) {
  $results = CourseRoadDB::getAutocompleteResults($_POST['autocomplete']);
  dieJSON($results);
}

// Loads class data from the database and serves up the JSON which CourseRoad
// requires to load that class.
if (isset($_POST['getClass'])) {
  requirePostDataFields('subjectId');
  $class = $_POST['subjectId'];
  $year = isset($_POST['year']) ? $_POST['year'] : false;
  dieJSON(pullClass($class, $year));
}

// Same, but for a custom class. These are used by the Add tab.
if (isset($_POST['getCustom'])) {
  requirePostDataFields('name');
  $name = htmlentities($_POST['name']);
  $units = isset($_POST['units']) ? floatval($_POST['units']) : false;
  dieJSON(pullCustom($name, $units));
}

// Returns the desired hash's class and major data
if (isset($_POST['getHash'])) {
  requireCSRF();
  requirePostDataFields('hash');
  dieJSON(buildClassesArray($_POST['hash']));
}

// If we haven't tried to log in, then default to false.
if (!isset($_SESSION['triedcert'])) {
  $_SESSION['triedcert'] = false;
}

// SESSION.athena is only set within secure.php, so if it has a value then we've
// logged in sucessfully
$loggedin = isset($_SESSION['athena']);
$athena = $loggedin ? $_SESSION['athena'] : false;

// Without logging in, we don't have a user pref map, so this sets the default.
// class_year is assumed to be that of the freshmen.
if (!isset($_SESSION['user'])) {
  $_SESSION['user'] = getDefaultUserPrefs();
}

// If logged in, repopulate the user prefs with their real values.
if ($loggedin) {
  importUserPrefs($athena);
}

/**
 * This runs if the user has click "save road". It determines the login
 * status of the user and sets the hash to be either random characters
 * or something like username/20120504051511
 */
if (isset($_POST['saveNewRoad'])) {
  requireCSRF();
  requirePostDataFields('classes', 'majors');
  $classes = CourseRoadDB::encrypt($_POST['classes']);
  $majors = CourseRoadDB::encrypt($_POST['majors']);
  $hash = substr(
    strtr(
      base64_encode(md5($classes . $majors)),
      '+/=',
      '-_,'
    ), 0, 5
  );
  if (!CourseRoadDB::isHashSafe($hash, $classes, $majors)) {
    for (
      $i = 0;
      !CourseRoadDB::isHashSafe($hash . $i, $classes, $majors);
      $i++
    );
  }
  $hash .= $i;
  $_SESSION['crhash'] = $hash;
  $_SESSION['trycert'] = false;
  if ($_POST['trycert']) {
    if ($loggedin) {
      $hash = defaultOwnedHashName($athena);
    } else if (!$_SESSION['triedcert']) {
      $_SESSION['trycert'] = true;
    }
  }
  CourseRoadDB::saveNewRoad($hash, $athena, $classes, $majors);
  dieJSON(array(
    'redirectToAuth' => $_SESSION['trycert'],
    'hash' => $hash
  ));
}

// Returns the desired table of saved roads when the user is logged in
if (isset($_POST['viewSavedRoads'])) {
  requireCSRF();
  if (!$loggedin) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Not logged in',
      'html' => 'Sorry, you need to log in again.'
    ));
  }
  $saved_roads = CourseRoadDB::getSavedRoads($athena);
  $html = '<table>';
  $html .= '<tr>';
  $html .= (
    '<th style="min-width:50px" title="Select if you\'d like one of ' .
    'your saved roads to be available more easily at ' .
    'courseroad.mit.edu/index.php#'.$athena.'">Public</th>'
  );
  $html .= '<th style="min-width:118px">Hash</th>';
  $html .= '<th style="min-width:118px">Added</th>';
  $html .= '<th style="min-width:95px">Major(s)</th>';
  $html .= '<th>Classes</th>';
  $html .= '<th style="min-width:30px;max-width:120px;">Comment</th>';
  $html .= '<th>Delete?</th>';
  $html .= '</tr>';
  $html .= '<tr>';
  $html .= (
    '<td><input type="radio" name="setPublicRoad" ' .
    'class="setPublicRoad" value="null" ' .
    (CourseRoadDB::hasPublicRoad($athena) ? '' : 'checked="true" ') .
    '/></td>'
  );
  $html .= (
    '<td colspan="6">Select this row to prevent any of your ' .
    'saved roads from being your publicly-facing road.</td>'
  );
  $html .= '</tr>';
  foreach ($saved_roads as &$row) {
    $row['classes'] = CourseRoadDB::decrypt($row['classes']);
    $row['majors'] = CourseRoadDB::decrypt($row['majors']);
    $hash = stripslashes($row['hash']);
    $roadURL = "?hash=$hash";
    $html .= "<tr data-hash=\"$hash\">";
    $html .= (
      '<td><input type="radio" name="setPublicRoad" ' .
      'class="setPublicRoad" value="'.$hash.'" ' .
      ($row['public'] === 1 ? 'checked="true" ' : '') . '/></td>'
    );
    $html .= (
      '<td><span class="saved-roads-hash">' . substr(strstr($hash, '/'), 1) .
      '</span><span class="saved-roads-edit-hash ui-icon ui-icon-pencil">' .
      '</span></td>'
    );
    $html .= (
      "<td><a class=\"hashlink\" href=\"$roadURL\">" .
      stripslashes($row['added']) . '</a></td>'
    );
    $majors = stripslashes($row['majors']);
    if ($majors[0] !== '[') {
      $majors = "[\"$majors\"]";
    }
    $majors = str_replace(',"m0"', '', $majors);
    $majors = implode(',<br>', json_decode($majors));
    $html .= "<td>$majors</td>";
    $classes = json_decode($row['classes'], true);
    $classes2 = array();
    foreach ($classes as &$class2) {
      if (isset($class2['custom'])) {
        $class2['id'] = '(' . $class2['name'] . ')';
      }
      if (!isset($class2['id'])) {
        continue;
      }
      if (isset($class2['override']) && $class2['override']) {
        $class2['id'] .= '*';
      }
      $classes2[] = $class2['id'];
    }
    $html .= '<td>' . implode(', ', $classes2) . '</td>';
    $html .= (
      '<td>' .
      '<span class="saved-roads-comment">' . $row['comment'] . '</span>' .
      '<span class="saved-roads-edit-comment ui-icon ui-icon-pencil"></span>' .
      '</td>'
    );
    $html .= '<td><span class="deleteroad ui-icon ui-icon-close"></span></td>';
    $html .= '</tr>';
  }
  $html .= '</table>';
  dieJSON(array(
    'success' => true,
    'html' => $html
  ));
}

// Runs when the user sets one of their roads to be their public road
if (isset($_POST['setPublicRoad'])) {
  requireCSRF();
  requirePostDataFields('hash');
  $hash = $_POST['hash'];
  if (!$loggedin) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'not logged in'
    ));
  }
  if (($athena !== hashOwner($hash)) && ($hash !== 'null')) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'bad hash'
    ));
  }
  CourseRoadDB::setPublicRoad($hash, $athena);
  dieJSON(array('success' => true));
}

// When the user changes a road's hash
if (isset($_POST['changeRoadHash'])) {
  requireCSRF();
  requirePostDataFields('oldhash', 'newhash');
  $oldhash = $_POST['oldhash'];
  $newhash = $athena . '/' . htmlentities(substr($_POST['newhash'], 0, 36));
  if (!$loggedin ||
      preg_match('/\/.*?[^A-Za-z0-9\-]/', $newhash) ||
      !strlen($_POST['newhash'])) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Not logged in',
      'hash' => $oldhash
    ));
  }
  if (($athena !== hashOwner($oldhash)) && ($oldhash !== 'null')) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Bad owner or hash',
      'hash' => $oldhash
    ));
  }
  if (CourseRoadDB::hashExists($newhash)) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'New hash is already taken',
      'hash' => $oldhash
    ));
  }
  CourseRoadDB::changeRoadHash($oldhash, $newhash, $athena);
  dieJSON(array(
    'success' => true,
    'hash' => $newhash
  ));
}

// And when the user adds a comment
if (isset($_POST['setRoadComment'])) {
  requireCSRF();
  requirePostDataFields('hash', 'comment');
  $hash = $_POST['hash'];
  $comment = htmlentities(substr($_POST['comment'], 0, 100));
  if (!$loggedin) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Not logged in',
      'hash' => $oldhash
    ));
  }
  if (($athena !== hashOwner($hash)) && ($hash !== 'null')) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Bad owner or hash',
      'hash' => $oldhash
    ));
  }
  CourseRoadDB::setRoadComment($hash, $comment, $athena);
  dieJSON(array(
    'success' => true,
    'hash' => $hash,
    'comment' => stripslashes($comment)
  ));
}

//Similarly, runs when the user deletes a road.
if (isset($_POST['deleteRoad'])) {
  requireCSRF();
  requirePostDataFields('hash');
  $hash = $_POST['hash'];
  if (!$loggedin) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Not logged in',
      'hash' => $oldhash
    ));
  }
  if (($athena !== hashOwner($hash)) && ($hash !== 'null')) {
    dieJSON(array(
      'error' => true,
      'errorDesc' => 'Bad owner or hash',
      'hash' => $oldhash
    ));
  }
  if ($hash !== 'null') {
    CourseRoadDB::deleteRoad($hash, $athena);
  }
  dieJSON(array(
    'success' => true,
    'hash' => $hash
  ));
}

// When the user saves changes to their user prefs, we update their prefs if
// they're logged in and redisplay the userprefs HTML.
if (isset($_POST['viewUserSettings'])) {
  requireCSRF();
  $_SESSION['user']['class_year'] = intval($_POST['class_year']);
  $_SESSION['user']['view_req_lines'] = (
    $_POST['toggle_view_req_lines'] === '1' ? 1 : 0
  );
  $_SESSION['user']['autocomplete'] = (
    $_POST['toggle_autocomplete'] === '1' ? 1 : 0
  );
  $_SESSION['user']['edited'] = $loggedin ? 0 : 1;
  if ($loggedin) {
    CourseRoadDB::updateUserPrefs($athena, $_SESSION['user']);
  }
  dieJSON(array(
    'success' => true,
    'html' => makeUserSettingsHTML()
  ));
}

if (__DEV__ && isset($_GET['dev'])) {
  dieJSON(array(
    'debug' => true,
    '$_POST' => @$_POST,
    '$_SESSION' => @$_SESSION,
    '$_SERVER' => @$_SERVER
  ));
}
