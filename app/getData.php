<?php 
require_once("db_connect.php");

if ($dbi) {
    // SQL query
    $q = "SELECT category, SUM(amount) as 'sum' FROM infographic GROUP BY category";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rCat,$rSum);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "category"=>$rCat,
                "amount"=>$rSum
            ];
        }
        
        //Encode JSON
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>