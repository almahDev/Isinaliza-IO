import React, { useEffect} from "react";
import "./global.css";
interface ProductAvailableProps {
    // children: any;
};

const CSSWorkaround: StorefrontFunctionComponent<ProductAvailableProps> = () => {
    useEffect(() => {

        

        let meta = document.createElement('meta');
        meta.setAttribute('class', 'netreviewsWidget');
        meta.setAttribute('id', 'netreviewsWidgetNum3863');
        meta.setAttribute('data-jsurl', "https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/widget4/widget10-right-3863_script.js");
      
    document.body.appendChild(meta);
    
    
    
    var script2 = document.createElement('script');
    script2.setAttribute('src', 'https://cl.avis-verifies.com/br/widget4/widget10_FB3.min.js');
    
    document.body.appendChild(script2);
    
    var script3 = document.createElement('script');
    script3.setAttribute('src', 'https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/AWS/PRODUCT_API/tag.min.js');
    
    document.body.appendChild(script3);


    var smarthintkey = "SH-561147";
    (function () {  
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://service.smarthint.co/Scripts/i/Vtex.IO.min.js';
        var s = document.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(script, s);
  
    })();

     
          }, []);

        return (
         <>
   
         </>
        );
    };

export default CSSWorkaround;