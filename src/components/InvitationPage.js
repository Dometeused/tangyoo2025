"use client";
import { useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
// import AIVideoSection from "@/components/ai-video/AIVideoSection"; // POST-MVP
// import AIGuideBubble from "@/components/ai-butler/AIGuideBubble"; // POST-MVP
import CandleScrollTrail from "@/components/CandleScrollTrail";
import PetalScrollTrail from "@/components/PetalScrollTrail";
import SparkleScrollTrail from "@/components/SparkleScrollTrail";
import IntroOverlay from "@/components/IntroOverlay";

export default function InvitationPage({ event, refetchEvent }) {
  const { role, theme, phase } = useAppMode();
  const isOwner = role === "owner" || role === "admin";

  const supabase = createClientComponentClient();
  const [showEditBioModal, setShowEditBioModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const bgmRef = useRef(null);

  // บันทึก custom wording ลง Supabase
  const saveWording = async (field, value) => {
    await supabase.from("events").update({ [field]: value }).eq("id", event.id);
  };

  // Toggle สมุดอวยพร
  const [showGuestbook, setShowGuestbook] = useState(event.show_guestbook !== false);
  const toggleGuestbook = async () => {
    const next = !showGuestbook;
    setShowGuestbook(next);
    await supabase.from("events").update({ show_guestbook: next }).eq("id", event.id);
  };

  const bgImageMap = {
    wedding: "/wedding-bg.jpg",
    funeral: "/funeral-bg.png",
    anniversary: "/images/anniversary.png",
    baby: "/images/welcome.png",
  };
  // ถ้า event มี cover_url ให้ใช้เป็น BG แทน default ของ theme
  // bg_url (แยกต่างหาก) → cover_url (ถ้าไม่มี bg) → default theme
  const bgImage = event.bg_url || event.cover_url || bgImageMap[theme] || "/wedding-bg.jpg";

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
    anniversary: {
      invite: 'ฉลองวันครบรอบแห่งรัก',
      inviteQuote: '”ทุกปีที่ผ่านมา คือของขวัญที่ล้ำค่า”',
      gallery: 'ภาพแห่งชีวิตร่วมกัน',
      galleryQuote: '”ทุกช่วงเวลาคือของขวัญ”',
      bless: 'ร่วมอวยพรวันครบรอบ',
      blessQuote: '”ทุกคำอวยพรคือแรงใจสำหรับปีต่อ ๆ ไป”',
    },
    baby: {
      invite: 'ต้อนรับสมาชิกใหม่',
      inviteQuote: '”ความสุขเล็กๆ ที่ยิ่งใหญ่ที่สุดในโลก”',
      gallery: 'ภาพแรกของหนูน้อย',
      galleryQuote: '”ทุกรอยยิ้มคือความทรงจำ”',
      bless: 'ส่งคำอวยพรให้หนูน้อย',
      blessQuote: '”รักและพรจากทุกคน”',
    },
  };
  const h = HEADLINES[theme] || HEADLINES.wedding;

  if (!event) return <div className="p-10 text-center">⏳ กำลังโหลดข้อมูล...</div>;

  return (
    <main className="relative min-h-screen overflow-hidden" style={{
      background: theme === "funeral"     ? "#f7f3ef"
               : theme === "anniversary" ? "#1c1000"
               : "#fdf6f0"
    }}>
      {showIntro && (
        <IntroOverlay
          theme={theme}
          onComplete={() => { setShowIntro(false); bgmRef.current?.play(); }}
        />
      )}
      {/* BG Image */}
      <div
        className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          theme === 'funeral'     ? 'opacity-55'
          : theme === 'anniversary' ? 'opacity-35'
          : 'opacity-80'
        }`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: theme === 'funeral'     ? 'sepia(0.4) brightness(0.75)'
                : theme === 'anniversary' ? 'sepia(0.15) brightness(0.55) saturate(1.2)'
                : 'none',
        }}
      />
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: theme === 'funeral'     ? 'rgba(15,8,3,0.45)'
                    : theme === 'anniversary' ? 'rgba(18,10,0,0.50)'
                    : 'rgba(253,246,240,0.45)'
        }}
      />
      {/* Anniversary: soft gold glow from top */}
      {theme === 'anniversary' && (
        <div className="fixed inset-0 z-[2] pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,32,0.10) 0%, transparent 70%)",
        }} />
      )}

      <div className={`relative z-20 pt-24 px-6 pb-32 transition-all max-w-3xl mx-auto ${
        theme === 'anniversary' ? 'text-amber-50' : 'text-gray-800'
      }`}>
        <BGMPlayer
          ref={bgmRef}
          src={`/audio/${theme || "wedding"}.mp3`}
          youtubeUrl={event.youtube_link}
          isOwner={isOwner}
          eventId={event.id}
        />
        <ThemeEffect />
        <CandleScrollTrail theme={theme} />
        <PetalScrollTrail theme={theme} />
        <SparkleScrollTrail theme={theme} />

        {/* ส่วนหัว */}
        <SectionTitle
          title={event.headline_invite || h.invite}
          theme={theme}
          editable={isOwner}
          onSave={v => saveWording("headline_invite", v)}
        />
        <SectionQuote
          theme={theme}
          editable={isOwner}
          onSave={v => saveWording("quote_invite", v)}
        >
          {event.quote_invite || h.inviteQuote}
        </SectionQuote>
        <div className="mb-4">
          <BioBox bio={event.bio} eventId={event.id} theme={theme} phase={phase} />
        </div>
        <div className="mb-8">
          <CoverSection event={event} refetchEvent={refetchEvent} />
        </div>
        <div className="mb-8">
          <ButtonGroupSection event={event} isOwner={isOwner} />
        </div>

        {/* QR + กำหนดการ + Dresscode — ซ่อนสำหรับ anniversary (ไม่เกี่ยวข้อง) */}
        {theme !== "anniversary" && (
          <div className="mb-8">
            <QRCodeAndScheduleSection
              qrImageUrl={event.qr_url}
              scheduleImageUrl={event.schedule_url}
              event={event}
            />
          </div>
        )}

        <StoryDivider theme={theme} />
        <SectionTitle title={h.gallery} theme={theme} />
        <SectionQuote theme={theme}>{h.galleryQuote}</SectionQuote>
        <div className="mb-8">
          <GalleryPreview event={event} featuredOnly />
        </div>

        <StoryDivider theme={theme} />
        <SectionTitle
          title={event.headline_bless || h.bless}
          theme={theme}
          editable={isOwner}
          onSave={v => saveWording("headline_bless", v)}
        />
        <SectionQuote
          theme={theme}
          editable={isOwner}
          onSave={v => saveWording("quote_bless", v)}
        >
          {event.quote_bless || h.blessQuote}
        </SectionQuote>
        <div className="flex justify-center gap-3 mb-8">
          <BlessingSocialRow event={event} socialProps={{
            line: event.line,
            facebook: event.facebook,
            instagram: event.instagram,
            phone: event.phone,
            isOwner: isOwner,
            eventId: event.id,
            onEdit: () => { }
          }} />
        </div>

        {/* BioBox2/Timeline/Guestbook */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          {/* Left Column: Story + Guestbook */}
          <div className="md:w-1/2 w-full flex flex-col gap-16 overflow-x-hidden">
            {/* GuestBook — toggle inline สำหรับ owner */}
            {showGuestbook ? (
              <div className="relative">
                {isOwner && (
                  <button
                    onClick={toggleGuestbook}
                    className="absolute top-2 right-2 z-20 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/70 backdrop-blur border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                  >
                    ✕ ซ่อนสมุดอวยพร
                  </button>
                )}
                <GuestBookSection memoryId={event.id} role={role} theme={theme} />
              </div>
            ) : isOwner ? (
              <button
                onClick={toggleGuestbook}
                className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center gap-2 text-gray-400 hover:border-pink-300 hover:text-pink-400 hover:bg-pink-50/30 transition-all"
              >
                <span className="text-2xl">✍️</span>
                <span className="text-sm font-medium">สมุดอวยพร (ซ่อนอยู่)</span>
                <span className="text-xs">กดเพื่อเปิดให้แขกเขียนอวยพร</span>
              </button>
            ) : null}
            <TimelineTree
              eventId={event.id}
              event={event}
              theme={theme}
              style={{ maxHeight: 200, minHeight: 90 }}
            />
          </div>

          {/* Right Column: Sticky Poster */}
          <div className="md:w-1/2 w-full sticky top-24 self-start z-10">
            <BioBox2
              // Wedding
              bridePic={event.bridePic}
              groomPic={event.groomPic}
              brideBio={event.brideBio}
              groomBio={event.groomBio}
              eventBio={event.bio2 || event.eventBio}
              funFact1={event.funFact1}
              funFact2={event.funFact2}
              // Funeral
              profile={event.profile}
              poster_name={event.poster_name}
              poster_caption={event.poster_caption}
              word={event.word}
              living={event.living}
              isOwner={isOwner}
              onEdit={() => setShowEditBioModal(true)}
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

      {/* AI Museum Guide Bubble — POST-MVP */}
      {/* <AIGuideBubble event={event} /> */}
    </main>
  );
}
