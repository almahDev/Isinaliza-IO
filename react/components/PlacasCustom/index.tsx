import React, { useState, useEffect} from "react";
import { useProduct } from "vtex.product-context";
import { Button, Modal } from "vtex.styleguide";
import { ExtensionPoint } from "vtex.render-runtime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./global.css";

interface ProductAvailableProps {
  // children: any;
}

const PlacasCustom: StorefrontFunctionComponent<ProductAvailableProps> = () => {
  const productInfo = useProduct();
  const prodIMG = productInfo?.selectedItem?.images[0].imageUrl;

  const [showModal, setShowModal] = useState(false);
  const [customTextValue, setCustomTextValue] = useState("");
  const [placas, setplacas] = useState();
  const [pictogramas, setPictogramas] = useState();
  const [pictogramasCategories, setPictogramasCategories] = useState();
  const [currentPictogramasCategories, setCurrentPictogramasCategories] = useState("");
  const [selectedPictogram, setSelectedPictogram] = useState();
  const [pictogramImage, setPictogramImage] = useState("");
  const [customFontSize, setCustomFontSize] = useState("");
  
/*Criar states de loading*/


  const pictogramsCategoryFetcher = async () => {
    let data = await fetch(
      "/api/dataentities/CT/search?_fields=pictypename&_sort=pictypename ASC"
    );
    let response = await data.json();
    setPictogramasCategories(
      response.map((element: any) => {
        return (
          <option value={element.pictypename}>{element.pictypename}</option>
        );
      })
    );
  };

  const pictogramFetcher = async (currentCat: any) => {
    let data = await fetch(`/api/dataentities/PG/search?_fields=filename,ref&type=*${currentCat}*`);
    let response = await data.json();

    setPictogramas(
      response.map((element: any) => {
        return (
          <fieldset className="list-item">
            <input
              name="pictograma"
              type="radio"
              value={element.ref}
              id={`pic-${element.ref}`}
              onChange={(e)=>{selectedPictogramHandler(e,`/arquivos/${element.filename}`)}}
            />
            <label htmlFor={`pic-${element.ref}`}>
              <img src={`/arquivos/${element.filename}`} />
            </label>
          </fieldset>
        );
      })
    );
  };

  const placasAlternativasFetcher = async () => {
    let data = await fetch(
      "/api/catalog_system/pub/products/search/?fq=C:2&_from=0&_to=39"
    );
    let response = await data.json();

    setplacas(
      response.map((element: any) => {
        return (
          <a key={element.items[0].itemId} className="list-item" href={element.link}>
            <img src={`/arquivos/ids/${element.items[0].images[0].imageId}-140-140/${element.items[0].images[0].imageId}.jpg`} alt="" />
          </a>
        );
      })
    );
  };

  const customtextHandler = (event: any) => {
    setCustomTextValue(event.target.value);
  };

  const pictogramClassHandler = (event: any) => {
    setCurrentPictogramasCategories(event.target.value);
  };

  const selectedPictogramHandler = (event:any, img:string) =>{
    console.log(event.target.value);
    console.log(img)
    setPictogramImage(img)
    setSelectedPictogram(event.target.value)
   
  }

  useEffect(() => {
    placasAlternativasFetcher();
    pictogramsCategoryFetcher();
  }, []);

  useEffect(() => {
    pictogramFetcher(currentPictogramasCategories);
  }, [currentPictogramasCategories]);


  useEffect(() => {
   
      if(customTextValue.length <= 30){
        setCustomFontSize("3.5vw")
      } 
      else if (customTextValue.length > 30 && customTextValue.length <= 60){
        setCustomFontSize("2.5vw")
      }
      else if (customTextValue.length > 60 && customTextValue.length <= 90){
        setCustomFontSize("2.3vw")
      }
      else if (customTextValue.length > 90 && customTextValue.length <= 120){
        setCustomFontSize("1.8vw")
      }
      else if (customTextValue.length > 120 && customTextValue.length <= 150){
        setCustomFontSize("1.7vw")
      }
      else if (customTextValue.length > 150 && customTextValue.length <= 190){
        setCustomFontSize("1.5vw")
      }
      else if (customTextValue.length > 190 && customTextValue.length <= 220){
        setCustomFontSize("1.4vw")
      }
      else if (customTextValue.length > 220 && customTextValue.length <= 280){
        setCustomFontSize("1.3vw")
      } else{
        setCustomFontSize("1.2vw")
      }
    
    
  }, [customTextValue]);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <Button
        className="placaCustomBtn"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Customizar placa
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        centered
        responsiveFullScreen
      >
        <div className="flex">
          <div className="custom-prod-img  mv3 mh5">
            <div className="custom-text-simulation">
            <img src={pictogramImage} style={{"width": "7.8vw"}}/>
            <span  style={{"fontSize": customFontSize}} className={selectedPictogram && "has-pictogram"}>{customTextValue}</span>
           
            </div>
            
            <img src={prodIMG} />

            
          </div>
          <div className="custom-prod-interface mv3 mh5">
            <p className="productName">{productInfo?.product?.productName}</p>

            <ExtensionPoint id="sku-selector" />

            <textarea
              value={customTextValue}
              onChange={customtextHandler}
              id="story"
              name="story"
              rows={5}
              cols={65}
              placeholder="INSIRA O TEXTO"
              className="customTextForm"
              maxLength={300}
            />

            <Slider {...settings}>{placas}</Slider>

            <select
              id="select-pictograma"
              name="select-pictograma"
              onChange={pictogramClassHandler}
            >
              {pictogramasCategories}
            </select>
            <div className="list-pictograma">
              {/* to do: Não renderizar o slider quando for até 4 items*/ }
            <Slider {...settings}>{pictogramas}</Slider>
              
              </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlacasCustom;
