const getDb = require('../util/database').getDb;
const mongo = require('mongodb');

class Blog {
    constructor(order, title, blog) {
        this.order = order;
        this.title = title;
        this.blog = blog;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (db.Collection.find({"title": this.title}.limit(1).size()) ) {
            dbOp = db.collection('blog').updateOne({ "title": this.title }, {$set: this});
        } else {
            dbOp = db.collection('blog').insertOne(this);
        }
        return dbOp
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    static fetchAll() {
        const db = getDb();
        return db
        .collection('blog')
        .find()
        .toArray()
        .then(blog => {
            return blog;
        })
        .catch(err=> {
            console.log(err);
        });
    }

    static findById(blogId) {
        const db = getDb();
        return db
        .collection('blog')
        .find({ _id: new mongo.ObjectID(blogId) })
        .next()
        .then(blog => {
            console.log(blog);
            return blog;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(blogId) {
        const db = getDb();
        return db
        .collection('blog')
        .deleteOne({_id: new mongo.ObjectId(blogId)})
        .then(result => {
            console.log('deleted')
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = Blog;

