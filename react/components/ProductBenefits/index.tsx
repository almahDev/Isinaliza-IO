import React from "react";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const ProductBenefits: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  return (
    <>
      <div className="under-img">
        <ul>
          <li>
            <img src="/arquivos/trofeu.svg" />
            <span>Aprovado pelas normas técnicas vigentes</span>
          </li>
          <li>
            <img src="/arquivos/medal.svg" />
            <span>5 anos de garantia</span>
          </li>
          <li>
            <img src="/arquivos/escudo.svg" /> <span>Compra segura</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductBenefits;
