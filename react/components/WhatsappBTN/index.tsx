import React from "react";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const WhatsappBTN: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  return (
    <>
 <a href="https://wa.me/5511930041270" id="btn-wpp" target="_blank" ><img src="/arquivos/wpp-icon.png" alt="Whatsapp"/></a>
    </>
  );
};

export default WhatsappBTN;
