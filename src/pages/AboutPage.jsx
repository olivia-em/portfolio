import React from "react";
import BackToHomeButton from "../components/BackToHomeButton";
import ProjectLayout from "../components/ProjectLayout";
import "../styles/magazine.css";

const aboutImages = [
  "/images/aboutolivia/IMG_1298.JPG",
  "/images/aboutolivia/IMG_1377.jpg",
  "/images/aboutolivia/IMG_9088.JPG",
  "/images/aboutolivia/IMG_9115.jpg",
  "/images/aboutolivia/olivia-alterego.png",
  "/images/aboutolivia/oliviaMOM.PNG",
  "/images/aboutolivia/LIP2.png",
];

const aboutProject = {
  title: "A bit about me",
  description:
    "I'm a multimedia designer and creative technologist based in Brooklyn. I'm interested in poetics, audio/visual technology, production design, and interactive web art. My skillset includes HTML, CSS, and Javascript frameworks (React & Three.js), as well as audio/visual softwares like Resolume Arena, Ableton, TouchDesigner, GrandMA Lighting Consoles, and Adobe Suite. I have experience designing and developing websites, interactive media installations, live visuals for performance, and video art pieces.",
  image: aboutImages[0],
  extraImages: aboutImages.slice(1),
  alt: "Olivia Lee portrait",
};

export default function AboutPage() {
  return (
    <div
      className="webart-page"
      style={{
        background: "#f8f6f3",
        color: "#222",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div style={{ margin: "0 auto" }}>
        <ProjectLayout project={aboutProject} />
      </div>
    </div>
  );
}
