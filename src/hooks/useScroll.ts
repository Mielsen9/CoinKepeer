import {useEffect, useRef, useState} from "react";
// Type
type useScrollPropsType = {
	content: any[];
};
// useScroll
export const useScroll = (p: useScrollPropsType ) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [scrollHeight, setScrollHeight] = useState<number>(370);

	useEffect(() => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
				console.log('scrollContainerRef.current.scrollTop', scrollContainerRef.current.scrollTop);
				setScrollHeight(scrollContainerRef.current.scrollHeight)
			}
	}, [p.content]);
	// Return

	return {
		scrollContainerRef,
		scrollHeight,
	}
};