const nodemailer = require("nodemailer")
const fetch = require("node-fetch")
// 获取彩虹屁接口
async function getCHP() {
    let url = Math.random()>0.5 ? 'https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn': 'https://chp.shadiao.app/api.php'
    return new Promise(resolve=>{
        fetch(url)
        .then(res=>res.text())
        .then(resolve)
    })
}
// 发送邮件函数
async function sendMail() {
    let user = "2407232109@qq.com" // 自己的邮箱
    let pass = "xsklcnjicrzjdhfi" // QQ授权码
    let to = "1361675436@qq.com" // 对方邮箱
    // let to = "614243059@qq.com" // 对方邮箱
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
            user,
            pass
        }
    })
    let text = await getCHP()
    await transporter.sendMail({
        from: `浙江省杭州市肾宝基金委员会<${user}>`,
        to: `rubbish ball<${to}>`,
        subject: `面试邀请`,
        text
    }).catch(err=>{
        console.log(`发送失败,`, err)
    })
    console.log(`发送成功`,text);
}

let timer = null
let times = 0;
async function setup() {
    if(times>7) {
        clearTimeout(timer)
        return;
    }
    await sendMail()
    timer = setTimeout(async () => {
        await setup()
    }, 8000);
}
// go
setup()