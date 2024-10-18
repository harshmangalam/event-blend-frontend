import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { QwikIntrinsicElements } from "@builder.io/qwik";
import {
  FACEBOOK_SHARE_URI,
  LINKEDIN_SHARE_URI,
  MAIL_SHARE_URI,
  X_SHARE_URI,
} from "~/lib/constatnts";

import FacebookIcon from "~/assets/social-icons/facebook.svg?jsx";
import EmailIcon from "~/assets/social-icons/email.svg?jsx";
import LinkedInIcon from "~/assets/social-icons/linkedin.svg?jsx";
import TwitterIcon from "~/assets/social-icons/x.svg?jsx";
export const ShareOptions = component$<QwikIntrinsicElements["div"]>(
  (props) => {
    const location = useLocation();

    const encodedCurrentUrl = encodeURIComponent(location.url.toString());

    const facebookShareUrl = FACEBOOK_SHARE_URI + encodedCurrentUrl;
    const linkedinShareUrl = LINKEDIN_SHARE_URI + encodedCurrentUrl;
    const xShareUrl = X_SHARE_URI + encodedCurrentUrl;
    const emailShareUrl = MAIL_SHARE_URI + encodedCurrentUrl;

    const combinedClass = `flex ${props.class || ""}`;

    return (
      <div {...props} class={combinedClass}>
        <strong>Share: </strong>
        <div class="ml-2 flex gap-3">
          <a href={facebookShareUrl} target="_blank">
            <FacebookIcon class="h-6 w-6" />
          </a>

          <a href={linkedinShareUrl} target="_blank">
            <LinkedInIcon class="h-6 w-6" />
          </a>

          <a href={xShareUrl} target="_blank">
            <TwitterIcon class="h-6 w-6" />
          </a>

          <a href={emailShareUrl} target="_blank">
            <EmailIcon class="h-6 w-6" />
          </a>
        </div>
      </div>
    );
  },
);
