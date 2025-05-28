<?php


$valid_passwords = array ("shk" => "240786");
$valid_users = array_keys($valid_passwords);


$user = $_SERVER['PHP_AUTH_USER'];
$pass = $_SERVER['PHP_AUTH_PW'];


$validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);


if (!$validated) {
  header('WWW-Authenticate: Basic realm="My Realm"');
  header('HTTP/1.0 401 Unauthorized');
  die ("Not authorized");
}






?>


<?PHP
$ch = curl_init('178.46.155.14:8080');
curl_exec($ch);
curl_close($ch);
?>
