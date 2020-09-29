import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css' 

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Update=styled.div`
	color:#ef9b0f;
	cursor:pointer;
`
const Delete=styled.div`
	color:#ff0000;
	cursor:pointer;
`
class Updateqa extends Component{
	updateUser=event=>{
		event.preventDefault()
		window.location.href=`/qas/update/${this.props.id}`
	}
	render(){
		return <Update onClick={this.updateUser}>Update</Update>
	}
}
class Deleteqa extends Component{
	deleteUser=event=>{
		event.preventDefault()
		if(window.confirm(`Do you want to delete the qa ${this.props.id} permanently?`,)){
			api.deleteqaById(this.props.id)
			window.location.reload()
		}
	}
	render(){
		return <Delete onClick={this.deleteUser}>Delete</Delete>
	}
}
class qasList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qas: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllqas().then(qas => {
            this.setState({
                qas: qas.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { qas, isLoading } = this.state
        console.log('TCL: qasList -> render -> qas', qas)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Question',
                accessor: 'question_tag',
                filterable: true,
            },
            {
                Header: 'Answer',
                accessor: 'answer_tag',
                filterable: true,
            },
            {	Header:'',
            	accessor:'',
            	Cell:function(props){
            		return(
            			<span>
            				<Deleteqa id={props.original._id}/>
            			</span>
            		)
            	},
            },
            {	Header:'',
            	accessor:'',
            	Cell:function(props){
            		return (
            			<span>
            				<Updateqa id={props.original._id}/>
            			</span>
            		)
            	},
            },
        ]

        let showTable = true
        if (!qas.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={qas}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default qasList