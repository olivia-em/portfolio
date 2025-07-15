---
title: Incantation Bowl
date: 2024-12-07
animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/bowl.mp4?v=1744232238888
blog:
  - https://incantationbowl.glitch.me/workflow.html
sites:
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/bowl.png?v=1738193465633
    link: https://incantationbowl.glitch.me/
    title: Incantation Bowl
    animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/bowl.mp4?v=1744232238888
tags:
  - all
  - webdev
layout: layouts/post.njk
skills:
  - HTML/CSS/Javascript
  - 3D Model Viewer
  - Agisoft Metashape
  - Blender
---

<div class="post-layout">
  <br>
    <div class="cont">
   <p class="desc">
    This was the precursor to <i>Mozia 2023</i> and the final project for a course in digital archaeology. We had to focus on a specific object at the Penn Museum and present it in a new light. 
     I coded the website on Glitch in HTML & CSS, and photogrammetically 3D modeled the artifact then rendered it in Agisoft Metashape.  
</p>
      <div style="margin-top:20px; " class="skills">   
        {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.blog and post.data.blog.length > 0 -%}
      {%- for blo in post.data.blog -%}

<a target="_blank" href="{{blog}}"><h6 style="color: #fe2f20;">
Workflow

</h6></a>
{%- endfor -%}
{%- endif -%}
{%- endif -%}
{%- endfor -%}  
 {%- for post in collections.posts -%}
{%- if post.url == page.url -%}
{%- if post.data.repo and post.data.repo.length > 0 -%}
{%- for rep in post.data.repo -%}
<a target="_blank" href="{{repo}}"><h6 style="color: #fe2f20;">
Repository
</h6></a>
{%- endfor -%}
{%- endif -%}
{%- endif -%}
{%- endfor -%}
</div>
      </div>
  </div>  
  <div class="sites-container">
  {%- for post in collections.posts -%}                           
    {%- if post.url == page.url -%} 
      {%- for site in post.data.sites -%}
        <a target="_blank" href="{{ site.link }}">
          {% if site.animation %}
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
