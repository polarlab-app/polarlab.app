'use server';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

zxcvbnOptions.setOptions({
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    translations: zxcvbnEnPackage.translations,
});

export default async function validatePassword(password) {
    try {
        const result = zxcvbn(password);
        return result.score;
    } catch (error) {
        console.error('Password validation error:', error);
        return 'An internal error has occurred, please contact support';
    }
}
