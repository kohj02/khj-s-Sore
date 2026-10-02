import { Link, useNavigate } from "react-router-dom";
import idImg from "../icon/id.png";
import lockImg from "../icon/lock.png";
import "../css/LoginSession.css";
import { useContext, useState } from "react";
import axios from "axios";
import { DispatcherContext } from "../context/DispatcherContext";

export default function LoginSession() {

  const navigate = useNavigate();
  const [message,setMassage] = useState('');
  const getMemberData = useContext(DispatcherContext);
  const [text,setText] = useState({
    id:'',
    password:'',
  });

  const onChangeHandler= e =>{
    const{name,value} = e.target;
    setText({
      ...text,
      [name]:value,
    })
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    console.log(text)
    if(text.id == '' || text.id.length < 5) alert("아이디길이가 5개 이상이여함");
    if(!(text.password.length <= 10 && text.password.length >= 4)  || text.password === ''){
      alert("비밀번호가 4이상이나 10개 이하야함니다");
    } 
    

    try{
      const response = await axios.post("/api/member/login",text);
      console.log("성공 여부:",response.data);
      if(response.data === "로그인 성공"){
        getMemberData(text.id,true);
        navigate('/');
      }else{
        setMassage("아이디나 비번이 일치하지 않거나 비어있음");
      }
    }catch(error){
      console.log("실패:",error);

      if(error.respons){
          alert("아이디가 존재합니다");
      }else{
        alert("네트워크에 문제가 있습니다");
      }
    }

  }
 

  return (
    <div className="LS-main">
      <h2>로그인</h2>
      <form className="input-div" onSubmit={onSubmit}>
    
        <div className="input-row">
          <img src={idImg} alt="id" className="input-icon" />
          <input 
            type="text" 
            id="id" 
            name="id"
            value={text.id}
            onChange={onChangeHandler}
            className="login-input" 
            placeholder="아이디를 입력하세요" 
          />
        </div>

        <div className="input-row">
          <img src={lockImg} alt="lock" className="input-icon" />
          <input 
            type="password" 
            id="password" 
            name="password"
            value={text.password}
            onChange={onChangeHandler}
            className="login-input" 
            placeholder="비밀번호를 입력하세요" 
          />
        </div>

       
        <div className="btn-div">
          <button type="submit" className="login-btn">로그인</button>
          <Link to="/khjstore/member/register" className="join-link">
            회원가입하러 가기
          </Link>
          <Link to='/khjstore/member/idsearch' className="idsearch-link">
            아이디 찾기
          </Link>
          <Link to="/khjstore/member/pwdsearch" className="pwesearch-link">
            비밀번호 찾기
          </Link>
        </div>
        {message}
      </form>
    </div>
  );
}