(function () {
    const form = document.getElementById('sheetdb-form'),
        firstName = document.getElementById('imie'),
        surname = document.getElementById('nazwisko'),
        mail = document.getElementById('mail'),
        remail = document.getElementById('remail'),
        birthDate = document.getElementById('data'),
        town = document.getElementById('miasto'),
        loader = document.getElementById('loader');

    let errorElement = document.querySelector('.errors')

    function errorHandler(element) {
        element.style.setProperty('color', 'rgb(255, 100, 100)')
    }

    if (form) {
        form.addEventListener('submit', e => {

            let messages = [];
            [firstName, surname, mail, remail, birthDate, town].forEach(e => {
                e.style.setProperty('color', 'black')
            });

            if (firstName.value === '' || firstName.value == null || !firstName.value.match(/^[a-zA-ZśàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
                messages.push('Niepoprawna wartość pola "Imię"')
                errorHandler(firstName)
            }

            if (surname.value === '' || surname.value == null || !surname.value.match(/^[a-zA-ZśàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
                messages.push('Niepoprawna wartość pola "Nazwisko"')
                errorHandler(surname)
            }

            if (!mail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                messages.push('Niepoprawna wartość pola "E-mail"')
                errorHandler(mail)
            }

            if (mail.value !== remail.value) {
                messages.push('Podane adresy e-mail się nie zgadzają')
                errorHandler(mail)
                errorHandler(remail)
            }

            if (!birthDate.value.match(/([12]\d{3}[./-](0[1-9]|1[0-2])[./-](0[1-9]|[12]\d|3[01]))/)) {
                messages.push('Niepoprawna wartość pola "Data urodzenia"')
                errorHandler(birthDate)
            }


            if (town.value === '' || town.value == null || !town.value.match(/^[a-zA-ZśàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
                messages.push('Niepoprawna wartość pola "Miasto"')
                errorHandler(town)
            }

            if (messages.length > 0) {
                e.preventDefault()
                errorElement.innerText = messages.join('\n')
                errorElement.style.display == 'none' ? errorElement.style.setProperty('display', 'none') : errorElement.style.setProperty('display', 'block')
                if (window.innerWidth < 991.98) errorElement.scrollIntoView()

            } else {
                e.preventDefault()
                loader.style.setProperty('--loader', 'visible');
                fetch(form.action, {
                    method: "POST",
                    body: new FormData(document.getElementById('sheetdb-form')),
                }).then(
                    response => response.json()
                ).then((html) => {
                    window.location.href = 'registered.html';
                })
            }

        })
    }


})();