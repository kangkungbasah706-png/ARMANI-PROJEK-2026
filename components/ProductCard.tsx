
import React from 'react';
import { FORMAT_CURRENCY } from '../constants';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const totalKeuntungan = product.price + product.profit;
  
  return (
    <div className="bg-white border border-gray-100 rounded-2xl flex overflow-hidden shadow-lg transition-all duration-500 group h-full border-b-[6px] border-b-gray-200/30">
      
      {/* SISI KIRI: GAMBAR */}
      <div className="w-[45%] h-full bg-[#fcfcfc] relative overflow-hidden shrink-0 border-r border-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
           <span className="text-[9px] font-black text-white px-3 py-1 rounded-sm bg-black/80 backdrop-blur-sm shadow-sm tracking-[0.2em] uppercase border border-white/20">
             {product.label}
           </span>
        </div>
      </div>

      {/* SISI KANAN: INFO */}
      <div className="flex-grow p-6 flex flex-col justify-between bg-white relative">
        <div className="space-y-1">
          <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase">Premium Varian</span>
          <h3 className="font-brand text-[20px] font-black text-gray-900 leading-tight uppercase tracking-tight line-clamp-2">
            {product.name}
          </h3>
          <div className="h-[2px] w-8 bg-gray-100 mt-2"></div>
        </div>

        <div className="space-y-4 py-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Harga</span>
            <span className="text-[16px] font-black text-gray-900">{FORMAT_CURRENCY(product.price)}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Komisi {product.commission}%</span>
              <span className="text-[14px] font-bold text-green-700">{FORMAT_CURRENCY(product.profit)}</span>
            </div>
            <div className="h-6 w-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-gray-900 uppercase">
                 {product.statusText || 'A+ STATUS'}
               </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8"></div>
          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block mb-1">Total Keuntungan</span>
          <span className="text-[18px] font-black text-white leading-none tracking-tight block">
            {FORMAT_CURRENCY(totalKeuntungan)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
