 interface Country {
    name: string;
    code: string;
  }
  
  interface CountryCodes {
    countryCodes: Country[];
  }
  
  export const countryCodesData: CountryCodes = {
    countryCodes: [
      { name: 'United States', code: '+1' },
      { name: 'United Kingdom', code: '+44' },
      { name: 'Egypt', code: '+20' },
      { name: 'Germany', code: '+49' },
      { name: 'India', code: '+91' },
      { name: 'Australia', code: '+61' },
      { name: 'Canada', code: '+1' },
      { name: 'France', code: '+33' },
      { name: 'Italy', code: '+39' },
      { name: 'Spain', code: '+34' },
      { name: 'Netherlands', code: '+31' },
      { name: 'Brazil', code: '+55' },
      { name: 'Russia', code: '+7' },
      { name: 'South Africa', code: '+27' },
      { name: 'Japan', code: '+81' },
      { name: 'China', code: '+86' },
      { name: 'Mexico', code: '+52' },
      { name: 'Saudi Arabia', code: '+966' },
      { name: 'Turkey', code: '+90' },
      { name: 'Sweden', code: '+46' },
      { name: 'Norway', code: '+47' },
      { name: 'Finland', code: '+358' },
      { name: 'Denmark', code: '+45' },
      { name: 'Belgium', code: '+32' },
      { name: 'Austria', code: '+43' },
      { name: 'Switzerland', code: '+41' },
      { name: 'New Zealand', code: '+64' },
      { name: 'Singapore', code: '+65' },
      { name: 'Hong Kong', code: '+852' },
      { name: 'Philippines', code: '+63' },
      { name: 'Malaysia', code: '+60' },
      { name: 'Thailand', code: '+66' },
      { name: 'Vietnam', code: '+84' },
      { name: 'Pakistan', code: '+92' },
      { name: 'Bangladesh', code: '+880' },
      { name: 'Iran', code: '+98' },
      { name: 'Iraq', code: '+964' },
      { name: 'Jordan', code: '+962' },
      { name: 'Qatar', code: '+974' },
      { name: 'UAE', code: '+971' },
      { name: 'Kuwait', code: '+965' },
      { name: 'Oman', code: '+968' },
      { name: 'Lebanon', code: '+961' },
      { name: 'Bahrain', code: '+973' },
    ]
  };
  