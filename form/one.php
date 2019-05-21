
<?php
    $users = simplexml_load_file('data.xml');
    echo json_encode($users);
?>
