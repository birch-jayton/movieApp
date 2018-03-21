function get_movie_data_button_clicked(){
	//Get movie title from user input
	var movieTitle = document.getElementById("movieInput").value;

	//Create the URL with the title as a parameter
	var url = "https://www.omdbapi.com/?apikey=39ebc70b&s=" + movieTitle;
	
	//Instantiate a XMLHttpRequest objext and define 
	//    the onreadystatechange function
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status ==200) {
			var jsonObj = JSON.parse(this.responseText);
			console.log(jsonObj);
			displaySearchResults(jsonObj);
		}
	}

	//Add request type and URL
	xhttp.open("GET", url, true)

	//Send request
	xhttp.send();
}
function displaySearchResults(jsonObj) {
	//Our main body or "parent"
	var main = document.getElementById("main");

	//Delete results if there exists results from a previous search
	var previousTable = document.getElementById("resultsTable");
	if (previousTable != null) {
		main.removeChild(previousTable);
	}

	//Create the table 
	var table = document.createElement("table");
	table.setAttribute("id", "resultsTable");

	//Create the first row
	var titleRow = document.createElement("tr");
	titleRow.classList.add("results");

	//Create title element
	var titleColElem = document.createElement("th");
	titleColElem.classList.add("results");
	var titleColNode = document.createTextNode("Title");
	titleColElem.appendChild(titleColNode);
	titleRow.appendChild(titleColElem);

	//Create year element
	var yearColElem = document.createElement("th");
	yearColElem.classList.add("results");
	var yearColNode = document.createTextNode("Year");
	yearColElem.appendChild(yearColNode)
	titleRow.appendChild(yearColElem);

	//Create Poster element
	var posterColElem = document.createElement("th");
	posterColElem.classList.add("results");
	var posterColNode = document.createTextNode("Poster");
	posterColElem.appendChild(posterColNode);
	titleRow.appendChild(posterColElem);

	//add row to table
	table.appendChild(titleRow);


	for (var i = 0; i < jsonObj.Search.length; i++) {
		//create row element
		var myRow = document.createElement("tr");
		myRow.classList.add("results");

		//create and add element for title 
		var titleElem = document.createElement("th");
		titleElem.classList.add("results");
		var titleNode = document.createTextNode(jsonObj.Search[i].Title);
		titleElem.appendChild(titleNode);

		//add title element to the row
		myRow.appendChild(titleElem);

		//create and add element for year
		var yearElem = document.createElement("th");
		yearElem.classList.add("results");
		var yearNode = document.createTextNode(jsonObj.Search[i].Year);
		yearElem.appendChild(yearNode);

		//add year element to row
		myRow.appendChild(yearElem);

		//create element for poster image
		var posterElem = document.createElement("th");
		posterElem.classList.add("results");
		var imageElem = document.createElement("img");
		imageElem.src = jsonObj.Search[i].Poster;
		imageElem.classList.add("poster");
		posterElem.appendChild(imageElem);

		//add poster to row
		myRow.appendChild(posterElem);

		//create button
		var buttonSpace = document.createElement("th");
		var imdbID = jsonObj.Search[i].imdbID;
		buttonSpace.innerHTML = '<button onclick="getGoodResults(\''+ imdbID +'\')">Is it Good?</button>'

		//add button to row;
		myRow.appendChild(buttonSpace);


		//add row to table
		table.appendChild(myRow);
	}

	//Add table to Document
	placeBeforeThis = document.getElementById("footer");
	main.insertBefore(table, placeBeforeThis);
}

function getGoodResults(movieId) {  
	var url = "https://www.omdbapi.com/?apikey=39ebc70b&i=" + movieId + "&plot=full";
	console.log(url);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status ==200) {
			var jsonObj = JSON.parse(this.responseText);
			console.log(jsonObj);
			showGoodResults(jsonObj);
		}
	}

	//Add request type and URL
	xhttp.open("GET", url, true)

	//Send request
	xhttp.send();

}

function showGoodResults(jsonObj) {
	var x;
	for (var i = 0; i < jsonObj.Ratings.length; i++){
		//Add source
		var sourceElem = document.createElement("h2");
		var sourceNode = document.createTextNode(jsonObj.Ratings[i].Source);
		sourceElem.appendChild(sourceNode);
		document.getElementById("modalMain").appendChild(sourceElem);

		//add rating
		var ratingElem = document.createElement("p");
		var ratingNode = document.createTextNode(jsonObj.Ratings[i].Value);
		ratingElem.appendChild(ratingNode);
		document.getElementById("modalMain").appendChild(ratingElem);
	}
	document.getElementById('id01').style.display='block'

}

function closeModal() {
	document.getElementById('id01').style.display='none';
	var myNode = document.getElementById("modalMain");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
}
