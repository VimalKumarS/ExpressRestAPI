/**
 * Created by Vimal Kumar on 6/1/2015.
 */

var mongoose = require('mongoose');
var bookSchema = mongoose.Schema;

var bookModel = new bookSchema({
    title:{ type: String},
    author: { type: String},
    gerene:{ type: String},
    read:{type:Boolean , default:false}
});

module.exports=mongoose.model('Book',bookModel);