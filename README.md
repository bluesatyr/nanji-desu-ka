# nanji-desu-ka

Nanji-desu-ka is a simple graphical representation of the current local time in the ancient Japanese timekeeping system. It has been developed for individuals interested in Japanese history who want to get a true sense of this unique system which is very closely tied to the seasonal changes. It is still currently under development.

## The Problem

Before the Meiji Era (up until 1872) time in Japan was based upon an ancient Chinese method of dividing the day into 12 hours each named for one of the animals in the Chinese Zodiac: 

- U no koku - hour of the hare
- Tatsu no koku - hour of the dragon
- Mi no koku - hour of the snake
- Uma no koku - hour of the horse
- Hitsuji no koku - hour of the sheep
- Saru no koku - hour of the monkey
- Tori no koku - hour of the cock
- Inu no koku - hour of the dog
- I no koku - hour of the boar
- Ne no koku - hour of the rat
- Ushi no koku - hour of the ox
- Tora no koku - hour of the tiger

Unlike modern Western Hours, these hours were not all equal in length, but instead were divided into to groups: 6 equal hours of daylight (beginning with the Hour of the Hare - sunrise occuring midway through the hour), and 6 equal hours of nighttime (beginning with the Hour of the Rooster -sunset occuring midway through the hour). In this system solar noon always falls midway through the Hour of the Horse.

Many modern explanations of the system try to simplify it, equating 1 traditional Japanese Hour to 2 Wester hours, with 12:00pm falling in the middle of the Hour of the Horse (11:00am - 1:00pm). The Hour of the Hare therefore is assigned the Western Hours of 5:00am - 7:00am regardless of the actual sunrise time.

Unfortunately this rigid interpretation gives us an inaccurate understanding of the system, which historically connects people to the natural world by matching the subtle changes of the seasons.

### The Solution
In accurately recreating the system, we must determine the local solar time for the specific location of the user. As latitude affects the length of the day/night, and longitude determines the times for sunrise, solar noon, sunset and midnight, we first use the geolocation Web API to get the users location.

Once we have the user location, we then use the [SunCalc library](https://github.com/mourner/suncalc) to determine the sunrise and sunset times for the current, previous and upcoming dates. This gives us the data we need to correctly calculate the length of daylight and nighttime hours. As the day length changes every day (even if in very small amounts)it is necessary to determine early morning night time hours using today's sunrise and yesterday's sunset timings, and tonight's night time hours using timings for today's sunset and tomorrow's sunrise.

As datetime in the browser uses modern time conventions, we use SunCalc data to determine the modern start and end times for each Japanese hour for the given modern date.

To get the current time, we compare the current time, to the array of hour start times from our previous calculations. From here we determine the current hour, as well as how far through the current hour we are.

### The Display
Currently, we are utilizing the [Circles](https://github.com/lugolabs/circles) library to render the progress through the cuurrent hour in a "donut" graph. The Library also provides for a text-based label in the center of the circle. 

It is currently possible to have 3 possible labels (still to be implemented in the user settings):
- an Emoji representing the current hour's animal
- the Kanji representing the current hour
- the animal name written in English

### Future Plans
- A user settings interface to update location and choose display options
- Add Progressive Web App functionality
- Allow users to put in any datetime and a location to return the traditional time. 
- Add information for the traditional Japanese [72 Microseasons](https://www.nippon.com/en/features/h00124/)
- Update the app's theme colors based upon seasons and time of day (dark-mode)
- Add ability for user defined notifications/alarms based on traditional time, for example "Everyday at the beginning of the hour of the Horse"
