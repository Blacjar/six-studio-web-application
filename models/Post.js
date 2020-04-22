
const Document = require('vertex-camo').Document
const props = {
	image: {type:String, default:''},
	title: {type:String, default:'', display:true},
	preview: {type:String, default:''},
	slug: {type:String, default:'', immutable:true},
	type: {type:String, default:'', immutable:true}, // original or link
	numReplies: {type:Number, default:0, immutable:true},
	isPublic: {type:String, default:'no', immutable:true},
	text: {type:String, default:'', isHtml:true},
	dateString: {type:String, default:''},
	schema: {type:String, default:'post', immutable:true},
	dateString: {type:String, default:'', immutable:true},
	timestamp: {type:Date, default: new Date(), immutable:true}
}

class Post extends Document {
	constructor(){
		super()
		this.schema(props)

		this.timestamp = new Date()
	}

	static get resourceName(){
		return 'post'
	}

	static collectionName(){
			return 'posts'
	}

}

module.exports = Post
