import React, { useState, useEffect } from "react";
import "./global.css";
import { useProduct } from "vtex.product-context";
import { Button, Modal } from "vtex.styleguide";
import { ExtensionPoint } from "vtex.render-runtime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductAvailableProps {
  // children: any;
}

const PlacasCustom: StorefrontFunctionComponent<ProductAvailableProps> = () => {
  const productInfo = useProduct();
  const prodIMG = productInfo?.selectedItem?.images[0].imageUrl;

  const [showModal, setShowModal] = useState(false);
  const [customTextValue, setCustomTextValue] = useState("");
  const [placas, setplacas] = useState();
  const [pictogramas, setPictogramas] = useState("");
  const [pictogramasCategories, setPictogramasCategories] = useState();
  const [currentPictogramasCategories, setCurrentPictogramasCategories] =
    useState("");
  const [selectedPictogram, setSelectedPictogram] = useState("");
  const [pictogramImage, setPictogramImage] = useState("");
  const [customFontSize, setCustomFontSize] = useState("");

  /*Criar states de loading*/

  const pictogramsCategoryFetcher = async () => {
    let data = await fetch("/api/dataentities/CT/search?_fields=pictypename", {
      headers: {
        'REST-Range': 'resources=0-100' // ajusta o intervalo conforme necessário
      }
    });
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
    let data = await fetch(
      `/api/dataentities/PG/search?_fields=filename,ref&type=*${currentCat}*`
    );
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
              onChange={(e) => {
                selectedPictogramHandler(e, `/arquivos/${element.filename}`);
              }}
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
          <a
            key={element.items[0].itemId}
            className="list-item"
            href={element.link}
          >
            <img
              src={`/arquivos/ids/${element.items[0].images[0].imageId}-140-140/${element.items[0].images[0].imageId}.jpg`}
              alt=""
            />
          </a>
        );
      })
    );
  };

  const addAndCustomize = async () => {
    if (customTextValue.length > 0) {
      let orderForm = await fetch("/api/checkout/pub/orderForm");
      let orderFormResponse = await orderForm.json();
      let { orderFormId } = orderFormResponse;
      const current = [
        {
          index: orderFormResponse.items.length,
          id: productInfo?.selectedItem?.itemId,
          quantity: productInfo?.selectedQuantity,
          seller: "1",
        },
      ];
      const attachmentsInfo = {
        modelo: selectedPictogram,
        texto: customTextValue,
        pictograma: selectedPictogram,
        thumb: pictogramImage,
      };

      let data = await fetch(
        `/api/checkout/pub/orderForm/${orderFormId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ orderItems: current }),
        }
      );

      let attachments = await fetch(
        `/api/checkout/pub/orderForm/${orderFormId}/items/${orderFormResponse.items.length}/attachments/Personalização`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ content: attachmentsInfo, noSplitItem: true }),
        }
      );

      location.href = "/checkout/#/cart";
    } else {
      alert("Insira um texto na placa.");
    }
  };

  //EVENT HANDLERS
  const customtextHandler = (event: any) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9\s-/çáéíóúÁÉÍÓÚãõÃÕüÜÇâêîôûÂÊÎÛÔàèìòùÀÈÌÒÙ,|().?;=:!^`°ºª@#$%&*_+<>{}[\]\\]/g, '');
    setCustomTextValue(filteredValue);
  };

  const pictogramClassHandler = (event: any) => {
    setCurrentPictogramasCategories(event.target.value);
  };

  const selectedPictogramHandler = (event: any, img: string) => {
    setPictogramImage(img);
    setSelectedPictogram(event.target.value);
  };

  const clickPhotoOpens = () => {
    let imageArea: HTMLElement = document!.querySelector(
      ".vtex-store-components-3-x-productImageTag"
    ) as HTMLElement;

    imageArea.onclick = function () {
      let element: HTMLElement = document!.querySelector(
        ".vtex-flex-layout-0-x-flexRowContent--buy-area .vtex-button"
      ) as HTMLElement;
      element.click();
    };
  };

  useEffect(() => {
    placasAlternativasFetcher();
    pictogramsCategoryFetcher();
    clickPhotoOpens();
  }, []);

  useEffect(() => {
    pictogramFetcher(currentPictogramasCategories);
  }, [currentPictogramasCategories]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1200px)");

    if (mq.matches) {
      if (customTextValue.length <= 30) {
        setCustomFontSize("3.6vw");
      } else if (customTextValue.length > 30 && customTextValue.length <= 60) {
        setCustomFontSize("2.6vw");
      } else if (customTextValue.length > 60 && customTextValue.length <= 90) {
        setCustomFontSize("2.3vw");
      } else if (customTextValue.length > 90 && customTextValue.length <= 120) {
        setCustomFontSize("2vw");
      } else if (
        customTextValue.length > 120 &&
        customTextValue.length <= 150
      ) {
        setCustomFontSize("1.8vw");
      } else if (
        customTextValue.length > 150 &&
        customTextValue.length <= 190
      ) {
        setCustomFontSize("1.6vw");
      } else if (
        customTextValue.length > 190 &&
        customTextValue.length <= 220
      ) {
        setCustomFontSize("1.5vw");
      } else if (
        customTextValue.length > 220 &&
        customTextValue.length <= 280
      ) {
        setCustomFontSize("1.3vw");
      } else {
        setCustomFontSize("1.3vw");
      }
    } else {
      if (customTextValue.length <= 30) {
        setCustomFontSize("7.4vw");
      } else if (customTextValue.length > 30 && customTextValue.length <= 60) {
        setCustomFontSize("5.2vw");
      } else if (customTextValue.length > 60 && customTextValue.length <= 90) {
        setCustomFontSize("4.4vw");
      } else if (customTextValue.length > 90 && customTextValue.length <= 120) {
        setCustomFontSize("3.8vw");
      } else if (
        customTextValue.length > 120 &&
        customTextValue.length <= 150
      ) {
        setCustomFontSize("3.5vw");
      } else if (
        customTextValue.length > 150 &&
        customTextValue.length <= 190
      ) {
        setCustomFontSize("3.1vw");
      } else if (
        customTextValue.length > 190 &&
        customTextValue.length <= 220
      ) {
        setCustomFontSize("2.9vw");
      } else if (
        customTextValue.length > 220 &&
        customTextValue.length <= 280
      ) {
        setCustomFontSize("2.5vw");
      } else {
        setCustomFontSize("2.5vw");
      }
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
      <div className="placaCustomBtn">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Customizar placa
        </Button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        centered
        responsiveFullScreen
      >
        <div className="flex modal-custom-body">
          <div className="custom-prod-img  mv3 mh5">
            <div className="custom-text-simulation">
              <img src={pictogramImage} className="simulation-pictogram" />
              <span
                style={{ fontSize: customFontSize }}
                className={selectedPictogram && "has-pictogram"}
              >
                {customTextValue}
              </span>
            </div>

            <img src={prodIMG} />
            <div className="text-obs-container">
              <p className="obs-text-placa">
                *Nossa equipe ajustará o texto para melhor compreensão da
                sinalização.
              </p>
              <p className="obs-text-placa">
                ** Após finalizar a compra não será possível modificar quaisquer
                dados.
              </p>
            </div>
          </div>
          <div className="custom-prod-interface mv3 mh5">
            <p className="productName">{productInfo?.product?.productName}</p>

            <ExtensionPoint id="sku-selector"/>

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
              {pictogramas.length > 4 ? (
                <Slider {...settings}>{pictogramas}</Slider>
              ) : (
                <div className="fewer-options">{pictogramas}</div>
              )}
            </div>
            <div className="flex flex-column items-center w-100 buy-area-modal">
              <ExtensionPoint
                id="product-quantity"
                skuSelected={productInfo?.selectedItem}
              />

              <ExtensionPoint id="product-price" />
            </div>
            <span className="mb4">
              <div className="placaCustomBtnBuy">
                <Button variation="primary" onClick={addAndCustomize}>
                  COMPRAR
                </Button>
              </div>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlacasCustom;
