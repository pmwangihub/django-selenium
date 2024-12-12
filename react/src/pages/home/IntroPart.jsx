import { Link } from "react-router-dom"

export const IntroPart = () => {
    return (
        <>

            <section id="hero" className="d-flex">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-lg-flex flex-lg-column  align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
                        >
                            <div>
                                <h1>Case Study: Products Price Change Analytics.</h1>
                                <h2> Dive into the world of data analytics with my curated sample products. Here,
                                    you can explore how I leverage data to extract insights, visualize trends,
                                    and make informed decisions. This portfolio demonstrates expertise in data
                                    analysis and interpretation to deliver actionable results.</h2>
                                <div className="row flex-column">
                                    <Link to="/categories" className="download-btn mb-3 mb-lg-2">
                                        <i className="bi bi-archive-fill"></i>Sample products
                                    </Link>
                                    <Link to="/login" className="download-btn mb-3 mb-lg-2">
                                        <i className="bi bi-person-fill"></i> Create account
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
                            data-aos="fade-up">
                            <img src={`${import.meta.env.VITE_HOST_STATIC}images/celery.png`} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>

            </section>







            <div className="row d-none">
                <div className="col-md-12">
                    <h2 className="py-2 mt-3  border-bottom">Project Overview</h2>

                    <div className="section-content">
                        <p>This project aims to showcase skills in <strong>database management</strong>, <strong>Python</strong>,
                            and <strong>JavaScript (React)</strong> through a real-world case study of price change analytics
                            for products on <a href="https://www.jumia.co.ke/" target="_blank" className="fw-bold text-decoration-none">Jumia</a>,
                            an online marketplace.</p>
                        <p>The key components of the project include:</p>
                        <ul>
                            <li><strong>Data Collection:</strong><br /><span>Web Scraping and Task Scheduler using python</span>
                            </li>
                            <li><strong>Database Management:</strong>
                                <br /><span>Asynchronous Data Storage and Database Design</span>
                            </li>
                            <li><strong>Data Analysis and Visualization:</strong>
                                <span className="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill mx-2">
                                    On progress
                                </span>
                                <br /><span>Data Analytics to uncover trends and insights in the
                                    pricing data and Interactive and dynamic visualizations using JavaScript (React) </span>
                            </li>
                            <li><strong>User Interaction:</strong>
                                <span className="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill mx-2">
                                    On progress
                                </span>
                                <br /><span>Account Creation and An intuitive dashboard allows users to explore the data </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}
