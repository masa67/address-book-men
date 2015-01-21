
var abook = {
    clickRegister: function() {
        $.ajax({
            url: '/register',
            success: function(data) {
                $('body').removeClass('ui-mobile-viewport');
                $('body').addClass('display-control');
                $('body').html(data);
            }
        });
    }
};