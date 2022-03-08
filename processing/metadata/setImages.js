const fs = require('fs');
const { join } = require('path');

const setImages = async (data) => {
    data.forEach((line, index) => {
        fs.copyFileSync(
            join(__dirname, 'raw', 'images', line.filename),
            join(__dirname, 'dist', 'images', `${index}.png`)
        );
    });
    return data.map(({ filename, ...line }) => line);
};

module.exports = {
    setImages,
};
