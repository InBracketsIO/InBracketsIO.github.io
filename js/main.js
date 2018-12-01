//____________________________________________________________________________
//INITIALIZE
setTimeout(function(){
    document.body.className="";
},1000);

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const bigLogoBoxes = [
    document.querySelector(".js-box--1"),
    document.querySelector(".js-box--2"),
    document.querySelector(".js-box--3"),
    document.querySelector(".js-box--4"),
    document.querySelector(".js-box--5")
]

const cryptoLogos = [
    'BTC.svg',
    'ETH.svg',
    'XRP.svg',
    'BCH.svg',
    'ETH.svg',
    'EOS.svg',
    'XRP.svg',
    'LTC.svg',
    'USDT.svg',
    'ADA.svg',
    'XMR.svg',
    'IOT.svg',
    'DASH.svg',
    'TRX.svg',
    'BNB.svg',
    'NEO.svg',
    'ETC.svg',
    'XEM.svg',
    'VEN.svg',
    'DOGE.svg',
    'ZEC.svg',
    'OMG.svg',
    'BTG.svg',
    'BCN.svg',
    'LSK.svg',
    'DCR.svg',
    'ZRX.svg',
    'QTUM.svg'
]

let card,
    logo,
    cardNum,
    logoNum,
    cardTransitionTime = 1000,
    switching = false;

let stickyBtn, 
    stickyBtnOffset, 
    stickyPhone, 
    stickyPhoneHeight, 
    stickyPhoneOffsetStart, 
    stickyPhoneOffsetEnd,
    stickyPhoneTranslate;

const roadMap = [
    document.querySelector('.js--roadmap-1'),
    document.querySelector('.js--roadmap-2'),
    document.querySelector('.js--roadmap-3'),
    document.querySelector('.js--roadmap-4'),
    document.querySelector('.js--roadmap-5'),
    document.querySelector('.js--roadmap-6'),
    document.querySelector('.js--roadmap-7')
];

const MEDIUM_URL = 'https://medium.com/feed/@Mobilumcom';
const TWITTER_URL = 'https://twitrss.me/twitter_user_to_rss/?user=mobilumcom';

if(document.body.getAttribute('data-page') == 'index') {
    
    initiateBL();
    initiateWP();

    window.addEventListener('resize', function() {
        initiateWP();   
    });

    window.onscroll = function() {
        sticky();
        animate(roadMap[0]);
        animate(roadMap[1]);
        animate(roadMap[2]);
        animate(roadMap[3]);
        animate(roadMap[4]);
        animate(roadMap[5]);
        animate(roadMap[6]);
    };
}

if(document.body.getAttribute('data-page') == 'company') {
    initiateCOM();
}



//____________________________________________________________________________
// ANIMATION BIG LOGO
function flipBox() {

    if (switching) {
        return false;
    }
    switching = true;

    if(!card.classList.contains('is-switched')){
        switchCardAndLogo();
    }

    window.setTimeout(toggleActive(card), cardTransitionTime / 2);
}

function toggleActive(card) {
    card.classList.toggle('is-switched');
    card.children[0].children[0].classList.toggle('is-active');
    switching = false;
}

function switchCardAndLogo(){
    cardNum = Math.floor(Math.random() * 5);
    logoNum = Math.floor(Math.random() * 28);

    card = bigLogoBoxes[cardNum];
    logo = document.querySelector('.js-logo--'+(cardNum+1));
    logo.setAttribute('src', 'resources/icons/crypto/svg/' + cryptoLogos[logoNum]);
}

function initiateBL() {
    cardNum = Math.floor(Math.random() * 5);
    logoNum = Math.floor(Math.random() * 28);

    card = bigLogoBoxes[cardNum];
    logo = document.querySelector('.js-logo--' + (cardNum+1));

    logo.setAttribute('src', 'resources/icons/crypto/svg/' + cryptoLogos[logoNum]);

    setInterval(flipBox, 1000);
}

//____________________________________________________________________________
// WAYPOINTS
function initiateWP() {
    stickyBtn               = document.querySelector('.js--sticky');
    stickyBtnOffset         = document.querySelector('.js--sticky-offset').offsetTop;

    stickyPhone             = document.querySelector('.js--sticky-phone');
    stickyPhoneOffsetStart  = document.querySelector('.js--sticky-phone--offset-start').offsetTop - 25;
    stickyPhoneOffsetEnd    = document.querySelector('.js--sticky-phone--offset-end').offsetTop - 20;
    stickyPhoneTranslate    = stickyPhoneOffsetEnd - stickyPhoneOffsetStart + 5;
}


function sticky() {
    if (window.pageYOffset >= stickyBtnOffset) {
        stickyBtn.classList.add('sticky--visible')
    } else {
        stickyBtn.classList.remove('sticky--visible');
    }

    if (window.pageYOffset >= stickyPhoneOffsetStart && window.pageYOffset <= stickyPhoneOffsetEnd) {
        stickyPhone.removeAttribute('style');
        stickyPhone.classList.add('sticky--phone');
    } else if(window.pageYOffset > stickyPhoneOffsetEnd) {
        stickyPhone.classList.remove('sticky--phone');
        stickyPhone.setAttribute('style', 'transform: translateY('+stickyPhoneTranslate+'px)');
    } else {
        stickyPhone.removeAttribute('style');
        stickyPhone.classList.remove('sticky--phone');
    }
}

function animate(el) {
    if (window.pageYOffset >= getElementOffset(el) - 500) {
        el.classList.add('roadmap__content--animated')
    }
}

function getElementOffset(el) {
    const rect = el.getBoundingClientRect();

    return rect.top + window.pageYOffset;
}

//____________________________________________________________________________
// COMMUNITY 

function initiateCOM() {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${MEDIUM_URL}`)
    .then((res) => res.json())
    .then((data) => {
        document.querySelector('.js--med-post-date-1').textContent = convertDate(data.items[0].pubDate);
        document.querySelector('.js--med-post-title-1').textContent = data.items[0].title;
        document.querySelector('.js--med-post-link-1').setAttribute('href', data.items[0].link);
        document.querySelector('.js--med-post-date-2').textContent = convertDate(data.items[1].pubDate);
        document.querySelector('.js--med-post-title-2').textContent = data.items[1].title;
        document.querySelector('.js--med-post-link-2').setAttribute('href', data.items[1].link);
    });

    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${TWITTER_URL}`)
    .then((res) => res.json())
    .then((data) => {
        document.querySelector('.js--tw-post-date-1').textContent = convertDate(data.items[0].pubDate);
        document.querySelector('.js--tw-post-title-1').textContent = data.items[0].title.split('\n')[0];
        document.querySelector('.js--tw-post-link-1').setAttribute('href', data.items[0].link);
        document.querySelector('.js--tw-post-date-2').textContent = convertDate(data.items[1].pubDate);
        document.querySelector('.js--tw-post-title-2').textContent = data.items[1].title.split('\n')[0];
        document.querySelector('.js--tw-post-link-2').setAttribute('href', data.items[1].link);
    });
}

function convertDate(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
}

//____________________________________________________________________________
// SLIDER

//   document.querySelector('#checkbox').change(function(){
//     setInterval(function () {
//         moveRight();
//     }, 3000);
//   });

    // var child = document.querySelector('#slider ul li:last-child');
    // var parent = document.querySelector('#slider ul');
    // var slider = document.querySelector('#slider');
    // var btnPrev = document.querySelector('a.control_prev');
    // var btnNext = document.querySelector('a.control_next');

    // var slideCount = document.querySelectorAll('#slider ul li').length;
    // var slideWidth = document.querySelector('#slider ul li').offsetWidth;
    // var slideHeight = document.querySelector('#slider ul li').offsetHeight;
    // var sliderUlWidth = slideCount * slideWidth;

    // slider.style.width = `${slideWidth}px`;
    // slider.style.height = `${slideHeight}px`;

    // parent.style.width = `${sliderUlWidth}px`;
    // parent.style.marginLeft = `${-slideWidth}px`;
    
    // parent.insertBefore(child, parent.firstChild);

    // function moveLeft() {
    //     let left = 0;
    //     let leftInterval = slideWidth / 20;
    //     let int = setInterval(frame, 10);
    //     function frame() {
    //         left += leftInterval;
    //         parent.style.left = left + 'px';
    //         if(left >= slideWidth) {
    //             child = document.querySelector('#slider ul li:last-child');
    //             parent.insertBefore(child, parent.firstChild);
    //             parent.style.left = '';
    //             clearInterval(int);
    //         }
    //     }
    // };

    // function moveRight() {
    //     let left = 0;
    //     let leftInterval = slideWidth / 20;
    //     let int = setInterval(frame, 10);
    //     function frame() {
    //         left -= leftInterval;
    //         parent.style.left = left + 'px';
    //         if(left <= (-slideWidth)) {
    //             child = document.querySelector('#slider ul li:first-child');
    //             parent.appendChild(child);
    //             parent.style.left = '';
    //             clearInterval(int);
    //         }
    //     }
    // };

    // btnPrev.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     moveLeft();
    // });

    // btnNext.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     moveRight();
    // });


  