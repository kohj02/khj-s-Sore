import axios from "axios";
import { DataContext } from "../context/DispatcherContext";
import { DispatcherContext } from "../context/DispatcherContext";
import { useEffect ,useContext, useState} from "react";
import UserItems from "./UserItems";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserSesion(){
    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const{id,isboolean} = dataContext;
    const navigate = useNavigate();
    const[data,setData] = useState([]);
    const[count,setCount] = useState(0);

    useEffect(()=>{
            getMemberData(id,isboolean);
        },[])


    useEffect(()=>{
        async function loadUserItem() {
            try{
                const reponse = await axios.get("/api/user/laodUser",{params:{id:id}});
                if(reponse.data == "가져오는 것을 실패하였습니다."){
                    console.log("가져오는 것을 실패하였습니다.");
                }else{
                    console.log("가져오는 것을 성공했습니다");
                    console.log(reponse.data);
                    setData(reponse.data);
                }

            }catch(error){
                if(error.reponse){
                    console.log("실패"+error.reponse);
                }else{
                    console.log("네트워크에 문제가 있습니다")
                }
            }
        }

        loadUserItem();
    },[id,setData]);


    const onSubmitDelete = async(e) =>{
        e.preventDefault();
        if(!confirm("정말로 삭제 하겠습니까?")){
            return;
        }
        try{
            const reponse = await axios.get("/api/member/memberDelete",{params:{id:id}});
            if(reponse.data == "계정 삭제 완료"){
                console.log("계정 삭제 완료");
                getMemberData('',false);
                navigate('/');
            }else{
                console.log("계정 삭제 실패")
            }
        }catch(error){
            if(error.reponse){
                console.log("연결 실패");
                console.log(error.reponse);
            }else{
                console.log("네트워크에 문제가 있습니다");
            }
        }
    }

    useEffect(()=>{
        async function userCount() {
            try{
                const response = await axios.get("/api/product/userAllroad",{params:{id:id}});
                if(response.data != null || response.data != undefined){
                    console.log("가져오기 성공");
                    console.log(response.data);
                    setCount(response.data);
                }else{
                    
                    console.log("가져오기 실패");
                    return;
                }
            }catch(error){
                if(error.reponse){
                    console.log("실패");
                    console.log(error.reponse);
                }else{
                    console.log("네트워크 연결암됨");
                }
            }
        }
        userCount()
    },[id])



    return(
        <>
        {isboolean === "true"&&(
            <>
                <Link to='/khjstore/member/userupdate'>계성 수정</Link>
                <form onSubmit={onSubmitDelete}><button type="submit">계정삭제</button></form>
            </>
            
        )}
        {isboolean === "true"?(
            <>
               <p>구매총개수:({count})</p> 
                
                {
                    data.map(item=>(
                    <UserItems key={item.id} goodsname={item.goodsname} money={item.money}  file={item.file} pageId={item.page_id}/>
                    ))
                }
            </>
            
            

        ):(
            <Link to="/khjstore/member/login">로그인하러가기</Link>
        )}
        </>
    )
}