const QA=require('../models/qa-model')

createqa=(req,res)=>{
	const body=req.body
	if(!body){
		return res.status(400).json({
			success:false,
			error:'You must provide a qa',
		})
	}

	const qa=new QA(body)
	if(!qa){
		return res.status(400).json({success:false,error:err})
	}
	qa
		.save()
		.then(()=>{
			return res.status(201).json({
				success:true,
				id:qa._id,
				message:'qa created!',
			})
		})
		.catch(error=>{
			return res.status(400).json({
				error,
				message:'qa not created!',
			})
		})
}

updateqa=async(req,res)=>{
	const body=req.body
	if(!body){
		return res.status(400).json({
			success:false,
			error:'You must provide a body to update',
		})
	}
	QA.findOne({_id:req.params.id},(err,qa)=>{
		if(err){
			return res.status(404).json({
				err,
				message:'qa not found!',
			})
		}
		qa.question_tag=body.question_tag
		qa.answer_tag=body.answer_tag
		qa
			.save()
			.then(()=>{
				return res.status(200).json({
					success:true,
					id:qa._id,
					message:'qa updated!',
				})
			})
			.catch(error=>{
				return res.status(404).json({
					error,
					message:'qa not updated!',
				})
			})
	})
}

deleteqa = async (req, res) => {
    await QA.findOneAndDelete({ _id: req.params.id }, (err, qa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!qa) {
            return res
                .status(404)
                .json({ success: false, error: `qa not found` })
        }

        return res.status(200).json({ success: true, data: qa })
    }).catch(err => console.log(err))
}


getqaById=async(req,res)=>{
	await QA.findOne({_id:req.params.id},(err,qa)=>{
		if(err){
			return res.status(400).json({success:false,error:err})
		}
		if(!qa){
			return res.status(404).json({success:false,error:`qa not found`})
		}
		return res.status(200).json({success:true,data:qa})
	}).catch(err=>console.log(err))
}
getqas=async(req,res)=>{
	await QA.find({},(err,qa)=>{
		if(err){
			return res.status(400).json({success:false,error:err})
		}
		if(!qa.length){
			return res.status(404).json({success:false,error:`qa not found`})
		}
		return res.status(200).json({success:true,data:qa})
	}).catch(err=>console.log(err))
}
module.exports={
	createqa,
	updateqa,
	deleteqa,
	getqas,
	getqaById
}