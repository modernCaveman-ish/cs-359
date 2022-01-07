function logIn() {
            var formData = {
                username: $("#logInUsername").val(),
                password: $("#logInPassword").val()
            };

            console.log("Im in login");

            console.log("the username is: " + formData.username);

            $.ajax({
                type: 'GET',
                url: 'GetUser?',
                data: formData,
                dataType: 'json',
                encode: true,
                success: function() {
                    console.log("the request was successful");
                    alert("Welcome, " + formData.username + '!!');
                    window.location.href="menuPage.html"
                },
                error: function() {
                    console.log("Error with the fkin request");
                }
            });
}

function registerPOST() {
    
    let myForm = document.getElementById('registerForm');
    let formData = new FormData(myForm);
    const data = {};
//    formData.forEach((value, key) => (data[key] = value));
    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);
    console.log(JSON.stringify(data));
    
    $.ajax({
       type: 'POST',
       url: 'registerPOST',
       data: jsonData,
       contentType: 'application/json',
       success: function() {
           console.log("the registerPOST request was successful");
       },
       error: function() {
           console.log("The registerPOST was not successful");
       }
    });
    
}