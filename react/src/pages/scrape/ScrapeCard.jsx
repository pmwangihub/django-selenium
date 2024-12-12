
import PropTypes from 'prop-types'
import React, { useState } from 'react';

const ScrapeCard = React.memo(({ task }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="col-lg-6 card border-0 px-2 ">

            <div className="card mb-3 fs-6">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Task ID: </strong>{task.task_id}
                    </div>
                    <span className={`badge ${task.status === 'SUCCESS' ? 'bg-success' : 'bg-danger'}`}>
                        {task.status}
                    </span>
                </div>

                <div className="card-body">
                    <div>
                        <strong>Content Type: </strong>{task.content_type || 'N/A'}
                    </div>
                    <div>
                        <strong>Worker: </strong>{task.worker || 'N/A'}
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseResult${task.task_id}`}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? 'Hide Details' : 'Show Details'}
                    </button>
                    <div className={`collapse mt-3 ${open ? 'show' : ''}`} id={`collapseResult${task.task_id}`}>
                        <code>{JSON.stringify(task.result)}</code>
                    </div>
                </div>
            </div>
        </div>
    )
})
ScrapeCard.displayName = "ScrapeCard"
ScrapeCard.propTypes = {
    task: PropTypes.object.isRequired
}

export default ScrapeCard