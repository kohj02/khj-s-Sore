import goodsIcon from "../icon/product.png";
import moneyIcon from "../icon/money.png";
import componeyIcon from "../icon/componey.png";
import dateIcon from "../icon/date.png"
import scriptIcon from "../icon/script.png";
import "../css/goodsSession.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios"
import { DispatcherContext } from "../context/DispatcherContext";
import { DataContext } from "../context/DispatcherContext";
import { useNavigate } from "react-router-dom";

export default function GoodsSession({getId}){
    const dataContext = useContext(DataContext);
     const getMemberData = useContext(DispatcherContext);
     const navigate = useNavigate();
     const{id,isboolean} = dataContext;
    
    const[text,setText] = useState({
        goodsname:'',
        money:'',
        company:'',
        date:'',
        script:'',
        file:null,
    })

    const handleFileChange = e => setText(prev=>({
        ...prev,
        file:e.target.files[0],
    }))

    const onChange = e =>{
        const{name,value} = e.target;
        setText(prev=>({
            ...prev,
            [name]:value,
        }))
    }

    useEffect(()=>{
        getMemberData(id,isboolean);
    },[])
    
    const handleUpload = async(e)=>{
        e.preventDefault();
        if(!text.file || !text.goodsname ||!text.company||!text.date||!text.money||!text.script){
            alert("한곳이 비어있습니다");
            return;
        }

        if(typeof Number(text.money) !== 'number'){
            alert("숫자를 입력해주세요");
            return;
        }

        const formData = new FormData();
        formData.append("id",getId())
        formData.append("file",text.file);
        formData.append("goodsname",text.goodsname);
        formData.append("money",text.money);
        formData.append("company",text.company);
        formData.append("date",text.date);
        formData.append("script",text.script);

        try{
            const response = await axios.post("/api/product/upload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(response.status === 200){
                alert("상품 등록에 성공했음");
                navigate('/');
                getMemberData(id,isboolean);
            }
        }catch(error){
            if(error.response){
                console.log(error.response.data)
                console.error("상품 등록 실패",error);
                alert("상품 등록 중 오류가 발생했습니다.")
            }else{
                console.log("네트워크에 문제가 발생했습니다")
            }
            
        }
    }

    return(
        <div className="main-div">
            <h2>상품추가</h2>
            <input type="file" id="file" name="file" onChange={handleFileChange}/>
            <div className="input-row">
                <img src={goodsIcon} alt="goods"/>
                <input type="text" id="goodname" name="goodsname" placeholder="상품이름" onChange={onChange} value={text.goodname}/>
            </div>
            <div className="input-row">
                <img src={moneyIcon} alt="money"/>
                <input type="text" id="money" name="money" placeholder="가격" onChange={onChange} value={text.money}/>
            </div>
            <div className="input-row">
                <img src={componeyIcon} alt="company"/>
                <input type="text" id="company" name="company" placeholder="회사이름" onChange={onChange} value={text.company}/>
            </div>
            <div className="input-row">
                <img src={dateIcon} alt="date"/>
                <input type="date" id="date" name="date" onChange={onChange} value={text.date}/>
            </div>
            <div className="input-row">
                <img src={scriptIcon} alt="script" />
                <textarea name="script" cols="80" rows="10" onChange={onChange} value={text.script}/>
            </div>
            <form onSubmit={handleUpload}>
                <button type="submit" >상품추가</button>
            </form>
            
        </div>
    )
}