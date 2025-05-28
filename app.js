function openTab(evt, Name) {
    let i, tabcontent, active;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    active = document.getElementsByClassName("active")
    for(i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace(" activet", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " activet";
}





const music = new Audio('audio/2.mp3');



const songs = [
    {
        id: '1',
        songName:` 505 <br>
        <div class="subtitle">Artic Monkeys</div>`,
        poster: "img/1.jpg"
    },
    {
        id: '2',
        songName:` Сant stop <br>
        <div class="subtitle">Red Hot Chili Peppers</div>`,
        poster: "img/2.jpg"
    },
    {
        id: '3',
        songName:` Not Gonna Die <br>
        <div class="subtitle">skillet</div>`,
        poster: "img/3.jpg"
    },
    {
        id: '4',
        songName:` Sway to My Beat in Cosmos <br>
        <div class="subtitle">Robin, HOYO-MiX, 阿烈@Soundhub Studios, Chevy</div>`,
        poster: "img/4.jpg"
    },
    {
        id: '5',
        songName:` Тысячи птиц <br>
        <div class="subtitle">FACE</div>`,
        poster: "img/5.jpg"
    },
    {
        id: '6',
        songName:` WildFire <br>
        <div class="subtitle">HOYO-MiX, 宫奇, Jonathan Steingard</div>`,
        poster: "img/6.jpg"
    },
    {
        id: '7',
        songName:` Last Christmas <br>
        <div class="subtitle">Wham!</div>`,
        poster: "img/7.jpg"
    },
    {
        id: '8',
        songName:` Bobr <br>
        <div class="subtitle">SLAVA SKRIPKA</div>`,
        poster: "img/8.jpg"
    },
    {
        id: '9',
        songName:` Кажется <br>
        <div class="subtitle">Uma2rman</div>`,
        poster: "img/9.jpg"
    },
    {
        id: '10',
        songName:` Пожары <br>
        <div class="subtitle">XOLIDAYBOY</div>`,
        poster: "img/10.jpg"
    },
    {
        id: '11',
        songName:` Нервы <br>
        <div class="subtitle">Нервы</div>`,
        poster: "img/11.jpg"
    },
    {
        id: '12',
        songName:` Можно я с тобой <br>
        <div class="subtitle">DVN</div>`,
        poster: "img/12.jpg"
    },
    {
        id: '13',
        songName:` Люди <br>
        <div class="subtitle">Дайте танк (!)</div>`,
        poster: "img/13.jpg"
    },
    {
        id: '14',
        songName:` Андеграунд <br>
        <div class="subtitle">Йорш</div>`,
        poster: "img/14.jpg"
    },
    {
        id: '15',
        songName:` I Like The Way You Kiss Me <br>
        <div class="subtitle">Artemas</div>`,
        poster: "img/15.jpg"
    },

]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})



let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', ()=> {
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-circle-fill')
        masterPlay.classList.add('bi-pause-circle-fill')
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-circle-fill')
        masterPlay.classList.remove('bi-pause-circle-fill')
        wave.classList.remove('active2');
    }
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-fill');
            element.classList.remove('bi-pause-fill');
    })
}

const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
            element.style.background = "rgba(105, 105, 170, 0)";
    })
}


let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-fill');
        e.target.classList.add('bi-pause-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', ()=>{
            masterPlay.classList.add('bi-play-circle-fill');
            masterPlay.classList.remove('bi-pause-circle-fill');
            wave.classList.remove('active2');
        })

        makeAllBackgrounds();
        Array.from(document.getElementsByClassName("songItem"))[`${index-1}`].style.background = "rgba(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener("timeupdate",()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;


    let progressbar = parseInt((music_curr/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-circle-fill')
    masterPlay.classList.remove('bi-pause-circle-fill')
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol. value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol. value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol. value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();


    makeAllBackgrounds();
    Array.from(document.getElementsByClassName("songItem"))[`${index-1}`].style.background = "rgba(105, 105, 170, .1)";

})

next.addEventListener('click', ()=>{
    index -= 0; 
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()


    makeAllBackgrounds();
    Array.from(document.getElementsByClassName("songItem"))[`${index-1}`].style.background = "rgba(105, 105, 170, .1)";
    
})




const searchInput = document.getElementById('searchInput');
const content = document.getElementById('content').innerHTML;

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const regex = new RegExp(searchTerm, 'gi');
  const highlightedContent = content.replace(regex, match => `<mark>${match}</mark>`);
  document.getElementById('content').innerHTML = highlightedContent;
});

let left_scroll = document.getElementById(`left_scroll`);
let right_scroll = document.getElementById(`right_scroll`);
let pop_song = document.getElementsByClassName(`pop_song`)[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 225;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 225;
})


let left_scrolls = document.getElementById(`left_scrolls`);
let right_scrolls = document.getElementById(`right_scrolls`);
let item = document.getElementsByClassName(`item`)[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 225;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 225;
})
