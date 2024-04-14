import React from "react";

const AboutUs = () => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://dhb3yazwboecu.cloudfront.net/1384/collections/PARALEL/Point_paralel_1920.jpg"
        alt=""
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div>
        <img
          src="https://dhb3yazwboecu.cloudfront.net/1384/collections/PARALEL/Point_paralel_1920.jpg"
          alt=""
          style={{ width: "100%", height: "auto" }}
        />
        <div style={styles.aboutUs}>
          <h1 style={styles.heading}>About Us</h1>
          <div style={styles.content}>
            <div style={styles.section}>
              <div style={styles.ourstory}>
                <img
                  src="https://assets.vogue.com/photos/66070733f43df49e80c7c0c5/1:1/w_1416,h_1416,c_limit/outdoor%20furniture%20site.jpeg"
                  alt=""
                  style={{
                    width: "500px",
                    height: "500px",

                    marginRight: "200px",
                    marginLeft: "200px",
                  }} // Adjust width and margin as needed
                />
                <div>
                  <h2 style={styles.sectionHeading}>Our Story</h2>
                  <p style={styles.paragraph}>
                    Welcome to Bajwa Furniture Store where we believe that
                    furniture isn't just about functionality; it's about
                    creating spaces that reflect your style, personality, and
                    comfort. It began with a simple mission: to provide
                    high-quality furniture that combines impeccable
                    craftsmanship with affordability. What started as a passion
                    project has now grown into a thriving online store, serving
                    customers across Pakistan. We are committed to offering a
                    wide range of furniture options, from classic to
                    contemporary styles, ensuring that there's something for
                    everyone. Our dedication to quality and customer
                    satisfaction drives everything we do, and we're excited to
                    help you furnish your space with pieces you'll love.
                  </p>
                </div>
              </div>
            </div>
            <div style={styles.section}>
              <div>
                <h2 style={styles.sectionHeading}>Our Philosophy</h2>
                <p style={styles.paragraph}>
                  At Bajwa Furniture Store, we understand that your home is your
                  sanctuary. That's why we handpick each piece in our
                  collection, focusing on timeless designs, durability, and
                  sustainability. Whether you're furnishing a cozy apartment or
                  a spacious home, we offer a curated selection to suit every
                  taste and budget.
                </p>
              </div>
              <img
                src="https://akamai-scene7.grandinroad.com/is/image/frontgate/outdoor_shop_the_look?$wgih$"
                alt=""
                style={{
                  width: "500px",
                  height: "500px",
                  marginRight: "200px",
                  marginLeft: "200px",
                  // Adjust margin as needed
                }}
              />
            </div>

            <div style={styles.section}>
              <img
                src="https://assets.vogue.com/photos/66070733f43df49e80c7c0c5/1:1/w_1416,h_1416,c_limit/outdoor%20furniture%20site.jpeg"
                alt=""
                style={{
                  width: "500px",
                  height: "500px",

                  marginRight: "200px",
                  marginLeft: "200px",
                }} // Adjust width and margin as needed
              />
              <div>
                <h2 style={styles.sectionHeading}>What Sets Us Apart</h2>
                <ul style={styles.list}>
                  <li>
                    <strong>Quality Assurance:</strong> We work closely with
                    skilled artisans and reputable manufacturers to ensure that
                    every piece meets our stringent quality standards.
                  </li>
                  <li>
                    <strong>Affordability:</strong> We believe that everyone
                    deserves to have a beautiful home, which is why we strive to
                    offer competitive prices without compromising on quality.
                  </li>
                  <li>
                    <strong>Customer Satisfaction:</strong> Your satisfaction is
                    our top priority. From browsing our website to delivery and
                    beyond, we're committed to providing exceptional service
                    every step of the way.
                  </li>
                </ul>
              </div>
            </div>
            <div style={styles.section}>
              <div>
                <h2 style={styles.sectionHeading}>
                  Our Commitment to Sustainability
                </h2>
                <p style={styles.paragraph}>
                  As stewards of the environment, we're dedicated to minimizing
                  our ecological footprint. That's why we prioritize sustainable
                  materials and eco-friendly practices in our sourcing and
                  operations.
                </p>
              </div>
              <img
                src="https://akamai-scene7.grandinroad.com/is/image/frontgate/outdoor_shop_the_look?$wgih$"
                alt=""
                style={{
                  width: "500px",
                  height: "500px",
                  marginRight: "200px",
                  marginLeft: "200px",
                  // Adjust margin as needed
                }}
              />
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionHeading}>Get in Touch</h2>
              <p style={styles.paragraph}>
                Have a question about a product? Need assistance with your
                order? We're here to help! Contact our friendly customer support
                team at{" "}
                <span style={{ color: "#4caf50" }}>
                  BajwaFurniture@gmail.com
                </span>
                .
              </p>
              <p style={styles.paragraph}>
                Thank you for choosing{" "}
                <span style={{ color: "#f50057" }}>Bajwa Furniture Store</span>.
                We look forward to helping you transform your space into a place
                you'll love coming home to.
              </p>
            </div>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

const styles = {
  aboutUs: {
    position: "relative",
    zIndex: 1,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    fontSize: "48px", // Increased font size
    fontWeight: "bold", // Increased font weight
    marginBottom: "30px",
    paddingBottom: "80px", // Remove bottom padding
    textAlign: "center", // Center align the heading
    backgroundImage: 'url("YOUR_IMAGE_SRC")', // Add your image source here
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center", // Adjust as per your preference
    padding: "0 100px", // Adjust padding to make space for the image
  },
  section: {
    display: "flex",
    paddingBottom: "30px",
    marginBottom: "30px",
    border: "none", // Remove border
  },
  sectionHeading: {
    fontWeight: "bold",
    color: "#000",
    fontSize: "34px",
    marginBottom: "50px",
    paddingtop: "0px", // Remove padding
    textAlign: "center",
  },
  content: {
    lineHeight: "1.6",
  },
  paragraph: {
    margin: "20px",
    marginBottom: "200px",
    fontSize: "26px",
  },
  list: {
    fontSize: "26px",
    paddingLeft: "20px",
    marginBottom: "20px",
  },
  highlight: {
    color: "#f50057",
    fontWeight: "bold",
  },

  ourstory: {
    display: "flex",
  },
};

export default AboutUs;
