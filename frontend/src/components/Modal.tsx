import React, { useContext } from "react";
import { Context } from "../context";

const Modal = () => {
  const { visible, content, setVisible, setContent } = useContext<any>(Context);

  return (
    <div id="myModal" className="modal" style={{ display: visible }}>
      <div className="modal__content">
        {content ? (
          <>
            <div className="modal__header">
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setVisible("none");
                  setContent(null);
                }}
              >
                &times;
              </span>
            </div>
            <div className="modal__body">
              <img
                src={content.image}
                alt={content.name}
                className="modal__image"
              />
              <div className="modal__description">
                <h2>{content.name}</h2>
                <p>{content.description}</p>
              </div>
            </div>{" "}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Modal;
