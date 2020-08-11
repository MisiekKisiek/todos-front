import React from 'react';

const UserPanel = () => {
    return (<>
        <div className="user-panel">
            <div className="user-panel__wrap">
                <div className="user-panel__photo">
                    <img src={require('../img/user.png')} alt="userphoto" />
                </div>
                <div className="user-panel__login">
                    User:<span> {localStorage.getItem('user')}</span>
                </div>
                <div className="user-panel__email">
                    e-mail:<span> {localStorage.getItem('email')}</span>
                </div>
            </div>
        </div>
    </>);
}

export default UserPanel;