import { useContext,useState,useEffect } from "react";
import { DataContext,DispatcherContext } from "../context/DispatcherContext";
import idImg from "../icon/id.png";
import lockImg from "../icon/lock.png";
import email from "../icon/email.png";
import "../css/UpdateSession.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserUpdateSession(){

    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const{id,isboolean} = dataContext;
    const navigate = useNavigate();
    const[text,setText] = useState({
        id:'',
        exiting_id:id,
        password:'',
        email:''
    })
    
    useEffect(()=>{
        getMemberData(id,isboolean);
    },[]);

    const changeHandler = e =>{
        const{name,value} = e.target;
        setText({
            ...text,
            [name]:value
        })
    }

    const onSubmit = async(e)=>{
        const changeId = text.id;
        e.preventDefault();
        if(!(text.id.length >= 4 && text.id.length <= 10) || text.id == ''){
            alert("아이디 길이가 4~10사이여있거나 비어있습니다");
        }

        try{
            const reponse = await axios.post("/api/member/memberUpdate",text);
            if(reponse.data == "사용자 정보 업데이트 실패"){
                console.log("사용자 정보 업데이트 실패")
            }else{
                console.log("사용자 정보 업데이트 성공");
                getMemberData(changeId,true);
                navigate('/khjstore/member/user');
            }
        }catch(error){
            if(error.reponse){
                console.log("실패");
                console.log(error.reponse);
            }
        }
    }

    useEffect(()=>{
        async function loadUser(){
            try{
                const reponse = await axios.get("/api/member/update",{params:{id:id}});
                if(reponse.data == "가져오지 못했습니다"){
                    console.log("가져오지 못했습니다.");
                }else{
                    console.log("가져오기 성공");
                    console.log(reponse.data);
                    setText({
                        ...text,
                        id:reponse.data.id,
                        password:reponse.data.password,
                        email:reponse.data.email
                    })
                }
            }catch(error){
                if(error.reponse){
                    console.log("실패")
                    console.log(error.reponse)
            }else{
                console.log("네트워크 연결 실패");
            }
        }
        
    }
    loadUser();
    },[id])


    return(
        <div className="maim-div">
            <h2 className="input-row">계정 수정</h2>
            <div className="input-row">
                <img src={idImg} alt="id" className="input-icon" />
                <input 
                  type="text" 
                  name="id" 
                  id="id"
                  value={text.id}
                  onChange={changeHandler}
                  />
            </div>
            <div className="input-row">
                <img src={lockImg} alt="password" className="input-icon" />
                <input 
                  type="text" 
                  name="password" 
                  id="ipassword"
                  value={text.password}
                  onChange={changeHandler}
                  />
            </div>
            <div className="input-row">
                <img src={email} alt="email" className="input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={text.email}
                  onChange={changeHandler}
                  />
            </div>
            <form className="input-row" onSubmit={onSubmit}>
                <button type="submit" 
                style={{width:100,height:40,cursor:"pointer"}}
                >전송</button>
            </form>
        </div>
    )
}