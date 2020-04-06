import { MIN_NAME_LENGTH } from "./constants";
import { setUserName } from "./state";

const form = document.getElementById("user-info") as HTMLFormElement;
const nameInput = document.getElementById("name-input") as HTMLInputElement;
const submitButton = document.getElementById(
    "submit-button"
) as HTMLButtonElement;

let validInput = false;

function setErrorActive(active: boolean) {
    validInput = !active;
    submitButton.disabled = validInput;

    if (active) {
        nameInput.classList.add("error");
        nameInput.classList.remove("success");
    } else {
        nameInput.classList.remove("error");
        nameInput.classList.add("success");
    }
}

function onInputChange() {
    if (nameInput.value.length >= MIN_NAME_LENGTH) {
        if (!validInput) setErrorActive(false);
    } else {
        if (validInput) setErrorActive(true);
    }
}

function onFormSubmit(ev: Event) {
    ev.preventDefault();

    if (nameInput.value.length >= MIN_NAME_LENGTH) {
        setErrorActive(false);
        setUserName(nameInput.value);
        // All good
    } else {
        setErrorActive(true);
    }
}

export function initForm() {
    form.addEventListener("submit", onFormSubmit);
    nameInput.addEventListener("input", onInputChange);

    return () => {
        form.removeEventListener("submit", onFormSubmit);
        nameInput.removeEventListener("input", onInputChange);
    };
}
