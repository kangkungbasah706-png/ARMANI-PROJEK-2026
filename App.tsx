import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { CATALOGS_DATA, FORMAT_CURRENCY } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('catalogue');
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('catalogue');
  const touchStartX = useRef<number | null>(null);

  // --- INTERNAL CONTENT STATE WITH PERSISTENCE ---
  const [catalogs, setCatalogs] = useState(() => {
    const saved = localStorage.getItem('armani_catalogs');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(CATALOGS_DATA));
  });

  const [detailContent, setDetailContent] = useState(() => {
    const saved = localStorage.getItem('armani_detail');
    return saved ? JSON.parse(saved) : {
      subtitle: "Official Internal Document",
      title: "DETAIL PROMOTION",
      accId: "ADVANCED GROUP",
      packageAmount: 3300000,
      profitRange: "20% - 50%",
      contractStatus: "Legal Agreement Active",
      warningText: "SETIAP MISI PEKERJAAN DISELESAIKAN, PENARIKAN DAPAT LANGSUNG DI LAKUKAN. HARAP SELESAIKAN PEKERJAAN INI DALAM WAKTU YANG DI TENTUKAN",
      contractItems: [
        "Bagian tidak terpisahkan dari perjanjian pengguna.",
        "Dana otomatis dikonversi menjadi saldo akun.",
        "Prosedur sesuai Sistem GIORGIO ARMANI.",
        "Aktivasi tugas berarti memahami isi perjanjian.",
        "Berlaku sebagai bukti sah tanpa tanda tangan."
      ],
      jobItems: [
        { h: "Ketentuan", c: "Pesanan diterbitkan otomatis oleh pusat." },
        { h: "Proses", c: "Sistem memproses tugas secara terjadwal." },
        { h: "Tugas", c: "Satu pesanan mencakup satu produk unik." },
        { h: "Status", c: "Restriksi aktif sebelum pesanan dinyatakan final." },
        { h: "Validasi", c: "Wajib mengikuti arahan mentor pembimbing." }
      ],
      workflowItems: [
        { n: "01", t: "SISTEM", d: "Masuk akun bisnis" },
        { n: "02", t: "START", d: "Klik PROMOTION lalu MULAI" },
        { n: "03", t: "PROFIT", d: "Selesai & terima komisi" }
      ]
    };
  });

  const [systemContent, setSystemContent] = useState(() => {
    const saved = localStorage.getItem('armani_system');
    return saved ? JSON.parse(saved) : {
      visualMode: 'kesalahan',
      common: {
        title: "DETEKSI SISTEM",
        accNo: "082124372410",
        reportDate: "30/09/2025",
        owner: "IWAN EGY",
        status: "SALURAN PENARIKAN EROR",
        bank: "BNI",
        pembayaran: 9900000,
        rek: "0897714140",
        frequency: "3",
        saldo: 15850000,
        pendapatan: 29700000,
      },
      kesalahan: {
        target: 14850000,
        withdrawal: 15850000,
        anomalyMsg: "SISTEM CRASH DAN INFORMASI TUGAS HILANG. PEMULIHAN SALURAN PENARIKAN DI PERLUKAN !",
        description: "Anggota melanggar aturan penarikan dan jumlah penarikan tidak sesuai dengan jumlah yang di tentukan oleh sistem, sehingga menyebabkan beberapa hal :",
        bulletPoints: ["SALURAN PENARIKAN TERKUNCI", "INFORMASI TUGAS HILANG", "KREDIBILITAS AKUN MENURUN"],
        recoveryMsg: "PENGGUNA PERLU MELAKUKAN PEMULIHAN SALURAN PENARIKAN DENGAN MELAKUKAN PENGISIAN SALDO KEDALAM AKUN KERJA RP9.900.000 UNTUK MENGEMBALIKAN DATA TUGAS YANG HILANG, AGAR DAPAT MELAKUKAN PENARIKAN KEMBALI SEPERTI SEMULA.",
      },
      kredit: {
        kreditAwal: 100,
        kreditSaatIni: 56,
        kreditNote: "1 POIN KREDIT = RP 810.000 (1%)",
        description: "Anggota melanggar aturan penarikan dan jumlah penarikan tidak sesuai dengan jumlah yang di tentukan oleh sistem, sehingga menyebabkan beberapa hal :",
        bulletPoints: ["SALURAN PENARIKAN TERKUNCI", "INFORMASI TUGAS HILANG", "KREDIBILITAS AKUN MENURUN"],
        recoveryMsg: "PENGGUNA PERLU MELAKUKAN PEMULIHAN SALURAN PENARIKAN DENGAN MELAKUKAN PENGISIAN SALDO KEDALAM AKUN KERJA RP9.900.000 UNTUK MENGEMBALIKAN DATA TUGAS YANG HILANG, AGAR DAPAT MELAKUKAN PENARIKAN KEMBALI SEPERTI SEMULA.",
      },
      verifikasi: {
        verifPercent: 50,
        verifNote: "KETERANGAN : SESUAI KETENTUAN TOTAL SETORAN VERIFIKASI ADALAH 50% DARI SETIAP KESALAHAN TRANSAKSI YANG TERDETEKSI",
        verifList: [
          { label: "KESALAHAN 1", val: 15750000 },
          { label: "KESALAHAN 2", val: 15750000 },
          { label: "KESALAHAN 3", val: 13037500 }
        ],
        description: "Anggota melanggar aturan penarikan dan jumlah penarikan tidak sesuai dengan jumlah yang di tentukan oleh sistem, sehingga menyebabkan beberapa hal :",
        bulletPoints: ["SALURAN PENARIKAN TERKUNCI", "INFORMASI TUGAS HILANG", "KREDIBILITAS AKUN MENURUN"],
        recoveryMsg: "PENGGUNA PERLU MELAKUKAN PEMULIHAN SALURAN PENARIKAN DENGAN MELAKUKAN PENGISIAN SALDO KEDALAM AKUN KERJA RP9.900.000 UNTUK MENGEMBALIKAN DATA TUGAS YANG HILANG, AGAR DAPAT MELAKUKAN PENARIKAN KEMBALI SEPERTI SEMULA.",
      },
      infoBoxMsg: "SISTEM KEAMANAN MENDETEKSI ADANYA TINDAKAN ILEGAL PADA PROSES PENARIKAN DANA. HARAP SEGERA LAKUKAN PROSEDUR PEMULIHAN SESUAI DENGAN KETENTUAN PERUSAHAAN UNTUK MENGAKTIFKAN KEMBALI FITUR TRANSAKSI ANDA."
    };
  });

  const [bankContent, setBankContent] = useState(() => {
    const saved = localStorage.getItem('armani_bank');
    return saved ? JSON.parse(saved) : {
      bankName: "BNI",
      rek: "1988015880",
      owner: "IMAN HADI KESUMA",
      logo: "https://upload.wikimedia.org/wikipedia/id/thumb/1/15/BNI_logo.svg/1200px-BNI_logo.svg.png",
      status: "Exclusive Account"
    };
  });

  const handleSave = () => {
    localStorage.setItem('armani_catalogs', JSON.stringify(catalogs));
    localStorage.setItem('armani_detail', JSON.stringify(detailContent));
    localStorage.setItem('armani_system', JSON.stringify(systemContent));
    localStorage.setItem('armani_bank', JSON.stringify(bankContent));
    setIsAdminOpen(false);
  };

  const nextCatalog = () => setCatalogIndex((prev) => (prev + 1) % catalogs.length);
  const prevCatalog = () => setCatalogIndex((prev) => (prev - 1 + catalogs.length) % catalogs.length);

  const handleCatalogUpdate = (cIdx: number, pIdx: number, field: string, value: any) => {
    setCatalogs((prev: any[]) => {
      const next = [...prev];
      const catalog = { ...next[cIdx] };
      const products = [...catalog.products];
      products[pIdx] = { ...products[pIdx], [field]: value };
      catalog.products = products;
      next[cIdx] = catalog;
      return next;
    });
  };

  const handleVerifItemUpdate = (idx: number, field: string, value: any) => {
    setSystemContent((prev: any) => {
      const nextList = [...prev.verifikasi.verifList];
      nextList[idx] = { ...nextList[idx], [field]: field === 'val' ? Number(value) : value };
      return { ...prev, verifikasi: { ...prev.verifikasi, verifList: nextList } };
    });
  };

  const addVerifItem = () => {
    setSystemContent((prev: any) => ({
      ...prev,
      verifikasi: {
        ...prev.verifikasi,
        verifList: [...prev.verifikasi.verifList, { label: "KESALAHAN BARU", val: 0 }]
      }
    }));
  };

  const removeVerifItem = (idx: number) => {
    setSystemContent((prev: any) => ({
      ...prev,
      verifikasi: {
        ...prev.verifikasi,
        verifList: prev.verifikasi.verifList.filter((_: any, i: number) => i !== idx)
      }
    }));
  };

  const handleJobItemUpdate = (idx: number, field: string, value: any) => {
    setDetailContent((prev: any) => {
      const nextList = [...prev.jobItems];
      nextList[idx] = { ...nextList[idx], [field]: value };
      return { ...prev, jobItems: nextList };
    });
  };

  const addJobItem = () => {
    setDetailContent((prev: any) => ({
      ...prev,
      jobItems: [...prev.jobItems, { h: "BARU", c: "Isi rincian baru di sini." }]
    }));
  };

  const removeJobItem = (idx: number) => {
    setDetailContent((prev: any) => ({
      ...prev,
      jobItems: prev.jobItems.filter((_: any, i: number) => i !== idx)
    }));
  };

  const handleContractItemUpdate = (idx: number, value: string) => {
    setDetailContent((prev: any) => {
      const nextList = [...prev.contractItems];
      nextList[idx] = value;
      return { ...prev, contractItems: nextList };
    });
  };

  const addContractItem = () => {
    setDetailContent((prev: any) => ({
      ...prev,
      contractItems: [...prev.contractItems, "Ketentuan baru."]
    }));
  };

  const removeContractItem = (idx: number) => {
    setDetailContent((prev: any) => ({
      ...prev,
      contractItems: prev.contractItems.filter((_: any, i: number) => i !== idx)
    }));
  };

  const handleWorkflowItemUpdate = (idx: number, field: string, value: string) => {
    setDetailContent((prev: any) => {
      const nextList = [...prev.workflowItems];
      nextList[idx] = { ...nextList[idx], [field]: value };
      return { ...prev, workflowItems: nextList };
    });
  };

  const renderContent = () => {
    if (activeView === 'detail') {
      return (
        <div className="flex flex-col items-center w-full h-full bg-[#fdfdfd] overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center pt-12 pb-8 bg-white border-b border-gray-50 shrink-0">
            <span className="text-[12px] font-black text-[#800000] tracking-[0.6em] uppercase mb-2">{detailContent.subtitle}</span>
            <h2 className="font-brand text-[44px] font-black text-gray-900 tracking-tight leading-none text-center uppercase">
              {detailContent.title}
            </h2>
            <div className="w-24 h-[3px] bg-[#800000] mt-6"></div>
          </div>
          <div className="flex-grow w-full flex items-center justify-center px-12 py-4 overflow-hidden">
            <div className="w-full max-w-[940px] grid grid-cols-12 gap-6 items-stretch h-full">
              {/* LEFT: INFO & TERMS */}
              <div className="col-span-5 flex flex-col gap-6">
                <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm relative overflow-hidden flex-grow flex flex-col justify-center">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#800000]"></div>
                  <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5">Informasi Akun</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tighter">ID Akun</span>
                      <span className="text-[13px] text-gray-900 font-black uppercase">{detailContent.accId}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tighter">Jumlah Paket</span>
                      <span className="text-[13px] text-[#800000] font-black">{FORMAT_CURRENCY(detailContent.packageAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tighter">Estimasi Profit</span>
                      <span className="text-[13px] text-green-700 font-black">{detailContent.profitRange}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 text-white p-7 rounded-sm shadow-2xl flex flex-col justify-between h-[280px]">
                  <div>
                    <h3 className="text-[12px] font-black text-[#800000] uppercase tracking-[0.3em] mb-5 border-l-2 border-[#800000] pl-3">Ketentuan Kontrak</h3>
                    <div className="space-y-2.5">
                      {detailContent.contractItems.map((text: string, i: number) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-[#800000] font-black leading-none mt-1 text-[11px]">›</span>
                          <p className="text-[11px] leading-snug text-gray-300 font-bold">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#800000] animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase text-white/70">{detailContent.contractStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: WORKFLOW & TASKS */}
              <div className="col-span-7 flex flex-col gap-6">
                <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm">
                  <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] mb-8 text-center">Operational Workflow</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {detailContent.workflowItems.map((item: any, i: number) => (
                      <div key={i} className="text-center group relative">
                        <span className="text-[36px] font-brand font-bold text-[#800000]/5 absolute -top-8 left-1/2 -translate-x-1/2 italic">{item.n}</span>
                        <p className="text-[12px] font-black text-gray-900 mb-1 tracking-widest relative z-10 uppercase">{item.t}</p>
                        <p className="text-[10px] text-gray-400 font-extrabold leading-tight relative z-10 px-1">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-gray-100 p-7 rounded-sm shadow-sm flex-grow flex flex-col">
                  <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5">Rincian Tugas</h3>
                  <div className="space-y-4 flex-grow">
                    {detailContent.jobItems.map((item: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 pb-2 border-b border-gray-50 last:border-0">
                        <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mt-1.5 shrink-0"></div>
                        <p className="text-[12px] text-gray-700 leading-tight">
                          <span className="font-black uppercase text-gray-400 mr-2 inline-block w-20 tracking-tighter">{item.h}</span>
                          {item.c}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-[#800000] p-5 border border-[#800000] rounded-sm text-center shadow-lg shadow-[#800000]/10">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.1em] leading-[1.6]">
                      {detailContent.warningText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'system') {
      const s = systemContent;
      const common = s.common;
      const currentModeData = s[s.visualMode];
      const isKreditMode = s.visualMode === 'kredit';
      const accentColor = '#b8860b'; // Gold accent consistent for all system modes

      return (
        <div className="flex flex-col items-center w-full h-full bg-[#fcfcf9] overflow-hidden">
          <div className="w-full h-full pt-4 px-10 pb-6 flex flex-col gap-4 box-border justify-start">
            
            {/* HEADER - CENTERED TITLE */}
            <div className="w-full flex items-center justify-center border-b border-[#b8860b]/30 pb-2 shrink-0 relative">
               <div className="flex items-center gap-6">
                 <GoldWarningIcon color={accentColor} />
                 <h2 className="text-[32px] font-brand font-semibold text-[#1a1a1a] tracking-[0.2em] uppercase italic">{common.title}</h2>
                 <GoldWarningIcon color={accentColor} />
               </div>
            </div>

            {/* TOP DATA PANEL */}
            <div className={`w-full bg-[#1a1a1a] rounded-sm shadow-2xl border-l-[8px] shrink-0`} style={{ borderColor: accentColor }}>
              <div className="bg-[#1a1a1a] p-6 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none rotate-12">
                  <LockIcon size={400} />
                </div>
                <div className="grid grid-cols-2 gap-x-16 gap-y-4 relative z-10">
                   {[
                     { l: "Akun Pengguna", v: common.accNo }, { l: "Tanggal Laporan", v: common.reportDate },
                     { l: "Pemilik Rekening", v: common.owner }, { l: "Status Aktivitas", v: common.status, highlight: true },
                     { l: "Institusi Bank", v: common.bank }, { l: "Total Pembayaran", v: FORMAT_CURRENCY(common.pembayaran) },
                     { l: "Nomor Rekening", v: common.rek }, { l: "Frekuensi Siklus", v: common.frequency },
                     { l: "Informasi Saldo", v: FORMAT_CURRENCY(common.saldo) }, { l: "Total Pendapatan", v: FORMAT_CURRENCY(common.pendapatan) }
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-end border-b border-[#b8860b]/10 pb-1.5 hover:bg-white/5 transition-colors px-1">
                       <span className={`text-[10px] font-sans font-medium tracking-[0.25em] uppercase opacity-70`} style={{ color: accentColor }}>{item.l}</span>
                       <span className={`text-[15px] font-sans font-semibold tracking-tight uppercase ${item.highlight ? 'text-red-500' : 'text-white'}`}>{item.v}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* MIDDLE AREA - AUDIT CONTENT */}
            <div className="w-full flex-grow grid grid-cols-12 gap-5 overflow-hidden">
              <div className="col-span-7 flex flex-col h-full">
                 <div className="w-full py-2 bg-[#1a1a1a] text-center border-b-2 mb-2" style={{ borderColor: accentColor }}>
                   <span className="text-[12px] font-brand font-semibold uppercase tracking-[0.6em]" style={{ color: accentColor }}>DETEKSI SISTEM</span>
                 </div>
                 <div className={`flex-grow bg-white border p-6 shadow-xl overflow-hidden rounded-sm flex flex-col ${s.visualMode === 'verifikasi' ? 'justify-start' : 'justify-center'}`} style={{ borderColor: `${accentColor}33` }}>
                   {s.visualMode === 'kesalahan' && (
                     <div className="h-full flex flex-col justify-center gap-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="bg-[#fcfaf5] p-5 border border-[#b8860b]/10 shadow-inner text-center">
                             <h4 className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-widest mb-2">JUMLAH YANG DI TENTUKAN</h4>
                             <span className="text-[22px] font-sans font-semibold text-green-700 block mb-2">{FORMAT_CURRENCY(s.kesalahan.target)}</span>
                             <div className="flex justify-center"><CheckCircleThin /></div>
                          </div>
                          <div className="bg-[#fffafa] p-5 border border-red-700/10 shadow-inner text-center">
                             <h4 className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-widest mb-2">JUMLAH YANG DITARIK</h4>
                             <span className="text-[22px] font-sans font-semibold text-red-800 block mb-2">{FORMAT_CURRENCY(s.kesalahan.withdrawal)}</span>
                             <div className="flex justify-center"><CrossCircleThin /></div>
                          </div>
                       </div>
                       <div className="bg-[#1a1a1a] p-4 border-l-4 border-[#b8860b] text-center shadow-lg mx-4">
                          <p className="text-[12px] font-sans font-semibold text-[#b8860b] uppercase tracking-widest leading-relaxed">
                            {s.kesalahan.anomalyMsg}
                          </p>
                       </div>
                     </div>
                   )}

                   {s.visualMode === 'kredit' && (
                     <div className="h-full flex flex-col justify-center items-center text-center gap-6">
                       <div className="flex w-full gap-8 px-4">
                          <div className="flex-grow bg-[#1a1a1a] p-6 border border-[#b8860b]/30 rounded-sm shadow-xl flex flex-col justify-center min-h-[140px]">
                             <h4 className="text-[11px] font-sans font-medium text-[#b8860b] uppercase tracking-widest mb-4">KREDIT POIN AWAL</h4>
                             <span className="text-[36px] font-sans font-semibold text-white tracking-widest">{s.kredit.kreditAwal}</span>
                          </div>
                          <div className="flex-grow bg-[#1a1a1a] p-6 border-2 border-[#800000]/40 rounded-sm shadow-xl flex flex-col justify-center min-h-[140px]">
                             <h4 className="text-[11px] font-sans font-medium text-[#800000] uppercase tracking-widest mb-4">KREDIT POIN SAAT INI</h4>
                             <span className="text-[36px] font-sans font-semibold text-white tracking-widest">{s.kredit.kreditSaatIni}</span>
                          </div>
                       </div>
                       <div className="w-full flex flex-col items-center gap-2 border-t border-gray-100 pt-6">
                          <p className="text-[11px] font-sans font-medium text-[#1a1a1a] uppercase tracking-widest">{s.kredit.kreditNote}</p>
                          <div className="border-b border-[#b8860b] px-4 pb-1">
                            <h3 className="text-[20px] font-sans font-semibold text-[#b8860b] uppercase tracking-widest italic">
                               TOTAL PEMULIHAN: IDR {FORMAT_CURRENCY((s.kredit.kreditAwal - s.kredit.kreditSaatIni) * 810000).replace('IDR ', '')}
                            </h3>
                          </div>
                       </div>
                       <div className="relative w-48 h-24 mt-4">
                          <svg className="w-full h-full" viewBox="0 0 100 50">
                             <path d="M 10 45 A 35 35 0 0 1 90 45" fill="none" stroke="#f2f2f2" strokeWidth="8" strokeLinecap="round" />
                             <path 
                                d="M 10 45 A 35 35 0 0 1 90 45" 
                                fill="none" 
                                stroke="#b8860b" 
                                strokeWidth="8" 
                                strokeLinecap="round" 
                                strokeDasharray="100 100"
                                strokeDashoffset={100 - (s.kredit.kreditSaatIni / s.kredit.kreditAwal * 100)}
                             />
                          </svg>
                          <div className="absolute inset-0 flex items-end justify-center pb-2">
                             <span className="text-[20px] font-sans font-semibold text-[#1a1a1a] tracking-widest">{s.kredit.kreditSaatIni}%</span>
                          </div>
                       </div>
                     </div>
                   )}

                   {s.visualMode === 'verifikasi' && (
                     <div className="w-full h-full flex flex-col justify-start p-0">
                       <div className="mb-3">
                         <p className="text-[9px] font-sans font-medium text-gray-400 leading-tight uppercase tracking-tight text-center">
                            {s.verifikasi.verifNote}
                         </p>
                       </div>
                       <div className="overflow-hidden flex flex-col justify-start">
                        <table className="w-full text-[11px] border-collapse">
                           <thead>
                              <tr className="border-b border-[#b8860b]/40">
                                 <th className="text-left py-2 font-sans font-medium text-[#b8860b] uppercase tracking-widest">KESALAHAN</th>
                                 <th className="text-center py-2 font-sans font-medium text-[#b8860b] uppercase tracking-widest">NOMINAL</th>
                                 <th className="text-right py-2 font-sans font-medium text-[#b8860b] uppercase tracking-widest">BIAYA VERIF</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {s.verifikasi.verifList.map((item: any, idx: number) => (
                                 <tr key={idx} className="hover:bg-gray-50">
                                    <td className="py-1.5 font-sans font-medium text-gray-500 uppercase tracking-tight">{item.label}</td>
                                    <td className="py-1.5 text-center font-sans font-semibold text-gray-900">{FORMAT_CURRENCY(item.val)}</td>
                                    <td className="py-1.5 text-right font-sans font-semibold text-red-700">{FORMAT_CURRENCY(item.val * (s.verifikasi.verifPercent / 100))}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                       </div>
                       <div className="bg-[#1a1a1a] p-3 rounded-sm flex justify-between items-center text-white border border-[#b8860b]/20 shadow-xl mt-4">
                          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] opacity-60">TOTAL BIAYA VERIFIKASI AKTIF</span>
                          <span className="text-[20px] font-sans font-semibold text-[#b8860b] tracking-wider italic">
                             {FORMAT_CURRENCY(s.verifikasi.verifList.reduce((acc: number, curr: any) => acc + curr.val, 0) * (s.verifikasi.verifPercent / 100))}
                          </span>
                       </div>
                     </div>
                   )}
                 </div>
              </div>

              {/* RIGHT: CATATAN RESMI (Dynamic per Mode & Styled per Screenshot) */}
              <div className={`col-span-5 bg-[#1a1a1a] border-l-[6px] flex flex-col p-6 shadow-2xl rounded-sm h-full`} style={{ borderColor: accentColor }}>
                 <div className={`w-full border-b pb-3 mb-4`} style={{ borderColor: `${accentColor}4D` }}>
                   <span className={`text-[13px] font-brand font-semibold uppercase tracking-[0.4em]`} style={{ color: accentColor }}>Catatan Resmi Perusahaan</span>
                 </div>
                 <div className="space-y-6 flex-grow overflow-hidden flex flex-col justify-center">
                  <p className="text-[14px] font-sans font-normal leading-relaxed text-gray-200 text-justify italic opacity-85">
                    "{currentModeData.description}"
                  </p>
                  <div className="space-y-4">
                    {currentModeData.bulletPoints.map((text: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className={`w-2 h-2 rotate-45 shrink-0 shadow-lg`} style={{ backgroundColor: accentColor }}></div>
                        <span className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-6 pt-5 border-t`} style={{ borderColor: `${accentColor}33` }}>
                    <p className={`text-[12px] font-sans font-semibold leading-relaxed text-white uppercase tracking-widest p-4 rounded-sm border text-center italic shadow-inner`} style={{ backgroundColor: `${accentColor}1A`, borderColor: `${accentColor}33` }}>
                      {currentModeData.recoveryMsg}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }

    if (activeView === 'bank') {
      const b = bankContent;
      return (
        <div className="flex items-center justify-center w-full h-full bg-[#f2f2f1] overflow-hidden p-10 relative">
          <div className="w-[920px] h-[540px] bg-white shadow-[0_40px_90px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden border border-gray-200 flex flex-col rounded-2xl">
            <div className="w-full h-[8px] bg-gradient-to-r from-[#b8860b] via-[#ffd700] to-[#b8860b] shrink-0"></div>
            <div className="flex-grow flex flex-col px-20 pt-16 pb-14 relative z-10">
              <div className="mb-12 border-b border-gray-100 pb-10">
                <h2 className="text-[38px] font-brand font-black tracking-tight leading-none uppercase bg-gradient-to-r from-[#b8860b] via-[#8e6e3c] to-[#b8860b] bg-clip-text text-transparent">
                  Bank Account <span className="text-gray-900">Card</span>
                </h2>
                <p className="text-[13px] text-gray-400 font-black uppercase tracking-[0.6em] mt-3 italic">Digital Business Program Official Partner</p>
              </div>
              <div className="flex-grow grid grid-cols-12 gap-10 items-stretch">
                <div className="col-span-4 flex items-center justify-center border-r border-gray-50 pr-14">
                  <div className="w-full aspect-square bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center p-10">
                    <img src={b.logo} alt="Bank Logo" className="w-full max-h-20 object-contain" />
                  </div>
                </div>
                <div className="col-span-8 pl-10 flex flex-col justify-center gap-10">
                  <div className="flex items-center">
                    <span className="w-44 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">BANK NAME</span>
                    <span className="text-[28px] font-brand font-black text-gray-800 tracking-[0.1em] pl-10 border-l border-gray-100 uppercase">{b.bankName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">NO. ACCOUNT</span>
                    <span className="text-[36px] font-brand font-black bg-gradient-to-r from-[#b8860b] via-[#8e6e3c] to-[#b8860b] bg-clip-text text-transparent tracking-[0.15em] pl-10 border-l border-gray-100">{b.rek}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">NAME</span>
                    <span className="text-[24px] font-brand font-black text-gray-900 uppercase pl-10 border-l border-gray-100">{b.owner}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 right-12">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] px-8 py-3 rounded-full bg-gradient-to-r from-[#b8860b] via-[#8e6e3c] to-[#b8860b] shadow-xl">
                  {b.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full h-full overflow-hidden" 
           onTouchStart={e => touchStartX.current = e.touches[0].clientX}
           onTouchEnd={e => {
             if (!touchStartX.current) return;
             const diff = touchStartX.current - e.changedTouches[0].clientX;
             if (Math.abs(diff) > 50) diff > 0 ? nextCatalog() : prevCatalog();
             touchStartX.current = null;
           }}>
        <div className="w-full h-20 bg-white border-b-2 border-gray-900 flex flex-col items-center justify-center shrink-0 shadow-sm">
          <h2 className="font-brand text-[28px] font-black text-[#800000] tracking-[0.4em] uppercase text-center leading-none">
            {catalogs[catalogIndex].name} CATALOGUE
          </h2>
          <p className="text-[11px] font-black text-gray-400 tracking-[0.5em] uppercase mt-2 opacity-80">Exclusive Collection Selection</p>
        </div>
        <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-8 w-full max-w-[980px] p-8 overflow-hidden">
          {catalogs[catalogIndex].products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="w-full h-16 bg-white flex items-center justify-center gap-10 border-t border-gray-50 shrink-0">
          <button onClick={prevCatalog} className="text-gray-300 hover:text-gray-900 transition-colors uppercase font-black text-[10px] tracking-widest">Previous</button>
          <div className="flex gap-2">
            {catalogs.map((_: any, i: number) => (
              <div key={i} className={`w-3 h-1.5 rounded-full ${i === catalogIndex ? 'bg-[#800000]' : 'bg-gray-100'}`} />
            ))}
          </div>
          <button onClick={nextCatalog} className="text-gray-300 hover:text-gray-900 transition-colors uppercase font-black text-[10px] tracking-widest">Next</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-canvas flex flex-col overflow-hidden bg-[#f4f4f4] shadow-2xl relative">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="relative z-10 flex-grow overflow-hidden flex flex-col">
        {renderContent()}
      </main>
      <footer className="relative z-10 w-full text-center py-6 bg-white border-t border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[1.2em] shrink-0">
        MANAGEMENT SYSTEM 2026
      </footer>

      {/* ADMIN CONTROL CENTER TRIGGER */}
      <button 
        onClick={() => {
          setAdminTab('catalogue'); // Reset to default tab when opening
          setIsAdminOpen(true);
        }}
        className="fixed bottom-2 right-2 z-[100] w-6 h-6 bg-black/10 hover:bg-black/20 text-black/20 rounded flex items-center justify-center transition-all opacity-20 hover:opacity-100"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
      </button>

      {/* ADMIN CONTROL CENTER MODAL */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-10">
          <div className="w-full max-w-[1000px] h-[80vh] bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans">
            <div className="p-6 bg-[#252525] border-b border-white/5 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-white font-bold text-xl uppercase tracking-widest">Admin Control Center</h2>
                <p className="text-gray-400 text-xs mt-1">Sistem Pengatur Nilai Konten Manual - V1.5 Executive</p>
              </div>
              <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-lg font-black text-xs uppercase hover:bg-gray-200">Simpan & Tutup</button>
            </div>
            <div className="flex flex-grow overflow-hidden">
              <div className="w-[240px] border-r border-white/5 bg-[#202020] p-4 flex flex-col gap-2 shrink-0">
                {['catalogue', 'detail', 'system', 'bank'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setAdminTab(t)}
                    className={`text-left px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${adminTab === t ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    {t === 'system' ? 'System Control' : `${t.charAt(0).toUpperCase() + t.slice(1)} Control`}
                  </button>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto p-10 bg-[#181818] custom-scrollbar">
                {adminTab === 'catalogue' && (
                  <div className="space-y-12">
                    {catalogs.map((cat: any, cIdx: number) => (
                      <div key={cIdx} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-white font-bold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">{cIdx + 1}</span>
                          CATALOGUE: {cat.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                          {cat.products.map((p: any, pIdx: number) => (
                            <div key={p.id} className="p-4 border border-white/5 rounded-xl bg-black/20">
                              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-3">Produk {['A','B','C','D'][pIdx]}</span>
                              <div className="space-y-4">
                                <AdminInput label="Nama" value={p.name} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'name', v)} />
                                <div className="grid grid-cols-2 gap-3">
                                  <AdminInput label="Harga (IDR)" type="number" value={p.price} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'price', Number(v))} />
                                  <AdminInput label="Profit (IDR)" type="number" value={p.profit} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'profit', Number(v))} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <AdminInput label="Komisi (%)" type="number" value={p.commission} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'commission', Number(v))} />
                                  <AdminInput label="Status Badge" value={p.statusText} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'statusText', v)} />
                                </div>
                                <AdminInput label="URL Gambar" value={p.imageUrl} onChange={(v: any) => handleCatalogUpdate(cIdx, pIdx, 'imageUrl', v)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {adminTab === 'system' && (
                  <div className="space-y-8">
                    {/* IDENTITY PANEL - GLOBAL WITHIN SYSTEM CONTROL */}
                    <AdminGroup label="Panel Identitas (Global)">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <AdminInput label="Akun" value={systemContent.common.accNo} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, accNo: v}}))} />
                        <AdminInput label="Tanggal" value={systemContent.common.reportDate} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, reportDate: v}}))} />
                        <AdminInput label="Nama Rekening" value={systemContent.common.owner} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, owner: v}}))} />
                        <AdminInput label="Status Akun" value={systemContent.common.status} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, status: v}}))} />
                        <AdminInput label="Bank" value={systemContent.common.bank} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, bank: v}}))} />
                        <AdminInput label="Pembayaran" type="number" value={systemContent.common.pembayaran} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, pembayaran: Number(v)}}))} />
                        <AdminInput label="No Rekening" value={systemContent.common.rek} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, rek: v}}))} />
                        <AdminInput label="Frekuensi" value={systemContent.common.frequency} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, frequency: v}}))} />
                        <AdminInput label="Saldo" type="number" value={systemContent.common.saldo} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, saldo: Number(v)}}))} />
                        <AdminInput label="Pendapatan" type="number" value={systemContent.common.pendapatan} onChange={(v: any) => setSystemContent((p: any) => ({...p, common: {...p.common, pendapatan: Number(v)}}))} />
                      </div>
                    </AdminGroup>

                    {/* SUB-TABS NAVIGATION (KESALAHAN | KREDIT | VERIFIKASI) */}
                    <div className="flex flex-col gap-6">
                      <div className="bg-white/5 p-1.5 rounded-xl border border-white/10 flex gap-1.5">
                        {['kesalahan', 'kredit', 'verifikasi'].map(t => (
                          <button
                            key={t}
                            onClick={() => setSystemContent((p: any) => ({...p, visualMode: t}))}
                            className={`flex-grow py-3 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] transition-all ${systemContent.visualMode === t ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      {/* TAB CONTENT: KESALAHAN */}
                      {systemContent.visualMode === 'kesalahan' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <AdminGroup label="DETAIL CONTROL KESALAHAN">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <AdminInput label="Jumlah Ditentukan" type="number" value={systemContent.kesalahan.target} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, target: Number(v)}}))} />
                              <AdminInput label="Jumlah Ditarik" type="number" value={systemContent.kesalahan.withdrawal} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, withdrawal: Number(v)}}))} />
                            </div>
                            <AdminTextarea label="Pesan Crash Kesalahan" value={systemContent.kesalahan.anomalyMsg} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, anomalyMsg: v}}))} />
                            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                              <AdminTextarea label="Deskripsi Catatan Resmi" value={systemContent.kesalahan.description} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, description: v}}))} />
                              <AdminInput label="Poin Catatan (Pisahkan dengan koma)" value={systemContent.kesalahan.bulletPoints.join(', ')} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, bulletPoints: v.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')}}))} />
                              <AdminTextarea label="Pesan Pemulihan (Bottom Box)" value={systemContent.kesalahan.recoveryMsg} onChange={(v: any) => setSystemContent((p: any) => ({...p, kesalahan: {...p.kesalahan, recoveryMsg: v}}))} />
                            </div>
                          </AdminGroup>
                        </div>
                      )}

                      {/* TAB CONTENT: KREDIT */}
                      {systemContent.visualMode === 'kredit' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <AdminGroup label="DETAIL CONTROL KREDIT">
                            <div className="grid grid-cols-2 gap-4">
                              <AdminInput label="Kredit Poin AWAL" type="number" value={systemContent.kredit.kreditAwal} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, kreditAwal: Number(v)}}))} />
                              <AdminInput label="Kredit Poin Saat INI" type="number" value={systemContent.kredit.kreditSaatIni} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, kreditSaatIni: Number(v)}}))} />
                            </div>
                            <div className="mt-4">
                              <AdminInput label="Note Konversi (e.g. 1 POIN = ...)" value={systemContent.kredit.kreditNote} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, kreditNote: v}}))} />
                            </div>
                            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                              <AdminTextarea label="Deskripsi Catatan Resmi (Sidebar)" value={systemContent.kredit.description} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, description: v}}))} />
                              <AdminInput label="Poin Catatan Sidebar (Pisahkan dengan koma)" value={systemContent.kredit.bulletPoints.join(', ')} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, bulletPoints: v.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')}}))} />
                              <AdminTextarea label="Pesan Pemulihan Sidebar (Bottom Box)" value={systemContent.kredit.recoveryMsg} onChange={(v: any) => setSystemContent((p: any) => ({...p, kredit: {...p.kredit, recoveryMsg: v}}))} />
                            </div>
                          </AdminGroup>
                        </div>
                      )}

                      {/* TAB CONTENT: VERIFIKASI */}
                      {systemContent.visualMode === 'verifikasi' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <AdminGroup label="DETAIL CONTROL VERIFIKASI">
                            <div className="grid grid-cols-2 gap-4">
                              <AdminInput 
                                label="Persentase Biaya Verifikasi (%)" 
                                type="number" 
                                value={systemContent.verifikasi.verifPercent} 
                                onChange={(v: any) => setSystemContent((p: any) => ({...p, verifikasi: {...p.verifikasi, verifPercent: Number(v)}}))} 
                              />
                              <AdminTextarea 
                                label="Note Verifikasi (Top Note)" 
                                value={systemContent.verifikasi.verifNote} 
                                onChange={(v: any) => setSystemContent((p: any) => ({...p, verifikasi: {...p.verifikasi, verifNote: v}}))} 
                              />
                            </div>
                            
                            <div className="mt-4 border-t border-white/10 pt-4">
                              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest block mb-4">Daftar Nominal Verifikasi</label>
                              <div className="space-y-3">
                                {systemContent.verifikasi.verifList.map((item: any, idx: number) => (
                                  <div key={idx} className="flex gap-3 items-end bg-black/20 p-3 rounded-lg border border-white/5 relative group">
                                    <div className="flex-grow">
                                      <AdminInput label="Label Kesalahan" value={item.label} onChange={(v: any) => handleVerifItemUpdate(idx, 'label', v)} />
                                    </div>
                                    <div className="w-[40%]">
                                      <AdminInput label="Nominal Dasar" type="number" value={item.val} onChange={(v: any) => handleVerifItemUpdate(idx, 'val', v)} />
                                    </div>
                                    <button 
                                      onClick={() => removeVerifItem(idx)}
                                      className="p-3 bg-red-900/20 text-red-500 rounded-lg border border-red-900/30 hover:bg-red-900/40 transition-all shrink-0"
                                      title="Hapus Baris"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <button 
                                onClick={addVerifItem}
                                className="mt-4 w-full py-3 bg-white/5 border border-dashed border-white/20 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                Tambah Baris Baru
                              </button>
                            </div>

                            <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
                                <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest block mb-2">Catatan Resmi (Khusus Verifikasi)</label>
                                <AdminTextarea label="Deskripsi Catatan Resmi" value={systemContent.verifikasi.description} onChange={(v: any) => setSystemContent((p: any) => ({...p, verifikasi: {...p.verifikasi, description: v}}))} />
                                <AdminInput label="Poin Catatan (Pisahkan dengan koma)" value={systemContent.verifikasi.bulletPoints.join(', ')} onChange={(v: any) => setSystemContent((p: any) => ({...p, verifikasi: {...p.verifikasi, bulletPoints: v.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')}}))} />
                                <AdminTextarea label="Pesan Pemulihan (Bottom Box)" value={systemContent.verifikasi.recoveryMsg} onChange={(v: any) => setSystemContent((p: any) => ({...p, verifikasi: {...p.verifikasi, recoveryMsg: v}}))} />
                            </div>
                          </AdminGroup>
                        </div>
                      )}

                      <AdminGroup label="Global Info Box (Muncul di semua mode)">
                        <AdminTextarea label="Isi Info Box" value={systemContent.infoBoxMsg} onChange={(v: any) => setSystemContent((p: any) => ({...p, infoBoxMsg: v}))} />
                      </AdminGroup>
                    </div>
                  </div>
                )}

                {adminTab === 'detail' && (
                  <div className="space-y-8">
                    <AdminGroup label="Header & Summary">
                      <AdminInput label="Subtitle" value={detailContent.subtitle} onChange={(v: any) => setDetailContent((p: any) => ({...p, subtitle: v}))} />
                      <AdminInput label="Title" value={detailContent.title} onChange={(v: any) => setDetailContent((p: any) => ({...p, title: v}))} />
                      <div className="grid grid-cols-2 gap-4">
                        <AdminInput label="ID Akun" value={detailContent.accId} onChange={(v: any) => setDetailContent((p: any) => ({...p, accId: v}))} />
                        <AdminInput label="Jumlah Paket" type="number" value={detailContent.packageAmount} onChange={(v: any) => setDetailContent((p: any) => ({...p, packageAmount: Number(v)}))} />
                        <AdminInput label="Profit Range" value={detailContent.profitRange} onChange={(v: any) => setDetailContent((p: any) => ({...p, profitRange: v}))} />
                        <AdminInput label="Contract Status" value={detailContent.contractStatus} onChange={(v: any) => setDetailContent((p: any) => ({...p, contractStatus: v}))} />
                      </div>
                    </AdminGroup>

                    <AdminGroup label="Operational Workflow (Manually Editable)">
                      <div className="space-y-6">
                        {detailContent.workflowItems.map((item: any, idx: number) => (
                          <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Step {item.n}</span>
                            <div className="grid grid-cols-2 gap-4">
                              <AdminInput label="Title (e.g. SISTEM)" value={item.t} onChange={(v: string) => handleWorkflowItemUpdate(idx, 't', v)} />
                              <AdminInput label="Number Icon (e.g. 01)" value={item.n} onChange={(v: string) => handleWorkflowItemUpdate(idx, 'n', v)} />
                            </div>
                            <AdminTextarea label="Description" value={item.d} onChange={(v: string) => handleWorkflowItemUpdate(idx, 'd', v)} />
                          </div>
                        ))}
                      </div>
                    </AdminGroup>

                    <AdminGroup label="Ketentuan Kontrak (Manually Editable)">
                      <div className="space-y-3">
                        {detailContent.contractItems.map((item: string, idx: number) => (
                          <div key={idx} className="flex gap-3 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                            <AdminInput label={`Ketentuan ${idx + 1}`} value={item} onChange={(v: string) => handleContractItemUpdate(idx, v)} />
                            <button 
                              onClick={() => removeContractItem(idx)}
                              className="p-3 mt-4 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={addContractItem}
                          className="w-full py-3 bg-white/5 border border-dashed border-white/20 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          Tambah Ketentuan Kontrak
                        </button>
                      </div>
                    </AdminGroup>

                    <AdminGroup label="Rincian Tugas (Manually Editable)">
                      <div className="space-y-4">
                        {detailContent.jobItems.map((item: any, idx: number) => (
                          <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5 relative group">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Rincian {idx + 1}</span>
                              <button 
                                onClick={() => removeJobItem(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                title="Hapus Rincian"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                            <div className="space-y-4">
                              <AdminInput label="Header (e.g. KETENTUAN)" value={item.h} onChange={(v: any) => handleJobItemUpdate(idx, 'h', v)} />
                              <AdminTextarea label="Konten Rincian" value={item.c} onChange={(v: any) => handleJobItemUpdate(idx, 'c', v)} />
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={addJobItem}
                          className="w-full py-4 bg-white/5 border border-dashed border-white/20 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          Tambah Rincian Tugas
                        </button>
                      </div>
                    </AdminGroup>

                    <AdminGroup label="Footer Warning">
                      <AdminTextarea label="Warning Text" value={detailContent.warningText} onChange={(v: any) => setDetailContent((p: any) => ({...p, warningText: v}))} />
                    </AdminGroup>
                  </div>
                )}

                {adminTab === 'bank' && (
                  <div className="space-y-8">
                    <AdminGroup label="Bank Information">
                      <AdminInput label="Bank Name" value={bankContent.bankName} onChange={(v: any) => setBankContent((p: any) => ({...p, bankName: v}))} />
                      <AdminInput label="No. Account" value={bankContent.rek} onChange={(v: any) => setBankContent((p: any) => ({...p, rek: v}))} />
                      <AdminInput label="Account Name" value={bankContent.owner} onChange={(v: any) => setBankContent((p: any) => ({...p, owner: v}))} />
                      <AdminInput label="Bank Logo URL" value={bankContent.logo} onChange={(v: any) => setBankContent((p: any) => ({...p, logo: v}))} />
                      <AdminInput label="Badge Status" value={bankContent.status} onChange={(v: any) => setBankContent((p: any) => ({...p, status: v}))} />
                    </AdminGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-in { animation: animate-in 0.3s ease-out; }
        @keyframes animate-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

// --- LUXURY ICON COMPONENTS ---
const GoldWarningIcon = ({ color = '#b8860b' }: { color?: string }) => (
  <svg className="w-10 h-10" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const LockIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const CheckCircleThin = () => (
  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="0.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
  </svg>
);

const CrossCircleThin = () => (
  <svg className="w-8 h-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="0.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 9l-6 6m0-6l6 6" />
  </svg>
);

const AdminGroup = ({ label, children }: any) => (
  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-2">{label}</h4>
    {children}
  </div>
);

const AdminInput = ({ label, value, type = "text", onChange }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-black/40 border border-white/10 rounded-lg p-3 text-white text-xs outline-none focus:border-white/30 transition-all"
    />
  </div>
);

const AdminTextarea = ({ label, value, onChange }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest ml-1">{label}</label>
    <textarea 
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-black/40 border border-white/10 rounded-lg p-3 text-white text-xs outline-none focus:border-white/30 transition-all h-24 resize-none"
    />
  </div>
);

export default App;