export function wrapper(WrappedComponent, style = "container mt-2") {

    const Wrapper = (props) => {

        return (
            <div className={`${style}`}>
                <div className="d-flex flex-row-reverse gap-2 mb-3 mx-3" >
                    <a href="https://github.com/mwangihub/django-scrape" target="_blank" className="text-decoration-none">
                        <span className="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill">
                            <i className="bi bi-github fs-4 me-1" /> Edit on github
                        </span>
                    </a>
                    <a href="/" className="text-decoration-none">
                        <span className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
                            <img className="rounded-circle me-1" width="20" height="20" src={`${import.meta.env.VITE_HOST_STATIC}images/profile.png`} alt="" />
                            Peter Mwangi
                        </span>
                    </a>

                </div>
                <WrappedComponent {...props} />
            </div>
        )
    };


    return Wrapper;
}

