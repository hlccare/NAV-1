const $siteList = $('.site-list')
const $lastLi = $siteList.find('.last')
const infoString = localStorage.getItem('website-info')
const infoObject = JSON.parse(infoString)

const hashMap = infoObject || [
    { logo: 'A', logotype: 'text', url: 'https://www.acfun.cn' },
    // { logo: '../static/bilibili-logo.jpeg', logotype: 'text', url: 'https://bilibili.com' }
    { logo: 'B', logotype: 'text', url: 'https://bilibili.com' }

]

const simplifyUrl = (url) => {
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(
            `<li>
            <!-- <a href="${node.url}"> --!>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='del-icon'>
                    <svg class="icon">
                        <use xlink:href="#icon-delete2"></use>
                    </svg>
                </div>
            </div>
            <!-- </a> --!>
            </li>`
            ).insertBefore($lastLi)
            $li.on('click', (e) => {
                window.open(node.url) //代替a标签
            })
            $li.on('click', '.del-icon', (e) => {
                e.stopPropagation() //阻止冒泡
                hashMap.splice(index, 1)
                render()
            })
        })
    
    }

render()

$('.add-btn')
    .on('click', (e) => {
        let url = window.prompt('新增网址').trim()
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push(
            {
                logo: simplifyUrl(url)[0].toUpperCase(),
                logotype: 'text',
                url: url
            }
        )
        render()
    })

window.onbeforeunload = () => {
    console.log('页面即将关闭，保存hashMap至localStorage')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('website-info', string)
}

//document.addEventListener
$(document).on('keypress', (e) =>{
    const upperKey = e.key.toUpperCase() //将字符串转换为大写
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo === upperKey){
            window.open(hashMap[i].url)
        }
    }
})
