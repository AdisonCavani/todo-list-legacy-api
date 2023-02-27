"use client";

import { Toaster } from "react-hot-toast";

function ToastWrapper() {
  return (
    <Toaster
      toastOptions={{ position: "bottom-right", className: "font-semibold" }}
    />
  );
}

export default ToastWrapper;
