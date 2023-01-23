import React, { useEffect } from "react";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const CSSWorkaround: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  useEffect(() => {
    let meta = document.createElement("meta");
    meta.setAttribute("class", "netreviewsWidget");
    meta.setAttribute("id", "netreviewsWidgetNum3863");
    meta.setAttribute(
      "data-jsurl",
      "https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/widget4/widget10-right-3863_script.js"
    );

    document.body.appendChild(meta);

    var script2 = document.createElement("script");
    script2.setAttribute(
      "src",
      "https://cl.avis-verifies.com/br/widget4/widget10_FB3.min.js"
    );

    document.body.appendChild(script2);

    var script3 = document.createElement("script");
    script3.setAttribute(
      "src",
      "https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/AWS/PRODUCT_API/tag.min.js"
    );

    document.body.appendChild(script3);

    var script_tag = document.createElement("script");
    script_tag.type = "text/javascript";
    script_tag.text = `
var smarthintkey = "SH-561147";
(function () {  
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://service.smarthint.co/Scripts/i/Vtex.IO.min.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);

})();
`;
    document.body.appendChild(script_tag);

    var hotjar = document.createElement("script");
    hotjar.type = "text/javascript";
    hotjar.text = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3316726,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`;
    document.body.appendChild(hotjar);


    
    var Clarity = document.createElement("script");
    Clarity.type = "text/javascript";
    Clarity.text = `
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=gtm2";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","ezzu5fossq");
`;
    document.body.appendChild(Clarity);
  }, []);

  return <></>;
};

export default CSSWorkaround;
