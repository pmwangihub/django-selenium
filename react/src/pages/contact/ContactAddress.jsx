


export const ContactAddress = () => {
    return (
        <div className="col-lg-6">
            <div className="row">
                <div className="col-lg-6 info">
                    <i className="text-danger bx bxs-map" />
                    <h4>Address</h4>
                    <p>Nairobi, Kenya</p>
                </div>
                <div className="col-lg-6 info">
                    <i className='text-primary bx bxs-phone-incoming' />
                    <h4>Call me</h4>
                    <p>+254 724 773 426</p>
                </div>
                <div className="col-lg-6 info">
                    <i className='text-success bx bxl-gmail' />
                    <h4>My Email</h4>
                    <p>pminnovest@gmail.com</p>
                </div>
                <div className="col-lg-6 info">
                    <i className='text-warning bx bxs-time' />
                    <h4>Availability Hours</h4>
                    <p>Mon - Fri: 9AM to 5PM<br />Sunday: 9AM to 1PM<br /><strong>East Africa time</strong></p>
                </div>
            </div>
        </div>
    )
}



export default ContactAddress