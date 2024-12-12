import ContactAddress from "./ContactAddress"
import ContactForm from "./ContactForm"

// import PropTypes from 'prop-types';

export const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2 className="border-bottom my-2 pb-3">Contact me</h2>
                    <p className="fw-normal col-lg-8">
                        <b>{`Let us Work Together! `}</b>Fill out the form below to get in touch.
                        Whether you&acute;re looking for a complete web solution or IT consulting services,
                        I&acute;m here to help. I&acute;ll get back to you within 24 hours to discuss your needs and how I can provide tailored solutions for your business.
                    </p>
                </div>
                <div className="row">
                    <ContactForm />
                    <ContactAddress />
                </div>
            </div>
        </section>
    )
}

Contact.propTypes = {}

export default Contact