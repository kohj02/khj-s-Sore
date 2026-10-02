
import axios from "axios";
import "../css/item.css"
import { useNavigate } from "react-router-dom";

export default function Item({imgsrc,id,goodsname,price,page_id}){

    const navigate = useNavigate();

    const buySubmit = async(e) =>{
        e.preventDefault();
        if(!confirm("구매하겠습니다까")){
            return;
        }
        try{
            const response = await axios.get("/api/product/buy",{params:{id:id}});
            if(response.data == "구매목록 삽입 완료"){
                console.log("구매 아이템 등록 성공");
                console.log(response.data);
            }else{
                console.log("구매 아이템 등록 실패");
            }
            
        }catch(error){
            if(error.response){
                console.log("구매 아이템을 등록 실패");
                console.log(error.response);
            }else{
                console.log("네트워크 연결에 문제가 생김");
            }
        }
    }

    const putSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get("/api/product/putShopping",{params:{page_id:page_id}});
            if(response.data == "장바구니에 담기 완료"){
                console.log("장바구니에 담기 완료");
                console.log(response.data);
            }else{
                console.log("장바구니 담기 실패");
            }
        }catch(error){
            if(error.response){
                console.log("실패");
                console.log(error.response);
            }else{
                console.log("네트워크 연결실패");
            }
        }
    }

    const pageEnter = () =>{
        navigate(`/khjstore/product/${page_id}`);
    }



    return(
        <div className="item-div" onClick={pageEnter}>
            <form>
                <img onClick={pageEnter} src={`http://localhost:8080/upload/${imgsrc}`} alt={goodsname}/>
                <p onClick={pageEnter}>{goodsname}</p>
                <p onClick={pageEnter}>가격: {price}</p>
            </form>
            {localStorage.getItem("isboolean") === "true"&&(
                <>
                    <form className="cart-sell-div" onSubmit={putSubmit}>
                        <button type="submit">장바구니 담기</button>
                    </form>
                    <form className="cart-sell-div" onSubmit={buySubmit}>
                        <button type="submit">바로구매</button>
                    </form>
                </>
            )
        }
        </div>
    )
}