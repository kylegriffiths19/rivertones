<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
	if($_POST['enquiry'] === "Membership"){
		$to_email = "kylegriff19@gmail.com";
	} else if($_POST['enquiry'] === "Booking us"){
		$to_email = "kylemgriff@gmail.com";
	}


$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$subject = "[Contact Form] " . $_POST["subject"];


function isValidEmail($email) {
    return strpos($email, "@") !== false;
}

if($name != "" && $email != "" && $message != "" && isValidEmail($email)) {

	$full_message = "Name : ". $name . "\n";
	$full_message .= "Email : ". $email . "\n";
	$full_message .= "Message :\n\n". $message . "\n";

	mail($to_email, $subject, $full_message);
	header("location: contact.html");
    exit();
}
}


die("Your data is invalid.");

?>