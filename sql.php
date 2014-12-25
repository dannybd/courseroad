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

  public static function genAutocompleteResults($query) {
    $results = array();
    $statement = self::$db->prepare(
      "SELECT DISTINCT `subject_id` FROM `warehouse` " .
      "WHERE `subject_id` LIKE ? ORDER BY `subject_id` LIMIT 6"
    );
    $search = "$query%";
    $statement->bind_param('s', $search);
    $statement->execute();
    $statement->bind_result($subject_id);
    while($statement->fetch()) {
      $results[] = $subject_id;
    }
    $statement->free_result();
    return $results;
  }

  public static function genUserPrefs($athena) {
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

  public static function genSavedRoads($athena) {
    $statement = self::$db->prepare(
      "SELECT `hash`, `classes`, `majors`, `public`, `comment`, `added` " .
      "FROM `roads2` WHERE `user` = ? ORDER BY `added` DESC"
    );
    $statement->bind_param('s', $athena);
    $statement->execute();
    return $statement->get_result()->fetch_all(MYSQLI_ASSOC);
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

}

?>
