<?php
	$a = array(
			array(
			'id' => 'Male',
			'title' => 'Male'),
			array(
			'id' => 'Female',
			'title' => 'Female'));

	header('Content-type: application/json');
	echo json_encode($a);