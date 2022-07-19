import React  from "react";
import { useProduct } from "vtex.product-context";

interface ProductAvailableProps {
    // children: any;
};

const AvaliacoesStars: StorefrontFunctionComponent<ProductAvailableProps> = () => {
    const productInfo = useProduct();


        return (
         <>
      <div className="NETREVIEWS_PRODUCT_STARS" data-product-id={`${productInfo?.product?.productId}`}></div>
   
         </>
        );
    };

export default AvaliacoesStars;