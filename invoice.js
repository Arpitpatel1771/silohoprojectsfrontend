$(document).ready(function () {

    const formatRows = () => {
        $('.item').removeClass("even_row");
        $('.item').slice(0, -3).each(function (index) {
            if ((index + 1) % 2 === 0) {
                $(this).addClass("even_row");
            }
        })
    }

    const calculateTotal = () => {
        let total = 0;
        $('.item').slice(0, -3).each(function () {
            total += (parseFloat($(this).children().eq(-2).text().replaceAll("₹", "").replaceAll(",", "")));
        })

        $('.item').eq(-1).children().eq(-1).children().html(total.toLocaleString('en-US', { style: "currency", currency: "INR" }));
        $('.subtotal').children().html(total.toLocaleString('en-US', { style: "currency", currency: "INR", maximumFractionDigits: 0 }));
    }

    let enableCross = true;
    $('.cross').click(function () {
        if (enableCross) {
            $(this).parent().remove();
            formatRows();
            calculateTotal();
        }
    })

    var asc = [1, 1, 1, 1];
    $('.heading').children().click(function () {
        //Description Sorting
        if ($(this).html() === "Description") {
            $('.item').slice(0, -3).sort(function (a, b) {
                return asc[0] * a.childNodes[1].innerText.localeCompare(b.childNodes[1].innerText);
            }).insertAfter($('.heading'));
            asc[0] *= -1;

        }
        //Qty Sorting
        if ($(this).html() === "Qty") {
            $('.item').slice(0, -3).sort(function (a, b) {
                return asc[1] * (parseInt(a.childNodes[3].innerText) - parseInt(b.childNodes[3].innerText));
            }).insertAfter($('.heading'));
            asc[1] *= -1;
        }
        //Rate Sorting
        if ($(this).html() === "Rate") {
            $('.item').slice(0, -3).sort(function (a, b) {
                return asc[2] * (parseFloat(a.childNodes[5].innerText.replaceAll("₹", "").replaceAll(",", "")) - parseFloat(b.childNodes[5].innerText.replaceAll("₹", "").replaceAll(",", "")));
            }).insertAfter($('.heading'));
            asc[2] *= -1;
        }
        //Total Price Sorting
        if ($(this).html() === "Total price") {
            $('.item').slice(0, -3).sort(function (a, b) {
                return asc[3] * (parseFloat(a.childNodes[7].innerText.replaceAll("₹", "").replaceAll(",", "")) - parseFloat(b.childNodes[7].innerText.replaceAll("₹", "").replaceAll(",", "")));
            }).insertAfter($('.heading'));
            asc[3] *= -1;
        }

        formatRows();
    });

    $('#toggle_removal').click(function () {
        enableCross = !enableCross;

        //QOL changes
        if (enableCross) {
            $('#toggle_removal').attr({
                "title": "Click on the green crosses to delete records"
            });
            $('.cross').css({
                "filter": "grayscale(0%)"
            }).attr({
                "title": "Delete"
            })
        }
        if (!enableCross) {
            $('#toggle_removal').attr({
                "title": "Click here to enable deletion of records"
            });
            $('.cross').css({
                "filter": "grayscale(100%)"
            }).attr({
                "title": "Disabled"
            });
        }

    });


    //QOL changes
    $('.heading').css({
        "cursor": "pointer",
        "user-select": "none"
    }).attr({
        "title": "Click to sort with this column"
    });

    $('#toggle_removal').attr({
        "title": "Click on the green crosses to delete records"
    });

    $('.cross').css({
        "cursor": "pointer",
        "user-select": "none"
    }).attr({
        "title": "Delete"
    })


})