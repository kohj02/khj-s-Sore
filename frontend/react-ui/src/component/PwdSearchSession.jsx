import { useState } from "react";
import pwdSearchIcon from "../icon/pqwsearch.png"
import axios from "axios";

export default function PwdSearchSession(){
    
    const[text,setText] = useState();
    const[message,setMassage] = useState('');
    const onChangeHandler = e => setText(e.target.value);

    const onSubmit = async(e) =>{
        e.preventDefault();
        if(!(text.length >= 4 && text.length <= 10)){
            alert("4~10자리에 아이디를 입력하세요");
            return;
        }

        try{
            const respons = await axios.post("/api/member/pwdSearch",{id:text});
            if(respons.data == "해당 계정이 존재하지않습니다"){
                setMassage("해당 계정이 존재하지않습니다")
            }else{
                console.log("비번찾기 성공")
                setMassage(respons.data);
            }
        }catch(error){
            if(error.respons){
                console.log(error.respons)
                console.log("비번찾기 실패");
            }else{
                console.log("네트워크 연결 실팽")
            }
        }
        
    }
    
    
    
    
    return(
        <div className="main-div">
            <h2>비번찾기</h2>
            <div className="input-row">
                <img src={pwdSearchIcon} alt="pwdSearch"/>
                <input 
                type="text" 
                className="id-input"
                onChange={onChangeHandler}
                value={text}
                />
            </div>
            <form onSubmit={onSubmit}>
                <button type="submit">제출</button>
            </form>
            {message}
        </div>
    )
}