window.addEventListener('load', function(){
    var forms = document.querySelectorAll('form');

    class Form{
        constructor(formElement){
            this.self = formElement;
            this.requiredInputs = this.self.querySelectorAll('input[data-required], select[data-required]');
            this.wrapper = this.self.querySelector('.form');

            this.self.addEventListener('submit', (event) => {
                this.validation(event);
            });

            // this.requiredInputs.forEach(input => {
            //     input.addEventListener('input', () => {
            //         this.inputStatus(input);
            //     });
            // })
        }

        validation = function (event) {
            this.errorInvalidData = 0;
            this.errorInvalidTel = 0;
            this.errorInvalidEmail = 0;
            var checkedInputs = 0;
            this.requiredInputs.forEach(input => {
                var res = this.inputStatus(input);
                checkedInputs+=res;
            });
            if (checkedInputs < this.requiredInputs.length){
                event.preventDefault();
                var existingErrorBox = this.self.querySelector('.alert-box');
                if (existingErrorBox != undefined){
                    existingErrorBox.parentElement.removeChild(existingErrorBox);
                    console.log(existingErrorBox);
                }
                var errorBox = document.createElement('div');
                errorBox.classList.add('alert-box');
                this.wrapper.appendChild(errorBox);
                if (this.errorInvalidData == 1){
                    var message = document.createElement('div');
                    message.classList.add('alert-box-item');
                    message.innerHTML = "Пожалуйста, заполните все обязательные поля";
                    errorBox.appendChild(message);
                } 
                if (this.errorInvalidTel == 1){
                    var message = document.createElement('div');
                    message.classList.add('alert-box-item');
                    message.innerHTML = "Укажите, пожалуйста, корректный номер телефона";
                    errorBox.appendChild(message);
                }
                if (this.errorInvalidEmail == 1){
                    var message = document.createElement('div');
                    message.classList.add('alert-box-item');
                    message.innerHTML = "Укажите, пожалуйста, корректный email";
                    errorBox.appendChild(message);
                }
            } else {
                var successMessage = document.createElement('div');
                successMessage.classList.add('success');
                successMessage.innerText = "Спасибо! Данные успешно отправлены.";
                this.self.appendChild(successMessage);
                this.wrapper.style = "display: none";
            }
        };

        inputStatus = function(input){
            var validity = false;
            if (input.type == 'tel' && isNaN(input.value)){
                validity = 'invalidNumber'
            } else if (input.type == 'email' && input.value.length > 0){
                var re = /\S+@\S+\.\S+/;
                if (re.test(input.value)){
                    validity = true;
                } else {
                    validity = 'invalidEmail';
                }
            } else if (input.value.length > 0){
                validity = true;
            }
            input.classList.remove('error');
            var error = input.parentElement.querySelector('.alert');
            if (error != undefined) {
                input.parentElement.removeChild(error);
            }
            if (validity != true){
                var errorMessage = document.createElement('div');
                errorMessage.classList.add('alert');
                input.classList.add('error');
                if (validity == false){
                    errorMessage.innerText = "Пожалуйста, заполните все обязательные поля";
                    this.errorInvalidData = 1;
                } else if (validity == 'invalidNumber'){
                    errorMessage.innerText = "Укажите, пожалуйста, корректный номер телефона";
                    this.errorInvalidTel = 1;
                } else if (validity == 'invalidEmail'){
                    errorMessage.innerText = "Укажите, пожалуйста, корректный email";
                    this.errorInvalidEmail = 1;
                }
                input.parentElement.appendChild(errorMessage);
                return 0;
            } else {
                return 1;
            }
        }
    }

    forms.forEach(formElement => {
        new Form(formElement);
    });
});