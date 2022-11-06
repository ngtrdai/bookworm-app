import React, { useEffect } from "react";
import "./style.scss"
function Error404() {
  useEffect(() => {
    document.title = "Bookworm - 404";
  }, []);
  return (
    <div className="bookworm__404">
      <div className="bookworm__404__content">
        <div className="bookworm__404__content__body">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <a href="/" className="bookworm__404__content_button">Go to Homepage</a>
      </div>
    </div>
  );
}

export default Error404;