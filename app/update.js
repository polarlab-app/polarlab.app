const fs = require('fs');
const path = require('path');

const updateFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/className="([^"]+)"/g, (match, className) => {
        const classes = className
            .split(' ')
            .map((c) => `styles.${c}`)
            .join(' ');
        return `className="${classes}"`;
    });
    fs.writeFileSync(filePath, updatedContent);
};

const updateDirectory = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            updateDirectory(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            updateFile(filePath);
            console.log(`Updated file: ${filePath}`);
        }
    });
};

updateDirectory('./status');
