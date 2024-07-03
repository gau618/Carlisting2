import React from 'react';
import styles from './Footer.module.scss';

 export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.About_Contact}>
                <div className={styles.footerSection}>
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit qui, ullam doloribus architecto quis nostrum tenetur consequuntur aliquid assumenda, cum voluptatum cupiditate illum dolores eveniet ex exercitationem quibusdam reprehenderit optio!</p>
                </div>
                <div className={styles.footerSection}>
                    <h2>Contact Info</h2>
                    <ul>
                        <li><i className="fas fa-map-marker-alt"></i> 3135 Oliver St, Fort Worth TX 76134</li>
                        <li><i className="fas fa-envelope"></i> support@domain.com</li>
                        <li><i className="fas fa-phone"></i> + (123) 456 74700</li>
                    </ul>
                </div>
                </div>
                <div className={styles.footerSection}>
                    <h2>Customer Links</h2>
                    <ul>
                        <li><a href="#">Latest Cars</a></li>
                        <li><a href="#">Featured Cars</a></li>
                        <li><a href="#">Sell Your Car</a></li>
                        <li><a href="#">Buy a Car</a></li>
                        <li><a href="#">Reviews</a></li>
                        <li><a href="#">Latest News</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Inventory</a></li>
                        <li><a href="#">Parts Shop</a></li>
                        <li><a href="#">Contacts</a></li>
                    </ul>
                </div>
                <div className={styles.footerSectioninput}>
                    <h2>Subscribe Newsletter</h2>
                    <p>Get our weekly newsletter for latest car news, exclusive offers and deals and more.</p>
                    <form>
                        <input type="email" placeholder="Your Email*" />
                        <textarea name="" rows={8} id=""></textarea>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};


