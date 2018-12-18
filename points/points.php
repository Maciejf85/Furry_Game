<?php
if(isset($_POST['score'])){
     $result = $_POST['score'];
     $json = json_encode($result);
     file_put_contents("points.json", $json);     
     header('Content-Type: application/json');
     echo $json;
}else{
     $result = file_get_contents('points.json');
     header('Content-Type: application/json');
     echo $result;
}
?>