import { Link } from "react-router-dom";
import { ScrapedProductsCategory } from "../products/category/ScrapedProductsCategory";


export const SampleScarpedProducts = () => {

    return (
        <section id="app" className="features">
            <div className="container">
                <div className="section-title">
                    <h2 className="border-bottom my-2 pb-3">Scraped Jumia Products</h2>
                    <p>
                        {`Discover `}<span className="text-primary fw-bold">Jumia Products by category{" "}</span><br />
                        Check them out and see how data can reveal valuable insights about product performance and trends.
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Link to="/categories" className="download-btn">
                            <i className="bi bi-arrow-right" />
                            View all categories
                        </Link>
                    </div>

                    <div className="col-lg-8">
                        <ScrapedProductsCategory />
                    </div>
                </div>
            </div>
        </section>

    )
};

