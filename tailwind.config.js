module.exports = {
  theme: {
    extend: {
      fontFamily: {
        jeamjit: [
          'Jeamjit',
          'Marykate', // 👈 เพิ่มตรงนี้
          'SukhumvitSet',
          'Kart-Suparerk',
          'Juliette',
          'StyleScript',
          'Kaewpet',
          'Rukdeaw',
          'TimesCustom',
          'Inter',
          'sans-serif',
          'serif',
          'cursive',
        ],
        marykate: ['Marykate', 'cursive'], // 👈 เพิ่มแยกแบบนี้
        kart: ['Kart-Suparerk', 'sans-serif'],
        juliette: ['Juliette', 'cursive'],
        stylescript: ['StyleScript', 'cursive'],
        sukhumvit: ['SukhumvitSet', 'sans-serif'],
        kaewpet: ['Kaewpet', 'serif'],
        rukdeaw: ['Rukdeaw', 'cursive'],
        timescustom: ['TimesCustom', 'serif'],
        // ... เพิ่มฟอนต์อื่นได้เลย
      },
    },
  },
  // ...other Tailwind config...
};
