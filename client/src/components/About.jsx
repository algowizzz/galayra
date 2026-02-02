import { forwardRef } from "react";

export default forwardRef(function About(props, ref) {
  return (
    <section ref={ref} id="about" className="about-wrapper">
      <div className="about-section">
        <h2>About</h2>
        <p>
          GALAYRA is a modern lifestyle brand built around thoughtfully designed phone
          cases that balance protection, functionality, and clean aesthetics. Every
          product is created to enhance everyday use while reflecting a simple,
          contemporary design philosophy.
        </p>

        <p>
          Powered by a custom-built e-commerce platform and seamlessly integrated with
          on-demand production, GALAYRA brings high-quality designs directly from concept
          to your hands. We focus on quality, minimalism, and reliability — so your
          accessories feel as good as they look.
        </p>
      </div>
    </section>
  );
});
