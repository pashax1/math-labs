document.addEventListener("DOMContentLoaded", function () {

/* ---------------- PAGE 1 QUOTES ---------------- */
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

/* ---------------- PAGE 2 SYSTEM SELECTION ---------------- */
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
    btn.classList.toggle("active", selectedSystems.length === 2);
}

window.goNext = function(){
    localStorage.setItem("system1", selectedSystems[0]);
    localStorage.setItem("system2", selectedSystems[1]);
    window.location.href = "/operations";
}

/* ---------------- PAGE 3 OPERATION SELECT ---------------- */
window.selectOperation = function(op){
    localStorage.setItem("operation", op);
    window.location.href = "/inputs";
}

/* -------- PAGE 4 INPUTS -------- */
window.startCalculation = function(){
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const list = document.getElementById("list");

    if(a) localStorage.setItem("valueA", a.value);
    if(b) localStorage.setItem("valueB", b.value);
    if(list) localStorage.setItem("valueList", list.value);

    window.location.href="/calculation";
}

/* ===== PAGE 5 CALCULATION PAGE DETECTOR ===== */

document.addEventListener("DOMContentLoaded", function(){

    const perf = document.getElementById("performanceText");
    if(!perf) return; // <-- page5 not loaded, STOP script

    runRealCalculation(); // run only on page5
});

async function runRealCalculation(){

    try{

        const system1 = localStorage.getItem("system1");
        const system2 = localStorage.getItem("system2");
        const operation = localStorage.getItem("operation");
        const inputs = JSON.parse(localStorage.getItem("inputs"));

        const perf = document.getElementById("performanceText");
        perf.innerText = "Running real benchmark...";

        const res = await fetch("/api/calculate",{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({
                system1: system1,
                system2: system2,
                operation: operation,
                inputs: inputs
            })
        });

        const data = await res.json();

        // SAVE RESULT FOR PAGE7
        localStorage.setItem("finalResult", JSON.stringify(data));

        perf.innerText = "Calculation completed! Redirecting...";

        // go to about page automatically
        setTimeout(()=> window.location.href="/about",1500);

    }catch(err){
        console.error(err);
        document.getElementById("performanceText").innerText =
            "Error running calculation. Check console.";
    }
}

}); // END DOMContentLoaded SAFE BLOCK

/* ===== MANUAL BUTTON (PAGE5) ===== */
window.manualGoAbout = function(){
    window.location.href = "/about";
}

/* ===================================================== */
/* ================= PAGE 5 CALCULATION ================= */
/* ===================================================== */

async function runRealCalculation(){

    const perf = document.getElementById("performanceText");
    if(!perf) return;   // ⭐ SAFETY CHECK (prevents page6 crash)

    const system1 = localStorage.getItem("system1").toLowerCase();
    const system2 = localStorage.getItem("system2").toLowerCase();
    const operation = localStorage.getItem("operation");

    const a = localStorage.getItem("valueA") || 12;
    const b = localStorage.getItem("valueB") || 8;

    perf.innerText = "Running real benchmark on Python engine...";

    const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system1, system2, operation, a, b })
    });

    const result = await response.json();

    document.getElementById("time1").innerText =
        `${system1.toUpperCase()} : ${result.system1_time} sec`;

    document.getElementById("time2").innerText =
        `${system2.toUpperCase()} : ${result.system2_time} sec`;

    perf.innerText = `${result.faster.toUpperCase()} is faster by ${result.percent}%`;
}

/* Run ONLY on page 5 */
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("time1")) {
        runRealCalculation();
    }
});


/* ===== PAGE 5 LIVE STEPS ===== */
window.startLiveCalculation = async function(){

    const steps1Box = document.getElementById("steps1");
    if(!steps1Box) return;  // ⭐ prevents running on other pages

    const sys1 = localStorage.getItem("system1");
    const sys2 = localStorage.getItem("system2");
    const op   = localStorage.getItem("operation");
    const perfBox = document.getElementById("performanceText");

    perfBox.innerText = "Running real benchmark...";

    const res = await fetch("/api/calculate",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ system1: sys1, system2: sys2, operation: op })
    });

    const data = await res.json();

    data.steps1.forEach(s=>{
        steps1Box.innerHTML += `<div class="step">${s}</div>`;
    });

    data.steps2.forEach(s=>{
        document.getElementById("steps2").innerHTML += `<div class="step">${s}</div>`;
    });

        // show performance text
    perfBox.innerHTML =
        `${data.faster.toUpperCase()} ⚡ faster by ${data.percent}%`;

    /* ⭐⭐⭐ SAVE RESULT FOR PAGE 7 ⭐⭐⭐ */
    localStorage.setItem("winner", data.faster);
    localStorage.setItem("percent", data.percent);
    localStorage.setItem("time1", data.time1);
    localStorage.setItem("time2", data.time2);
}



/* ===================================================== */
/* ================= PAGE 6 ABOUT SYSTEMS =============== */
/* ===================================================== */

const SYSTEM_INFO = {
    arabic:{text:"Decimal place value system.",pros:"Fast & universal.",cons:"None"},
    babylonian:{text:"Ancient base-60 system.",pros:"Great for fractions.",cons:"Hard to learn"},
    roman:{text:"Roman numeral system.",pros:"Good for labeling.",cons:"Slow calculations"},
    egyptian:{text:"Hieroglyphic numbers.",pros:"Simple idea.",cons:"Very long math"},
    greek:{text:"Alphabet numerals.",pros:"Used in early science.",cons:"Not calc friendly"},
    vedic:{text:"Indian mental math.",pros:"Extremely fast.",cons:"Hard to master"},
    chinese:{text:"Rod numerals.",pros:"Logical system.",cons:"Not global"},
    modern:{text:"Global math system.",pros:"Best performance.",cons:"None"}
};

window.loadSystemInfo = function(s1, s2){
    const box1 = document.getElementById("about1");
    if(!box1) return;  // ⭐ prevents crash on other pages

    const box2 = document.getElementById("about2");

    box1.innerHTML = formatSystemInfo(SYSTEM_INFO[s1.toLowerCase()]);
    box2.innerHTML = formatSystemInfo(SYSTEM_INFO[s2.toLowerCase()]);
}

function formatSystemInfo(sys){
    return `
        <p>${sys.text}</p>
        <br><b>Advantages:</b><br>${sys.pros}
        <br><br><b>Disadvantages:</b><br>${sys.cons}
    `;
}
