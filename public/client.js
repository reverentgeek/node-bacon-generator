import { createApp } from "/vue/vue.esm-browser.js";
import VueClipboard from "/vueClip/vue3-clipboard-es.min.js";

const app = createApp( {
	data() {
		return {
			numberOfPounds: 3,
			paragraphs: [],
			copied: false
		};
	},
	computed: {
		paragraphText: function () {
			return this.paragraphs.join( "\n\n" );
		},
		hazBacon: function () {
			return this.paragraphs.length > 0;
		},
		poundText: function () {
			return this.numberOfPounds == 1 ? "pound" : "pounds";
		}
	},
	methods: {
		makeTheBacon: async function () {
			// const response = await fetch( "/api/bacon" );
			const response = await fetch( "/api/bacon/" + this.numberOfPounds );
			const data = await response.json();
			console.log( data );
			this.paragraphs = data.paragraphs;
		},
		baconCopied: function () {
			this.copied = true;
			setTimeout( () => {
				this.copied = false;
			}, 1500 );
		}
	},
	template: `
	<div class="container flex flex-col items-center">
		<div class="text-2xl">Gimme about
			<select class="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 font-bold" 
				v-model="numberOfPounds">
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>5</option>
				<option>8</option>
				<option>13</option>
				<option>21</option>
			</select>
			{{ poundText }} of bacon
		</div>
		<button type="button" class="flex-none bg-green-300 rounded rounded-full py-3 px-6 object-center mt-2" @click="makeTheBacon">Make the Bacon!</button>
		<div class="w-full px-4 my-4" v-for="p in paragraphs">{{ p }}</div>
		<button v-if="hazBacon && !copied" type="button" class="flex-1 bg-green-300 rounded rounded-full py-3 px-6 object-center mt-2 ml-4" v-clipboard:copy="paragraphText" v-clipboard:success="baconCopied">Copy to the clipboard!</button>
		<button v-if="copied" type="button" class="flex-1 bg-yellow-300 rounded rounded-full py-3 px-6 object-center mt-2 ml-4" >Copied!</button>
	</div>
	`
} );

// app.use( VueClipboard );
app.use( VueClipboard, {
	autoSetContainer: true,
	appendToBody: true
} );
app.mount( "#app" );
