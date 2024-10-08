export function getRandomGradient() {
  const colors = [
    getRandomColor(),
    getRandomColor()
  ];
  
  return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

