const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".adminKey-digit");

    inputs.forEach((input, idx) => {
        input.addEventListener("input", (e) => {
            const val = e.target.value.replace(/\D/g, "");
            e.target.value = val;

            if (val && inputs[idx + 1]) {
                inputs[idx + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            const key = e.key;

            if (key === "Backspace" && !input.value && idx > 0) {
                inputs[idx - 1].focus();
            }

            if (!/^\d$/.test(key) && key.length === 1 && key !== "Backspace") {
                e.preventDefault(); // block non-digit
            }

            if (key === "ArrowLeft" && idx > 0) {
                inputs[idx - 1].focus();
            }

            if (key === "ArrowRight" && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
        });

        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "");
            paste.split("").forEach((char, i) => {
                if (inputs[idx + i]) {
                    inputs[idx + i].value = char;
                }
            });
            const next = inputs[idx + paste.length];
            if (next) next.focus();
        });
    });
});