const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'blog.json'
);


const getBlogsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Blog {
    constructor(id, order, blog) {
        this.id = id;
        this.order = order;
        this.blog = blog;
    }

    save() {
        getBlogsFromFile(blogs => {
            if (this.id) {
                const existingBlogIndex = blogs.findIndex(blog => blog.id === this.id);
                const updatedBlogs = [...blogs];
                updatedBlogs[existingBlogIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedBlogs.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                blogs.push(this);
                fs.writeFile(p, JSON.stringify(blogs.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteById(id) {
        getBlogsFromFile(blogs => {
            const updatedBlog = blogs.filter(blog => blog.id !== id);
            fs.writeFile(p, JSON.stringify(updatedBlog.sort(function(first, second) {
                return first.order - second.order
            })), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getBlogsFromFile(callback);
    }

    static findById(id, callback) {
        getBlogsFromFile(blogs => {
            const blog = blogs.find(p => p.id === id);
            callback(blog);
        });
    }

};