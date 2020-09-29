import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

//import { View, Text } from 'react-native';
import 'react-table-6/react-table.css' 
//import MathJax from 'react-mathjax2'
import MathJax from 'react-mathjax-preview'
//import MathJax from 'mathjax'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
/*const Update=styled.div`
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
}*/
class qasList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qas: [],
            columns: [],
            isLoading: false,
        }
        //MathJax.Hub.Config({ tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]} });
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

        const asciimath = '`sum_(i=1)^n i^3=((n(n+1))/2)^2`'
        const math = String.raw`
          <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
            <menclose notation="circle box">
              <mi> x </mi><mo> + </mo><mi> y </mi>
            </menclose>
          </math>
         
          $$\lim_{x \to \infty} \exp(-x) = 0$$
         
          ${asciimath}`

        const columns = [
            /*{
                Header: 'ID',
                accessor: '_id',
            },*/
            {
                Header: 'Question',
                accessor: 'question_tag',
                //Cell: row=> (<MathJax math={math} />),
                Cell: row=> (<div dangerouslySetInnerHTML={{__html: row.value}} />),
                /*Cell: row=>(MathJax math={<div class="ques Answ opnQuestion">
                    <h4 class="tenClassQues">Question 1:</h4>
                    <p><p>Use Euclid’s division algorithm to find the HCF of:</p>
                    <p><img align="ABSMIDDLE" class="progressive replace" data-href="https://img-nm.mnimgs.com/img/study_content/curr/1/10/9/128/1784/Chapter%201_html_m28d8c39e.gif" height="27" name="Object1" src="/img/site_content/ask-answer/loader.gif" width="468"/></p>
                    </p>
                    </div>}),*/
            },
            {
                Header: 'Answer',
                accessor: 'answer_tag',
                Cell: row=> (<div dangerouslySetInnerHTML={{__html: row.value}} />),
            },
            /*{   Header:'',
                accessor:'',
                Cell:function(props){
                    return(
                        <span>
                            <Deleteqa id={props.original._id}/>
                        </span>
                    )
                },
            },
            {   Header:'',
                accessor:'',
                Cell:function(props){
                    return (
                        <span>
                            <Updateqa id={props.original._id}/>
                        </span>
                    )
                },
            },*/
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

