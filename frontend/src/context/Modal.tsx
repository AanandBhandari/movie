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

export const GlobalModalContext = createContext<null | ContextType>(null);

const GlobalModalContextProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState("none");
  const [content, setContent] = useState(null);

  return (
    <GlobalModalContext.Provider
      value={{ visible, setVisible, content, setContent }}
    >
      {children}
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalContextProvider;
