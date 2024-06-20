const getRandomColor = (index = 0)=>{
    index = index??Math.round(Math.random() * 10);
  
    let colors = ["#FF0000", "#FF8C00", "#FFCD00", "#FFEB00", "#FF00FF", "#FF6EB4", "#FF1493", "#FF4500", "#FF7300", "#FFD700", "#00FF00", "#00FF7F", "#00FFFF", "#00CED1", "#0000FF", "#8A2BE2", "#9932CC", "#FF69B4", "#DA70D6", "#FFA07A"];
  
    let color = colors[index%colors.length];
  
    return color;
  }

  function lightenHexColor(hex, percent) {
    // Remove the '#' if present
    hex = hex.replace(/^#/, '');
  
    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
  
    // Parse the hex color to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the new RGB values
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
    // Convert the new RGB values to hex
    const newHex = '#' + [newR, newG, newB]
      .map(value => value.toString(16).padStart(2, '0'))
      .join('');
  
    return newHex;
  }
  
  // Example usage
  const originalHex = '#3498db'; // Original color
  const lighterHex = lightenHexColor(originalHex, 20); // Lighten by 20%
  console.log(lighterHex); // Output: #6cbef1
  

  export{getRandomColor,lightenHexColor}