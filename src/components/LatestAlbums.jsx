import React from 'react';

const LatestAlbums = () => {
    return (
        <section className="latest-albums-area section-padding-100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading style-2">
                            <p>See what’s new</p>
                            <h2>Latest Albums</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9">
                        <div className="ablums-text text-center mb-70">
                            <p>Nam tristique ex vel magna tincidunt, ut porta nisl finibus. Vivamus eu dolor eu quam varius rutrum. Fusce nec justo id sem aliquam fringilla nec non lacus. Suspendisse eget lobortis nisi, ac cursus odio. Vivamus nibh velit, rutrum at ipsum ac, dignissim iaculis ante. Donec in velit non elit pulvinar pellentesque et non eros.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="albums-slideshow owl-carousel">
                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a1.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>The Cure</h5>
                                    </a>
                                    <p>Second Song</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a2.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>Sam Smith</h5>
                                    </a>
                                    <p>Underground</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a3.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>Will I am</h5>
                                    </a>
                                    <p>First</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a4.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>The Cure</h5>
                                    </a>
                                    <p>Second Song</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a5.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>DJ SMITH</h5>
                                    </a>
                                    <p>The Album</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a6.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>The Ustopable</h5>
                                    </a>
                                    <p>Unplugged</p>
                                </div>
                            </div>

                            {/* Single Album */}
                            <div className="single-album">
                                <img src="/img/bg-img/a7.jpg" alt="" />
                                <div className="album-info">
                                    <a href="#">
                                        <h5>Beyonce</h5>
                                    </a>
                                    <p>Songs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestAlbums;
