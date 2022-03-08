const fs = require('fs');

const write = (traits) => {
    traits.forEach((trait, index) => {
        fs.writeFileSync(
            `dist/chain/unset/${index}`,
            JSON.stringify(trait, null, 4)
        );
    });
};

module.exports = {
    write,
};
