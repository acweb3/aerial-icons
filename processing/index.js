const { read } = require('./read');
const { write } = require('./write');
const { setImages } = require('./setImages');

(async () => {
    const traits = await read();
    const traitsWithImage = await setImages(traits);
    write(traitsWithImage);
})();
