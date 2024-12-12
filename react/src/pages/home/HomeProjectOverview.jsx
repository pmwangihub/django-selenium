// import React from 'react'
// import PropTypes from 'prop-types'

export const HomeProjectOverview = () => {
    return (
        <section id="project_features" className="project_features d-flex align-items-center">

            <div className="container">
                <div className="section-title">
                    <h2 className="border-bottom my-2 pb-3">Project Overview</h2>
                </div>


                <div className="row no-gutters">
                    <div className="col-xl-8 d-flex align-items-stretch order-2 order-lg-1">
                        <div className="content d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                                    <i className="excel bx bxs-spreadsheet"></i>
                                    <h4>Excel VLOOKUP</h4>
                                    <p>Applied Excel VLOOKUP to compare and match data during analysis for deeper insights.</p>
                                </div>

                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                    <i className="text-warning bx bxl-python"></i>
                                    <h4>Python Backend</h4>
                                    <p>Leveraged Python for web scraping, task scheduling, and data processing to automate price tracking
                                    </p>
                                </div>
                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                                    <i className="text-danger bx bxs-data"></i>
                                    <h4>Redis Server</h4>
                                    <p>
                                        Used Redis for caching and handling asynchronous tasks to improve performance
                                    </p>
                                </div>
                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                                    <i className="text-success bx bxs-check-shield"></i>
                                    <h4>Authentication and Security</h4>
                                    <p>Implemented secure authentication mechanisms to prevent brute-force attacks, ensuring data protection and user security</p>
                                </div>
                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                                    <i className="nginx bx bxl-steam"></i>
                                    <h4>Nginx Proxy Server</h4>
                                    <p>Configured Nginx as a reverse proxy to handle web traffic, providing load balancing and improving security</p>
                                </div>
                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                                    <i className="text-primary bx bxl-react"></i>
                                    <h4>React Frontend</h4>
                                    <p>Built a dynamic, user-friendly dashboard using React for data visualization and interaction</p>
                                </div>

                                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                                    <i className=" bx bxl-tux"></i>
                                    <h4>Linux Command Tools</h4>
                                    <p>Employed Linux commands for server management, task automation, and process monitoring</p>
                                </div>
                                <div className="col-md-6 icon-box" data-aos="fade-up">
                                    <i className='postgres bx bxl-postgresql' />
                                    <h4>Database Management</h4>
                                    <p>
                                        Utilized PostgreSQL to store and manage scraped data, ensuring efficient retrieval and scalability
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="image col-xl-4 col-sm-12 d-flex align-items-stretch justify-content-center order-1 order-lg-2">
                        <img src={`${import.meta.env.VITE_HOST_STATIC}images/features.png`} className="img-fluid" alt="features" />
                    </div>
                </div>

            </div>

        </section>


    )
}

// HomeProjectOverview.propTypes = {}

// export default HomeProjectOverview