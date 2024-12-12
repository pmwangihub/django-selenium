import { useNavigate } from 'react-router-dom';
import { profileWrapper } from "./ProfileWrapper";
import { FormScrapeUrlParams } from "./scrape/FormScrapeUrlParams";
import { FormScrapeUrl } from "./scrape/FormScrapeUrl";

export const JumiaScrapeComponent = () => {

    const navigate = useNavigate();

    const goBack = (event) => {
        event.preventDefault();
        return navigate(-1);
    };

    return (
        <>
            <header className="d-flex pb-3 mb-4">
                <a onClick={goBack} className="d-flex align-items-center text-dark text-decoration-none">
                    <i className="bi bi-arrow-left me-3" />
                </a>
                <h3 className='text-danger'>Requires Admin Privileges</h3>
            </header>

            <div className="card border-0 border-top border-end rounded-0">
                <div className="card-body">
                    <h5 className="small mb-5">Scrape Jumia with <b>url params</b></h5>
                    <FormScrapeUrlParams />
                </div>
            </div>

            <div className="card border-0 border-top border-end rounded-0 mb-5">
                <div className="card-body">
                    <h5 className="small mb-5">Scrape Jumia with <b>specific url</b></h5>
                    <FormScrapeUrl />
                </div>
            </div>

        </>
    );
};

export const JumiaScrape = profileWrapper(JumiaScrapeComponent);
