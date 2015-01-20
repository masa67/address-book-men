
$.ajaxSetup({
    dataFilter: function (data, type) {
        // console.log(data);
        /*
        if (data.redirect) {
            document.location.href = data.redirect;
        }
        */
        return data;
    }
});