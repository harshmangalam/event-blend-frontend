import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export const ShareOptions = component$<QwikIntrinsicElements['div']>((props) => {

    const { url } = useLocation();

    const encodedCurrentUrl = encodeURIComponent(url.toString());

    const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodedCurrentUrl;
    const linkedinShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedCurrentUrl;
    const xShareUrl = "https://x.com/intent/tweet?url=" + encodedCurrentUrl;
    const emailShareUrl = "mailto:?subject=Check this out&body=" + encodedCurrentUrl;


    const combinedClass = `flex ${props.class || ''}`

    return (
    <div {...props} class={combinedClass}>
        <strong>Share: </strong>
        <div class="gap-3 flex ml-2">

        
            <a href={facebookShareUrl} target="_blank"> 
                <img src="/facebook.svg" class="w-6"/>
            </a>

            <a href={linkedinShareUrl} target="_blank"> 
            <img src="/linkedin.svg" class="w-6"/>
            </a>    

            <a href={xShareUrl} target="_blank"> 
            <img src="/x.svg" class="w-6"/>
            </a>

            <a href={emailShareUrl} target="_blank"> 
            <img src="/email.svg" class="w-6"/>
            </a>
        </div>
        
    </div>

    );
}
)