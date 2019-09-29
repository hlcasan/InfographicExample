
var insert_expense = function() {
    //The form in the HTML
    const addForm = document.getElementById("addExpense");

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (document.getElementById("amount").value > 200) {
        	alert("Please avoid large values that will break the interface. We all need to work with this app. And when extreme values are added, it breaks the chart's balance.");
        } 
        else {

					//This is the backend file inserting in the DB
					const php = "app/setData.php";

					//This is what we send to the server for the PHP file
					const xhr = new XMLHttpRequest();
					let formData = new FormData(addForm);

					//Connect to the PHP
					xhr.open("POST", php, true);
					xhr.onreadystatechange = function () {
							console.log('readyState: ' + xhr.readyState);
							console.log('status: ' + xhr.status);
							if (xhr.readyState == 4 && xhr.status == 200) {
									// Everything ok, get the response
									console.log(xhr.responseText);

									// Call a refresh of the list of names
									chart();
									//Reset the form
									document.getElementById("addExpense").reset();
									toggleForm();
							}
					};
					xhr.send(formData);
				}

    });
};
insert_expense();
