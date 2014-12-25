<?php

class CourseRoadDB {

  private function __construct() {}
  private static $db;

  public static function initialize(
    $databaseURL, $username, $password, $database
  ) {
    self::$db = new mysqli($databaseURL, $username, $password, $database);
    if(self::$db->connect_errno > 0){
      die('Unable to connect to database [' . self::$db->connect_error . ']');
    }
  }

  public static function getAutocompleteResults($query) {
    $results = array();
    $statement = self::$db->prepare(
      "SELECT DISTINCT `subject_id` FROM `warehouse` " .
      "WHERE `subject_id` LIKE ? ORDER BY `subject_id` LIMIT 6"
    );
    $search = "$query%";
    $statement->bind_param('s', $search);
    $statement->execute();
    $statement->bind_result($subject_id);
    while ($statement->fetch()) {
      $results[] = $subject_id;
    }
    $statement->free_result();
    return $results;
  }

  public static function getBestClassInfo($class, $year=false) {
    // If we have a year, then prioritize classes based on their distance to
    // that year; otherwise, prioritize based on most recent year first.
    $sort_by_year = $year ? "ABS(`year`-?) ASC" : "`year` DESC";

    // Prioritize rows found within the exceptions table over rows found in the
    // regular table.
    $statement = self::$db->prepare(
      "SELECT *, '0' AS exception FROM `warehouse` " .
      "WHERE `subject_id` = ? UNION ALL " .
      "SELECT *, '1' AS exception FROM `warehouse_exceptions` " .
      "WHERE `subject_id` = ? " .
      "ORDER BY $sort_by_year, exception DESC, `last_modified` DESC;"
    );
    if ($year) {
      $statement->bind_param('ssi', $class, $class, $year);
    } else {
      $statement->bind_param('ss', $class, $class);
    }
    $statement->execute();
    $row = $statement->get_result()->fetch_assoc();
    $statement->free_result();
    return $row;
  }

  public static function getYearsClassOffered($class) {
    $statement = self::$db->prepare(
      "SELECT DISTINCT `year` FROM `warehouse` " .
      "WHERE `subject_id` = ? ORDER BY `year` DESC"
    );
    $statement->bind_param('s', $class);
    $statement->execute();
    $statement->bind_result($year);
    $years_offered = array();
    while ($statement->fetch()) {
      $years_offered[] = $year;
    }
    $statement->free_result();
    return $years_offered;
  }

  public static function hashExists($hash) {
    $statement = self::$db->prepare(
      "SELECT `hash` from `roads2` WHERE `hash` = ? OR " .
      "(`user` = ? AND `public` = '1') LIMIT 1"
    );
    $statement->bind_param('ss', $hash, $hash);
    $statement->execute();
    $statement->bind_result($num_public_roads);
    $statement->fetch();
    $statement->free_result();
    return (bool) $num_public_roads;
  }

  /**
   * Check to make sure that the newly saved hash won't overwrite a prior
   * hash with a different set of classes or majors.
   */
  public static function isHashSafe($hash, $classes, $majors) {
    $statement = self::$db->prepare(
      "SELECT COUNT(*) FROM `roads2` WHERE `hash` = ? " .
      "AND `classes` != ? AND `majors` != ?"
    );
    $statement->bind_param('sss', $hash, $classes, $majors);
    $statement->execute();
    $statement->bind_result($conflicting_hashes);
    $statement->fetch();
    $statement->free_result();
    return $conflicting_hashes === 0;
  }

  public static function saveNewRoad($hash, $athena, $classes, $majors) {
    $statement = self::$db->prepare(
      "INSERT INTO `roads2` (`hash`, `user`, `classes`, `majors`, `ip`) " .
      "VALUES (?, ?, ?, ?, ?);"
    );
    $ip = $_SERVER['REMOTE_ADDR'];
    $statement->bind_param('sssss', $hash, $athena, $classes, $majors, $ip);
    if ($statement->execute()) {
      $ret = array(true, $statement->insert_id);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function getClassDataFromRoad($hash) {
    $statement = self::$db->prepare(
      "SELECT `classes`, `majors` FROM `roads2` " .
      "WHERE (`hash` = ? OR (`hash` LIKE ? AND `public`='1')) " .
      "ORDER BY `added` DESC LIMIT 0,1"
    );
    $hashlike = "$hash/%";
    $statement->bind_param('ss', $hash, $hashlike);
    $statement->execute();
    $classdata = $statement->get_result()->fetch_assoc();
    $statement->free_result();
    return $classdata ?: array();
  }

  public static function getSavedRoads($athena) {
    $statement = self::$db->prepare(
      "SELECT `hash`, `classes`, `majors`, `public`, `comment`, `added` " .
      "FROM `roads2` WHERE `user` = ? ORDER BY `added` DESC"
    );
    $statement->bind_param('s', $athena);
    $statement->execute();
    $saved_roads = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
    $statement->free_result();
    return $saved_roads;
  }

  public static function hasPublicRoad($athena) {
    $statement = self::$db->prepare(
      "SELECT COUNT(*) FROM `roads2` WHERE `hash` LIKE ? AND `public`='1'"
    );
    $hash = "$athena/%";
    $statement->bind_param('s', $hash);
    $statement->execute();
    $statement->bind_result($num_public_roads);
    $statement->fetch();
    $statement->free_result();
    return (bool) $num_public_roads;
  }

  public static function setPublicRoad($hash, $athena) {
    $statement = self::$db->prepare(
      "UPDATE `roads2` SET `public`= CASE " .
      "WHEN `hash`= ? THEN '1' ELSE '0' END WHERE `user` = ?"
    );
    $statement->bind_param('ss', $hash, $athena);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function changeRoadHash($oldhash, $newhash) {
    $statement = self::$db->prepare(
      "UPDATE `roads2` SET `hash`= ? WHERE `hash`= ?"
    );
    $statement->bind_param('ss', $newhash, $oldhash);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function setRoadComment($hash, $comment) {
    $statement = self::$db->prepare(
      "UPDATE `roads2` SET `comment`= ? WHERE `hash`= ?"
    );
    $statement->bind_param('ss', $comment, $hash);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function deleteRoad($hash, $athena) {
    $statement = self::$db->prepare(
      "DELETE FROM `roads2` WHERE `hash`= ? AND `user` = ?"
    );
    $statement->bind_param('ss', $hash, $athena);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function copyRoad($oldhash, $newhash, $athena) {
    $statement = self::$db->prepare(
      "INSERT INTO `roads2` " .
      "(`hash`, `user`, `classes`, `majors`, `comment`, `ip`) " .
      "(SELECT ?, ?, `classes`, `majors`, `comment`, `ip` " .
      "FROM `roads2` WHERE `hash` = ? ORDER BY `added` DESC LIMIT 0,1)"
    );
    $statement->bind_param('sss', $newhash, $athena, $oldhash);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function addUser($athena) {
    $statement = self::$db->prepare(
      "INSERT INTO `users`(`athena`) VALUES (?)"
    );
    $statement->bind_param('s', $athena);
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

  public static function getUserPrefs($athena) {
    $statement = self::$db->prepare(
      "SELECT `class_year`, `view_req_lines`, `autocomplete`, " .
      "`need_permission` FROM `users` WHERE `athena` = ?"
    );
    $statement->bind_param('s', $athena);
    $statement->execute();
    $userprefs = $statement->get_result()->fetch_assoc();
    $statement->free_result();
    return $userprefs ?: array();
  }

  public static function updateUserPrefs($athena, $userprefs) {
    $statement = self::$db->prepare(
      "UPDATE `users` SET `class_year` = ?, `view_req_lines` = ?, " .
      "`autocomplete` = ?, ` WHERE `athena` = ?"
    );
    $statement->bind_param(
      'ssss',
      $userprefs['class_year'],
      $userprefs['view_req_lines'],
      $userprefs['autocomplete'],
      $athena
    );
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$db->errno, self::$db->error);
    }
    $statement->close();
    return $ret;
  }

}
