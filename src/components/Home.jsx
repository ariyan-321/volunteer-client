import React, { useEffect } from "react";
import Banner from "./subComponents/Banner";
import Partners from "./subComponents/Partners";
import Reviews from "./Reviews";
import VolunteerNeedsNow from "./subComponents/VolunteerNeedsNow";

export default function Home() {
  useEffect(() => {
    document.title = "Home|Assignment-11";
  });
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center text-green-600 my-7">
        Welcome to Volunteer Hub!
      </h1>

      <div className="w-[80%] mx-auto mt-12">
        <Banner></Banner>
      </div>
      <div className="my-7">
        <VolunteerNeedsNow></VolunteerNeedsNow>
      </div>

      <div className="my-28 container mx-auto">
        <Partners></Partners>
      </div>

      <div className="my-12">
        <Reviews></Reviews>
      </div>
    </div>
  );
}
