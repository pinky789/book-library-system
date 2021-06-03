import React from 'react';
import './App.css';
import AppHeader from './Components/AppHeader';
import AppContent from './Components/AppContent';

const App = () =>{

    return (
        <div className="container" >
            <div className="book-library-header">
                <AppHeader />
            </div>
            <AppContent />
        </div>
    );
}

export default App;
