const contentPassword = document.getElementById('content-pass');
const lengthPassword = document.getElementById('input-pass-length');
const options = document.querySelectorAll('.option input');
const btnGeneratePassword = document.getElementById('btn-generate-password');
const passIndicator = document.getElementById('pass-indicator');


const characterAlternatives = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    spaces: "   ",
    duplicate: ""
}

const updateSliderText = () => {
    const sliderText = document.getElementById('slider-text');
    sliderText.textContent = lengthPassword.value;
    generatePassword();
}
const generatePassword = () => {
    let passOptions = "",
        randomPass = "",
        excludeDuplicate = false;
    const passLength = parseInt(lengthPassword.value);

    options.forEach(option => {
        if (option.checked) {
            if(option.id === 'duplicate') excludeDuplicate = true;
            passOptions += characterAlternatives[option.id];
        }
    });
    while (randomPass.length < passLength) {
        let characterRandomPass = passOptions.charAt(Math.floor(Math.random() * passOptions.length));
        if(excludeDuplicate) {
            if(randomPass.includes(characterRandomPass)) continue;
        }
        randomPass += characterRandomPass;
    }
    contentPassword.value = randomPass;
    updateIndicator();
}
lengthPassword.addEventListener('input', updateSliderText);
btnGeneratePassword.addEventListener('click', generatePassword)