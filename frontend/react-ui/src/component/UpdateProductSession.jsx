import { useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { DispatcherContext,DataContext } from "../context/DispatcherContext";
import axios from "axios";
import "../css/UpdateProductSession.css"

export default function UpdateProductSession(){
    const dataContext = useContext(DataContext);
    const getMemberData = useContext(DispatcherContext);
    const{id,isboolean} = dataContext;
    const {page_id} = useParams();
    const[data,setData] = useState({
        goodsname:'',
        price:'',
        company:'',
        date:'',
        script:'',
        file:null,
    });
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


    const onChange = e =>{
        const{name,value} =e.target;
        setData(prev=>({
            ...prev,
            [name]:value,
        }))
    }

    const onfileChange = e => setData(prev=>({
        ...prev,
        file:e.target.files[0],
    }));

    const onSubmit = async(e) =>{
        e.preventDefault();

        

        if(!data.goodsname ||!data.company||!data.date||!data.money||!data.script){
            alert("한곳이 비어있습니다");
            return;
        }
      

        if(typeof Number(data.money) !== 'number'){
            alert("숫자를 입력해주세요");
            return;
        }

        const formData = new FormData();
        formData.append("page_id",page_id);
        formData.append("goodsname",data.goodsname);
        formData.append("money",data.money);
        formData.append("company",data.company);
        formData.append("date",data.date);
        formData.append("script",data.script);
        formData.append("file",data.file);
       console.log("FormData에 담긴 page_id:", formData.get("page_id"));
        try{

        //틀에맞에서 고르게하는것->규격화
        //규격화된 일전한 형식이나 구조 =>포맷
        //content-type:multipart/form-data:데이터의 포멧이 파일을 포함한 복합 데이터
        //"withCredentials:서로다은 출처로 http 요청을 보낼 떄" 
        const response = await axios.post("/api/product/updateUpload",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
        });
        if(response.status === 200){
            alert("삼품 수정에 성공했음");
            navigate("/");
        }

       }catch(error){
        if(error.reponse){
            console.log(error.reponse.data);
            console.error("삼품 등록 실패",error);
            alert("삼품 등록 중 오류가 발생했습니다.");
        }else{
            console.log("네트워크 문제가 발생습니다.");
        }
    }
    
}



    
    return(
         <div className="main-div">
            {console.log(data.file)}
            <img src={`http://localhost:8080/upload/${data.file}`} alt=""
                style={{width:300}}
            />
            {console.log(data)}
            <div className="session-div">
                <form onSubmit={onSubmit}>
                    <input type="file" onChange={onfileChange} name="file" id="file"/>
                    상품이름:<input 
                        type="text" 
                        name="goodsname" 
                        id="goodsname"
                        value={data.goodsname}
                        onChange={onChange}
                        />
                    가격:<input 
                        type="text" 
                        name="money" 
                        id="money"
                        value={data.money}
                        onChange={onChange}
                        />
                    제품만드 회사<input 
                    type="text"
                    name="company"
                    id="company"
                    value={data.company}
                    onChange={onChange}
                    />
                    제품등록날짜:<input
                    type="date" 
                    name="date"
                    id="date"
                    value={data.date}
                    onChange={onChange}
                    />
                    <textarea 
                    name="script"
                    id="script"
                    value={data.script} 
                    onChange={onChange}
                    style={{resize:"none",width:300,height:180,}}/>
                    <button type="submit">전송</button>
                </form>
               
            </div>
           
        </div>
    )
}