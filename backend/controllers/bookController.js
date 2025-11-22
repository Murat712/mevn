import mongoose from "mongoose";
import Book from "../models/Book.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        console.error("error at get book", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getOneBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'object id is not valid' });
    }

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "Book is not exist" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("error at get one book", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const createBook = async (req, res) => {
    console.log("book");
    try {
        const { title, author } = req.body;
        const existingBook = await Book.findOne({ title, author });

        if (existingBook) {
            return res.status(400).json({ error: "A book with same title and author already exist" });
        }

        const newBook = await Book.create(req.body);
        return res.status(201).json({ message: "Book created succesfully", book: newBook });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const ValidationErrors = {}

            for (let field in error.errors) {
                ValidationErrors[field] = error.errors[field].message;
            }

            return res.status(400).json({ error: "Validation Error", ValidationErrors });
        }
        else {
            console.error("error at creating book", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, pageNumber, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'object id is not valid' });
    }

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "Book is not exist" });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;
        book.rating = rating || book.rating;

        await book.save();

        res.status(200).json({ message: "Book updated succesfully" });
    } catch (error) {
        console.error("error at update book", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!book) {
        return res.status(404).json({ error: "Book is not exist" });
    }

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "Book is not exist" });
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("error at delete book", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export { getAllBooks, createBook, getOneBook, updateBook, deleteBook }