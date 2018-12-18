<?php
// $result =  $_POST['score'];
$result =  array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);

$myfile = fopen("points.json", "w");
$myfile2 = fopen("tekst.json", "w");
$json = json_encode($result);

file_put_contents("tekst.json", $json);
file_put_contents("points.json", $result);

echo $json;

?>