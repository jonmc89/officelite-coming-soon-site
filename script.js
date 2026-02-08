const target = new Date("2026-11-04T23:59:59").getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = target - now;

    if (diff < 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); //
            }
        });
    },
    {
        threshold: 0.2,
    },
);

faders.forEach((el) => observer.observe(el));

// Sign up form validation

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const numberEl = document.getElementById("number");
const companyEl = document.getElementById("company");

const form = document.getElementById("form");

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

const isEmailFormatValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
};
const isPasswordSecure = (password) => {
    const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})",
    );
    return re.test(password);
};

const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove("input-success");
    formField.classList.add("input-fail");

    const error = formField.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove("input-fail");
    formField.classList.add("input-success");

    const error = formField.querySelector("small");
    error.textContent = "";
};

const checkName = () => {
    let valid = false;
    const nameInput = nameEl.value.trim();

    if (!isRequired(nameInput)) {
        showError(nameEl, "Name cannot be blank");
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, "Email cannot be blank.");
    } else if (!isEmailFormatValid(email)) {
        showError(emailEl, "Email is not valid.");
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkNumber = () => {
    let valid = false;
    const numberInput = numberEl.value.trim();
    if (!isRequired(numberInput)) {
        showError(numberEl, "Number cannot be blank");
    } else {
        showSuccess(numberEl);
        valid = true;
    }
    return valid;
};

const checkCompany = () => {
    let valid = false;

    const companyInput = companyEl.value.trim();

    if (!isRequired(companyInput)) {
        showError(companyEl, "Company cannot be blank");
    } else {
        showSuccess(companyEl);
        valid = true;
    }
    return valid;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isNumberValid = checkNumber(),
        isCompanyValid = checkCompany();

    let isFormValid =
        isNameValid && isEmailValid && isNumberValid && isCompanyValid;

    if (isFormValid) {
        form.submit();
    }
});
