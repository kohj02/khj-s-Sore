
import { useEffect, useState ,useContext} from "react"
import Header from "../component/Header"

import Session from "../component/Session"
import "../css/home.css"
import axios from "axios"
import { DispatcherContext } from "../context/DispatcherContext"


export default function Home(){
    const [data,setData] = useState({});
    const getMemberData = useContext(DispatcherContext);
   

    
    useEffect(() => {
        async function initLogin() {
            try {
                // withCredentials: true 로 JSESSIONID 쿠키 전달
                //서버에서 쿠키를 보고 해당 세션을 전달함
                //인증되서 컨트롤러가 실행
                const response = await axios.get("/api", { withCredentials: true });
                
                // 로그인 세션 응답 데이터가 존재하는지 확인
                if (response.data && response.data.id) {
                    console.log("세션으로 로그인 성공:", response.data);
                    setData(response.data);
                    getMemberData(response.data.id, true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("로그인 세션이 없습니다. (미로그인 상태)");
                    getMemberData("", false); // 로그인 상태 해제
                } else if (error.response) {
                    console.error("서버 응답 오류:", error.response.data);
                } else {
                    alert("서버 연결에 실패했습니다.");
                }
            } 
        }

        initLogin();
    }, []);

    
    return(
        <div className="main-container">
            <Header/>
            <Session data={data} />
        </div>
    )
}