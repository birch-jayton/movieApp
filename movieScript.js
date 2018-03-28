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
			displayCardResults(jsonObj);
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
	document.getElementById("movieTitle").innerHTML = jsonObj.Title;
	document.getElementById("rating").innerHTML = "Rated: " + jsonObj.Rated;
	document.getElementById("awards").innerHTML = jsonObj.Awards;
	document.getElementById("boxOffice").innerHTML = jsonObj.BoxOffice;
	for (var i = 0; i < jsonObj.Ratings.length; i++){
		if(jsonObj.Ratings[i].Source == "Internet Movie Database"){
			document.getElementById("imdbInfo").style.display = 'block';
			showImdbProgress(jsonObj.Ratings[i].Value);
		}
		if(jsonObj.Ratings[i].Source == "Rotten Tomatoes"){
			document.getElementById("rtInfo").style.display = 'block';
			showRtProgress(jsonObj.Ratings[i].Value)
		}
		if(jsonObj.Ratings[i].Source == "Metacritic"){
			document.getElementById("metacriticInfo").style.display = 'block';
			showMetacriticProgress(jsonObj.Ratings[i].Value);
		}
	}

	document.getElementById('id01').style.display='block';

}

function closeModal() {
	document.getElementById('id01').style.display='none';
}

function displayCardResults(jsonObj) {
	// go back to top
	document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	//delete previous results, if any.
	var results = document.getElementById("results");
	while (results.firstChild){
		results.removeChild(results.firstChild);
	}

	//loop through results
	for (var i = 0; i < jsonObj.Search.length; i++) {
		//create card
		var card = document.createElement('div');
		card.classList.add("movie-card");
		card.classList.add("col-3");

		//create card content
		var cardContent = document.createElement('div');
		cardContent.classList.add("movie-card-content");

		//create title element
		var titleElem = document.createElement("h2");

		//create title node
		var titleNode = document.createTextNode(jsonObj.Search[i].Title);

		//append title node to title element
		titleElem.appendChild(titleNode);

		//append title element to card content
		cardContent.appendChild(titleElem);

		//create year element
		var yearElem = document.createElement("h4");

		//create year text node
		var yearNode = document.createTextNode(jsonObj.Search[i].Year);

		//append year node to year element
		yearElem.appendChild(yearNode);

		//append year element to card content
		cardContent.appendChild(yearElem);

		//create img element for poster
		var poster = document.createElement("img");
		poster.src = jsonObj.Search[i].Poster;
		poster.classList.add("poster");

		//append poster to card content
		cardContent.appendChild(poster);

		//create button
		var button = document.createElement("div");
		var imdbID = jsonObj.Search[i].imdbID;
		button.innerHTML = '<button class="btn" onclick="getGoodResults(\''+ imdbID +'\')">Is it Good?</button>';

		

		cardContent.appendChild(button);

		//append card content to card
		card.appendChild(cardContent);

		//append card to results
		document.getElementById("results").appendChild(card);


	}
}

function showImdbProgress(score) {
	//convert score to percentage
	var scoreNum = "";
	for (var i = 0; score[i] != '/'; i++) {
		scoreNum += score[i];
	}
	scoreNum = Number(scoreNum);
	scoreNum = scoreNum * 10;

	//animate the bar
	var elem = document.getElementById("imdbBar");   
	var width = 1;
	var id = setInterval(frame, 20);
	function frame() {
	  if (width >= scoreNum) {
	    clearInterval(id);
	  } else {
	    width++; 
	    elem.style.width = width + '%';
	    elem.innerHTML =  width / 10 + " / 10";
	  }
	}
}

function showMetacriticProgress(score) {
	//convert score to percentage
	var scoreNum = "";
	for (var i = 0; score[i] != '/'; i++) {
		scoreNum += score[i];
	}
	scoreNum = Number(scoreNum);

	//animate the bar
	var elem = document.getElementById("metacriticBar");   
	var width = 1;
	var id = setInterval(frame, 20);
	function frame() {
	  if (width >= scoreNum) {
	    clearInterval(id);
	  } else {
	    width++; 
	    if (width < 30) {
	    	elem.style.backgroundColor = "red";
	    }
	    else if (width > 30 && width < 60) {
	    	elem.style.backgroundColor = "#e5b03d";
	    } else {
	    	elem.style.backgroundColor = "green";
	    }

	    elem.style.width = width + '%'; 
	    elem.innerHTML =  width + " / 100";
	  }
	}
}

function showRtProgress(score) {
	//convert score to percentage
	var scoreNum = "";
	for (var i = 0; score[i] != '%'; i++) {
		scoreNum += score[i];
	}
	scoreNum = Number(scoreNum);

	//animate the bar
	var elem = document.getElementById("rtBar");   
	var width = 1;
	var id = setInterval(frame, 20);
	function frame() {
	  if (width >= scoreNum) {
	    clearInterval(id);
	  } else {
	    width++;
	    if (width > 60) {
	    	elem.style.backgroundColor = "#FA320A";
	    	elem.innerHTML = width * 1 + '%  FRESH';
	    } else {
	    	elem.style.backgroundColor = "#4CAF50";
	    	elem.innerHTML = width * 1 + '%  ROTTEN';
	    }
	    elem.style.width = width + '%'; 
	    
	  }
	}
}
