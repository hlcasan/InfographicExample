<?php
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    //Collect the user’s data
    $cat = $_REQUEST['category'];
    $amount = $_REQUEST['amount'];

    if ($cat != "") { //proceed only if a category was provided, otherwise ignore

        //prepare the SQL query
        $q = "INSERT INTO infographic (category, amount) VALUES (?,?)";
    
        //This should contain 1 when the line is inserted (check line 41)
        $insertedRows = 0;
    
        //prepare statement, execute, store_result
        if ($insertStmt = $dbi->prepare($q)) {
            //update bind parameter types & variables as required
            //s=string, i=integer, d=double, b=blob
            $insertStmt->bind_param("si", $cat, $amount);
            $insertStmt->execute();//run the SQL
            $insertedRows += $insertStmt->affected_rows;
        } else {
            echo "Error";
        }
        
        //end statement
        $insertStmt->close();
    }
    //close connection
    $dbi->close();
    echo "OK: $insertedRows item added";//this is returned to JS
}

?>