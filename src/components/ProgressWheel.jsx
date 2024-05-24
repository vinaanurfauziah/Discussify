// /* eslint-disable consistent-return */
// /* eslint-disable import/no-extraneous-dependencies */
// // src/components/ProgressWheel.jsx
// import React, { useEffect, useRef } from 'react';
// import { useViewportScroll } from 'framer-motion';

// function ProgressWheel() {
//   const progressRef = useRef(null);
//   const { scrollYProgress } = useViewportScroll();

//   useEffect(() => {
//     const progressWheel = progressRef.current;

//     if (progressWheel) {
//       return scrollYProgress.onChange((progress) => {
//         progressWheel.style.strokeDasharray = `${progress}, 1`;
//       });
//     }
//   }, [scrollYProgress]);

//   return (
//     <svg
//       width="50"
//       height="50"
//       viewBox="0 0 100 100"
//       className="progress-wheel"
//     >
//       <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
//       <circle
//         ref={progressRef}
//         cx="50"
//         cy="50"
//         r="30"
//         pathLength="1"
//         className="progress"
//       />
//     </svg>
//   );
// }

// export default ProgressWheel;
