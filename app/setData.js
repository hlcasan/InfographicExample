/*
This is the part that grabs the input from the user, through the form, and inserts it in the DB
*/

//Main function, called at line 50
var insert_expense = function () {
	//The form in the HTML
	const addForm = document.getElementById("addExpense");

	//When the user submits the form (clicks the button)
	addForm.addEventListener('submit', function (event) {
		event.preventDefault(); //this is for JS to take over the submit

		//This is to handle the extreme cases ;-)
		if (document.getElementById("amount").value > 200 || document.getElementById("amount").value < 1) {
			alert("Please avoid large values that will break the interface. We all need to work with this app. And when extreme values are added, it breaks the chart's balance.");
		} else {
			//This is the backend file inserting in the DB
			const php = "app/setData.php";

			//This is what we send to the server for the PHP file, the AJAX
			const xhr = new XMLHttpRequest();
			let formData = new FormData(addForm); //the form content, what the user submits

			//Connect to the PHP
			xhr.open("POST", php, true);
			xhr.onreadystatechange = function () {
				//Check that the connection is fine and that the PHP file answers
				console.log('readyState: ' + xhr.readyState);
				console.log('status: ' + xhr.status);
				if (xhr.readyState == 4 && xhr.status == 200) {
					// Everything ok, get the response 
					// We don't need the response, but wecheck for it to make sure it went well
					console.log(xhr.responseText);

					// Call a refresh of the list of names
					chart();

					//Reset the form
					document.getElementById("addExpense").reset();
					toggleForm(); //slide down
				}
			};
			xhr.send(formData); //send AJAX call
		}

	});
};
insert_expense(); //init the funtion