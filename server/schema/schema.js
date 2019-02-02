const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

var books = [
    {name:'book first', genre:'love story', id:'1', authorId:'1'},
    {name:'book second', genre:'love story', id:'2', authorId:'1'},
    {name:'book third', genre:'Comedy', id:'3', authorId:'1'},
    {name:'book fouth', genre:'Comedy', id:'4', authorId:'1'},
    {name:'book Fifth', genre:'Historical', id:'5', authorId:'1'},
    {name:'book Sixth', genre:'Historical', id:'6', authorId:'1'},
    {name:'book Seventh', genre:'Historical', id:'7', authorId:'1'},
];
var authors = [
    {name:'author first', age:'15', id:'1', bookId:'1'},
    {name:'author second', age:'16', id:'2', bookId:'1'},
    {name:'author third', age:'11', id:'3', bookId:'2'},
    {name:'author fouth', age:'19', id:'4', bookId:'3'},
    {name:'author Fifth', age:'41', id:'5', bookId:'4'},
    {name:'author Sixth', age:'18', id:'6', bookId:'4'},
    {name:'author Seventh', age:'15', id:'7', bookId:'5'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                //code to get data form db or local strage
               return _.find(authors,{id:parent.authorId});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //code to get data form db or local strage
               return _.filter(authors,{bookId:parent.id});
            }
        },
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type:BookType,
            resolve(parent,args){
                //code to get data form db or local strage
               return _.find(books,{id:parent.bookId});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //code to get data form db or local strage
               return _.filter(books,{authorId:parent.id});
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data form db or local strage
               return _.find(books,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //code to get data form db or local strage
               return books;
            }
        },
        author:{
            type:AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data form db or local strage
               return _.find(authors,{id:args.id});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //code to get data form db or local strage
               return authors;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});