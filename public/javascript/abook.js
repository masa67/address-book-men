
var abook = {
    renderBody: function(data) {
        $('.container').replaceWith(data);
        $('.container').trigger('create');
    },
    clickAddContact: function() {
        $.ajax({
            type: 'GET',
            url: '/add_contact',
            success: function(data) {
                abook.renderBody(data);
            }
        })
    },
    clickContactAdd: function() {

    },
    clickContactCancel: function() {
        $.ajax({
            type: 'GET',
            url: '/contacts',
            success: function(data) {
                abook.renderBody(data);
            }
        })
    },
    clickContactDelete: function() {

    },
    clickContactUpdate: function() {

    },
    clickLogin: function() {
        $.ajax({
            type: 'POST',
            url: '/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function(data) {
                abook.renderBody(data);
            }
        });
    },
    clickLogout: function() {
        $.ajax({
            type: 'GET',
            url: '/logout',
            success: function(data) {
                abook.renderBody(data);
            }
        })
    },
    clickRegister: function() {
        $.ajax({
            type: 'GET',
            url: '/register',
            success: function(data) {
                abook.renderBody(data);
            }
        });
    },
    clickRegisterForm: function() {
        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                email: $('#email').val()
            },
            success: function(data) {
                abook.renderBody(data);
            }
        });
    },
    clickRegisterCancel: function() {
        $.ajax({
            type: 'GET',
            url: '/login',
            success: function(data) {
                abook.renderBody(data);
            }
        });
    }
};

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/login',
        success: function(data) {
            abook.renderBody(data);
        }
    })
});
