
import "../css/UserItem.css";

export default function UserItem({goodsname,money,file,pageId}){
    return(
        <div className="main-div-item">

            <form className="form-div">
                <img src={`http://localhost:8080/upload/${file}`} alt={goodsname}/>
                <p>{goodsname}</p>
                <p>가격:{money}</p>
            </form>
        </div>
    )
}