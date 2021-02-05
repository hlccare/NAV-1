const hashMap = [
    { logo: 'A', logotype: 'text', url: 'https://www.acfun.cn' },
    { logo: '../static/bilibili-logo.jpeg', logotype: 'text', url: 'https://bilibili.com' }
]
const $siteList = $('.site-list')
const $lastLi = $siteList.find('.last')

hashMap.forEach(node => {
    const $li = $(
        `<li>
            <a href="${node.url}">
                    <div class="site">
                        <div class="logo">${url[8]}</div>
                        <div class="link">${node.url}</div>
                    </div>
                </a>
        </li>`
    )
})
$('.add-btn')
    .on('click', (e) => {
        let url = window.prompt('新增网址').trim()
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        const $site = $(`<li>
            <a href="${url}">
                    <div class="site">
                        <div class="logo">${url[8]}</div>
                        <div class="link">${url}</div>
                    </div>
                </a>
        </li>`).insertBefore($lastLi)
    })
