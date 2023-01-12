<?php

$json = file_get_contents("php://input");
$json = json_decode($json, true);

var_dump($json);

$to = "londort@gmail.com";
$subject = "File from QR Web";
$message = "";
// foreach ($json as $el) {
// 	foreach ($el as $key => $item) {
// 		$message .= "$key: $item \r\n";
// 	};
// };

foreach ($json as $el) {
	$message .= "$el";
};

// $to = "landort@gmail.com";
// $subject = "Test mail from QR Web";
// $message = "Hello! I am a message from the web-site";

mail($to, $subject, $message);
?>