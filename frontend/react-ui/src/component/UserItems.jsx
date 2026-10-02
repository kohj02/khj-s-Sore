
import UserItem from "./UserItem";


export default function UserItems({goodsname,money,file,pageId}){
    return(
        <>
            <UserItem goodsname={goodsname} money={money} file={file} pageId={pageId}/>
        </>
    )
}