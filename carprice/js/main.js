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

            this.requiredInputs.forEach(input => {
                input.addEventListener('change', () => {
                    this.inputStatus(input);
                });
            })
        }

        validation = function (event) {
            var checkedInputs = 0;
            this.requiredInputs.forEach(input => {
                var res = this.inputStatus(input);
                checkedInputs+=res;
            });
            if (checkedInputs < this.requiredInputs.length){
                event.preventDefault();
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
                } else if (validity == 'invalidNumber'){
                    errorMessage.innerText = "Укажите, пожалуйста, корректный номер телефона";
                } else if (validity == 'invalidEmail'){
                    errorMessage.innerText = "Укажите, пожалуйста, корректный email";
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