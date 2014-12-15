<?php
// secure.php is the connection page to check for MIT certificates;
// if the certs are found it will add the user data to the session accordingly
// and then pass the browser back to whence it came.

require('connect.php');
session_start();

// If someone's trying to access this page directly (without trying to first
// auth on index.php) then send them back to index.php
if (!@$_SESSION['wenttoindex']) {
  header("Location: $baseURL/");
  die();
}

// Remove this session variable, as it is no longer useful.
unset($_SESSION['wenttoindex']);

// Give SESSION.crhash a default value as an empty string
if (!isset($_SESSION['crhash'])) $_SESSION['crhash'] = "";

// If the certificate used to authenticate is somehow missing an email address,
// then we can't do anything more with it.
if (!isset($_SERVER['SSL_CLIENT_S_DN_Email'])) {
  header("Location: $baseURL/#-no-email");
  die();
}

// The cert is valid and the user is trying to log in. Pull data from the cert
$athena = strstr($_SERVER['SSL_CLIENT_S_DN_Email'], "@", true); // florey
$fullname = @$_SERVER['SSL_CLIENT_S_DN_CN']; // Jack Florey

// Sanitize data
$athena = mysql_real_escape_string($athena);
$fullname = mysql_real_escape_string($fullname);

// Create a row for the user (default values are chosen for class_year et al.)
mysql_query("INSERT INTO `users`(`athena`) VALUES ('$athena')");

// The user could have changed preferences before logging in: if preferences
// have been edited, then update the row
if (@$_SESSION['user'] and $_SESSION['user']['edited']) {
  mysql_query(
    "UPDATE `users` SET " .
    "`class_year`='{$_SESSION['user']['class_year']}', " .
    "`view_req_lines`='{$_SESSION['user']['view_req_lines']}', " .
    "`autocomplete`='{$_SESSION['user']['autocomplete']}' " .
    "WHERE `athena`='$athena'"
  );
}

// We've attempted auth
$_SESSION['triedcert'] = true;
$_SESSION['athena'] = $athena;
$_SESSION['fullname'] = $fullname;
$_SESSION['saveas'] = $_SESSION['crhash'] . '';

// If we're also trying to Save with Log In, then update the hash and copy
// the old row.
if (isset($_SESSION['trycert'])) {
  $_SESSION['saveas'] = $_SESSION['athena'].'/'.date("YmdHis");
  $sql = (
    "INSERT INTO `roads2` " .
    "(`hash`, `user`, `classes`, `majors`, `comment`, `ip`) " .
    "(SELECT '{$_SESSION['saveas']}', '$athena', `classes`, `majors`, " .
    "`comment`, `ip` FROM `roads2` WHERE `hash`='{$_SESSION['crhash']}' " .
    "AND `classes` != '[]' ORDER BY `added` DESC LIMIT 0,1)"
  );
  mysql_query($sql);
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
header("Location: $baseURL/#{$_SESSION['saveas']}");
//*/
?>
