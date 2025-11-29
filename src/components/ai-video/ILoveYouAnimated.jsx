// ILoveYouAnimated.jsx
'use client';
import { useEffect, useRef } from "react";

/**
 * Animated "I LOVE YOU" mo.js SVG + sound
 * Props:
 * - onFinished: callback (optional) จะถูกเรียก 1 ครั้ง หลังหัวใจสุดท้ายหายไป
 * - loop: เล่นวนหรือไม่ (default: true)
 * - style: custom style container
 */
export default function ILoveYouAnimated({
  onFinished,
  loop = true,
  style = {},
}) {
  const svgRef = useRef(null);
  const moRef = useRef(null);
  const blupRef = useRef(null);
  const blopRef = useRef(null);
  const soundRef = useRef(null);
  // ใช้ ref ป้องกันเรียก onFinished หลายรอบ
  const finishedOnceRef = useRef(false);

  useEffect(() => {
    let mojs;
    let timeline;
    let intervalId;
    let mounted = true;

    import('@mojs/core').then((mod) => {
      mojs = mod.default;
      // --- DOM ref mapping ---
      const base = svgRef.current.parentElement;
      const el = {
        container: moRef.current,
        i: base.querySelector('.lttr--I'),
        l: base.querySelector('.lttr--L'),
        o: base.querySelector('.lttr--O'),
        v: base.querySelector('.lttr--V'),
        e: base.querySelector('.lttr--E'),
        y: base.querySelector('.lttr--Y'),
        o2: base.querySelector('.lttr--O2'),
        u: base.querySelector('.lttr--U'),
        lineLeft: base.querySelector('.line--left'),
        lineRight: base.querySelector('.line--rght'),
        colTxt: "#763c8c",
        colHeart: "#fa4843",
        blup: blupRef.current,
        blop: blopRef.current,
        sound: soundRef.current
      };

      // ---- Heart shape ----
      class Heart extends mojs.CustomShape {
        getShape() {
          return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
        }
        getLength() { return 200; }
      }
      mojs.addShape('heart', Heart);

      const easingHeart = mojs.easing.path('M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0');
      const crtBoom = (delay = 0, x = 0, rd = 46) => {
        const parent = el.container;
        const crcl = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: el.colTxt,
          strokeWidth: { 5: 0 },
          radius: { [rd]: [rd + 20] },
          easing: 'quint.out',
          duration: 500 / 3,
          parent,
          delay,
          x
        });
        const brst = new mojs.Burst({
          radius: { [rd + 15]: 110 },
          angle: 'rand(60, 180)',
          count: 3,
          timeline: { delay },
          parent,
          x,
          children: {
            radius: [5, 3, 7],
            fill: el.colTxt,
            scale: { 1: 0, easing: 'quad.in' },
            pathScale: [.8, null],
            degreeShift: ['rand(13, 60)', null],
            duration: 1000 / 3,
            easing: 'quint.out'
          }
        });
        return [crcl, brst];
      };

      const crtLoveTl = () => {
        // อยากช้าลง 25% ให้คูณ 1.25
        const baseMove = 1000 * 1.25;
        const baseBoom = 200 * 1.25;
        const move = baseMove, boom = baseBoom;
        const easing = 'sin.inOut';
        const easingBoom = 'sin.in';
        const easingOut = 'sin.out';
        const opts = { duration: move, easing, opacity: 1 };
        const delta = 150;

        return (new mojs.Timeline).add([
          new mojs.Tween({
            duration: move,
            onStart: () => {
              [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
                item.style.opacity = 1;
                item.style.transform = 'translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1)';
              });
              finishedOnceRef.current = false;
            },
            onComplete: () => {
              [el.l, el.o, el.v, el.e].forEach(item => item.style.opacity = 0);
              el.blop.play();
            }
          }),
          new mojs.Tween({
            duration: move * 2 + boom,
            onComplete: () => {
              [el.y, el.o2].forEach(item => item.style.opacity = 0);
              el.blop.play();
            }
          }),
          new mojs.Tween({
            duration: move * 3 + boom * 2 - delta,
            onComplete: () => {
              el.i.style.opacity = 0;
              el.blop.play();
            }
          }),
          new mojs.Tween({
            duration: move * 3 + boom * 2,
            onComplete: () => {
              el.u.style.opacity = 0;
              el.blup.play();
              // callback แค่รอบแรก
              if (!finishedOnceRef.current && typeof onFinished === "function") {
                finishedOnceRef.current = true;
                setTimeout(() => onFinished(), 500); // delay หลังหัวใจหาย
              }
            }
          }),
          new mojs.Tween({
            duration: 50,
            delay: 4050 * 1.25, // ให้ตรงกับ speed ใหม่
            onUpdate: (progress) => {
              [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
                item.style.transform = `translate(0px,0px) rotate(0deg) skew(0deg,0deg) scale(1,1)`;
                item.style.opacity = `${1 * progress}`;
              });
            },
            onComplete: () => {
              [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
                item.style.opacity = 1;
                item.style.transform = 'translate(0px,0px) rotate(0deg) skew(0deg,0deg) scale(1,1)';
              });
            }
          }),

          new mojs.Html({ ...opts, el: el.lineLeft, x: { 0: 52 } })
            .then({ duration: boom + move, easing, x: { to: 52 + 54 } })
            .then({ duration: boom + move, easing, x: { to: 52 + 54 + 60 } })
            .then({ duration: 150, easing, x: { to: 52 + 54 + 60 + 10 } })
            .then({ duration: 300 })
            .then({ duration: 350, x: { to: 0 }, easing: easingOut }),

          new mojs.Html({ ...opts, el: el.lineRight, x: { 0: -52 } })
            .then({ duration: boom + move, easing, x: { to: -52 - 54 } })
            .then({ duration: boom + move, easing, x: { to: -52 - 54 - 60 } })
            .then({ duration: 150, easing, x: { to: -52 - 54 - 60 - 10 } })
            .then({ duration: 300 })
            .then({ duration: 350, x: { to: 0 }, easing: easingOut }),

          new mojs.Html({ ...opts, el: el.i, x: { 0: 34 } })
            .then({ duration: boom, easing: easingBoom, x: { to: 34 + 19 } })
            .then({ duration: move, easing, x: { to: 34 + 19 + 40 } })
            .then({ duration: boom, easing: easingBoom, x: { to: 34 + 19 + 40 + 30 } })
            .then({ duration: move, easing, x: { to: 34 + 19 + 40 + 30 + 30 } }),

          new mojs.Html({ ...opts, el: el.l, x: { 0: 15 } }),
          new mojs.Html({ ...opts, el: el.o, x: { 0: 11 } }),
          new mojs.Html({ ...opts, el: el.v, x: { 0: 3 } }),
          new mojs.Html({ ...opts, el: el.e, x: { 0: -3 } }),

          new mojs.Html({ ...opts, el: el.y, x: { 0: -20 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -20 - 33 } })
            .then({ duration: move, easing, x: { to: -20 - 33 - 24 } }),

          new mojs.Html({ ...opts, el: el.o2, x: { 0: -27 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -27 - 27 } })
            .then({ duration: move, easing, x: { to: -27 - 27 - 30 } }),

          new mojs.Html({ ...opts, el: el.u, x: { 0: -32 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -32 - 21 } })
            .then({ duration: move, easing, x: { to: -32 - 21 - 36 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -32 - 21 - 36 - 31 } })
            .then({ duration: move, easing, x: { to: -32 - 21 - 36 - 31 - 27 } }),

          new mojs.Shape({
            parent: el.container,
            shape: 'heart',
            delay: move,
            fill: el.colHeart,
            x: -64,
            scale: { 0: 0.95, easing: easingHeart },
            duration: 500
          })
            .then({ x: { to: -62, easing }, scale: { to: 0.65, easing }, duration: boom + move - 500 })
            .then({ duration: boom - 50, x: { to: -62 + 48 }, scale: { to: 0.90 }, easing: easingBoom })
            .then({ duration: 125, scale: { to: 0.8 }, easing: easingOut })
            .then({ duration: 125, scale: { to: 0.85 }, easing: easingOut })
            .then({ duration: move - 200, scale: { to: 0.45 }, easing })
            .then({ delay: -75, duration: 150, x: { to: 0 }, scale: { to: 0.90 }, easing: easingBoom })
            .then({ duration: 125, scale: { to: 0.8 }, easing: easingOut })
            .then({ duration: 125, scale: { to: 0.85 }, easing: easingOut })
            .then({ duration: 125 })
            .then({ duration: 350, scale: { to: 0 }, easing: easingOut }),

          ...crtBoom(move, -64, 46),
          ...crtBoom(move * 2 + boom, 18, 34),
          ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
          ...crtBoom(move * 3 + boom * 2, 45, 34)
        ]);
      };

      // --- Start animation ---
      timeline = crtLoveTl();
      timeline.play();

      if (loop) {
        intervalId = setInterval(() => {
          timeline.replay();
        }, 1.25 * 4300); // ตรงกับความช้าใหม่
      }

      // set initial volume
      const volume = 0.2;
      if (el.blup) el.blup.volume = volume;
      if (el.blop) el.blop.volume = volume;

      // toggle sound
      let on = true;
      const toggleSound = () => {
        if (on) {
          el.blup.volume = 0.0;
          el.blop.volume = 0.0;
          el.sound.classList.add('sound--off');
        } else {
          el.blup.volume = volume;
          el.blop.volume = volume;
          el.sound.classList.remove('sound--off');
        }
        on = !on;
      };
      if (el.sound) el.sound.onclick = toggleSound;
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeline) timeline.stop();
      mounted = false;
    };
  }, [loop, onFinished]);

  return (
    <div style={{
      width: "100vw",
      minHeight: "30vh",
      position: "relative",
      ...style,
    }}>
      <svg
        ref={svgRef}
        className="svg-container"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 200"
      >
        <line className="line line--left" x1="10" y1="17" x2="10" y2="183"> </line>
        <line className="line line--rght" x1="490" y1="17" x2="490" y2="183"> </line>
        <g>
          <path className="lttr lttr--I" d="M42.2,73.9h11.4v52.1H42.2V73.9z"></path>
          <path className="lttr lttr--L" d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z"></path>
          <path className="lttr lttr--O" d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z"></path>
          <path className="lttr lttr--V" d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z"></path>
          <path className="lttr lttr--E" d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z"></path>
          <path className="lttr lttr--Y" d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z"></path>
          <path className="lttr lttr--O2" d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z"></path>
          <path className="lttr lttr--U" d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z"></path>
        </g>
      </svg>
      <div ref={moRef} className="mo-container" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} />
      {/* Sound */}
      <audio ref={blupRef} className="blup" style={{ display: "none" }}>
        <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
      </audio>
      <audio ref={blopRef} className="blop" style={{ display: "none" }}>
        <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
      </audio>
      <div ref={soundRef} className="sound">sound</div>
    </div>
  );
}
