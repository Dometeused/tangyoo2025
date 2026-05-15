
export const THEMES = [
    {
        key: "funeral",
        label: "งานอาลัย",
        bg: "bg-zinc-900",
        text: "text-white",
        dot: "bg-zinc-800",
        ctaClass: "bg-zinc-900 hover:bg-zinc-800",
        image: "/images/funeral.png",
        title: "สร้างหน้าอาลัย บันทึกความทรงจำสุดท้าย",
        desc: "ให้ 'ตั้งอยู่' เก็บความหมายอาลัย ไม่ให้ความทรงจำหายไป",
        cta: "สร้างหน้าอาลัย",
        ctaLink: "/creation?theme=funeral",
        menuCTA: "สร้างหน้าอาลัย",
        middleSection: {
            image: "/images/qr2way-funeral.png",
            title: "เชื่อมโยงความทรงจำ… จากวันแรกถึงวันอาลัย",
            desc: "QR Code 2-Phase ของ 'ตั้งอยู่' จะอยู่กับคุณในทุกช่วงเวลา ไม่ว่าก่อนหรือหลังวันสำคัญ ความทรงจำจะไม่มีวันหายไป",
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
        bg: "bg-blue-50",
        text: "text-blue-800",
        dot: "bg-blue-400",
        ctaClass: "bg-blue-500 hover:bg-blue-600",
        image: "/images/anniversary.png",
        title: "ของขวัญความทรงจำ สำหรับคนพิเศษ",
        desc: "ส่งต่อความรู้สึกดี ๆ ในวันสำคัญ ด้วยของขวัญที่มีเรื่องราว",
        cta: "สร้างของขวัญพิเศษ",
        ctaLink: "/creation?theme=anniversary",
        menuCTA: "สร้างของขวัญพิเศษ",
        middleSection: {
            image: "/images/anniversary-gift.png",
            title: "ของขวัญที่มีความหมาย… เฉพาะคุณ",
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
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        dot: "bg-yellow-400",
        ctaClass: "bg-yellow-500 hover:bg-yellow-600",
        image: "/images/baby.png", // Placeholder
        title: "ต้อนรับสมาชิกใหม่ของครอบครัว",
        desc: "บันทึกก้าวแรกและพัฒนาการสำคัญของลูกน้อย",
        cta: "สร้างหน้าเด็กแรกเกิด",
        ctaLink: "/creation?theme=baby",
        menuCTA: "สร้างหน้าเด็กแรกเกิด",
        middleSection: {
            image: "/images/qr2way-baby.png", // Placeholder
            title: "เก็บทุกรอยยิ้ม... ตั้งแต่วันแรก",
            desc: "QR Code 2-Phase ที่เติบโตไปพร้อมกับลูกน้อย บันทึกเรื่องราวจากวันแรกคลอดสู่วันเกิดปีแรก",
        },
        catalog: [
            {
                name: "กรอบรูปแรกเกิด",
                img: "/images/catalog-souvenir-baby-1.png",
                link: "#",
            },
            {
                name: "อัลบั้มภาพ",
                img: "/images/catalog-souvenir-baby-2.png",
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
