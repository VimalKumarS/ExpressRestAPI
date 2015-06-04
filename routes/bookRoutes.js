/**
 * Created by Vimal Kumar on 6/1/2015.
 */
var express = require('express');

var routes=function(Book){
    var bookrouter= express.Router();

    bookrouter.route('/books')
        .post(function(req,res){
            var book=new Book(req.body);
            console.log(book)
            book.save()
            res.status(201).send(book)

        })
        .get(
        function(req,res){
            var query= req.query;
            console.log(query)
            Book.find(query,function(err,books){
                if(err){
                    console.log(err)
                }
                else
                {
                    res.json(books)
                }
            })
            //var responseJson={hello:'this is my api'};
            // res.json(responseJson)
        });
    bookrouter.use('/Books/:bookId',function(req,res,next){
        Book.findById(req.params.bookId,function(err,book) {
            if(err){
                console.log(err)
            }
            else if(book)
            {
                req.book=book;
                next()
            }
            else
            {
                res.status(404).send('no book found')
            }
          })
    })
    bookrouter.route('/Books/:bookId').get(
        function(req,res){
            var query= req.query;
            console.log(query)
            Book.findById(req.params.bookId,function(err,book){
                if(err){
                    console.log(err)
                }
                else
                {
                    res.json(book)
                }
            })
            // res.json(req.book)
        }).put(function(req,res){
            Book.findById(req.params.bookId,function(err,book) {

                req.book.title=req.body.title;
                req.book.author=req.body.author;
                req.book.gerene=req.body.gerene;
                req.book.read=req.body.read;
                req.book.save()
                res.json(book)
                /*if(err){
                    console.log(err)
                }
                else
                {
                    book.title=req.body.title;
                    book.author=req.body.author;
                    book.gerene=req.body.gerene;
                    book.read=req.body.read;
                    book.save()
                    res.json(book)
                }*/

            })

        }).patch(function(req,res){
            if(req.body._id){
                delete req.body._id
            }
            for(var p in req.body){
                req.book[p]=req.body[p]

            }
            req.book.save(function(err){
                if(err){
                    res.status(500).send(err)
                }
                else
                {
                    res.json(req.book)
                }
            })
        });

    return bookrouter;
}

module.exports=routes;