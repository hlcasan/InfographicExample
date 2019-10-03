/*
This file should be used for UI elements controled by JS
Right now, it only has one function: toggle the form panel
*/

// This is the click event on the little SVG triangle button
document.getElementById("formBttn").addEventListener("click", toggleForm);


//This function slides up and down the form, it also resets the from to empty values
function toggleForm() {
    document.getElementById("addExpense").reset(); //reset the form
    document.getElementById("formContainer").classList.toggle("on"); //toggle the form panel
    document.getElementById("formBttn").classList.toggle("down"); //flip the SVG button
}