import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import data from "@utils/data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const NavList = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Product", path: "/product" },
  { label: "Contact us", path: "/contact-us" },
];
const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);
  const followRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((preve) => !preve);
      if (!showCanvas) {
        gsap.set(followRef.current, {
          background: "#FFFFFF",
        });
        gsap.set(growingSpanRef.current, {
          left: e.clientX,
          top: e.clientY,
        });
        gsap.to("body", {
          color: "#000000",
          duration: 0.5,
          backgroundColor: "#FD2C2A",
          ease: "power2.inOut",
        });
        gsap.to(growingSpanRef.current, {
          scale: 1000,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(growingSpanRef.current, {
              scale: 0,
              clearProps: "all",
            });
            // gsap.set("body", {
            //   backgroundColor: "#FD2C2A",
            // });
          },
        });
        gsap.set(click, { color: "#000000" });
      } else {
        gsap.to("body", {
          color: "#FFFFFF",
          duration: 0.5,
          backgroundColor: "#000000",
          ease: "power2.inOut",
        });
        gsap.set(followRef.current, {
          background: "#FD2C2A",
        });

        gsap.set(click, { color: "#FFFFFF" });
      }
    };

    if (headingRef.current) {
      headingRef.current.addEventListener("click", handleClick);
    }
    return () => {
      if (headingRef.current) {
        headingRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [showCanvas]);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [showCanvas]);

  useEffect(() => {
    if (followRef.current) {
      gsap.set(followRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        background: "#FD2C2A",
      });
      gsap.set(click, { display: "none" });
      window.addEventListener("mousemove", (e) => {
        if (e.target === headingRef.current) {
          gsap.to(followRef.current, { width: 50, height: 50 });
          gsap.set(click, { display: "block", ease: "Power4.easeOut" });
        } else {
          gsap.set(click, { display: "none", ease: "Power4.easeOut" });
          gsap.to(followRef.current, { width: "1.25rem", height: "1.25rem" });
        }
        gsap.to(followRef.current, {
          duration: 1,
          overwrite: "auto",
          x: e.clientX,
          y: e.clientY,
          stagger: 0.15,
          ease: "Power4.easeOut",
        });
      });
    }
  }, []);
  return (
    <>
      <div
        ref={followRef}
        className="fixed flex items-center justify-center z-10 pointer-events-none rounded-full w-5 h-5 -translate-x-[50%] -translate-y-[50%]"
      >
        <span className="font-bold hidden text-white" id="click">
          Click
        </span>
      </div>
      <span
        ref={growingSpanRef}
        className="growing block rounded-full fixed -top-[10%] -left-[10%] w-5 h-5"
      ></span>
      <div className="relative w-full min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasItem, canvasIndex) => (
            <Canvas key={canvasIndex} details={canvasItem} />
          ))}
        <div className="z[1] w-full h-screen  relative ">
          <nav className="top-0 left-0 w-full p-8 flex justify-between">
            <div className="brand text-2xl font-normal">Thirtysixstudio</div>
            <div className="links flex gap-10">
              {NavList.map((link) => (
                <a
                  href={link.path}
                  key={link.path}
                  className="text-md hover:text-gray-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%] ">
              <h3 className="text-3xl font-normal leading-[1.5]">
                At Thirtysixstudio, we build digital assets and immersive
                experiences for purposeful brands.
              </h3>
              <p className="text-md w-[80%] mt-10 font-normal">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking what digital craft can do
                for present-day ads and campaigns.
              </p>
              <p className="mt-10 text-md">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingRef}
              className="text-[16rem] font-normal tracking-tight leading-none"
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      <div className="relative w-full h-screen  mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasItem, canvasIndex) => (
            <Canvas key={canvasIndex} details={canvasItem} />
          ))}
        <div className="relative z-[1]">
          <h1 className="text-8xl tracking-tighter">About brand</h1>
          <p className="text-4xl leading-[1.8]  w-[80%] mt-10 font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            consequuntur a inventore similique libero nostrum, nisi rem eum
            fugit ratione.
          </p>
          {/* <img
            className="w-[80%] relative -z-[1] h-full"
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
            alt=""
          /> */}
        </div>
      </div>
    </>
  );
};

export default App;
