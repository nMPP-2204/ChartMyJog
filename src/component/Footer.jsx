import React from "react";
import { useMediaQuery } from "usehooks-ts";

// export default function Footer() {
//   return (
//     <div className="fixed bottom-0 w-screen h-10 text-lg text-white bg-black">
//       Test
//     </div>
//   );
// }

export default function Footer() {
  const isPhone = useMediaQuery("(max-width: 768px)");
  return (
    <footer className="fixed bottom-0 flex items-center w-full h-10 text-sm text-white bg-black flex-nowrap justify-evenly footerToolBar">
      {relatedItems.map((item, i) => (
        <RelatedItem key={i} name={item} />
      ))}
      {isPhone ||
        socialItems.map((item, i) => <SocialItem key={i} iconClasses={item} />)}
      <p>Copyright @ 2022 Chart My Jog</p>
    </footer>
  );
}

const socialItems = [
  "icon ion-social-instagram",
  "icon ion-social-snapchat",
  "icon ion-social-twitter",
  "icon ion-social-facebook",
];

const relatedItems = ["Privacy Policy"];

const RelatedItem = ({ name }) => {
  return (
    <div>
      <a href="#" className="text-white">
        {name}
      </a>
    </div>
  );
};

const SocialItem = ({ iconClasses }) => {
  return (
    <div className="p-1 mx-2 mt-1 bg-white rounded-full">
      <a href="#">
        <i className={iconClasses}></i>
      </a>
    </div>
  );
};
