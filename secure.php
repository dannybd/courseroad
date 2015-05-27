<?php
// secure.php is the connection page to check for MIT certificates;
// if the certs are found it will add the user data to the session accordingly
// and then pass the browser back to whence it came.

require 'functions.php';

// Give SESSION.crhash a default value as an empty string
if (!isset($_SESSION['crhash'])) {
  $_SESSION['crhash'] = '';
}

// Stop attempts to access this page directly without the main page or attempts
// to load it twice
if (!@$_SESSION['wenttoindex'] || @$_SESSION['wenttosecure']) {
  redirect_hash($_SESSION['crhash']);
}
$_SESSION['wenttosecure'] = true;

// If the certificate used to authenticate is somehow missing an email address,
// then we can't do anything more with it.
if (!isset($_SERVER['SSL_CLIENT_S_DN_Email'])) {
  redirect_hash('-no-email');
}

// The cert is valid and the user is trying to log in, so extract their athena
$athena = strstr($_SERVER['SSL_CLIENT_S_DN_Email'], '@', true);

// Assert the existence of the user session prefs
if (!isset($_SESSION['user'])) {
  $_SESSION['user'] = getDefaultUserPrefs();
}
// Try to determine the user's class year from LDAP data
if (!CourseRoadDB::userExists($athena)) {
  $ldap_data = fetch_ldap_data($athena);
  $cur_year = @$ldap_data['mitDirStudentYear'] ?: 1;
  $_SESSION['user']['class_year'] = getCurrentAcademicYear() + 4 - $cur_year;
  $_SESSION['user']['edited'] = true;
}

// Create a row for the user (default values are chosen for class_year et al)
CourseRoadDB::addUser($athena);
if ($_SESSION['user']['edited']) {
  CourseRoadDB::updateUserPrefs($athena, $_SESSION['user']);
}

// We've attempted auth
$_SESSION['triedcert'] = true;
$_SESSION['athena'] = $athena;
$_SESSION['saveas'] = $_SESSION['crhash'] . '';

// If we're also trying to Save with Log In, then update the hash and copy
// the old row.
if (isset($_SESSION['trycert'])) {
  $_SESSION['trycert'] = false;
  $_SESSION['saveas'] = default_owned_hash_name($_SESSION['athena']);
  CourseRoadDB::copyRoad($_SESSION['crhash'], $_SESSION['saveas'], $athena);
}

/*
echo @$sql;
echo "success<pre>SERVER:\n";
print_r($_SERVER);
echo "\n\nSESSION:\n";
print_r($_SESSION);
unset($_SESSION['trycert']);
echo "\n\n--------------</pre>";
echo "<p><a href='$baseURL/#{$_SESSION['saveas']}'>Click</a></p>";
/*/
redirect_hash($_SESSION['saveas']);
//*/
?>
