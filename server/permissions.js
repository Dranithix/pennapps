/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import "../shared/collections";

Exams.allow({
    update: (userId, doc, fieldNames, modifier) => {
        if (modifier.$push || modifier.$pull) {
            return true;
        }
        return false;
    },
})