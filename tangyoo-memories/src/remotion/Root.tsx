// RemotionRoot.tsx

import { Composition, Sequence } from "remotion";
import { WelcomeScene } from "./scenes/WelcomeScene";
import { BioScene } from "./scenes/BioScene";
import { FunFactScene } from "./scenes/FunFactScene";
import { GalleryScene } from "./scenes/GalleryScene";
import { GuestbookScene } from "./scenes/GuestbookScene";
import { TimelineScene } from "./scenes/TimelineScene";
import { EndingScene } from "./scenes/EndingScene";
import { eventData } from "./mockEventData";

// ==== Dynamic Duration Calculation ====

// 1. Welcome (2 วินาที = 60 เฟรม)
const welcomeDuration = 60;

// 2. Bio (6 วินาที = 180 เฟรม)
const bioDuration = 180;

// 3. FunFact (1.5 วิ/ข้อ, min 60 เฟรม)
const funFacts = [eventData.funFact1, eventData.funFact2].filter(Boolean);
const funFactDuration = funFacts.length ? Math.max(60, funFacts.length * 45) : 0;

// 4. Gallery (1.6 วิ/รูป, min 96 เฟรม)
const FRAMES_PER_IMG = 90;
const galleryImages = eventData.featureImages || [];
const galleryDuration = galleryImages.length * FRAMES_PER_IMG;
// 5. Guestbook (1.3 วิ/entry, min 60 เฟรม)
const guestbookEntries = eventData.guestbooks || [];
const guestbookDuration = guestbookEntries.length ? Math.max(60, guestbookEntries.length * 40) : 0;

// 6. Timeline (1.2 วิ/milestone, min 48 เฟรม)
const timelineItems = eventData.timeline || [];
const timelineDuration = timelineItems.length ? Math.max(48, timelineItems.length * 36) : 0;

// 7. Ending (2 วิ = 60 เฟรม)
const endingDuration = 60;

// ==== Calculate Sequence Start Times ====
let start = 0;
const welcomeStart = start;           start += welcomeDuration;
const bioStart = start;               start += bioDuration;
const funFactStart = start;           start += funFactDuration;
const galleryStart = start;           start += galleryDuration;
const guestbookStart = start;         start += guestbookDuration;
const timelineStart = start;          start += timelineDuration;
const endingStart = start;            start += endingDuration;

const totalFrames = start;

// ==== Root Composition ====
export const RemotionRoot = () => (
  <Composition
    id="TangYooMemories"
    component={MemoriesVideo}
    durationInFrames={totalFrames}
    fps={30}
    width={720}
    height={1280}
    defaultProps={{ event: eventData }}
  />
);

// ==== Main Video ====
const MemoriesVideo = ({ event }) => (
  <>
    <Sequence from={welcomeStart} durationInFrames={welcomeDuration}>
      <WelcomeScene event={event} />
    </Sequence>
    <Sequence from={bioStart} durationInFrames={bioDuration}>
      <BioScene event={event} />
    </Sequence>
    {funFactDuration > 0 && (
      <Sequence from={funFactStart} durationInFrames={funFactDuration}>
        <FunFactScene event={event} />
      </Sequence>
    )}
    {galleryDuration > 0 && (
      <Sequence from={galleryStart} durationInFrames={galleryDuration}>
        <GalleryScene event={event} durationInFrames={galleryDuration} />
      </Sequence>
    )}
    {guestbookDuration > 0 && (
      <Sequence from={guestbookStart} durationInFrames={guestbookDuration}>
        <GuestbookScene event={event} durationInFrames={guestbookDuration} />
      </Sequence>
    )}
    {timelineDuration > 0 && (
      <Sequence from={timelineStart} durationInFrames={timelineDuration}>
        <TimelineScene event={event} durationInFrames={timelineDuration} />
      </Sequence>
    )}
    <Sequence from={endingStart} durationInFrames={endingDuration}>
      <EndingScene event={event} />
    </Sequence>
  </>
);
