const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { TEMP_DIR_PLACEHOLDER } = require('./read');

const asyncReaddir = promisify(fs.readdir);
const asyncWriteFile = promisify(fs.writeFile);

const IPFS_DIR = 'ipfs://QmdjPZrRsENK3p8WL978E3hrkt37yGrrcboZr6NqyoLr3v';

/**
 * Set IPFS URL within metadata
 */
(async () => {
    const metadataRawDir = join(__dirname, 'dist', 'chain', 'unset');
    const metadataDistDir = join(__dirname, 'dist', 'chain', 'set');

    const files = await asyncReaddir(metadataRawDir);

    files.forEach(async (file) => {
        try {
            const fileContents = fs.readFileSync(
                `${metadataRawDir}/${file}`,
                'utf8'
            );

            await asyncWriteFile(
                `${metadataDistDir}/${file}`,
                fileContents.replace(
                    TEMP_DIR_PLACEHOLDER,
                    `${IPFS_DIR}/${file}.png`
                )
            );
        } catch (e) {
            console.log(e);
            console.log('ERROR');
            console.log(file);
        }
    });
})();
