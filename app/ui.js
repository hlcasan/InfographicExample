document.getElementById("formBttn").addEventListener("click",toggleForm);

function toggleForm() {
    document.getElementById("addExpense").reset();
    document.getElementById("formContainer").classList.toggle("on");
    document.getElementById("formBttn").classList.toggle("down");
}
