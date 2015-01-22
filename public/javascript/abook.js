
var abook = {
    renderBody: function(data) {
        $('.container').replaceWith(data);
        $('.container').trigger('create');
        abook.registerListeners();
    },
    clickContactShow: function(id) {
        $.ajax({
            type: 'GET',
            url: '/contact',
            data: {
                id: id
            },
            success: function(data) {
                abook.renderBody(data);
            }
        })
    },
    registerListeners: function() {
        $('#button-contact-add').click(function() {
            $.ajax({
                type: 'POST',
                url: '/add_contact',
                data: {
                    id: $('#id').val(),
                    name: $('#name').val(),
                    address: $('#address').val() ,
                    email: $('email').val(),
                    phone: $('phone').val(),
                    birthday: $('birthday').val(),
                    otherInfo: $('otherInfo').val()
                },
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-contact-add-new').click(function() {
            $.ajax({
                type: 'GET',
                url: '/add_contact',
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-contact-back').click(function() {
            $.ajax({
                type: 'GET',
                url: '/contacts',
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-contact-cancel').click(function() {
            $.ajax({
                type: 'DELETE',
                url: '/delete_contact',
                data: {
                    id: $('#id').val()
                },
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-contact-delete').click(function() {
            $.ajax({
                type: 'DELETE',
                url: '/delete_contact',
                data: {
                    id: $('#id').val()
                },
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-contact-update').click(function() {
            $.ajax({
                type: 'POST',
                url: '/update_contact',
                data: {
                    id: $('#id').val(),
                    name: $('#name').val(),
                    address: $('#address').val() ,
                    email: $('email').val(),
                    phone: $('phone').val(),
                    birthday: $('birthday').val(),
                    otherInfo: $('otherInfo').val()
                },
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-login').click(function() {
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
        });
        $('#button-logout').click(function() {
            $.ajax({
                type: 'GET',
                url: '/logout',
                success: function(data) {
                    abook.renderBody(data);
                }
            });  
        });
        $('#button-register').click(function() {
            $.ajax({
                type: 'GET',
                url: '/register',
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-register-cancel').click(function() {
            $.ajax({
                type: 'GET',
                url: '/login',
                success: function(data) {
                    abook.renderBody(data);
                }
            });
        });
        $('#button-register-form').click(function() {
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
