let typingTestContainer = document.getElementById("typingTestContainer");
    let speedText = document.getElementById("speedText");
    let accuracyText = document.getElementById("accuracyText");
    let quoteDisplay = document.getElementById("quoteDisplay");
    let result = document.getElementById("result");
    let quoteInput = document.querySelector(".textarea-input");

    let submitBtn = document.getElementById("submitBtn");
    let resetBtn = document.getElementById("resetBtn");
    let startBtn = document.getElementById("startBtn");
    let spinner = document.getElementById("spinner");

    let displaySeconds = document.getElementById("secondsTime");
    let displayMinutes = document.getElementById("minutesTime");

    let typeTimer1 = document.getElementById("typeTimer1");
    let typeTimer2 = document.getElementById("typeTimer2");
    let typeTimer5 = document.getElementById("typeTimer5");

    let secondsTime = 0;
    let minutesTime = 0;
    let counter = 0;
    let seconds = 0;
    let minutes = 0;

    let correctCount = 0;
    let totalCount =0;
    let words = 0;
    let uniqueid;
    startBtn.onclick = function(){
        words = 0;
        correctCount = 0;
        totalCount = 0;
        minutes =0;
        seconds = 0;
        quoteInput.value = "";
        if(minutesTime === 0){
            alert("Select the minutes Timer");
        }
        
        uniqueid = setInterval(function(){
            if(secondsTime === 0 && minutesTime === 0){
                clearInterval(uniqueid);
                return;
            }
            if(secondsTime === 0 && minutesTime != 0){
                minutesTime = minutesTime - 1;
                displayMinutes.textContent = "0"+minutesTime
                secondsTime = 59;
                
            }
            else{
                secondsTime = secondsTime - 1;
            }
            
            
            if(secondsTime<10){
                displaySeconds.textContent = "0"+secondsTime;
            }else{
                displaySeconds.textContent = secondsTime;
            }
            
            seconds = seconds + 1;
            
            minutes = seconds/60 ;
           
            
            speedText.textContent = JSON.stringify( Math.ceil(words/minutes));
            if(totalCount>0){
                accuracyText.textContent = JSON.stringify(Math.ceil((correctCount/totalCount) *100));
            }
            
        },1000);
    }

    typeTimer1.onclick = ()=>{minutesTime = 1;displayMinutes.textContent = "0"+minutesTime;displaySeconds.textContent = "00";}
    typeTimer2.onclick = ()=>{minutesTime = 2;displayMinutes.textContent = "0"+minutesTime;displaySeconds.textContent = "00";}
    typeTimer5.onclick = ()=>{minutesTime = 5;displayMinutes.textContent = "0"+minutesTime;displaySeconds.textContent = "00";}

    
    
    
    function getthequotes(){
        clearInterval(uniqueid);
        result.textContent = ""
        speedText.textContent = "0";
        accuracyText.textContent = "0";
        displayMinutes.textContent = "00";
        displaySeconds.textContent = "00";
        minutes =0;
        seconds = 0;
        secondsTime = 0;
        minutesTime = 0;
        counter = 0;
        words = 0;
        correctCount = 0;
        totalCount = 0;

        quoteDisplay.classList.add("d-none");
        quoteDisplay.textContent = ""
        quoteInput.value ="";
        spinner.classList.remove("d-none");
        let url = "https:/apis.ccbp.in/random-quote";
        let options = {
            method:"GET"
        }
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            quoteDisplay.classList.remove("d-none");
            spinner.classList.add("d-none");
            
            
            const quote = jsonData.content;
            quote.split('').forEach((character)=>{
                const characterSpan = document.createElement('span');
                characterSpan.innerText = character ;
                quoteDisplay.appendChild(characterSpan);
            })
            quoteInputElement.value = null;
        })
        
    }
    getthequotes();
    resetBtn.addEventListener("click",getthequotes);
    function showResult(event){
        let typedText  = event.target.value;
        console.log(typedText);
        const arrayQuote = quoteDisplay.querySelectorAll('span');
        const arrayValue = quoteInput.value.split('');
        
        arrayQuote.forEach((characterSpan,index)=>{
            const character = arrayValue[index]
            
            if(character == null){
                characterSpan.classList.remove("correct");
                characterSpan.classList.remove("incorrect");

            }
            else if(character === characterSpan.innerText){
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
                correctCount = correctCount + 1 ;
                totalCount = totalCount + 1;

            }
            else{
                characterSpan.classList.remove('correct');
                correctCount = correctCount - 1;
                totalCount = totalCount + 1;
                characterSpan.classList.add('incorrect');
            }
        })
        
        if(typedText.slice(typedText.length-1,typedText.length) === " "){
            words = words+1;      
        }
    }
    quoteInput.addEventListener("input",showResult);

    
    function checkandgiveresult(){
        clearInterval(uniqueid);
        
    }
    submitBtn.addEventListener("click",checkandgiveresult)
