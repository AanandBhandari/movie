import React, { createContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

export interface ContextType {
  visible: string;
  setVisible: React.Dispatch<any>;
  content: null | any;
  setContent: React.Dispatch<any>;
}

export const ModalContext = createContext<null | ContextType>(null);

const ModalContextProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState("none");
  const [content, setContent] = useState(null);

  return (
    <ModalContext.Provider value={{ visible, setVisible, content, setContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
