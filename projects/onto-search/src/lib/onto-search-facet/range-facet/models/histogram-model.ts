/**
 * Range facet histogram configuration
 */
export interface HistogramModel {
  // histogram element scale size
  // element count will be presented in pixels = count * scale
  scale?: number;
  // The y-coordinate of the center of the circle. The x-coordinate of the center of the circle is the facet label value,
  // relative to the length of the histogram (runtime calculated)
  baseYPos?: number;
  // histogram fill, presented in rgba string
  fillStyle?: string;
}
