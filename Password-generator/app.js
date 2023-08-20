const contentPassword = document.getElementById('content-pass');
const lengthPassword = document.getElementById('input-pass-length');
const options = document.querySelectorAll('.option input');
const btnGeneratePassword = document.getElementById('btn-generate-password');
const passIndicator = document.getElementById('pass-indicator');
const btnCopy= document.querySelector('.btn-copy');


const characterAlternatives = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    spaces: "   ",
    duplicate: ""
}

const updateIndicator = () => {
    const security = contentPassword.value.length < 8 ? 'low' : contentPassword.value.length < 16 ? 'medium' : 'high';
    passIndicator.id = security;
}

const updateSliderText = () => {
    const sliderText = document.getElementById('slider-text');
    sliderText.textContent = lengthPassword.value;
    generatePassword();
}
const generatePassword = () => {
    let passOptions = "",
        randomPass = "",
        excludeDuplicate = false,
        optionsSelected = 0;
    const passLength = parseInt(lengthPassword.value);
    updateIndicator();
    options.forEach(option => {
        if (option.checked) {
            if(option.id === 'duplicate') excludeDuplicate = true;
            passOptions += characterAlternatives[option.id];
            optionsSelected++;
        }

    });
    if (passOptions === "") {
        contentPassword.value = "";
        return;
    }
    let pasos = 0;
    while (randomPass.length < passLength) {
        console.log(pasos);
        let characterRandomPass = passOptions.charAt(Math.floor(Math.random() * passOptions.length));
        if(excludeDuplicate) {
            if(randomPass.includes(characterRandomPass)) continue;
        }
        randomPass += characterRandomPass;
        pasos++;
        if(pasos > 1000) break;
    }
    contentPassword.value = randomPass;
    
}
const copyPassword = async() => {
    try {
        await navigator.clipboard.writeText(contentPassword.value);
    } catch (error) {
    }
}
lengthPassword.addEventListener('input', updateSliderText);
btnGeneratePassword.addEventListener('click', generatePassword)
btnCopy.addEventListener('click', copyPassword)