"use client";
import { useState } from "react";
import { useAppMode } from "@/context/AppModeContext";
import SocialMediaButton from "@/components/SocialMediaButton";
import SoulfulBlessing from "@/components/SoulfulBlessing";
import GiftModal from "@/components/GiftModal";

export default function BlessingSocialRow({ event, socialProps = {} }) {
  const { theme } = useAppMode();
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 my-4">

      {/* ส่งหัวใจยินดี — DB counter + big burst */}
      <SoulfulBlessing theme={theme} eventId={event?.id} />

      {/* ส่งของขวัญ — opens GiftModal */}
      {event?.id && (
        <button
          onClick={() => setGiftModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-orange-600 transition-all group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">🎁</span>
          <span>ส่งของขวัญ</span>
        </button>
      )}

      {/* Social links */}
      <div className="flex gap-4 mt-2">
        <SocialMediaButton {...socialProps} />
      </div>

      {/* Gift Modal */}
      <GiftModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        event={event}
        theme={theme}
      />
    </div>
  );
}
