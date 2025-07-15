---
layout: layouts/post.njk
title: Qatsi (2025)
description: 
date: 2025-02-14
thumbnail: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/qatsi.jpg?v=1741321562146
images: 
videos:
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/qatsi.MP4?v=1741321564471
tags: 
  - vidart 
  - all
blurb:
skills:
  - Adobe After Effects
  - Adobe Premiere Pro
  - MidJourney
  - OpenArt
  - Ableton
---
 <br>
 <div class="cont">
   <p class="desc">
     Qatsi (2025)
An homage to the 1982 film Koyaanisqatsi, “Qatsi” is a visual exploration of motion as the axiom of life—spanning the vastness of the cosmos, the rhythms of nature, and the intimacy of human connection. 
    </p>
<p class="desc">
  Created for the MIT AI Filmmaking Hackathon, Quatsi was recognized as a Finalist and received the Best Sound Award, along with an Honorable Mention for Best Visual.</p>
  <p class="desc">
    <i>
  Olivia Lee, AI Artist & Visual Designer<br>
  Prisha Jain, AI Artist & Composer<br>
  Omi Bahuguna, AI Artist & Art Direction<br>
  Mark Chan, Editor<br>
  Yidi Zhou, Producer </i>
  </p>
 </div>
<div class="skill-list">       
  <h4 style="font-size: 1rem;color: #fe2f20;">Softwares Used:</h4> 
      <div class="skills">   
    {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.skills and post.data.skills.length > 0 -%}
      {%- for skill in post.data.skills -%}
        <h4 style="font-size: 1rem;"> {{skill}} </h4> 
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}  
    </div> 
  </div>
  