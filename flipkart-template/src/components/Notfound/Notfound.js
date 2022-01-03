import React from 'react';
import './notfound.css';

const NotFound = () => {
    return (
        <>
            <section class="page_404">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                            <div class="propp">
                                    <h1 class="text-center propp" style={{fontSize: '70px'}}>404</h1>


                                </div>
                                <div class="four_zero_four_bg">
                                </div>

                                <div class="contant_box_404">
                                   <div className='propp'> <h3 class="h2" style={{display:'flex'}}>
                                        Look like you're lost
                                    </h3></div>

                                    <div className='propp'>  <p style={{display:'flex'}}>the page you are looking for not avaible!</p>
</div>
                                 <div className='propp'>   <a href={`/`} class="link_404">Go to Home</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFound