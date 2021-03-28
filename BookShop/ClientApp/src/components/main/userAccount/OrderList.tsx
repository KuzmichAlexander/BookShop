import React from 'react';
import {Order} from "./Order";

type orderListType = {
    orders: any[];
}

export const OrderList: React.FC<orderListType> = ({orders}) => {
    return (
        <>
            <br/>
            <h3 style={{textDecoration:'underline'}}>История покупок:</h3>
            <br/>
            <div className={'user-order-container'}>
                {orders.length
                    ? orders.map((order, index) => <Order imageURL={order.imageURL} authors={order.authors} count={order.count} isResieved={order.isResieved} orderDate={order.orderDate} price={order.price} resievedDate={order.resievedDate} key={index} name={order.name}/>)
                    : null
                }
            </div>

        </>
    );
};
