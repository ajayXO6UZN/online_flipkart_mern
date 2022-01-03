import React from "react";
import NotFound from "../../components/Notfound/Notfound";
import getParams from "../../utils/getParams";
import ProductList from "./ProductList";
import ProductListSlider from "./ProductListSlider";
import ProductStore from "./ProductStore";


/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":

        content = <ProductStore {...props} />;
        break;
      case "search":
        content = <ProductList {...props} />;
        break;
        case "deals":
          content = <ProductList {...props} />;
          break;
      case "page":
        content = <ProductList {...props} />;
        break;
      default:
        content = <NotFound />;
    }

    return content;
  };

  return renderProduct();
};

export default ProductListPage;
