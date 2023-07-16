export default function calculateEuclideanDistance(coordinates1: [number, number], coordinates2: [number, number]) {
	const [x1, y1] = coordinates1;
	const [x2, y2] = coordinates2;

	const deltaX = x2 - x1;
	const deltaY = y2 - y1;

	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	return distance;
}
