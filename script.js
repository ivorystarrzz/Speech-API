const msgEL = document.getElementById('msg')

const randomNum = getRandomNumber();

console.log('Number:', randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition

//start recognition and game
recognition.start()

//capture user speak
function onSpeak(e){
    const msg = e.results[0][0].transcript;

    writeMessgae(msg);
    checkNumber(msg);
}


//Write what user speaks
function writeMessgae(msg){
    msgEL.innerHTML = `
    <div>You said: </div>
    <span class='box'>${msg}</span>`;
}

//Check msg against number
function checkNumber(msg){
    const num = +msg;

    //check if valid number
    if(Number.isNaN(num)){
        msgEL.innerHTML += '<div>That is not a valid Number</div>';
        return;
    }

    //check in range
    if(num > 100 || num < 1){
        msgEL.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    //check number
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Correct! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class='play-again' id='play-again'>Play Again</button>`;
    } else if (num > randomNum){
        msgEL.innerHTML += '<div>Too High!</div>';
    }else {
        msgEL.innerHTML += '<div>Too Low!</div>'
    }
}

//Generate random number
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

//Speak result
recognition.addEventListener('result', onSpeak)

//END SR service
recognition.addEventListener('end', () => recognition.start());


document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});