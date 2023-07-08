const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `*『 𝙂𝙍𝙊𝙐𝙋 𝙇𝙄𝙉𝙆 𝘿𝙀𝙏𝙀𝙆𝙏𝙊𝙍 』
Terdeteksi ${name} Telah Mengirim Link GROUP Lain !!  ${isBotAdmin ? '' : '\n\nMaaf wkwk anda admin:"v'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
        	await conn.sendMessage(m.chat, { delete: m.key })
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}