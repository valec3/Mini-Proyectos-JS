const btnConvert	= document.getElementById('btn-convert');
const dropLists 	= document.querySelectorAll('.drop-list select');
const API_URL		= 'https://api.exchangerate-api.com/v4/latest/';
const API_KEY		= "b7bf03e73163b4b424beb2597aee054c";
const exchangeIconReverse = document.querySelector('#reverse-exchange');

for (const country in country_list) {
	const optionList = document.createElement('option');
	optionList.value = country;
	optionList.textContent = country;

	const dropList1Option = optionList.cloneNode(true); // Clonar para el primer select
    dropLists[0].appendChild(dropList1Option);
	
    const dropList2Option = optionList.cloneNode(true); // Clonar para el segundo select
	dropList2Option.selected = country === 'PEN'; // Seleccionar por defecto el PEN
    dropLists[1].appendChild(dropList2Option);
}

async function fetchExchangeRate(fromCurrency, toCurrency = 0) {
    try {
        const res = await fetch(`${API_URL}${fromCurrency.value}`);
        const data = await res.json();
        return data.rates[toCurrency.value];
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}
async function getExchangeRate(){
	const amount = document.getElementById('amount');
	const amountNumber = amount.value === "" ? 1 : parseInt(amount.value);
	amount.value = amountNumber;
	const resultFetch = await fetchExchangeRate(dropLists[0], dropLists[1]);
	const result = amountNumber * resultFetch;
	const exchangeRate = document.querySelector('.exchange-rate');
	exchangeRate.textContent = `${amountNumber} ${dropLists[0].value} = ${result} ${dropLists[1].value}`;
}
function handlerConvert(e){
	e.preventDefault();
	getExchangeRate();
}
function changeFlag(target) {
    const img = target.parentElement.querySelector(".imgFlag"); // Cambiado e.target por e.target.parentElement
    img.src = `https://flagsapi.com/${country_list[target.value]}/flat/64.png`;
    getExchangeRate();
}
function reverseExchange(){
	let tempCode = dropLists[0].value;
	dropLists[0].value = dropLists[1].value;
	dropLists[1].value = tempCode;
	changeFlag(dropLists[0]);
	changeFlag(dropLists[1]);
	getExchangeRate();
}

window.addEventListener('load',() =>{
	getExchangeRate();
});
btnConvert.addEventListener('click', handlerConvert);
dropLists.forEach(dropList => dropList.addEventListener('change', (e)=>{changeFlag(e.target)}));
exchangeIconReverse.addEventListener('click', reverseExchange);