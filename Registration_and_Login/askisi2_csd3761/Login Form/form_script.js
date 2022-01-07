// Password missmatch function
function passwordMissmatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    let unMatched = document.getElementById("unMatched");
    let matched = document.getElementById("matched");

    // console.log('onkeyup works ' + password + ' ' + confirmPassword);

    if (password == confirmPassword) {
        if (confirmPassword == "" || password == "") {
            unMatched.style.display = "none";
            matched.style.display = "none";
            return false;
        }
        // console.log("passwordMissmatch approves");
        unMatched.style.display = "none";
        matched.style.display = "block";
        return true;
    } else {
        if (confirmPassword == "" || password == "") {
            unMatched.style.display = "none";
            matched.style.display = "none";
            return false;
        }
        // console.log("passwordMissmatch doesn't approve");
        unMatched.style.display = "block";
        matched.style.display = "none";
        return true;
    }
}

// For the reveal Password checkbox
function revealPass() {
    var pass = document.getElementById('password');
    var confpass = document.getElementById('confirmPassword');
    if (pass.type === "password" && confpass.type === "password") {
        pass.type = "text";
        confpass.type = "text";
    } else {
        pass.type = "password";
        confpass.type = "password";
    }
}

// show extras if user is a doctor
function isDoctor(){
    let user_type = document.getElementById('user_type');
    let doc_info = document.getElementById('doc_info');
    if(user_type.value == "doctor"){
        doc_info.style.display = 'block';
        document.getElementById('home_address_label').innerHTML = 'Doc\'s Office Address';
    } else if(user_type.value == 'plain_user'){
        doc_info.style.display = 'none';
        document.getElementById('home_address_label').innerHTML = 'Home Address';
    }
}


function checkAmka(){
    let amka = document.getElementById('amka').value;
    let birthday = document.getElementById('birthday').value;

    // first check if the digits given are the right ammount
    if(amka.length < 11){
        console.log("ERROR AMKA length is less than 11");
        return false;
    } else if(amka.length > 11){
        console.log("ERROR AMKA length is more than 11");
        return false;
    }

    // 1980 - 01 - 01
    // 25 05 80 ΧΧ ΧΧ Χ

    // 5-6 letters of date are the month
    // 8-9 letters of date are the day
    // 2-3 letters of date are the year
    
    // Now check if amka given is valid
    // check for day
    if(amka.charAt(0) == birthday.charAt(8) && amka.charAt(1) == birthday.charAt(9)){
        console.log('Day is ok');
    } else {
        console.log('Invalid amka (Day)');
        return false;
    }
    if (amka.charAt(2) == birthday.charAt(5) && amka.charAt(3) == birthday.charAt(6)) {
        console.log('Month is ok');
    } else {
        console.log('Invalid amka (Day)');
        return false;
    }
    if (amka.charAt(4) == birthday.charAt(2) && amka.charAt(5) == birthday.charAt(3)) {
        console.log('Year is ok');
    } else {
        console.log('Invalid amka (Year)');
        return false;
    }
}

function checkboxTick(){
    let checkBox = document.getElementById('accept');
    if(checkBox.checked == false){
        return false;
    } else if(checkBox.checked == true){
        return true;
    }
}

// Function that executes when submit button is clicked 
function submit(){
    // check location given
    checkLocation();

    if(!checkAmka()){
        alert('Invalid Amka');
        return -1;
    }
    if(!checkboxTick()){
        alert("checkBox is not checked");
        console.log("checkBox not ticked");
        return -2;
    }
}