import { describe, it } from "node:test";
import assert from "node:assert";
import { generateBacon, randomSentence, randomWord } from "../src/bacon.js";

describe( "bacon tests", () => {
	it( "makes the bacon", () => {
		const pounds = generateBacon( 2 );
		assert.strictEqual( pounds.length, 2 );
	} );

	it( "defaults to one pound of bacon", () => {
		const pounds = generateBacon();
		assert.strictEqual( pounds.length, 1 );
	} );

	it( "generates a random sentence", () => {
		const sentence = randomSentence();
		const words = sentence.split( " " );
		const isValid = words.length > 3 && words.length < 13;
		assert.equal( isValid, true );

		const uniqueWords = [];
		words.forEach( word => {
			if ( uniqueWords.indexOf( word ) === -1 ) {
				uniqueWords.push( word );
			}
		} );
		assert.strictEqual( uniqueWords.length, words.length );
	} );

	it( "generates a random word", () => {
		const word = randomWord();
		const exists = !!word;
		assert.equal( exists, true );
		const hasCharacters = word.length > 1;
		assert.equal( hasCharacters, true );
	} );
} );
