export function shadeColor(color: string, percent: number): string {
  let rgb = [];
  rgb.push(parseInt(color.substring(1, 3), 16));
  rgb.push(parseInt(color.substring(3, 5), 16));
  rgb.push(parseInt(color.substring(5, 7), 16));

  rgb = rgb.map((a) => {
    let val = Math.round(a * percent);
    val = val > 255 ? 255 : val;
    val = val < 0 ? 0 : val;
    return val;
  });

  const stringRGB = rgb.map((a) => {
    let stringVal = a.toString(16);
    if (stringVal.length == 1) stringVal = "0" + stringVal;
    return stringVal;
  });
  return "#" + stringRGB.join("");
}
