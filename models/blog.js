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
    constructor(order, title, blog) {
        this.order = order;
        this.title = title;
        this.blog = blog;
    }

    save() {
        getBlogsFromFile(blogs => {
            if (blogs.map(blog => blog.title).includes(this.title)) {
                const existingBlogIndex = blogs.findIndex(blog => blog.title === this.title);
                const updatedBlogs = [...blogs];
                updatedBlogs[existingBlogIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedBlogs.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                blogs.push(this);
                fs.writeFile(p, JSON.stringify(blogs.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteByTitle(title) {
        getBlogsFromFile(blogs => {
            const updatedBlog = blogs.filter(blog => blog.title !== title);
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

    static findByTitle(title, callback) {
        getBlogsFromFile(blogs => {
            const blog = blogs.find(p => p.title === title);
            callback(blog);
        });
    }

};