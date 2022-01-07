// Log in User AJAX Request
function logInUser(data) {
    // var xhr = new XMLHttpRequest();
    // xhr.onload = function () {
    //     if( xhr.readyState === 4 && xhr.status === 200) {
    //         var response = JSON.parse(xhr.responseText);
    //         console.log("From AJAX loginUser.stringify " + JSON.stringify(this.responseText));
    //         alert('Welcome, ' + response.username + '!!');
    //     } else if(xhr.status !== 200) {
    //         alert('Error: User does not exist');
    //     }
    // };

    // xhr.open('GET', 'GetUser?', data);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send();

    
    $.ajax({
        url: 'GetUser?',
        data: data,
        success: function () {
            console.log("we done it baby!!");
        },
        error: function() {
            console.log("Ajax request failed an error has occured");
        },
        // dataType: "text/plain",
        contentType: "application/json",
        method: 'GET'
    });

}