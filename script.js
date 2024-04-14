$(document).ready(function() {
    $('#taxForm').submit(function(event) {
        event.preventDefault(); // Prevent form submission

        // Reset error icons
        $('.error-icon').css('display', 'none');

        // Get input values
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val()) || 0;
        var deductions = parseFloat($('#deductions').val()) || 0;
        var age = $('#age').val();

        // Validate income
        if (isNaN(income)) {
            $('#incomeError').css('display', 'inline-block');
            $('#incomeError').attr('title', 'Please Enter Data');

            return;
        }

        if (age === null || age === "") {
            $('#ageError').css('display', 'inline-block');
            $('#ageError').attr('title','Please select an Option');
            return;
        }




        // Calculate taxable income
        var totalIncome = income + extraIncome - deductions;
        var taxableIncome = totalIncome > 800000 ? (totalIncome - 800000) : 0;

        // Calculate tax
        var tax = 0;
        if (taxableIncome > 0) {
            if (age === "<40") {
                tax = 0.3 * taxableIncome;
            } else if (age === "≥40 & <60") {
                tax = 0.4 * taxableIncome;
            } else if (age === "≥60") {
                tax = 0.1 * taxableIncome;
            }
        }

        // Display result in modal
        var modalBody = $('#modalBody');
        modalBody.html('<p>Total Income: ' + totalIncome.toFixed(2) + ' Lakhs</p>' +
            '<p>Taxable Income: ' + taxableIncome.toFixed(2) + ' Lakhs</p>' +
            '<p>Tax to be paid: ' + tax.toFixed(2) + ' Lakhs</p>');
        $('#resultModal').modal('show');
    });






    
    $('.numericField').on('input', function() {
        var $input = $(this);
        var inputValue = $input.val().trim();
        
        if (inputValue !== '' && !isValidNumber(inputValue)) {
            var $errorIcon = $input.parent().find('.error-icon');
            $errorIcon.css('display', 'inline-block');
            $errorIcon.attr('title', 'Please enter Valid Numbers');
        } else {
            var $errorIcon = $input.parent().find('.error-icon');
            $errorIcon.css('display', 'none');
            $errorIcon.removeAttr('title');
        }
    });





    function isValidNumber(inputValue) {
        return /^-?\d*\.?\d+$/.test(inputValue);
    }
});
