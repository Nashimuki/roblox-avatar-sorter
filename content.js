/*

Current things to note:

Colors are only matched to the closest avialable skin color provided by Roblox (color ID).
Outfits that have missing items stall for an extra amount of time and will ignored when changing order! Please update these outfits before usage.

*/

function main() {

/// Important ///
if (window.location.pathname !== "/my/avatar") return;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// User ID
async function getUserId() {
    const res = await fetch("https://users.roblox.com/v1/users/authenticated", {
        credentials: "include"
    });

    const data = await res.json();
    return data.id;
}

let userID = null;

// Token
let csrfToken = null;
async function getToken() {
    const res = await fetch("https://auth.roblox.com/v2/logout", {
        method: "POST",
        credentials: "include"
    });
    csrfToken = res.headers.get("x-csrf-token");
}

/// Body Colors ///

const BODY_COLOR_PALETTE = [
    {
        "brickColorId":361,
        "hexColor":"#564236",
        "name":"Dirt brown"
    },
    {
        "brickColorId":192,
        "hexColor":"#694028",
        "name":"Reddish brown"
    },
    {
        "brickColorId":217,
        "hexColor":"#7C5C46",
        "name":"Brown"
    },
    {
        "brickColorId":153,
        "hexColor":"#957977",
        "name":"Sand red"
    },
    {
        "brickColorId":359,
        "hexColor":"#AF9483",
        "name":"Linen"
    },
    {
        "brickColorId":352,
        "hexColor":"#C7AC78",
        "name":"Burlap"
    },
    {
        "brickColorId":5,
        "hexColor":"#D7C59A",
        "name":"Brick yellow"
    },
    {
        "brickColorId":101,
        "hexColor":"#DA867A",
        "name":"Medium red"
    },
    {
        "brickColorId":1007,
        "hexColor":"#A34B4B",
        "name":"Dusty Rose"
    },
    {
        "brickColorId":1014,
        "hexColor":"#AA5500",
        "name":"CGA brown"
    },
    {
        "brickColorId":38,
        "hexColor":"#A05F35",
        "name":"Dark orange"
    },
    {
        "brickColorId":18,
        "hexColor":"#CC8E69",
        "name":"Nougat"
    },
    {
        "brickColorId":125,
        "hexColor":"#EAB892",
        "name":"Light orange"
    },
    {
        "brickColorId":1030,
        "hexColor":"#FFCC99",
        "name":"Pastel brown"
    },
    {
        "brickColorId":133,
        "hexColor":"#D5733D",
        "name":"Neon orange"
    },
    {
        "brickColorId":106,
        "hexColor":"#DA8541",
        "name":"Bright orange"
    },
    {
        "brickColorId":105,
        "hexColor":"#E29B40",
        "name":"Br. yellowish orange"
    },
    {
        "brickColorId":1017,
        "hexColor":"#FFAF00",
        "name":"Deep orange"
    },
    {
        "brickColorId":24,
        "hexColor":"#F5CD30",
        "name":"Bright yellow"
    },
    {
        "brickColorId":334,
        "hexColor":"#F8D96D",
        "name":"Daisy orange"
    },
    {
        "brickColorId":226,
        "hexColor":"#FDEA8D",
        "name":"Cool yellow"
    },
    {
        "brickColorId":141,
        "hexColor":"#27462D",
        "name":"Earth green"
    },
    {
        "brickColorId":1021,
        "hexColor":"#3A7D15",
        "name":"Camo"
    },
    {
        "brickColorId":28,
        "hexColor":"#287F47",
        "name":"Dark green"
    },
    {
        "brickColorId":37,
        "hexColor":"#4B974B",
        "name":"Bright green"
    },
    {
        "brickColorId":310,
        "hexColor":"#5B9A4C",
        "name":"Shamrock"
    },
    {
        "brickColorId":317,
        "hexColor":"#7C9C6B",
        "name":"Moss"
    },
    {
        "brickColorId":119,
        "hexColor":"#A4BD47",
        "name":"Br. yellowish green"
    },
    {
        "brickColorId":1011,
        "hexColor":"#002060",
        "name":"Navy blue"
    },
    {
        "brickColorId":1012,
        "hexColor":"#2154B9",
        "name":"Deep blue"
    },
    {
        "brickColorId":1010,
        "hexColor":"#0000FF",
        "name":"Really blue"
    },
    {
        "brickColorId":23,
        "hexColor":"#0D69AC",
        "name":"Bright blue"
    },
    {
        "brickColorId":305,
        "hexColor":"#527CAE",
        "name":"Steel blue"
    },
    {
        "brickColorId":102,
        "hexColor":"#6E99CA",
        "name":"Medium blue"
    },
    {
        "brickColorId":45,
        "hexColor":"#B4D2E4",
        "name":"Light blue"
    },
    {
        "brickColorId":107,
        "hexColor":"#008F9C",
        "name":"Bright bluish green"
    },
    {
        "brickColorId":1018,
        "hexColor":"#12EED4",
        "name":"Teal"
    },
    {
        "brickColorId":1027,
        "hexColor":"#9FF3E9",
        "name":"Pastel blue-green"
    },
    {
        "brickColorId":1019,
        "hexColor":"#00FFFF",
        "name":"Toothpaste"
    },
    {
        "brickColorId":1013,
        "hexColor":"#04AFEC",
        "name":"Cyan"
    },
    {
        "brickColorId":11,
        "hexColor":"#80BBDC",
        "name":"Pastel Blue"
    },
    {
        "brickColorId":1024,
        "hexColor":"#AFDDFF",
        "name":"Pastel light blue"
    },
    {
        "brickColorId":104,
        "hexColor":"#6B327C",
        "name":"Bright violet"
    },
    {
        "brickColorId":1023,
        "hexColor":"#8C5B9F",
        "name":"Lavender"
    },
    {
        "brickColorId":321,
        "hexColor":"#A75E9B",
        "name":"Lilac"
    },
    {
        "brickColorId":1015,
        "hexColor":"#AA00AA",
        "name":"Magenta"
    },
    {
        "brickColorId":1031,
        "hexColor":"#6225D1",
        "name":"Royal purple"
    },
    {
        "brickColorId":1006,
        "hexColor":"#B480FF",
        "name":"Alder"
    },
    {
        "brickColorId":1026,
        "hexColor":"#B1A7FF",
        "name":"Pastel violet"
    },
    {
        "brickColorId":21,
        "hexColor":"#C4281C",
        "name":"Bright red"
    },
    {
        "brickColorId":1004,
        "hexColor":"#FF0000",
        "name":"Really red"
    },
    {
        "brickColorId":1032,
        "hexColor":"#FF00BF",
        "name":"Hot pink"
    },
    {
        "brickColorId":1016,
        "hexColor":"#FF66CC",
        "name":"Pink"
    },
    {
        "brickColorId":330,
        "hexColor":"#FF98DC",
        "name":"Carnation pink"
    },
    {
        "brickColorId":9,
        "hexColor":"#E8BAC8",
        "name":"Light reddish violet"
    },
    {
        "brickColorId":1025,
        "hexColor":"#FFC9C9",
        "name":"Pastel orange"
    },
    {
        "brickColorId":364,
        "hexColor":"#5A4C42",
        "name":"Dark taupe"
    },
    {
        "brickColorId":351,
        "hexColor":"#BC9B5D",
        "name":"Cork"
    },
    {
        "brickColorId":1008,
        "hexColor":"#C1BE42",
        "name":"Olive"
    },
    {
        "brickColorId":29,
        "hexColor":"#A1C48C",
        "name":"Medium green"
    },
    {
        "brickColorId":1022,
        "hexColor":"#7F8E64",
        "name":"Grime"
    },
    {
        "brickColorId":151,
        "hexColor":"#789082",
        "name":"Sand green"
    },
    {
        "brickColorId":135,
        "hexColor":"#74869D",
        "name":"Sand blue"
    },
    {
        "brickColorId":1020,
        "hexColor":"#00FF00",
        "name":"Lime green"
    },
    {
        "brickColorId":1028,
        "hexColor":"#CCFFCC",
        "name":"Pastel green"
    },
    {
        "brickColorId":1009,
        "hexColor":"#FFFF00",
        "name":"New Yeller"
    },
    {
        "brickColorId":1029,
        "hexColor":"#FFFFCC",
        "name":"Pastel yellow"
    },
    {
        "brickColorId":1003,
        "hexColor":"#111111",
        "name":"Really black"
    },
    {
        "brickColorId":26,
        "hexColor":"#1B2A35",
        "name":"Black"
    },
    {
        "brickColorId":199,
        "hexColor":"#635F62",
        "name":"Dark stone grey"
    },
    {
        "brickColorId":194,
        "hexColor":"#A3A2A5",
        "name":"Medium stone grey"
    },
    {
        "brickColorId":1002,
        "hexColor":"#CDCDCD",
        "name":"Mid gray"
    },
    {
        "brickColorId":208,
        "hexColor":"#E5E4DF",
        "name":"Light stone grey"
    },
    {
        "brickColorId":1,
        "hexColor":"#F2F3F3",
        "name":"White"
    },
    {
        "brickColorId":1001,
        "hexColor":"#F8F8F8",
        "name":"Institutional white"
    },
    
    {
        "brickColorId":364,
        "hexColor":"#5A4C42",
        "name":"Dark taupe"
    },
    {
        "brickColorId":217,
        "hexColor":"#7C5C46",
        "name":"Brown"
    },
    {
        "brickColorId":359,
        "hexColor":"#AF9483",
        "name":"Linen"
    },
    {
        "brickColorId":18,
        "hexColor":"#CC8E69",
        "name":"Nougat"
    },
    {
        "brickColorId":125,
        "hexColor":"#EAB892",
        "name":"Light orange"
    },
    {
        "brickColorId":361,
        "hexColor":"#564236",
        "name":"Dirt brown"
    },
    {
        "brickColorId":192,
        "hexColor":"#694028",
        "name":"Reddish brown"
    },
    {
        "brickColorId":351,
        "hexColor":"#BC9B5D",
        "name":"Cork"
    },
    {
        "brickColorId":352,
        "hexColor":"#C7AC78",
        "name":"Burlap"
    },
    {
        "brickColorId":5,
        "hexColor":"#D7C59A",
        "name":"Brick yellow"
    },
    {
        "brickColorId":153,
        "hexColor":"#957977",
        "name":"Sand red"
    },
    {
        "brickColorId":1007,
        "hexColor":"#A34B4B",
        "name":"Dusty Rose"
    },
    {
        "brickColorId":101,
        "hexColor":"#DA867A",
        "name":"Medium red"
    },
    {
        "brickColorId":1025,
        "hexColor":"#FFC9C9",
        "name":"Pastel orange"
    },
    {
        "brickColorId":330,
        "hexColor":"#FF98DC",
        "name":"Carnation pink"
    },
    {
        "brickColorId":135,
        "hexColor":"#74869D",
        "name":"Sand blue"
    },
    {
        "brickColorId":305,
        "hexColor":"#527CAE",
        "name":"Steel blue"
    },
    {
        "brickColorId":11,
        "hexColor":"#80BBDC",
        "name":"Pastel Blue"
    },
    {
        "brickColorId":1026,
        "hexColor":"#B1A7FF",
        "name":"Pastel violet"
    },
    {
        "brickColorId":321,
        "hexColor":"#A75E9B",
        "name":"Lilac"
    },
    {
        "brickColorId":107,
        "hexColor":"#008F9C",
        "name":"Bright bluish green"
    },
    {
        "brickColorId":310,
        "hexColor":"#5B9A4C",
        "name":"Shamrock"
    },
    {
        "brickColorId":317,
        "hexColor":"#7C9C6B",
        "name":"Moss"
    },
    {
        "brickColorId":29,
        "hexColor":"#A1C48C",
        "name":"Medium green"
    },
    {
        "brickColorId":105,
        "hexColor":"#E29B40",
        "name":"Br. yellowish orange"
    },
    {
        "brickColorId":24,
        "hexColor":"#F5CD30",
        "name":"Bright yellow"
    },
    {
        "brickColorId":334,
        "hexColor":"#F8D96D",
        "name":"Daisy orange"
    },
    {
        "brickColorId":199,
        "hexColor":"#635F62",
        "name":"Dark stone grey"
    },
    {
        "brickColorId":1002,
        "hexColor":"#CDCDCD",
        "name":"Mid gray"
    },
    {
        "brickColorId":1001,
        "hexColor":"#F8F8F8",
        "name":"Institutional white"
    },
]

const ID_TO_HEX = {}
const HEX_TO_ID = {}

for (const color of BODY_COLOR_PALETTE) {

    const hex = color.hexColor.replace("#","").toUpperCase()

    ID_TO_HEX[color.brickColorId] = hex
    HEX_TO_ID[hex] = color.brickColorId

}

function colorIdToHex(colorID) {
    return ID_TO_HEX[colorID] ?? null
}

function hexToColorId(hex) {
    hex = hex.replace("#","").toUpperCase()
    return HEX_TO_ID[hex] ?? null
}

function normalizeBodyColors(details){

    if (details.bodyColors && !details.bodyColor3s){

        details.bodyColor3s = {
            headColor3: colorIdToHex(details.bodyColors.headColorId),
            torsoColor3: colorIdToHex(details.bodyColors.torsoColorId),
            rightArmColor3: colorIdToHex(details.bodyColors.rightArmColorId),
            leftArmColor3: colorIdToHex(details.bodyColors.leftArmColorId),
            rightLegColor3: colorIdToHex(details.bodyColors.rightLegColorId),
            leftLegColor3: colorIdToHex(details.bodyColors.leftLegColorId)
        }

    }

    if (details.bodyColor3s && !details.bodyColors){

        details.bodyColors = {
            headColorId: hexToColorId(details.bodyColor3s.headColor3),
            torsoColorId: hexToColorId(details.bodyColor3s.torsoColor3),
            rightArmColorId: hexToColorId(details.bodyColor3s.rightArmColor3),
            leftArmColorId: hexToColorId(details.bodyColor3s.leftArmColor3),
            rightLegColorId: hexToColorId(details.bodyColor3s.rightLegColor3),
            leftLegColorId: hexToColorId(details.bodyColor3s.leftLegColor3)
        }

    }

}

/// Logic ///

async function outfitDelete(outfitId) {

    if (!csrfToken) {
        await getToken();
    }

    const res = await fetch(
        `https://avatar.roblox.com/v1/outfits/${outfitId}/delete`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken
            }
        }
    );

    if (!res.ok) {
        console.error("Delete failed.");
        console.log(outfitId);
        return false;
    }
    
    console.log("Delete passed!", outfitId);
    return true;
}

async function outfitCreate(outfitId) {

    if (!csrfToken) {
        await getToken();
    }

    const res = await fetch(
        `https://avatar.roblox.com/v1/outfits/${outfitId}/details`,
        { credentials: "include" }
    );

    const details = await res.json();
    normalizeBodyColors(details)

    const createRes = await fetch(
        "https://avatar.roblox.com/v3/outfits/create",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
            /*
            body: JSON.stringify({
                name: details.name,
                assets: details.assets,
                bodyColors: details.bodyColors,
                scale: details.scale,
                playerAvatarType: details.playerAvatarType
            })
            */
        }
    );

    if (!createRes.ok) {
        console.error("Create failed.");
        console.log(outfitId)
        return false;
    }

    console.log("Create passed!", outfitId);
    return true;
}

async function outfitsGet(userId) {

    let page = 1
    let results = []
    let done = false

    while (!done) {
        const res = await fetch(
            `https://avatar.roblox.com/v1/users/${userId}/outfits?page=${page}&itemsPerPage=100&isEditable=true`,
            { credentials: "include" }
        )

        const data = await res.json()
        results.push(...data.data)

        if (data.data.length < 100) {
            done = true
        }

        page++
    }

    return results
}

/// User Interface ///

// Rows Container
const rowsContainer = document.createElement("div")
Object.assign(rowsContainer.style,{
    maxHeight:"800px",
    overflowY:"auto"
})

// Refresh
async function refreshPanel() {
    if (!userID){
        userID = await getUserId()
    }
    rowsContainer.innerHTML = ""
    const outfits = await outfitsGet(userID)
    outfits.forEach(addRow)
}

// Header
const header = document.createElement("div")
Object.assign(header.style,{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"10px"
})

// Panel
const panel = document.createElement("div")
panel.style.display = "none"
Object.assign(panel.style, {
    position: "fixed",
    top: "80px",
    right: "20px",
    width: "400px",
    maxHeight: "1000px",
    overflowY: "auto",
    background: "#1f1f1f",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    zIndex: "1010"
})

// Toggle Button
const toggleButton = document.createElement("button")
toggleButton.textContent = "Outfit Order"
Object.assign(toggleButton.style,{
    position:"fixed",
    top:"80px",
    right:"20px",
    zIndex:"1010"
})
toggleButton.onclick = () => {
    panel.style.display = "block"
    toggleButton.style.display = "none"
    refreshPanel()
}

// Title
const title = document.createElement("h3")
title.textContent = "Outfit Order"
title.onclick = () => {
    panel.style.display = "none"
    toggleButton.style.display = "block"
}

// Info Text (Progression)
const infoText = document.createElement("div")
Object.assign(infoText.style,{
    marginBottom:"8px",
    fontSize:"13px",
    opacity:"0.8"
})

// Apply Button
const applyButton = document.createElement("button")
applyButton.textContent = "Apply Order"
applyButton.style.marginTop = "10px"

document.body.appendChild(toggleButton)
document.body.appendChild(panel)
header.appendChild(title)
header.appendChild(applyButton)
panel.appendChild(header)
panel.appendChild(infoText)
panel.appendChild(rowsContainer)

// Drag
let dragged = null
panel.addEventListener("dragstart", e=>{
    dragged = e.target
})
panel.addEventListener("dragover", e=>{
    e.preventDefault()
})
panel.addEventListener("drop", e=>{

    const target = e.target.closest(".outfit-row")

    if(!target || target === dragged) return

    const rect = target.getBoundingClientRect()
    const offset = e.clientY - rect.top

    if(offset > rect.height/2){
        target.after(dragged)
    }else{
        target.before(dragged)
    }

})

// Create row for outfit
function addRow(outfit){

    const row = document.createElement("div")
    row.className = "outfit-row"
    row.draggable = true
    row.dataset.outfitId = outfit.id

    Object.assign(row.style,{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"6px",
        borderBottom:"1px solid #444"
    })

    const label = document.createElement("span")
    label.textContent = outfit.name

    const controls = document.createElement("div")

    const up = document.createElement("button")
    up.textContent = "↑"

    const down = document.createElement("button")
    down.textContent = "↓"

    controls.appendChild(up)
    controls.appendChild(down)

    row.appendChild(label)
    row.appendChild(controls)

    rowsContainer.appendChild(row)

    up.addEventListener("mousedown", e => e.stopPropagation())
    down.addEventListener("mousedown", e => e.stopPropagation())

    

    up.onclick = () => {
        const prev = row.previousElementSibling
        if(prev){
            rowsContainer.insertBefore(row, prev)
        }
    }
    down.onclick = () => {
        const next = row.nextElementSibling
        if(next){
            rowsContainer.insertBefore(next, row)
        }
    }

}

async function outfitsReorder(orderedIds){

    let completedText = "Done!"
    let delayIssueTime = 2500
    let delayRateLimitTime = 200
    let delayRateLimitTimeIncrease = 250
    let delayRateLimitTimeDecrease = 50
    let delayRateLimitTimeMax = 2500
    let delayRateLimitTimeMin = 100
    let delayPanelRefreshTime = 500
    let failCountMax = 10

    const currentOutfits = await outfitsGet(userID)
    const currentIds = currentOutfits.map(o => String(o.id))

    const currentIndex = {}
    currentIds.forEach((id,i)=>currentIndex[id] = i)

    let lastAffected = -1
    orderedIds.forEach((id,i)=>{
        if (currentIndex[id] > i){
            lastAffected = Math.max(lastAffected, currentIndex[id])
        }
    })
    let outfitIdsFiltered = orderedIds.slice(0, lastAffected + 1).reverse()

    if (lastAffected !== -1){
        
        for (let i = 0; i < outfitIdsFiltered.length; i++){

            function delayTimeAdd(){
                console.log("Current delay:", delayRateLimitTime)
                delayRateLimitTime += delayRateLimitTimeIncrease
                if (delayRateLimitTime > delayRateLimitTimeMax){
                    delayRateLimitTime = delayRateLimitTimeMax
                }
            }
            function delayTimeSubtract(){
                console.log("Current delay:", delayRateLimitTime)
                delayRateLimitTime -= delayRateLimitTimeDecrease
                if (delayRateLimitTime < delayRateLimitTimeMin){
                    delayRateLimitTime = delayRateLimitTimeMin
                }
            }

            const id = outfitIdsFiltered[i]
            
            infoText.textContent = `Updating: (${i+1}/${outfitIdsFiltered.length})`

            let created = false
            let failCount = 0
            let fullBreak = false
            while (!created){
                if (failCount >= failCountMax) {
                    infoText.textContent = "Error: Create failed. Continuing..."
                    console.error("Attempt to create has failed too many times.")
                    await delay(delayIssueTime)
                    break
                }
                failCount += 1
                created = await outfitCreate(id)
                await delay(delayRateLimitTime)
                if (failCount > 1) {
                    delayTimeAdd()
                }
            }
            
            delayTimeSubtract()

            let deleted = false
            failCount = 0
            while (!deleted){
                if (!created){
                    console.warn("Outfit deletion cancelled. Previous outfit failed creation.")
                    break
                }
                if (failCount >= failCountMax) {
                    fullBreak = true
                    completedText = `Issue met at ${id}, (${i+1}/${outfitIdsFiltered.length}).`
                    infoText.textContent = "Error: Delete failed. Stopping."
                    console.error("Attempt to delete has failed too many times.")
                    await delay(delayIssueTime)
                    break
                }
                failCount += 1
                deleted = await outfitDelete(id)
                if (deleted && i === (outfitIdsFiltered.length - 1)){
                    // Early break to avoid delay if this is the last outfit deleted
                    console.log("Done and done.")
                    break
                }
                await delay(delayRateLimitTime)
                if (failCount > 1) {
                    delayTimeAdd()
                }
            }

            delayTimeSubtract()

            if (fullBreak){
                console.log("A full break has occured. This implies something went wrong with the function \"outfitsReorder\".")
                break
            }

        }

    } else {
        console.warn("Attempt to change order to current order.")
        completedText = "Order remained the same. No changes made."
    }

    infoText.textContent = completedText
    
    await delay(delayPanelRefreshTime)
    refreshPanel()

}

applyButton.onclick = async () => {
    window.onbeforeunload = () => true
    const rows = panel.querySelectorAll(".outfit-row")
    const orderedIds = [...rows].map(r => r.dataset.outfitId)
    await outfitsReorder(orderedIds)
    window.onbeforeunload = null
}

refreshPanel()

}

main()
