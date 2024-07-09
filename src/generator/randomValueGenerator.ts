import { ValueType, Options } from './type/mockTypes';
import { wordList } from './words/wordList';

function randomValue(value: ValueType = { type: 'null' }, options: Partial<Options> = {}): any {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const special = '!@#$%^&*()_+';
    const preffix = ['in', 'un', 're', 'dis', 'mis', 'non', 'anti', 'de', 'en', 'em', 'fore', 'in', 'im', 'il', 'ir', 'inter', 'mid', 'mis', 'over', 'pre', 're', 'semi', 'sub', 'super', 'tele', 'trans', 'ultra', 'under'];
    const suffix = ['acy', 'al', 'ance', 'ence', 'dom', 'er', 'or', 'ism', 'ist', 'ity', 'ty', 'ment', 'ness', 'ship', 'sion', 'tion', 'ate', 'en', 'ify', 'fy', 'ize', 'ise', 'able', 'ible', 'esque', 'ful', 'ic', 'ical', 'ious', 'ous', 'ish', 'ive', 'less', 'y'];

    if (value.type === 'string') {
        const randomString = Math.floor(Math.random() * 11);

        const isWord = options.isWord || false;
        const isPhoneNumber = options.isPhoneNumber || false;

        if (isPhoneNumber) {
            let phoneNumber = '08';

            for (let i = 0; i < 10; i++) {
                phoneNumber += number[Math.floor(Math.random() * number.length)];
            }

            return `'${phoneNumber}'`;
        } else {
            if (randomString > 5 && !isWord) {
                const stringLength = Math.floor(Math.random() * 16) + 10;

                let word = '';

                for (let i = 0; i < stringLength; i++) {
                    const typeString = Math.floor(Math.random() * 11);

                    let randomLetter: string;
                    if (typeString > 3) {
                        randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                    } else if (typeString > 6) {
                        randomLetter = number[Math.floor(Math.random() * number.length)];
                    } else {
                        randomLetter = special[Math.floor(Math.random() * special.length)];
                    }

                    word += randomLetter;
                }

                return `'${word}'`;
            } else {
                const wordLength = Math.floor(Math.random() * 5) + 1;

                let word = '';

                for (let i = 0; i < wordLength; i++) {
                    let randomWord = wordList[Math.floor(Math.random() * wordList.length)].trim();

                    const usingPrefix = Math.floor(Math.random() * 11);
                    const usingSuffix = Math.floor(Math.random() * 11);

                    if (usingPrefix > 5) {
                        randomWord = preffix[Math.floor(Math.random() * preffix.length)] + randomWord;
                    }

                    if (usingSuffix > 5) {
                        randomWord = randomWord + suffix[Math.floor(Math.random() * suffix.length)];
                    }

                    word += randomWord;
                    if (i < wordLength - 1) {
                        word += ' ';
                    }
                }
                return `'${word}'`;
            }
        }
    } else if (value.type === 'number') {
        return Math.floor(Math.random() * 101).toString();
    } else if (value.type === 'boolean') {
        return Math.random() < 0.5;
    } else if (value.type === 'object') {
        const properties = value.properties || [];

        const objectValue: { [key: string]: any } = {};

        for (const property of properties) {
            const propertyName = property.name;
            const propertyType = property.type;

            const propertyValue: ValueType = {
                type: propertyType,
            };

            if (propertyType === 'object') {
                propertyValue.properties = property.properties;
            }
            if (propertyName.toLowerCase() === 'phone_number' || propertyName.toLowerCase() === 'phonenumber') {
                options.isPhoneNumber = true;
            }

            objectValue[propertyName] = randomValue(propertyValue, options);
        }

        return objectValue;
    } else {
        return 'null';
    }
}

export { randomValue };