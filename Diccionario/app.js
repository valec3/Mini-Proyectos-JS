const input = document.querySelector('#input-word');
const search = document.querySelector('.search');
const info = document.querySelector('.info');
const result = document.querySelector('.result');
const listSynonyms = document.querySelector('.list-synonyms');
const btnClose = document.querySelector('#btn-close');
const btnVoice = document.querySelector('.btn-voice');

let audio;
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

input.addEventListener('focus', () => {
	search.classList.add('active');
});

input.addEventListener('blur', () => {
	search.classList.remove('active');
});

btnClose.addEventListener('click', () => {
	result.style.display = 'none';
	info.style.display = 'block';
	input.value = '';
});

btnVoice.addEventListener('click', () => {
	audio.play();
});
function resolveData(data,w) {
	if (data.title === "No Definitions Found") {
		info.style.display = 'block';
		info.innerHTML = `Lo sentimos amigo, no pudimos encontrar definiciones para la palabra que estabas buscando.`;
		result.style.display = 'none';
		return;
	}
	result.style.display = 'block';
	info.style.display = 'none';

	document.querySelector('.word p').innerHTML = data[0].word;
	document.querySelector('.word span').innerHTML = `${data[0].meanings[0].partOfSpeech}${data[0].phonetics[1].text}`;
	document.querySelector('.meaning span').innerHTML = data[0].meanings[0].definitions[0].definition;
	audio = new Audio(data[0].phonetics[0].audio);


	listSynonyms.innerHTML = '';
	if(data[0].meanings[0].synonyms.length === 0) {
		let tagSpan = `<span>No hay sinonimos para la palabra <span>${w}</span></span>`;
		listSynonyms.insertAdjacentHTML('beforeend',tagSpan);
		return;
	}
	for(let i = 0;i < 5;i++){
		let tagSpan = `<span>${data[0].meanings[0].synonyms[i]},</span>`;
		listSynonyms.insertAdjacentHTML('beforeend',tagSpan);
	}
	
	console.log(audio);
}
function getData(w){
	info.innerHTML = `Buscando la palabra <span>${w}</span> ...`;
	fetch(API_URL + w)
		.then(response => response.json())
		.then(data => {
			resolveData(data,w);
		})
}

input.addEventListener('keyup', (e) => {
	if(e.key === 'Enter' && input.value !== '') {
		getData(input.value);
	}
});