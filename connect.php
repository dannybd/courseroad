<?php

require('settings.ini');

$connect = mysql_connect("sql.mit.edu", $username, $password);
mysql_select_db($database);

function encrypt($mixed){
	return strtr(
    base64_encode(
      mcrypt_encrypt(
        MCRYPT_RIJNDAEL_256, 
        md5(SALT), 
        serialize($mixed), 
        MCRYPT_MODE_CBC, 
        md5(md5(SALT))
      )
    ), 
    '+/=', 
    '-_,'
  );
}

function decrypt($mixed){
	return unserialize(
    rtrim(
      mcrypt_decrypt(
        MCRYPT_RIJNDAEL_256, 
        md5(SALT), 
        base64_decode(strtr($mixed, '-_,', '+/=')), 
        MCRYPT_MODE_CBC, 
        md5(md5(SALT))
      ), 
      "\0"
    )
  );
}
?>
