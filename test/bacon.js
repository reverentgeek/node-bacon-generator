const code = require( "code" );
const Lab = require( "lab" );

const bacon = require( "../src/bacon" );

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const expect = code.expect;
const it = lab.it;

describe( "bacon tests", () => {
	it( "makes the bacon", () => {
		const pounds = bacon.generateBacon( 2 );
		expect( pounds.length ).to.equal( 2 );
	} );

	it( "defaults to one pound of bacon", () => {
		const pounds = bacon.generateBacon();
		expect( pounds.length ).to.equal( 1 );
	} );

	it( "generates a random sentence", () => {
		const sentence = bacon.randomSentence();
		const words = sentence.split( " " );
		expect( words.length ).to.be.between( 3, 13 );
		const uniqueWords = [];
		words.forEach( word => {
			if ( uniqueWords.indexOf( word ) === -1 ) {
				uniqueWords.push( word );
			}
		} );
		expect( uniqueWords.length ).to.equal( words.length );
	} );

	it( "generates a random word", () => {
		const word = bacon.randomWord();
		expect( word ).to.exist();
		expect( word.length ).to.be.above( 1 );
	} );
} );
