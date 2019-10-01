/*
This is the part of the app that SELECTs the data from the DB to build the charts.
*/


// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

//This is the main function of the chart, it builds both the Google and Custom charts
var chart = function () {
	//The PHP file handling the SQL and DB interaction
	var php = "app/getData.php";
	
	//The AJAX call information
	var xhr = new XMLHttpRequest();
	var formData = new FormData(); //This is for an HTML form, not used here
	var itemRaw = new Array(); //This contains the data returned from the DB

    xhr.open("POST", php, true);//Start AJAX call
    xhr.onreadystatechange = function() {
		//Check that the connection is fine and that the PHP file answers
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Everything ok, get the data
            itemRaw = JSON.parse(xhr.responseText);//Parse the JSON from DB into array
			console.log(itemRaw); // log response

			/*Used to get percentage width for bars
			  Gets the largest value of Amount and uses this to calculate the width of bars in chart
			  The largest value becomes 100%, and the othe values are calculated accodingly
			  This way, we always get a chart that covers the whole width of the box
			*/
			let maxAmount = 0;
			for (let c in itemRaw) {
				maxAmount < Number(itemRaw[c].amount) ? maxAmount = Number(itemRaw[c].amount) : maxAmount;
			}

			//GOOGLE CHART// This part is here for reference, it works, but it is hidden by CSS

			//Setup the google chart data table
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Category');
			data.addColumn('number', 'Amount');
			//push in the values
			for (let c in itemRaw) {
				data.addRow([itemRaw[c].category,Number(itemRaw[c].amount)]);
			}
			//draw the google chart
			var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
			chart.draw(data);		


			//CUSTOM CHART//
			document.getElementById("container").innerHTML = "";//This empties the chart container
			for (let c in itemRaw) { //Loop through all the rows from the DB
				/*This is to calculate the colour
				  We use hsl (hue, saturation, lightness)
				  We change only the hue value, look below (line 76)

				  The calculation is the following:
					  divide 255 (max for hue) into the number of rows (I’ll explain the minus 1 in class)
					  then multiply by the current row number
				  This assures that each bar will be a different colour than the others
				  */
				let light = ((255) / (itemRaw.length - 1)) * c;
				console.log(light);

				let cat = document.createElement("div");  //Create the category parent
				cat.className = "category";
				
				let label = document.createElement("div");  //Create the label
				label.className = "label";

				let bar = document.createElement("div");  //Create the bar
				bar.className = "bar";
				bar.style.background = "hsl("+light+",60%,50%)"; //here we assign the colour of the bar

				label.innerHTML = itemRaw[c].category; //put the category name inside the label

				/* We calculate the width of the bar according to the maths we did at lines 34–37
					The longest bar (highest amount value), is set to 100% 
					And the others have relative percentages going down. */
				bar.style.width = (Number(itemRaw[c].amount) / maxAmount) * 100 + "%"; //width is % now
				bar.innerHTML = "<span>" + itemRaw[c].amount + "</span>"; //the label with the value appears on hover
				
				cat.appendChild(label);//put label inside parent
				cat.appendChild(bar);//put bar inside parent
				
				document.getElementById("container").appendChild(cat);//put parent inside chart container
			}

			// Populate the Suggestions for the form //
			let datalist = document.getElementById("cat_suggestions");//select datalist element
			datalist.innerHTML = "";//empty the datalist every time you generate the chart
			for (let c in itemRaw) {//loop items
				let option = document.createElement("option");//create option tag
				option.value = itemRaw[c].category;//set its value
				datalist.appendChild(option);//put option inside datalist
			}

		}
	};
	xhr.send(formData);//send AJAX call
};

//This is a callback from Google, but since it calls our function, it serves for the custom form as well
google.charts.setOnLoadCallback(chart);
