let generateClickCount = 0; // Counter to track button clicks

document.getElementById('certificateForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  generateClickCount++; // Increment the counter on every button click

  // Check if the user has generated more than 5 certificates
  if (generateClickCount > 5) {
    alert('You have reached the limit of generating 5 certificates. Reload to generate new certificates');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const date = document.getElementById('date').value.trim();

  if (!name || !category || !date) {
    alert('Please fill out all fields before generating a certificate.');
    generateClickCount--; // Decrement the counter if inputs are invalid
    return;
  }

  const certificatesContainer = document.getElementById('certificates');
  const canvas = document.createElement('canvas');
  canvas.width = 1100; // Set canvas size to match background
  canvas.height = 900; // Set canvas size to match background
  const ctx = canvas.getContext('2d');

  const img = new Image();
  const backgroundIndex = certificatesContainer.children.length % 5;
  img.src = `assets/bg${backgroundIndex + 1}.jpg`;

  img.onload = async () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const response = await fetch('https://certificategenerator-amarpreet.onrender.com/backend/generate-certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, date }),
    });
    const data = await response.json();
    const generatedContent = data.content ? data.content.trim() : 'Certificate Content Unavailable';

    // Define fonts, colors, and styles for each background
    const styles = [
      { title: 'italic bold 48px Arial', body: 'italic bold 35px Arial', footer: 'italic 28px Arial', color: '#000' },
      { title: 'italic bold 48px Times New Roman', body: 'italic bold 40px Times New Roman', footer: 'italic 28px Times New Roman', color: '#003366' },
      { title: 'italic bold 48px Allura', body: 'italic bold 40px Allura', footer: 'italic 28px Georgia', color: '#663399' },
      { title: 'italic bold 48px Verdana', body: 'italic bold 32px Verdana', footer: 'italic 28px Verdana', color: '#006400' },
      { title: 'italic bold 48px Helvetica', body: 'italic bold 35px Helvetica', footer: 'italic 28px Helvetica', color: '#8B0000' },
    ];
    const selectedStyle = styles[backgroundIndex];

    ctx.fillStyle = selectedStyle.color;
    ctx.textAlign = 'center';

    // Function to wrap text
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      const lines = [];

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = context.measureText(testLine).width;

        if (testWidth > maxWidth) {
          lines.push(line.trim());
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, y + i * lineHeight);
      }

      return y + lines.length * lineHeight;
    };

    const margin = 150; // Adjust margin from the sides

    // Add Title
    ctx.font = selectedStyle.title;
    ctx.fillText('Certificate of Completion', canvas.width / 2, 200); // Shifted slightly down

    // Add Recipient
    ctx.font = selectedStyle.body;
    ctx.fillText(`Proudly Presented to: "${name}"`, canvas.width / 2, 300); // Adjusted Y-position

    // Add Generated Content
    const startY = 400; // Start position for content
    wrapText(ctx, generatedContent, canvas.width / 2, startY, canvas.width - margin * 2, 40);

    // Add Footer Date
    ctx.font = selectedStyle.footer;
    ctx.fillText(`Date: ${date}`, canvas.width / 2, canvas.height - 125); // Positioned at the bottom of the canvas

    // Create a div to hold the canvas and area information
    const certificateDiv = document.createElement('div');
    certificateDiv.className = 'certificate';
    certificateDiv.appendChild(canvas);

    // Add a <textarea> element to display the Canvas.js code
    const codeBlock = document.createElement('textarea');
    codeBlock.textContent = `
const canvas = document.createElement('canvas');
canvas.width = ${canvas.width};
canvas.height = ${canvas.height};
const ctx = canvas.getContext('2d');

// Draw background
const img = new Image();
img.src = 'assets/bg${backgroundIndex + 1}.jpg';
img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Title
  ctx.font = '${selectedStyle.title}';
  ctx.fillStyle = '${selectedStyle.color}';
  ctx.textAlign = 'center';
  ctx.fillText('Certificate of Completion', canvas.width / 2, 200);

  // Recipient
  ctx.font = '${selectedStyle.body}';
  ctx.fillText('Proudly Presented to: "${name}"', canvas.width / 2, 300);

  // Content
  ctx.font = '${selectedStyle.body}';
  const margin = 150;
  wrapText(ctx, '${generatedContent}', canvas.width / 2, 400, canvas.width - margin * 2, 40);

  // Footer Date
  ctx.font = '${selectedStyle.footer}';
  ctx.fillText('Date: ${date}', canvas.width / 2, canvas.height - 125);
};
    `.trim();
    codeBlock.style.width = '100%';
    codeBlock.style.height = '150px';
    codeBlock.style.marginTop = '10px';
    codeBlock.style.background = '#f4f4f4';
    codeBlock.style.padding = '10px';
    codeBlock.style.border = '1px solid #ddd';
    codeBlock.style.borderRadius = '5px';
    codeBlock.readOnly = true;

    // Append the <textarea> to the certificate div
    certificateDiv.appendChild(codeBlock);
     // Add a download button
     const downloadButton = document.createElement('button');
     downloadButton.textContent = 'Download PDF';
     downloadButton.style.marginTop = '10px';
     downloadButton.onclick = () => {
       const pdf = new window.jspdf.jsPDF('landscape','pt', [canvas.width, canvas.height]);
       const imgData = canvas.toDataURL('image/png', 1.0); // High-quality PNG
       pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height); // Adjust dimensions
       pdf.save(`Certificate-${name}-${category}.pdf`);
     };
     certificateDiv.appendChild(downloadButton);

    // Append the certificate div to the container
    certificatesContainer.appendChild(certificateDiv);
  };
});
