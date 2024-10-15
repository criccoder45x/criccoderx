if (confirm("Join Our Telegram Channel @criccoder")) { 
    window.location.href = "https://telegram.me/criccoder"; 
}

async function init() { 
    let e = document.getElementById("video"), 
        r = e.ui, 
        n = r.getControls(), 
        o = n.getPlayer(); 

    o.configure({ 
        drm: { 
            clearKeys: { 
                "00053ac1e9b1231eed3eb4e3540b3ae1": "0f03d8541826af3d9acbac975d751165" 
            } 
        } 
    }), 

    r.configure({ 
        controlPanelElements: ["play_pause", "mute", "volume", "spacer", "time_and_duration", "quality", "fullscreen", "overflow_menu"], 
        'volumeBarColors': { 
            base: 'rgba(63, 187, 1, 1)', 
            level: 'rgb(255, 69, 0)', 
        }, 
        'seekBarColors': { 
            base: 'rgb(41, 41, 163)', 
            buffered: 'rgb(35, 99, 3)', 
            played: 'rgba(63, 187, 1, 1)', 
        } 
    }), 

    window.player = o, 
    window.ui = r, 

    o.addEventListener("error", onPlayerErrorEvent), 
    n.addEventListener("error", onUIErrorEvent); 

    try { 
        await o.load("https://sxanetwork.acecbse45.workers.dev/proxy?https://linear007-gb-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportscricket)/manifest_720-120.mpd"); 
        console.log("The video has now been loaded!"); 
    } catch (a) { 
        onPlayerError(a); 
    } 
} 

function onPlayerErrorEvent(e) { 
    onPlayerError(event.detail); 
} 

function onPlayerError(e) { 
    console.error("Error code", e.code, "object", e); 
} 

function onUIErrorEvent(e) { 
    onPlayerError(event.detail); 
} 

function initFailed(e) { 
    console.error("Unable to load the UI library!"); 
} 

document.addEventListener("shaka-ui-loaded", init), 
document.addEventListener("shaka-ui-load-failed", initFailed);
