import type { EmblaOptionsType } from 'embla-carousel';

export type CarouselAxis = 'x' | 'y';

export type CarouselItem = {
	id: string;
	title: string;
	description: string;
	badge: string;
	accent: string;
};

export type CarouselSection = {
	id: string;
	title: string;
	subtitle: string;
	subSlides: CarouselItem[];
};

export type NestedCarouselProps = {
	slides: CarouselItem[];
	sectionTitle: string;
	options?: EmblaOptionsType;
	onInteraction?: () => void;
};

export type MainCarouselProps = {
	sections: CarouselSection[];
	options?: EmblaOptionsType;
	nestedOptions?: EmblaOptionsType;
	kioskMode?: boolean;
	autoplayMs?: number;
	initialAutoplay?: boolean;
};
