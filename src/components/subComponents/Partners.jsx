import React from 'react';
import Marquee from 'react-fast-marquee';

export default function Partners() {
  const brands = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ekBQgUi_dZnzoTGM6t1JZ30NpHZgpxzoCQ&s', alt: 'Brand 1' },
    { src: 'https://i.pcmag.com/imagery/reviews/00Z1mnZCcGR9r9D5hNbsFbW-36.fit_lim.size_1050x591.v1612863800.jpg', alt: 'Brand 2' },
    { src: 'https://kinsta.com/wp-content/uploads/2022/01/godaddy-a-record-featured-1024x512.png', alt: 'Brand 3' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOqVLh4UflI_6Er66Te0lrzgwAd3MEHV0UNw&s', alt: 'Brand 4' },
    { src: 'https://images-platform.99static.com/dhf1mxG0GMUHKx7_OwrA40arHmU=/500x500/top/smart/99designs-contests-attachments/40/40442/attachment_40442089', alt: 'Brand 5' },
  ];

  return (
    <div>
      <h1 className="font-semibold text-3xl text-center text-green-600 my-5">Our Partners</h1>
      <div className=" p-5 w-[80%] mx-auto rounded-md">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {brands.map((brand, index) => (
            <div key={index} className="mx-5">
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-24 w-auto object-contain rounded-xl"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
