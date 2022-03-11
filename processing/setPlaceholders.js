const fs = require('fs');
const { join } = require('path');

const IPFS_DIR = 'ipfs://QmdjPZrRsENK3p8WL978E3hrkt37yGrrcboZr6NqyoLr3v';

const FLIGHT_PASS = {
    image: `${IPFS_DIR}/flight_pass.jpg`,
    name: 'Flight Pass',
    attributes: [],
    external_url: 'https://www.aerialicons.art/',
    description:
        'One flight pass.  Aerial Icons are a collection of 100 unique photographs, captured from a helicopter by photographer Dylan Schwartz. There will only ever be 100 Aerial Icons.',
};

const BOARDING_PASS = {
    image: `${IPFS_DIR}/boarding_pass.jpg`,
    name: 'boarding Pass',
    attributes: [],
    external_url: 'https://www.aerialicons.art/',
    description:
        'One boarding pass.  Aerial Icons are a collection of 100 unique photographs, captured from a helicopter by photographer Dylan Schwartz. There will only ever be 100 Aerial Icons.',
};

(() => {
    const metadataDistDir = join(__dirname, 'dist', 'chain', 'set');
    const imagesDistDir = join(__dirname, 'dist', 'images');

    const placeholderRawDir = join(__dirname, 'raw', 'placeholder');

    fs.writeFileSync(
        `${metadataDistDir}/flight_pass`,
        JSON.stringify(FLIGHT_PASS, null, 4)
    );

    fs.writeFileSync(
        `${metadataDistDir}/boarding_pass`,
        JSON.stringify(BOARDING_PASS, null, 4)
    );

    fs.copyFileSync(
        `${placeholderRawDir}/solid-black.jpg`,
        `${imagesDistDir}/flight_pass.jpg`
    );

    fs.copyFileSync(
        `${placeholderRawDir}/solid-black.jpg`,
        `${imagesDistDir}/boarding_pass.jpg`
    );
})();
