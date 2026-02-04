import { forwardRef } from "react"

export default forwardRef(function About(props, ref) {
  return (
    <section ref={ref} id="about" className="about-wrapper">
      <div className="about-section">
        <h2>About</h2>
        <p>
          GALAYRA is a modern lifestyle brand built around thoughtfully designed phone
          cases that balance protection, functionality, and clean aesthetics.
        </p>

        <p>
          Powered by a custom-built e-commerce platform and seamlessly integrated with
          on-demand production, GALAYRA delivers quality and minimalism.
        </p>
      </div>
    </section>
  )
})
