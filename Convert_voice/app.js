let speech = new SpeechSynthesisUtterance();
const btnPlayVoice = document.querySelector("#btn-play-voice");
btnPlayVoice.addEventListener("click", () => {
    speech.text = document.querySelector("#text-to-voice").value;
    speech.volume = 2;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
});
const voiceSelect = document.querySelector("#type_voice");
let voicesList = [];
window.speechSynthesis.onvoiceschanged = () => {
    voicesList = window.speechSynthesis.getVoices();
    voicesList.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerHTML = voice.name;
        voiceSelect.appendChild(option);
    });
};
voiceSelect.addEventListener("change", () => {
    speech.voice = voicesList[voiceSelect.value];
});


// Add text to footer
const footer = document.querySelector('footer');
const dateYearToday = new Date().getFullYear();
const textFooter = `${dateYearToday} GitHub Valec3.`;
footer.innerHTML = textFooter;