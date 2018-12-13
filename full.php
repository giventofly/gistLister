<?php

//vars
$updatecache = false;
//define here for personal use
$accesstoken = "";

if(isset($_GET['atoken'])) {
  $accesstoken = $_GET['atoken'];
  $updatecache = true;
}


$files_content = true;
//store user/owner info, always false i guess ?
$owner = false;
//store full file(s) full info => + requests
$fileinfo = true;
//remove some fields => less space
$compact = true;

//https://www.reich-consulting.net/support/developement/php-developement/removing-keys-from-an-array-in-php/
function array_remove_keys($array, $keys = array()) {
	// If array is empty or not an array at all, don't bother
	// doing anything else.
	if(empty($array) || (! is_array($array))) { return $array; }
	// If $keys is a comma-separated list, convert to an array.
	if(is_string($keys)) { $keys = explode(',', $keys); }
	if(! is_array($keys)) { return $array; }
  // array_diff_key() expected an associative array.
  $assocKeys = array();
    foreach($keys as $key) { $assocKeys[$key] = true; }
    return array_diff_key($array, $assocKeys);
}



function curlme($url){
					$headers = [];
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
					$agent = 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/10.0';
					curl_setopt($ch, CURLOPT_USERAGENT, $agent);
					
					// this function is called by curl for each header received
					curl_setopt($ch, CURLOPT_HEADERFUNCTION,
						function($curl, $header) use (&$headers)	{
							//echo "header: $header<br>";
							$len = strlen($header);
							$header = explode(':', $header, 2);
							// ignore invalid headers
							if (count($header) < 2) return $len;
							$name = strtolower(trim($header[0]));
							if (!array_key_exists($name, $headers)) { $headers[$name] = [trim($header[1])]; }
							else { $headers[$name][] = trim($header[1]); }
							return $len;
						}
					);
					$body = curl_exec($ch);
					//print_r($headers);
					$response = array('header' => $headers, 'body' => $body);
					return $response;
	}

//update cache only if update is on
if($updatecache) { 
	$url = "https://api.github.com/gists?access_token=".$accesstoken;
	$stop = false;
	$json = array();
	while(!$stop) {
		//verify for errors
		$info = curlme($url);
		$json = array_merge($json,json_decode($info['body'],true));
		$re = '/<((?:http|ftp|https):\/\/[\w\-]+(?:\.[\w\-_]+)+(?:[\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#]))>;\s+rel="(\w+)"/m';
		preg_match_all($re, $info['header']['link'][0], $matches, PREG_SET_ORDER, 0);
		unset($info);
		if($url == $matches[0][1] || $matches[0][2] != 'next') { $stop = !$stop; }
		$url = $matches[0][1];
	}

	$finaljson = array();
	$index = 0;
	if($files_content) {
		foreach ($json as $gist) {
			
			if(!$owner) { $gist = array_remove_keys($gist, 'user,owner'); }
			//$id = $gist['id'];
			$url = $gist['url'];
			$link = $gist['html_url'];
			$public = $gist['public'];
			$description = $gist['description'];
			$createdate = $gist['created_at'];
			$updateat = $gist['updated_at'];
			if($compact) {
				//remove other "useless" fields from general
				$gist = array_remove_keys($gist,'forks_url,commits_url,git_push_url,git_pull_url,comments,comments_url,truncated,node_id,id');
			} 
			//full info (content) for files
			if($fileinfo) {
				$gistcontent = json_decode(curlme($url."?access_token=".$accesstoken)['body'],true);
				//store not all info
				if($compact) {
					foreach ($gistcontent['files'] as $key => $value) {
						$gist['files'][$key]['content'] = $value['content'];
					}
					$files = $gist['files'];
				}
				else { $files = $gistcontent['files']; }
				
			}
			else {
				//default files
				$files = $gist['files'];
			 }
			
			$finaljson[$index] = $gist;
			//it just adds the content of files
			$finaljson[$index]['files'] = $files;
			$finaljson[$index]['filesnum'] = sizeof($files);
			$index++;
		}
  }
  
	//parse for each gist and create a new json with the contents
	file_put_contents('cache.json', serialize($finaljson));
}
  $read = "[{}]";
	if(!$updatecache) { $read = unserialize(file_get_contents('cache.json'));}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">

  <script>
   <?php echo "const json = " . json_encode($read); ?>
  </script>
  <script src="app.js"></script>
  <title>Gist Lister </title>
</head>
<body>
  <div class="gistman">
  <div class="gistman__menu">
    <div class="gistman__menu-topbar">
      <form action="<?php $_PHP_SELF ?>" method="GET"><input type="text" id='apikey' placeholder="github api key" name="atoken"><input type="submit" value="UPDATE"/></form>
      <input type="text" id='search' placeholder="Search...">
      <input type="text" id="ftypesearch" placeholder="File type search...">
      <a href="#" id="sortDate">Date</a>
    </div>
  </div>
  </div>
  <div class="gistlist" id='gistlist'></div>
</body>
</html>