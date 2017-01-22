Template.landing.viewmodel({
    onCreated: function() {
        $('head').append('<link rel="stylesheet" href="/css/landing.css" type="text/css" />');
        document.title = "Edumame";
    },
    onDestroyed: function() {

    },
})
