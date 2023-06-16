"use strict";

const test = require( "node:test" );
const assert = require( "node:assert" );
const { describe, it } = test;

const bacon = require( "../src/bacon" );

test( "synchronous passing test", ( t ) => {
	// This test passes because it does not throw an exception.
	assert.strictEqual( 1, 1 );
} );

describe( "bacon tests", () => {
	it( "makes the bacon", () => {
		const pounds = bacon.generateBacon( 2 );
		assert.strictEqual( pounds.length, 2 );
	} );

	it( "defaults to one pound of bacon", () => {
		const pounds = bacon.generateBacon();
		assert.strictEqual( pounds.length, 1 );
	} );

	it( "generates a random sentence", () => {
		const sentence = bacon.randomSentence();
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
		const word = bacon.randomWord();
		const exists = !!word;
		assert.equal( exists, true );
		const hasCharacters = word.length > 1;
		assert.equal( hasCharacters, true );
	} );
} );
