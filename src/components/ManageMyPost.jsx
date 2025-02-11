import React, { useEffect } from "react";
import MyVolunteerNeedPosts from "./MyVolunteerNeedPosts";
import MyVolunteerRequestPost from "./MyVolunteerRequestPost";

export default function ManageMyPost() {
  useEffect(() => {
    document.title = "ManageMyPost";
  });
  return (
    <div>
      <div>
        <MyVolunteerNeedPosts></MyVolunteerNeedPosts>
      </div>

      <div>
        <MyVolunteerRequestPost></MyVolunteerRequestPost>
      </div>
    </div>
  );
}
