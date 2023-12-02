/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');
const Book = require('../models/Books.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      try {
        const books = await Book.find({});

        const result = books.map(book => {
          return {
            comments: book.comments,
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length
          }
        });

        res.json(result);
      }
      catch (err) {
        console.error(err);
      }
    })
    
    .post(async function (req, res) {
      try {
        const title = req.body.title;

        if(!title) {
          return res.send('missing required field title');
        }

        const book = await Book.create({ title });

        res.json({
          _id: book._id,
          title: book.title
        })

      }
      catch (err) {
        console.error(err);
      }
    })
    
    .delete(async function(req, res){
      try {
        const deleted = await Book.deleteMany({});
        res.send('complete delete successful');
      }
      catch (err) {
        console.error(err);
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      try {
        const bookid = req.params.id;
        
        const book = await Book.findById(bookid);
        
        if(!book) {
          return res.send('no book exists');
        }

        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        });
      }
      catch (err) {
        console.error(err);
      }
    })
    
    .post(async function(req, res) {
      try {
        const bookid = req.params.id;
        const comment = req.body.comment;

        if(!comment) {
          return res.send('missing required field comment');
        }

        const book = await Book.findById(bookid);

        if(!book) {
          return res.send('no book exists');
        }
        
        book.comments = [...book.comments, comment];
        await book.save();

        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        });
      }
      catch (err) {
        console.error(err);
      }
    })
    
    .delete(async function(req, res) {
      try {
        const bookid = req.params.id;

        const book = await Book.findByIdAndDelete(bookid);

        if(!book) {
          return res.send('no book exists');
        }

        res.send('delete successful');
        
      }
      catch (err) {
        console.error(err);
      }
    });
  
};
