const BASE_URI = import.meta.env.VITE_BASE_URI;
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "accessToken";
const ACCESS_TOKEN_EXP = 24 * 60 * 60; //  1 day
const REFRESH_TOKEN_EXP = 30 * 86400; // 30 days
const SITE_SHORT_NAME = "EB";
const SITE_NAME = "Eventblend";
const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const REDIRECT_STATUS_CODE = 302;

const GEOAPIFY_API_KEY = "GEOAPIFY_API_KEY";

enum Source {
  Events = "EVENTS",
  Groups = "GROUPS",
}

const SOURCE_TABS = [
  {
    name: "Events",
    slug: Source.Events,
  },
  {
    name: "Groups",
    slug: Source.Groups,
  },
];

// SHARE
const FACEBOOK_SHARE_URI = "https://www.facebook.com/sharer/sharer.php?u=";
const LINKEDIN_SHARE_URI =
  "https://www.linkedin.com/sharing/share-offsite/?url=";
const X_SHARE_URI = "https://x.com/intent/tweet?url=";
const MAIL_SHARE_URI = "mailto:?subject=Check this out&body=";

export {
  ACCESS_TOKEN_EXP,
  BASE_URI,
  REFRESH_TOKEN_EXP,
  SITE_NAME,
  DEFAULT_POSTER,
  SITE_SHORT_NAME,
  REDIRECT_STATUS_CODE,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  GEOAPIFY_API_KEY,
  SOURCE_TABS,
  Source,
  FACEBOOK_SHARE_URI,
  X_SHARE_URI,
  LINKEDIN_SHARE_URI,
  MAIL_SHARE_URI,
};
