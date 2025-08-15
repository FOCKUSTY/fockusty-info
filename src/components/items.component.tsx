import { Api } from "api";
import { useEffect, useState } from "react";

const pixelToNumber = (pixels: string) => +pixels.split("px")[0];

export const Items = ({
  className,
}: {
  className: string,
}) => {
  const [ animationsEnabled, setAnimationsEnabled ] = useState<boolean>(false);
  
  const intervals: NodeJS.Timeout[] = [];
  let previousChild: HTMLElement = { style: { top: "0px", left: "0px" } } as HTMLElement;

  useEffect(() => {
    if (!animationsEnabled) return;

    setInterval(() => {
      if (!animationsEnabled) {
        return;
      };
      
      const element = document.getElementById("animation") as HTMLElement;    
      const { height, width } = element.getBoundingClientRect();
      const children = (element.children as unknown as HTMLElement[])
      
      intervals.forEach(interval => {
        clearInterval(interval)
      });
      
      for (const child of children) {
        child.style.transition = "1.2s cubic-bezier(0.33, 1, 0.68, 1) 0s";
        child.style.position = "absolute";
        child.style.top = `${Api.random(0, height + pixelToNumber(previousChild.style.top)/100 - Api.random(0,100))}px`;
        child.style.left = `${Api.random(0, width + pixelToNumber(previousChild.style.left)/100 - Api.random(0,100))}px`;
        
        let prev = (Api.random(0, 150));
        intervals.push(setInterval(() => {
          child.style.transition = `${Api.random(1000, 2000)}ms`;
          child.style.top = `${pixelToNumber(child.style.top) + prev}px`;
          prev = -prev
        }, 2400));

        previousChild = child;
      }
    }, 10000);
  }, [intervals, previousChild, animationsEnabled]);

  return (
    <>
    <div className={className} id="animation">
      <span onClick={() => window.location.href = "/introduction"}>Вступление</span>
      <span onClick={() => window.location.href = "/my/projects"}>Мои проекты</span>
      <span onClick={() => window.location.href = "/my/socials"}>Мои соцсети</span>
      <span onClick={() => window.location.href = "/me/info"}>Немного обо мне</span>
      <span onClick={() => window.location.href = "/me/resume"}>Резюме</span>
      {
        animationsEnabled
          ? <></>
          : <button onClick={() => setAnimationsEnabled(!animationsEnabled)}>Включить анимации?</button>
      }
    </div>
    </>
  )
}