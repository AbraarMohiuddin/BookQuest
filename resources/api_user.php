<?php
// get the HTTP method, path, and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);  // json string to associative array(true)

// connect to the mysql database, provide the appropriate credentials
require_once('settings.php');
$conn = mysqli_connect($host, $username, $password, $dbname);

mysqli_set_charset($conn, 'utf8');

// initialise the table name accordingly
$table = "users";

// create SQL based on the HTTP method
switch ($method) {
  case 'POST':
    if ($request[0] == 'register') {
      // Registration logic
      if (isset($input['username']) && isset($input['password'])) {
        $username = mysqli_real_escape_string($conn, $input['username']);
        $password = mysqli_real_escape_string($conn, $input['password']);
        
        // Check if the username already exists
        $check_sql = "SELECT * FROM `$table` WHERE username='$username'";
        $check_result = mysqli_query($conn, $check_sql);
        
        if (mysqli_num_rows($check_result) > 0) {
          echo json_encode(['error' => 'Username already exists']);
        } else {
          $sql = "INSERT INTO `$table` (username, password) VALUES ('$username', '$password')";
          $result = mysqli_query($conn, $sql);
          
          if ($result) {
            echo json_encode(['id' => mysqli_insert_id($conn)]);
          } else {
            echo json_encode(['error' => 'Registration failed: ' . mysqli_error($conn)]);
          }
        }
      } else {
        echo json_encode(['error' => 'Invalid input']);
      }
    } else {
      // Login logic
      if (isset($input['username']) && isset($input['password'])) {
        $username = mysqli_real_escape_string($conn, $input['username']);
        $password = mysqli_real_escape_string($conn, $input['password']);
        $sql = "SELECT * FROM `$table` WHERE username='$username' AND password='$password'";
        $result = mysqli_query($conn, $sql);
        
        if ($result) {
          echo json_encode(mysqli_fetch_object($result));
        } else {
          echo json_encode(['error' => 'Invalid username or password']);
        }
      } else {
        echo json_encode(['error' => 'Invalid input']);
      }
    }
    break;
}

// close mysql connection
mysqli_close($conn);
