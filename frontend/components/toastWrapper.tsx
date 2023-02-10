"use client";

import { Toaster } from "react-hot-toast";

function ToastWrapper() {
  return <Toaster toastOptions={{ position: "bottom-right" }} />;
}

export default ToastWrapper;
