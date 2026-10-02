import idImg from "../icon/id.png";
import lockImg from "../icon/lock.png";
import email from "../icon/email.png";
import "../css/RegisterSession.css"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from"axios"
import { DispatcherContext } from "../context/DispatcherContext";

export default function RegisterSession(){

    const navigate = useNavigate();
    const getMemberData = useContext(DispatcherContext);
    const[text,setText] = useState({
        id:"",
        password:"",
        email:""
    });

    const inputHandler = (e) =>{
        const{name,value} = e.target;

        setText({
                ...text,
                [name]:value
            })
        
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        if(!text.id.length >= 5 || text.id == '') alert("아이디가 잛음 5개로 해주세요")

        if(!text.email.includes("@") || !text.email.includes(".")){
            alert("이메일에 @ 이나점을 추가해주세요!!");
            return;
        }

        if(!(text.password.length <= 10 || text.password.length >= 4)  || text.password === ''){
            alert("비번을 4~10길이로 해주세요!!");
            return;
        }

        try{
            const resonse = await axios.post('/api/member/register',text);
            console.log("성공:",resonse.data);
            if(resonse.data === "회원가입 성공"){
                getMemberData(text.id,true);
                navigate("/");
            }
        }catch(error){
            console.error("실패:",error);

            if(error.response){
                console.log(error.resonse)//상태코드,에러메세지
                alert("아이디가 존재합니다");
            }else{
                alert("서버 연결에 실패했습니다");
            }
        }
    }

    return(
        <div className="rs-div">
            
            <form onSubmit={handleSubmit}>
                 <h2>회원가입</h2>
                <div className="input-row">
                    <img src={idImg} alt="id" className="input-icon" />
                    <input
                     type="text" 
                     id="id"
                     name="id"
                     value={text.id} 
                     onChange={inputHandler}
                     className="login-input" 
                     placeholder="아디이를 입력하세요"
                     />
                </div>
                <div className="input-row">
                    <img src={lockImg} alt="pwd" className="input-icon" />
                    <input 
                    type="password" 
                    id="pwd"
                    name="password" 
                    value={text.password}
                    onChange={inputHandler}
                    className="login-input" 
                    placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div className="input-row">
                    <img src={email} alt="email" className="input-icon"/>
                    <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={text.email}
                    onChange={inputHandler}
                    className="login-input" 
                    placeholder="이메일을 입력하세요"
                    />
                </div>
                <div className="register-btn">
                    <Link to="/khjstore/member/login">로그인 하러가기</Link>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    )
}