export function cameraFor(fx: number, fy: number, scale: number) {
  return {
    scale,
    x: 768 - fx * scale,
    y: 512 - fy * scale,
  };
}
