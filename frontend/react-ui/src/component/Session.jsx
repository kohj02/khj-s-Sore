import { useEffect, useContext, useState } from "react";
import Items from "./Items";
import axios from "axios";
import { DataContext } from "../context/DispatcherContext";
import '../css/Session.css'

export default function Session() {
  const dataContext = useContext(DataContext);
  const { id, isboolean } = dataContext;
  const [isshow, setIsshow] = useState(true);
  const [count,setCount] = useState(1);

  const[isSearchMode,setIsSearchMode] = useState(false);



  const [data, setData] = useState(() => {
    const rawsearchData = localStorage.getItem("searchDta");
    if (rawsearchData) {
      setIsSearchMode(true)
      try {
        const searchData = JSON.parse(rawsearchData);
        if (Array.isArray(searchData) && searchData.length > 0) {
          console.log("검색 데이터 로드 성공: ", searchData);
          return searchData; 
        }
      } catch (e) {
        console.log("localStorage 파싱 실패", e);
        localStorage.removeItem("searchDta");
      }
    }
    return []; 
  });
  
 useEffect(()=>{
    localStorage.removeItem("searchDta");
  },[])
  

  useEffect(() => {

    if(isSearchMode) return;

    async function loadItem() {

      try {
        const reponse = await axios.get("/api/product/loadItem",{params:{num:count}});

        if (reponse.data) {
          console.log("데이터 불러오기 성공");
          console.log(reponse.data);
          if (reponse.data == "가져올 아이템이 없습니다") {
            console.log("가져올 아이템이 없습니다!!");
            setIsshow(false);
          } else {
            console.log("data:" + reponse.data);
            setData(reponse.data);
          }
        }
      } catch (error) {
        if (error.reponse) {
          console.log("데이터 불러오기 실패");
          console.log(error.reponse);
        } else {
          console.log("네트워크 연결에 문제가 있습니다...");
        }
      }
    }
    loadItem();
  }, [id, isboolean,data.length,count]);



  
  return (
    <>
      {data != [] && isshow !== false ? (
        <>
          
          {data.map((item,index) => (
            <Items
              page_id={item.page_id}
              imgSrc={item.file}
              key={index}
              id={item.id}
              goodsname={item.goodsname}
              price={item.money}
            />
          ))}
        </>
      ) : (
        <p>가져올 데이터가 없음</p>
      )}

      <div className="addBtn">
        <button onClick={()=>setCount(prev=>prev+1)}  id="addProduct">다른 상품 더 보기</button>
        <button onClick={()=>setCount(prev=>prev-1)}  id="addProduct">접기</button>
      </div>
    </>
  );
}