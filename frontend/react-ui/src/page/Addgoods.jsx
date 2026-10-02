import GoodsSession from "../component/GoodsSession";
import Header from "../component/Header";

export default function Addgoods({getId,getIsboolean}){
    return(
        <>
            <Header/>
            <GoodsSession getId={getId} getIsboolean={getIsboolean}/>
        </>
    )
}