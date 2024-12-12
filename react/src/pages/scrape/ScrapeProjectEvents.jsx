
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderDiv } from "../LoaderDiv";
import { ErrorDiv } from "../ErrorDiv";
import { getCeleryTask } from "../../resource/actions/CeleryTaskAction";
import { wrapper } from "../wrapper/Wrapper";
import ScrapeCard from "./ScrapeCard";

const ScrapeProjectEventsComponent = () => {
    const dispatch = useDispatch();
    const { cTaskLoader, cTaskError, cTaskData } = useSelector((state) => state.celeryTask);


    useEffect(() => {
        dispatch(getCeleryTask());
        return () => { }
    }, [dispatch])


    if (cTaskLoader)
        return (
            <LoaderDiv loadInfo={'Fetching celery tasks'} />
        )

    if (cTaskError)
        return (
            <ErrorDiv error={cTaskError} />
        )
    return (
        <div>
            <h2 className="pb-2 mb-5 border-bottom fs-4">Project Scrape History</h2>

            <div className="row">
                <p className="col-lg-8 fs-5">
                    <h1 className="text-body-emphasis">Jumia Scrape Events</h1>
                    The scrape events demonstrate a sample of data collected
                    during the scraping process of <a href="https://www.jumia.co.ke" className="">Jumia&acute;s online shop.</a><br />
                    This data collection is automated using a Python task scheduler and stored in
                    the database asynchronously. Here&acute;s a closer look at how it works:
                </p>
                <div className="col-lg-4 d-flex justify-content-center  order-1 order-lg-2">
                    <img src={`${import.meta.env.VITE_HOST_STATIC}images/scrape.png`} alt="features" style={{
                        height: "350px",
                    }} />
                </div>
            </div>
            <div className="row g-5 mb-5">
                <div className="col-md-6">
                    <h2 className="text-body-emphasis">Task Scheduler:</h2>
                    <p>Implemented in Python, the task
                        scheduler runs at predefined intervals to initiate the web scraping process.</p>

                </div>

                <div className="col-md-6">
                    <h2 className="text-body-emphasis">Asynchronous Storage</h2>
                    <p>The scraped data is
                        processed and saved to the database asynchronously, ensuring
                        that the system remains responsive and efficient even with large datasets.</p>

                </div>
            </div>
            {cTaskData &&
                <div className="row">
                    {cTaskData.map((task) => <ScrapeCard task={task} key={task.task_id} />)}
                </div>
            }
        </div>

    )
}

ScrapeProjectEventsComponent.propTypes = {}

export const ScrapeProjectEvents = wrapper(ScrapeProjectEventsComponent, "container mt-2");