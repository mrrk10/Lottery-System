import {useState, useEffect} from 'react'
const TicketWinner =()=> {
    const [ticketList, setTicketList] = useState([])
    const [stillInTheGame, setStillInTheGame] = useState(true)
    const [typedTicketNo,setTypedTicketNo] = useState('')
    const [currentName,setCurrentName] = useState('')
    const [errMsg,setErrMsg] = useState('')

   const colorList = ['aqua', 'red','green']
   const [colorIndex, setColorIndex] = useState(0)
    const fetchTicketData = async()=> {
       const data = await fetch('http://localhost:4000/ticket/')
        const tickets = await data.json()   
       const allTicketList = tickets.ticketList
        //make an empty array tempArr
        //loop allticketList and push the item.ticketNo to tempArr
        //if tempArr already has item.ticketNo do not add
        //  setTicketList(tempArr)
       const tempList = []
       allTicketList.map((item)=>{
         if(!tempList.includes(item.ticketNo)){
            tempList.push(item.ticketNo)
         }
       })
       
       setTicketList(tempList)
    }
    useEffect(()=>{
        fetchTicketData()
    },[])



    const drawRandom = () => {
        const randomID = Math.floor(Math.random()*ticketList.length)
        const tempTicket = [...ticketList]
        tempTicket.splice(randomID,1)
        const typedNumInt =Number(typedTicketNo)
        if(tempTicket.includes(typedNumInt)){
            setStillInTheGame(true)
        }else{
            setStillInTheGame(false)
        }
        setTicketList(tempTicket)
    }




const validUserDraw=async()=>{
    setErrMsg('')
    const data=await fetch(`http://localhost:3000/users/${currentName}`)
    const validResErrMsg= await data.json()
    if(validResErrMsg.errorMsg){
        setErrMsg(validResErrMsg.errorMsg)

        
    }
    else{
        drawRandom()
    }
       }

       
    const changeColor = () => {
        if(colorIndex===colorList.length-1){
            setColorIndex(0)
        }else{
            setColorIndex(colorIndex+1)
        }
    }




    if(!stillInTheGame){
        return (<h1>hi you lost</h1>) 
    }
    return (
    <>
    hi {currentName}
     {ticketList.length >0 && ticketList.map((item,id)=>{
        return <div 
        onClick={()=>changeColor()}
        style={{
        backgroundColor:typedTicketNo.toString()=== item.toString() ? colorList[colorIndex] : null,
         margin:'20px',height:'40px', width:'50px' }}
        >{item}</div>
     })}


     <input 
    onKeyUp={(e)=> setTypedTicketNo(e.target.value)}
     placeholder="Enter your ticket number"/>
      <input 
    onKeyUp={(e)=> setCurrentName(e.target.value)}
     placeholder="Enter your name"/>
    <h2>{errMsg}</h2>
     <button onClick={()=> validUserDraw()}>Next draw</button>
     </>
    );
  }
  
  export default TicketWinner;
  