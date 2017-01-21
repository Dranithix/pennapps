/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import annotator from 'annotator';

Template.home.viewmodel({
    onCreated() {
        let app = new annotator.App();
        app.include(annotator.ui.main);
        app.include(annotator.storage.http);
        app.start();
    }
})