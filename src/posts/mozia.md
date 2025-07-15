---
title: Mozia 2023
date: 2024-12-07
animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/kiln.mp4?v=1744235387282
sites:
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/mozia-screengrab.png?v=1701375709597
    link: https://mozia-2023.glitch.me/
    title: Mozia 2023
    animation: https://cdn.glitch.global/95731519-6287-4bbd-a281-712ac2b13fef/kiln.mp4?v=1744235387282
tags: 
  - webdev 
  - all
layout: layouts/post.njk
skills:
  - HTML/CSS
  - 3D Model Viewer
  - Glitch
  - Leaflet.js
  - QGIS
  - Agisoft Metashape
---
<div class="post-layout">
  <br>
  <div class="cont">
   <p class="desc">
    I received a summer fellowship from the Price Lab at the University of Pennsylvania in 2023 to explore the intersection of digital archaeology and digital humanities.
     I intended to use data from an archaeological excavation I was working on to design my own project which combines the GIScience / 3D visualization with web design. 
  I built this website on Glitch using HTML, CSS, and Javascript, including the Leaflet.js library.
</p>
<p class="desc">
  On the page, <i>Il Forno</i>, you can experience the excavation of a kiln through images, orthomosaics, and 3D models, while I explain how these assets were created, walk you through the excavation, and briefly discuss potential for growth. In the footer, you can find links to pages containing the 
  final write-up for the project with citations and the acknowledgements.
  </p>
      </div>
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
       <h4 style="font-size: 1rem;" > {{skill}} </h4> 
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}  
    </div> 
  </div>
