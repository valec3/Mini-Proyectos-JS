const timeRef = document.querySelector('.timer_display');
const hourInput = document.querySelector('#hour_input');
const minuteInput = document.querySelector('#minute_input');
const activeAlarms = document.querySelector('.active_alarms');
const btnSetAlarm = document.querySelector('#btn_set_alarm'); 


let alarms = [];
const alarmSound = new Audio('alarm.mp3');

let initialHour = 0,
	initialMinute = 0,
	alarmIndex = 0;

const appendZero = (num) => {
	if (num < 10) {
		return `0${num}`;
	}
	return num;
}

const searchAlarm = (hour, minute) => {
	alarms.forEach((alarm, index) => {
		if (alarm.hour === hour && alarm.minute === minute) {
			alarmIndex = index;
			return true;
		}
	});
}

const displayTimeCurrent = () => {
	const date = new Date();
	const [hour,minute,second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
	timeRef.innerHTML = `${appendZero(hour)}:${appendZero(minute)}:${appendZero(second)}`;

}
const checkAlarms = () => {
	alarms.forEach((alarm, index) => {
		if (alarm.hour === hour && alarm.minute === minute) {
			alarmSound.play();
			alarmSound.loop = true;
		}
	})
}

const inputCheck = (value) => {
	const inputValue = parseInt(value);
	if (isNaN(inputValue)) {
		return '00';
	}

	if (inputValue < 10){
		return `0${inputValue}`;
	}
	if (inputValue > 59) {
		return '59';
	}
	return inputValue.toString();
}
const createAlarmHTML = (alarm) => {
	const {id, hour, minute} = alarm;
	const alarmBody = document.createElement('DIV');
	const alarmTime = document.createElement('P');
	alarmTime.innerHTML = `${hour}:${minute}`;
	alarmBody.classList.add('alarm');
	alarmBody.setAttribute('alarm-id', id);
	alarmBody.appendChild(alarmTime);

	let checkbox = document.createElement('INPUT');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.classList.add('checkbox');
	checkbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			starAlarm(e);
		}else {
			stopAlarm(e);
		}
	})
	alarmBody.appendChild(checkbox);

	let btnDelete = document.createElement('BUTTON');
	let iconDelete = document.createElement('I');
	iconDelete.classList.add('fa', 'fa-trash-can', 'fa-lg');
	btnDelete.appendChild(iconDelete);
	btnDelete.classList.add('btn_delete');
	btnDelete.addEventListener('click', (e) => {
		deleteAlarm(e);
	})

	alarmBody.appendChild(btnDelete);
	activeAlarms.appendChild(alarmBody);
}


// Event Listeners
btnSetAlarm.addEventListener('click', (e) => {
	const hour = hourInput.value;
	const minute = minuteInput.value;
	if (hour === '' || minute === '') {
		return;
	}
	const alarm = {
		id: alarms.length,
		hour,
		minute,
		isActive: false,
		time: `${hour}:${minute}`
	}
	alarms.push(alarm);
	createAlarmHTML(alarm);
	hourInput.value = '';
	minuteInput.value = '';
	console.log(alarms);
})

hourInput.addEventListener('change', (e) => {
	hourInput.value = inputCheck(hourInput.value);
})
minuteInput.addEventListener('change', (e) => {
	minuteInput.value = inputCheck(minuteInput.value);
});

window.onload = () => {
	setInterval(displayTimeCurrent, 1000);
	initialHour = 0;
	initialMinute = 0;
	alarmIndex = 0;
	alarms = [];
	// hourInput.value = appendZero(initialHour);
	// minuteInput.value = appendZero(initialMinute);
}