"use strict";
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Baarish.mp3');
let masterPlay = document.getElementById('masterPlay');
let songProgressBar = document.getElementById('songProgressBar');
let masterSongimage = document.getElementById('masterSongimage');
let masterSongName = document.getElementById('masterSongName');
let hindiSongItems = Array.from(document.getElementsByClassName('hindiSongItems'));

// let homepage = document.getElementsByClassName('title-combo') ;

// homepage.addEventListener('click' , ()=>{
//     window.location.href = 'index.html' ;
// })

let songs = [
    {songName: "Baarish ", filePath: "songs/Baarish.mp3", coverPath: "covers/baarish.jpeg"},
    {songName: "Galiyaan", filePath: "songs/Galliyan.mp3", coverPath: "covers/galiyaan.jpg"},
    {songName: "Give me Some Sunshin", filePath: "songs/Give Me Some Sunshine.mp3", coverPath: "covers/giveme some sunshine.jpg"},
    {songName: "Kaun Tujhe", filePath: "songs/Kaun Tujhe.mp3", coverPath: "covers/kaun tujhe.jpg"},
    {songName: "Tera Ban Jaunga", filePath: "songs/Tera Ban Jaunga.mp3", coverPath: "covers/tera ban jaunga.jpg"},
    {songName: "Tere Sang Yaara", filePath: "songs/Tere Sang Yara.mp3", coverPath: "covers/tere sang yara.jpg"},
]

hindiSongItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

console.log(audioElement.currentTime);
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        console.log("song played");
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSongimage.style.opacity = 1;
    }
    else{
        audioElement.pause();
        console.log("song paused");
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        masterSongimage.style.opacity = 0.5;
    }
})
// Listen to Events
let totalTime = document.getElementById('totalTime');
let currentTime = document.getElementById('currentTime');

audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    let totMin = parseInt(audioElement.duration/60) ;
    let totSec = parseInt(audioElement.duration%60) ;
    let currentMinute = parseInt(audioElement.currentTime/60) ;
    let currentSec = parseInt(audioElement.currentTime%60) ;
    console.log("current time" + audioElement.currentTime);
    console.log("Total time" + totMin + ":" + totSec);
    totalTime.innerHTML = totMin + ":" + totSec ;
    currentTime.innerHTML = currentMinute + ":" + currentSec ;
    songProgressBar.value = progress;

    if(progress == 100){
        console.log("100 complete");
        next() ;
    }
})

songProgressBar.addEventListener('change', ()=>{
    console.log("progressbar update");
    audioElement.currentTime = songProgressBar.value * audioElement.duration/100;
})

hindiSongItems.forEach((element , i)=>{
    element.addEventListener('click', (e)=>{ 
        songIndex = i ;;
        console.log("song clicked at index" + i);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongimage.src = songs[songIndex].coverPath; 
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongimage.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

var next = ()=>{
    console.log("current index" + songIndex);
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongimage.src = songs[songIndex].coverPath; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

}

document.getElementById('next').addEventListener('click', ()=>{
    console.log("current index" + songIndex);
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongimage.src = songs[songIndex].coverPath; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongimage.src = songs[songIndex].coverPath; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})