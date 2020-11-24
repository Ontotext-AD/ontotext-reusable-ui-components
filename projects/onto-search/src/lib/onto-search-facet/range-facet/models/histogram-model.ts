/**
 * Range facet histogram configuration
 */
export interface HistogramModel {
  // distance between histogram elements
  space?: number;
  // histogram element scale size
  // element count will be presented in pixels = count * scale
  scale?: number;
  baseYPos?: number;
  endAngle?: number;

  // histogram fill, presented in rgba string
  fillStyle?: string;
}
