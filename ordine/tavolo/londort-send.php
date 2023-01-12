<?php

$sitename = 'test.londort.ru';
$to = 'landort@gmail.com';
$package = file_get_contents("php://input");
$unpack = json_decode($package, true);
var_dump($unpack);

$message = "Order:";


foreach ($unpack as $el) {
	foreach ($el as $key => $item) {
		$message .= "$key: $item \r\n";
	};
};

mail($to, 'Test order email', $message);

//Telegram part

/* https://api.telegram.org/bot5983802501:AAFbfnwqsGhSjYK0TBMtlAo__XaPVsVtMkA/getUpdates,*/

// $token = "5983802501:AAFbfnwqsGhSjYK0TBMtlAo__XaPVsVtMkA";
// $chat_id = "-872131602";
// $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$message}","r");

?>