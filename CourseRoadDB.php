<?php

/**
 * Provides methods for talking to the CourseRoad database
 *
 * Contains static methods for accessing the database for all purposes. If
 * something in the codebase needs to talk to the database for any reason,
 * it should use an existing static method defined in here or a new static
 * method should be defined for its purpose.
 *
 * The database link, $_db, needs to be initialized by calling:
 * <code>
 * CourseRoadDB::initialize($databaseURL, $username, $password, $database);
 * </code>
 *
 * SELECT methods in here should pull data and may format it for returning
 * UPDATE/INSERT/DELETE methods should execute and return information about
 * whether the action succeeded.
 */
class CourseRoadDB {

  /**
   * Overwrite the constructor to prevent CourseRoadDB singletons
   */
  private function __construct() {}

  /**
   * Database link (to be initialized in initialize())
   *
   * @var $_db
   * @access private
   */
  private static $_db;

  /**
   * Salt used in encryption/decryption during database storage
   *
   * @var $_salt
   * @access private
   */
  private static $_salt;

  /**
   * Initializes the database link $_db with its variables
   *
   * Creates a new mysqli object and stores that database link for use in the
   * other static methods of the class.
   *
   * @param string $db_URL      the string of the database's URL to connect to
   * @param string $db_username the string of the database username
   * @param string $db_password the string of the database password
   * @param string $db_name     the string of the database name to connect to
   * @param string $db_salt     the string of the salt used for c
   *
   * @return void
   * @throws die kills the page if we cannot connect. Why bother continuing?
   *
   * @access public
   * @static
   */
  public static function initialize(
    $db_URL, $db_username, $db_password, $db_name, $db_salt
  ) {
    self::$_db = new mysqli($db_URL, $db_username, $db_password, $db_name);
    if(self::$_db->connect_errno > 0){
      die('Unable to connect to database [' . self::$_db->connect_error . ']');
    }
    self::$_salt = $db_salt;
  }

  /**
   * Accessor for the private database link (for __DEV__ mode only)
   *
   * @return object the database link
   * @throws die trying to load the db object outside of __DEV__ mode
   *
   * @access public
   * @static
   */
  public static function getDB() {
    if (!__DEV__) {
      die('Illegal call to CourseRoadDB::getDB() outside of __DEV__ mode');
    }
    return self::$_db;
  }

  /**
   * Encrypts content for storage in the database
   *
   * The goal is to obfuscate some of the data in the database so it isn't
   * in plaintext if the database is leaked.
   *
   * @param mixed $mixed content to encrypt
   *
   * @return string the encrypted content
   *
   * @access public
   * @static
   */
  public static function encrypt($mixed) {
    return strtr(
      base64_encode(
        mcrypt_encrypt(
          MCRYPT_RIJNDAEL_256,
          md5(self::$_salt),
          serialize($mixed),
          MCRYPT_MODE_CBC,
          md5(md5(self::$_salt))
        )
      ),
      '+/=',
      '-_,'
    );
  }

  /**
   * Decrypts content which was stored in the database
   *
   * The goal is to obfuscate some of the data in the database so it isn't
   * in plaintext if the database is leaked.
   *
   * @param string $mixed encrypted content
   *
   * @return mixed the decrypted content
   *
   * @access public
   * @static
   */
  public static function decrypt($mixed) {
    return unserialize(
      rtrim(
        mcrypt_decrypt(
          MCRYPT_RIJNDAEL_256,
          md5(self::$_salt),
          base64_decode(strtr($mixed, '-_,', '+/=')),
          MCRYPT_MODE_CBC,
          md5(md5(self::$_salt))
        ),
        "\0"
      )
    );
  }

  /**
   * Fetches the top autocompleted subject ids from a given query
   *
   * @param string $query a string which is part/all of a course id
   *
   * @return array<string> the top results of the search
   *
   * @access public
   * @static
   */
  public static function getAutocompleteResults($query) {
    $statement = self::$_db->prepare(
      "SELECT DISTINCT `subject_id` FROM `warehouse` " .
      "WHERE `subject_id` LIKE ? ORDER BY `subject_id` LIMIT 6"
    );
    $search = "$query%";
    $statement->bind_param('s', $search);
    $statement->execute();
    $statement->bind_result($subject_id);
    $results = array();
    while ($statement->fetch()) {
      $results[] = $subject_id;
    }
    $statement->free_result();
    return $results;
  }

  /**
   * Fetches the class info for a course id as close to the desired year as
   * possible
   *
   * If no year is requested, we pull the class info from the most recent year
   * the class was in the catalog; if a year is requested, then we pull from
   * the closest year as possible for which catalog info exists.
   *
   * We also query the exceptions table, where courses can be copied and
   * modified manually in case there are issues or discrepancies in their
   * representation. Given entries in each table, this method prioritizes
   * the entry from the exceptions table.
   *
   * @param string $class a string of a course id
   * @param int    $year  an int of the year a course is offered, based on the
   *                      the latter year in the school year representation.
   *                      Spring 2014 counts as 2014, Fall 2014 counts as 2015.
   *
   * @return array the relevant class info. NULL if no course found.
   *
   * @access public
   * @static
   */
  public static function getBestClassInfo($class, $year=false) {
    // If we have a year, then prioritize classes based on their distance to
    // that year; otherwise, prioritize based on most recent year first.
    $sort_by_year = $year ? "ABS(`year`-?) ASC" : "`year` DESC";

    // Prioritize rows found within the exceptions table over rows found in the
    // regular table.
    $statement = self::$_db->prepare(
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

  /**
   * Pulls a list of years a class has been offered
   *
   * @param string $class a string of a course id
   *
   * @return array<int> the years that class was offered, based on the latter
   *                    year in the school year representation. Spring 2014
   *                    counts as 2014, Fall 2014 counts as 2015.
   * @access public
   * @static
   */
  public static function getYearsClassOffered($class) {
    $statement = self::$_db->prepare(
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

  /**
   * Determines whether a hash maps to a road in the database
   *
   * Checks both the hash directly, and whether the hash is actually a user's
   * name (and that user has a public road set).
   *
   * @param string $hash a string of the road hash to check
   *
   * @return bool whether hash exists in database
   * @access public
   * @static
   */
  public static function hashExists($hash) {
    $statement = self::$_db->prepare(
      "SELECT `hash` from `roads` WHERE `hash` = ? OR " .
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
   * Checks whether a hash is safe to overwrite
   *
   * Make sure that the newly saved hash won't overwrite a prior road
   * with a different set of classes or majors, but with the same road.
   * Useful for making sure a saved road's hash doesn't hide access to a road
   * saved earlier.
   *
   * @param string $hash    a string of the road hash to check
   * @param string $classes a string of the class list of the road-to-be-saved
   * @param string $majors  a string of the major list of the road-to-be-saved
   *
   * @return bool whether hash is safe to overwrite
   * @access public
   * @static
   */
  public static function isHashSafe($hash, $classes, $majors) {
    $statement = self::$_db->prepare(
      "SELECT COUNT(*) FROM `roads` WHERE `hash` = ? " .
      "AND `classes` != ? AND `majors` != ?"
    );
    $statement->bind_param('sss', $hash, $classes, $majors);
    $statement->execute();
    $statement->bind_result($conflicting_hashes);
    $statement->fetch();
    $statement->free_result();
    return $conflicting_hashes === 0;
  }

  /**
   * Saves new road into database with given data
   *
   * Note that this method does NOT check if a hash is safe to overwrite before
   * running.
   *
   * @param string $hash    a string of the road hash to check
   * @param string $athena  a string of the user's username. '' if none.
   * @param string $classes a string of the class list of the road-to-be-saved
   * @param string $majors  a string of the major list of the road-to-be-saved
   *
   * @return array data on save success
   * @access public
   * @static
   */
  public static function saveNewRoad($hash, $athena, $classes, $majors) {
    $statement = self::$_db->prepare(
      "INSERT INTO `roads` (`hash`, `user`, `classes`, `majors`, `ip`) " .
      "VALUES (?, ?, ?, ?, ?);"
    );
    $ip = $_SERVER['REMOTE_ADDR'];
    $statement->bind_param('sssss', $hash, $athena, $classes, $majors, $ip);
    return self::_executeStatement($statement);
  }

  /**
   * Pulls class and major data for a given road
   *
   * Also accounts for whether the hash is actually a user's username (and that
   * user has a public road set).
   *
   * @param string $hash a string of the road hash
   *
   * @return array class and major data
   * @access public
   * @static
   */
  public static function getClassDataFromRoad($hash) {
    $statement = self::$_db->prepare(
      "SELECT `classes`, `majors` FROM `roads` " .
      "WHERE (`hash` = ? OR (`hash` LIKE ? AND `public` = '1')) " .
      "ORDER BY `added` DESC LIMIT 0,1"
    );
    $hashlike = "$hash/%";
    $statement->bind_param('ss', $hash, $hashlike);
    $statement->execute();
    $classdata = $statement->get_result()->fetch_assoc();
    $statement->free_result();
    return $classdata ?: array();
  }

  /**
   * Pulls a list of saved roads and their data of a given user
   *
   * @param string $athena a string of the user's username
   *
   * @return array a list of saved roads (each element is an array of road data)
   * @access public
   * @static
   */
  public static function getSavedRoads($athena) {
    $statement = self::$_db->prepare(
      "SELECT `hash`, `classes`, `majors`, `public`, `comment`, `added` FROM " .
      "`roads` WHERE `user` = ? AND `hash` LIKE ? ORDER BY `added` DESC"
    );
    $hash = "$athena/%";
    $statement->bind_param('ss', $athena, $hash);
    $statement->execute();
    $saved_roads = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
    $statement->free_result();
    return $saved_roads;
  }

  /**
   * Checks whether a given user has a public road set
   *
   * @param string $athena a string of the user's username
   *
   * @return bool whether they have a public road set
   * @access public
   * @static
   */
  public static function hasPublicRoad($athena) {
    $statement = self::$_db->prepare(
      "SELECT COUNT(*) FROM `roads` WHERE `hash` LIKE ? AND `public` = '1'"
    );
    $hash = "$athena/%";
    $statement->bind_param('s', $hash);
    $statement->execute();
    $statement->bind_result($num_public_roads);
    $statement->fetch();
    $statement->free_result();
    return (bool) $num_public_roads;
  }

  /**
   * Sets a hash as a public road for a given user
   *
   * Since only one road per user may be public, this also sets all of their
   * other roads to not be the public road at the same time. If you feed in no
   * hash at all, then this unsets any public road for that user.
   *
   * @param string $hash   a string of the road hash to set as the public
   * @param string $athena a string of the user's username
   *
   * @return array data on update success
   * @access public
   * @static
   */
  public static function setPublicRoad($hash, $athena) {
    $statement = self::$_db->prepare(
      "UPDATE `roads` SET `public` = CASE " .
      "WHEN `hash` = ? THEN '1' ELSE '0' END WHERE `user` = ?"
    );
    $statement->bind_param('ss', $hash, $athena);
    return self::_executeStatement($statement);
  }

  /**
   * Changes a road's hash when a user renames one of their saved roads
   *
   * @param string $oldhash a string of the old road hash
   * @param string $newhash a string of the new road hash
   * @param string $athena  a string of the user's username
   *
   * @return array data on update success
   * @access public
   * @static
   */
  public static function changeRoadHash($oldhash, $newhash, $athena) {
    $statement = self::$_db->prepare(
      "UPDATE `roads` SET `hash` = ? WHERE `hash` = ? AND `user` = ?"
    );
    $statement->bind_param('sss', $newhash, $oldhash, $athena);
    return self::_executeStatement($statement);
  }

  /**
   * Sets a comment on a user's saved road
   *
   * @param string $oldhash a string of the road hash
   * @param string $comment a string of the road comment
   * @param string $athena  a string of the user's username
   *
   * @return array data on update success
   * @access public
   * @static
   */
  public static function setRoadComment($hash, $comment, $athena) {
    $statement = self::$_db->prepare(
      "UPDATE `roads` SET `comment` = ? WHERE `hash` = ? AND `user` = ?"
    );
    $statement->bind_param('sss', $comment, $hash, $athena);
    return self::_executeStatement($statement);
  }

  /**
   * Deletes a user's saved road
   *
   * @param string $hash   a string of the road hash
   * @param string $athena a string of the user's username
   *
   * @return array data on delete success
   * @access public
   * @static
   */
  public static function deleteRoad($hash, $athena) {
    $statement = self::$_db->prepare(
      "DELETE FROM `roads` WHERE `hash` = ? AND `user` = ?"
    );
    $statement->bind_param('ss', $hash, $athena);
    return self::_executeStatement($statement);
  }

  /**
   * Copies a road's hash when a user saves with login
   *
   * When a user logs in, we need to duplicate their just-saved road into a
   * road saved under their username. This copies the road and saves it with
   * the correct user.
   *
   * @param string $oldhash a string of the old road hash
   * @param string $newhash a string of the new road hash
   * @param string $athena  a string of the user's username
   *
   * @return array data on copy success
   * @access public
   * @static
   */
  public static function copyRoad($oldhash, $newhash, $athena) {
    $statement = self::$_db->prepare(
      "INSERT INTO `roads` " .
      "(`hash`, `user`, `classes`, `majors`, `comment`, `ip`) " .
      "(SELECT ?, ?, `classes`, `majors`, `comment`, `ip` " .
      "FROM `roads` WHERE `hash` = ? ORDER BY `added` DESC LIMIT 0,1)"
    );
    $statement->bind_param('sss', $newhash, $athena, $oldhash);
    return self::_executeStatement($statement);
  }

  /**
   * Adds a user to the users table, with default values
   *
   * Use updateUserPrefs($athena, $userprefs) below to set other values
   *
   * @param string $athena a string of the user's username
   *
   * @return array data on insert success
   * @access public
   * @static
   */
  public static function addUser($athena) {
    $statement = self::$_db->prepare(
      "INSERT INTO `users` (`athena`) VALUES (?)"
    );
    $statement->bind_param('s', $athena);
    return self::_executeStatement($statement);
  }

  /**
   * Get a given user's preferences from the users table
   *
   * @param string $athena a string of the user's username
   *
   * @return array data of that user's preferences
   * @access public
   * @static
   */
  public static function getUserPrefs($athena) {
    $statement = self::$_db->prepare(
      "SELECT `class_year`, `view_req_lines`, `autocomplete`, " .
      "`need_permission` FROM `users` WHERE `athena` = ?"
    );
    $statement->bind_param('s', $athena);
    $statement->execute();
    $userprefs = $statement->get_result()->fetch_assoc();
    $statement->free_result();
    return $userprefs ?: array();
  }

  /**
   * Check whether a given user exists
   *
   * @param string $athena a string of the user's username
   *
   * @return bool whether user exists
   * @access public
   * @static
   */
  public static function userExists($athena) {
    return !!self::getUserPrefs($athena);
  }

  /**
   * Update a given user's preferences
   *
   * @param string $athena    a string of the user's username
   * @param array  $userprefs an associative array of user prefs. Must include
   *                          class_year, view_req_lines, autocomplete,
   *                          need_permission as keys.
   *
   * @return array data on update success
   * @access public
   * @static
   */
  public static function updateUserPrefs($athena, $userprefs) {
    $statement = self::$_db->prepare(
      "UPDATE `users` SET `class_year` = ?, `view_req_lines` = ?, " .
      "`autocomplete` = ?, `need_permission` = ? WHERE `athena` = ?"
    );
    $statement->bind_param(
      'sssss',
      $userprefs['class_year'],
      $userprefs['view_req_lines'],
      $userprefs['autocomplete'],
      $userprefs['need_permission'],
      $athena
    );
    return self::_executeStatement($statement);
  }

  /**
   * Execute a given mysqli statement and return sucess & debug info
   *
   * Used for UPDATE/INSERT/DELETE statements, to make sure that they happened
   * properly. The returned array leads with a boolean which indicates query
   * success or failure.
   *
   * @param object $statement mysqli statement for execution
   *
   * @return array data on success and debug info as well on failure
   * @access private
   * @static
   */
  private static function _executeStatement($statement) {
    if ($statement->execute()) {
      $ret = array(true);
    } else {
      $ret = array(false, self::$_db->errno, self::$_db->error);
    }
    $statement->close();
    return $ret;
  }

}
