let passwordLength = 10;
let password = "";

let slider = document.querySelector('.slider');
let display = document.querySelector('.length');
let indicator = document.querySelector('.indicator');
let uppercase = document.querySelector('#uppercase');
let lowercase = document.querySelector('#lowercase');
let numbers = document.querySelector('#numbers');
let symbols = document.querySelector('#symbols');
let button = document.querySelector('.copybtn');
let msg = document.querySelector('.msg');
let generate = document.querySelector('.btn');
let str = "~!@#$%^&*()_-+*/?.>,<;:`[]{}|";
let content = document.querySelector('.input-container input');

changeLength();

slider.addEventListener('input', (evt) => {
    passwordLength = evt.target.value;
    changeLength();
})

function changeLength(){
    display.innerText = passwordLength;
    slider.style.backgroundSize = (passwordLength - slider.min)/(slider.max - slider.min) * 100 + '% 100%';
}

function setColor(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 25px 0px ${color}`;
}

function strength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hassym = false;

    if(uppercase.checked){
        hasUpper = true;
    }
    if(lowercase.checked){
        hasLower = true;
    }
    if(numbers.checked){
        hasNum = true;
    }
    if(symbols.checked){
        hassym = true;
    }

    if(hasUpper && hasLower && (hasNum || hassym) && passwordLength >= 6){
        setColor('#6BF216');
    }

    else if((hasUpper || hasLower) && (hasNum || hassym) && passwordLength >= 6)  setColor('#FFF04D');

    else setColor('#ED0800');
}

button.addEventListener('click', copy);

async function copy(){
    try{
        await navigator.clipboard.writeText(password);
        msg.innerText = 'Copied';
    }
    catch(e){
        console.log(e);
        msg.innerText = 'Failed';
    }
    msg.classList.add('active');
    console.log(msg.classList);
    setTimeout(() => {
        msg.classList.remove('active');
    }, 2000);
}

generate.addEventListener('click', generatePassword);
let checkCount = 0;

function generateRndNumber(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateUpperCase(){
    return String.fromCharCode(generateRndNumber(67, 91));
}

function generateLowerCase(){
    return String.fromCharCode(generateRndNumber(97, 123));
}

function generateNumber(){
    return generateRndNumber(0, 10);
}

function generateSymbol(){
    let index = generateRndNumber(0, str.length);
    return str[index];
}

function generatePassword(){
    checkCount = 0;
    let func = [];
    if(uppercase.checked){
        checkCount++;
        func.push(generateUpperCase);
    }
    if(lowercase.checked){
        checkCount++;
        func.push(generateLowerCase);
    }
    if(numbers.checked){
        checkCount++;
        func.push(generateNumber);
    }
    if(symbols.checked){
        checkCount++;
        func.push(generateSymbol);
    }

    if(checkCount == 0){
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        slider.value = checkCount;
        changeLength();
    }

    password = "";
    for(let i=0; i<checkCount; i++){
        password += func[i]();
    }

    for(let i=0; i<passwordLength-checkCount; i++){
        let index = generateRndNumber(0, checkCount);
        password += func[index]();
    }

    password = shufflePassword(Array.from(password));
    content.value = password;
    
    strength();
}

function shufflePassword(array){
    for(let i=0; i<passwordLength; i++){
        let index = generateRndNumber(0, passwordLength);
        const temp = array[index];
        array[index] = array[i];
        array[i] = temp;
    }
    let str = "";
    for(let key of array){
        str += key;
    }

    return str;
}