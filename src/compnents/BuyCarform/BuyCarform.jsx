import React, { useState } from 'react';
import styles from './index.module.scss';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        carType: '',
        carModel: '',
        purchaseDate: '',
        additionalNote: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={styles.bookingForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                     <input
                        type="text"
                        name="carModel"
                        placeholder="Address *"
                        value={formData.carModel}
                        onChange={handleChange}
                        required
                    />
                   
                   
                </div>
                <div className={styles.payment}>
                   <select name="" id="">
                    <option value=""> Payment Method</option>
                    <option value="">UPI</option>
                    <option value="">PAYPAL</option>
                    <option value="">NET BANKING</option>
                   </select>
                </div>
                <div className={styles.formGroup}>
                    <textarea
                        name="additionalNote"
                        placeholder="Additional Note"
                        value={formData.additionalNote}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Buy Now</button>
            </form>
        </div>
    );
};

export default BookingForm;
