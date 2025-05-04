import React from 'react';

function Services() {
    const services = [
        {
          image: '/images/pic-1.jpg',
          title: 'Hair Styling',
          description: 'From sleek to voluminous, we style your hair to match any vibe or occasion.'
        },
        {
          image: '/images/pic-2.jpg',
          title: 'Beard Trim',
          description: 'Sharp, clean beard trims to keep your look well-groomed and defined.'
        },
        {
          image: '/images/pic-3.jpg',
          title: 'Hair Cut',
          description: 'Precision cuts tailored to your style and face shape for a fresh, clean look.'
        },
        {
          image: '/images/pic-4.jpg',
          title: 'Dry Shampoo',
          description: 'A quick, water-free refresh that leaves your hair looking clean and full of life.'
        }
      ];
      

  return (
    <section id="service">
      <div className="title-text">
        <p>SERVICES</p>
        <h1>We Provide Better</h1>
      </div>

      <div className="service-box">
        {services.map((service, index) => (
          <div className="single-service" key={index}>
            <img src={service.image} alt="" />
            <div className="overlay"></div>
            <div className="service-desc">
              <h3>{service.title}</h3>
              <hr />
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;