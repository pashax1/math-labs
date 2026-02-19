document.addEventListener("DOMContentLoaded", function () {

    /* ================= PAGE 1 QUOTES ================= */
    const quoteBox = document.getElementById("quote");
    if (quoteBox) {
        const quotes = [
            "Mathematics is the language of the universe.",
            "Pure mathematics is poetry of logical ideas.",
            "Without mathematics, there is nothing you can do.",
            "Math is not about numbers, it's about understanding.",
            "Every culture solved math in its own genius way."
        ];
        let i = 0;
        function changeQuote(){
            quoteBox.innerText = quotes[i];
            i = (i+1) % quotes.length;
        }
        changeQuote();
        setInterval(changeQuote,3000);
    }

    /* ================= PAGE 2 SYSTEM SELECTION ================= */
    window.selectedSystems = [];

    window.selectSystem = function(card, name){
        if(selectedSystems.includes(name)){
            selectedSystems = selectedSystems.filter(s => s !== name);
            card.classList.remove("selected");
        } else {
            if(selectedSystems.length >= 2){
                alert("Select only TWO systems");
                return;
            }
            selectedSystems.push(name);
            card.classList.add("selected");
        }

        const btn = document.getElementById("compareBtn");
        if(!btn) return;
        btn.disabled = selectedSystems.length !== 2;
    }

    window.goNext = function(){
        localStorage.setItem("system1", selectedSystems[0]);
        localStorage.setItem("system2", selectedSystems[1]);
        window.location.href = "/operations";
    }

    /* ================= PAGE 3 OPERATION ================= */
    window.selectOperation = function(op){
        localStorage.setItem("operation", op);
        window.location.href = "/inputs";
    }

    /* ================= PAGE 4 INPUT PAGE ================= */
    const inputContainer = document.getElementById("inputContainer");
    const titleBox = document.getElementById("operationTitle");
    const infoBox = document.getElementById("operationInfo");

    if (inputContainer) {

    const op = localStorage.getItem("operation");

    const operations = {
        add: "Addition",
        sub: "Subtraction",
        mul: "Multiplication",
        div: "Division",
        power: "Power",
        sqrt: "Square Root",
        prime: "Prime Check",
        stats: "Statistics",
        sort: "Sorting",
        matrix: "Matrix Multiplication",
        det: "Determinant",
        poly: "Polynomial",
        factor: "Factorial",
        equation: "Equation Solver"
    };

    titleBox.innerText = operations[op] || "Enter Values";

    switch (op) {

        case "add":
        case "sub":
        case "mul":
        case "div":
            infoBox.innerText = "Enter two numbers";
            inputContainer.innerHTML = `
                <input id="a" class="mainInput" placeholder="Enter Number A">
                <input id="b" class="mainInput" placeholder="Enter Number B">
            `;
            break;

        case "power":
            infoBox.innerText = "Enter base and exponent";
            inputContainer.innerHTML = `
                <input id="a" class="mainInput" placeholder="Enter Base">
                <input id="b" class="mainInput" placeholder="Enter Exponent">
            `;
            break;

        case "sqrt":
            infoBox.innerText = "Enter a number";
            inputContainer.innerHTML = `
                <input id="a" class="mainInput" placeholder="Enter Number">
            `;
            break;

        case "prime":
            infoBox.innerText = "Enter a number to check";
            inputContainer.innerHTML = `
                <input id="a" class="mainInput" placeholder="Enter Number">
            `;
            break;

        case "stats":
        case "sort":
            infoBox.innerText = "Enter numbers separated by comma";
            inputContainer.innerHTML = `
                <input id="list" class="mainInput" placeholder="Example: 1,2,3,4">
            `;
            break;

        case "matrix":
            infoBox.innerText = "Enter matrices row by row (comma separated)";
            inputContainer.innerHTML = `
                <textarea id="a" class="mainInput" placeholder="Matrix A"></textarea>
                <textarea id="b" class="mainInput" placeholder="Matrix B"></textarea>
            `;
            break;

        case "det":
            infoBox.innerText = "Enter matrix values";
            inputContainer.innerHTML = `
                <textarea id="a" class="mainInput" placeholder="Matrix"></textarea>
            `;
            break;
        
        case "poly":
            infoBox.innerText = "Enter polynomial expression (example: 2x^2 + 3x + 1)";
            inputContainer.innerHTML = `
                <input id="a" class="mainInput" placeholder="Enter Polynomial">
            `;
            break;

            case "factor":
    infoBox.innerText = "Enter a number to calculate factorial";
    inputContainer.innerHTML = `
        <input id="a" type="number" class="mainInput" placeholder="Enter Number">
    `;
    break;

    case "equation":
    infoBox.innerText = "Enter equation to solve (example: 2x + 5 = 15)";
    inputContainer.innerHTML = `
        <input id="a" class="mainInput" placeholder="Enter Equation">
    `;
    break;


        default:
            infoBox.innerText = "Invalid operation selected";
            inputContainer.innerHTML = "<p>No inputs available</p>";
    }
}


    window.startCalculation = function(){

    const inputs = {};

    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const list = document.getElementById("list");

    if(a) inputs.a = a.value;
    if(b) inputs.b = b.value;
    if(list) inputs.list = list.value;

    // ⭐ SAVE FULL INPUT OBJECT
    if (inputs.a) localStorage.setItem("valueA", inputs.a);
    if (inputs.b) localStorage.setItem("valueB", inputs.b);
    if (inputs.list) localStorage.setItem("valueList", inputs.list);

    window.location.href="/calculation";
}

    

    /* ================= PAGE 6 ABOUT ================= */
    window.loadSystemInfo = function(s1, s2){

        const box1 = document.getElementById("about1");
        if(!box1) return;

        const SYSTEM_INFO = {
            arabic:"Decimal place value system. Fast & universal.",
            roman:"Ancient Roman numerals. Very slow calculations.",
            vedic:"Ancient Indian fast mental math.",
            chinese:"Rod numeral system.",
            greek:"Alphabet numerals.",
            egyptian:"Hieroglyphic numbers.",
            babylonian:"Base-60 number system.",
            modern:"Today's global math system."
        };

        document.getElementById("about1").innerText = SYSTEM_INFO[s1.toLowerCase()];
        document.getElementById("about2").innerText = SYSTEM_INFO[s2.toLowerCase()];
    }

});

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("steps1")) {
        startLiveCalculation();
    }
});


/* ===================================================== */
/* 🟢 DEMO MODE – FAKE CALCULATION ENGINE */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const perf = document.getElementById("performanceText");
    if(!perf) return; // run ONLY on page 5

    runDemoCalculation();
});

function runDemoCalculation(){

    const system1 = localStorage.getItem("system1");
    const system2 = localStorage.getItem("system2");
    const operation = localStorage.getItem("operation");

    const a = localStorage.getItem("valueA") || 12;
    const b = localStorage.getItem("valueB") || 8;

    const steps1Box = document.getElementById("steps1");
    const steps2Box = document.getElementById("steps2");
    const perf = document.getElementById("performanceText");

    perf.innerText = "Running calculation...";

    // Fake steps
    const vedicSteps = [
        "Choosing smart base near numbers",
        "Finding deviations from base",
        "Applying Vedic shortcut formula",
        "Mental math optimization",
        "Answer computed instantly ⚡"
    ];

    const normalSteps = [
        "Writing numbers vertically",
        "Performing step-by-step calculation",
        "Handling carry/borrow",
        "Computing final result",
        "Answer computed"
    ];

    // show steps slowly
    let i = 0;
    const interval = setInterval(()=>{

        if(i < vedicSteps.length){

            steps1Box.innerHTML += `<div class="step">${vedicSteps[i]}</div>`;
            steps2Box.innerHTML += `<div class="step">${normalSteps[i]}</div>`;
            perf.innerText = "Processing step " + (i+1);
            i++;

        } else {
            clearInterval(interval);
            finishDemoResult(system1, system2);
        }

    }, 800);
}

function finishDemoResult(system1, system2){

    const perf = document.getElementById("performanceText");

    // ⭐ VEDIC ALWAYS WINS
    const winner = "vedic";
    const percent = Math.floor(Math.random()*20) + 30; // 30–50%
    const time1 = (Math.random()*0.02 + 0.01).toFixed(4);
    const time2 = (Math.random()*0.05 + 0.05).toFixed(4);

    // Save result for next pages
    const resultData = {
        faster: winner,
        percent: percent,
        time1: time1,
        time2: time2
    };

    localStorage.setItem("finalResult", JSON.stringify(resultData));

    perf.innerHTML = `VEDIC ⚡ faster by ${percent}%`;

    // auto move to page 6
    document.getElementById("nextBtn").style.display = "block";

}

/* ===================================================== */
/* PAGE 6 AUTO LOAD SYSTEM INFO */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", function(){

    const aboutBox = document.getElementById("about1");
    if(!aboutBox) return;

    const s1 = localStorage.getItem("system1");
    const s2 = localStorage.getItem("system2");

    loadSystemInfo(s1, s2);

   
});
