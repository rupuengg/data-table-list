<?php
	require_once('db/Database.php');

	$post = $_REQUEST;

	$id = !empty($post['id']) ? $post['id'] : 0;
	$status = !empty($post['status']) ? $post['status'] : 0;

	$db = new Database('test', 'root', 'mysql', 'localhost'); // $host is optional and defaults to 'localhost'

    sleep(1);

	$res = $db->update('user', array('is_archive' => $status), array('id' => $id));

    $response = ['Status' => 1, 'Message' => 'Item has been archived'];

	header('Content-type: application/json');
	echo json_encode($response);