import fs from "fs-extra";

const wordList = fs.readFileSync( "./src/bacon.txt", { encoding: "UTF-8" } );
const words = wordList.split( "\n" ).map( b => b.trim() ).filter( b => b !== "" );
const punctuation = [ ".", "!", ".", ".", ".", "?", ".", "." ];
const MIN_SENTENCE_WORDS = 4;
const MAX_SENTENCE_WORDS = 12;
const MIN_PARAGRAPH_SENTENCES = 3;
const MAX_PARAGRAPH_SENTENCES = 6;

export const randomNumber = ( min, max ) => {
	return Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
};

const randomItem = ( items, exclude = [] ) => {
	const filteredItems = items.filter( item => exclude.indexOf( item ) === -1 );
	const idx = randomNumber( 0, filteredItems.length - 1 );
	return filteredItems[ idx ];
};

export const randomWord = exclude => {
	return randomItem( words, exclude );
};

const randomPunctuation = () => {
	return randomItem( punctuation );
};

export const randomSentence = () => {
	const numberOfWords = randomNumber( MIN_SENTENCE_WORDS, MAX_SENTENCE_WORDS );
	const randomWords = [];
	for ( let i = 0; i < numberOfWords; i++ ) {
		randomWords.push( randomWord( randomWords ) );
	}
	const sentence = randomWords.join( " " );
	return `${ sentence.charAt( 0 ).toUpperCase() + sentence.slice( 1 ) }${ randomPunctuation() }`;
};

const getParagraph = () => {
	const numberOfSentences = randomNumber( MIN_PARAGRAPH_SENTENCES, MAX_PARAGRAPH_SENTENCES );
	const sentences = [];
	for ( let i = 0; i < numberOfSentences; i++ ) {
		sentences.push( randomSentence() );
	}
	return sentences.join( " " );
};

export const generateBacon = ( paragraphs = 1 ) => {
	const numberOfParagraphs = paragraphs > 1 ? paragraphs : 1;
	const randomParagraphs = [];
	for ( let i = 0; i < numberOfParagraphs; i++ ) {
		randomParagraphs.push( getParagraph() );
	}
	return randomParagraphs;
};
