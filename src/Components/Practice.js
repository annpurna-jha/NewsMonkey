import React, { useState } from 'react'

function Practice() {
    const [obj,setObj] = useState({name:"anu",age:22,branch:"cse"});
    const change =()=>{
        console.log("clicked");
        setObj(prev=>{
            return {...prev,branch:"ec"};
        })
    }
  return (
    <div>
      {console.log(obj)}
      <button onClick={change}>change</button> 
      
        {console.log(obj)}
    </div>
  )
}

export default Practice
