import Item from "./Item";


export default function Items({imgSrc,id,goodsname,price,page_id}){

    

    return(
        <>
            <Item imgsrc={imgSrc} 
            id={id} goodsname={goodsname}
            page_id={page_id}
             price={price}/>
        </>
    )
}