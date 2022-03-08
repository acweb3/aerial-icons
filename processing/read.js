const fs = require('fs');
const { snakeCase } = require('change-case');

const DELIMITER = '\t';

const ATTRIBUTES = [
    'Title',
    'Created By',
    'Artist',
    'Location',
    'Shot From',
    'Altitude',
    'Latitude & Longitude',
];

const TEMP_DIR_PLACEHOLDER = '__TEMP__';

const HIGH_LEVEL_ATTRIBUTES = ['Description', 'External URL', 'Filename'];

const read = async () => {
    const rawCSV = fs.readFileSync('data.tsv', 'utf-8');
    const rawCSVLines = rawCSV.split('\r\n');
    const csvLines = rawCSVLines.map((line) => line.split(DELIMITER));
    csvLines.forEach((line) => line.pop());
    const headers = csvLines.shift();

    const data = csvLines.map((line) => {
        return line.reduce(
            (acc, trait, index) => {
                if (
                    headers[index] === 'Dropbox' ||
                    headers[index] === 'Created By'
                ) {
                    return acc;
                }

                if (headers[index] === 'Title') {
                    return {
                        ...acc,
                        name: trait,
                    };
                }

                if (HIGH_LEVEL_ATTRIBUTES.includes(headers[index])) {
                    return {
                        ...acc,
                        [snakeCase(headers[index])]: trait,
                    };
                }

                const attribute = {
                    trait_type: headers[index],
                    value: trait,
                };

                return {
                    ...acc,
                    attributes: acc.attributes
                        ? [...acc.attributes, attribute]
                        : [attribute],
                };
            },
            { image: TEMP_DIR_PLACEHOLDER }
        );
    });

    return data;
};

module.exports = {
    read,
    TEMP_DIR_PLACEHOLDER,
};
