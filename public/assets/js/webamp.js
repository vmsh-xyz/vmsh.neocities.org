import Webamp from "https://unpkg.com/webamp@^2";

// Check if Winamp is supported in this browser
if (!Webamp.browserIsSupported()) {
    alert("Oh no! Webamp does not work!");
    throw new Error("What's the point of anything?");
}

let webamp = null;

function openWebamp() {

    if (webamp) {
        webamp.reopen();
        return;
    }

    webamp = new Webamp({
        enableHotkeys: true,
        windowLayout: {
            main: {
                position: { top: 0, left: 0 },
                shadeMode: false,
                closed: false,
            },
            playlist: {
                position: { top: 116, left: 0 },
                shadeMode: false,
                closed: false,
            },
        },
        // Optional. An array of objects representing skins.
        // These will appear in the "Options" menu under "Skins".
        // NOTE: These URLs must be served with the correct CORs headers.
        // https://docs.webamp.org/docs/guides/cors
        //
        // These will appear in the dropdown menu under "Skins".
        availableSkins: [
            {
                url: "https://vmsh.xyz/assets/webampskins/BritneyAMP.wsz",
                name: "BritneyAMP",
            },
            {
                url: "https://archive.org/cors/winampskin_Zelda_Amp/Zelda-Amp.wsz",
                name: "Zelda Amp",
            },
            {
                url: "https://archive.org/cors/winampskin_Green-Dimension-V2/Green-Dimension-V2.wsz",
                name: "Green Dimension V2",
            },
            {
                url: "https://archive.org/cors/winampskin_mac_os_x_1_5-aqua/mac_os_x_1_5-aqua.wsz",
                name: "Mac OSX v1.5 (Aqua)",
            },
        ],
        initialSkin: {
            url: "https://archive.org/cors/winampskins_BritneyAMP/BritneyAMP.wsz",
        },
        initialTracks: [
            {
                metaData: {
                    artist: "DJ Mike Llama",
                    title: "Llama Whippin' Intro",
                },
                // NOTE: Your audio file must be served from the same domain as your HTML
                // file, or served with permissive CORS HTTP headers:
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                url: "https://cdn.jsdelivr.net/gh/captbaritone/webamp@43434d82cfe0e37286dbbe0666072dc3190a83bc/mp3/llama-2.91.mp3",
                duration: 5.322286,
            },
        ],
    });

    // Returns a promise indicating when it's done loading.
    webamp.renderInto(document.getElementById("webamp"));
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('open-webamp-btn');
    if (btn) {
        btn.addEventListener('click', openWebamp);
    }
});