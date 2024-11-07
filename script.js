document.addEventListener("DOMContentLoaded", () => {
    // Инициализируем flatpickr для поля даты с clickOpens: false
    var dateInput = flatpickr("#date-input", {
        locale: "en", // Устанавливаем английский язык для календаря
        dateFormat: "d/m/Y", // Формат отображения даты: день/месяц/год
        clickOpens: false, // Отключаем автоматическое открытие при клике
        onOpen: function () {
            // Плавно меняем placeholder на dd.mm.yyyy
            setTimeout(function () {
                document.getElementById('date-input').setAttribute('placeholder', 'dd/mm/yyyy');
            }, 100);
        },
        onClose: function () {
            // Плавно меняем placeholder обратно на Start Date, если поле не заполнено
            if (!document.getElementById('date-input').value) {
                setTimeout(function () {
                    document.getElementById('date-input').setAttribute('placeholder', 'Start Date');
                }, 100);
            }
        }
    });

    // Добавляем обработчик клика для поля даты
    document.getElementById("date-input").addEventListener("click", function() {
        // Закрываем календарь, если он открыт, или открываем его
        if (dateInput.isOpen) {
            dateInput.close();
        } else {
            dateInput.open();
        }
    });

    // Добавляем обработку для Job Source (если требуется)
    const jobSourceInput = document.querySelector('.job-source-input');
    jobSourceInput.addEventListener('change', function(e) {
        console.log('Job source selected: ' + e.target.value); // Логируем выбранный источник работы
    });

    // Валидация полей для имени и фамилии
    const nameInputs = document.querySelectorAll('.name-input');
    nameInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            // Убираем все символы, кроме букв
            e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
        });
    });

    // Валидация для поля Phone
    const phoneInput = document.querySelector('.phone-input');
    phoneInput.addEventListener('focus', function (e) {
        // Если поле пустое и в нем нет знака "+", добавляем "+"
        if (e.target.value === "") {
            e.target.value = "+";
        }
    });
    phoneInput.addEventListener('input', function (e) {
        // Если поле начинается с "+" и после него нет цифр, то не добавляем знак "+"
        if (e.target.value !== "+" && !e.target.value.match(/^[\d]*$/)) {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Убираем все, кроме цифр
        }
        // Если знак "+" отсутствует, добавляем его в начале
        if (e.target.value !== "+" && !e.target.value.startsWith("+")) {
            e.target.value = "+" + e.target.value;
        }
    });
    phoneInput.addEventListener('blur', function (e) {
        // Убираем знак "+" если после него не ввели цифры
        if (e.target.value === "+" || e.target.value === "") {
            e.target.value = "";
        }
    });

    // Валидация для поля Email (optional)
    const emailInput = document.querySelector('.email-input');
    emailInput.addEventListener('keypress', function (e) {
        // Разрешаем только латинские буквы, цифры, нижнее подчеркивание, точку и @
        const allowedChars = /^[A-Za-z0-9@._]$/;
        // Если символ не разрешен, предотвращаем ввод
        if (!allowedChars.test(e.key)) {
            e.preventDefault();
        }
    });
    emailInput.addEventListener('input', function (e) {
        const value = e.target.value;
        // Проверка на количество символов @
        const atCount = (value.match(/@/g) || []).length;
        // Если количество символов @ больше одного, блокируем ввод
        if (atCount > 1) {
            e.target.value = value.replace('@', ''); // Удаляем последний введенный символ @
        }
        // Получаем локальную часть до символа @
        const localPart = value.split('@')[0];
        // Если локальная часть меньше 1 или больше 64 символов, блокируем ввод @
        if (localPart.length < 1 || localPart.length > 64) {
            e.target.value = value.replace('@', ''); // Удаляем @, если его ввели при неверной длине локальной части
        }
    });

    // Валидация для поля Address
    const addressInput = document.querySelector('.address-input');
    addressInput.addEventListener('input', function (e) {
        // Разрешаем только латинские буквы, цифры, запятые и точки
        e.target.value = e.target.value.replace(/[^A-Za-z0-9,.\s]/g, '');
    });

    // Валидация для поля City
    const CityInput = document.querySelector('.city-input');
    CityInput.addEventListener('input', function (e) {
        // Разрешаем только латинские буквы, цифры, запятые и точки
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    });

    // Валидация для поля State
    const StateInput = document.querySelector('.state-input');
    StateInput.addEventListener('input', function (e) {
        // Разрешаем только латинские буквы, цифры, запятые и точки
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    });

    // Валидация для поля Zip code (разрешаем только цифры)
    const zipCodeInput = document.querySelector('.zip-code-input');
    zipCodeInput.addEventListener('input', function (e) {
        // Оставляем только цифры
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Валидация для поля Area code
    const AreaInput = document.querySelector('.area-input');
    AreaInput.addEventListener('input', function (e) {
        // Оставляем только буквы
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    });
});