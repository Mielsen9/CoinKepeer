import {useEffect, useRef} from "react";
// Type
type useScrollPropsType = {
	content: any[];
};
// useScroll
export const useScroll = (p: useScrollPropsType ) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const scrollPosition = useRef<number>(0);

	useEffect(() => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
				console.log('scrollContainerRef.current.scrollHeight', scrollContainerRef.current.scrollHeight);
				if (scrollContainerRef.current.scrollHeight !== undefined && scrollContainerRef.current.scrollHeight !== scrollPosition.current) {
					scrollPosition.current = scrollContainerRef.current.scrollHeight;
					console.log('Updated scroll position:', scrollPosition.current);
					}
			}
	}, [p.content]);
	// Return
	return {
		scrollContainerRef,
	}
};