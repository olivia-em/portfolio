---
title: Parametrics
date: 2024-12-04
animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/flower.mp4?v=1744235522438
sites:
  - animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/flower.mp4?v=1744235522438
    link: https://olivia-em.github.io/codeyourway/recode/screensaver/index.html
    title: Screensaver
  - animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/ball.mp4?v=1744236776474
    link: https://olivia-em.github.io/codeyourway/explore/explore2/index.html
    title: Explore 2
  - animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/para1.mp4?v=1744235960754
    link: https://olivia-em.github.io/codeyourway/explore/explore3/index.html
    title: Explore 3
  - animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/lights.mp4?v=1744235962698
    link: https://olivia-em.github.io/codeyourway/explore/explore4/index.html
    title: Explore 4
  - animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/para2.mp4?v=1744235956100
    link: https://olivia-em.github.io/codeyourway/explore/explore5/index.html
    title: Explore 5
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.15.29%E2%80%AFPM.png?v=1738869498064
    link: https://olivia-em.github.io/codeyourway/recode/preLoader/index.html
    title: preLoader
tags: 
  - code 
  - all
repo: 
  - https://github.com/olivia-em/codeyourway
skills:
  - p5.js
  - WEBGL
layout: layouts/post.njk
---


<div class="cont">  
  <div class="skills">   
        {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.blog and post.data.blog.length > 0 -%}
      {%- for blo in post.data.blog -%}
 <h4 style="color: #fe2f20;"> <a target="_blank" style="color: #fe2f20;" href="{{blog}}">
    Workflow
    </a></h4>
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}      
      {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.repo and post.data.repo.length > 0 -%}
      {%- for rep in post.data.repo -%}
  <h4 style="color: #fe2f20;"><a target="_blank" style="color: #fe2f20;" href="{{repo}}">
    Repository
   </a></h4>
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%} 
      </div>       
  <p class="desc">
    This is a selection of Javascript sketches I made while exploring parametric equations, and all are either interactive or animated.
  </p>
      </div>
<div class="sites-container">
  {%- for post in collections.posts -%}                           
    {%- if post.url == page.url -%} 
      {%- for site in post.data.sites -%}
        <a target="_blank" href="{{ site.link }}">
          {% if site.animation %}
            <!-- Render video if animation exists -->
            <div class="sites video-background">
              <video autoplay loop muted playsinline class="video-content">
                <source src="{{ site.animation }}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <h4 class="overlay-content">
                < {{ site.title }} >
              </h4>
            </div>
          {% else %}
            <!-- Otherwise, use image as background -->
            <div class="sites" style="background-image: url('{{ site.image }}');">
              <h4 class="overlay-content">
                < {{ site.title }} >
              </h4>
            </div>
          {% endif %}
        </a>
      {%- endfor -%}
    {%- endif -%}
  {%- endfor -%}
</div>  
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
