---
layout: layouts/post.njk
title: Static Art & Design
description:
date: 2024-06-10
thumbnail: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/radial.jpg?v=1742916358329
images:
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/wildflower.png?v=1742916240486
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/cover.png?v=1744346697292
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/AEposter2.png?v=1741282291431
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/Instagram.png?v=1743090096126
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/radial.jpg?v=1742916358329
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/IMG_5895.JPG?v=1739289481608
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/IMG_5896.JPG?v=1739289475816
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/IMG_5893.JPG?v=1739289378664
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/IMG_5894.JPG?v=1739289352616
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Lee-Olivia-RecordingFinal.png?v=1701375727440
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Lee-Olivia-RecordingStudies.png?v=1701382458004
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Olivia-Lee_FBC.png?v=1701375701647
tags:
  - static
  - all
blurb:
skills:
  - Figma
  - Adobe Suite
  - Collage
---

<div class="skill-list">       
  <h4 style="font-size: 1rem; color: #fe2f20;">Softwares & Languages Used:</h4>
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
