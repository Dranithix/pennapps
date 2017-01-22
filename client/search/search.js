/**
 * Created by Kenta Iwasaki on 1/22/2017.
 */
Template.search.viewmodel({

    autorun() {
        console.log(this.parent().searchQuery());
    },
})