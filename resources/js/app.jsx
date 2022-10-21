import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import bookApi from "./api/bookApi";
import Welcome from "./welcome";

function App(){
    useEffect(() => {
        const fetchBooks = async () => {
            const books = await bookApi.getBooks();
            console.log(books);
        }
        fetchBooks();
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </div>
    );
}

export default App;