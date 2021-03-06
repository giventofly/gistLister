const json = [{
    "url": "https:\/\/api.github.com\/gists\/0c941fddbe41dafbd33486a3ecfdf288",
    "html_url": "https:\/\/gist.github.com\/0c941fddbe41dafbd33486a3ecfdf288",
    "files": {
      "sort function.js": {
        "filename": "sort function.js",
        "type": "application\/javascript",
        "language": "JavaScript",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/0c941fddbe41dafbd33486a3ecfdf288\/raw\/95cf18033c573afe0946c5c81f108e6864e67eaa\/sort%20function.js",
        "size": 284,
        "content": "const sortDate = (obj,order='asc') => {\n  obj.sort((a,b) => {\n    order=='des' ? (first = a.updated_at, second = b.updated_at) : (first = b.updated_at, second = a.updated_at);\n    if (first < second) return -1;\n    if (first > second) return 1;\n    return 0;\n  });\n  loadinfo(obj);\n}\n"
      }
    },
    "public": true,
    "created_at": "2018-12-12T11:47:31Z",
    "updated_at": "2018-12-12T11:47:31Z",
    "description": "javascript object key sort function",
    "filesnum": 1
  }, {
    "url": "https:\/\/api.github.com\/gists\/5de042bf607d87f51f16572a467c8343",
    "html_url": "https:\/\/gist.github.com\/5de042bf607d87f51f16572a467c8343",
    "files": {
      "simple search object.js": {
        "filename": "simple search object.js",
        "type": "application\/javascript",
        "language": "JavaScript",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/5de042bf607d87f51f16572a467c8343\/raw\/6295d21b36f68adcf2f1719a6171427a9e40375d\/simple%20search%20object.js",
        "size": 1553,
        "content": "  const searchinput = document.getElementById('search');\n  const fsearchinput = document.getElementById('ftypesearch');\n  \/\/searchinput.addEventListener('change', function(e){ filterme(this,); });\n  searchinput.addEventListener('keyup', function(){ this.value.length > MINSEARCH ? filterme(this.value) : loadinfo(json); });\n  fsearchinput.addEventListener('keyup', function(){ this.value.length > MINSEARCH ? filterme(this.value) : loadinfo(json); });\n  \n  const filterme = (searchv,mode='all') => {\n    document.getElementById('gistlist').innerHTML = '';\n    let filesonly = true;\n    if(mode=='files') { filesonly = false; }\n    let newjson = [];\n     json.forEach(elem => { \n        if( (mycontains(elem.description,searchv) && filesonly) || mycontainsfiles(elem.files,searchv,mode)) {\n           newjson.push(elem);\n         }\n     });\n    currentJSON = [...newjson];\n    loadinfo(currentJSON);\n    }\n  \n  const mycontains = (str,search) => { return str.toLowerCase().includes(search.toLowerCase()); }\n  const mycontainsfiles = (elem,search,mode='all') => {\n    let found = false;\n    let filesonly = true;\n    if(mode=='files') { filesonly = false; }\n    Object.entries(elem).forEach(\n      ([key, value]) => {\n       \n        if( key.toLowerCase().includes(search.toLowerCase()) ||\n           (elem[key].filename).toLowerCase().includes(search.toLowerCase()) || \n           ((elem[key].content).toLowerCase().includes(search.toLowerCase()) && filesonly)\n          ) { found = true; }\n      });\n    \/\/console.log(elem,found);\n    return found;\n  };"
      }
    },
    "public": false,
    "created_at": "2018-12-12T11:28:03Z",
    "updated_at": "2018-12-12T11:28:03Z",
    "description": "small javascript search example in object values from input",
    "filesnum": 1
  }, {
    "url": "https:\/\/api.github.com\/gists\/0cc1c23cdd1e87af5721837ed43785f5",
    "html_url": "https:\/\/gist.github.com\/0cc1c23cdd1e87af5721837ed43785f5",
    "files": {
      "ajax send file wp.php": {
        "filename": "ajax send file wp.php",
        "type": "application\/x-httpd-php",
        "language": "PHP",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/0cc1c23cdd1e87af5721837ed43785f5\/raw\/55f4e087da271b83d315faec52abc4b100aa0ddb\/ajax%20send%20file%20wp.php",
        "size": 2644,
        "content": "<?php\n\nadd_action('wp_ajax_my_contactform', 'my_contactform');\nadd_action('wp_ajax_nopriv_my_contactform', 'my_contactform');\nfunction my_contactform(){\n\n  \/\/ ************************************** direct copy\n  $file=$_FILES['myfile'];\n  $upload_dir=wp_upload_dir();\n  $path=$upload_dir['basedir'].'\/myuploads\/';  \/\/upload dir.\n  if(!is_dir($path)) { mkdir($path); }\n  if(upload_user_file( $file ,$path == -1)) { $result['error'][] = 'error inserting file: ' . $file['name']; };\n\n  function upload_user_file( $file = array(),$path ) {\n      if(!empty($file)) {\n          $uploaded=move_uploaded_file($file['tmp_name'], $path.$file['name']);\n          if($uploaded) { return 1; } \n          else { return -1 ; }\n      }\n  }\n\n\n\n  \/\/ ******************* insert via wp with custom dir\n\n\n  $result = upload_user_file( $file );\n  \n\n    function upload_user_file( $file = array() ) {\n\n    \/\/set folder to upload\n    add_filter( 'upload_dir', 'wpse_141088_upload_dir' );\n    \/\/don't create thumbs\n    add_filter('intermediate_image_sizes_advanced', 'add_image_insert_override' );\n      \n    \/\/require_once( ABSPATH . 'wp-admin\/includes\/admin.php' );\n    $file_return = wp_handle_upload( $file, array('test_form' => false ) );\n    if( isset( $file_return['error'] ) || isset( $file_return['upload_error_handler'] ) ) {\n        return false;\n    } else {\n    $filename = $file_return['file'];\n    $attachment = array(\n        'post_mime_type' => $file_return['type'],\n        'post_title' => preg_replace( '\/\\.[^.]+$\/', '', basename( $filename ) ),\n        'post_content' => '',\n        'post_status' => 'inherit',\n        'guid' => $file_return['url']\n    );\n    $attachment_id = wp_insert_attachment( $attachment, $file_return['url'] );\n    \/\/ require_once(ABSPATH . 'wp-admin\/includes\/image.php');\n    $attachment_data = wp_generate_attachment_metadata( $attachment_id, $filename );\n    wp_update_attachment_metadata( $attachment_id, $attachment_data );\n    remove_filter( 'upload_dir', 'wpse_141088_upload_dir' );\n    remove_filter('intermediate_image_sizes_advanced', 'add_image_insert_override' );\n    if( 0 < intval( $attachment_id ) ) {\n      return $attachment_id;\n    }\n  }\n  return false;\n  \n  }\n  \/\/set upload dir\n  function wpse_141088_upload_dir( $dir ) {\n      return array(\n          'path'   => $dir['basedir'] . '\/myuploads\/',\n          'url'    => $dir['baseurl'] . '\/myuploads\/',\n          'subdir' => '\/myuploads',\n      ) + $dir;\n  }\n\n  function add_image_insert_override($sizes){\n    unset( $sizes['thumbnail']);\n    unset( $sizes['medium']);\n    unset( $sizes['large']);\n    unset($sizes['medium_large']);\n    return $sizes;\n}\n\n}"
      },
      "postfor.js": {
        "filename": "postfor.js",
        "type": "application\/javascript",
        "language": "JavaScript",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/0cc1c23cdd1e87af5721837ed43785f5\/raw\/9900c05fd40d5fa7333b3a4d65939c9d491b83d2\/postfor.js",
        "size": 878,
        "content": "const sendRequest = () => {\n  console.log(state);\n  \/\/state = JSON.stringify(state);\n  \/\/console.log('state', state);\n  var formData = new FormData();\n  formData.set('action', \"my_contactform\");\n  let file = document.getElementById('fotobanco').files[0];\n  formData.append('myfile',file);\n  \n  axios.post(ajax_url, formData, {\n        headers: {\n          'Content-Type': 'multipart\/form-data'\n        }})\n    .then(function (response) {\n      if (response.error) {\n        \/\/console.log('response', response.error);\n        showMsg(response.error);\n        return;\n      }\n      \/\/login com sucesso \n      if (response.success) {\n        \/\/only reload or redirect too?\n        showMsg(\"Mensagem enviada com sucesso.\", 1);\n      }\n      console.log(response);\n      showMsg(\"Mensagem enviada com sucesso.\");\n    })\n    .catch(function (error) {\n      alert(error)\n    })\n\n\n  \n}\n"
      }
    },
    "public": true,
    "created_at": "2018-12-11T16:15:52Z",
    "updated_at": "2018-12-12T16:04:49Z",
    "description": "wordpress upload to dir via post (direct upload or using wp media handle) - ajax via axios",
    "filesnum": 2
  }, {
    "url": "https:\/\/api.github.com\/gists\/315b4d0ce21606e4b582553aba1bc3a4",
    "html_url": "https:\/\/gist.github.com\/315b4d0ce21606e4b582553aba1bc3a4",
    "files": {
      "regex-cyrillic-2-latin.php": {
        "filename": "regex-cyrillic-2-latin.php",
        "type": "application\/x-httpd-php",
        "language": "PHP",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/315b4d0ce21606e4b582553aba1bc3a4\/raw\/79caf6431c2723dc8419ca8ed1da43d15c50e809\/regex-cyrillic-2-latin.php",
        "size": 361,
        "content": "<?php\n\n\/\/https:\/\/stackoverflow.com\/a\/6837426\/1911609\n\nfunction strtolatin($string){\n    if (strpos($string = htmlentities($string, ENT_QUOTES, 'UTF-8'), '&') !== false){\n        $string = html_entity_decode(preg_replace('~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|tilde|uml);~i', '$1', $string), ENT_QUOTES, 'UTF-8');\n    }\n    return $string;\n}"
      }
    },
    "public": true,
    "created_at": "2018-12-10T23:06:44Z",
    "updated_at": "2018-12-12T00:51:20Z",
    "description": "regex convert russian (cyrillic) to latin",
    "filesnum": 1
  }, {
    "url": "https:\/\/api.github.com\/gists\/d369f866d214f3ae1b02fdd5c924c4cc",
    "html_url": "https:\/\/gist.github.com\/d369f866d214f3ae1b02fdd5c924c4cc",
    "files": {
      "regex.php": {
        "filename": "regex.php",
        "type": "application\/x-httpd-php",
        "language": "PHP",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/d369f866d214f3ae1b02fdd5c924c4cc\/raw\/1863b9d3f736ee3adaf472a1c14f6c217881a403\/regex.php",
        "size": 106,
        "content": "<?php\n\n\/\/the m** *f*** \/u that was missing.\n$re = '\/([\\w ,\\-\\'\\p{L}]+)\\s+\u2013\\s+([\\w\\d\\s,\\-\\' \\\/]+)\/miu';\n\n"
      }
    },
    "public": true,
    "created_at": "2018-12-10T17:05:00Z",
    "updated_at": "2018-12-10T17:05:01Z",
    "description": "regex php to work with cyrillic alphabet (\u00f5 and so on)",
    "filesnum": 1
  }, {
    "url": "https:\/\/api.github.com\/gists\/3e6d5a4a585157f585f4ba3ae838d79a",
    "html_url": "https:\/\/gist.github.com\/3e6d5a4a585157f585f4ba3ae838d79a",
    "files": {
      "array_remove_keys.php": {
        "filename": "array_remove_keys.php",
        "type": "application\/x-httpd-php",
        "language": "PHP",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/3e6d5a4a585157f585f4ba3ae838d79a\/raw\/8d073b44b7ceaa39cfc413f0227c3d89fbc19558\/array_remove_keys.php",
        "size": 766,
        "content": "<?php\n\/\/https:\/\/www.reich-consulting.net\/support\/developement\/php-developement\/removing-keys-from-an-array-in-php\/\nfunction array_remove_keys($array, $keys = array()) {\n \n\t\/\/ If array is empty or not an array at all, don't bother\n\t\/\/ doing anything else.\n\tif(empty($array) || (! is_array($array))) {\n\t\treturn $array;\n\t}\n \n\t\/\/ If $keys is a comma-separated list, convert to an array.\n\tif(is_string($keys)) {\n\t\t$keys = explode(',', $keys);\n\t}\n \n\t\/\/ At this point if $keys is not an array, we can't do anything with it.\n\tif(! is_array($keys)) {\n\t\treturn $array;\n\t}\n \n    \/\/ array_diff_key() expected an associative array.\n    $assocKeys = array();\n    foreach($keys as $key) {\n        $assocKeys[$key] = true;\n    }\n \n    return array_diff_key($array, $assocKeys);\n}\n?>"
      },
      "readme.txt": {
        "filename": "readme.txt",
        "type": "text\/plain",
        "language": "Text",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/3e6d5a4a585157f585f4ba3ae838d79a\/raw\/0353766e70a2d546bd2bc8e71cc68b186b11b41e\/readme.txt",
        "size": 134,
        "content": "from https:\/\/www.reich-consulting.net\/support\/developement\/php-developement\/removing-keys-from-an-array-in-php\/\n(need 2 files to test)"
      }
    },
    "public": true,
    "created_at": "2018-12-05T10:40:40Z",
    "updated_at": "2018-12-05T10:54:11Z",
    "description": "php remove key from array (multi dimension or not)",
    "filesnum": 2
  }, {
    "url": "https:\/\/api.github.com\/gists\/afbc99dbb9ee01208740e5968ad87214",
    "html_url": "https:\/\/gist.github.com\/afbc99dbb9ee01208740e5968ad87214",
    "files": {
      "get_posts.php": {
        "filename": "get_posts.php",
        "type": "application\/x-httpd-php",
        "language": "PHP",
        "raw_url": "https:\/\/gist.githubusercontent.com\/giventofly\/afbc99dbb9ee01208740e5968ad87214\/raw\/82f8280a05318fbeef31d1574bde72d29c0f52f5\/get_posts.php",
        "size": 732,
        "content": "\t<?php\n  $exposicoes = get_posts(array(\n\t\t\t\t\t\t\t'post_type' => 'exposicao',\n\t\t\t\t\t\t\t'meta_query' => array(\n\t\t\t\t\t\t\t\tarray( \/\/comparing all post_type of exposicao that has meta key left_artistas with value\n\t\t\t\t\t\t\t\t\t'key' => 'left_artistas', \/\/ name of custom field\n\t\t\t\t\t\t\t\t\t'value' => '\"' . get_the_ID() . '\"', \/\/ matches exactly \"123\", not just 123. This prevents a match for \"1234\"\n\t\t\t\t\t\t\t\t\t'compare' => 'LIKE'\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t'meta_key' => 'left_data_fim', \/\/meta key\n            \t\t'orderby' => 'meta_value_num', \/\/value\n            \t\t'order' => 'DESC',\n\t\t\t\t\t\t));\n\t$expos = \"\";\n\tforeach ($exposicoes as $key => $value) {\n\t\t$expos .= $value->post_title . \"<br>\";\n\t}\n\techo \"<pre>\".print_r($exposicoes, true).\"<\/pre>\";\n  ?>"
      }
    },
    "public": true,
    "created_at": "2018-12-03T16:33:41Z",
    "updated_at": "2018-12-03T16:33:41Z",
    "description": "wordpress custom query posts (custom post type and custom meta field)",
    "filesnum": 1
  }]

const formatDate = (date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

//min chars to search
const MINSEARCH = 1;
let currentJSON = [];

document.addEventListener("DOMContentLoaded", function () {

  //load on start
  loadinfo(json);
  currentJSON = [...json];

  const searchinput = document.getElementById('search');
  const fsearchinput = document.getElementById('ftypesearch');
  const dateorder = document.getElementById('sortDate');

  //searchinput.addEventListener('change', function(e){ filterme(this,); });
  searchinput.addEventListener('keyup', function () {
    this.value.length > MINSEARCH ? filterme(this.value) : loadinfo(json);
  });
  fsearchinput.addEventListener('keyup', function () {
    this.value.length > MINSEARCH ? filterme(this.value) : loadinfo(json);
  });
  dateorder.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('active');
    this.classList.contains('active') ? sortDate(currentJSON) : sortDate(currentJSON, 'des');
  });


  //endloadDOMready
});

const filterme = (searchv, mode = 'all') => {
  document.getElementById('gistlist').innerHTML = '';
  let filesonly = true;
  if (mode == 'files') {
    filesonly = false;
  }
  let newjson = [];
  json.forEach(elem => {
    if ((mycontains(elem.description, searchv) && filesonly) || mycontainsfiles(elem.files, searchv, mode)) {
      newjson.push(elem);
    }
  });
  currentJSON = [...newjson];
  document.getElementById('sortDate').classList.contains('active') ? sortDate(currentJSON) : sortDate(currentJSON, 'des');
  //loadinfo(currentJSON);
}

const mycontains = (str, search) => {
  return str.toLowerCase().includes(search.toLowerCase());
}
const mycontainsfiles = (elem, search, mode = 'all') => {
  let found = false;
  let filesonly = true;
  if (mode == 'files') {
    filesonly = false;
  }
  Object.entries(elem).forEach(
    ([key, value]) => {

      if (key.toLowerCase().includes(search.toLowerCase()) ||
        (elem[key].filename).toLowerCase().includes(search.toLowerCase()) ||
        ((elem[key].content).toLowerCase().includes(search.toLowerCase()) && filesonly)
      ) {
        found = true;
      }
    });
  //console.log(elem,found);
  return found;
};

//order functions

const sortDate = (obj, order = 'asc') => {
  obj.sort((a, b) => {
    order == 'des' ? (first = a.updated_at, second = b.updated_at) : (first = b.updated_at, second = a.updated_at);
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
  loadinfo(obj);
}

const loadinfo = json => {
  document.getElementById('gistlist').innerHTML = '';
  json.forEach(elem => {
    let files = '';
    let isprivate = elem.public ? '' : 'private';
    //console.log(elem);
    Object.keys(elem.files).forEach(key => {
      //console.log(elem.files[key]);
      files += `<div class="gist__body-file ${isprivate}">
                      <a class="filename">${elem.files[key].filename}</a>
                      <div class="extension">${elem.files[key].language}</div>
                      <div class="filecontent"><pre>${elem.files[key].content
                          .replace( new RegExp( "\n", "g" ),"<br>")
                          .replace( new RegExp( "\t", "g" )," ")}
                     </pre> </div>
                </div>`;
    });
    let item = document.createElement('div');
    item.classList.add('gist');
    item.innerHTML = `
                  <div class="gist__header">
                    <div class="gist__header__title">
                      <a class="gist__header__title-main" href="${elem.html_url}" target="_blank">${elem.description}</a> 
                      <div class="gist__header__title-date">${formatDate(elem.updated_at)}</div>
                      <div class="gist__header__title-state"></div>
                      </div>
                  </div>
                  <div class="gist__body">${files}</div>
                
                `;
    document.getElementById('gistlist').append(item);
  });
}