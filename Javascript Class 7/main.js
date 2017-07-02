var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;

var songs = [{
        'name': 'Tamma Tamma Again',
        'artist': 'Badshah, Bappi Lahiri, Anuradha Paudwal',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
        'image': 'song1.jpg'

    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'

    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'

    }]


$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if(name.length > 2) {
    var message = "Welcome, " +  name;
    $('.main .user-name').text(message);
    $('.welcome-screen').addClass('hidden');
    $('.main').removeClass('hidden');
    }
    else {
        $('#name-input').addClass('error');
    }
});

function toggleSong() {
    var song = document.querySelector('audio');
    if(song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    }
    else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = 1 + Math.floor(Math.random()*4)
        while(nextSongNumber == currentSongNumber) {
            nextSongNumber = 1 + Math.floor(Math.random()*4)
        }
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

$('.play-icon').on('click', function() {
    toggleSong();
});

$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});

$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
})

$('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});

function prettifyTime(num) {
    if(num < 10) {
        num = '0' + num;
    }
    return num;
}

function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTimeInMinutes = Math.floor(song.currentTime/60);
    currentTimeInMinutes = prettifyTime(currentTimeInMinutes)
    var durationInMinutes = Math.floor(song.duration/60);
    durationInMinutes = prettifyTime(durationInMinutes);
    var currentTimeInSeconds = Math.floor(song.currentTime%60);
    currentTimeInSeconds = prettifyTime(currentTimeInSeconds);
    var durationInSeconds = Math.floor(song.duration%60);
    durationInSeconds = prettifyTime(durationInSeconds);
    $('.time-elapsed').text(currentTimeInMinutes + ':' + currentTimeInSeconds);
    $('.song-duration').text(durationInMinutes + ':' + durationInSeconds);
}

function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}

function addSongNameClickEvent(songObj,position) {
    var songName = songObj.fileName;
    position = position + 1;
    var id = '#song' + position;
    $(id).click(function() {
        var audio = document.querySelector('audio');
        var currentSong = audio.src;
        if(currentSong.search(songName) != -1)
        {
            toggleSong();
        }
        else {
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(songObj);
            currentSongNumber = position;
       }
    });
}


// for (var i = 0; i < fileNames.length ; i++) {
//     addSongNameClickEvent(fileNames[i],i)
// }

window.onload = function() {

    changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i)
    }
    

    updateCurrentTime(); 
    setInterval(function() {
        updateCurrentTime();
    },1000);
    $('#songs').DataTable({
        paging: false
    });
}