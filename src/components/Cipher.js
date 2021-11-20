import React from "react";

import { Textarea, Div, Input, Icon, Button, Row, Col } from "atomize";

var CryptoJS = require("crypto-js");

function Cipher() {
  const [showSecret, setShowSecret] = React.useState(false);

  const [dtext, setDtext] = React.useState("");
  const [etext, setEtext] = React.useState("");
  const [skey, setSkey] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const encrypt = () => {
    setDisabled(true);
    if (dtext !== "") {
      var encrypted = CryptoJS.AES.encrypt(dtext, skey).toString();
      setEtext(encrypted);
    }
    setDisabled(false);
  };

  const decrypt = () => {
    setDisabled(true);
    if (etext !== "") {
      var decrypted = CryptoJS.AES.decrypt(etext, skey).toString(
        CryptoJS.enc.Utf8
      );
      setDtext(decrypted);
    }
    setDisabled(false);
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = etext;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Div h="auto" bg="success600" w="100vw">
      <Div p="2rem">
        <Textarea
          disabled={disabled}
          placeholder="Text"
          bg="gray400"
          h="10rem"
          value={dtext}
          onChange={(e) => {
            setDtext(e.target.value);
          }}
        />
      </Div>

      <Div p={{ x: "2rem", t: "1rem", b: "2rem" }}>
        <Input
          disabled={disabled}
          value={skey}
          onChange={(e) => {
            setSkey(e.target.value);
          }}
          placeholder="Secret Key"
          type={showSecret ? "text" : "password"}
          p={{ x: "2.5rem" }}
          bg="gray400"
          prefix={
            <Icon
              name="LockSolid"
              color="success800"
              size="16px"
              cursor="pointer"
              pos="absolute"
              top="50%"
              left="0.75rem"
              transform="translateY(-50%)"
            />
          }
          suffix={
            <Button
              pos="absolute"
              onClick={() => {
                setShowSecret(!showSecret);
              }}
              bg="transparent"
              w="3rem"
              top="0"
              right="0"
              rounded={{ r: "md" }}
            >
              <Icon
                name={showSecret ? "EyeSolid" : "Eye"}
                color={showSecret ? "danger800" : "success800"}
                size="16px"
              />
            </Button>
          }
        />
      </Div>

      <Row>
        <Col size={{ xs: "12", md: "6" }}>
          <Button
            disabled={disabled}
            onClick={() => {
              encrypt();
            }}
            prefix={
              <Icon name="Down" size="16px" color="white" m={{ r: "0.5rem" }} />
            }
            bg="info600"
            hoverBg="info800"
            rounded="circle"
            p={{ r: "1.5rem", l: "1rem" }}
            shadow="3"
            hoverShadow="4"
            m={{ x: "auto", y: "1rem" }}
          >
            Encrypt
          </Button>
        </Col>
        <Col size={{ xs: "12", md: "6" }}>
          <Button
            disabled={disabled}
            onClick={() => {
              decrypt();
            }}
            prefix={
              <Icon name="Up" size="16px" color="white" m={{ r: "0.5rem" }} />
            }
            bg="info600"
            hoverBg="info800"
            rounded="circle"
            p={{ r: "1.5rem", l: "1rem" }}
            shadow="3"
            hoverShadow="4"
            m={{ x: "auto", y: "1rem" }}
          >
            Decrypt
          </Button>
        </Col>
      </Row>

      <Div p={{ x: "2rem", t: "3rem" }}>
        <Textarea
          disabled={disabled}
          placeholder="Encrypted Text"
          bg="gray400"
          h="10rem"
          value={etext}
          onChange={(e) => {
            setEtext(e.target.value);
          }}
        />
      </Div>

      <Row p={{ b: "5rem", t: "1rem" }}>
        <Col size="12">
          <Button
            disabled={copied}
            onClick={() => {
              copyToClipboard();
            }}
            prefix={
              <Icon
                name={copied ? "Checked" : "Attachment"}
                size="16px"
                color="white"
                m={{ r: "0.5rem" }}
              />
            }
            bg="info600"
            hoverBg="info800"
            rounded="circle"
            p={{ r: "1.5rem", l: "1rem" }}
            shadow="3"
            hoverShadow="4"
            m={{ x: "auto", y: "1rem" }}
          >
            {copied ? "Copied !!!" : "Copy Encrypted Text"}
          </Button>
        </Col>
      </Row>
    </Div>
  );
}

export default Cipher;
