import IdSearchIcone from "../icon/IdSearch.png";
import "../css/IdSearch.css"
import { useState } from "react";
import axios from "axios";

export default function IdSearchSession(){

    const [text,setText] = useState('');
    const[message,setMessage] = useState('');
    const onChange = e => setText(e.target.value);

    const onSubmit = async(e) =>{
        e.preventDefault();
       
        if(!text.includes('@') || !text.includes(".")){
            alert("이메일에 @ 이나 점 을 추가해주세요!!");
            return;
        }

        try{
            const response = await axios.get("/api/member/idsearch",{params:{email:text}});
            if(response.data == "존재하지않은 아이디입니다"){
                setMessage("존재하지않은 아이디입니다");  
            }else{
                console.log("아이디찾기 성공");
                setMessage("당신의 아이디:"+response.data);
            }
        }catch(error){
            console.log(error.response);
            if(error.response || error.response.status == 500){
                console.log("아이디찾기 실패")
            }else{
                console.log("네트워크에 문제가 생김")
            }
        }
    }

    return(
        
        <div className="main-div">

            <h2>아이디 찾기</h2>
            <div className="input-row">
                <img src={IdSearchIcone} alt="idSerach" />
                <input 
                    type="email" 
                    name="idSearch" 
                    id="idSearch"
                    onChange={onChange}
                    value={text}
                    />
                
            </div>
                <form onSubmit={onSubmit}>
                    <button type="submit">전송</button>
                </form>
                {message}
        </div>
    )
}