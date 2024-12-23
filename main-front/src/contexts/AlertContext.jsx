import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { createPortal } from "react-dom";
import Alert from "../components/shared/Alert";

const Context = createContext(undefined);

export function AlertContextProvider({ children }) {
  const [alertState, setAlertState] = useState({
    open: false,
    isCancle: false,
    title: null,
    description: null,
  });

  const $portal_root = document.getElementById("root-portal");

  const close = useCallback(() => {
    setAlertState({
      open: false,
      isCancle: false,
      title: null,
      description: null,
    });
  }, []);

  const open = useCallback(
    ({ onButtonClick, onCancleClick, ...options }) => {
      setAlertState({
        ...options,
        onButtonClick: () => {
          close();
          onButtonClick();
        },
        onCancleClick: () => {
          close();
          onCancleClick();
        },
        open: true,
      });
    },
    [close]
  );

  const values = useMemo(() => ({ open }), [open]);

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null ? createPortal(<Alert {...alertState} />, $portal_root) : null}
    </Context.Provider>
  );
}

export function useAlertContext() {
  const values = useContext(Context);

  if (values == null) {
    throw new Error("AlertContext 내부에서 사용해주세요");
  }

  return values;
}
