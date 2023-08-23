const form = document.querySelector('form'),
    emailField = form.querySelector('.email-field'),
    emailInput = emailField.querySelector('input'),
    passField = form.querySelector('.pass-create'),
    passInput = passField.querySelector('input'),
    cPassField = form.querySelector('.confirm-pass'),
    cPassInput = cPassField.querySelector('input');

// Validate Email
function checkEmail(){
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!RegExp(emailPattern).exec(emailInput.value)){
        emailField.classList.add('invalid');
        return;
    }
    emailField.classList.remove('invalid');
}
function createPass(){
    const passPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!RegExp(passPattern).exec(passInput.value)){
        passField.classList.add('invalid');
        return;
    }
    passField.classList.remove('invalid');
}
function confirmPass(){
    if(passInput.value !== cPassInput.value){
        cPassField.classList.add('invalid');
        return;
    }
    cPassField.classList.remove('invalid');
}
const eyesIcon = document.querySelectorAll('.show-hide');
eyesIcon.forEach(eye => {
    eye.addEventListener('click', function(){
        const passField = this.parentElement.querySelector('input');
        if(passField.type === 'password'){
            passField.type = 'text';
            eye.classList.replace('fa-eye-slash',"fa-eye");
            return;
        }
        passField.type = 'password';
        eye.classList.replace('fa-eye','fa-eye-slash');
    });
});
function validateForm(){
    if(emailField.classList.contains('invalid') || 
    passField.classList.contains('invalid') || 
    cPassField.classList.contains('invalid')){
        return false;
    }
    return true;
};
form.addEventListener('submit', function(e){
    // form submit event
    e.preventDefault(); // preventing from form submitting
    checkEmail();
    createPass();
    confirmPass();
    emailInput.addEventListener('keyup', ()=>checkEmail());
    passInput.addEventListener('keyup', ()=>createPass());
    cPassInput.addEventListener('keyup', ()=>confirmPass());
    if(validateForm()){
        location.href = form.getAttribute('action');
    }
}); 