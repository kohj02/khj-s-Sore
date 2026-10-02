import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "../css/productPageSession.css";
import { DispatcherContext,DataContext } from "../context/DispatcherContext";

export default function ProductPageSession(){
    
    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const{id,isboolean} = dataContext;
    const {page_id} = useParams();
    const[data,setData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        getMemberData(id,isboolean);
    },[]);
    useEffect(()=>{
        async function loadPageData() {
            try{
                const reponse = await axios.get("/api/product/loadPaeg",{params:{page_id:page_id}});
                if(reponse.data == "데이터를 가져오지 못했습니다"){
                    console.log("데이터를 가져오지 못했습니다");
                    return;
                }else{
                    console.log("데이터를 가져오는데 성공했습니다");
                    console.log(reponse.data);
                    setData(reponse.data);
                }
            }catch(error){
                if(error.reponse){
                    console.log("실패");
                    console.log(error.reponse);
                }else{
                    console.log("네트워크 실패");
                }
            }
        }
        loadPageData();
    },[page_id]);

    const updatePage = () => navigate(`/khjstore/product/productUpdate/${page_id}`);


    const deleteOnSubmit = async(e) =>{
        e.preventDefault();
        try{
            const reponse = await axios.get("/api/product/productDelete",{params:{page_id:page_id}});
            if(reponse.data == "상품 삭제 완료"){
                console.log("상품 삭제 완료");
                navigate("/");
            }else{
                console.log("상품 삭제 실패");
            }
        }catch(error){
            if(error.reponse){
                console.log("실패");
                console.log(error.reponse);
            }else{
                console.log("네트워크 연결실패")
            }
        }
    }

    return(
        <div className="main-div">
            <img src={`http://localhost:8080/upload/${data.file}`} alt=""
                style={{width:300}}
            />
            <div className="session-div">
                <strong>상품이름:{data.goodsname}</strong>
                <p>게시한사람(id):{data.id}</p>
                <p>가격:{data.money}</p>
                <p>제품 만든 회사:{data.company}</p>
                <p>제품 등록 날짜:{data.date}</p>
                <textarea value={data.script} readOnly
                style={{resize:"none",width:300,height:180,}}/>
            </div>
            {
                id == data.id?(
                    <>
                        <form>
                            <button onClick={updatePage}>상품 수정</button>
                        </form>
                        <form onSubmit={deleteOnSubmit}>
                            <button type="submit">상품 삭제</button>
                        </form>
                    </>
                ):(
                    <p></p>
                )
            }
        </div>
    )
}