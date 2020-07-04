import { TweenMax, Power3 } from 'gsap';

export const animateTodo = () => {
	TweenMax.to('.todo', 0.01, {
		opacity: 1,
		y: 15,
		ease: Power3.easeOut,
		stagger: 0.1
	});
};
