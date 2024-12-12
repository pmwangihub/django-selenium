import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Api } from "../../../api";


export const FormScrapeUrlParams = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        category: '',
        pages: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        Api.jumiaScrape(formData)
            .then((response) => {
                setMessage(response.data)
                setLoading(false)
            }).catch((err) => {
                setError(err.message)
                setLoading(false)
            });
    };

    return (
        <form onSubmit={handleSubmit} className='my-3'>

            {message && <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong className="me-2">Success</strong>{JSON.stringify(message)}
                <button type="button" className="btn-close" onClick={() => setMessage(null)} />
            </div>
            }

            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong className="me-2">Error</strong>{JSON.stringify(error)}
                <button type="button" className="btn-close" onClick={() => setError(null)} />
            </div>
            }


            <div className="row g-3">
                <div className="col-lg-6">
                    <TextField
                        required
                        id="outlined-basic"
                        name="category"
                        type='text'
                        label="Url param"
                        variant="outlined"
                        value={formData.url}
                        onChange={handleChange}
                        sx={{
                            width: "100%"
                        }}

                    />
                    <div className='d-inline'>
                        <small className='fw-bold d-flex my-2'>Examples</small>
                        <span className="badge  p-1 pe-2 bg-light-subtle" style={{ color: "#000" }}>
                            <a href='tablets' onClick={handleCopy}> <i className="bi bi-copy me-1" /></a> tablets
                        </span>
                        <span className="badge  p-1 pe-2 bg-light-subtle" style={{ color: "#000" }}>
                            <a href='fashion' onClick={handleCopy}> <i className="bi bi-copy me-1" /></a> fashion
                        </span>
                        <span className="badge  p-1 pe-2 bg-light-subtle" style={{ color: "#000" }}>
                            <a href='clothes' onClick={handleCopy}> <i className="bi bi-copy me-1" /></a> clothes
                        </span>

                    </div>
                </div>

                <div className="col-lg-6">
                    <TextField
                        required
                        id="outlined-basic"
                        name="pages"
                        type='number'
                        max='3'
                        min='0'
                        label="Pages"
                        variant="outlined"
                        value={formData.pages}
                        onChange={handleChange}
                        sx={{
                            width: "100%"
                        }}
                        inputProps={{
                            max: 3,
                            min: 0
                        }}
                    />
                    <div className='d-inline'>
                        <small className='fw-bold d-flex my-2'>Min of 1 and Max of 3</small>
                    </div>

                </div>


            </div>

            <button disabled={loading} className="btn btn-success my-3 px-4 d-flex" type="submit">
                {loading && <div className="spinner-border text-dark me-2" style={{ height: "1.5rem", width: "1.5rem" }} />}
                Scrape with url params
            </button>

        </form>
    )
}

const handleCopy = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("text-success");
    event.currentTarget.parentElement.classList.add("text-success");
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = event.currentTarget.getAttribute('href');
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
};
