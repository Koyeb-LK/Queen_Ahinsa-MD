// XVIDEO DOWNLOAD COMMAND

const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )



cmd({
    pattern: "xvideo",
    alias: ["xvdl","xvdown"],
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    react: "🎉️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
if(xv_list.result.length < 0) return await reply("Not results found !")

const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${xv_list.result[0].url}`)
    
  // FIRST VIDEO
  
const msg = `
           🔞 *XVIDEO DOWNLOADER* 🔞

       
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}
`


await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });



let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "xvdl",
                    id: `.xvdl ${result.url}`
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Document",
                    id: `.xvdl ${result.url}±${result.title}`
                }),
            }
            ]
            let message = {
                image: result.thumbnail,
                header: '',
                footer: wm,
                body: caption

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
        } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    })

