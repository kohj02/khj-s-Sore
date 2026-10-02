import { DataContext,DispatcherContext } from "../context/DispatcherContext";
import { useContext,useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserItems from "./UserItems";

export default function ShoppingSession(){

    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const{id,isboolean} = dataContext;
    const[data,setData] = useState(0);
    const[renderData,setRenderData] = useState([]);

    useEffect(()=>{
        getMemberData(id,isboolean);
    },[]);

    useEffect(()=>{
        async function allCount() {
            try{
                const response = await axios.get("/api/product/shoppingAllCount",{params:{id:id}});
                if(response.data !== undefined && response.data !== null){
                    console.log("총 상품 개수 구함");
                    console.log(response.data);
                    setData(response.data);
                }else{
                    console.log("총 상품 개수 못 구함");
                    return;
                   
                }
            }catch(error){
                if(error.response){
                    console.log("실패");
                    console.log(error.response);
                }else{
                    console.log("네트워크 연결 못함");
                }
            }
        }
        allCount();
    },[id]);

    useEffect(()=>{
        async function loadShoppingItem() {
            try{
                const reponse = await axios.get("/api/product/shoppingAllroad",{params:{id:id}});
                if(reponse.data == "데이터 못가져옴"){
                    console.log("데이터 못 가져옴");
                }else{
                    console.log("데이터가져옴");
                    console.log(reponse.data);
                    setRenderData(reponse.data);
                }
            }catch(error){
                if(error.reponse){
                    console.log("실패");
                    console.log(error.reponse);
                }else{
                    console.log("네트워크 연결이 안됨");
                }
            }
        }
        loadShoppingItem();
    },[id]);

    return(
        <>
            {
                isboolean=="true"?(
                    <>
                        <p>카트에 담은 개수({data})</p>
                        {
                            renderData.map(item=>(
                                <UserItems key={item.id} goodsname={item.goodsname} money={item.money}  file={item.file} pageId={item.page_id}/>
                            ))
                        }
                    </>
                ):(
                    <Link to="/khjstore/member/login">로그인하러가기</Link>
                )
            }
            

        </>
    )
}