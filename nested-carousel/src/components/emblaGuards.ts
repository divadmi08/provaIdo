import type { EmblaOptionsType } from 'embla-carousel';
import type { CarouselAxis } from '../types/carousel';

type DragPointerEvent = TouchEvent | MouseEvent;

const getPoint = (event: DragPointerEvent): { x: number; y: number } | null => {
	if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
		const touch = event.touches[0] ?? event.changedTouches[0];
		if (!touch) return null;
		return { x: touch.clientX, y: touch.clientY };
	}

	if (event instanceof MouseEvent) {
		return { x: event.clientX, y: event.clientY };
	}

	return null;
};

export const createAxisWatchDrag = (axis: CarouselAxis): NonNullable<EmblaOptionsType['watchDrag']> => {
	let startX = 0;
	let startY = 0;

	return (_emblaApi, event) => {
		const point = getPoint(event);
		if (!point) return true;

		if (event.type === 'touchstart' || event.type === 'mousedown') {
			startX = point.x;
			startY = point.y;
			return true;
		}

		const deltaX = Math.abs(point.x - startX);
		const deltaY = Math.abs(point.y - startY);
		if (!deltaX && !deltaY) return true;

		return axis === 'x' ? deltaX >= deltaY : deltaY >= deltaX;
	};
};
