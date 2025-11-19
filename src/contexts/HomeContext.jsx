import React from "react";

const HomeContext = React.createContext(null);

export function HomeProvider({ children }) {
  const [homeReady, setHomeReady] = React.useState(false);
  const [typedOnce, setTypedOnce] = React.useState(() => {
    try {
      return sessionStorage.getItem("magazineTyped") === "true";
    } catch (e) {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      sessionStorage.setItem("magazineTyped", typedOnce ? "true" : "false");
    } catch (e) {
      // ignore storage errors
    }
  }, [typedOnce]);

  return (
    <HomeContext.Provider
      value={{ homeReady, setHomeReady, typedOnce, setTypedOnce }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const ctx = React.useContext(HomeContext);
  if (!ctx) throw new Error("useHome must be used inside HomeProvider");
  return ctx;
}

export default HomeContext;
