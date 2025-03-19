const sheetID = '1-67UxmFBq29q8-cwkEb0rlDNHT_oFxs0mvjWWLMPiwY';
const apiKey = 'AIzaSyC_uFW7plhcjxBGZa37grEjo3ya0Isi83g';
const sheetName = 'Sheet1';
let sheetData = [];

async function getSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            sheetData = data.values;
            console.log("Stored Data:", sheetData);

            selectNextQuestion();
        } else {
            console.error("No data found:", data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const flipButton = document.getElementById('flip');
const nextButton = document.getElementById('next');
const chineseText = document.getElementById('chinese');
const pinyinText = document.getElementById('pinyin');
const englishText = document.getElementById('english');
const chineseUsage = document.getElementById('cusage');
const englishUsage = document.getElementById('eusage');

let flipped = false;

nextButton.addEventListener('click', () => {
  this.selectNextQuestion();
});

flipButton.addEventListener('click', () => {
    flipped = !flipped;
    
    chineseText.classList.toggle('hidden', flipped);
    pinyinText.classList.toggle('hidden', !flipped);
    englishText.classList.toggle('hidden', !flipped);
    chineseUsage.classList.toggle('hidden', !flipped);
    englishUsage.classList.toggle('hidden', !flipped);
});

function selectNextQuestion(){
    if (sheetData.length === 0) {
        console.error("No data loaded yet.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * (sheetData.length - 1)) + 1;
    const randomData = sheetData[randomIndex];

    chineseText.textContent = randomData[0];
    pinyinText.textContent = randomData[1];
    englishText.textContent = randomData[2];
    chineseUsage.textContent = randomData[3];
    englishUsage.textContent = randomData[4];

    // Reset to show only Chinese text
    flipped = false;
    chineseText.classList.remove('hidden');
    pinyinText.classList.add('hidden');
    englishText.classList.add('hidden');
    chineseUsage.classList.add('hidden');
    englishUsage.classList.add('hidden');
}

// Fetch data on load
getSheetData();

