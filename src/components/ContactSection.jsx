import React from 'react';

const ContactSection = () => {
    return (
        <section className="contact-area section-padding-100 bg-img bg-overlay bg-fixed has-bg-img" style={{ backgroundImage: 'url(/img/bg-img/bg-2.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading white wow fadeInUp" data-wow-delay="100ms">
                            <p>See what’s new</p>
                            <h2>Get In Touch</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {/* Contact Form Area */}
                        <div className="contact-form-area">
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="form-group wow fadeInUp" data-wow-delay="100ms">
                                            <input type="text" className="form-control" id="name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="form-group wow fadeInUp" data-wow-delay="200ms">
                                            <input type="email" className="form-control" id="email" placeholder="E-mail" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group wow fadeInUp" data-wow-delay="300ms">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group wow fadeInUp" data-wow-delay="400ms">
                                            <textarea name="message" className="form-control" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center wow fadeInUp" data-wow-delay="500ms">
                                        <button className="btn oneMusic-btn mt-30" type="submit">Send <i className="fa fa-angle-double-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
