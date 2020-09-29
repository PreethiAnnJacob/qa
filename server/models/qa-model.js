const mongoose=require('mongoose')
const Schema=mongoose.Schema

const QA=new Schema(
	{	question_tag: {type:String,required:true},
		answer_tag: {type:String,required:true}, 
	},
)

module.exports=mongoose.model('qa',QA)