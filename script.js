$(function () {

    "use strict";
    
    /*============================
    Style navigation bar on scroll
    ============================*/
    // Get value of bottom of #featured section by adding offset of element plus height
    var featuredBottom = $('#featured').offset().top + $('#featured').height() - $('#nav').height();
    // Change navbar styling on scroll
    $(window).on('scroll', function () {
        if (window.innerWidth >= 768) {
            // Get top of window value
            var windowTop = Math.round($(window).scrollTop());
            //  Update navbar if top of window has passed bottom of #featured section, otherwise reset
            if (windowTop > featuredBottom) {
                $('.nav').removeClass('nav-background-featured');
                $('.nav').addClass('nav-background-main');
                $('.nav-brand').removeClass('nav-brand-featured');
                $('.nav-brand').addClass('nav-brand-main');
                $('.nav-link').removeClass('nav-link-featured');
                $('.nav-link').addClass('nav-link-main');
                $('.fa-bars').removeClass('fa-bars-featured');
                $('.fa-bars').addClass('fa-bars-main');
            } else {
                $('.nav').removeClass('nav-background-main');
                $('.nav').addClass('nav-background-featured');
                $('.nav-brand').removeClass('nav-brand-main');
                $('.nav-brand').addClass('nav-brand-featured');
                $('.nav-link').removeClass('nav-link-main');
                $('.nav-link').addClass('nav-link-featured');
                $('.fa-bars').removeClass('fa-bars-main');
                $('.fa-bars').addClass('fa-bars-featured');
            }
        }
    });
    
    /*===================================================
    Remove 'by Stephanie' from navbar if viewport < 500px
    ===================================================*/
    // On window load
    if (window.innerWidth < 500) {
        $('#by-stephanie').hide();
    } else {
        $('#by-stephanie').show();
    }
    // On window resize
    $(window).resize(function() {
        if (window.innerWidth < 500) {
            $('#by-stephanie').hide();
        } else {
            $('#by-stephanie').show('hidden');
        }
    });
    
    /*==========================================
    Toggle nav-link dropdown on nav-button click
    ==========================================*/
    $('#nav-button').click(function() {
        $('#nav-bar').slideToggle();
    });
    
    /*=======================================================
    Toggle nav-link dropdown on nav-link click in mobile view
    =======================================================*/
    $('.nav-link').click(function() {
        if (window.innerWidth < 1100) {
            $('#nav-bar').slideToggle();
        }
    });
    
    /*==========================================================
    Slide up nav-link dropdown on nav-brand click in mobile view
    ==========================================================*/
    $('.nav-brand').click(function() {
        if (window.innerWidth < 1200) {
            $('#nav-bar').slideUp();
        }
    });
    
    /*=============================================
    Nav-link presentation on window load and resize
    =============================================*/
    // Hide nav links on window load if mobile view, otherwise show them
    if (window.innerWidth < 1200) {
        $('#nav-bar').hide();
    } else {
        $('#nav-bar').show();
    }
    // On window resize
    $(window).resize(function() {
        if (window.innerWidth < 1200) {
            $('#nav-bar').hide();
        } else {
            $('#nav-bar').show();
        }
    });
    
    /*===============================================
    Reduce social media icon size if viewport < 500px
    ===============================================*/
    // On window load
    if (window.innerWidth < 500) {
        $('.social-icon').removeClass('fa-5x');
        $('.social-icon').addClass('fa-4x');
    } else {
        $('.social-icon').removeClass('fa-4x');
        $('.social-icon').addClass('fa-5x');
    }
    // On window resize
    $(window).resize(function() {
        if (window.innerWidth < 500) {
            $('.social-icon').removeClass('fa-5x');
            $('.social-icon').addClass('fa-4x');
        } else {
            $('.social-icon').removeClass('fa-4x');
            $('.social-icon').addClass('fa-5x');
        }
    });
    
    
    /*===================
    Validate form fields
    ===================*/
    function validateContact(nm, em, pn, ms, hm) {
        // TEST
        console.log("In validateContact()");

        // If contact fields are blank, alert user
        if (nm === '' || em === '' || pn === '' || ms === '' || hm === '') {
            alert("ERROR: Please fill all fields");
            return false;
        }
        // If human check fails, alert user
        else if (hm !== "9") {
            alert("ERROR: Please be a human");
            return false;
        }
        else {
            return true;
        }
    }
    
    /*=========================================
    Send email on button click via AJAX request
    =========================================*/
    $('#form-btn').click(function sendEmail() {
        //TEST
        console.log("In sendEmail()");

        // Get user input
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var message = $('#message').val();
        var human = $('#human').val();
        // Validate contact fields
        var validated = validateContact(name, email, phone, message, human);
        // If contact fields have been validated, make AJAX request
        if (validated) {
            $.ajax({
                method: "POST",
                url: "/contact.php",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                },
                success: function(data) {
                    // Display success message
                    $('#form-result').html(data);
                    // Clear form fields
                    $('input').val('');
                    $('textarea').val('');
                },
                error: function() {
                    alert('ERROR: Message was not sent');
                }
            });
        }
        // Return false to prevent GET command
        return false;
    });
});
            