import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      <footer className="footerToolBar py-3 ">
        <div className="flex flex-wrap items-center justify-center">
          {relatedItems.map((item, i) => (
            <RelatedItem key={i} name={item} />
          ))}
          {socialItems.map((item, i) => (
            <SocialItem key={i} iconClasses={item} />
          ))}
        </div>
        <p className="copyright">Copyright @ 2022 Chart My Jog</p>
      </footer>
    </div>
  );
}

const socialItems = [
  "icon ion-social-instagram",
  "icon ion-social-snapchat",
  "icon ion-social-twitter",
  "icon ion-social-facebook",
];

const relatedItems = ["Home", "Services", "About", "Terms", "Privacy Policy"];

const RelatedItem = ({ name }) => {
  return (
    <div className="list-inline-item">
      <a href="#">{name}</a>
    </div>
  );
};

const SocialItem = ({ iconClasses }) => {
  return (
    <div className="circleStyle p-1.5 mx-2 mt-1">
      <a href="#">
        <i className={iconClasses}></i>
      </a>
    </div>
  );
};
