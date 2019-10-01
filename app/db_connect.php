<?php
//Establish connection: host, user, password, database
$dbi = mysqli_connect("localhost","1111111","ostmh","db1111111");
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
?>