/**
 * Created by Kenta Iwasaki on 12/24/2016.
 */

let unauthenticatedRoutes = FlowRouter.group({
    triggersEnter: [function (context, redirect) {
        if (Meteor.userId()) redirect('/home')
    }]
})

unauthenticatedRoutes.route('/', {
    name: 'landing',
    action: (params, queryParams) => {
        BlazeLayout.render('landing');
    },
})

unauthenticatedRoutes.route('/login', {
    name: 'login',
    action: (params, queryParams) => {
        BlazeLayout.render('login');
    },
})

unauthenticatedRoutes.route('/register', {
    name: 'register',
    action: (params, queryParams) => {
        BlazeLayout.render('register');
    },
})


let userRoutes = FlowRouter.group({
    name: 'user',
    triggersEnter: [function (context, redirect) {
        if (!Meteor.userId()) redirect('/');
    }]
});

userRoutes.route('/home', {
    action: (params, queryParams) => {
        BlazeLayout.render('app', {content: 'home'});
    }
})

userRoutes.route('/question/:exam/:question', {
    action: (params, queryParams) => {
        BlazeLayout.render('app', {content: 'question'});
    }
})

userRoutes.route('/worksheet', {
    action: (params, queryParams) => {
        BlazeLayout.render('app', {content: 'worksheet'});
    }
})