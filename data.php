<?php
	$post = $_REQUEST;

	$page = !empty($post['page']) ? $post['page'] : 1;
	$limit = !empty($post['limit']) ? $post['limit'] : 'All';
	$col = !empty($post['col']) ? $post['col'] : 'id';
	$dir = !empty($post['dir']) ? strtoupper($post['dir']) : 'ASC';
	$offset = (($page - 1) * $limit);

	$a = json_decode(file_get_contents('data-list.json'));

	function array_sort($array, $on, $order='ASC'){
	    $new_array = array();
	    $sortable_array = array();

	    if (count($array) > 0) {
	        foreach ($array as $k => $v) {
	            if (is_array($v)) {
	                foreach ($v as $k2 => $v2) {
	                    if ($k2 == $on) {
	                        $sortable_array[$k] = $v2;
	                    }
	                }
	            } else {
	                $sortable_array[$k] = $v;
	            }
	        }

	        switch($order){
	            case 'ASC':
	                asort($sortable_array);
	                break;
	            case 'DESC':
	                arsort($sortable_array);
	                break;
	        }

	        foreach ($sortable_array as $k => $v) {
	            $new_array[$k] = $array[$k];
	        }
	    }

	    return $new_array;
	}

	$a = array_sort($a, $col, $dir);

	$listCount = count($a);

	$list = array();
	if($limit != 'All'){
		$list = array_splice($a, $offset, $limit);
	}else{
		$list = $a;
	}
	// echo '<pre>';print_r($list);die;

	// echo $page.' '.$limit.' '.$col.' '.$dir;
	// echo '<pre>';print_r($list);die;

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