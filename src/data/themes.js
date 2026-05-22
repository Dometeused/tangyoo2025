
export const THEMES = [
    {
        key: "funeral",
        label: "งานอาลัย",
        bg: "bg-stone-950", // Dark warm brown/black
        text: "text-orange-50",
        dot: "bg-orange-500", // Candle flame color
        ctaClass: "bg-orange-700 hover:bg-orange-600",
        image: "/images/funeral.png",
        title: "สร้างหน้าอาลัย บันทึกความทรงจำสุดท้าย",
        desc: "ให้ 'ตั้งอยู่' เก็บความหมายอาลัย เปรียบดั่งแสงเทียนแห่งความทรงจำที่ไม่ดับสูญ",
        features: ["แสงเทียนเคลื่อนไหว", "สมุดอาลัยออนไลน์", "แกลเลอรีความทรงจำ", "QR 2-Phase"],
        cta: "สร้างหน้าอาลัย",
        ctaLink: "/creation?theme=funeral",
        menuCTA: "สร้างหน้าอาลัย",
        middleSection: {
            image: "/images/qr2way-funeral.png",
            title: "แสงเทียนแห่งความระลึกถึง... แด่ผู้ล่วงลับ",
            desc: "QR Code 2-Phase ของ 'ตั้งอยู่' จะทำหน้าที่รักษาร่องรอยความรักและความทรงจำให้คงอยู่ตลอดไป",
        },
        catalog: [
            {
                name: "กรอบรูปอาลัย",
                img: "/images/catalog-souvenir-funeral-1.png",
                link: "#",
            },
            {
                name: "ของชำร่วยอาลัย",
                img: "/images/catalog-souvenir-funeral-2.png",
                link: "#",
            },
            {
                name: "แก้วน้ำอาลัย",
                img: "/images/catalog-souvenir-funeral-3.png",
                link: "#",
            },
        ],
    },
    {
        key: "anniversary",
        label: "งานครบรอบ/ของขวัญ",
        // Yellow/Gold Theme
        bg: "bg-amber-50",
        text: "text-amber-900",
        dot: "bg-amber-400",
        ctaClass: "bg-amber-500 hover:bg-amber-600 text-white",
        image: "/images/anniversary.png",
        title: "ของขวัญความทรงจำ สำหรับคนพิเศษ",
        desc: "ฉลองวันครบรอบด้วยความทรงจำที่ส่องสว่างดั่งทองคำ",
        features: ["ประกายทองเคลื่อนไหว", "ไทม์ไลน์ความทรงจำ", "สมุดอวยพร", "QR 2-Phase"],
        cta: "สร้างของขวัญพิเศษ",
        ctaLink: "/creation?theme=anniversary",
        menuCTA: "สร้างของขวัญพิเศษ",
        middleSection: {
            image: "/images/anniversary-gift.png",
            title: "ของขวัญที่มีค่า... ดั่งทองคำ",
            desc: "ทุก Memory Page คือกล่องความทรงจำที่ออกแบบมาเพื่อวันสำคัญ ให้ความรู้สึกพิเศษที่ไม่มีใครเหมือน",
        },
        catalog: [
            {
                name: "เคสโทรศัพท์",
                img: "/images/catalog-souvenir-anniversary-1.png",
                link: "#",
            },
            {
                name: "กรอบรูปตั้งโต๊ะ",
                img: "/images/catalog-souvenir-anniversary-2.png",
                link: "#",
            },
            {
                name: "เสื้อคู่ความทรงจำ",
                img: "/images/catalog-souvenir-anniversary-3.png",
                link: "#",
            },
        ],
    },
    {
        key: "wedding",
        label: "งานแต่ง",
        bg: "bg-pink-50",
        text: "text-pink-700",
        dot: "bg-pink-400",
        ctaClass: "bg-pink-500 hover:bg-pink-600",
        image: "/images/wedding.png",
        title: "เก็บทุกโมเมนต์แห่งความรัก",
        desc: "รวมภาพความประทับใจและคำอวยพรสำคัญในวันแต่งงาน",
        features: ["กลีบดอกไม้ร่วง", "สมุดอวยพรคู่", "แกลเลอรีภาพ", "QR 2-Phase"],
        cta: "สร้างหน้าแต่งงาน",
        ctaLink: "/creation?theme=wedding",
        menuCTA: "สร้างหน้าแต่งงาน",
        middleSection: {
            image: "/images/qr2way-wedding.png",
            title: "เก็บความทรงจำทุกโมเมนต์แห่งความรัก",
            desc: "QR Code 2-Phase สำหรับงานแต่งงาน เก็บทั้งบรรยากาศงานและเรื่องราวหลังวันสำคัญ ให้ความรักยัง 'ตั้งอยู่' กับคุณเสมอ",
        },
        catalog: [
            {
                name: "ที่เปิดขวดที่ระลึก",
                img: "/images/catalog-souvenir-wedding-1.png",
                link: "#",
            },
            {
                name: "สมุดโน๊ตคู่รัก",
                img: "/images/catalog-souvenir-wedding-2.png",
                link: "#",
            },
            {
                name: "แก้วน้ำแต่งงาน",
                img: "/images/catalog-souvenir-wedding-3.png",
                link: "#",
            },
        ],
    },
    {
        key: "baby",
        label: "เด็กแรกเกิด/วันเกิด",
        bg: "bg-purple-50",
        text: "text-purple-700",
        dot: "bg-purple-400",
        ctaClass: "bg-purple-500 hover:bg-purple-600 text-white",
        image: "/images/welcome.png",
        title: "ต้อนรับสมาชิกใหม่ของครอบครัว",
        desc: "บันทึกก้าวแรกและพัฒนาการสำคัญของลูกน้อย",
        features: ["ไทม์ไลน์พัฒนาการ", "อัลบั้มภาพน่ารัก", "สมุดอวยพร", "QR 2-Phase"],
        cta: "สร้างหน้าเด็กแรกเกิด",
        ctaLink: "/creation?theme=baby",
        menuCTA: "สร้างหน้าเด็กแรกเกิด",
        middleSection: {
            image: "/images/welcome.png",
            title: "เก็บทุกรอยยิ้ม... ตั้งแต่วันแรก",
            desc: "QR Code 2-Phase ที่เติบโตไปพร้อมกับลูกน้อย บันทึกเรื่องราวจากวันแรกคลอดสู่วันเกิดปีแรก",
        },
        catalog: [
            {
                name: "กรอบรูปแรกเกิด",
                img: "/images/welcome.png",
                link: "#",
            },
            {
                name: "อัลบั้มภาพ",
                img: "/images/Hidden Smiles in Nature.png",
                link: "#",
            },
        ],
    },
];

export const BRAND = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    textPrimary: "text-orange-700",
};
