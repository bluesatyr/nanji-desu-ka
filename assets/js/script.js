// Global Variables
let latitude = 43.594853799
let longitude = -79.61650999
let todayHours = [];

const hourData = [
    {en:'Rat', jp: 'ね', kanji: '子', emoji: '🐭'},
    {en:'Ox', jp: 'うし', kanji: '丑', emoji: '🐮'},
    {en:'Tiger', jp: 'とら', kanji: '虎', emoji: '🐯'},
    {en:'Rabbit', jp: 'う', kanji: '卯', emoji: '🐰'},
    {en:'Dragon', jp: 'たつ', kanji: '辰', emoji: '🐲'},
    {en:'Snake', jp: 'み', kanji: '巳', emoji: '🐍'},
    {en:'Horse', jp: 'うま', kanji: '午', emoji: '🐴'},
    {en:'Sheep', jp: 'ひつじ', kanji: '未', emoji: '🐏'},
    {en:'Monkey', jp: 'さる', kanji: '申', emoji: '🐵'},
    {en:'Rooster', jp: 'とり', kanji: '酉', emoji: '🐔'},
    {en:'Dog', jp: 'いぬ', kanji: '戌', emoji: '🐶'},
    {en:'Boar', jp: 'い', kanji: '亥', emoji: '🐗'},
];



// Get user location
async function getUserLocation() {
    var results = [];
    await navigator.geolocation.getCurrentPosition((position) => {
        results[0] = position.coords.latitude;
        results[1] = position.coords.longitude;
    });
    console.log(results);
    return results;
}


function getHours() {
    // get date object for current, previous and next day
    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // get sun data for current days
    let todayTimes = SunCalc.getTimes(now, latitude, longitude);
    let tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude);
    let yesterdayTimes = SunCalc.getTimes(yesterday, latitude, longitude);
    
    // get day hours by length of daylight / 6
    let sunrise = moment(todayTimes.sunrise).unix();
    let todaySunset = moment(todayTimes.sunset).unix();
    dayHourLength = (Math.floor((todaySunset-sunrise)/6));

    // push daytime hours to todayHours array
    todayHours[0]= sunrise; //puts sunrise time as first data in Japanese Hours array
    for (let i = 1; i < 7; i++) {
        todayHours[i]= todayHours[i-1]+dayHourLength;
    }
    
    // get predawn hours by length of previous night / 6
    let lastSunset = moment(yesterdayTimes.sunset).unix()
    preDawnHourLength = (Math.floor((sunrise-lastSunset)/6));
    // push predawn hours to todayHours array using .unshift()
    for (let k = 0; k < 3; k++) {
        todayHours.unshift(todayHours[0]-preDawnHourLength);
    }
    
    // get evening hours
    let nextDawn = moment(tomorrowTimes.sunrise).unix()
    eveningHourLength = (Math.floor((nextDawn-todaySunset)/6));
    // push this evening hours to todayHours array
    for (let i = 0; i < 3; i++) {
        todayHours.push(todayHours[todayHours.length-1]+eveningHourLength);
    }

    // console.log all hours in the day in readable format
    for (let j = 0; j < todayHours.length; j++){
        console.log(moment(todayHours[j]*1000).format('h:mm:ss A')); // date in readable format: moment( <datetime> * 1000).format('MM/DD/YYYY H:mm:ss')
    } 
}

var myCircle = Circles.create({
  id:                  'circles-1',
  radius:              120,
  value:               43,
  maxValue:            100,
  width:               20,
  text:                '辰',
  colors:              ['#D3B6C6', '#4B253A'],
  duration:            400,
  wrpClass:            'circles-wrp',
  textClass:           'circles-text',
  valueStrokeClass:    'circles-valueStroke',
  maxValueStrokeClass: 'circles-maxValueStroke',
  styleWrapper:        true,
  styleText:           true
});


getHours();

