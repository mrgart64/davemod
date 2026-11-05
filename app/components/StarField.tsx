"use client";
import React, { useEffect, useState } from 'react';

// Fungsi generate bintang dipindah keluar component 
// agar hanya dipanggil sekali saat module pertama kali dieksekusi, bukan tiap render.
const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(`${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #737373`);
    }
    return stars.join(', ');
};

// Di-generate sekali di luar component (Static Generation per Session)
const starsSmallCache = typeof window !== 'undefined' ? generateStars(700) : '';
const starsMediumCache = typeof window !== 'undefined' ? generateStars(200) : '';
const starsBigCache = typeof window !== 'undefined' ? generateStars(100) : '';

const StarField = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fallback kosong saat SSR untuk mencegah hydration mismatch, lalu render penuh setelah mounted
    const starsSmall = mounted ? starsSmallCache : "";
    const starsMedium = mounted ? starsMediumCache : "";
    const starsBig = mounted ? starsBigCache : "";

    return (
        <div className="fixed inset-0 z-0 bg-[#FAFAFA] overflow-hidden pointer-events-none">
            {/* Background Gradient Malam */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#FAFAFA_100%)]" />

            {/* Tag <style> HTML murni (tanpa styled-jsx) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes animStar {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-2000px); }
                }
            `}} />

            {/* Star Layers dengan jumlah padat seperti keinginanmu */}
            <div
                className="absolute inset-0 w-[1px] h-[2px] bg-transparent rounded-full animate-[animStar_50s_linear_infinite]"
                style={{ boxShadow: starsSmall }}
            />
            <div
                className="absolute inset-0 w-[2px] h-[4px] bg-transparent rounded-full animate-[animStar_100s_linear_infinite]"
                style={{ boxShadow: starsMedium }}
            />
            <div
                className="absolute inset-0 w-[4px] h-[6px] bg-transparent rounded-full animate-[animStar_150s_linear_infinite]"
                style={{ boxShadow: starsBig }}
            />
        </div>
    );
};

export default StarField;