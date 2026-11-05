import React from 'react';
import './stars.scss'; // Import file SCSS yang baru dibuat

const StarFall = () => {
    // Membuat array sejumlah 50 untuk men-generate 50 elemen bintang sesuai SCSS
    const starsArray = Array.from({ length: 50 });

    return (
        <div className="starfall-container">
            <div className="stars">
                {starsArray.map((_, index) => (
                    <div key={index} className="star" />
                ))}
            </div>
        </div>
    );
};

export default StarFall;