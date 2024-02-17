const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const prtResult = document.querySelector(".info");
const mode = document.querySelector(".mode");
const form = document.querySelector("form");
const body= document.querySelector("body");


for (let select of dropdowns){     
    for (currCode in countryList){
       let newOpt = document.createElement("option");
       newOpt.innerText = currCode;
       newOpt.value = countryList[currCode];
       if (select.name==="from" && currCode==="INR") {
               newOpt.selected = "selected";
       }

       if (select.name==="to" && currCode==="USD") {
               newOpt.selected = "selected";
       }
       select.append(newOpt);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });
}

const updateFlag=(element)=>{
    console.log(element);
    let countryCode = element.value;
    let currCode = element.innerText;
    let newSrc= `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    element.selected= "selected";
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".input input");
    let amtVal = amount.value;
    if (amtVal === ""  || amtVal<0) {
        amtVal = 1;
        amount.value="1";
    }
    
    let from= fromCurr.options[fromCurr.selectedIndex].innerText;
    let to = toCurr.options[toCurr.selectedIndex].innerText;
    console.log (from, to);
    const URL = `${BASE_URL}/${from.toLowerCase()}/${to.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data= await response.json();
    let rate= data[to.toLowerCase()];
    console.log(rate);
    
    let res= Math.floor((amtVal*rate)*100000)/100000;
    let result = `${amtVal} ${from} = ${res} ${to}`;
    prtResult.innerText=result ;
});

let currMode="light";

mode.addEventListener("click",(evt)=>{
    if (currMode==="light") {
        currMode = "dark";
        evt.preventDefault();
        form.setAttribute("class","darkmode");
        body.style.backgroundColor="black";
        body.style.color="white";
        btn.style.color ="rgb(228, 211, 211)";
        mode.style.color ="rgb(228, 211, 211)";
    }
    else {
        evt.preventDefault();
        form.removeAttribute("class","darkmode");
        body.style.backgroundColor="whitesmoke";
        body.style.color="black";
        currMode="light";
        btn.style.color ="white";
        mode.style.color = "white";
    }
});