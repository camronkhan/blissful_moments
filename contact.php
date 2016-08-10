<?php

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {
    // Get data from AJAX request
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
 
    // Get data to be emailed
    $to = "blissfulmomentsbystephanie@gmail.com";
    $subject = "Website Contact Form Submission";
    $body = "From: " . $name . "\n\nEmail: " . $email . "\n\nPhone: " . $phone . "\n\nMessage:\n\n" . $message;
            
    // Send email
    mail($to, $subject, $body);
    
    // Confirm success
    echo "<p id='form-sent'>Your message was sent. Thank you!</p>";
}