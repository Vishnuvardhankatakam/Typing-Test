let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

spinnerEl.classList.remove("d-none");

let url = "https://apis.ccbp.in/random-quote";
let uniqueId = null;
let counter = 0;

let randomQuote;

function timeStart() {
    uniqueId = setInterval(function() {
        timerEl.textContent = counter + " Seconds";
        counter = counter + 1;
    }, 1000);
}

let options = {
    method: "GET"
};

fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        spinnerEl.classList.add("d-none");
        randomQuote = jsonData.content;
        quoteDisplayEl.textContent = randomQuote;
        timeStart();
    });

resetBtnEl.addEventListener("click", function() {
    clearInterval(uniqueId);

    counter = 0;
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            randomQuote = jsonData.content;
            quoteDisplayEl.textContent = randomQuote;
            timeStart();
            quoteInputEl.value = "";
            resultEl.textContent = "";

        });
});

submitBtnEl.onclick = function() {
    let randomVal = quoteDisplayEl.textContent;
    let quoteInputVal = quoteInputEl.value;
    if (randomVal === quoteInputVal) {
        resultEl.textContent = "you typed " + counter + " seconds";
    } else {
        resultEl.textContent = "you typed incorrect sentence";
    }
};