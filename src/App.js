import React from "react";

import Cipher from "./components/Cipher";

// var CryptoJS = require("crypto-js");

function App() {
  // encryption
  // var encrypted = CryptoJS.AES.encrypt("message", "key").toString();

  // decryption
  // var decrypted = CryptoJS.AES.decrypt(encrypted, "key").toString(
  //   CryptoJS.enc.Utf8
  // );

  return (
    <div>
      <Cipher />
    </div>
  );
}

export default App;
