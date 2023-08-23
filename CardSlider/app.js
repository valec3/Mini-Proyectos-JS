const app = document.querySelector('.app'),
	carousel = app.querySelector('.carousel'),
	images = carousel.querySelectorAll('.carousel img'),
	buttons = app.querySelectorAll('.btn');

let imageIndex = 0,
	intervalId;

const autoSlide = () => {
	intervalId = setInterval(() => {
		slideImage(++imageIndex);
	}, 2000);
}
const slideImage = () => {
	if (imageIndex === images.length) {
		imageIndex = 0;
	} else if (imageIndex < 0) {
		imageIndex = images.length - 1;
	}
	carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
	console.log(imageIndex);
};

document.addEventListener('DOMContentLoaded', () => {
	autoSlide();
});

app.addEventListener('mouseover', () => clearInterval(intervalId));
app.addEventListener('mouseout', () => autoSlide());

buttons.forEach(button => {
	button.addEventListener('click', () => {
		imageIndex = button.id === 'prev' ? --imageIndex : ++imageIndex;
		slideImage()
	});
});