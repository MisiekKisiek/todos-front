import React, { Component } from 'react';
import Logged from '../components/MainPageLogged'

class MainPage extends Component {
    state = {}
    render() {
        return (<>
            <main className="main">
                <Logged></Logged>
            </main>
        </>);
    }
}

export default MainPage;