---
layout: layouts/post.njk
title: Alter Egos
description: 
date: 2025-03-22
thumbnail: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/still9.png?v=1745335684155
images: 
videos:
  - https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/AEpromoS25_final.mp4?v=1745335579495
tags: 
  - vidart 
  - all
blurb:
skills:
  - Adobe Premiere Pro
---
 <br>
 <div class="cont">
<p class="desc">
  As the Graduate Teaching Assistant for <i>Alter Egos: Assuming New Identities Through Costume and Performance</i>, I was responsible for preparing promotional materials
  for the end of semester performance. I edited this video in Premiere from footage of previous performances. I wanted the class/performance to seem like an eclectic party, and I played with blending modes to 
  layer performances (especially in pairs) to connect to the concept of duality. 
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
  