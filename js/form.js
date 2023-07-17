document.getElementById("myContactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("message");

    // Validiere das Name-Feld
    if (nameInput.value.trim() === "") {
        setInvalid(nameInput, "Bitte gib deinen Namen ein.");
        return;
    }

    // Validiere das Email-Feld
    if (emailInput.value.trim() === "") {
        setInvalid(emailInput, "Bitte gib deine E-Mail-Adresse ein.");
        return;
    }

    // Validiere das Nachrichten-Feld
    if (messageInput.value.trim() === "") {
        setInvalid(messageInput, "Bitte gib eine Nachricht ein.");
        return;
    }

    // Check captcha
    grecaptcha.ready(function() {
        grecaptcha.execute('6LdPRSMlAAAAAHZsaeHTCqiPFtzxp9qLcc1PKV-c', { action: 'submit' })
            .then(function(token) {
                var recaptchaResponse = document.getElementById('g-recaptcha-response');
                recaptchaResponse.value = token;

                if (recaptchaResponse.value) {
                    const data = {
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value,
                        phone: phoneInput.value
                    };

                    postContactRequest(data);
                } else {
                    alert('Bitte bestätigen Sie, dass Sie kein Roboter sind.');
                }
            })
            .catch((error) => {
                console.error(error);
            });;
    });
})


function setInvalid(inputElement, message) {
    inputElement.setCustomValidity(message);
    inputElement.classList.add("invalid");
}

const url = "https://mango-frost-bestseller.glitch.me/contact";

function postContactRequest(data) {
    // HTTP-POST-Request senden
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Erfolgreiche Antwort vom Server
                console.log("POST-Request erfolgreich gesendet.");
                document.getElementById("myContactForm").reset();
            } else {
                // Fehler beim POST-Request
                console.error("Fehler beim Senden des POST-Requests.");
            }
        })
        .catch(error => {
            // Fehler beim Senden des Requests
            console.error("Fehler beim Senden des POST-Requests:", error);
        });
}