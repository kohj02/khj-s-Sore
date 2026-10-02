import searchIcon from "../icon/Search.png";
import shoppIcon from "../icon/shopping.png";
import userIcon from "../icon/user.png";
import "../css/Header.css"
import { Link } from "react-router-dom";
import { DataContext } from "../context/DispatcherContext";
import { useContext, useState } from "react";
import axios from "axios";
import { DispatcherContext } from "../context/DispatcherContext";
import { useNavigate } from "react-router-dom"
import { DispatcherContext2 } from "../context/DispatcherContext";

export default function Header(){
    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const setSData = useContext(DispatcherContext2);
    const{id,isboolean} = dataContext;
    const navigate = useNavigate();
    const[text,setText] = useState(''); 


    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.get("/api/logout");
            console.log("성공여부:",response.data);
            if(response.data === '로그아웃 성공'){
                getMemberData('',false);
                navigate('/')
            }
        }catch(error){
            
            if(error.response){
                console.log(error.response);
                alert("로그아웃 실패")
            }else{
                alert("서버 연결에 실패했습니다");
            }   
        }
    }

    const onDeleteSubmit = async(e)=>{
        e.preventDefault();
        if(text == ''){
            localStorage.removeItem("searchDta");
            return
        }
        try{
            const reponse = await axios.get("/api/product/search",{params:{text:text}});
            if(reponse.data == "찾지 못했습니다"){
                console.log("가져오기 실패");
                localStorage.removeItem("searchDta");
                return;
            }else{
                console.log("가져오기 성공");
                console.log(reponse.data);
                setSData(reponse.data)
                
            }
        }catch(error){
            if(error.reponse){
                console.log("실패");
                console.log(error.reponse);
            }else{
                console.log("네트워크 연결 실패");
            }
        }
    }


    return(
        <div className="header-main-container">
            <Link to='/'><strong>khj'sStore</strong></Link>
        
            <form className="search-div" onSubmit={onDeleteSubmit}>
                <input 
                    type="text" 
                    id="searche" 
                    className="search"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    />
                <button type="submit">
                    <img src={searchIcon} alt="Search"/>
                </button>
            </form>
            <form className="icon-div">
                <Link to='/khjstore/product/shopping'><img src={shoppIcon} alt="shopping"/></Link>
            </form>
            <form>
                <Link to="/khjstore/member/user"><img src={userIcon} alt="user"/></Link>
                
            </form>
            {isboolean?(
                <form className="login-reigter-div" onSubmit={onSubmit}>
                    <div>{id}</div>
                    <button type="submit">로그아웃</button>
                    <Link className="regiter-btn" to="/khjstore/member/addgoods"><div>상품추가</div></Link>
                </form>
            ):(
                <form className="login-reigter-div">
                    <Link className="login-btn" to="/khjstore/member/login"><div>로그인</div></Link>
                    <Link className="regiter-btn" to="/khjstore/member/register"><div>회원가입</div></Link>
                </form>
            )
            }
            
        </div>
    )
}