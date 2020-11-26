/**
 * Range facet histogram configuration
 */
export interface HistogramModel {
  // distance between histogram elements
  space?: number;
  // histogram element scale size
  // element count will be presented in pixels = count * scale
  scale?: number;
  // The y-coordinate of the center of the circle. The x-coordinate of the center of the circle is the facet label value,
  // relative to the length of the histogram (runtime calculated)
  baseYPos?: number;
  // The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
  startAngle?: number;
  // The ending angle, in radians
  endAngle?: number;
  // histogram fill, presented in rgba string
  fillStyle?: string;
}
