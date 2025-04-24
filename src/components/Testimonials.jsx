import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      image: 'images/img-1.jpg',
      name: 'KEN NORMAN',
      username: '@kennorman',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt minus debitis illo, accusantium ex atque asperiores veniam culpa fugit! Repellat similique odio, unde iure aut obcaecati alias quasi eius.'
    },
    {
      image: 'images/img-2.jpg',
      name: 'Liara Karian',
      username: '@liarakarian',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt minus debitis illo, accusantium ex atque asperiores veniam culpa fugit! Repellat similique odio.'
    },
    {
      image: 'images/img-3.jpg',
      name: 'Ricky Danial',
      username: '@rickydanial',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt minus debitis illo, accusantium ex atque asperiores veniam culpa fugit! Repellat similique odio, unde iure aut obcaecati alias quasi eius.'
    }
  ];

  return (
    <section id="testimonial">
      <div className="title-text">
        <p>TESTIMONIALS</p>
        <h1>What Client Says</h1>
      </div>

      <div className="testimonial-row">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-col" key={index}>
            <div className="user">
              <img src={testimonial.image} alt="" />
              <div className="user-info">
                <h4>{testimonial.name}<i className="fa fa-twitter"></i></h4>
                <small>{testimonial.username}</small>
              </div>
            </div>
            <p>{testimonial.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
