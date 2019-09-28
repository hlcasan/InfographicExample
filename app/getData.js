
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

var chart = function () {
	
	var php = "app/getData.php";
	
	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	var itemRaw = new Array();

    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Everything ok, get the data
            itemRaw = JSON.parse(xhr.responseText);
			console.log(itemRaw); // handle response.

			//Used to get percentage width for bars
			let maxAmount = 0;
			for (let c in itemRaw) {
				maxAmount < Number(itemRaw[c].amount) ? maxAmount = Number(itemRaw[c].amount) : maxAmount;
			}

			//GOOGLE CHART//

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
			document.getElementById("container").innerHTML = "";
			for (let c in itemRaw) {
				//let randL = 20 + (Math.random() * 75); //20-95
				let light = 20 + ((95 / itemRaw.length) * c);
				//console.log("l = "+ light + "c:" + c);

				let cat = document.createElement("div");
				cat.className = "category";
				
				let label = document.createElement("div");
				label.className = "label";

				let bar = document.createElement("div");
				bar.className = "bar";
				//bar.style.background = "hsl(100,60%,"+randL+"%)";
				bar.style.background = "hsl(100,60%,"+light+"%)";

				label.innerHTML = itemRaw[c].category;
				//bar.style.width = (Number(itemRaw[c].amount) * 2) + "px";
				bar.style.width = (Number(itemRaw[c].amount) / maxAmount) * 100 + "%"; //width is % now
				bar.innerHTML = "<span>" + itemRaw[c].amount + "</span>";
				
				cat.appendChild(label);
				cat.appendChild(bar);
				
				document.getElementById("container").appendChild(cat);
			}

			// Populate the Suggestions for the form //
			let datalist = document.getElementById("cat_suggestions");
			datalist.innerHTML = "";
			for (let c in itemRaw) {
				let option = document.createElement("option");
				option.value = itemRaw[c].category;
				datalist.appendChild(option);
			}

		}
	};
	xhr.send(formData);
};

google.charts.setOnLoadCallback(chart);
