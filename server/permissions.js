import "../shared/collections";

Exams.allow({
    update: (userId, doc, fieldNames, modifier) => {
        if (modifier.$push || modifier.$pull) {
            return true;
        }
        return false;
    },
})

Comments.allow({
    insert: (userId, doc) => {
        doc.created_at = Date.now();
        return true;
    },
    update: () => {
        return true;
    }
})