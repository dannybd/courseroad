<?php

header("Location: https://courseroad.mit.edu/");
die();


if(@$_GET['access']==md5("guest")){
	setcookie('beta', 'notquitesecurebutgoodenough', time()+60*60*24*365);
	header("Location: https://courseroad.mit.edu/index.php?hash=welcome");
	die();
}

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
	<p>Don't worry, CourseRoad will be back shortly, new and improved! Sorry for the inconvenience. (I'll try to be quick!)</p>
	<p>If something's gone horribly wrong and you need something <em>urgently</em>, or you're perhaps interested in helping me beta-test, email me at <a href="courseroad@mit.edu">courseroad@mit.edu</a>.</p>
	<p>Thanks,<br>dannybd</p>
</body>
</html>