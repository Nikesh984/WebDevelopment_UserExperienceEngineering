console.log("login.js is running");

$(document).ready(() => {
    const emailInput = $('#emailInput');
    const usernameInput = $('#usernameInput');
    const passwordInput = $('#passwordInput');
    const confirmPasswordInput = $('#confirmPasswordInput');


    const emailError = $('#email-error');
    const usernameError = $('#username-error');
    const passwordError = $('#password-error');
    const confirmPasswordError = $('#confirmPassword-error');

    const usernameRegexPattern = "^[A-Za-z][A-Za-z0-9_]{7,29}$";
    const usernameRegex = new RegExp(usernameRegexPattern);

    const passwordRegexPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;
    const passwordRegex = new RegExp(passwordRegexPattern)

    const minLength = 4;
    const maxLength = 50;

    //GENERIC FUNCTION
    const validateInputs = (input, errorID, regex, min, max, message) => {
        if(input.val() === ''){
            errorID.text('Please enter the field').addClass('text-danger');
            return false;
        }
        else if(!input.val().match(regex)){
            errorID.text(message).addClass('text-danger');
            return false;
        }
        else if(input.val().length < min || input.val().length > max){
            errorID.text('Length should be between ${min} and ${max}').addClass('text-danger');
            return false;
        }
        else{
            errorID.text('').removeClass('text-danger');
            return true;
        }
        
        
    };

    emailInput.on("change", () => {
       emailValidity = validateInputs(emailInput, emailError, /^[a-zA-Z0-9._-]+@northeastern\.edu$/, minLength, maxLength, "Please use Northeastern email ID");
       console.log(emailValidity);
    });

    usernameInput.on("change", () => {
        usernameValidity = validateInputs(usernameInput, usernameError, usernameRegex, minLength, maxLength, "Please use a valid username");
    });


    passwordInput.on("change", () => {
        passwordValidity = validateInputs(passwordInput, passwordError, passwordRegex, minLength, maxLength, "Minimum eight characters, at least one letter, one number and one special character");
    });

    confirmPasswordInput.on("change", () =>{
        if(passwordInput.val() !== confirmPasswordInput.val()){
            confirmPasswordError.text('Passwords do not match').addClass('text-danger');
            confirmPasswordValidity = false;
        }
        else{
            confirmPasswordError.text('').removeClass('text-danger');
            confirmPasswordValidity = true;
        }
    });


    //ENABLE SUBMIT BUTTON
    $('input').on('change', ()=>{
        if(emailValidity  && usernameValidity && passwordValidity && confirmPasswordValidity){
            $("#btnSubmit").removeAttr('disabled');
            console.log('Enable executed');
        }
        else{
            $("#btnSubmit").prop("disabled", true);
        }
    })

    


    $('#login-form').on('submit', ()=>{
        
        event.preventDefault();

        window.location.href = "calculator.html";

        var Username = $('#usernameInput').val();
        localStorage.setItem("UserName", Username);

        $('#login-form').reset();
        
    });

});