import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [messageText, setMessageText] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

   useEffect(() => {
    const storedUser = sessionStorage.getItem("userDetails");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); 
  const messageCloseFunc = () => {
    setTimeout(() => {
      setMessageOpen(false);
    }, 5000);
  };

  const handleSubmitSignUp = ({ name, email, password }) => {
    setSignUpLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://shop-now-backend-chi.vercel.app/api/auth/signup",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.succss == true) {
          setShowSignin(false);
          setSignUpSuccess(true);
          setMessageText("Signup successful.Please Login.");
          setMessageOpen(true);
          messageCloseFunc();
        }
      })
      .catch((error) => {
        setMessageText(result.message);
        setMessageOpen(true);
        messageCloseFunc();
      })
      .finally(() => setSignUpLoader(false));
  };

  const handleSubmitLogin = ({ email, password }) => {
    setSignUpLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api-hosting.vercel.app/api/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.succss == true) {
          setUser(result)
          sessionStorage.setItem("userDetails", JSON.stringify(result));
          setMessageText(result.message);
          setLoginSuccess(true)
          setMessageOpen(true);
          messageCloseFunc();
        }
      })
      .catch((error) => {
        setMessageText(result.message);
        setMessageOpen(true);
        messageCloseFunc();
      })
      .finally(() => setSignUpLoader(false));
  };

  const LogoutFunc = () => {
    setUser({});
    sessionStorage.removeItem("userDetails");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSubmitLogin,
        handleSubmitSignUp,
        LogoutFunc,
        setMessageText,
        setMessageOpen,
        messageOpen,
        messageText,
        setSignUpLoader,
        signUpLoader,
        setShowSignin,
        showSignin,
        loginSuccess,
        signUpSuccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
