window.onload = function () {
    console.log("Hello World");
}

$(window).on("load", function() { console.log("this is jquery");})

//now make ajax
$("#submit").click(function() {
    //Get the input
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();

    $.ajax({
        url: "./input_check",
        type: 'GET',
        data: {"first_name": first_name, "last_name": last_name},
        success: function(res) {
            console.log("Successfull ajax request " + res);
            //TODO ok time to check on servlet the inputs
            $('.result').append(res);
        }
    });
})