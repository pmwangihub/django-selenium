
import { ScrapedProductsCategory } from "./category/ScrapedProductsCategory";
import { wrapper } from "../wrapper/Wrapper";
import { PageNavBar } from "./PageNavBar";


const ProductsCategoryComponent = () => {

    return (
        <>
            <PageNavBar current={'Scraped Products Categories'} />
            <ScrapedProductsCategory />
        </>
    );
};

export const ProductsCategory = wrapper(ProductsCategoryComponent)

