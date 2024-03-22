function openForm(formId) {
    document.getElementById(formId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("openFormBtn").addEventListener("click", function() {
        openForm("popupOverlay"); // Corrected the ID here
    });
});


function openForm(formId) {
    document.getElementById(formId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("FormBtn").addEventListener("click", function() {
        openForm("popup"); // Corrected the ID here
    });
});

function closeForm() {
    document.getElementById("popup").style.display = "none";
     document.getElementById("popupOverlay").style.display = "none";
    
}

    