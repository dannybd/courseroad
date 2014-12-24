<?php

class CourseRoadDB {

  public static function fetchAutocompleteResults($db, $query) {
    $results = array();
    $statement = $db->prepare(
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

}

?>
