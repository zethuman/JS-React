import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import footer from './footer.module.css';


export default function Footer(): ReactElement {
  return (
    <div className={footer.container}> 
      <section className={footer.subscription}>
        <p className={footer.subscription}>
          Join the Adventure!
                </p>
        <p className={footer.subscription_text}>
          You can unsubscribe any time
                </p>
        <div className={footer.input_areas}>
          <form>
            <input type="email" name="email" placeholder="Your Email" className={footer.input} />
            <button className={footer.btn2}>Subscribe</button>
          </form>
        </div>
      </section>
      <div className={footer.links}>
        <div className={footer.link_wrapper}>
          <div className={footer.link_items}>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className={footer.link_items}>
            <h2>Contact</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className={footer.link_wrapper}>
          <div className={footer.link_items}>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div className={footer.link_items}>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className={footer.social_media}>
        <div className={footer.social_media_wrap}>
          <div className={footer.logo}>
            <Link to='/' className={footer.social_logo}>
              WC
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className={footer.website_rights}>WC © 2020</small>
          <div className={footer.social_icons}>
            <Link
              className={footer.social_icon_link}
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className={footer.social_icon_link}
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className={footer.social_icon_link}
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className={footer.social_icon_link}
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className={footer.social_icon_link}
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
