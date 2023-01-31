<?php

$to = 'landort@gmail.com';
$unpack = json_decode(file_get_contents("php://input"), true);

var_dump($unpack);

$message = "<div>Order</div><ul>";
foreach ($unpack as $el) {
	$message .= "<li>";
	foreach ($el as $key => $item) {
		$message .= $key . ":" . $item . "<br>";
	};
	$message .= "</li>";
};
$message .= "</ul>";

$headers = 'Content-type: text/html; charset=iso-8859-1';
mail($to, 'Test order email', $message, $headers);

//Telegram part

$token = "5872805296:AAEAs4_M6wkTLRfMsscDXq3ojQqsY5UYkl0";
$chat_id = "-893011950";
// $chat_id = "-878731406";
$telegram = "Order:\n";

foreach ($unpack as $el) {
	$telegram .= "\n";
	foreach ($el as $key => $item) {
		$telegram .= "$key: $item\n";
	};
};

$getQuery = array(
	"chat_id" 	=> $chat_id,
	"text"  	=> $telegram,
	"parse_mode" => "html"
);

$ch = curl_init("https://api.telegram.org/bot" . $token . "/sendMessage?" . http_build_query($getQuery));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);

$resultQuery = curl_exec($ch);
curl_close($ch);

?>