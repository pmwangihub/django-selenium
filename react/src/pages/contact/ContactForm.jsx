
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Api } from '../../api';
import { useState } from 'react';

export const ContactForm = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.target);
        Api.contactMe(formData)
            .then((response) => {
                if (response.status === 200) {
                    setSuccess("Thank you for your message. I will be in touch soon")
                }
            }).catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false);
                event.target.reset()
            })
    }

    return (
        <div className="col-lg-6 ">
            {success && <SuccessAlert success={success} />}
            {error && <ErrorAlert error={error} />}
            <form className="php-email-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <TextField id="standard-basic" label="Email" type="email" name="email" variant="standard" sx={{ width: "100%" }} required />
                </div>
                <div className="form-group mt-3">
                    <TextField id="standard-basic" label="Subject" type="text" name="subject" variant="standard" sx={{ width: "100%" }} />
                </div>

                <div className="form-group mt-3">
                    <MaxHeightTextarea />
                </div>

                <button type="submit" className="download-btn mt-3 border-0">
                    {!loading && <><i className="bi bi-envelope-fill"></i> Send message</>}
                    {loading && <><i><SmallSpinner /></i> Sending ...</>}
                </button>
            </form>
        </div>
    )
}

const SmallSpinner = () => (<div className="spinner-border text-white"
    style={{
        width: "20px",
        height: "20px",
        borderWidth: " 1px",
    }}
/>)

const SuccessAlert = ({ success }) => (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
        <strong>{success}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
)

const ErrorAlert = ({ error }) => (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{error}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
)

SuccessAlert.propTypes = {
    success: PropTypes.string,
}
ErrorAlert.propTypes = {
    error: PropTypes.string,
}

const MaxHeightTextarea = () => {

    const Textarea = styled(BaseTextareaAutosize)(() => `
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #B0B8C4;
    margin-top: 20px;
    &:focus {
      border-color: #B0B8C4;
      box-shadow: 0 0 0 1px blue;
    }
    &:focus-visible {
      outline: 0;
    }
  `,
    );

    return (
        <Textarea
            minRows={7}
            placeholder="Message"
            name="message"
            required
        />
    );
}

export default ContactForm; 