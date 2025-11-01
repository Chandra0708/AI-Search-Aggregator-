import React from 'react';

export const AppLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M10.75 4.75C10.75 4.33579 11.0858 4 11.5 4H12.5C12.9142 4 13.25 4.33579 13.25 4.75V8.51747C15.2237 9.04359 16.75 10.7073 16.75 12.75C16.75 15.0652 14.8152 16.9999 12.5 17L12.5 19.25C12.5 19.6642 12.1642 20 11.75 20H10.75C10.3358 20 10 19.6642 10 19.25V17C7.18482 16.9999 5.25 15.0652 5.25 12.75C5.25 10.7073 6.77631 9.04359 8.75 8.51747V4.75Z" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.75 12.75H16.75" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const GeminiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.75L13.8125 10.1875L21.25 12L13.8125 13.8125L12 21.25L10.1875 13.8125L2.75 12L10.1875 10.1875L12 2.75Z" fill="url(#gemini-logo-gradient-official)"/>
      <path d="M12 8.75L13.0625 10.9375L15.25 12L13.0625 13.0625L12 15.25L10.9375 13.0625L8.75 12L10.9375 10.9375L12 8.75Z" fill="url(#gemini-logo-gradient-official)"/>
      <defs>
        <linearGradient id="gemini-logo-gradient-official" x1="2.75" y1="2.75" x2="21.25" y2="21.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E85EF"/>
          <stop offset="1" stopColor="#4B80E5"/>
        </linearGradient>
      </defs>
    </svg>
);

export const ChatGptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.2084 17.0342C35.2084 16.3292 34.6417 15.7625 33.9367 15.7625C33.2317 15.7625 32.665 16.3292 32.665 17.0342V20.5C32.665 26.6875 27.6875 31.665 21.55 31.665C20.4675 31.665 19.4267 31.5025 18.4525 31.2167C18.2392 31.15 18.005 31.255 17.8642 31.4525L15.4209 34.8167C15.2467 35.0608 15.3417 35.3983 15.6067 35.5458C17.4725 36.685 19.6425 37.3333 22 37.3333C29.4583 37.3333 35.75 31.0417 35.75 23.5833V17.0342" fill="#19C37D"/>
        <path d="M5.79167 23.9658C5.79167 24.6708 6.35833 25.2375 7.06333 25.2375C7.76833 25.2375 8.335 24.6708 8.335 23.9658V20.5C8.335 14.3125 13.3125 9.335 19.45 9.335C20.5325 9.335 21.5733 9.4975 22.5475 9.78333C22.7608 9.85 22.995 9.745 23.1358 9.5475L25.5792 6.18333C25.7533 5.93917 25.6583 5.60167 25.3933 5.45417C23.5275 4.315 21.3575 3.66667 19 3.66667C11.5417 3.66667 5.25 9.95833 5.25 17.4167V23.9658" fill="#19C37D"/>
        <path d="M20.5 0C9.175 0 0 9.175 0 20.5C0 31.825 9.175 41 20.5 41C31.825 41 41 31.825 41 20.5C41 9.175 31.825 0 20.5 0ZM22 37.3333C19.6425 37.3333 17.4725 36.685 15.6067 35.5458C15.3417 35.3983 15.2467 35.0608 15.4209 34.8167L17.8642 31.4525C18.005 31.255 18.2392 31.15 18.4525 31.2167C19.4267 31.5025 20.4675 31.665 21.55 31.665C27.6875 31.665 32.665 26.6875 32.665 20.5V17.0342C32.665 16.3292 33.2317 15.7625 33.9367 15.7625C34.6417 15.7625 35.2084 16.3292 35.2084 17.0342V23.5833C35.75 31.0417 29.4583 37.3333 22 37.3333Z" fill="#19C37D"/>
    </svg>
);

export const PerplexityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20C16.4184 20 20 16.4184 20 12C20 7.58158 16.4184 4 12 4C7.58158 4 4 7.58158 4 12V20H12Z" fill="white"/>
    </svg>
);

export const DeepseekIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 832L256 688V400L512 544V832Z" fill="#00BFFF"/>
        <path d="M512 544L768 400V688L512 832V544Z" fill="#0080FF"/>
        <path d="M256 400L512 256L768 400L512 544L256 400Z" fill="#00FFFF"/>
    </svg>
);

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
);

export const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 3.585a2 2 0 013.674 0l1.323 4.062a1 1 0 00.95.69h4.283a2 2 0 011.536 3.235l-3.465 2.518a1 1 0 00-.364 1.118l1.323 4.062a2 2 0 01-3.072 2.235L12 18.896l-3.465 2.518a2 2 0 01-3.072-2.235l1.323-4.062a1 1 0 00-.364-1.118L2.957 11.572a2 2 0 011.536-3.235h4.283a1 1 0 00.95-.69L9.663 3.585z" />
    </svg>
);

export const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 019 10.5z" />
    </svg>
);

export const PaperclipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" />
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
