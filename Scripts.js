// Create elements and set variables with attributes
const app = document.getElementById('contentLocation');
const contentMeanCount = document.getElementById('contentMeanCount');

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'container');

const container2 = document.createElement('div');
container2.setAttribute('class', 'container');
container2.setAttribute('id', 'container2');

// Append to container
app.appendChild(container);
contentMeanCount.appendChild(container2);

// Request connection and GET data
var request = new XMLHttpRequest();
request.open('GET', 'data.txt', true);

// Links provided for this task did not work / have any data
/*
request.open('GET', 'https://api.lyrics.ovh/v1', true);
request.open('GET', 'http://musicbrainz.org/ws/2/artist/', true);
*/

// Create option for All Artist Songs to be listed in drop down
var selectOption = document.getElementById('selectOption');
selectOption.options[selectOption.options.length] = new Option('All Artist Songs', 'All Artist Songs');

// Create Array
const optionExists = [];

// On load function
request.onload = function () {

  // Variables used for calculations, defined as 0 value
  var totalMeanCount = 0;
  var numRecords = 0;

  // Obtain JSON data
  var data = JSON.parse(this.response);
  // Check data obtained or throw error
  if (request.status >= 200 && request.status < 400) {
    // Loop through each record
    data.forEach(song => {
    
      // Add artist as an option to array if not already in array
      if(!optionExists.includes(song.artist)) {
        optionExists.push(song.artist);
        selectOption.options[selectOption.options.length] = new Option(song.artist, song.artist);
      }
      
      // Add data elements and variables
      const songDetails = document.createElement('div');
      songDetails.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = song.artist;

      const h2 = document.createElement('h2');
      h2.textContent = song.title;

      const p = document.createElement('p');
      songLyrics = song.lyrics.substring(0, 50);
      p.textContent = `${songLyrics}...`;

      // Count words based on spaces in lyrics between words
      const wordCount = document.createElement('h2');
      wordCount.textContent = 'Lyrics Word Count: '+song.lyrics.split(' ').length;

      // Calculate the mean and add to variable, word count based on space
      totalMeanCount = totalMeanCount + song.lyrics.split(' ').length;
      numRecords = numRecords+1;
      
      // Append all the values to container
      container.appendChild(songDetails);
      songDetails.appendChild(h1);
      songDetails.appendChild(h2);
      songDetails.appendChild(p);
      songDetails.appendChild(wordCount);

      
    });
  } else {
    // Error if unable to obtain data
    const errorMessage = document.createElement('Error Message');
    errorMessage.textContent = 'Error, No Data Found';
    app.appendChild(errorMessage);
  }

  // Add data elements and variables
  const meanDetails = document.createElement('div');
  meanDetails.setAttribute('class', 'card');
  totalMeanCount = (totalMeanCount)/numRecords;

  // Add data element and variable to 0 decimal places
  const meanCount = document.createElement('h2');
  meanCount.textContent = 'Mean Count: '+totalMeanCount.toFixed(0);

  // Append all the values to container
  container2.appendChild(meanDetails);
  meanDetails.appendChild(meanCount);

}

function selectedArtist() {
  
  // Variables used for calculations, defined as 0 value
  var totalMeanCount = 0;
  var numRecords = 0;

  // Variable to get the selected value from drop down
  var selectArtist = document.getElementById('selectOption').value;

  // If all artist is selected from drop down then display main page with all records
  if(selectArtist=='All Artist Songs'){

    // Open homepage in the same tab
    var artistURL = 'http://127.0.0.1:5500/index.html';
    window.open(artistURL, "_self");

  } else {

    // Clear the div container
    var div = document.getElementById('container');
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }

    // Clear the div container
    var div2 = document.getElementById('container2');
    while(div2.firstChild){
      div2.removeChild(div2.firstChild);
    }

    // Obtain JSON data
    var data = JSON.parse(request.response);
    // Loop through each record
    data.forEach(song => {

      // Only add data to containers if the selected artist value from drop down equals the record
      if(selectArtist==song.artist){

        // Add data elements and variables
        const songDetails = document.createElement('div');
        songDetails.setAttribute('class', 'card');
  
        const h1 = document.createElement('h1');
        h1.textContent = song.artist;
  
        const h2 = document.createElement('h2');
        h2.textContent = song.title;
  
        const p = document.createElement('p');
        songLyrics = song.lyrics.substring(0, 50);
        p.textContent = `${songLyrics}...`;
  
        // Count words based on spaces in lyrics between words
        const wordCount = document.createElement('h2');
        wordCount.textContent = 'Lyrics Word Count: '+song.lyrics.split(' ').length;
  
        // Calculate the mean and add to variable, word count based on space
        totalMeanCount = totalMeanCount + song.lyrics.split(' ').length;
        numRecords = numRecords+1;
  
        // Append all the values to container
        container.appendChild(songDetails);
        songDetails.appendChild(h1);
        songDetails.appendChild(h2);
        songDetails.appendChild(p);
        songDetails.appendChild(wordCount);


      }
    });

    // Add data elements and variables
    const meanDetails = document.createElement('div');
    meanDetails.setAttribute('class', 'card');
    totalMeanCount = (totalMeanCount)/numRecords;

    // Add data element and variable to 0 decimal places
    const meanCount = document.createElement('h2');
    meanCount.textContent = 'Mean Count: '+totalMeanCount.toFixed(0);

    // Append all the values to container
    container2.appendChild(meanDetails);
    meanDetails.appendChild(meanCount);

  }
}
request.send();