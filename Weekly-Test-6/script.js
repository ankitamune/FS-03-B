const apiKey = 'cbe59b0f-5a90-426e-ab66-d4974a37267e';
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', () => {
  const word = searchInput.value.trim();
  if (word === '') {
    return;
  }

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        displayResult(data[0]);
      } else {
        displayResult(null);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      displayResult(null);
    });
});

function displayResult(data) {
  if (data) {
    const pronunciation = data.hwi.prs[0].mw;
    const definition = data.shortdef[0];
    

    let resultHTML = `<p>Pronunciation: ${pronunciation}</p>`;
   
    resultHTML += `<p>Definition: ${definition}</p>`;
    resultDiv.innerHTML = resultHTML;
  } else {
    resultDiv.innerHTML = '<p>No definition found for the given word.</p>';
  }
}
