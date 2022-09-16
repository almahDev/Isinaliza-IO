import React, { useEffect,useState }  from "react";
import { useProduct } from "vtex.product-context";

interface ProductAvailableProps {
    // children: any;
};

const AvaliacoesProd: StorefrontFunctionComponent<ProductAvailableProps> = () => {
    const productInfo = useProduct();
    const [url, setURL] = useState('');



useEffect(() => {
    setURL(window?.location.href);

    let meta = document.createElement('meta');
    meta.setAttribute('class', 'netreviewsWidget');
    meta.setAttribute('id', 'netreviewsWidgetNum3863');
    meta.setAttribute('data-jsurl', "https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/widget4/widget10-right-3863_script.js");
  
document.body.appendChild(meta);



var script = document.createElement('script');
script.setAttribute('src', 'https://cl.avis-verifies.com/br/widget4/widget10_FB3.min.js');

document.body.appendChild(script);

var script2 = document.createElement('script');
script2.setAttribute('src', 'https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/AWS/PRODUCT_API/tag.min.js');

document.body.appendChild(script2);
 
  }, []);

        return (
         <>
         <div  className="NETREVIEWS_PRODUCT_REVIEWS" data-product-id={`${productInfo?.product?.productId}`} data-product-price={`${productInfo?.product?.priceRange?.sellingPrice?.lowPrice}`} data-product-name={`${productInfo?.product?.productName}`} data-product-url={`${url}`} data-product-img-url={`${productInfo?.selectedItem?.images[0].imageUrl}`}></div>




         </>
        );
    };

export default AvaliacoesProd;