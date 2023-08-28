import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { deleteAllOrder, deleteOrder, updateOrder } from "../../features/user/ordersStateSlice";
import { apiProductSlice, useGetLinksForProductByProductsIdsQuery } from "../../features/user/apiProductSlice";
import { Card, ChangeOrderCount, FindById, ImageLink, Order, OrderDTO, OrderedProducts } from "../types";
import { Outlet, useNavigate } from "react-router-dom";
import OrdersList from "./OrdersList";
import { AdressModal } from "./AdressModal";
import { useState } from "react";
import BuyProduct from "./BuyProduct";
import { CardModal } from "./CardModal";
import png from '../../images/amazing.jpg';
import mastercard from "../../images/mastercard_logo.png"
import paypal from "../../images/paypal.png"
import visa from "../../images/visa-logo.jpg"
import applepay from "../../images/applepay.png"
import americanExpress from "../../images/americanExpress.png"
import arrow_right from "../../images/white_arrow_right.png"

import lock from "../../images/lock.png"
import car from "../../images/car.png"
import message from "../../images/message.png"

import tablet from "../../images/tablet.svg"
import basket from "../../images/Basket_.png"
import bigBasket from "../../images/BigBasket.png"
import { useGetDefaultCardByUserIdQuery } from "../../features/user/apiCardSlice";
import { useGetAddressByUserIdQuery } from "../../features/user/apiAddressSlice";
import { apiOrderSlice } from "../../features/user/apiOrderSlice";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import BreadcrumbsLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const BuyLater=()=>{
  return<>
  
  <div className="px-6 xl:text-lg text-sm">
    <div className="border xl:p-6 rounded-md">
      <div className=" xl:h-[200px] h-[100px] mx-1 rounded-md bg-contain bg-center bg-no-repeat m-2" style={{backgroundImage:'url('+tablet+')'}}/>
    </div>
    
    <p className="mt-2 xl:text-lg text-[12px]">2600грн.</p>
    <p className="mt-1 text-grayForText font-normal xl:text-[15px] text-[10px]">GoPro HERO6 4K Action </p>
    <p className="mt-[-5px] text-grayForText font-normal xl:text-[15px] text-[10px]">Camera - Black</p>

    <button className="mt-2 flex border hover:bg-slate-100 border-grayColorForBorder  xl:text-sm text-[10px] xl:py-2 xl:px-5 rounded-lg">
      <img className=" self-center px-1 xl:h-5 h-3" src={basket}></img>
      Додати в кошик</button>
  </div>

  </>
}

interface OrderComponentProps {
  order: Order;
  productsImages:ImageLink[];
}

export const OrderComponent:React.FC<OrderComponentProps>=({ order,productsImages })=>{
  console.log(productsImages);
  const dispatch = useDispatch();
  const availableCounts = [1, 2, 3, 4, 5];
  const orders = useAppSelector((state)=>state.orders.orders);

  const handleCountChange=(id:string,count:any)=>{
    var index = orders.findIndex((ord:Order)=>ord.id == id);
    var changeOrderCount:ChangeOrderCount = {index:index,count:Number(count.value)}; 
    console.log(changeOrderCount);
    dispatch(updateOrder(changeOrderCount));
  }

  return<>
  
  <div className="rounded-lg p-3 grid grid-cols-10 mt-2">
    <div className="flex col-span-8">

    <div className="m-2">
      <div className="h-24 w-24 border rounded-md bg-contain bg-center bg-no-repeat" style={{ backgroundImage:"url("+ productsImages?.find((img:any)=>img.productId==order.product_id)?.image  +")", backgroundPosition:"center"}} />
    </div>

    <div className="text-sm mt-1 ml-3 text-[16px]">
      <p className="font-medium">{order.name}</p>
      <p className="text-grayForText mt-2" >{order.name}</p>

      <div className="flex mt-9 font-medium text-sm" >
        <button onClick={()=>{dispatch(deleteOrder(order.id))}} className=" select-none active:bg-red-400 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 border border-grayColorForBorder text-red-500">Видалити</button>
        <button className=" select-none active:bg-yellow-400 hover:bg-mainYellowColor hover:text-white ml-5 rounded-lg px-2 py-1 border border-grayColorForBorder text-mainYellowColor">Купити пізніше</button>
      </div>
    </div>
    </div>

    <div className="col-span-2 flex flex-row-reverse">
      <div className=" relative">
        <p className="font-medium right-0 absolute">{order.count > 1 ? (order.count)+"x" : ""} ${(order.price*order.count).toFixed(2)}</p>
        <select
        name='OptionsTitle'
        id="OptionsTitle"
        defaultValue={order.count}
        onChange={(e)=>handleCountChange(order.id,e.currentTarget)}
        className=" outline-0 border rounded-md py-2 pl-2 pr-4 mt-8">
          {availableCounts.map((count) => (
            <option  key={count} value={count}>Кількість:{count}</option>
          ))}
        </select>
      </div>
      
    </div>
  </div>
  <hr className="mt-4 mx-6"></hr>

  </>
}

export const Orders=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const orders = useAppSelector((state)=>state.orders.orders);
    const user = useAppSelector((state)=>state.user.user);

    var request:FindById[] = [];
    orders.forEach(order => {
      request.push({id:order.product_id});
    });

    const { data: productsImages, isSuccess: isProductsImages } = useGetLinksForProductByProductsIdsQuery(request);
    const { data: defaultCard, isSuccess: isDefaultCard }:{data:Card,isSuccess:boolean} = useGetDefaultCardByUserIdQuery({id:user.id});
    const { data: address, isSuccess: isAddress }:{data:Card,isSuccess:boolean} = useGetAddressByUserIdQuery({id:user.id});
    const [addOrder,{}]= apiOrderSlice.useAddOrderMutation();
    
    const breadcrumbs = [
      <BreadcrumbsLink underline="hover" key="1" color="inherit" href="/">
        Головна
      </BreadcrumbsLink>,
      <BreadcrumbsLink
        underline="hover"
        key="2"
        color="inherit"
        href=""
       >
        Одяг
      </BreadcrumbsLink>,
      <BreadcrumbsLink
          underline="hover"
          key="3"
          color="inherit"
          href=""
      >
          Чоловічий одяг
      </BreadcrumbsLink>,
      <Typography key="3" color="text.primary">
        Мій кошик
      </Typography>,
    ];

    var totalCount:number = 0;

    orders.forEach(order => {
      totalCount += order.count;
    });

    const [isAdressModalOpen,setAdressModalOpen]= useState(false);
    const toggleModal = (prop:boolean)=>{setAdressModalOpen(prop)};
    const [isCardModalOpen,setCardModalOpen]= useState(false);
    const [isBuy,setBuy]= useState(false);
    const toggleCardModal = (prop:boolean)=>{setCardModalOpen(prop)};

    const createOrder=()=>{
      // data.preventDefault();
      // var curentData = new FormData(data.currentTarget);
      
      var orderedProducts_:OrderedProducts[] = [];

      orders.forEach(order => {
        orderedProducts_.push({productId:order.product_id,count:order.count});
      });
      
      var request:OrderDTO = {
          fullName:defaultCard.ownerName!,
          userId:Number(user.id),
          cardId:Number(defaultCard.id),
          addressId:Number(address.id),
          orderedProducts_:orderedProducts_
      }
  
      console.log(defaultCard);
      console.log(address);
      console.log(request);

      addOrder(request);
      

      navigate("/successful-purchase")
  }

    
    return <>
    <AdressModal isOpen={isAdressModalOpen} onClose={toggleModal}/>
    <CardModal isOpen={isCardModalOpen} onClose={toggleCardModal}/>
    <div className="breadCrumbsStyle">
        <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
      </div>

    <div className="mx-auto mt-10 w-9/12 ">
      {/* КОШИК */}
      <div className="">
        <p className=" text-xl font-medium">Мій кошик ({totalCount})</p>
        
        <div className="grid grid-cols-4 gap-5 mt-5">

          <div className="xl:col-span-3 col-span-4 ">
            <div className="w-full border border-grayColorForBorder rounded-lg pb-4 px-1">
            {/* ВИВІД ПРОДУКТІВ */}
            { orders.length>0 ?
              <div>
                {orders.map((order:Order) => (<OrderComponent order={order} productsImages={productsImages} />))}
              
                <div className=" flex justify-between p-2 mx-4">
                  <button onClick={()=>navigate("/products")} className=" hover:bg-orange-300 transition-all active:shadow-lg active:transition-none bg-mainYellowColor text-white px-5 py-1 rounded-lg mt-3">
                    Повернутися
                  </button>
                  <button onClick={()=>dispatch(deleteAllOrder())} className=" transition-all active:shadow-lg active:transition-none border border-grayColorForBorder text-mainYellowColor px-4 py-2 rounded-lg mt-3">
                    Видалити все
                  </button>
                </div> 
              </div> 
            :
            <div className="m-auto">
              <img className="m-auto mt-24 mb-10" src={bigBasket} />
              <button onClick={()=>navigate("/products")} className=" hover:bg-blue-700 bg-darkBlueColor text-white py-3 px-6 rounded-xl m-auto flex mb-16">ПОВЕРНУТИСЬ ДО ПОКУПОК</button>
            </div> 

            }
            </div> 

            <div className="grid grid-cols-3 mt-7 xl:text-md text-sm">
              <div className="flex">
                <img className="xl:h-16 h-10 mr-3" src={lock}/>
                <div>
                  <p> Безпечний платіж</p>
                  <p className=" text-grayForText text-sm">рвариврвт</p>
                </div>

              </div>
              <div className="flex">
                <img className="xl:h-16 h-10 mr-3" src={message}/>
                <div>
                  <p>Підтримка клієнтів</p>
                  <p className=" text-grayForText text-sm">пвімвм</p>
                </div>

              </div>
              <div className="flex">
                <img className="xl:h-16 h-10 mr-3" src={car}/>
                <div>
                  <p>Безкоштовна доставка</p>
                  <p className=" text-grayForText text-sm">впівпп</p>
                </div>

              </div>
            </div> 

            

          </div> 

          <div className="xl:col-span-1 col-span-4">
            <div className="p-4 border border-grayColorForBorder rounded-lg">
              <p>Маєте промокод?</p>
              <div className="flex mt-3">
                <input type="text" placeholder="Додати купон" className=" border rounded-l-lg px-2  h-10 outline-0  w-full border-grayColorForBorder "></input>
                <button className=" font-bold hover:text-orange-300 text-mainYellowColor border rounded-r-lg px-3 h-10 outline-1 outline-gray-200 border-grayColorForBorder ">+</button>
              </div>
              
            </div>

            <div className="p-4 mt-4 shadow-lg border border-grayColorForBorder rounded-lg">
              <div className=" flex justify-between">
                <span>Підсумок:</span>
                <span>${orders.map((order) => order.price*order.count).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
              </div>

              <div className=" flex justify-between">
                <span>Знижка:</span>
                <span className=" text-red-500">-${orders.map((order) => ((order.price*order.count)/100)*order.discount ).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
              </div>
              <hr className="my-4 mx-3"></hr>
              <div className=" flex justify-between font-semibold">
                <span>Total:</span>
                <span className=" ">${orders.map((order) => (order.price*order.count)-((order.price*order.count)/100)*order.discount ).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
              </div>

              <button onClick={()=>{createOrder()}} type="submit" className="  font-medium hover:bg-orange-300 transition-all active:shadow-lg active:transition-none bg-mainYellowColor text-white px-2 w-full py-3 rounded-lg mt-3">
                Оплатити
              </button>

              <div className="mt-4 flex w-full">
                <div className="m-auto flex">
                <div className="h-5 w-9 mx-1 border rounded-md bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url('+visa+')'}}/>
                <div className="h-5 w-9 mx-1 border rounded-md bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url('+paypal+')' }}/>
                <div className="h-5 w-9 mx-1 border rounded-md bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url('+mastercard+')' }}/>
                <div className="h-5 w-9 mx-1 border rounded-md bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url('+applepay+')' }}/>
                <div className="h-5 w-9 mx-1 border rounded-md bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url('+americanExpress+')' }}/>
                </div>

              </div>
            </div>


            
          </div>
        </div>
      </div>

      {/* РЕКОМЕНДАЦІЇ ЩО ДО ПОКУПОК */}
      <div className=" font-semibold text-lg my-14 border border-grayColorForBorder rounded-lg p-4">
        <p className="pl-6">Купити пізніше</p>
        <div className=" gap-4 grid grid-cols-4 mt-4">

          {<BuyLater/>}
          {<BuyLater/>}
          {<BuyLater/>}
          {<BuyLater/>}

        </div>
      </div>
      
      {/* РОЗСИЛКА НА ЕМАЙЛ */}
      <div className=" my-14">
        <div className="text-white p-6 w-full bg-darkBlueColor flex justify-between ">
          <p className=" text-sm self-center">
            Підпишіться на нашу розсилку - отримайте купон на 300 грн. на перше замовлення!
          </p>
          <div className="flex self-center text-sm w-4/12 ">
            <input type="text" placeholder="Введіть адресу електронної пошти" className="border text-black rounded-l-full px-2 h-9 outline-0  w-full border-grayColorForBorder "></input>
            <button className=" bg-mainYellowColor rounded-r-full p-1 px-3">Apply</button>
          </div>
        </div>
      </div>

    </div>

    {/* <div className="flex w-4/5 mx-auto bg-slate-50 mt-3">

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">Orders</span>

            </div>
            

      <div className="grid grid-cols-12 mt-5">
        {!isBuy?
          <OrdersList/>
        
        :<BuyProduct setAdressOpen={toggleModal} setCardOpen={toggleCardModal} />}

          <div className="col-span-2 bg-slate-100 flex justify-center">
            <div className=" p-3">

              <div className="w-full flex mb-2">
                All item ({totalCount}) preis <span className="font-medium ml-1"> ${orders.map((order) => order.price*order.count).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
              </div>

              <div className="w-full flex justify-center">
                <button onClick={()=>setBuy(true)} className=" bg-yellow-400 rounded-xl w-full py-1 hover:bg-yellow-300 font-medium">
                  Buy Products
                </button>
              </div>

           
            </div>
          </div>
      </div>
            
      </div>

    </div> */}
    </>
}
    
export default Orders;
