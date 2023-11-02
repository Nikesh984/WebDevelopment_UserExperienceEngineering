// $(document).ready(function () {
   
//     const loggedInUserName = localStorage.getItem("UserName");
//     $("#loggedInUserName").text(loggedInUserName);

    
//     const isValidNumber = (value) => {
//         return $.isNumeric(value) && isFinite(value);
//     };

    
//     const performOperation = (operator, num1, num2) => {
//         switch (operator) {
//             case "add":
//                 return num1 + num2;
//             case "subtract":
//                 return num1 - num2;
//             case "multiply":
//                 return num1 * num2;
//             case "divide":
//                 if (num2 === 0) {
//                     return "Cannot divide by zero";
//                 }
//                 return num1 / num2;
//             default:
//                 return "Invalid operation";
//         }
//     };

    
//     $("#add, #subtract, #multiply, #divide").click( () => {
        
//         $(".error-message").text("");

        
//         const number1 = $("#number1").val();
//         const number2 = $("#number2").val();

        
//         if (number1 === "") {
//             $("#number1-error").text("Please enter a number").addClass('text-danger');
//         } else if (!isValidNumber(number1)) {
//             $("#number1-error").text("Invalid number").addClass('text-danger');
//         }
//         else{
//             $("#number1-error").text("").removeClass('text-danger');
//         }

//         if (number2 === "") {
//             $("#number2-error").text("Please enter a number").addClass('text-danger');
//         } else if (!isValidNumber(number2)) {
//             $("#number2-error").text("Invalid number").addClass('text-danger');
//         }
//         else{
//             $("#number2-error").text("").removeClass('text-danger');
//         }

//         if (!$("#number1-error").text() && !$("#number2-error").text()) {
            
//             const operation = $(this).attr("id");

//             // $('button').click('click', () => {
//             //     const operation = $('button').attr("id");
//             // });

//             console.log(operation);

//             const result = performOperation(operation, parseFloat(number1), parseFloat(number2));

            
//             $("#result").val(result);
//         }
//     });
// });


$(document).ready(function () {
    const loggedInUserName = localStorage.getItem("UserName");
    $("#loggedInUserName").text(loggedInUserName);

    
    const isValidNumber = (value) => {
        return $.isNumeric(value) && isFinite(value);
    };

    
    const performOperation = (operator, num1, num2) => {
        switch (operator) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                if (num2 === 0) {
                    return "Cannot divide by zero";
                }
                return num1 / num2;
            default:
                return "Invalid operation";
        }
    };

    
    $(".operation").click(function () {
       
        $(".error-message").text("");

        
        const number1 = $("#number1").val();
        const number2 = $("#number2").val();

        if (number1 === "") {
          $("#number1-error")
            .text("Please enter a number")
            .addClass("text-danger");
        } 
        else if (!isValidNumber(number1)) 
        {
          $("#number1-error").text("Invalid number").addClass("text-danger");
        } 
        else {
          $("#number1-error").text("").removeClass("text-danger");
        }



        if (number2 === "") {
            $("#number2-error").text("Please enter a number").addClass('text-danger');
        } 
        else if (!isValidNumber(number2))
        {
            $("#number2-error").text("Invalid number").addClass('text-danger');
        }
        else {
             $("#number2-error").text("").removeClass("text-danger");
        }

        // Get the operation type from the data attribute
        const operation = $(this).data("operation");

        if (!$("#number1-error").text() && !$("#number2-error").text()) {
            // Perform the selected operation
            const result = performOperation(operation, parseFloat(number1), parseFloat(number2));

            // Display the result in the read-only input field
            $("#result").val(result);
        }
    });
});
