---
layout: layouts/post.njk
title: theNudes
description: 
date: 2023-11-14
thumbnail: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/i%20saw%20a%20high%20hill%20and%20on%20it%20a%20form%20shaped%20against%20hard%20air%20(3).jpeg?v=1737842770862
images: 
videos:
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/theNudes.mp4?v=1737842388570
tags: 
  - vidart 
  - all
blurb: 
skills:
  - Adobe After Effects
  - Adobe Firefly 
documentation: 
  - https://docblog-olee.glitch.me/projects/generativevid/
---
 <br>
 <div class="cont">
   <p class="desc">
     Tasked with using AI for a short video assignment, I decided to go in a more understated direction. I used excerpts from Anne Carson's Glass, Irony, and God as prompts for image generation in Adobe Firefly. The excerpts I chose are visions that come to the protagonist. Considering the discourse around AI and its relationship to the arts, which frames it as hallucinatory rather than realistic, I thought using these visions as prompts would be fitting. 
    </p>
 </div>
<div class="skill-list">       
  <h4 style="font-size: 1rem; color: #fe2f20;">Softwares Used:</h4> 
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
  