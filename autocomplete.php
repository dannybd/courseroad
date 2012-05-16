<?php
//error_reporting(E_ALL);
require("connect.php");
$term = mysql_real_escape_string($_GET['term']);
$temp = array();
$query = mysql_query("SELECT DISTINCT `course` FROM `catalog` WHERE `course` LIKE '$term%' ORDER BY `course` LIMIT 6");
while($row = mysql_fetch_array($query)){
	$temp[] = $row['course'];
}
echo json_encode($temp);
mysql_close($connect);
?>
