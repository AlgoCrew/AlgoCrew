"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable'; // Import Draggable plugin
import { InertiaPlugin } from 'gsap/InertiaPlugin'; // Import InertiaPlugin
import { Flip } from 'gsap/Flip'; // Import Flip plugin


export function SliderItems1() {
  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin, Flip);

    const items = gsap.utils.toArray(".item");
    
    const panal = document.querySelector(".content-body") as HTMLElement;
    const cards = document.querySelector(".item-list") as HTMLElement;

    if (!panal || !cards || items.length === 0 ) {
      console.warn("SliderItems: Required DOM elements not found for GSAP setup.");
      return;
    }


    const spacer = document.createElement("div");
    let itemIndex: number | null = null; // Initialize itemIndex properly

    function activate(index: number) {
      if (!items[index]) {
        return;
      }
      let item = items[index] as HTMLElement,
        img = item.querySelector(".item-img") as HTMLElement,
        description = item.querySelector(".item-description") as HTMLElement,
        itemGetter = gsap.getProperty(item),
        state = Flip.getState([item, img, description], {props: "borderRadius,maxWidth,zIndex"});
      
      gsap.set(spacer, {width: itemGetter("width"), height: itemGetter("height"), marginLeft: itemGetter("marginLeft") + "px", marginRight: itemGetter("marginRight") + "px"});
      item.parentNode?.insertBefore(spacer, item); // Use optional chaining for parentNode
      panal.appendChild(item);
      item.classList.add("active");
      
      // do a Flip animation to make it appear as if it was in the prior state
      Flip.from(state, {duration: 0.5, ease: "power1.inOut", nested: true});
      itemIndex = index;
      setTimeout(() => item.addEventListener("click", deactivate), 100); // since we're calling this from within a click event handler, wait 100ms before listening for another one to avoid an immediate trigger.
    }

    function deactivate() {
      if (itemIndex === null) return; // Ensure an item is active
      let item = items[itemIndex] as HTMLElement,
        img = item.querySelector(".item-img") as HTMLElement,
        description = item.querySelector(".item-description") as HTMLElement,
        state = Flip.getState([item, img, description], {props: "borderRadius,maxWidth"});
      
      spacer.parentNode?.insertBefore(item, spacer); // Use optional chaining
      spacer.parentNode?.removeChild(spacer); // Use optional chaining
      item.classList.remove("active");
      Flip.from(state, {duration: 0.5, ease: "power1.inOut", nested: true});
      itemIndex = null;
      item.removeEventListener("click", deactivate);
    }

    const itemWidth = (items[0] as HTMLElement)?.offsetWidth + 
                      parseFloat(getComputedStyle(items[0] as HTMLElement).marginRight || '0');
    const snapPoints = items.map((_, i) => -i * itemWidth);
    
    const boundsWidth = cards.scrollWidth - panal.offsetWidth;

    const draggableInstance = Draggable.create(cards, { // Target the cards (item-list) element
      type: "x",
      edgeResistance: 0.5,
      snap: snapPoints, // Use dynamically calculated snap points
      zIndexBoost: false,
      onDragEnd: function () {
        let index = 0;
        if (this.endX <= snapPoints[1] + (itemWidth / 2)) { // If closer to the second item's snap point
          index = 1;
        }
        if (this.endX <= snapPoints[2] + (itemWidth / 2)) { // If closer to the third item's snap point
          index = 2;
        }

      },
      onClick: function(e) {
        // Find the clicked item and activate it
        const clickedItem = (e.target as HTMLElement).closest(".item");
        if (clickedItem) {
          activate(items.indexOf(clickedItem));
        }
      },
      inertia: true,
      allowContextMenu: false,
      bounds: {
        minX: -boundsWidth, // Max scroll left
        maxX: 0 // Min scroll left (start)
      },
    });

    // Cleanup function for GSAP instances
    return () => {
      draggableInstance[0]?.kill(); // Kill the draggable instance on unmount
    };
  }, []); // Empty dependency array as effects only depend on initial DOM state


  return (
    <>
    <style>
      {`
      .container {
          width: 100vw;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .content-body {
          position: relative;
          overflow: hidden; /* Changed from overflow-y: scroll to hidden for Draggable */
          width: 100%;
          height: 500px;
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      }

      .bacground-images {
          position: absolute;
          overflow: hidden;
          z-index: -1;
          height: 100%;
          width: 100%;
      }

      header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          color: white;
      }
      .header-title {
          font-family: "Krona One", sans-serif;
          text-transform: uppercase;
          font-size: 2rem;
          letter-spacing: 2px;
      }
      .menu {
          position: relative;
          height: 20px;
          display: flex;
          flex-direction: column;
          font-size: 30px;
          /* sl-icon:first-child { top: 0; position: absolute; } */
          /* sl-icon:last-child { bottom: 0; position: absolute; } */
      }

      .hero-title {
          padding: 0 20px 20px 20px;
          margin: 40px 0 250px 0;
          p {
              font-family: sans-serif;
              text-transform: uppercase;
              color: white;
          }
          h1 {
              font-family: "Krona One", sans-serif;
              color: white;
              font-size: 1.5rem;
              text-align: right;
          }
      }
      .item-list {
          position: absolute;
          margin-left: 10px;
          margin-bottom: 20px;
          bottom: 20px;
          display: flex;
          /* Ensure it's wide enough to be draggable */
          width: fit-content; 
      }
      .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          margin: 5px;
          width: 170px;
          height: 220px;
          border-radius: 10px;
          background-color: white;
          cursor: grab; /* Indicate draggable */
      }
      .item.active {
        position: absolute;
        bottom: 0;
        height: 340px;
        width: 100%;
        border-radius: 0;
        margin: 0;
        z-index: 1000;
        cursor: auto; /* Change cursor when active */
      }
      .item.active .item-img {
        max-width: 50%;
        bottom: 240px;
      }
      .item.active .item-description {
        bottom: 140px;
      }
      .item-img {
          position: absolute;
          align-self: center;
          display: block;
          height: auto;
          bottom: 100px;
          max-width: 100%;
      }
      .item-description {
          position: absolute;
          bottom: 0;
          h1 {
              text-transform: uppercase;
              padding: 15px 15px 0 15px;
              font-size: 1rem;
          }
          p {
              font-family: sans-serif;
              padding: 0 15px 15px 15px;
              color: gray;
          }
      }

      /* Generic styles */
      body {
          margin: 0 auto;
          background-color: gray;
      }

      a {
          color: inherit;
          text-decoration: none;
      }

      li {
          font-family: "Poppins", sans-serif;
          list-style-type: none;
      }

      h1 {
          font-family: "Poppins", sans-serif;
          font-weight: 600;
      }

      h2 {
          font-family: "Poppins", sans-serif;
          font-weight: 400;
      }

      p {
          font-family: "Poppins", sans-serif;
          font-weight: 200;
      }
      `}
    </style>
      <div className="container">
        <main className="content-body">
            <div className="bacground-images">
                <div className="bg1"></div>
                <div className="bg2"></div>
                <div className="bg3"></div>
            </div>

            <ul className="item-list">
                <li className="item">
                    <img className="item-img" src="/images/technologies/js.svg" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
                <li className="item">
                    <img className="item-img" src="/images/technologies/js.svg" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
                <li className="item">
                    <img className="item-img" src="/images/technologies/js.svg" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
                <li className="item">
                    <img className="item-img" src="/images/technologies/js.svg" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
                <li className="item">
                    <img className="item-img" src="/images/technologies/js.svg" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
                <li className="item">
                    <img className="item-img" src="https://i.postimg.cc/jj1fzqDW/h4.png" alt="hoodie" />
                    <div className="item-description">
                        <p>$ 40.00</p>
                    </div>
                </li>
            </ul>
        </main>
    </div>
    </>
  );
}
