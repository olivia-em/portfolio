---
layout: layouts/post.njk
title: Girl Time
date: 2025-11-14
repo:
  - title: Github Repository
    link: https://github.com/olivia-em/GirlTime
  - title: Other Documentation
    link: https://prishajain.notion.site/girltime
thumbnail: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7812.JPG?v=1751484875136
media:
  - type: image
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7635.JPG?v=1751484851786
  - type: image
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7587.JPG?v=1751484844414
  - type: video
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_1361_2.mov?v=1751486193942
  - type: image
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_1364.jpg?v=1751486074118
  - type: video
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/girltime-vid.MOV?v=1751484901612
  - type: image
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7103.JPG?v=1751485983995
  - type: image
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7168.JPG?v=1751485997979
  - type: video
    src: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/IMG_7219.MOV?v=1751484897943

tags:
  - code
  - vidart
  - all
blurb: |
  Girl Time is an immersive installation, created in collaboration with Prish Jain and dedicated to sharing femme stories. This installation draws inspiration from the deeply personal conversations that unfold in women's restrooms—spaces of vulnerability, camaraderie, and unfiltered expression. Through interactive and generative elements, Girl Time invites users to step into the experience of being female-identifying, capturing its beauty and struggle. No two users will have the same experience, the same way no two women do.

  Girl Time comes together using Arduino, p5.js, and Tone.js. The removable objects are magnetized, and the magnets are detected by hall effect sensors. Through serial communication, the sensors send messages to p5, which initiates sound and video corresponding to the object, with added randomness.
skills:
  - Arduino IDE
  - p5.js
  - tone.js
  - Adobe Creative Suite
  - CAD & Design for Fabrication
  - Rapid Prototyping
documentation:
---
     <div style="margin-top:20px;color: #fe2f20;" class="skills">   
     {%- for post in collections.posts -%}
{%- if post.url == page.url -%}
{%- if post.data.repo and post.data.repo.length > 0 -%}
{%- for rep in post.data.repo -%}
<a target="_blank" href="{{ rep.link }}"><h6 style="color: #fe2f20; text-align:center;">
< {{ rep.title }} ></h6></a>
{%- endfor -%}
{%- endif -%}
{%- endif -%}
{%- endfor -%}
    </div>
<div class="skill-list">       
  <h4 style="font-size: 1rem; color: #fe2f20;">Skills:</h4> 
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

