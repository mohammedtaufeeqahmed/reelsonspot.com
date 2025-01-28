const scriptURL = 'https://script.google.com/macros/s/AKfycbyAo-vXjV46sP7blQx1lU-ZGhWs1iF7z0Itb--9TU6IAkw6JJ6o4bjcZGwF4xvPrx4/exec';

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    // Validate all required fields
    form.querySelectorAll('input, textarea').forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid'); // Show invalid feedback
            input.classList.remove('is-valid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid'); // Mark as valid
        }
    });

    const mobileInput = document.getElementById('mobile');
    const mobileValue = mobileInput.value.trim();
    const mobilePattern = /^\d{10}$/;

    // Additional mobile field validation
    if (!mobilePattern.test(mobileValue)) {
        mobileInput.classList.add('is-invalid');
        mobileInput.classList.remove('is-valid');
        isValid = false;
    } else {
        mobileInput.classList.remove('is-invalid');
        mobileInput.classList.add('is-valid');
    }

    // If all fields are valid, submit the form data
    if (isValid) {
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    form.reset();
                    form.querySelectorAll('input, textarea').forEach(input => {
                        input.classList.remove('is-valid'); // Reset validation styling
                    });
                } else {
                    alert('Error submitting the form.');
                }
            })
            .catch(error => alert('Error! ' + error.message));
    }
});