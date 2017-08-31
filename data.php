<?php
	require_once('db/Database.php');

	$post = $_REQUEST;

	$searchText = !empty($post['searchText']) ? $post['searchText'] : '';
	$gender = !empty($post['gender']) ? $post['gender'] : 'All';

	$page = !empty($post['page']) ? $post['page'] : 1;
	$limit = !empty($post['limit']) ? $post['limit'] : 'All';
	$col = !empty($post['col']) ? $post['col'] : 'id';
	$dir = !empty($post['dir']) ? strtoupper($post['dir']) : 'DESC';
	$offset = (($page - 1) * $limit);

	$db = new Database('test', 'root', 'qwerty', 'localhost'); // $host is optional and defaults to 'localhost'

	$where = array('is_archive' => 0);
	if($gender != 'All') 
		$where = array('gender' => $gender);

	$listCount = $db->select('user', $where, "", "", '', 'count(*) as cnt');
	$listCount = $listCount->row_array();
	$listCount = $listCount['cnt'];

	$limit = ($limit == 'All') ? $listCount : $limit;

	$list = $db->select('user', $where, "$limit", "$col $dir ", '', '*', $offset);
	$list = $list->result_array();

	$tmpList = ($limit == 'All') ? $listCount : $limit;

    $response = ['List' => $list, 
	            'total_items' => $listCount, 
	            'page' => $page,
	            'total_pages' => (($listCount % $tmpList == 0) ? $listCount / $tmpList : ((int)($listCount / $tmpList) + 1)),
	            'limit' => $limit,
	            'col' => $col,
	            'dir' => $dir];

	header('Content-type: application/json');
	echo json_encode($response);