// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC065TVIqadZfzSI8bVWlsUgYegZGSDlVE",
  authDomain: "xn--11by0j.firebaseapp.com",
  projectId: "xn--11by0j",
  storageBucket: "xn--11by0j.appspot.com",
  messagingSenderId: "741657005267",
  appId: "1:741657005267:web:df87c536920798cf8b9826"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);