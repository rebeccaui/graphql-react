// Describes object types, relations between the object types, and how we can reach in and interact with the data. 

const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//================//
//  Object Types  //
//================//

// Define object type and its fields
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            // The parent is the book that is found
            resolve(parent, args){
                console.log(parent);
                console.log("Author of certain book found.");
                // return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

// Define object type and its fields
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);
                console.log("All books written by " + parent.name + " found.");
                // return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

//================//
//  Root Queries  //
//================//

// Root Queries describe how the user can go into the data graph and grab it 
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Query for a particular book
        book: {
            type: BookType,
            // The arguments that are passed through the query
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // Code to to get data from DB/source
                // Find and return any books with an id that matches the id that was passed as an argument
                console.log(typeof(args.id)); // returns string
                // return _.find(books, {id: args.id});
            }
        },
        // Query for a particular author
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                console.log("Author Search executed.");
                // return _.find(authors, {id: args.id});
            }
        },
        // Query for a list of all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
            }
        },
        // Query for a list of all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // Initial root query
    query: RootQuery
});