"use client";
import { useState } from "react";
import { useAppMode } from "@/context/AppModeContext";
import QRCodeAndScheduleSection from "@/components/QRCodeAndScheduleSection";
import CoverSection from "@/components/CoverSection";
import GalleryPreview from "@/components/GalleryPreview";
import GuestBookSection from "@/components/GuestBookSection";
import BioBox from "@/components/BioBox";
import BioBox2 from "@/components/BioBox2";
import ButtonGroupSection from "@/components/ButtonGroupSection";
import Modal from "@/components/Modal";
import TimelineTree from "@/components/timeline-tree/TimelineTree";
import BGMPlayer from "@/components/BGMPlayer";
import ThemeEffect from "@/components/ThemeEffect";
import BlessingSocialRow from "@/components/BlessingSocialRow";
import BioBox2EditModal from "@/components/BioBox2EditModal";
import SectionTitle from "@/components/SectionTitle";
import SectionQuote from "@/components/SectionQuote";
import StoryDivider from "@/components/StoryDivider";
import AIVideoSection from "@/components/ai-video/AIVideoSection";

export default function InvitationPage({ event, refetchEvent }) {
  const { role, theme, phase } = useAppMode();
  const isOwner = role === "owner";

  const bgImageMap = {
    wedding: "/wedding-bg.jpg",
    funeral: "/funeral-bg.png",
    family: "/anniversary-bg.jpg",
    anniversary: "/anniversary-bg.jpg",
  };
  const bgImage = bgImageMap[theme] || "/wedding-bg.jpg";

  const [showEditBioModal, setShowEditBioModal] = useState(false);

  const HEADLINES = {
    wedding: {
      invite: "ขอเชิญร่วมเป็นส่วนหนึ่งในวันสำคัญ",
      inviteQuote: "“ขอบคุณที่เดินทางมาร่วมสร้างความทรงจำใหม่ ๆ ไปด้วยกัน”",
      gallery: "รวมภาพแห่งความประทับใจ",
      galleryQuote: "“ทุกภาพล้วนมีเรื่องราว”",
      bless: "ส่งคำอวยพรถึงเรา",
      blessQuote: "“เพื่อน ๆ และครอบครัว คือของขวัญสำคัญที่สุด”",
    },
    funeral: {
      invite: "ขอร่วมรำลึกและระลึกถึง",
      inviteQuote: "“ด้วยความรักและความทรงจำที่ไม่เคยลบเลือน”",
      gallery: "เรื่องราวในความทรงจำ",
      galleryQuote: "“ทุกภาพ บันทึกความรักและผูกพัน”",
      bless: "ส่งกำลังใจและรำลึกถึง",
      blessQuote: "“ทุกข้อความคือแรงใจสู่ครอบครัว”",
    },
    family: {
      invite: "วันแห่งครอบครัว",
      inviteQuote: "“ความทรงจำ...สร้างชีวิตและรอยยิ้ม”",
      gallery: "ภาพแห่งชีวิตร่วมกัน",
      galleryQuote: "“ทุกช่วงเวลาคือของขวัญ”",
      bless: "ฝากคำหวังดีถึงครอบครัวเรา",
      blessQuote: "“คำอวยพรทุกคำ มีค่าตลอดไป”",
    },
  };
  const h = HEADLINES[theme] || HEADLINES.wedding;

  if (!event) return <div className="p-10 text-center">⏳ กำลังโหลดข้อมูล...</div>;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* BG */}
      <img
        src={bgImage}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        style={{ minHeight: "100vh" }}
        aria-hidden="true"
      />

      <div className="relative z-20 p-6 text-gray-800 transition-all">
        <BGMPlayer />
        <ThemeEffect />

        {/* ส่วนหัว */}
        <SectionTitle title={h.invite} theme={theme} />
        <SectionQuote>{h.inviteQuote}</SectionQuote>
        <div className="mb-4">
          <BioBox bio={event.bio} eventId={event.id} theme={theme} phase={phase} />
        </div>
        <div className="mb-8">
          <CoverSection event={event} />
        </div>
        <div className="mb-8">
          <ButtonGroupSection event={event} isOwner={isOwner} />
        </div>

        {/* Layout QR + AI Video (เฉพาะ funeral) */}
        {theme === "funeral" ? (
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/2 w-full">
              <AIVideoSection event={event} isOwner={isOwner} />
            </div>
            <div className="md:w-1/2 w-full">
              <QRCodeAndScheduleSection
                qrImageUrl={event.qr_url}
                scheduleImageUrl={event.schedule_url}
                event={event}
              />
            </div>
          </div>
        ) : (
          // theme อื่นใช้ QR เดี่ยว
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <QRCodeAndScheduleSection
                qrImageUrl={event.qr_url}
                scheduleImageUrl={event.schedule_url}
                event={event}
              />
            </div>
          </div>
        )}

        <StoryDivider />
        <SectionTitle title={h.gallery} theme={theme} />
        <SectionQuote>{h.galleryQuote}</SectionQuote>
        <div className="mb-8">
          <GalleryPreview event={event} featuredOnly />
        </div>

        <StoryDivider />
        <SectionTitle title={h.bless} theme={theme} />
        <SectionQuote>{h.blessQuote}</SectionQuote>
        <div className="flex justify-center gap-3 mb-8">
          <BlessingSocialRow event={event} />
        </div>

        {/* BioBox2/Timeline/Guestbook */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/3 w-full">
            <GuestBookSection memoryId={event.id} role={role} theme={theme} />
          </div>
          <div className="md:w-1/3 w-full flex flex-col gap-8">
            <BioBox2
              // Wedding
              bridePic={event.bridePic}
              groomPic={event.groomPic}
              brideBio={event.brideBio}
              groomBio={event.groomBio}
              eventBio={event.eventBio}
              funFact1={event.funFact1}
              funFact2={event.funFact2}
              // Funeral
              profile={event.profile}
              poster_name={event.poster_name}
              word={event.word}
              living={event.living}
              isOwner={isOwner}
              onEdit={() => setShowEditBioModal(true)}
            />
            <TimelineTree
              eventId={event.id}
              event={event}
              theme={theme}
              style={{ maxHeight: 200, minHeight: 90 }}
            />
          </div>
        </div>

        {/* Modal Edit BioBox2 */}
        <BioBox2EditModal
          open={showEditBioModal}
          onClose={() => setShowEditBioModal(false)}
          initialData={event}
          eventId={event.id}
          onSave={async () => {
            setShowEditBioModal(false);
            refetchEvent?.();
          }}
          saving={false}
        />
      </div>
    </main>
  );
}
