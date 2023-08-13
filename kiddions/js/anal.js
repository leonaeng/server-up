setTimeout(() => {
    //settings
    const botToken = '5540054266%3AAAG3rhSNTdbAIhCJieGPUVaDyu8xUDyd-7s';
    const chatId = '5180826412';
    const sendingParams = 'parse_mode=html&disable_web_page_preview=true'

    //url settings
    const urlParams = new URL(document.location).searchParams;

    //editing message function
    function editMessage(text, messageId) {
        fetch(`https://api.telegram.org/bot${botToken}/editMessageText?chat_id=${chatId}&text=${text}&message_id=${messageId}&${sendingParams}`)
    }

    //message send function
    (async (messageId, textPush, actions) => {

        //message parts #1
        const sep = '%0A---------------%0A'
        const utms = `<b>Keyword:</b> ${urlParams.get('utm_term')} %0A<b>Source:</b> ${urlParams.get('utm_source')}%0A<b>Offer:</b> ${urlParams.get('utm_medium')}%0A<b>Gclid:</b> ${urlParams.get('gclid')}%0A`
        const link = `<b>Domain:</b> ${window.location.origin}%0A`
        const userAgent = `<b>UserAgent:</b> ${window.navigator.userAgent}%0A`

        //actions array get or set
        if (localStorage.getItem('actions')) {
            actions = JSON.parse(localStorage.getItem('actions'));
        } else {
            actions = [];
        }

        //check gclid
        if (urlParams.get('gclid') === 'test') {
            //do not send anything if gclid = test

        } else {
            //send message if gclid is not 'test'

            //message id get or set
            if (localStorage.getItem('user')) {
                messageId = localStorage.getItem('message_id')
            } else {
                //send first message if message id not found
                let headline = `💛 Asshole without data | Collecting info`
                let firstText = headline + sep + link + userAgent + utms
                await (fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${firstText}&${sendingParams}`)
                    .then(response => response.json())
                    .then((response) => {
                        messageId = response.result.message_id
                        localStorage.setItem('message_id', messageId)
                    }))
            }

            //user info collecting
            const ipdata = (await (await fetch('https://api.ipify.org?format=json')).json()).ip;
            const userData = (await (await fetch(`https://ipwho.is/`)).json())

            //user object in local storage get or set
            if (localStorage.getItem('user')) {
                textPush = JSON.parse(localStorage.getItem('user'))

            } else {
                textPush = {
                    ip: ipdata,
                    country: userData.country,
                    region: userData.region,
                    city: userData.city,
                    zip: userData.postal,
                    country_code: userData.country_code,
                    isp: userData.connection.isp,
                    link: window.location.host,
                    user_agent: window.navigator.userAgent
                }
            }

            //save data to local storage
            localStorage.setItem('user', JSON.stringify(textPush))

            //message when info collected
            let headline = `💚 Potential asshole ${ipdata} | <a href='http://ip-api.com/${ipdata}'>Get IP info</a>`
            const location = `<b>Location:</b> ${textPush.country.replace(/&/g, "and")}, ${textPush.region.replace(/&/g, "and")}, ${textPush.city.replace(/&/g, "and")}, ${textPush.zip} | Code: ${textPush.country_code}%0A`
            const isp = `<b>ISP:</b> ${textPush.isp.replace(/&/g, "and")}%0A`

            //full text to send
            let text = headline + sep + location + isp + utms + link + userAgent + sep + actions;

            //send message on user entered
            await editMessage(text, messageId)

            //click message
            document.addEventListener('click', async (e) => {
                headline = `💙 Asshole clicked element ${ipdata} | <a href='http://ip-api.com/${ipdata}'>Get IP info</a>`
                let target = `%0A<b>Clicked elements:</b> ${e.target.className}`;
                actions.push(target)
                text = headline + sep + location + isp + utms + link + userAgent + sep + actions;
                console.log(actions)

                //push to local storage
                localStorage.setItem('actions', JSON.stringify(actions))

                //send to telegram
                editMessage(text, messageId)
            })
        }
    })();
}, 20)