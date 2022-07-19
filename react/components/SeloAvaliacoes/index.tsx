import React, { useEffect} from "react";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const SeloAvaliacoes: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {

    useEffect(() => {

    var script = document.createElement('script');
    script.setAttribute('src', 'https://cl.avis-verifies.com/br/widget4/widget01_FB3.min.js');
    
    document.body.appendChild(script);
    
 
      }, []);
  return (
    <>
    <div className="widgetCointainer">
      <meta
        className="netreviewsWidget"
        id="netreviewsWidgetNum3864"
        data-jsurl="https://cl.avis-verifies.com/br/cache/d/7/2/d726a728-f205-6ae4-7dd0-31bb2fe6e2c6/widget4/widget01-3864_script.js"
      />
      </div>
    </>
  );
};

export default SeloAvaliacoes;
