const getDb = require('../util/database').getDb;
const mongo = require('mongodb');

class Blog {
    constructor(order, title, blog, id) {
        this.order = order;
        this.title = title;
        this.blog = blog;
        this._id = id ? new mongo.ObjectId(id) : null; 
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('blog').updateOne({ _id: this._id }, {$set: this});
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

    static findByTitle(blogId) {
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

    static deleteByTitle(blogId) {
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

