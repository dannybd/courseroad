<?php

require('settings.ini');

// The general idea being to give beta-testers a cookie to identify them.
// This cookie is read to give access if the proper lines are uncommented in
// .htaccess.
$passphrase = md5('guest');

if (@$_GET['access'] === $passphrase) {
  // Cookie lasts a year
  setcookie('beta', 'notquitesecurebutgoodenough', time()+60*60*24*365);
  header("Location: ./index.php?hash=welcome");
  die();
}

// To be seen by those without beta-tester access.
// Headers specify the 503 code, but to retry in a day's time.
header("HTTP/1.1 503 Service Temporarily Unavailable");
header("Status: 503 Service Temporarily Unavailable");
header("Retry-After: 86400");

?>
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>CourseRoad is upgrading!</title>
  <style>
    body{
      background-color: #EEE;
      font-family: Arial;
    }
  </style>
</head>
<body>
  <h1>Maintenance time!</h1>
  <p>
    Don't worry, CourseRoad will be back shortly, new and improved! 
    Sorry for the inconvenience. (I'll try to be quick!)
  </p>
  <p>
    If something's gone horribly wrong and you need something <em>urgently</em>,
    or you're perhaps interested in helping me by being a beta tester,
    email me at <a href="courseroad@mit.edu">courseroad@mit.edu</a>.
  </p>
  <p>
    Thanks,<br>
    dannybd
  </p>
</body>
</html>
