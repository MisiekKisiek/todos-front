import React from "react";

const MessagesCourtine = ({ handleMessagePopup }) => {
  return (
    <>
      <div className="courtine">
        <div
          className="courtine__courtine"
          onClick={(e) => {
            e.preventDefault();
            handleMessagePopup("");
          }}
        ></div>
        <div className="courtine__wrap-message">
          <h2 className="courtine__header">Message</h2>
          <div className="courtine__message"></div>
          <form className="courtine__form">
            <button
              className="courtine__btn"
              onClick={(e) => {
                e.preventDefault();
                handleMessagePopup("");
              }}
            >
              Ok!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessagesCourtine;
